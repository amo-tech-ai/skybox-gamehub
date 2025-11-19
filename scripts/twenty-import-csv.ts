#!/usr/bin/env ts-node

/**
 * Twenty CRM CSV Import Script
 * 
 * Imports contacts from CSV file into Twenty CRM
 * 
 * Usage:
 *   ts-node scripts/twenty-import-csv.ts <csv-file> [options]
 * 
 * Options:
 *   --api-key <key>     Twenty API key (or use TWENTY_API_KEY from .env)
 *   --base-url <url>    Twenty base URL (or use TWENTY_API_BASE_URL from .env)
 *   --dry-run           Preview changes without creating contacts
 *   --skip-errors       Continue on errors (skip failed rows)
 * 
 * Environment Variables (from .env file):
 *   TWENTY_API_KEY         API key for authentication
 *   TWENTY_API_BASE_URL    Base URL (default: https://api.twenty.com or http://localhost:8080)
 *   TWENTY_GRAPHQL_URL     GraphQL endpoint (or auto-generated from base URL)
 * 
 * Example:
 *   ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// Load .env file if it exists
try {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const envLines = envContent.split('\n');
    
    for (const line of envLines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Expand variables like ${VAR}
        value = value.replace(/\${([^}]+)}/g, (_, varName) => {
          return process.env[varName.trim()] || '';
        });
        
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
} catch (error) {
  // Silently continue if .env parsing fails
}

interface TwentyPerson {
  name: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  companyId?: string;
}

interface TwentyCompany {
  name: string;
  domain?: string;
  employees?: number;
}

interface CSVRow {
  Company: string;
  Location: string;
  Industry: string;
  Size: string;
  'Event Budget Tier': string;
  Phone: string;
  WhatsApp: string;
  Email: string;
  Website: string;
  'Services Offered': string;
  'Reviews/Rating': string;
  'AI Technologies Used': string;
}

class TwentyClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'http://localhost:8080') {
    this.apiKey = apiKey;
    // Ensure baseUrl doesn't have /graphql suffix (we add it in request)
    this.baseUrl = baseUrl.replace(/\/graphql\/?$/, '');
  }

  private async request(query: string, variables?: any) {
    const graphqlUrl = this.baseUrl.includes('api.twenty.com') 
      ? `${this.baseUrl}/graphql`
      : `${this.baseUrl}/graphql`;
    
    const response = await fetch(graphqlUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }

  async createCompany(data: TwentyCompany) {
    const mutation = `
      mutation CreateCompany($input: CompanyCreateInput!) {
        createCompany(data: $input) {
          id
          name
          domain
          employees
        }
      }
    `;

    const variables = {
      input: {
        name: data.name,
        ...(data.domain && { domain: this.extractDomain(data.domain) }),
        ...(data.employees && { employees: data.employees })
      }
    };

    const result = await this.request(mutation, variables);
    return result.createCompany;
  }

  async findCompanyByName(name: string) {
    const query = `
      query FindCompany($name: String!) {
        companies(filter: { name: { eq: $name } }) {
          edges {
            node {
              id
              name
              domain
            }
          }
        }
      }
    `;

    const result = await this.request(query, { name });
    const companies = result.companies.edges;
    return companies.length > 0 ? companies[0].node : null;
  }

  async createPerson(data: TwentyPerson) {
    const mutation = `
      mutation CreatePerson($input: PersonCreateInput!) {
        createPerson(data: $input) {
          id
          name
          email
          phone
          company {
            id
            name
          }
          createdAt
        }
      }
    `;

    const variables = {
      input: {
        name: data.name,
        ...(data.email && { email: data.email }),
        ...(data.phone && { phone: data.phone }),
        ...(data.jobTitle && { jobTitle: data.jobTitle }),
        ...(data.companyId && { companyId: data.companyId })
      }
    };

    const result = await this.request(mutation, variables);
    return result.createPerson;
  }

  async findPersonByEmail(email: string) {
    if (!email || email === 'N/A') return null;

    const query = `
      query FindPerson($email: String!) {
        people(filter: { email: { eq: $email } }) {
          edges {
            node {
              id
              name
              email
            }
          }
        }
      }
    `;

    const result = await this.request(query, { email });
    const people = result.people.edges;
    return people.length > 0 ? people[0].node : null;
  }

  extractDomain(url: string): string {
    if (!url || url === 'N/A') return '';
    // Remove www. prefix and extract domain
    const cleaned = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
    return cleaned || '';
  }

  parseEmployees(size: string): number | undefined {
    if (!size || size === 'N/A') return undefined;
    const match = size.match(/(\d+)-?(\d+)?/);
    if (match) {
      const max = match[2] ? parseInt(match[2]) : parseInt(match[1]);
      return max;
    }
    return undefined;
  }
}

function parseCSV(filePath: string): CSVRow[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  
  if (lines.length < 2) {
    throw new Error('CSV file must have at least a header and one data row');
  }

  const headers = lines[0].split(',').map(h => h.trim());
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Simple CSV parsing (handles quoted fields)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values.length !== headers.length) {
      console.warn(`Skipping row ${i + 1}: column count mismatch`);
      continue;
    }

    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });

    rows.push(row as CSVRow);
  }

  return rows;
}

function normalizeEmail(email: string): string | undefined {
  if (!email || email === 'N/A' || email.trim() === '') return undefined;
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string | undefined {
  if (!phone || phone === 'N/A' || phone.trim() === '') return undefined;
  // Clean phone number
  return phone.trim().replace(/\s+/g, '');
}

function extractContactName(row: CSVRow): string {
  // Try to extract contact name from company or create from company name
  // For now, we'll use a generic approach or company name
  const company = row.Company.trim();
  // In a real scenario, you might parse "Contact Name at Company" format
  return `Contact at ${company}`;
}

async function importContacts(
  csvPath: string,
  apiKey: string,
  baseUrl: string,
  options: { dryRun: boolean; skipErrors: boolean }
) {
  console.log('🚀 Starting CSV import...\n');
  console.log(`📁 CSV File: ${csvPath}`);
  console.log(`🔗 API Base URL: ${baseUrl}`);
  console.log(`🔑 API Key: ${apiKey.substring(0, 20)}...${apiKey.substring(apiKey.length - 10)}`);
  console.log(`🧪 Dry Run: ${options.dryRun ? 'Yes' : 'No'}\n`);

  const client = new TwentyClient(apiKey, baseUrl);
  const rows = parseCSV(csvPath);

  console.log(`📊 Found ${rows.length} rows to process\n`);

  const stats = {
    companiesCreated: 0,
    companiesFound: 0,
    peopleCreated: 0,
    peopleFound: 0,
    errors: 0
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2; // Account for header row

    try {
      console.log(`\n[${rowNum}/${rows.length}] Processing: ${row.Company}`);

      // Step 1: Create or find company
      let company = null;
      if (row.Company && row.Company.trim() !== '') {
        company = await client.findCompanyByName(row.Company.trim());
        
        if (!company) {
          if (!options.dryRun) {
            const companyData: TwentyCompany = {
              name: row.Company.trim()
            };
            const domain = client.extractDomain(row.Website || '');
            if (domain) companyData.domain = domain;
            const employees = client.parseEmployees(row.Size || '');
            if (employees) companyData.employees = employees;
            
            company = await client.createCompany(companyData);
            stats.companiesCreated++;
            console.log(`  ✓ Company created: ${company.name}`);
          } else {
            console.log(`  ⏭️  Would create company: ${row.Company.trim()}`);
            stats.companiesCreated++;
          }
        } else {
          stats.companiesFound++;
          console.log(`  ✓ Company found: ${company.name}`);
        }
      }

      // Step 2: Create contact person (if email exists)
      const email = normalizeEmail(row.Email);
      if (email) {
        const existingPerson = await client.findPersonByEmail(email);
        
        if (!existingPerson) {
          const personName = extractContactName(row);
          
          if (!options.dryRun) {
            const person = await client.createPerson({
              name: personName,
              email: email,
              phone: normalizePhone(row.Phone),
              companyId: company?.id
            });
            stats.peopleCreated++;
            console.log(`  ✓ Person created: ${person.name} (${person.email})`);
          } else {
            console.log(`  ⏭️  Would create person: ${personName} (${email})`);
            stats.peopleCreated++;
          }
        } else {
          stats.peopleFound++;
          console.log(`  ⚠️  Person already exists: ${existingPerson.email}`);
          
          // Update company link if needed
          if (company && !existingPerson.company && !options.dryRun) {
            await client.createPerson({
              name: existingPerson.name,
              email: existingPerson.email,
              companyId: company.id
            });
            console.log(`  ✓ Linked person to company`);
          }
        }
      } else {
        console.log(`  ⚠️  Skipping person: No email provided`);
      }

    } catch (error: any) {
      stats.errors++;
      const errorMsg = error.message || String(error);
      console.error(`  ❌ Error on row ${rowNum}: ${errorMsg}`);
      
      if (!options.skipErrors) {
        console.error('\n❌ Stopping due to error (use --skip-errors to continue)');
        process.exit(1);
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Import Summary');
  console.log('='.repeat(60));
  console.log(`Companies Created: ${stats.companiesCreated}`);
  console.log(`Companies Found (existing): ${stats.companiesFound}`);
  console.log(`People Created: ${stats.peopleCreated}`);
  console.log(`People Found (existing): ${stats.peopleFound}`);
  console.log(`Errors: ${stats.errors}`);
  console.log('='.repeat(60));

  if (options.dryRun) {
    console.log('\n🧪 This was a dry run. No data was actually imported.');
    console.log('   Remove --dry-run to perform actual import.');
  } else {
    console.log('\n✅ Import complete!');
  }
}

// CLI handling
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Twenty CRM CSV Import Script

Usage:
  ts-node scripts/twenty-import-csv.ts <csv-file> [options]

Options:
  --api-key <key>     Twenty API key (or use TWENTY_API_KEY env var)
  --base-url <url>    Twenty base URL (default: http://localhost:8080)
  --dry-run           Preview changes without creating contacts
  --skip-errors       Continue on errors (skip failed rows)

Environment Variables:
  TWENTY_API_KEY      API key for authentication
  TWENTY_BASE_URL     Base URL for Twenty API

Example:
  ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv
  
  TWENTY_API_KEY=your_key ts-node scripts/twenty-import-csv.ts contacts/file.csv --dry-run
    `);
    process.exit(0);
  }

  const csvPath = args[0];
  
  // Parse options - check .env first
  let apiKey = process.env.TWENTY_API_KEY || '';
  let baseUrl = process.env.TWENTY_API_BASE_URL || 
                process.env.TWENTY_GRAPHQL_URL?.replace('/graphql', '') ||
                'http://localhost:8080';
  let dryRun = false;
  let skipErrors = false;
  
  // If baseUrl is set but doesn't have protocol, add it
  if (baseUrl && !baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    baseUrl = `https://${baseUrl}`;
  }
  
  // Determine GraphQL endpoint
  let graphqlUrl = process.env.TWENTY_GRAPHQL_URL;
  if (!graphqlUrl) {
    if (baseUrl.includes('api.twenty.com')) {
      graphqlUrl = `${baseUrl}/graphql`;
    } else {
      graphqlUrl = `${baseUrl}/graphql`;
    }
  }

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--api-key' && args[i + 1]) {
      apiKey = args[i + 1];
      i++;
    } else if (args[i] === '--base-url' && args[i + 1]) {
      baseUrl = args[i + 1];
      // Auto-update graphqlUrl if not explicitly set
      if (!process.env.TWENTY_GRAPHQL_URL) {
        graphqlUrl = baseUrl.includes('/graphql') ? baseUrl : `${baseUrl}/graphql`;
      }
      i++;
    } else if (args[i] === '--dry-run') {
      dryRun = true;
    } else if (args[i] === '--skip-errors') {
      skipErrors = true;
    }
  }

  // Validation
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ Error: CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  if (!apiKey) {
    console.error('❌ Error: API key required. Set TWENTY_API_KEY env var or use --api-key');
    process.exit(1);
  }

  // Run import
  importContacts(csvPath, apiKey, baseUrl, { dryRun, skipErrors })
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Fatal error:', error.message);
      process.exit(1);
    });
}

if (require.main === module) {
  main();
}

export { TwentyClient, importContacts };


# Twenty CRM - CSV Import Guide

**Date**: October 31, 2025  
**Status**: Quick-start guide for programmatic contact import  
**Version**: 1.0.0

---

## 📋 Overview

This guide shows you how to programmatically import contacts from a CSV file into Twenty CRM.

**Script**: `/home/sk/skybox/scripts/twenty-import-csv.ts`

---

## 🚀 Quick Start

### 1. Get Your API Key

1. Open Twenty CRM: http://localhost:8080
2. Navigate to **Settings → APIs & Webhooks**
3. Click **Generate API Key**
4. Copy the key (shown only once)

### 2. Set Environment Variable

```bash
export TWENTY_API_KEY="your_api_key_here"
export TWENTY_BASE_URL="http://localhost:8080"  # Optional, defaults to this
```

### 3. Run Import Script

```bash
# Dry run (preview without importing)
ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv --dry-run

# Actual import
ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv
```

---

## 📊 CSV Format

The script expects a CSV with the following columns:

- **Company** (required) - Company name
- **Location** - Location/address
- **Industry** - Industry type
- **Size** - Company size (e.g., "Mid (250-999)")
- **Event Budget Tier** - Budget category
- **Phone** - Phone number
- **WhatsApp** - WhatsApp number
- **Email** - Contact email (required for creating person)
- **Website** - Company website URL
- **Services Offered** - Services description
- **Reviews/Rating** - Rating information
- **AI Technologies Used** - Technology tags

**Example CSV:**
```csv
Company,Location,Industry,Size,Event Budget Tier,Phone,WhatsApp,Email,Website,Services Offered,Reviews/Rating,AI Technologies Used
Globant,El Poblado,AI/Software Development,Large (900+),High > 60M,+57 601 798 8104,N/A,hi@globant.com,www.globant.com,"Web Development, Custom Software, AI",Large presence,"AI and software, multiple offices"
```

---

## 🔧 Script Options

### Command-Line Options

```bash
ts-node scripts/twenty-import-csv.ts <csv-file> [options]
```

**Options:**
- `--api-key <key>` - Specify API key (or use `TWENTY_API_KEY` env var)
- `--base-url <url>` - Twenty API URL (default: http://localhost:8080)
- `--dry-run` - Preview changes without creating contacts
- `--skip-errors` - Continue on errors (skip failed rows)

### Environment Variables

```bash
TWENTY_API_KEY=your_api_key_here
TWENTY_BASE_URL=http://localhost:8080  # Optional
```

---

## 📝 How It Works

### Process Flow

1. **Parse CSV** - Reads and parses CSV file
2. **For each row**:
   - **Create/Find Company** - Creates company if doesn't exist, or finds existing
   - **Extract Domain** - Parses website URL to extract domain
   - **Parse Employees** - Extracts employee count from size string
   - **Create Contact** - Creates person if email exists, links to company

### What Gets Created

**Companies:**
- Name: From `Company` column
- Domain: Extracted from `Website` column
- Employees: Parsed from `Size` column (e.g., "Mid (250-999)" → 999)

**People (Contacts):**
- Name: Generated from company name (e.g., "Contact at Company Name")
- Email: From `Email` column
- Phone: From `Phone` column
- Company: Linked to created/found company

### Duplicate Handling

- **Companies**: Checks by name before creating (prevents duplicates)
- **People**: Checks by email before creating (prevents duplicates)
- If person exists but not linked to company, links them

---

## 💻 Usage Examples

### Example 1: Dry Run (Preview)

```bash
export TWENTY_API_KEY="your_key_here"
ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv --dry-run
```

**Output:**
```
🚀 Starting CSV import...
📁 CSV File: contacts/medellin_top50_mid_agencies.csv
🔗 API URL: http://localhost:8080
🧪 Dry Run: Yes

📊 Found 5 rows to process

[2/5] Processing: SUBE Digital Agency
  ⏭️  Would create company: SUBE Digital Agency
  ⚠️  Skipping person: No email provided

[3/5] Processing: Globant
  ⏭️  Would create company: Globant
  ⏭️  Would create person: Contact at Globant (hi@globant.com)

...

📊 Import Summary
============================================================
Companies Created: 4
Companies Found (existing): 0
People Created: 2
People Found (existing): 0
Errors: 0
============================================================

🧪 This was a dry run. No data was actually imported.
```

### Example 2: Actual Import

```bash
export TWENTY_API_KEY="your_key_here"
ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv
```

### Example 3: Import with Error Handling

```bash
# Continue even if some rows fail
ts-node scripts/twenty-import-csv.ts contacts/medellin_top50_mid_agencies.csv --skip-errors
```

### Example 4: Custom API URL

```bash
ts-node scripts/twenty-import-csv.ts contacts/file.csv \
  --api-key "your_key" \
  --base-url "https://api.twenty.com"
```

---

## 🔍 Troubleshooting

### Error: "API key required"

**Solution:**
```bash
export TWENTY_API_KEY="your_api_key_here"
# Or use --api-key flag
ts-node scripts/twenty-import-csv.ts file.csv --api-key "your_key"
```

### Error: "CSV file not found"

**Solution:** Use absolute path or correct relative path
```bash
# Use absolute path
ts-node scripts/twenty-import-csv.ts /home/sk/skybox/contacts/file.csv

# Or from project root
ts-node scripts/twenty-import-csv.ts contacts/file.csv
```

### Error: "API Error (401): Unauthorized"

**Solution:** 
- Check API key is correct
- Verify API key hasn't been revoked
- Generate new key if needed

### Error: "Column count mismatch"

**Solution:** 
- Check CSV formatting (quotes, commas)
- Ensure header row matches data rows
- Use proper CSV escape for commas/quotes in values

### Warning: "No email provided"

**Solution:** 
- Row is skipped (person won't be created without email)
- Update CSV with email addresses
- Or modify script to create persons without email (not recommended)

---

## 🎯 Customization

### Modify Contact Name Format

Edit `extractContactName()` function in script:

```typescript
function extractContactName(row: CSVRow): string {
  // Custom logic here
  // Example: Extract from company name
  return `Sales Contact - ${row.Company}`;
}
```

### Add Custom Fields

Modify `createPerson()` call to include custom fields:

```typescript
const person = await client.createPerson({
  name: personName,
  email: email,
  phone: normalizePhone(row.Phone),
  companyId: company?.id,
  customFields: [
    { fieldId: 'industry_field_id', value: row.Industry },
    { fieldId: 'budget_tier_field_id', value: row['Event Budget Tier'] }
  ]
});
```

### Add Notes

Add note creation after person creation:

```typescript
// After creating person
await client.createNote({
  personId: person.id,
  body: `Services: ${row['Services Offered']}\nAI Tech: ${row['AI Technologies Used']}`
});
```

---

## 📚 Related Documentation

- [API & Webhooks Reference](./32-TWENTY-API-WEBHOOKS-REFERENCE.md)
- [Adding Contacts Guide](./31-TWENTY-ADD-CONTACTS-GUIDE.md)
- [Comprehensive Troubleshooting](./30-TWENTY-COMPREHENSIVE-TROUBLESHOOTING.md)

---

## ✅ Best Practices

1. **Always test with `--dry-run` first** - Preview changes before importing
2. **Backup your data** - Export existing contacts before bulk import
3. **Use `--skip-errors` for large imports** - Continue processing even if some rows fail
4. **Verify API key permissions** - Ensure key has create/update permissions
5. **Check duplicate handling** - Script prevents duplicates, but verify behavior
6. **Monitor import progress** - Watch console output for errors
7. **Validate CSV format** - Ensure headers match expected format

---

## 🚀 Next Steps

After importing contacts:

1. **Verify Data**: Check imported contacts in Twenty CRM UI
2. **Link Relationships**: Manually link contacts to existing records if needed
3. **Add Custom Fields**: Use custom fields for additional data (Industry, Budget Tier, etc.)
4. **Create Workflows**: Set up automations based on imported data
5. **Schedule Regular Imports**: Set up cron job for periodic CSV imports

---

**Last Updated**: October 31, 2025  
**Status**: ✅ Ready for use  
**Version**: 1.0.0


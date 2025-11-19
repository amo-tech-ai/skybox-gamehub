#!/usr/bin/env python3
"""
Import Medellín Agencies CSV to Twenty CRM

This script reads the medellin_top50_mid_agencies.csv file and imports
companies and contacts into Twenty CRM using the GraphQL API.

Usage:
    python3 import-medellin-agencies-to-twenty.py

Requirements:
    pip install requests python-dotenv

Environment Variables:
    TWENTY_API_URL=http://localhost:8080
    TWENTY_API_TOKEN=your-api-token-here
"""

import csv
import json
import os
import sys
import requests
from typing import Dict, List, Optional
from pathlib import Path

# Configuration
TWENTY_API_URL = os.getenv('TWENTY_API_URL', 'http://localhost:8080')
TWENTY_API_TOKEN = os.getenv('TWENTY_API_TOKEN', '')
CSV_FILE = Path(__file__).parent.parent / 'contacts' / 'medellin_top50_mid_agencies.csv'


def get_auth_headers() -> Dict[str, str]:
    """Get authorization headers for API requests."""
    headers = {
        'Content-Type': 'application/json',
    }
    if TWENTY_API_TOKEN:
        headers['Authorization'] = f'Bearer {TWENTY_API_TOKEN}'
    return headers


def create_company(company_data: Dict) -> Optional[str]:
    """
    Create a company in Twenty CRM.
    
    Args:
        company_data: Dictionary with company information
        
    Returns:
        Company ID if successful, None otherwise
    """
    mutation = """
    mutation CreateCompany($input: CompanyCreateInput!) {
      createCompany(data: $input) {
        id
        name
        domainName
      }
    }
    """
    
    # Extract domain from website if available
    domain = None
    if company_data.get('Website'):
        website = company_data['Website'].replace('www.', '').replace('http://', '').replace('https://', '')
        domain = website.split('/')[0] if website else None
    
    variables = {
        "input": {
            "name": company_data.get('Company', 'Unknown Company'),
            "domainName": domain,
            "employees": _parse_company_size(company_data.get('Size', '')),
            "industry": company_data.get('Industry', ''),
        }
    }
    
    # Add custom fields if they exist in your Twenty setup
    # You may need to adjust these based on your custom field IDs
    
    payload = {
        "query": mutation,
        "variables": variables
    }
    
    try:
        response = requests.post(
            f"{TWENTY_API_URL}/graphql",
            headers=get_auth_headers(),
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        result = response.json()
        
        if 'errors' in result:
            print(f"❌ Error creating company {company_data.get('Company')}: {result['errors']}")
            return None
        
        if 'data' in result and result['data'].get('createCompany'):
            company_id = result['data']['createCompany']['id']
            print(f"✅ Created company: {company_data.get('Company')} (ID: {company_id})")
            return company_id
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed for {company_data.get('Company')}: {e}")
        return None
    
    return None


def create_person(person_data: Dict, company_id: Optional[str] = None) -> Optional[str]:
    """
    Create a person in Twenty CRM.
    
    Args:
        person_data: Dictionary with person information
        company_id: Optional company ID to link person to company
        
    Returns:
        Person ID if successful, None otherwise
    """
    mutation = """
    mutation CreatePerson($input: PersonCreateInput!) {
      createPerson(data: $input) {
        id
        name
        email
        phone
      }
    }
    """
    
    # Extract name from email or use a default
    name = person_data.get('Contact Name', '')
    if not name:
        # Try to extract from email
        email = person_data.get('Email', '')
        if email and '@' in email:
            name = email.split('@')[0].replace('.', ' ').title()
        else:
            name = f"Contact at {person_data.get('Company', 'Unknown')}"
    
    variables = {
        "input": {
            "name": name,
            "email": person_data.get('Email') or None,
            "phone": person_data.get('Phone') or None,
        }
    }
    
    if company_id:
        variables["input"]["companyId"] = company_id
    
    # Remove None values
    variables["input"] = {k: v for k, v in variables["input"].items() if v is not None}
    
    payload = {
        "query": mutation,
        "variables": variables
    }
    
    try:
        response = requests.post(
            f"{TWENTY_API_URL}/graphql",
            headers=get_auth_headers(),
            json=payload,
            timeout=10
        )
        response.raise_for_status()
        result = response.json()
        
        if 'errors' in result:
            print(f"❌ Error creating person {name}: {result['errors']}")
            return None
        
        if 'data' in result and result['data'].get('createPerson'):
            person_id = result['data']['createPerson']['id']
            print(f"✅ Created person: {name} (ID: {person_id})")
            return person_id
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API request failed for person {name}: {e}")
        return None
    
    return None


def _parse_company_size(size_str: str) -> Optional[int]:
    """Parse company size string to integer."""
    if not size_str:
        return None
    
    # Extract numbers from size string like "Mid (250-999)" or "Large (900+)"
    import re
    numbers = re.findall(r'\d+', size_str)
    if numbers:
        # Use the first number as an estimate
        return int(numbers[0])
    return None


def read_csv_file(file_path: Path) -> List[Dict]:
    """Read CSV file and return list of dictionaries."""
    companies = []
    
    if not file_path.exists():
        print(f"❌ CSV file not found: {file_path}")
        sys.exit(1)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Skip empty rows
            if any(row.values()):
                companies.append(row)
    
    return companies


def main():
    """Main function to import companies and contacts."""
    print("🚀 Starting Medellín Agencies Import to Twenty CRM")
    print("=" * 60)
    
    # Check API URL
    if not TWENTY_API_URL:
        print("❌ Error: TWENTY_API_URL environment variable not set")
        print("   Set it to: export TWENTY_API_URL=http://localhost:8080")
        sys.exit(1)
    
    # Check if API is accessible
    try:
        health_check = requests.get(f"{TWENTY_API_URL}/healthz", timeout=5)
        if health_check.status_code != 200:
            print(f"⚠️  Warning: Twenty CRM at {TWENTY_API_URL} returned status {health_check.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"⚠️  Warning: Cannot reach Twenty CRM at {TWENTY_API_URL}")
        print(f"   Error: {e}")
        print("   Make sure Twenty CRM is running!")
        response = input("   Continue anyway? (y/n): ")
        if response.lower() != 'y':
            sys.exit(1)
    
    # Read CSV file
    print(f"\n📖 Reading CSV file: {CSV_FILE}")
    companies_data = read_csv_file(CSV_FILE)
    print(f"   Found {len(companies_data)} companies to import\n")
    
    if not companies_data:
        print("❌ No data found in CSV file")
        sys.exit(1)
    
    # Import companies
    created_companies = []
    created_people = []
    
    for idx, company_data in enumerate(companies_data, 1):
        company_name = company_data.get('Company', f'Company {idx}')
        print(f"\n[{idx}/{len(companies_data)}] Processing: {company_name}")
        
        # Create company
        company_id = create_company(company_data)
        if company_id:
            created_companies.append({
                'id': company_id,
                'name': company_name,
                'data': company_data
            })
            
            # Create person/contact if email or phone exists
            email = company_data.get('Email', '')
            phone = company_data.get('Phone', '') or company_data.get('WhatsApp', '')
            
            if email or phone:
                person_data = {
                    'Company': company_name,
                    'Email': email,
                    'Phone': phone,
                    'Contact Name': company_data.get('Contact Name', '')
                }
                person_id = create_person(person_data, company_id)
                if person_id:
                    created_people.append({
                        'id': person_id,
                        'company_id': company_id,
                        'name': person_data.get('Contact Name', 'Contact')
                    })
        else:
            print(f"   ⚠️  Skipped creating person - company creation failed")
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 Import Summary")
    print("=" * 60)
    print(f"✅ Companies created: {len(created_companies)}/{len(companies_data)}")
    print(f"✅ People/Contacts created: {len(created_people)}")
    print(f"\n🌐 View in Twenty CRM: {TWENTY_API_URL}")
    
    if created_companies:
        print("\n📋 Created Companies:")
        for company in created_companies:
            print(f"   - {company['name']}")

if __name__ == '__main__':
    main()


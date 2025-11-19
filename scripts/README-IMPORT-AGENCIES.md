# Import Medellín Agencies to Twenty CRM

## Overview

This script imports companies and contacts from `contacts/medellin_top50_mid_agencies.csv` into Twenty CRM programmatically.

## Setup

### 1. Install Dependencies

```bash
pip install requests python-dotenv
```

### 2. Get Twenty CRM API Token

1. Open Twenty CRM: http://localhost:8080
2. Go to **Settings** → **API & Webhooks**
   - If you don't see this section, enable **Advanced mode** in settings
3. Generate a new API token
4. Copy the token

### 3. Set Environment Variables

```bash
export TWENTY_API_URL=http://localhost:8080
export TWENTY_API_TOKEN=your-api-token-here
```

Or create a `.env` file:
```bash
TWENTY_API_URL=http://localhost:8080
TWENTY_API_TOKEN=your-api-token-here
```

### 4. Run the Script

```bash
cd /home/sk/skybox
python3 scripts/import-medellin-agencies-to-twenty.py
```

## What It Does

1. **Reads CSV file**: `contacts/medellin_top50_mid_agencies.csv`
2. **Creates Companies**: Each row becomes a company in Twenty CRM
3. **Creates Contacts**: Creates people linked to companies if email/phone exists
4. **Maps Fields**:
   - Company → Company name
   - Website → Domain name (extracted)
   - Size → Employee count (parsed)
   - Industry → Industry field
   - Email → Contact email
   - Phone → Contact phone

## CSV Fields Used

| CSV Column | Twenty CRM Field | Notes |
|------------|------------------|-------|
| Company | Company name | Required |
| Website | Domain name | Extracted from URL |
| Size | Employees | Parsed from string |
| Industry | Industry | Direct mapping |
| Email | Person email | Creates contact if exists |
| Phone | Person phone | Creates contact if exists |
| Location | (Custom field) | Can be added as custom field |
| Event Budget Tier | (Custom field) | Can be added as custom field |
| Services Offered | (Custom field) | Can be added as custom field |

## Customization

To add custom fields:

1. **Create custom fields in Twenty CRM**:
   - Settings → Data Model → Companies
   - Add fields like: Location, Budget Tier, Services

2. **Update the script**:
   - Modify `create_company()` function
   - Add custom field mappings in variables

## Troubleshooting

### "Cannot reach Twenty CRM"
- Make sure Twenty CRM is running: `docker compose ps` (in twenty-docker directory)
- Check URL: http://localhost:8080

### "Authentication failed"
- Verify API token is correct
- Check token has permissions to create companies/people
- Token should be in format: `Bearer <token>`

### "GraphQL errors"
- Check Twenty CRM logs: `docker compose logs server`
- Verify GraphQL schema matches your Twenty version
- May need to adjust mutation syntax for your version

### "CSV file not found"
- Check file path: `contacts/medellin_top50_mid_agencies.csv`
- Run script from `/home/sk/skybox` directory

## Alternative: Manual Import via UI

If API import doesn't work:

1. Open Twenty CRM: http://localhost:8080
2. Go to **Companies** → **Import**
3. Upload CSV file
4. Map columns to fields
5. Review and confirm import

## Next Steps

After import:
1. Review imported companies in Twenty CRM
2. Link additional contacts manually if needed
3. Add custom fields for Location, Budget Tier, etc.
4. Set up workflows for lead management
5. Add activities and notes for each company


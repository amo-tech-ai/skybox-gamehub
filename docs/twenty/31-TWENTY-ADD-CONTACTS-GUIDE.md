# Twenty CRM - How to Add Contacts (People)

**Date**: October 31, 2025  
**Based on**: [Twenty User Guide](https://twenty.com/user-guide), [Developer Docs](https://twenty.com/developers), [GitHub Repository](https://github.com/twentyhq/twenty)  
**Status**: Simple reference guide

---

## 📋 Overview

In Twenty CRM, **contacts are called "People"**. This guide shows you how to add people/contacts using both the UI and API methods.

---

## 🎯 Method 1: Add People via UI (Web Interface)

### Quick Steps

1. **Navigate to People View**
   - Open Twenty CRM: http://localhost:8080
   - Click on **"People"** in the left sidebar
   - Or navigate to the People module

2. **Add New Person**
   - Click the **"+"** button or **"Add Person"** button
   - Fill in the person's details:
     - **Name** (required)
     - **Email** (optional)
     - **Phone** (optional)
     - **Company** (link to company if applicable)
     - **Custom fields** (if configured)

3. **Save**
   - Click **"Save"** or press `Enter`
   - The person is now added to your CRM

### Bulk Import

- **CSV Import**: Use the import feature to add multiple people at once
- Navigate to People → Import → Upload CSV file
- Map CSV columns to Twenty CRM fields
- Review and confirm import

---

## 🔧 Method 2: Add People via API (Developer Method)

### REST API Endpoint

Based on Twenty's GraphQL API structure:

**Endpoint**: `POST /graphql`

**Mutation**:
```graphql
mutation CreatePerson($input: PersonCreateInput!) {
  createPerson(data: $input) {
    id
    name
    email
    phone
    createdAt
  }
}
```

**Variables**:
```json
{
  "input": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "companyId": "company-uuid-here" // Optional: link to company
  }
}
```

### Example: Using cURL

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "query": "mutation CreatePerson($input: PersonCreateInput!) { createPerson(data: $input) { id name email phone } }",
    "variables": {
      "input": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1-555-0123"
      }
    }
  }'
```

### Example: Using JavaScript/TypeScript

```typescript
const createPerson = async (personData: {
  name: string;
  email?: string;
  phone?: string;
  companyId?: string;
}) => {
  const response = await fetch('http://localhost:8080/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${yourAuthToken}`
    },
    body: JSON.stringify({
      query: `
        mutation CreatePerson($input: PersonCreateInput!) {
          createPerson(data: $input) {
            id
            name
            email
            phone
            createdAt
          }
        }
      `,
      variables: {
        input: personData
      }
    })
  });

  const result = await response.json();
  return result.data.createPerson;
};

// Usage
const newPerson = await createPerson({
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1-555-0456'
});
```

### Example: Using Python

```python
import requests

def create_person(name, email=None, phone=None, company_id=None):
    url = "http://localhost:8080/graphql"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {your_auth_token}"
    }
    
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
    
    variables = {
        "input": {
            "name": name,
            "email": email,
            "phone": phone,
            "companyId": company_id
        }
    }
    
    response = requests.post(
        url,
        headers=headers,
        json={"query": mutation, "variables": variables}
    )
    
    return response.json()

# Usage
result = create_person(
    name="John Doe",
    email="john.doe@example.com",
    phone="+1-555-0123"
)
print(result)
```

---

## 📊 Method 3: Import from CSV

### Steps

1. **Prepare CSV File**
   ```csv
   name,email,phone,company
   John Doe,john.doe@example.com,+1-555-0123,Acme Corp
   Jane Smith,jane.smith@example.com,+1-555-0456,Acme Corp
   Bob Johnson,bob@example.com,+1-555-0789,Tech Inc
   ```

2. **Import via UI**
   - Go to People → Import
   - Click "Upload CSV"
   - Select your CSV file
   - Map columns to fields
   - Review and confirm

3. **Import via API** (if available)
   - Check Twenty API documentation for bulk import endpoints
   - Usually involves uploading file and mapping fields

---

## 🎨 Custom Fields

### Adding Custom Fields to People

1. **Via Settings**
   - Go to Settings → Data Model → People
   - Click "Add Field"
   - Choose field type (text, number, date, etc.)
   - Set field name and properties

2. **Via API**
   ```graphql
   mutation CreateFieldMetadata($input: FieldMetadataCreateInput!) {
     createFieldMetadata(objectName: "person", data: $input) {
       id
       name
       type
     }
   }
   ```

### Using Custom Fields When Creating People

```json
{
  "input": {
    "name": "John Doe",
    "email": "john@example.com",
    "customFields": {
      "customFieldId": "value"
    }
  }
}
```

---

## 🔗 Linking People to Companies

### During Creation

```json
{
  "input": {
    "name": "John Doe",
    "email": "john@example.com",
    "companyId": "company-uuid-here"
  }
}
```

### After Creation

```graphql
mutation UpdatePerson($id: ID!, $input: PersonUpdateInput!) {
  updatePerson(id: $id, data: $input) {
    id
    company {
      id
      name
    }
  }
}
```

---

## ✅ Quick Reference

### UI Method
1. Navigate to People
2. Click "+" or "Add Person"
3. Fill in details
4. Save

### API Method
```graphql
mutation CreatePerson($input: PersonCreateInput!) {
  createPerson(data: $input) {
    id
    name
    email
  }
}
```

### Required Fields
- **name** (string, required)

### Optional Fields
- **email** (string)
- **phone** (string)
- **companyId** (string, UUID)
- **avatarUrl** (string)
- **jobTitle** (string)
- Custom fields (if configured)

---

## 🔍 Finding People

### Query All People

```graphql
query GetPeople {
  people {
    edges {
      node {
        id
        name
        email
        phone
        company {
          name
        }
      }
    }
  }
}
```

### Search People

```graphql
query SearchPeople($filter: PersonFilterInput!) {
  people(filter: $filter) {
    edges {
      node {
        id
        name
        email
      }
    }
  }
}
```

Variables:
```json
{
  "filter": {
    "name": { "contains": "John" },
    "email": { "eq": "john@example.com" }
  }
}
```

---

## 📚 Additional Resources

### Official Documentation
- **User Guide**: https://twenty.com/user-guide
  - [Contact and Account Management](https://twenty.com/user-guide/section/crm-essentials/contact-and-account-management) - Detailed guide
- **Developer Docs**: https://twenty.com/developers
- **API Documentation**: Settings → API & Webhooks in Twenty app (enable Advanced mode)
- **GitHub Repository**: https://github.com/twentyhq/twenty

### Community
- **Discord Community**: https://discord.gg/twenty
- **GitHub Issues**: https://github.com/twentyhq/twenty/issues

### Related Guides
- Data Model customization
- Workflows and automation
- Integrations setup

---

## 🚨 Common Issues

### Issue: "Cannot create person"
**Solution**: 
- Verify authentication token is valid
- Check required fields are provided
- Ensure user has permission to create people

### Issue: "Email already exists"
**Solution**:
- Check if person already exists
- Use update mutation instead of create
- Handle duplicate email error gracefully

### Issue: "Company not found"
**Solution**:
- Verify company ID exists
- Create company first if needed
- Check company ID format (must be UUID)

---

## 💡 Tips & Best Practices

1. **Batch Operations**: Use **CSV bulk import** for adding many contacts at once
2. **Email Validation**: Always validate email format - **email is essential for person identification**
3. **Company Linking**: Link people to companies using company domain or companyId for better organization
4. **Custom Fields**: Use custom fields to store business-specific data (job title, department, etc.)
5. **Permissions**: Ensure API tokens have correct permissions for creating people
6. **Automate with Workflows**: Set up workflows to automatically assign contacts or create follow-up tasks
7. **Reduce Manual Work**: 
   - Use **email/calendar sync** for automatic contact creation
   - Configure **website form webhooks** for lead capture
   - Integrate with other systems via API for data synchronization

### Workflow Automation Example
Set up workflows that:
- **Assign new contacts** to team members based on location/type
- **Create follow-up tasks** when specific types of contacts are added
- **Send welcome emails** automatically when contacts are created
- **Sync with billing/marketing** systems for data consistency

---

**Last Updated**: October 31, 2025  
**Status**: Simple reference guide ready  
**Version**: 1.0.0


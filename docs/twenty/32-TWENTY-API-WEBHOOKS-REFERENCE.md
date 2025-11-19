# Twenty CRM - API & Webhooks Complete Reference

**Date**: October 31, 2025  
**Based on**: [Twenty API Docs](https://twenty.com/developers/section/api-and-webhooks/api), [Webhooks Docs](https://twenty.com/developers/section/api-and-webhooks/webhooks), [GitHub](https://github.com/twentyhq/twenty)  
**Status**: Production-ready reference guide  
**Version**: 1.0.0

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Core Features](#core-features)
5. [Use Cases](#use-cases)
6. [Commands & Examples](#commands--examples)
7. [Adding Contacts Programmatically](#adding-contacts-programmatically)
8. [Advanced Features](#advanced-features)
9. [AI Agents & Automations](#ai-agents--automations)
10. [Webhooks](#webhooks)
11. [Quick Reference](#quick-reference)

---

## 🎯 Overview

Twenty CRM provides a powerful **REST and GraphQL API** for programmatic access to your CRM data. Use it to:

- **Create, read, update, delete** core CRM objects (People, Companies, Notes, Tasks)
- **Automate workflows** and integrations
- **Sync data** between systems
- **Build custom solutions** around your CRM data
- **Receive real-time notifications** via webhooks

**API Base URLs:**
- **Cloud**: `https://api.twenty.com/` or your custom domain/subdomain
- **Self-Hosted**: `http://localhost:8080/rest/` (REST) or `http://localhost:8080/graphql/` (GraphQL)

**API Playground**: Access within the app at **Settings → APIs & Webhooks**

---

## 🔐 Authentication

Twenty uses **API keys** for authentication. Every protected endpoint requires an API key in the request header.

### Getting an API Key

1. Log in to your Twenty workspace
2. Navigate to **Settings → APIs & Webhooks**
3. Click **Generate API Key**
4. Copy and securely store the key (shown only once)

### Using API Keys

Include the API key in the `Authorization` header using the Bearer token scheme:

```bash
Authorization: Bearer YOUR_API_KEY
```

**Example cURL:**
```bash
curl -X GET http://localhost:8080/rest/people \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Example JavaScript:**
```typescript
const response = await fetch('http://localhost:8080/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  },
  body: JSON.stringify({ query, variables })
});
```

**Security Best Practices:**
- Store API keys in environment variables (never commit to git)
- Rotate keys periodically
- Revoke compromised keys immediately
- Use separate keys for different integrations

---

## 🔌 API Endpoints

Twenty provides **two API interfaces**:

### 1. Core API

**Purpose**: Manage primary CRM data (People, Companies, Notes, Tasks)

**REST Endpoints:**
- Base URL: `/rest/`
- Methods: `GET`, `POST`, `PATCH`, `DELETE`
- Examples:
  - `GET /rest/people` - List all people
  - `POST /rest/people` - Create a person
  - `GET /rest/people/{id}` - Get person by ID
  - `PATCH /rest/people/{id}` - Update person
  - `DELETE /rest/people/{id}` - Delete person

**GraphQL Endpoints:**
- Base URL: `/graphql/`
- Single endpoint for all operations
- More flexible queries and mutations

**Recommended**: Use **GraphQL** for complex queries and better performance.

### 2. Metadata API

**Purpose**: Retrieve schema and configuration information

**Endpoints:**
- `GET /rest/metadata/objects` - List all object types and metadata
- `GET /rest/metadata/objects/{objectName}` - Get metadata for specific object
- `GET /rest/metadata/picklists` - Get dropdown field options

**Use Cases:**
- Dynamic form building
- Understanding data structure
- Integration setup

**Authentication**: Required (use API key)

---

## ⚡ Core Features

### 1. People (Contacts) Management

**Create, read, update, delete contacts:**

```graphql
# Create Person
mutation CreatePerson($input: PersonCreateInput!) {
  createPerson(data: $input) {
    id
    name
    email
    phone
    jobTitle
    company { id name }
    createdAt
  }
}

# Query People
query GetPeople($filter: PersonFilterInput, $first: Int, $after: String) {
  people(filter: $filter, first: $first, after: $after) {
    edges {
      node {
        id
        name
        email
        phone
        company { name }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}

# Update Person
mutation UpdatePerson($id: ID!, $input: PersonUpdateInput!) {
  updatePerson(id: $id, data: $input) {
    id
    name
    email
  }
}

# Delete Person
mutation DeletePerson($id: ID!) {
  deletePerson(id: $id) {
    success
  }
}
```

### 2. Companies Management

**Create, read, update, delete companies:**

```graphql
# Create Company
mutation CreateCompany($input: CompanyCreateInput!) {
  createCompany(data: $input) {
    id
    name
    domain
    employees
    address
    createdAt
  }
}

# Query Companies
query GetCompanies {
  companies {
    edges {
      node {
        id
        name
        domain
        employees
        people { id name }
      }
    }
  }
}
```

### 3. Notes Management

**Attach notes to people and companies:**

```graphql
# Create Note
mutation CreateNote($input: NoteCreateInput!) {
  createNote(data: $input) {
    id
    body
    author { id name }
    createdAt
  }
}

# Query Notes
query GetNotes($personId: ID!) {
  person(id: $personId) {
    notes {
      edges {
        node {
          id
          body
          createdAt
        }
      }
    }
  }
}
```

### 4. Tasks Management

**Create and manage tasks:**

```graphql
# Create Task
mutation CreateTask($input: TaskCreateInput!) {
  createTask(data: $input) {
    id
    title
    status
    dueDate
    assignee { id name }
  }
}

# Query Tasks
query GetTasks($filter: TaskFilterInput!) {
  tasks(filter: $filter) {
    edges {
      node {
        id
        title
        status
        dueDate
      }
    }
  }
}
```

### 5. Custom Fields

**Work with custom fields:**

```graphql
# Get Metadata (to see custom fields)
query GetPersonMetadata {
  metadata {
    objects(name: "person") {
      fields {
        name
        type
        isCustom
      }
    }
  }
}

# Create Person with Custom Fields
mutation CreatePersonWithCustomFields($input: PersonCreateInput!) {
  createPerson(data: $input) {
    id
    customFields {
      fieldId
      value
    }
  }
}
```

---

## 💼 Use Cases

### 1. **Bulk Contact Import**
Import contacts from CSV, Excel, or other systems.

**Scenario**: Import 1000 contacts from legacy CRM
```typescript
// Read CSV → Parse → Create via API in batches
const contacts = parseCSV('contacts.csv');
for (const contact of contacts) {
  await createPerson(contact);
}
```

### 2. **Website Lead Capture**
Automatically create contacts from website forms.

**Scenario**: Contact form submission creates person in CRM
```typescript
// Webhook handler
app.post('/webhook/contact-form', async (req, res) => {
  const { name, email, phone, company } = req.body;
  await createPerson({ name, email, phone, companyId: company });
  res.json({ success: true });
});
```

### 3. **Email Integration**
Sync contacts from email signatures or calendar events.

**Scenario**: Extract contacts from email signatures
```typescript
// Email parser → Extract contacts → Create people
const emailContacts = parseEmailSignatures(emails);
for (const contact of emailContacts) {
  await createOrUpdatePerson(contact);
}
```

### 4. **Sales Pipeline Automation**
Automatically create tasks and notes when deals progress.

**Scenario**: When deal status changes, create follow-up task
```typescript
// Webhook from sales system → Create task
await createTask({
  title: 'Follow up with lead',
  assigneeId: salesRepId,
  personId: leadId,
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
});
```

### 5. **Data Synchronization**
Keep CRM in sync with other systems (ERP, billing, etc.)

**Scenario**: Sync customer data between systems
```typescript
// Periodic sync job
setInterval(async () => {
  const externalContacts = await fetchFromExternalSystem();
  for (const contact of externalContacts) {
    await syncPerson(contact); // Create or update
  }
}, 3600000); // Every hour
```

### 6. **Reporting & Analytics**
Query data for custom reports and dashboards.

**Scenario**: Generate monthly sales report
```graphql
query SalesReport($startDate: DateTime!, $endDate: DateTime!) {
  people(filter: { createdAt: { gte: $startDate, lte: $endDate } }) {
    edges {
      node {
        name
        email
        company { name }
        notes { body }
      }
    }
  }
}
```

### 7. **Workflow Automation**
Trigger actions based on CRM events.

**Scenario**: Assign new contact to sales rep based on location
```typescript
// Webhook handler
onPersonCreated(async (person) => {
  const salesRep = await assignSalesRepByLocation(person.location);
  await createTask({
    title: 'New lead assigned',
    assigneeId: salesRep.id,
    personId: person.id
  });
});
```

---

## 💻 Commands & Examples

### REST API Examples

#### Create Person (REST)

```bash
curl -X POST http://localhost:8080/rest/people \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "jobTitle": "Sales Manager"
  }'
```

#### Get Person (REST)

```bash
curl -X GET http://localhost:8080/rest/people/{personId} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Update Person (REST)

```bash
curl -X PATCH http://localhost:8080/rest/people/{personId} \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+1-555-9999"
  }'
```

#### Delete Person (REST)

```bash
curl -X DELETE http://localhost:8080/rest/people/{personId} \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### GraphQL Examples

#### Create Person (GraphQL)

```graphql
mutation CreatePerson {
  createPerson(data: {
    name: "Jane Smith"
    email: "jane.smith@example.com"
    phone: "+1-555-0456"
    jobTitle: "Marketing Director"
  }) {
    id
    name
    email
    createdAt
  }
}
```

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreatePerson { createPerson(data: { name: \"Jane Smith\", email: \"jane@example.com\" }) { id name email } }"
  }'
```

#### Query People with Filter (GraphQL)

```graphql
query GetPeopleByEmail {
  people(filter: { email: { eq: "john@example.com" } }) {
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

#### Batch Create People (GraphQL)

```graphql
mutation BatchCreatePeople($inputs: [PersonCreateInput!]!) {
  batchCreatePeople(data: $inputs) {
    id
    name
    email
  }
}
```

**Variables:**
```json
{
  "inputs": [
    { "name": "Person 1", "email": "person1@example.com" },
    { "name": "Person 2", "email": "person2@example.com" },
    { "name": "Person 3", "email": "person3@example.com" }
  ]
}
```

### JavaScript/TypeScript Examples

#### Complete TypeScript Client

```typescript
// twenty-client.ts
export class TwentyClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'http://localhost:8080') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  private async request(query: string, variables?: any) {
    const response = await fetch(`${this.baseUrl}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ query, variables })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const result = await response.json();
    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    return result.data;
  }

  async createPerson(data: {
    name: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    companyId?: string;
  }) {
    const mutation = `
      mutation CreatePerson($input: PersonCreateInput!) {
        createPerson(data: $input) {
          id
          name
          email
          phone
          createdAt
        }
      }
    `;

    return this.request(mutation, { input: data });
  }

  async getPeople(filter?: any, first?: number, after?: string) {
    const query = `
      query GetPeople($filter: PersonFilterInput, $first: Int, $after: String) {
        people(filter: $filter, first: $first, after: $after) {
          edges {
            node {
              id
              name
              email
              phone
              company {
                id
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    return this.request(query, { filter, first, after });
  }

  async createCompany(data: {
    name: string;
    domain?: string;
    employees?: number;
    address?: string;
  }) {
    const mutation = `
      mutation CreateCompany($input: CompanyCreateInput!) {
        createCompany(data: $input) {
          id
          name
          domain
          employees
          createdAt
        }
      }
    `;

    return this.request(mutation, { input: data });
  }

  async updatePerson(id: string, data: Partial<{
    name: string;
    email: string;
    phone: string;
    jobTitle: string;
  }>) {
    const mutation = `
      mutation UpdatePerson($id: ID!, $input: PersonUpdateInput!) {
        updatePerson(id: $id, data: $input) {
          id
          name
          email
          phone
        }
      }
    `;

    return this.request(mutation, { id, input: data });
  }
}

// Usage
const client = new TwentyClient(process.env.TWENTY_API_KEY!);

const person = await client.createPerson({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-0123'
});
```

### Python Examples

```python
# twenty_client.py
import requests
from typing import Optional, Dict, Any

class TwentyClient:
    def __init__(self, api_key: str, base_url: str = "http://localhost:8080"):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }

    def _request(self, query: str, variables: Optional[Dict] = None) -> Dict[str, Any]:
        response = requests.post(
            f"{self.base_url}/graphql",
            headers=self.headers,
            json={"query": query, "variables": variables or {}}
        )
        response.raise_for_status()
        result = response.json()
        
        if "errors" in result:
            raise Exception(result["errors"][0]["message"])
        
        return result["data"]

    def create_person(self, name: str, email: Optional[str] = None, 
                     phone: Optional[str] = None, job_title: Optional[str] = None):
        mutation = """
        mutation CreatePerson($input: PersonCreateInput!) {
            createPerson(data: $input) {
                id
                name
                email
                phone
                createdAt
            }
        }
        """
        
        variables = {
            "input": {
                "name": name,
                "email": email,
                "phone": phone,
                "jobTitle": job_title
            }
        }
        
        return self._request(mutation, variables)

    def get_people(self, filter: Optional[Dict] = None, first: int = 100):
        query = """
        query GetPeople($filter: PersonFilterInput, $first: Int) {
            people(filter: $filter, first: $first) {
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
        """
        
        return self._request(query, {"filter": filter, "first": first})

# Usage
client = TwentyClient(api_key=os.getenv("TWENTY_API_KEY"))

person = client.create_person(
    name="Jane Smith",
    email="jane@example.com",
    phone="+1-555-0456"
)

people = client.get_people()
```

---

## 👥 Adding Contacts Programmatically

### Method 1: Single Contact Creation

```typescript
// Create one person
const person = await client.createPerson({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1-555-0123',
  jobTitle: 'Sales Manager'
});
```

### Method 2: Bulk Import from CSV

See script: `/home/sk/skybox/scripts/twenty-import-csv.ts`

### Method 3: Batch API Calls

```typescript
// Create multiple people efficiently
const people = [
  { name: 'Person 1', email: 'person1@example.com' },
  { name: 'Person 2', email: 'person2@example.com' },
  { name: 'Person 3', email: 'person3@example.com' }
];

// Use Promise.all for parallel execution (with rate limiting)
const BATCH_SIZE = 10;
for (let i = 0; i < people.length; i += BATCH_SIZE) {
  const batch = people.slice(i, i + BATCH_SIZE);
  await Promise.all(
    batch.map(person => client.createPerson(person))
  );
  // Rate limiting: wait between batches
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

### Method 4: Create Person with Company

```typescript
// Step 1: Create or find company
const company = await client.createCompany({
  name: 'Acme Corp',
  domain: 'acme.com',
  employees: 250
});

// Step 2: Create person linked to company
const person = await client.createPerson({
  name: 'John Doe',
  email: 'john@acme.com',
  companyId: company.id
});
```

### Method 5: Upsert (Create or Update)

```typescript
async function upsertPerson(email: string, data: PersonData) {
  // Check if person exists
  const existing = await client.getPeople({ email: { eq: email } });
  
  if (existing.people.edges.length > 0) {
    // Update existing
    const personId = existing.people.edges[0].node.id;
    return await client.updatePerson(personId, data);
  } else {
    // Create new
    return await client.createPerson(data);
  }
}
```

---

## 🚀 Advanced Features

### 1. Custom Fields

```graphql
# Get available custom fields
query GetCustomFields {
  metadata {
    objects(name: "person") {
      fields {
        name
        type
        isCustom
      }
    }
  }
}

# Create person with custom field
mutation CreatePersonWithCustomField {
  createPerson(data: {
    name: "John Doe"
    email: "john@example.com"
    customFields: [
      { fieldId: "custom_field_id", value: "Custom Value" }
    ]
  }) {
    id
    customFields {
      fieldId
      value
    }
  }
}
```

### 2. Relationships

```graphql
# Link person to company
mutation LinkPersonToCompany($personId: ID!, $companyId: ID!) {
  updatePerson(id: $personId, data: { companyId: $companyId }) {
    id
    company {
      id
      name
    }
  }
}

# Add note to person
mutation AddNoteToPerson($personId: ID!, $body: String!) {
  createNote(data: {
    personId: $personId
    body: $body
  }) {
    id
    body
    createdAt
  }
}
```

### 3. Pagination

```graphql
query GetPeoplePaginated($first: Int, $after: String) {
  people(first: $first, after: $after) {
    edges {
      node {
        id
        name
        email
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

**Pagination Loop:**
```typescript
async function getAllPeople() {
  let allPeople = [];
  let cursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const result = await client.getPeople(null, 100, cursor);
    allPeople.push(...result.people.edges.map(e => e.node));
    
    hasMore = result.people.pageInfo.hasNextPage;
    cursor = result.people.pageInfo.endCursor;
  }

  return allPeople;
}
```

### 4. Filtering & Searching

```graphql
query SearchPeople($search: String!) {
  people(filter: {
    or: [
      { name: { contains: $search } }
      { email: { contains: $search } }
      { phone: { contains: $search } }
    ]
  }) {
    edges {
      node {
        id
        name
        email
        phone
      }
    }
  }
}
```

### 5. Sorting

```graphql
query GetPeopleSorted($orderBy: PersonOrderByInput!) {
  people(orderBy: $orderBy) {
    edges {
      node {
        id
        name
        email
        createdAt
      }
    }
  }
}

# Variables
# { "orderBy": { "createdAt": "DESC" } }
```

---

## 🤖 AI Agents & Automations

### 1. Workflow Triggers

**Use webhooks to trigger AI-powered workflows:**

```typescript
// When new person is created, trigger AI analysis
onPersonCreated(async (person) => {
  // AI: Analyze email domain to suggest company
  const suggestedCompany = await aiAnalyzeCompany(person.email);
  
  // AI: Assign to sales rep based on AI-scored lead quality
  const leadScore = await aiScoreLead(person);
  const salesRep = await assignByLeadScore(leadScore);
  
  // AI: Generate personalized welcome message
  const welcomeMessage = await aiGenerateWelcome(person);
  await sendEmail(person.email, welcomeMessage);
});
```

### 2. Automated Data Enrichment

```typescript
// Enrich person data using AI
async function enrichPerson(personId: string) {
  const person = await client.getPerson(personId);
  
  // AI: Fetch LinkedIn data
  const linkedInData = await aiFetchLinkedIn(person.email);
  
  // AI: Analyze company website
  if (person.company?.website) {
    const companyData = await aiAnalyzeWebsite(person.company.website);
    await client.updateCompany(person.company.id, companyData);
  }
  
  // AI: Suggest tags/categories
  const tags = await aiSuggestTags(person);
  await client.addTags(personId, tags);
}
```

### 3. Smart Lead Scoring

```typescript
// AI-powered lead scoring
async function scoreLead(personId: string) {
  const person = await client.getPerson(personId);
  
  const score = await aiAnalyze({
    email: person.email,
    company: person.company?.name,
    jobTitle: person.jobTitle,
    notes: person.notes
  });
  
  await client.updatePerson(personId, {
    customFields: [
      { fieldId: 'lead_score', value: score.toString() }
    ]
  });
  
  return score;
}
```

### 4. Automated Follow-ups

```typescript
// AI-generated follow-up tasks
async function createAutoFollowUp(personId: string) {
  const person = await client.getPerson(personId);
  
  // AI: Determine next action
  const nextAction = await aiSuggestNextAction(person);
  
  // Create task
  await client.createTask({
    title: nextAction.title,
    personId: personId,
    dueDate: nextAction.dueDate,
    notes: nextAction.notes
  });
}
```

### 5. Conversation Intelligence

```typescript
// Analyze notes and emails for insights
async function analyzeConversations(personId: string) {
  const notes = await client.getPersonNotes(personId);
  const emails = await client.getPersonEmails(personId);
  
  // AI: Extract sentiment, topics, next steps
  const insights = await aiAnalyzeConversations([...notes, ...emails]);
  
  // Store insights
  await client.addNote(personId, {
    body: `AI Insights: ${insights.summary}`,
    type: 'ai_analysis'
  });
}
```

---

## 🔔 Webhooks

Webhooks enable **real-time notifications** when events occur in your CRM.

### Setting Up Webhooks

1. Navigate to **Settings → APIs & Webhooks**
2. Click **+ Create webhook**
3. Enter your webhook URL (must be publicly accessible)
4. Save

### Webhook Events

**Common Events:**
- `person.created` - New person added
- `person.updated` - Person information updated
- `person.deleted` - Person removed
- `company.created` - New company added
- `company.updated` - Company updated
- `company.deleted` - Company removed
- `note.created` - Note added
- `task.created` - Task created
- `task.completed` - Task marked complete

### Webhook Payload Example

```json
{
  "event": "person.created",
  "data": {
    "id": "abc12345",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+1-555-0123",
    "company": {
      "id": "company-123",
      "name": "Acme Corp"
    },
    "createdAt": "2025-10-31T10:30:45Z",
    "createdBy": "user_123"
  },
  "timestamp": "2025-10-31T10:30:50Z"
}
```

### Webhook Handler Example

```typescript
// Express.js webhook handler
app.post('/webhook/twenty', async (req, res) => {
  const { event, data, timestamp } = req.body;
  
  // Validate webhook signature
  const isValid = validateWebhookSignature(req);
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Handle event
  switch (event) {
    case 'person.created':
      await handlePersonCreated(data);
      break;
    case 'person.updated':
      await handlePersonUpdated(data);
      break;
    case 'company.created':
      await handleCompanyCreated(data);
      break;
    // ... other events
  }
  
  // Always return 2xx to acknowledge receipt
  res.status(200).json({ received: true });
});

async function handlePersonCreated(person: any) {
  // Your automation logic here
  console.log('New person created:', person.name);
  
  // Example: Send welcome email
  await sendWelcomeEmail(person.email);
  
  // Example: Create follow-up task
  await createTask({
    title: 'Welcome new contact',
    personId: person.id,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
  });
}
```

### Webhook Signature Validation

```typescript
import crypto from 'crypto';

function validateWebhookSignature(req: Request, secret: string): boolean {
  const signature = req.headers['x-twenty-webhook-signature'] as string;
  const timestamp = req.headers['x-twenty-webhook-timestamp'] as string;
  const payload = JSON.stringify(req.body);
  
  const stringToSign = `${timestamp}:${payload}`;
  const computedSignature = crypto
    .createHmac('sha256', secret)
    .update(stringToSign)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(computedSignature)
  );
}
```

---

## 📝 Quick Reference

### Authentication
```bash
Authorization: Bearer YOUR_API_KEY
```

### Base URLs
- REST: `http://localhost:8080/rest/`
- GraphQL: `http://localhost:8080/graphql/`
- Metadata: `http://localhost:8080/rest/metadata/`

### Common Operations

**Create Person:**
```graphql
mutation { createPerson(data: {name: "John", email: "john@example.com"}) { id } }
```

**Get People:**
```graphql
query { people { edges { node { id name email } } } }
```

**Update Person:**
```graphql
mutation { updatePerson(id: "id", data: {phone: "+1234"}) { id } }
```

**Delete Person:**
```graphql
mutation { deletePerson(id: "id") { success } }
```

### Environment Variables
```bash
TWENTY_API_KEY=your_api_key_here
TWENTY_BASE_URL=http://localhost:8080
```

### Response Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

---

## 📚 Additional Resources

### Official Documentation
- **API Docs**: https://twenty.com/developers/section/api-and-webhooks/api
- **Webhooks Docs**: https://twenty.com/developers/section/api-and-webhooks/webhooks
- **User Guide**: https://twenty.com/user-guide
- **GitHub**: https://github.com/twentyhq/twenty

### Community
- **Discord**: https://discord.gg/twenty
- **GitHub Issues**: https://github.com/twentyhq/twenty/issues
- **GitHub Discussions**: https://github.com/twentyhq/twenty/discussions

### Related Guides
- [Adding Contacts Guide](./31-TWENTY-ADD-CONTACTS-GUIDE.md)
- [Comprehensive Troubleshooting](./30-TWENTY-COMPREHENSIVE-TROUBLESHOOTING.md)

---

**Last Updated**: October 31, 2025  
**Status**: ✅ Production-ready reference guide  
**Version**: 1.0.0






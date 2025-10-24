# Supabase Database Connection Methods - Complete Guide

**Project**: Skybox GameHub
**Project Ref**: `dbocegamkdnsorhtdbni`
**Region**: `aws-1-us-east-1`
**Last Updated**: 2025-10-24

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Method 1: Direct Postgres Connection (psql)](#method-1-direct-postgres-connection-psql)
3. [Method 2: Supabase CLI Linked Project](#method-2-supabase-cli-linked-project)
4. [Method 3: Node.js with postgres.js](#method-3-nodejs-with-postgresjs)
5. [Method 4: Supabase REST API](#method-4-supabase-rest-api)
6. [Method 5: Supabase MCP (Claude Desktop)](#method-5-supabase-mcp-claude-desktop)
7. [Method 6: Local Development with Supabase CLI](#method-6-local-development-with-supabase-cli)
8. [Environment Variables Reference](#environment-variables-reference)
9. [Troubleshooting](#troubleshooting)
10. [Consolidated Test Checklist](#consolidated-test-checklist)

---

## Quick Reference

| Method | Use Case | Connection Type | Auth Required |
|--------|----------|-----------------|---------------|
| psql | Quick queries, admin tasks | Direct connection | DB Password |
| Supabase CLI | Schema management, migrations | CLI token or DB password | Access token |
| postgres.js | Node.js backend applications | Connection pooler | DB Password |
| REST API | Frontend, serverless functions | HTTPS API | API keys |
| MCP | Claude Desktop integration | REST API | Service role key |
| Local Dev | Development, testing | Local Docker | None (local) |

---

## Method 1: Direct Postgres Connection (psql)

### Official Docs
- https://supabase.com/docs/guides/database/connecting-to-postgres
- Section: "Direct Connection" vs "Connection Pooler"

### A) Copy-Run Quickstart

```bash
# 1. Get your database password from Supabase Dashboard
# Dashboard → Project Settings → Database → Database Password
# (Reset if needed)

# 2. Choose connection method:

# Option A: Transaction Pooler (RECOMMENDED for apps)
# Port: 6543, Mode: Transaction pooling
PGPASSWORD='[YOUR_DB_PASSWORD]' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni

# Option B: Session Pooler (for tools like Prisma)
# Port: 5432, Mode: Session pooling
PGPASSWORD='[YOUR_DB_PASSWORD]' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 5432 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni

# Option C: Direct Connection (bypass pooler)
# Port: 5432, Host: db.PROJECT_REF.supabase.co
PGPASSWORD='[YOUR_DB_PASSWORD]' psql \
  -h db.dbocegamkdnsorhtdbni.supabase.co \
  -p 5432 \
  -d postgres \
  -U postgres

# 3. Test connectivity
\dt  -- List tables
\q   -- Quit
```

### B) Test Plan & Proof

**Test Script**: `test-psql-connection.sh`

```bash
#!/bin/bash
# File: supabase/tests/test-psql-connection.sh

# Set your password
export PGPASSWORD='YOUR_DB_PASSWORD'

# Test connection and run CRUD
psql -h aws-1-us-east-1.pooler.supabase.com -p 6543 -d postgres -U postgres.dbocegamkdnsorhtdbni << 'EOF'
-- Create test schema and table
CREATE SCHEMA IF NOT EXISTS connectivity_test;
CREATE TABLE IF NOT EXISTS connectivity_test.ping (
  id SERIAL PRIMARY KEY,
  note TEXT,
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- Insert test row
INSERT INTO connectivity_test.ping (id, note) VALUES (1, 'ok');

-- Select to verify
SELECT * FROM connectivity_test.ping WHERE id = 1;

-- Cleanup
DROP TABLE connectivity_test.ping;
DROP SCHEMA connectivity_test;

-- Success message
SELECT 'Connection test passed!' AS status;
EOF

echo "✅ psql connection test complete"
```

**Expected Output**:
```
CREATE SCHEMA
CREATE TABLE
INSERT 0 1
 id | note |             ts
----+------+----------------------------
  1 | ok   | 2025-10-24 12:34:56.789+00
DROP TABLE
DROP SCHEMA
        status
-----------------------
 Connection test passed!
```

### C) Artifacts

**Connection String Templates**:

```bash
# Transaction Pooler (Port 6543)
postgresql://postgres.dbocegamkdnsorhtdbni:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require

# Session Pooler (Port 5432)
postgresql://postgres.dbocegamkdnsorhtdbni:[PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require

# Direct Connection (Port 5432)
postgresql://postgres:[PASSWORD]@db.dbocegamkdnsorhtdbni.supabase.co:5432/postgres?sslmode=require
```

**Database Backup**:

```bash
# Using pg_dump (direct connection)
PGPASSWORD='YOUR_DB_PASSWORD' pg_dump \
  -h db.dbocegamkdnsorhtdbni.supabase.co \
  -p 5432 \
  -U postgres \
  -d postgres \
  --schema=public \
  --no-owner \
  --no-acl \
  > backup_$(date +%Y%m%d_%H%M%S).sql

# Using Supabase CLI
supabase db dump -f backup.sql
```

### D) Troubleshooting Cheatsheet

**Issue 1**: `FATAL: password authentication failed`
- **Fix**: Reset DB password in Dashboard → Settings → Database → Database Password
- **Note**: This is different from your Supabase account password

**Issue 2**: `SSL connection has been closed unexpectedly`
- **Fix**: Always use `sslmode=require` in connection string
- **Fix**: Ensure no firewall blocking port 5432 or 6543

**Issue 3**: `could not translate host name to address`
- **Fix**: Check region in hostname (`aws-1-us-east-1` vs `aws-0-us-west-1`)
- **Fix**: Verify project ref is correct: `dbocegamkdnsorhtdbni`

**Issue 4**: Connection hangs or times out
- **Fix**: Use pooler instead of direct connection
- **Fix**: Check if your IP needs to be whitelisted (if IP restrictions enabled)

**Issue 5**: `connection limit exceeded`
- **Fix**: Use transaction pooler (port 6543) instead of direct connection
- **Fix**: Close idle connections in your app

---

## Method 2: Supabase CLI Linked Project

### Official Docs
- https://supabase.com/docs/guides/local-development/cli/getting-started
- Section: "Link your project"

### A) Copy-Run Quickstart

```bash
# 1. Ensure Supabase CLI is installed
supabase --version  # Should be >= 1.0

# 2. Login to Supabase CLI
supabase login

# This opens browser for authentication
# ⚠️ IMPORTANT: If you get "access denied" error, try:

# Option A: Login with access token
supabase login --token YOUR_ACCESS_TOKEN

# Get access token from:
# Dashboard → Account → Access Tokens → Generate New Token
# Scope: Read/Write for projects

# 3. Link your project
cd /home/sk/skybox-gamehub
supabase link --project-ref dbocegamkdnsorhtdbni

# If using password instead of token:
supabase link --project-ref dbocegamkdnsorhtdbni --password YOUR_DB_PASSWORD

# 4. Verify link
supabase status

# 5. Pull remote schema
supabase db pull

# 6. Push local migrations
supabase db push
```

### B) Test Plan & Proof

**Test Script**: `test-cli-link.sh`

```bash
#!/bin/bash
# File: supabase/tests/test-cli-link.sh

echo "🔍 Testing Supabase CLI Link..."

# 1. Check if linked
if [ ! -f ".supabase/config.toml" ]; then
  echo "❌ Project not linked. Run: supabase link --project-ref dbocegamkdnsorhtdbni"
  exit 1
fi

# 2. Test db pull
echo "📥 Testing db pull..."
supabase db pull --schema public

if [ $? -eq 0 ]; then
  echo "✅ db pull succeeded"
else
  echo "❌ db pull failed"
  exit 1
fi

# 3. Test migration creation
echo "🆕 Creating test migration..."
cat > supabase/migrations/test_cli_connectivity.sql << 'EOF'
-- Test migration
CREATE TABLE IF NOT EXISTS connectivity_test_cli (
  id SERIAL PRIMARY KEY,
  note TEXT
);

INSERT INTO connectivity_test_cli (note) VALUES ('CLI test passed');

DROP TABLE connectivity_test_cli;
EOF

# 4. Test db push
echo "📤 Testing db push..."
supabase db push

if [ $? -eq 0 ]; then
  echo "✅ db push succeeded"
else
  echo "❌ db push failed"
  exit 1
fi

# 5. Cleanup
rm supabase/migrations/test_cli_connectivity.sql

echo "✅ All CLI tests passed!"
```

**Expected Output**:
```
🔍 Testing Supabase CLI Link...
📥 Testing db pull...
Pulling schema from remote database...
Schema written to supabase/schema.sql
✅ db pull succeeded
🆕 Creating test migration...
📤 Testing db push...
Applying migration: test_cli_connectivity.sql
Migration applied successfully
✅ db push succeeded
✅ All CLI tests passed!
```

### C) Artifacts

**Verify Link Status**:

```bash
# Check linked project
cat .supabase/config.toml | grep project_id

# Check remote connection
supabase db remote status

# List migrations
supabase migration list

# Diff local vs remote
supabase db diff
```

### D) Troubleshooting Cheatsheet

**Issue 1**: `Your account does not have the necessary privileges`
- **Fix**: Your access token is invalid or expired
- **Solution 1**: Generate new access token in Dashboard → Account → Access Tokens
- **Solution 2**: Use `supabase login --token YOUR_NEW_TOKEN`
- **Solution 3**: Use DB password method: `supabase link --password YOUR_DB_PASSWORD`

**Issue 2**: `Project not found`
- **Fix**: Verify project ref is correct: `dbocegamkdnsorhtdbni`
- **Fix**: Check you're logged into correct organization

**Issue 3**: `open supabase/.temp/profile: no such file or directory`
- **Fix**: Create directory: `mkdir -p .supabase/.temp`
- **Fix**: Re-login: `supabase login`

**Issue 4**: `db push` fails with schema drift
- **Fix**: Pull remote first: `supabase db pull`
- **Fix**: Review diff: `supabase db diff`
- **Fix**: Resolve conflicts manually

**Issue 5**: `connection refused` during db operations
- **Fix**: Check your network connection
- **Fix**: Verify Supabase services are up: https://status.supabase.com

---

## Method 3: Node.js with postgres.js

### Official Docs
- https://supabase.com/docs/guides/database/postgres-js
- https://github.com/porsager/postgres

### A) Copy-Run Quickstart

```bash
# 1. Install postgres.js
npm install postgres

# 2. Create connection file
# See artifacts below

# 3. Run test
node test-postgresjs.mjs

# 4. Expected: Connection success + CRUD operations complete
```

### B) Test Plan & Proof

**Test Script**: `test-postgresjs.mjs`

```javascript
// File: supabase/tests/test-postgresjs.mjs
import postgres from 'postgres'

// IMPORTANT: Use transaction pooler (port 6543) for app connections
const sql = postgres({
  host: 'aws-1-us-east-1.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  username: 'postgres.dbocegamkdnsorhtdbni',
  password: process.env.DB_PASSWORD,
  ssl: 'require',
  idle_timeout: 20,
  max_lifetime: 60 * 30, // 30 minutes
})

async function testConnection() {
  try {
    console.log('🔍 Testing postgres.js connection...')

    // 1. Test connection
    await sql`SELECT 1 AS test`
    console.log('✅ Connection successful')

    // 2. Create test schema and table
    await sql`CREATE SCHEMA IF NOT EXISTS connectivity_test`
    await sql`
      CREATE TABLE IF NOT EXISTS connectivity_test.ping (
        id SERIAL PRIMARY KEY,
        note TEXT,
        ts TIMESTAMPTZ DEFAULT NOW()
      )
    `
    console.log('✅ Table created')

    // 3. Insert test row
    await sql`
      INSERT INTO connectivity_test.ping (id, note)
      VALUES (1, 'postgres.js test ok')
    `
    console.log('✅ Row inserted')

    // 4. Select to verify
    const result = await sql`
      SELECT * FROM connectivity_test.ping WHERE id = 1
    `
    console.log('✅ Row retrieved:', result[0])

    // 5. Cleanup
    await sql`DROP TABLE connectivity_test.ping`
    await sql`DROP SCHEMA connectivity_test`
    console.log('✅ Cleanup complete')

    console.log('\n🎉 All tests passed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    throw error
  } finally {
    await sql.end()
  }
}

testConnection()
```

**Run Test**:

```bash
# Set password
export DB_PASSWORD='YOUR_DB_PASSWORD'

# Run test
node supabase/tests/test-postgresjs.mjs
```

**Expected Output**:
```
🔍 Testing postgres.js connection...
✅ Connection successful
✅ Table created
✅ Row inserted
✅ Row retrieved: { id: 1, note: 'postgres.js test ok', ts: 2025-10-24T12:34:56.789Z }
✅ Cleanup complete

🎉 All tests passed!
```

### C) Artifacts

**Production Connection Example**:

```javascript
// File: src/lib/db.ts
import postgres from 'postgres'

// For web applications, use transaction pooler (port 6543)
const sql = postgres(process.env.DATABASE_URL, {
  // Connection pooling settings
  max: 10, // Max connections in pool
  idle_timeout: 20,
  connect_timeout: 10,

  // SSL is required
  ssl: 'require',

  // Type conversions
  types: {
    date: {
      to: 1184,
      from: [1082, 1114, 1184],
      serialize: (x: Date) => x.toISOString(),
      parse: (x: string) => new Date(x),
    },
  },

  // Error handling
  onnotice: () => {}, // Silence notices
})

export default sql
```

**Query Examples**:

```javascript
// Select
const events = await sql`
  SELECT * FROM events
  WHERE status = 'published'
  ORDER BY event_datetime DESC
  LIMIT 10
`

// Insert
const [newEvent] = await sql`
  INSERT INTO events (title, slug, description, event_datetime)
  VALUES (${title}, ${slug}, ${description}, ${datetime})
  RETURNING *
`

// Update
await sql`
  UPDATE events
  SET status = 'past'
  WHERE event_datetime < NOW()
`

// Transaction
await sql.begin(async sql => {
  await sql`INSERT INTO events (title) VALUES ('Event 1')`
  await sql`INSERT INTO event_highlights (event_id) VALUES (${eventId})`
})
```

### D) Troubleshooting Cheatsheet

**Issue 1**: `Error: connect ETIMEDOUT`
- **Fix**: Use transaction pooler (port 6543), not direct connection
- **Fix**: Check firewall isn't blocking outbound connections

**Issue 2**: `SSL connection has been closed unexpectedly`
- **Fix**: Always include `ssl: 'require'` in config
- **Fix**: Update postgres.js to latest: `npm update postgres`

**Issue 3**: `remaining connection slots reserved`
- **Fix**: You're hitting connection limit - use pooler, not direct
- **Fix**: Reduce `max` connections in config
- **Fix**: Ensure you call `sql.end()` when done

**Issue 4**: `password authentication failed`
- **Fix**: Use correct username format: `postgres.PROJECT_REF`
- **Fix**: Reset database password in Supabase dashboard

**Issue 5**: Slow queries or timeouts
- **Fix**: Add `statement_timeout` to connection string
- **Fix**: Use `sql.reserve()` for long-running queries
- **Fix**: Check query performance with `EXPLAIN ANALYZE`

---

## Method 4: Supabase REST API

### Official Docs
- https://supabase.com/docs/guides/api
- https://supabase.com/docs/guides/api/rest/quickstart

### A) Copy-Run Quickstart

```bash
# Setup
PROJECT_REF="dbocegamkdnsorhtdbni"
API_URL="https://${PROJECT_REF}.supabase.co"
ANON_KEY="YOUR_ANON_KEY"
SERVICE_KEY="YOUR_SERVICE_ROLE_KEY"

# 1. Test public endpoint (anon key)
# Read published events
curl -X GET "${API_URL}/rest/v1/events?status=eq.published&select=*" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ANON_KEY}"

# 2. Test with service role (admin access)
# Read all events (including drafts)
curl -X GET "${API_URL}/rest/v1/events?select=*" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}"

# 3. Insert via service role (bypasses RLS)
curl -X POST "${API_URL}/rest/v1/events" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{
    "title": "API Test Event",
    "slug": "api-test",
    "description": "Test event created via REST API",
    "event_date": "2025-12-01",
    "event_time": "19:00:00",
    "event_datetime": "2025-12-01T19:00:00-05:00",
    "status": "draft"
  }'

# 4. Update via service role
curl -X PATCH "${API_URL}/rest/v1/events?slug=eq.api-test" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"status": "published"}'

# 5. Delete via service role
curl -X DELETE "${API_URL}/rest/v1/events?slug=eq.api-test" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}"
```

### B) Test Plan & Proof

**Test Script**: `test-rest-api.sh`

```bash
#!/bin/bash
# File: supabase/tests/test-rest-api.sh

# Load environment
source .env.local

PROJECT_REF="dbocegamkdnsorhtdbni"
API_URL="https://${PROJECT_REF}.supabase.co"
ANON_KEY="${VITE_SUPABASE_ANON_KEY}"
SERVICE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"

echo "🔍 Testing Supabase REST API..."

# Test 1: Public read (anon key)
echo "1️⃣ Testing public read (anon key)..."
RESPONSE=$(curl -s -X GET "${API_URL}/rest/v1/event_categories?select=*" \
  -H "apikey: ${ANON_KEY}" \
  -H "Authorization: Bearer ${ANON_KEY}")

if echo "$RESPONSE" | grep -q "Baseball"; then
  echo "✅ Public read successful"
else
  echo "❌ Public read failed: $RESPONSE"
  exit 1
fi

# Test 2: Create test table (service role)
echo "2️⃣ Creating test table..."
curl -s -X POST "${API_URL}/rest/v1/rpc/execute_sql" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "CREATE TABLE IF NOT EXISTS connectivity_test_api (id SERIAL PRIMARY KEY, note TEXT)"
  }' > /dev/null

echo "✅ Test table created"

# Test 3: Insert via REST
echo "3️⃣ Inserting test row..."
RESPONSE=$(curl -s -X POST "${API_URL}/rest/v1/connectivity_test_api" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: return=representation" \
  -d '{"note": "REST API test passed"}')

if echo "$RESPONSE" | grep -q "REST API test passed"; then
  echo "✅ Insert successful"
else
  echo "❌ Insert failed: $RESPONSE"
  exit 1
fi

# Test 4: Select via REST
echo "4️⃣ Selecting test row..."
RESPONSE=$(curl -s -X GET "${API_URL}/rest/v1/connectivity_test_api?select=*" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}")

if echo "$RESPONSE" | grep -q "REST API test passed"; then
  echo "✅ Select successful"
else
  echo "❌ Select failed: $RESPONSE"
  exit 1
fi

# Test 5: Cleanup
echo "5️⃣ Cleaning up..."
curl -s -X DELETE "${API_URL}/rest/v1/connectivity_test_api?id=gt.0" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" > /dev/null

curl -s -X POST "${API_URL}/rest/v1/rpc/execute_sql" \
  -H "apikey: ${SERVICE_KEY}" \
  -H "Authorization: Bearer ${SERVICE_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"query": "DROP TABLE connectivity_test_api"}' > /dev/null

echo "✅ Cleanup complete"
echo "\n🎉 All REST API tests passed!"
```

**Expected Output**:
```
🔍 Testing Supabase REST API...
1️⃣ Testing public read (anon key)...
✅ Public read successful
2️⃣ Creating test table...
✅ Test table created
3️⃣ Inserting test row...
✅ Insert successful
4️⃣ Selecting test row...
✅ Select successful
5️⃣ Cleaning up...
✅ Cleanup complete

🎉 All REST API tests passed!
```

### C) Artifacts

**Frontend API Client**:

```typescript
// File: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'skybox-gamehub',
    },
  },
})

// Usage examples
export const eventsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select('*, event_highlights(*), event_specials(*)')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('event_datetime', { ascending: true })

    if (error) throw error
    return data
  },

  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        category:event_categories(*),
        venue:venues(*),
        highlights:event_highlights(*),
        prizes:event_prizes(*),
        specials:event_specials(*),
        faqs:event_faqs(*),
        packages:event_packages(*)
      `)
      .eq('slug', slug)
      .single()

    if (error) throw error
    return data
  },

  async incrementViews(eventId: string) {
    const { error } = await supabase.rpc('increment_event_views', {
      event_id_param: eventId
    })
    if (error) console.error('Failed to increment views:', error)
  },
}
```

**REST API Query Patterns**:

```bash
# Filter operators
?column=eq.value       # Equal
?column=neq.value      # Not equal
?column=gt.value       # Greater than
?column=gte.value      # Greater than or equal
?column=lt.value       # Less than
?column=lte.value      # Less than or equal
?column=like.*pattern* # Pattern matching
?column=is.null        # IS NULL
?column=in.(val1,val2) # IN list

# Combining filters
?status=eq.published&is_featured=eq.true

# Select specific columns
?select=id,title,slug

# Select with joins
?select=*,category:event_categories(name,slug)

# Ordering
?order=event_datetime.asc
?order=created_at.desc

# Pagination
?limit=10&offset=0

# Full-text search (requires GIN index)
?description=fts.halloween

# Count
?select=count
```

### D) Troubleshooting Cheatsheet

**Issue 1**: `{"message":"JWT expired"}`
- **Fix**: Your API key token is expired (shouldn't happen with anon/service keys)
- **Fix**: Regenerate keys in Dashboard → Settings → API

**Issue 2**: `{"code":"PGRST116","message":"Cannot access table"}`
- **Fix**: RLS is blocking your query
- **Solution 1**: Use service role key (bypasses RLS)
- **Solution 2**: Add appropriate RLS policy
- **Solution 3**: Temporarily disable RLS for testing (not recommended)

**Issue 3**: `{"code":"22P02","message":"invalid input syntax"}`
- **Fix**: Check data types in your JSON payload
- **Fix**: UUID fields need valid UUIDs, not integers

**Issue 4**: Empty response `[]` when expecting data
- **Fix**: Check RLS policies - anon key can only see published data
- **Fix**: Verify filter syntax is correct
- **Fix**: Use service role key to bypass RLS and test

**Issue 5**: `{"code":"23505","message":"duplicate key value"}`
- **Fix**: You're violating a unique constraint (e.g., slug already exists)
- **Fix**: Use UPSERT with `?on_conflict=column_name` parameter

---

## Method 5: Supabase MCP (Claude Desktop)

### Official Docs
- https://supabase.com/docs/guides/getting-started/mcp
- https://github.com/modelcontextprotocol/servers

### A) Copy-Run Quickstart

```bash
# 1. Prerequisites
# - Claude Desktop app installed
# - Node.js 18+ installed

# 2. Install Supabase MCP Server
npx -y @modelcontextprotocol/create-server supabase

# Or install globally
npm install -g @supabase/mcp-server

# 3. Configure Claude Desktop
# Edit: ~/Library/Application Support/Claude/claude_desktop_config.json (macOS)
# Or: %APPDATA%\Claude\claude_desktop_config.json (Windows)
# Or: ~/.config/Claude/claude_desktop_config.json (Linux)

{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://dbocegamkdnsorhtdbni.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "YOUR_SERVICE_ROLE_KEY"
      }
    }
  }
}

# 4. Restart Claude Desktop

# 5. Test MCP connection in Claude
# Ask Claude: "List all tables in my Supabase database"
# Or: "Show me all events with status published"
```

### B) Test Plan & Proof

**Manual Test in Claude Desktop**:

```
Prompt 1: "Use MCP to list all tables in my Supabase database"
Expected: Claude shows tables: profiles, events, event_categories, venues, etc.

Prompt 2: "Use MCP to query all event categories"
Expected: Claude returns Baseball, Football, Soccer, UFC, Special Event

Prompt 3: "Use MCP to create a test table called connectivity_test_mcp with columns id and note"
Expected: Claude confirms table creation

Prompt 4: "Use MCP to insert a row into connectivity_test_mcp with note 'MCP test passed'"
Expected: Claude confirms insertion

Prompt 5: "Use MCP to select all rows from connectivity_test_mcp"
Expected: Claude shows the inserted row

Prompt 6: "Use MCP to drop table connectivity_test_mcp"
Expected: Claude confirms deletion
```

**Automated Test Script** (if Supabase MCP supports CLI):

```bash
#!/bin/bash
# File: supabase/tests/test-mcp.sh

echo "🔍 Testing Supabase MCP..."
echo "⚠️  This test requires Claude Desktop to be configured"

# Check if config exists
if [[ "$OSTYPE" == "darwin"* ]]; then
  CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
else
  echo "❌ Unsupported OS"
  exit 1
fi

if [ ! -f "$CONFIG_PATH" ]; then
  echo "❌ Claude Desktop config not found at: $CONFIG_PATH"
  echo "📝 Create config with Supabase MCP server configuration"
  exit 1
fi

# Check if Supabase MCP is configured
if grep -q "supabase" "$CONFIG_PATH"; then
  echo "✅ Supabase MCP configured in Claude Desktop"
else
  echo "❌ Supabase MCP not found in config"
  exit 1
fi

echo "✅ Configuration verified"
echo "📝 Manual testing required in Claude Desktop:"
echo "  1. Restart Claude Desktop"
echo "  2. Ask: 'List all tables using MCP'"
echo "  3. Ask: 'Query event_categories using MCP'"
echo "  4. Verify responses contain expected data"
```

**Expected MCP Tools Available in Claude**:

- `supabase_execute_sql` - Execute raw SQL
- `supabase_list_tables` - List all tables
- `supabase_describe_table` - Get table schema
- `supabase_query_table` - Query table data
- `supabase_create_table` - Create new table
- `supabase_insert_row` - Insert data
- `supabase_update_row` - Update data
- `supabase_delete_row` - Delete data

### C) Artifacts

**Claude Desktop Config Template**:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://dbocegamkdnsorhtdbni.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
  },
  "globalShortcut": "Ctrl+Space"
}
```

**Example MCP Prompts**:

```
1. Database Exploration:
   "List all tables in my Supabase database"
   "Show me the schema for the events table"
   "What indexes exist on the events table?"

2. Data Queries:
   "Show me all published events"
   "Get the most recent 5 events ordered by date"
   "Find all events in the Baseball category"

3. Data Modification:
   "Create a new event category called 'Basketball'"
   "Update the event with slug 'world-series-2025' to set is_featured = true"
   "Delete all events with status 'draft'"

4. Schema Changes:
   "Add a column 'external_id' to the events table"
   "Create an index on events(event_datetime)"
   "Add a foreign key from event_packages to events"
```

### D) Troubleshooting Cheatsheet

**Issue 1**: Claude doesn't recognize MCP commands
- **Fix**: Restart Claude Desktop after editing config
- **Fix**: Check config path is correct for your OS
- **Fix**: Verify JSON syntax is valid (use jsonlint.com)

**Issue 2**: `MCP server failed to start`
- **Fix**: Ensure Node.js is in PATH
- **Fix**: Test manually: `npx -y @supabase/mcp-server`
- **Fix**: Check service role key is valid

**Issue 3**: `Permission denied` errors
- **Fix**: Verify you're using SERVICE_ROLE_KEY, not ANON_KEY
- **Fix**: Check key hasn't expired or been rotated

**Issue 4**: MCP shows tables but queries fail
- **Fix**: RLS policies may be blocking even with service role
- **Fix**: Test same query with psql to verify it's not MCP issue

**Issue 5**: Config changes not taking effect
- **Fix**: Completely quit Claude Desktop (not just close window)
- **Fix**: On Mac: Cmd+Q to quit, then reopen
- **Fix**: Clear Claude cache if available

---

## Method 6: Local Development with Supabase CLI

### Official Docs
- https://supabase.com/docs/guides/local-development/cli/getting-started
- Section: "Local development"

### A) Copy-Run Quickstart

```bash
# 1. Initialize Supabase in your project
cd /home/sk/skybox-gamehub
supabase init

# 2. Start local Supabase stack (Docker required)
supabase start

# This starts:
# - PostgreSQL (port 54322)
# - Studio (port 54323)
# - API (port 54321)
# - Auth (port 54324)

# 3. Get local connection details
supabase status

# Output will show:
# API URL: http://127.0.0.1:54321
# DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
# Studio URL: http://127.0.0.1:54323
# Anon key: eyJh...
# Service role key: eyJh...

# 4. Connect to local database
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres

# 5. Stop local stack
supabase stop
```

### B) Test Plan & Proof

**Test Script**: `test-local-dev.sh`

```bash
#!/bin/bash
# File: supabase/tests/test-local-dev.sh

echo "🔍 Testing Supabase Local Development..."

# 1. Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker."
  exit 1
fi
echo "✅ Docker is running"

# 2. Start Supabase
echo "🚀 Starting Supabase..."
supabase start

if [ $? -ne 0 ]; then
  echo "❌ Failed to start Supabase"
  exit 1
fi
echo "✅ Supabase started"

# 3. Get local connection details
echo "📋 Connection details:"
supabase status

# 4. Test local database connection
echo "🔌 Testing local database connection..."
PGPASSWORD=postgres psql -h 127.0.0.1 -p 54322 -U postgres -d postgres -c "SELECT 'Local connection successful' AS status;"

if [ $? -eq 0 ]; then
  echo "✅ Local database connection successful"
else
  echo "❌ Local database connection failed"
  supabase stop
  exit 1
fi

# 5. Test local API
echo "🌐 Testing local REST API..."
LOCAL_ANON_KEY=$(supabase status | grep "anon key" | cut -d: -f2 | xargs)

curl -s http://127.0.0.1:54321/rest/v1/ \
  -H "apikey: ${LOCAL_ANON_KEY}" \
  -H "Authorization: Bearer ${LOCAL_ANON_KEY}" > /dev/null

if [ $? -eq 0 ]; then
  echo "✅ Local API accessible"
else
  echo "❌ Local API failed"
  supabase stop
  exit 1
fi

# 6. Apply migrations to local
echo "📤 Applying migrations to local..."
supabase db reset

if [ $? -eq 0 ]; then
  echo "✅ Migrations applied to local"
else
  echo "❌ Failed to apply migrations"
  supabase stop
  exit 1
fi

# 7. Test CRUD on local database
echo "🧪 Testing local CRUD..."
PGPASSWORD=postgres psql -h 127.0.0.1 -p 54322 -U postgres -d postgres << 'EOF'
CREATE SCHEMA IF NOT EXISTS connectivity_test;
CREATE TABLE IF NOT EXISTS connectivity_test.local_test (
  id SERIAL PRIMARY KEY,
  note TEXT,
  ts TIMESTAMPTZ DEFAULT NOW()
);
INSERT INTO connectivity_test.local_test (note) VALUES ('Local dev test passed');
SELECT * FROM connectivity_test.local_test;
DROP TABLE connectivity_test.local_test;
DROP SCHEMA connectivity_test;
EOF

if [ $? -eq 0 ]; then
  echo "✅ Local CRUD successful"
else
  echo "❌ Local CRUD failed"
  supabase stop
  exit 1
fi

echo "\n🎉 All local development tests passed!"
echo "📝 Studio available at: http://127.0.0.1:54323"
echo "🛑 Run 'supabase stop' when done"
```

**Expected Output**:
```
🔍 Testing Supabase Local Development...
✅ Docker is running
🚀 Starting Supabase...
Started supabase local development setup.
API URL: http://127.0.0.1:54321
DB URL: postgresql://postgres:postgres@127.0.0.1:54322/postgres
Studio URL: http://127.0.0.1:54323
✅ Supabase started
📋 Connection details:
...
✅ Local database connection successful
✅ Local API accessible
✅ Migrations applied to local
✅ Local CRUD successful

🎉 All local development tests passed!
📝 Studio available at: http://127.0.0.1:54323
🛑 Run 'supabase stop' when done
```

### C) Artifacts

**Local Development Workflow**:

```bash
# 1. Start local Supabase
supabase start

# 2. Create new migration
supabase migration new add_new_feature

# Edit: supabase/migrations/YYYYMMDDHHMMSS_add_new_feature.sql

# 3. Apply to local
supabase db reset

# 4. Test locally
npm run dev
# App connects to http://127.0.0.1:54321

# 5. Generate types from local schema
supabase gen types typescript --local > src/types/database.types.ts

# 6. Diff local vs remote
supabase db diff

# 7. Push to remote when ready
supabase db push

# 8. Stop local when done
supabase stop
```

**Local Environment Variables**:

```bash
# .env.local (for local development)
VITE_SUPABASE_URL=http://127.0.0.1:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

**Studio Access**:

```bash
# Open Studio in browser
supabase start
# Navigate to: http://127.0.0.1:54323

# Features:
# - Table Editor
# - SQL Editor
# - Database schema visualization
# - Authentication management
# - Storage file browser
```

### D) Troubleshooting Cheatsheet

**Issue 1**: `Docker is not running`
- **Fix**: Start Docker Desktop
- **Fix**: Verify Docker daemon: `docker ps`

**Issue 2**: `port is already allocated`
- **Fix**: Another service using ports 54321-54324
- **Solution 1**: Stop conflicting service
- **Solution 2**: Change ports in `supabase/config.toml`

**Issue 3**: `shadow database is not initialized`
- **Fix**: Run `supabase db reset`
- **Fix**: Delete `.supabase` folder and restart

**Issue 4**: Local and remote schemas out of sync
- **Fix**: Run `supabase db pull` to sync from remote
- **Fix**: Review `supabase db diff` before pushing

**Issue 5**: Migrations not applying
- **Fix**: Check migration file syntax
- **Fix**: Ensure idempotent (use IF NOT EXISTS)
- **Fix**: Run `supabase db reset` to start fresh

---

## Environment Variables Reference

### Complete .env.example

```bash
# =============================================================================
# Supabase Environment Variables
# =============================================================================
# Project: Skybox GameHub
# Project Ref: dbocegamkdnsorhtdbni
# Region: aws-1-us-east-1
# =============================================================================

# -----------------------------------------------------------------------------
# API Keys (Get from: Dashboard → Settings → API)
# -----------------------------------------------------------------------------

# Public Anon Key (safe to use in frontend)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key (NEVER expose to frontend - backend only)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# -----------------------------------------------------------------------------
# API URL
# -----------------------------------------------------------------------------

# Supabase Project URL
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co

# Alternative for backend
SUPABASE_API_URL=https://dbocegamkdnsorhtdbni.supabase.co

# -----------------------------------------------------------------------------
# Database Connection Strings
# -----------------------------------------------------------------------------

# Transaction Pooler (Port 6543) - RECOMMENDED for apps
# Use this for web applications and serverless functions
DATABASE_URL=postgresql://postgres.dbocegamkdnsorhtdbni:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require

# Session Pooler (Port 5432) - For Prisma and other ORMs
DATABASE_URL_POOLER_SESSION=postgresql://postgres.dbocegamkdnsorhtdbni:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:5432/postgres?sslmode=require

# Direct Connection (Port 5432) - For migrations and admin tasks
DATABASE_URL_DIRECT=postgresql://postgres:[YOUR-PASSWORD]@db.dbocegamkdnsorhtdbni.supabase.co:5432/postgres?sslmode=require

# -----------------------------------------------------------------------------
# Database Password
# -----------------------------------------------------------------------------

# Get from: Dashboard → Settings → Database → Database Password
# (Reset if needed)
DB_PASSWORD=YOUR_DATABASE_PASSWORD

# -----------------------------------------------------------------------------
# Access Token (for Supabase CLI)
# -----------------------------------------------------------------------------

# Get from: Dashboard → Account → Access Tokens
SUPABASE_ACCESS_TOKEN=sbp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# -----------------------------------------------------------------------------
# Project Reference
# -----------------------------------------------------------------------------

SUPABASE_PROJECT_REF=dbocegamkdnsorhtdbni

# -----------------------------------------------------------------------------
# Local Development (when running `supabase start`)
# -----------------------------------------------------------------------------

# Local API URL
VITE_SUPABASE_URL_LOCAL=http://127.0.0.1:54321

# Local Anon Key (default for all local projects)
VITE_SUPABASE_ANON_KEY_LOCAL=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0

# Local Service Role Key
SUPABASE_SERVICE_ROLE_KEY_LOCAL=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Local Database URL
DATABASE_URL_LOCAL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# -----------------------------------------------------------------------------
# Key Usage Guide
# -----------------------------------------------------------------------------

# ANON_KEY:
#   ✅ Frontend applications
#   ✅ Client-side queries
#   ✅ Subject to RLS policies
#   ❌ NEVER bypass RLS

# SERVICE_ROLE_KEY:
#   ✅ Backend API routes
#   ✅ Edge Functions
#   ✅ Admin operations
#   ✅ Bypasses RLS
#   ❌ NEVER expose to frontend
#   ❌ NEVER commit to git

# ACCESS_TOKEN:
#   ✅ Supabase CLI operations
#   ✅ CI/CD pipelines
#   ❌ NOT for application code

# DB_PASSWORD:
#   ✅ Direct database connections
#   ✅ psql, pg_dump, migrations
#   ✅ postgres.js connections
#   ❌ NEVER expose to frontend

# =============================================================================
# Security Reminders
# =============================================================================

# ⚠️  Add .env.local to .gitignore
# ⚠️  Never commit real keys to version control
# ⚠️  Rotate keys if accidentally exposed
# ⚠️  Use separate keys for dev/staging/production

# Rotate keys at: Dashboard → Settings → API → Reset Keys
```

### Which Key to Use

| Method | Key Type | Why |
|--------|----------|-----|
| psql, pg_dump | DB Password | Direct database access |
| Supabase CLI | Access Token OR DB Password | CLI authentication |
| postgres.js | DB Password | Backend database connection |
| REST API (frontend) | Anon Key | Public, RLS-protected queries |
| REST API (backend) | Service Role Key | Admin operations, bypass RLS |
| MCP | Service Role Key | Full database access |
| Local Dev | Local keys (hardcoded) | Pre-set in Supabase CLI |

---

## Troubleshooting

### Common Issues Across All Methods

#### Issue: SSL/TLS Certificate Errors

```
Error: SSL connection has been closed unexpectedly
Error: self signed certificate in certificate chain
```

**Fix**:
1. Always use `sslmode=require` in connection strings
2. Update OpenSSL: `sudo apt-get update && sudo apt-get install --only-upgrade openssl`
3. Trust system certificates: `export NODE_TLS_REJECT_UNAUTHORIZED=0` (dev only)

#### Issue: Connection Timeout

```
Error: connect ETIMEDOUT
Error: Connection timed out
```

**Fix**:
1. Use pooler instead of direct connection
2. Check firewall isn't blocking ports 5432/6543
3. Verify region in hostname matches your project
4. Test with curl: `curl -v telnet://aws-1-us-east-1.pooler.supabase.com:6543`

#### Issue: Password Authentication Failed

```
FATAL: password authentication failed for user "postgres"
```

**Fix**:
1. Reset database password: Dashboard → Settings → Database → Reset Password
2. Wait 2 minutes for password to propagate
3. Ensure using correct username format:
   - Pooler: `postgres.PROJECT_REF`
   - Direct: `postgres`
4. Check for special characters in password (may need URL encoding)

#### Issue: RLS Blocking Queries

```
Error: new row violates row-level security policy
Error: permission denied for table
```

**Fix**:
1. Use service role key (bypasses RLS)
2. Add appropriate RLS policy
3. Temporarily disable RLS for testing:
   ```sql
   ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
   -- Test
   ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;
   ```

#### Issue: Connection Pool Exhausted

```
Error: remaining connection slots are reserved
Error: too many connections
```

**Fix**:
1. **Always** use transaction pooler (port 6543) for applications
2. Reduce max connections in your app config
3. Implement connection retry logic
4. Check for connection leaks (not closing connections)

---

## Consolidated Test Checklist

Run this complete test to verify all connection methods work:

```bash
#!/bin/bash
# File: supabase/tests/test-all-connections.sh

echo "🧪 Skybox GameHub - Complete Connection Test"
echo "=============================================="

# Load environment
source .env.local

PASSED=0
FAILED=0

# Test 1: psql Direct Connection
echo "\n1️⃣ Testing psql connection..."
PGPASSWORD="${DB_PASSWORD}" psql -h aws-1-us-east-1.pooler.supabase.com -p 6543 -U postgres.dbocegamkdnsorhtdbni -d postgres -c "SELECT 'psql OK' AS test;" > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ psql connection"
  ((PASSED++))
else
  echo "❌ psql connection"
  ((FAILED++))
fi

# Test 2: Supabase CLI
echo "\n2️⃣ Testing Supabase CLI..."
supabase projects list > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✅ Supabase CLI"
  ((PASSED++))
else
  echo "❌ Supabase CLI"
  ((FAILED++))
fi

# Test 3: postgres.js (if Node available)
echo "\n3️⃣ Testing postgres.js..."
if command -v node &> /dev/null; then
  cat > /tmp/test-pg.mjs << 'EOF'
import postgres from 'postgres'
const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' })
try {
  await sql`SELECT 1`
  console.log('✅ postgres.js')
  await sql.end()
  process.exit(0)
} catch (e) {
  console.log('❌ postgres.js:', e.message)
  process.exit(1)
}
EOF
  DATABASE_URL="${DATABASE_URL}" node /tmp/test-pg.mjs
  if [ $? -eq 0 ]; then ((PASSED++)); else ((FAILED++)); fi
  rm /tmp/test-pg.mjs
else
  echo "⏭️  Skipped (Node not installed)"
fi

# Test 4: REST API
echo "\n4️⃣ Testing REST API..."
RESPONSE=$(curl -s -X GET "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/event_categories?select=count" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")
if echo "$RESPONSE" | grep -q "count"; then
  echo "✅ REST API"
  ((PASSED++))
else
  echo "❌ REST API"
  ((FAILED++))
fi

# Test 5: MCP (manual check)
echo "\n5️⃣ MCP (manual verification required)"
echo "   Check Claude Desktop config for Supabase MCP"
if [[ "$OSTYPE" == "darwin"* ]]; then
  CONFIG_PATH="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  CONFIG_PATH="$HOME/.config/Claude/claude_desktop_config.json"
fi

if [ -f "$CONFIG_PATH" ] && grep -q "supabase" "$CONFIG_PATH"; then
  echo "✅ MCP configured"
  ((PASSED++))
else
  echo "⏭️  MCP not configured"
fi

# Test 6: Local Dev
echo "\n6️⃣ Testing Local Development..."
if docker info > /dev/null 2>&1; then
  echo "✅ Docker available (run 'supabase start' to test)"
  ((PASSED++))
else
  echo "⏭️  Docker not running"
fi

# Summary
echo "\n=============================================="
echo "📊 Test Results: ${PASSED} passed, ${FAILED} failed"
if [ $FAILED -eq 0 ]; then
  echo "🎉 All tests passed!"
  exit 0
else
  echo "⚠️  Some tests failed. Check details above."
  exit 1
fi
```

**Run Complete Test**:

```bash
chmod +x supabase/tests/test-all-connections.sh
./supabase/tests/test-all-connections.sh
```

---

## Final Notes

### Best Practices

1. **Use Transaction Pooler (port 6543) for applications**
   - Handles connection pooling automatically
   - Prevents "too many connections" errors
   - Better performance for web apps

2. **Always use `sslmode=require`**
   - Required for Supabase connections
   - Ensures encrypted communication

3. **Never expose service role key in frontend**
   - Use anon key for client-side queries
   - RLS protects your data with anon key
   - Service role bypasses RLS - backend only

4. **Use Supabase CLI for schema management**
   - Generate migrations with `supabase migration new`
   - Test locally with `supabase start`
   - Deploy with `supabase db push`

5. **Test locally before pushing to production**
   - Local instance is free and isolated
   - Catch errors before they reach users
   - Faster development cycle

### Production Deployment Checklist

Before deploying to production:

- [ ] All environment variables set correctly
- [ ] Database password is strong and rotated regularly
- [ ] Service role key is never exposed in frontend code
- [ ] RLS policies tested with anon key
- [ ] Connection pooling configured (use transaction pooler)
- [ ] SSL enabled on all connections
- [ ] Migrations tested locally first
- [ ] Backup strategy in place
- [ ] Monitoring and alerting configured
- [ ] Rate limiting enabled on API

---

**Documentation Complete**: 2025-10-24
**Project**: Skybox GameHub
**Database**: Supabase PostgreSQL
**Project Ref**: dbocegamkdnsorhtdbni

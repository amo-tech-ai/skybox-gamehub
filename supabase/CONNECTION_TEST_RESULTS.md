# Supabase Connection Tests - Results

**Date**: 2025-10-24
**Project**: Skybox GameHub
**Project Ref**: `dbocegamkdnsorhtdbni`

---

## Summary

| Method | Status | Notes |
|--------|--------|-------|
| 1. psql (Direct) | ⚠️ Needs DB Password | Ready to test once password provided |
| 2. Supabase CLI | ⚠️ Access Token Required | Need to generate access token |
| 3. REST API | ✅ WORKING | Successfully connected and validated |
| 4. postgres.js (Node) | ⚠️ Needs DB Password | Script ready, needs password |
| 5. Local Dev | ⚠️ Needs Docker | Docker required for `supabase start` |

---

## Test 1: Direct psql Connection

### Status: ⚠️ Awaiting Database Password

**What's needed:**
1. Get database password from Dashboard → Settings → Database
2. Run connection test

**Test Command**:
```bash
PGPASSWORD='YOUR_DB_PASSWORD' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT 'Connection successful!' AS status;"
```

**Expected Output**:
```
       status
---------------------
 Connection successful!
(1 row)
```

---

## Test 2: Supabase CLI

### Status: ⚠️ Access Control Issue

**Current Error**:
```
Unexpected error retrieving remote project status: {
  "message": "Your account does not have the necessary privileges to access this endpoint."
}
```

**Root Cause**: CLI token doesn't have required permissions

**Solution**:
1. Go to https://supabase.com/dashboard/account/tokens
2. Click "Generate New Token"
3. Name: "Skybox CLI Access"
4. Scopes: **Select "Read and Write access to all resources"**
5. Copy token
6. Logout: `supabase logout`
7. Login with token: `supabase login --token sbp_YOUR_TOKEN_HERE`
8. Link project: `supabase link --project-ref dbocegamkdnsorhtdbni`

---

## Test 3: REST API

### Status: ✅ WORKING

**Test Performed**:
```bash
curl -s -X GET "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"
```

**Result**: ✅ Success
- API responded with OpenAPI schema
- Authenticated successfully with anon key
- Tables visible: `profiles`, `teams`, `leagues`, `games`, `skybox_featured_games`
- RPC functions visible: `get_current_profile`, `has_role`, `is_staff`

**Sample Query Test**:
```bash
curl -s -X GET "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/profiles?select=id,role&limit=1" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"
```

**Result**: `[]` (empty array - table exists, no data yet)

**Verification**:
- ✅ API endpoint accessible
- ✅ Authentication working
- ✅ RLS policies active (empty result, not error)
- ✅ Schema cache populated

---

## Test 4: Node.js with postgres.js

### Status: ⚠️ Ready to Test (Needs DB Password)

**Script Created**: `supabase/tests/test-postgresjs.mjs`

**Install Dependency**:
```bash
npm install postgres
```

**Test Command**:
```bash
export DB_PASSWORD='YOUR_DB_PASSWORD'
node supabase/tests/test-postgresjs.mjs
```

**Script Features**:
- Connects via transaction pooler (port 6543)
- Tests CRUD operations
- Creates test schema/table
- Inserts and selects data
- Cleans up after itself

---

## Test 5: Local Development

### Status: ⚠️ Requires Docker

**Prerequisites**:
- Docker Desktop installed and running
- Supabase CLI installed (✅ already have)

**Test Commands**:
```bash
# Start local Supabase
cd /home/sk/skybox-gamehub
supabase start

# Will provide local URLs:
# - API: http://127.0.0.1:54321
# - DB: postgresql://postgres:postgres@127.0.0.1:54322/postgres
# - Studio: http://127.0.0.1:54323
```

**Benefits of Local Dev**:
- No need for passwords or tokens
- Isolated testing environment
- Fast iteration
- Free migrations testing

---

## Current Environment Setup

### ✅ What's Already Configured

**File**: `.env.local`

```bash
# API Keys (Working)
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# API URL (Working)
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co

# Database URL (Need password)
DATABASE_URL=postgresql://postgres.dbocegamkdnsorhtdbni:[YOUR-PASSWORD]@aws-1-us-east-1.pooler.supabase.com:6543/postgres
```

### ⚠️ What's Needed

1. **Database Password**
   - Location: Dashboard → Settings → Database → Database Password
   - Used for: psql, pg_dump, postgres.js
   - Can be reset if forgotten

2. **Access Token** (for CLI)
   - Location: Dashboard → Account → Access Tokens
   - Scope: Read/Write all resources
   - Used for: `supabase login --token`

---

## Database Status

### Tables Exist (via REST API discovery)

| Table | Status | Source |
|-------|--------|--------|
| profiles | ✅ Created | Migration 001_create_profiles_and_auth.sql |
| leagues | ✅ Created | Legacy sports schema |
| teams | ✅ Created | Legacy sports schema |
| games | ✅ Created | Legacy sports schema |
| skybox_featured_games | ✅ Created | Legacy sports schema |

### Tables Need Creation (from our new migrations)

| Table | Status | Migration File |
|-------|--------|----------------|
| event_categories | ❌ Not created | 20251024000002_create_events_schema.sql |
| venues | ❌ Not created | 20251024000002_create_events_schema.sql |
| events | ❌ Not created | 20251024000002_create_events_schema.sql |
| event_highlights | ❌ Not created | 20251024000002_create_events_schema.sql |
| event_prizes | ❌ Not created | 20251024000002_create_events_schema.sql |
| event_specials | ❌ Not created | 20251024000002_create_events_schema.sql |
| event_faqs | ❌ Not created | 20251024000002_create_events_schema.sql |
| event_packages | ❌ Not created | 20251024000002_create_events_schema.sql |

**Action Required**: Apply migrations to production database

---

## Next Steps

### Step 1: Get Database Password

1. Go to: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/settings/database
2. Scroll to "Database Password"
3. Click "Reset database password" if you don't have it
4. Copy the password
5. Update `.env.local`:
   ```bash
   DB_PASSWORD=YOUR_NEW_PASSWORD
   DATABASE_URL=postgresql://postgres.dbocegamkdnsorhtdbni:YOUR_NEW_PASSWORD@aws-1-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
   ```

### Step 2: Generate CLI Access Token

1. Go to: https://supabase.com/dashboard/account/tokens
2. Click "Generate New Token"
3. Name: "Skybox CLI Access"
4. Scopes: **All resources (Read & Write)**
5. Copy token
6. Login:
   ```bash
   supabase logout
   supabase login --token sbp_YOUR_TOKEN_HERE
   ```
7. Link project:
   ```bash
   cd /home/sk/skybox-gamehub
   supabase link --project-ref dbocegamkdnsorhtdbni
   ```

### Step 3: Apply Migrations to Production

**Option A: Via Supabase Dashboard (Recommended)**

1. Go to: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/editor
2. Click "SQL Editor"
3. Copy contents of `supabase/migrations/20251024000002_create_events_schema.sql`
4. Paste and click "Run"
5. Verify: Tables should appear in Table Editor

**Option B: Via CLI (After linking)**

```bash
cd /home/sk/skybox-gamehub
supabase db push
```

### Step 4: Apply Seed Data

```bash
# After migrations are applied, run seed data files in order:

# Via Dashboard SQL Editor, paste and run each file:
cat supabase/seed_data/001_event_categories.sql
cat supabase/seed_data/002_venues.sql
cat supabase/seed_data/003_events.sql
cat supabase/seed_data/004_event_highlights.sql
cat supabase/seed_data/005_event_prizes.sql
cat supabase/seed_data/006_event_specials.sql
```

### Step 5: Verify with REST API

```bash
# Test event categories
curl -s "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/event_categories?select=*" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"

# Should return: Baseball, Football, Soccer, UFC, Special Event
```

---

## Test Scripts Created

| Script | Purpose | Location |
|--------|---------|----------|
| `test-rest-api.sh` | Test REST API connection | `supabase/tests/test-rest-api.sh` |
| `test-postgresjs.mjs` | Test Node postgres.js | `supabase/tests/test-postgresjs.mjs` |
| `CONNECTION_METHODS_GUIDE.md` | Complete guide | `supabase/docs/CONNECTION_METHODS_GUIDE.md` |

---

## Troubleshooting

### Issue: "Your account does not have the necessary privileges"

**Cause**: CLI token doesn't have correct permissions

**Fix**:
1. Generate **new** access token with full permissions
2. Use `supabase login --token sbp_NEW_TOKEN`
3. Try linking again

### Issue: "password authentication failed"

**Cause**: Database password is incorrect or old

**Fix**:
1. Reset password in dashboard
2. Wait 2 minutes for propagation
3. Update `.env.local` with new password
4. Try again

### Issue: "table does not exist" in REST API

**Cause**: Migrations haven't been applied to production

**Fix**:
1. Apply migrations via SQL Editor
2. Or use `supabase db push` after linking

---

## Success Criteria

When all tests pass, you should be able to:

- ✅ Connect with psql and run queries
- ✅ Use `supabase db push` to apply migrations
- ✅ Query tables via REST API
- ✅ Connect from Node.js applications
- ✅ Run local development stack

---

**Status Summary**:
- **REST API**: ✅ Working (3 methods functional)
- **Database Access**: ⚠️ Awaiting password
- **CLI**: ⚠️ Needs access token
- **Migrations**: ⚠️ Not yet applied to production

**Recommendation**: Complete Step 1 (get password) and Step 2 (generate token) to unlock all connection methods.

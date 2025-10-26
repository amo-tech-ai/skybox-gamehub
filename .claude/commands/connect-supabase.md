# Connect to Supabase

You are a Supabase connectivity assistant. Your job is to verify the database connection is working correctly and report on the database status.

## Objective

Test the Supabase connection and provide a health check report including:
1. Environment variable verification
2. Database connection test
3. Table count and key table verification
4. Event count (to verify seeded data)
5. RLS policy check (basic)

## Step-by-Step Process

### Step 1: Verify Environment Variables

Check if `.env.local` exists and has required variables:

```bash
# Check if file exists
ls -la .env.local

# Read file (be careful not to expose full keys in output)
cat .env.local | grep -E "VITE_SUPABASE_(URL|ANON_KEY)"
```

**Expected output:**
```
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

**If missing:** Provide template and ask user to add credentials.

### Step 2: Test Database Connection

Use the PostgreSQL connection string to test connectivity:

```bash
PGPASSWORD='Toronto2025#' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT 'Connection successful!' AS status;"
```

**Expected output:**
```
       status
---------------------
 Connection successful!
(1 row)
```

**If fails:** Report error and check:
- Network connectivity
- Firewall rules
- Credentials validity
- Supabase project status

### Step 3: Count Tables

List all tables in the public schema:

```bash
PGPASSWORD='Toronto2025#' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE' ORDER BY table_name;"
```

**Expected tables:**
- events
- venues
- event_categories
- bookings
- profiles
- (and others)

### Step 4: Check Events Table

Verify the events table has data:

```bash
PGPASSWORD='Toronto2025#' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT COUNT(*) as total_events,
             COUNT(*) FILTER (WHERE status = 'published') as published_events,
             MIN(event_date) as first_event,
             MAX(event_date) as last_event
      FROM events;"
```

**Expected output:**
```
 total_events | published_events |     first_event     |     last_event
--------------+------------------+---------------------+---------------------
            7 |                5 | 2025-10-24 20:00:00 | 2025-12-15 18:00:00
(1 row)
```

### Step 5: Test Supabase Client

Verify the Supabase JavaScript client can connect:

Read `/src/integrations/supabase/client.ts` and verify:
- Client is initialized
- URL and anon key are from env vars
- No syntax errors

**Expected structure:**
```typescript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### Step 6: Check RLS Policies (Optional)

Verify Row Level Security policies exist:

```bash
PGPASSWORD='Toronto2025#' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT schemaname, tablename, policyname
      FROM pg_policies
      WHERE schemaname = 'public'
      ORDER BY tablename, policyname;"
```

## Health Check Report

After running all tests, provide a summary report:

```
🔗 Supabase Connection Health Check
=====================================

✅ Environment Variables
   - VITE_SUPABASE_URL: Found
   - VITE_SUPABASE_ANON_KEY: Found

✅ Database Connection
   - Status: Connected ✓
   - Host: aws-1-us-east-1.pooler.supabase.com
   - Database: postgres
   - User: postgres.dbocegamkdnsorhtdbni

✅ Database Schema
   - Total Tables: 16
   - Key Tables Found:
     ✓ events
     ✓ venues
     ✓ event_categories
     ✓ bookings
     ✓ profiles

✅ Events Data
   - Total Events: 7
   - Published Events: 5
   - Upcoming Events: 5
   - Date Range: 2025-10-24 to 2025-12-15

✅ Supabase Client
   - File: /src/integrations/supabase/client.ts
   - Status: Properly configured ✓

✅ RLS Policies
   - Events table: 5 policies found
   - Bookings table: 3 policies found
   - Access control: Enabled ✓

📊 Overall Status: 🟢 HEALTHY
   All systems operational. Database ready for frontend integration.

⚠️  Next Steps:
   - Create custom hooks in /src/hooks/
   - Replace mock data with Supabase queries
   - Add error handling and loading states
```

## Error Scenarios

### Scenario 1: Environment Variables Missing
```
❌ Environment Variables
   - .env.local: Not found

🔧 Fix:
   Create .env.local with:
   VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co
   VITE_SUPABASE_ANON_KEY=<your-key-here>
```

### Scenario 2: Connection Failed
```
❌ Database Connection
   - Status: Failed ✗
   - Error: connection refused

🔧 Troubleshooting:
   1. Check Supabase project status
   2. Verify network connectivity
   3. Check firewall rules
   4. Confirm credentials are correct
```

### Scenario 3: No Events Found
```
⚠️  Events Data
   - Total Events: 0
   - Published Events: 0

🔧 Fix:
   Run database seeding:
   - Check /supabase/seed_data/ for seed scripts
   - Or manually insert test events via Supabase dashboard
```

### Scenario 4: RLS Policies Missing
```
⚠️  RLS Policies
   - Events table: 0 policies found

🔧 Fix:
   Run migration:
   - Migration: 20251024000002_create_events_schema.sql
   - Contains RLS policy definitions
```

## Safety Considerations

1. **Never** expose full API keys in output
2. **Only** show first/last few characters of sensitive data
3. **Use** read-only queries when possible
4. **Confirm** with user before running write operations
5. **Mask** passwords in command output

## Example Usage

User runs: `/connect-supabase`

Expected flow:
1. Check `.env.local` exists
2. Test database connection
3. Count tables and check events
4. Verify Supabase client config
5. Generate health check report
6. If issues found, provide specific fixes

---

**Goal:** Verify Supabase is properly configured and ready for frontend integration.

# Skybox GameHub - Migration & Deployment Guide

## Overview

This guide explains how to apply database migrations, seed data, and deploy the Skybox GameHub database schema using Supabase's declarative schema approach.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Directory Structure](#directory-structure)
3. [Local Development Setup](#local-development-setup)
4. [Applying Migrations](#applying-migrations)
5. [Seeding Data](#seeding-data)
6. [Testing RLS Policies](#testing-rls-policies)
7. [Production Deployment](#production-deployment)
8. [Edge Functions Deployment](#edge-functions-deployment)
9. [Rollback Procedures](#rollback-procedures)
10. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Install Supabase CLI

```bash
npm install -g supabase

# Verify installation
supabase --version
```

### 2. Login to Supabase

```bash
supabase login
```

### 3. Link Project

```bash
cd /home/sk/skybox-gamehub
supabase link --project-ref dbocegamkdnsorhtdbni
```

---

## Directory Structure

```
/home/sk/skybox-gamehub/supabase/
├── schemas/                     # Declarative schema definitions
│   ├── 01_profiles.sql         # Profiles and authentication
│   └── 02_events.sql           # Events system
│
├── migrations/                  # Auto-generated migrations
│   ├── 001_create_sports_games_schema.sql (legacy)
│   ├── 20251024000001_create_profiles_and_auth.sql
│   └── 20251024000002_create_events_schema.sql
│
├── seed_data/                   # Seed data files
│   ├── 001_event_categories.sql
│   ├── 002_venues.sql
│   ├── 003_events.sql
│   ├── 004_event_highlights.sql
│   ├── 005_event_prizes.sql
│   └── 006_event_specials.sql
│
├── functions/                   # Edge Functions
│   ├── increment-views/
│   ├── update-event-status/
│   └── events-sync/
│
└── docs/                        # Documentation
    ├── ERD_DIAGRAM.md
    ├── DATA_FLOW_DIAGRAMS.md
    └── MIGRATION_GUIDE.md (this file)
```

---

## Local Development Setup

### Step 1: Start Supabase Locally

```bash
cd /home/sk/skybox-gamehub
supabase start
```

This will:
- Start PostgreSQL database
- Start Supabase Studio on http://localhost:54323
- Apply existing migrations
- Output connection details

### Step 2: Check Migration Status

```bash
supabase migration list
```

### Step 3: View Database

```bash
# Open Supabase Studio
# URL will be shown in terminal after `supabase start`
# Usually: http://localhost:54323

# Or access via CLI
supabase db shell
```

---

## Applying Migrations

### Option 1: Using Existing Migration Files (Recommended)

The migrations have already been created in `/supabase/migrations/`.

```bash
# Reset and reapply all migrations (DESTRUCTIVE - wipes local DB)
supabase db reset

# Or just push new migrations (if database is in sync)
supabase db push
```

### Option 2: Generate New Migration from Schema Files

If you modify schema files in `/supabase/schemas/`:

```bash
# Stop Supabase first
supabase stop

# Generate migration from schema changes
supabase db diff -f describe_your_changes

# Review generated migration
cat supabase/migrations/<timestamp>_describe_your_changes.sql

# Start and apply
supabase start
```

### Option 3: Manual Migration via Supabase Dashboard (Production)

For production database:

1. Copy migration SQL from `/supabase/migrations/20251024000001_create_profiles_and_auth.sql`
2. Go to Supabase Dashboard → SQL Editor
3. Paste and execute
4. Repeat for `20251024000002_create_events_schema.sql`

---

## Seeding Data

### Local Seeding

```bash
# Apply all seed files in order
cd /home/sk/skybox-gamehub

psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/001_event_categories.sql
psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/002_venues.sql
psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/003_events.sql
psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/004_event_highlights.sql
psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/005_event_prizes.sql
psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/seed_data/006_event_specials.sql
```

### Production Seeding

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of each seed file
3. Execute in order (001 → 006)

**OR** create a single seed script:

```bash
# Combine all seed files
cat supabase/seed_data/*.sql > supabase/seed_data/all_seeds.sql

# Run in dashboard
```

---

## Testing RLS Policies

### Test as Anonymous User

```sql
-- Should return only published events
SET ROLE anon;
SELECT * FROM events;

-- Should fail (no permission to insert)
INSERT INTO events (title, slug, description, event_date, event_time, event_datetime)
VALUES ('Test Event', 'test-event', 'Test', '2025-12-01', '19:00', '2025-12-01 19:00:00-05');
```

### Test as Authenticated Customer

```sql
-- Create test user first (via Supabase Dashboard Auth)

-- Should see published events
SELECT * FROM events WHERE status = 'published';

-- Should NOT see draft events
SELECT * FROM events WHERE status = 'draft';
-- Expected: 0 rows

-- Should be able to view own profile
SELECT * FROM profiles WHERE user_id = auth.uid();
```

### Test as Staff User

```sql
-- Update test user role to staff
UPDATE profiles SET role = 'staff' WHERE user_id = '<test-user-id>';

-- Should see ALL events (including drafts)
SELECT * FROM events;

-- Should be able to create events
INSERT INTO events (title, slug, description, event_date, event_time, event_datetime, status)
VALUES ('Staff Test Event', 'staff-test', 'Test', '2025-12-01', '19:00', '2025-12-01 19:00:00-05', 'draft');
```

### Verify RLS is Enabled

```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
  'profiles', 'events', 'event_categories',
  'venues', 'event_highlights', 'event_prizes',
  'event_specials', 'event_faqs', 'event_packages'
);
-- All should have rowsecurity = true
```

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All migrations tested locally
- [ ] RLS policies tested with multiple user roles
- [ ] Seed data reviewed and sanitized
- [ ] Backup of production database created
- [ ] Deployment scheduled during low-traffic period

### Step 1: Backup Production Database

```bash
# Via Supabase Dashboard: Settings → Database → Create Backup

# Or via CLI (if configured)
pg_dump -h db.PROJECT_REF.supabase.co -U postgres -d postgres > backup.sql
```

### Step 2: Apply Migrations

```bash
# Option A: Via CLI (if remote connection configured)
supabase db push --linked

# Option B: Via Dashboard (recommended)
# 1. Go to SQL Editor
# 2. Copy migration contents
# 3. Execute each migration file in order
```

### Step 3: Apply Seed Data

```sql
-- In Supabase Dashboard SQL Editor
-- Copy and execute each seed file in order
-- 001 → 002 → 003 → 004 → 005 → 006
```

### Step 4: Verify Deployment

```sql
-- Check tables exist
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- Check RLS enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- Check data seeded
SELECT COUNT(*) FROM event_categories; -- Should be 5
SELECT COUNT(*) FROM venues; -- Should be 1
SELECT COUNT(*) FROM events; -- Should be 8

-- Test a query
SELECT * FROM get_upcoming_events(5);
```

---

## Edge Functions Deployment

### Step 1: Deploy Functions

```bash
# Deploy all functions
cd /home/sk/skybox-gamehub

supabase functions deploy increment-views
supabase functions deploy update-event-status
supabase functions deploy events-sync
```

### Step 2: Test Edge Functions

```bash
# Test increment-views
curl -X POST https://PROJECT_REF.supabase.co/functions/v1/increment-views \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -d '{"event_id": "e1111111-1111-1111-1111-111111111111"}'

# Test events-sync
curl -X POST https://PROJECT_REF.supabase.co/functions/v1/events-sync \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -d '{
    "source": "manual",
    "events": [
      {
        "title": "Test Event",
        "slug": "test-event",
        "description": "Test event description",
        "event_datetime": "2025-12-01T19:00:00-05:00"
      }
    ]
  }'
```

### Step 3: Setup Cron Job (for update-event-status)

```sql
-- In Supabase Dashboard SQL Editor

-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily job to update event statuses
SELECT cron.schedule(
  'update-past-events',
  '0 0 * * *',  -- Run daily at midnight
  $$
  SELECT
    net.http_post(
      url:='https://PROJECT_REF.supabase.co/functions/v1/update-event-status',
      headers:=jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body:=jsonb_build_object('trigger', 'cron')
    ) as request_id;
  $$
);

-- Verify cron job created
SELECT * FROM cron.job;
```

---

## Rollback Procedures

### Rollback Latest Migration

```bash
# Local
supabase db reset  # Resets to previous state

# Production - manual rollback
# 1. Restore from backup
# 2. Or write reverse migration
```

### Reverse Migration Example

```sql
-- To rollback events schema

BEGIN;

-- Drop all event-related tables
DROP TABLE IF EXISTS event_packages CASCADE;
DROP TABLE IF EXISTS event_faqs CASCADE;
DROP TABLE IF EXISTS event_specials CASCADE;
DROP TABLE IF EXISTS event_prizes CASCADE;
DROP TABLE IF EXISTS event_highlights CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS venues CASCADE;
DROP TABLE IF EXISTS event_categories CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS increment_event_views(uuid);
DROP FUNCTION IF EXISTS search_events(text, int);
DROP FUNCTION IF EXISTS get_featured_events(int);
DROP FUNCTION IF EXISTS get_upcoming_events(int);
DROP FUNCTION IF EXISTS update_event_capacity();
DROP FUNCTION IF EXISTS set_event_published_at();

COMMIT;
```

---

## Troubleshooting

### Issue: Migration Fails with "Relation Already Exists"

**Cause**: Migration running twice or tables already exist

**Fix**:
```bash
# Check current database state
supabase db pull

# Reset local database
supabase db reset

# Or add IF NOT EXISTS to all CREATE statements (already done)
```

### Issue: RLS Policy Blocks Query

**Cause**: RLS policy too restrictive or user doesn't have required role

**Fix**:
```sql
-- Check current user
SELECT auth.uid();

-- Check user's role
SELECT role FROM profiles WHERE user_id = auth.uid();

-- Temporarily disable RLS (local testing only)
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

### Issue: Seed Data Insert Fails

**Cause**: Foreign key constraint violation or duplicate slug

**Fix**:
```sql
-- Check if categories/venues exist first
SELECT * FROM event_categories;
SELECT * FROM venues;

-- Use ON CONFLICT to handle duplicates (already implemented)
-- Or delete existing data
DELETE FROM events;
DELETE FROM event_categories;
DELETE FROM venues;
```

### Issue: Edge Function Deployment Fails

**Cause**: Missing dependencies or environment variables

**Fix**:
```bash
# Check Supabase CLI version
supabase --version

# Update CLI
npm install -g supabase@latest

# Check function logs
supabase functions logs increment-views

# Test function locally
supabase functions serve increment-views
```

### Issue: Cannot Connect to Local Database

**Cause**: Supabase not running or port conflict

**Fix**:
```bash
# Check status
supabase status

# Stop and restart
supabase stop
supabase start

# Check for port conflicts (54322 for Postgres)
lsof -i:54322

# Kill conflicting process
kill -9 <PID>
```

---

## Migration Checklist

### Before Running Migrations

- [ ] Schema files reviewed and validated
- [ ] All foreign key relationships correct
- [ ] RLS policies defined for all tables
- [ ] Indexes created for performance
- [ ] Triggers and functions tested
- [ ] Seed data prepared
- [ ] Backup created (production)

### After Running Migrations

- [ ] All tables created successfully
- [ ] RLS enabled on all tables
- [ ] Policies created and working
- [ ] Seed data inserted
- [ ] Functions callable
- [ ] Edge functions deployed
- [ ] Frontend updated with new types
- [ ] Integration tests passing

---

## Next Steps

1. **Update Frontend Code**: Use generated TypeScript types from `src/types/database.types.ts`
2. **Create Supabase Client**: Initialize Supabase client in frontend
3. **Replace Hardcoded Data**: Replace TypeScript data files with database queries
4. **Add Real-time Subscriptions**: Subscribe to event updates
5. **Implement Reservations**: Create reservations schema (next phase)

---

**Last Updated**: 2025-10-24
**Version**: 1.0
**Project**: Skybox GameHub
**Database**: Supabase PostgreSQL
**Project ID**: dbocegamkdnsorhtdbni

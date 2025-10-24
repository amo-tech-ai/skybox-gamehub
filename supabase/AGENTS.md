# Supabase Database Agent

## 🎯 Role & Purpose
Expert Supabase database architect specializing in declarative schema management, RLS policies, migrations, and PostgreSQL optimization for the Skybox Gamehub sports platform.

---

## 🏗️ Core Responsibilities

### 1. Declarative Schema Management
- **NEVER** manually create migration files in `supabase/migrations/`
- **ALWAYS** define schema in `supabase/schemas/` directory
- Use numeric prefixes for execution order: `01_leagues.sql`, `02_teams.sql`
- Generate migrations using `supabase db diff` command
- Follow dependency order: leagues → teams → games → featured_games

### 2. Database Schema Standards
- Use `BIGINT GENERATED ALWAYS AS IDENTITY` for primary keys
- Use `TIMESTAMP WITH TIME ZONE` for all timestamps
- Use `TEXT` for strings, avoid `VARCHAR` with arbitrary limits
- Use `snake_case` for all column names
- Always include `created_at` and `updated_at` timestamps
- Use `public.` schema prefix for all tables

### 3. Row Level Security (RLS)
- **MANDATORY**: Enable RLS on ALL tables
- Create policies for every table with appropriate access levels
- Use `is_staff()` function for admin-only operations
- Public read access for non-sensitive data (leagues, teams, games)
- User-specific access for profiles and reservations

### 4. SQL Style & Best Practices
- Use `IF NOT EXISTS` for all CREATE statements
- Use `IF EXISTS` for all DROP statements
- Write idempotent migrations
- Use proper indexing for performance
- Follow PostgreSQL naming conventions
- Use constraints for data integrity

---

## 📋 Schema File Structure

### File Organization
```
supabase/schemas/
├── 01_leagues.sql              # Sports leagues (NFL, NBA, NHL, MLB)
├── 02_teams.sql                # Teams within leagues
├── 03_games.sql                # Games and matches
├── 04_skybox_featured_games.sql # Featured games for promotion
├── 05_profiles.sql             # User profiles with RLS
├── 06_event_categories.sql     # Event categorization
├── 07_venues.sql               # Venue information
├── 08_events.sql               # Event management
├── 09_reservations.sql         # Booking system
└── 10_functions_and_triggers.sql # Helper functions
```

### Schema File Template
```sql
-- Schema: [Table Name]
-- Purpose: [Brief description]
-- Dependencies: [List dependencies]

CREATE TABLE IF NOT EXISTS public.[table_name] (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- Column definitions with proper types
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_[table]_[column] ON public.[table]([column]);

-- Enable Row Level Security
ALTER TABLE public.[table] ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "[Policy name]"
ON public.[table] FOR [SELECT/INSERT/UPDATE/DELETE]
USING ([condition]);
```

---

## 🔐 Security Standards

### RLS Policy Patterns

#### Public Read Access
```sql
CREATE POLICY "[Table] are readable by everyone"
ON public.[table] FOR SELECT
USING (true);
```

#### Staff-Only Modification
```sql
CREATE POLICY "Only staff can modify [table]"
ON public.[table] FOR ALL
TO authenticated
USING (is_staff());
```

#### User-Specific Access
```sql
CREATE POLICY "Users can view own [resource]"
ON public.[table] FOR SELECT
USING (user_id = auth.uid());
```

### Helper Functions
- `is_staff()` - Check if user is staff/admin
- `has_role(role)` - Check specific role
- `get_current_profile()` - Get user's profile
- `update_updated_at_column()` - Auto-update timestamps

---

## 🚀 Performance Optimization

### Indexing Strategy
- Primary key indexes (automatic)
- Foreign key indexes for joins
- Composite indexes for common queries
- Partial indexes for filtered data
- Text search indexes for full-text search

### Query Optimization
- Use specific column selection (avoid SELECT *)
- Use proper JOIN types
- Implement pagination for large datasets
- Use EXPLAIN ANALYZE for query planning
- Monitor slow queries

### Data Types
- Use `BIGINT` for IDs (better for scaling)
- Use `TEXT` instead of `VARCHAR` (PostgreSQL optimization)
- Use `JSONB` for flexible data structures
- Use `TIMESTAMP WITH TIME ZONE` for global applications

---

## 🔄 Migration Workflow

### 1. Schema Development
```bash
# 1. Define schema in supabase/schemas/
# 2. Stop local Supabase
supabase stop

# 3. Generate migration from schema
supabase db diff --schema public > supabase/migrations/$(date +%Y%m%d%H%M%S)_schema_update.sql

# 4. Review generated migration
# 5. Apply migration
supabase db push
```

### 2. Migration Best Practices
- Test migrations in development first
- Use transactions (BEGIN/COMMIT)
- Include rollback instructions
- Document breaking changes
- Version control all migrations

### 3. Rollback Procedures
```sql
-- Always include rollback in comments
-- BEGIN;
-- DROP TABLE IF EXISTS public.[table] CASCADE;
-- COMMIT;
```

---

## 📊 Data Models

### Core Entities

#### Leagues
```sql
CREATE TABLE public.leagues (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Teams
```sql
CREATE TABLE public.teams (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  abbreviation TEXT,
  logo_url TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Games
```sql
CREATE TABLE public.games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  home_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  away_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  game_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT,
  status TEXT DEFAULT 'scheduled',
  home_score INTEGER,
  away_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 🛠️ Development Tools

### Supabase CLI Commands
```bash
# Start local development
supabase start

# Generate types
supabase gen types typescript --local > src/types/supabase.ts

# Reset database
supabase db reset

# Deploy to production
supabase db push

# Generate migration
supabase db diff --schema public
```

### Testing Database Changes
```bash
# Test migrations locally
supabase db reset
supabase db push

# Verify schema
supabase db diff --schema public

# Check RLS policies
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

---

## 📝 Documentation Standards

### Schema Documentation
- Include purpose and dependencies in comments
- Document all constraints and indexes
- Explain RLS policy rationale
- Provide usage examples

### Migration Documentation
- Include rollback instructions
- Document breaking changes
- List affected tables/functions
- Provide testing steps

### API Documentation
- Document all helper functions
- Include parameter descriptions
- Provide usage examples
- Document error conditions

---

## 🚨 Common Pitfalls to Avoid

### ❌ Don't Do This
- Manual migration file creation
- Missing RLS policies
- Using `SERIAL` instead of `GENERATED ALWAYS AS IDENTITY`
- Using `TIMESTAMP` instead of `TIMESTAMP WITH TIME ZONE`
- Missing `IF NOT EXISTS` clauses
- Hardcoded values in migrations

### ✅ Do This Instead
- Use declarative schema approach
- Enable RLS on all tables
- Use proper PostgreSQL data types
- Write idempotent migrations
- Use environment variables
- Test all changes locally

---

## 🎯 Success Metrics

### Database Health
- All tables have RLS enabled
- No "Unrestricted" tables in Supabase dashboard
- Proper indexes for common queries
- No orphaned data or broken constraints

### Performance
- Query response times < 100ms for simple queries
- Proper use of indexes
- Efficient JOIN operations
- Minimal N+1 query problems

### Security
- All tables protected with RLS
- Proper user access controls
- No sensitive data exposure
- Secure helper functions

---

## 📞 Quick Reference

### Emergency Procedures
```sql
-- Disable RLS temporarily (DANGER - only for debugging)
ALTER TABLE public.[table] DISABLE ROW LEVEL SECURITY;

-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- List all policies
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### Useful Queries
```sql
-- Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables WHERE schemaname = 'public';

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes WHERE schemaname = 'public';
```

---

**Last Updated:** October 23, 2025  
**Version:** 1.0 - Supabase Database Agent
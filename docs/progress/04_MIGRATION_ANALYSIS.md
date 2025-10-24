# 🔍 Migration Analysis & Compliance Report

**Date:** October 23, 2025  
**File:** `supabase/migrations/001_create_sports_games_schema.sql`  
**Status:** ⚠️ **INCOMPLETE - REQUIRES UPDATES**

---

## 📊 Summary

| Aspect | Status | Notes |
|--------|--------|-------|
| **Idempotency** | ❌ FAIL | Missing `IF NOT EXISTS` clauses |
| **Naming Conventions** | ⚠️ PARTIAL | Table names good, but column naming inconsistent |
| **Schema Completeness** | ❌ INCOMPLETE | Missing users, reservations, and many fields |
| **RLS Policies** | ❌ MISSING | No Row Level Security implemented |
| **Triggers** | ❌ MISSING | No update_at triggers, no status triggers |
| **Indexes** | ⚠️ PARTIAL | Basic indexes present, missing composite indexes |
| **Data Types** | ❌ WRONG | Using SERIAL/INTEGER instead of BIGINT/UUID |
| **Soft Deletes** | ❌ MISSING | No deleted_at columns for soft deletes |
| **Documentation** | ✅ GOOD | Has comments, but incomplete |

---

## ❌ CRITICAL ISSUES

### 1. **Not Idempotent**
```sql
-- CURRENT (WRONG - will fail on re-run):
CREATE TABLE leagues (...)

-- SHOULD BE:
CREATE TABLE IF NOT EXISTS leagues (...)
```

**Impact:** Cannot re-run migration safely. Violates declarative schema principle.

---

### 2. **Wrong Data Types**
```sql
-- CURRENT (WRONG):
id SERIAL PRIMARY KEY           -- 32-bit integer
league_id INTEGER               -- 32-bit integer

-- SHOULD BE (per Architecture Plan):
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY  -- 64-bit
league_id BIGINT                                     -- 64-bit
```

**Impact:** Limited to ~2 billion records. Scales poorly.

---

### 3. **Missing Schema - Users & Reservations**
Current tables:
- ✅ leagues
- ✅ teams  
- ✅ games
- ✅ skybox_featured_games
- ❌ **users** (MISSING)
- ❌ **reservations** (MISSING)

**Required by Architecture Plan but not in migration.**

---

### 4. **Missing Critical Fields**

#### Games Table Missing:
- `city` (VARCHAR) - Venue city
- `timezone` (VARCHAR) - ET, CT, MT, PT, COT
- `series_name` (VARCHAR) - World Series, etc.
- `deleted_at` (TIMESTAMP) - Soft delete support

#### Teams Table Missing:
- `colors` (JSONB) - Team colors
- `stadium` (VARCHAR) - Home stadium
- `founded_year` (INTEGER) - Year founded
- `official_website` (TEXT) - Official URL
- `timezone` (VARCHAR) - Team timezone
- `updated_at` - Missing in some tables

#### Leagues Table Missing:
- `description` (TEXT) - League description
- `country` (VARCHAR) - USA, Canada, Colombia
- `season_year` (INTEGER) - Current season

#### Featured Games Missing:
- `max_capacity` (INTEGER) - Table capacity
- `current_reservations` (INTEGER) - Reservation count
- `price_multiplier` (DECIMAL) - Dynamic pricing
- `special_offers` should be JSONB not TEXT

---

### 5. **No Triggers**
Missing implementations:
1. **Update Timestamp Trigger** - Auto-update `updated_at`
2. **Game Status Trigger** - Auto-transition game status
3. **Reservation Capacity Trigger** - Enforce capacity limits

---

### 6. **Incomplete Indexes**

Current indexes:
- ✅ idx_games_league_id
- ✅ idx_games_game_datetime
- ✅ idx_games_season
- ✅ idx_teams_league_id
- ✅ idx_featured_games_game_id
- ✅ idx_featured_games_featured_at

Missing indexes:
- ❌ idx_games_status (for filtering by status)
- ❌ idx_games_home_team_id (for home team queries)
- ❌ idx_games_away_team_id (for away team queries)
- ❌ idx_games_deleted_at (for soft deletes)
- ❌ idx_games_upcoming (WHERE status = 'scheduled')
- ❌ idx_games_league_datetime (composite for common queries)
- ❌ idx_reservations_user_id
- ❌ idx_reservations_game_id
- ❌ idx_reservations_status

---

### 7. **No RLS Policies**
Missing Row Level Security:
- ❌ League read policies
- ❌ Game read/write policies
- ❌ User read/write policies
- ❌ Reservation read/write policies

**Impact:** Database is unprotected. Anyone can read/write anything.

---

### 8. **Missing Data Integrity**

Not implemented:
- ❌ CONSTRAINT checks (e.g., scores must be >= 0)
- ❌ Enum types for status values
- ❌ Default constraints on nullable fields
- ❌ ON DELETE CASCADE properly configured

---

## ✅ What's Done Well

1. **Basic Table Structure** - Core tables created
2. **Foreign Keys** - Relationships set up correctly
3. **Indexes Present** - Basic performance optimization done
4. **Seed Data** - Leagues inserted

---

## 📋 Action Items

### Priority 1: Critical (MUST FIX)
- [ ] Add `IF NOT EXISTS` to all CREATE TABLE statements
- [ ] Change SERIAL to BIGINT GENERATED ALWAYS AS IDENTITY
- [ ] Add users table
- [ ] Add reservations table
- [ ] Add missing fields (deleted_at, colors, timezone, etc.)
- [ ] Create all triggers
- [ ] Add missing indexes
- [ ] Create RLS policies

### Priority 2: Important (SHOULD FIX)
- [ ] Add enum types (game_status, reservation_status, etc.)
- [ ] Add constraints (CHECK constraints for scores)
- [ ] Update field data types (JSONB for arrays)
- [ ] Add proper NOT NULL constraints

### Priority 3: Nice to Have
- [ ] Add detailed comments
- [ ] Add rollback documentation
- [ ] Performance tuning

---

## 🔧 Corrected Migration Template

### Header with Idempotency
```sql
-- Migration: 2024-10-23-14-30-00_create_sports_games_schema.sql
-- Purpose: Create core sports games database schema
-- Status: DRAFT - Needs updates per architecture plan

BEGIN;

-- Drop existing objects (if needed for rollback)
-- DROP TABLE IF EXISTS skybox_featured_games CASCADE;
-- DROP TABLE IF EXISTS reservations CASCADE;
-- DROP TABLE IF EXISTS games CASCADE;
-- DROP TABLE IF EXISTS teams CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS leagues CASCADE;

-- Create enums
CREATE TYPE IF NOT EXISTS game_status AS ENUM (
  'scheduled', 'live', 'completed', 'postponed', 'cancelled'
);

CREATE TYPE IF NOT EXISTS reservation_status AS ENUM (
  'pending', 'confirmed', 'checked_in', 'cancelled'
);

CREATE TYPE IF NOT EXISTS user_role AS ENUM (
  'customer', 'admin', 'staff'
);

-- Leagues Table
CREATE TABLE IF NOT EXISTS public.leagues (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  country VARCHAR(50),
  logo_url TEXT,
  season_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Teams Table
CREATE TABLE IF NOT EXISTS public.teams (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  abbreviation VARCHAR(10),
  city VARCHAR(100),
  colors JSONB,
  logo_url TEXT,
  stadium VARCHAR(100),
  founded_year INTEGER,
  official_website TEXT,
  timezone VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(league_id, abbreviation)
);

-- Games Table
CREATE TABLE IF NOT EXISTS public.games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  home_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  away_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  game_date DATE NOT NULL,
  game_time TIME NOT NULL,
  game_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  venue VARCHAR(255),
  city VARCHAR(100),
  broadcast_networks JSONB,
  status game_status DEFAULT 'scheduled',
  home_score INTEGER,
  away_score INTEGER,
  week_number INTEGER,
  series_name VARCHAR(100),
  season_year INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE,
  CHECK (home_score IS NULL OR home_score >= 0),
  CHECK (away_score IS NULL OR away_score >= 0)
);

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  full_name VARCHAR(255),
  avatar_url TEXT,
  preferred_language VARCHAR(5) DEFAULT 'en',
  timezone VARCHAR(50),
  role user_role DEFAULT 'customer',
  is_vip BOOLEAN DEFAULT FALSE,
  preferences JSONB,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Featured Games Table
CREATE TABLE IF NOT EXISTS public.skybox_featured_games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  game_id BIGINT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  featured_at TIMESTAMP WITH TIME ZONE NOT NULL,
  display_priority INTEGER DEFAULT 0,
  is_promotional BOOLEAN DEFAULT FALSE,
  promotion_text TEXT,
  special_offers JSONB,
  max_capacity INTEGER,
  current_reservations INTEGER DEFAULT 0,
  price_multiplier DECIMAL(5,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(game_id, featured_at)
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS public.reservations (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  game_id BIGINT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  table_number VARCHAR(10),
  number_of_guests INTEGER NOT NULL,
  status reservation_status DEFAULT 'pending',
  reserved_at TIMESTAMP WITH TIME ZONE NOT NULL,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  special_requests TEXT,
  total_price DECIMAL(10,2),
  payment_status VARCHAR(20) DEFAULT 'pending',
  whatsapp_number VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_games_league_id ON public.games(league_id);
CREATE INDEX IF NOT EXISTS idx_games_game_datetime ON public.games(game_datetime);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);
CREATE INDEX IF NOT EXISTS idx_games_season ON public.games(season_year);
CREATE INDEX IF NOT EXISTS idx_games_home_team_id ON public.games(home_team_id);
CREATE INDEX IF NOT EXISTS idx_games_away_team_id ON public.games(away_team_id);
CREATE INDEX IF NOT EXISTS idx_games_deleted_at ON public.games(deleted_at);
CREATE INDEX IF NOT EXISTS idx_games_league_datetime ON public.games(league_id, game_datetime DESC);
CREATE INDEX IF NOT EXISTS idx_games_upcoming ON public.games(game_datetime) WHERE status = 'scheduled';

CREATE INDEX IF NOT EXISTS idx_teams_league_id ON public.teams(league_id);
CREATE INDEX IF NOT EXISTS idx_teams_by_league ON public.teams(league_id, city);

CREATE INDEX IF NOT EXISTS idx_featured_games_game_id ON public.skybox_featured_games(game_id);
CREATE INDEX IF NOT EXISTS idx_featured_games_featured_at ON public.skybox_featured_games(featured_at);
CREATE INDEX IF NOT EXISTS idx_featured_games_display_priority ON public.skybox_featured_games(display_priority);

CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON public.reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_game_id ON public.reservations(game_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_user_game ON public.reservations(user_id, game_id);
CREATE INDEX IF NOT EXISTS idx_reservations_active ON public.reservations(game_id, status) 
  WHERE status IN ('pending', 'confirmed');

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Enable RLS
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skybox_featured_games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Leagues readable by everyone" ON public.leagues
  FOR SELECT USING (true);

CREATE POLICY "Games readable by everyone" ON public.games
  FOR SELECT USING (true);

CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users see own reservations" ON public.reservations
  FOR SELECT USING (auth.uid() = user_id);

-- Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_leagues_updated_at
  BEFORE UPDATE ON public.leagues FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON public.teams FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON public.games FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert leagues
INSERT INTO public.leagues (name, slug, country) VALUES
  ('NFL', 'nfl', 'USA'),
  ('NHL', 'nhl', 'Canada'),
  ('NBA', 'nba', 'USA'),
  ('MLB', 'mlb', 'USA'),
  ('Soccer', 'soccer', 'Colombia')
ON CONFLICT (slug) DO NOTHING;

COMMIT;

-- Rollback:
-- BEGIN;
-- DROP TABLE IF EXISTS public.reservations CASCADE;
-- DROP TABLE IF EXISTS public.skybox_featured_games CASCADE;
-- DROP TABLE IF EXISTS public.games CASCADE;
-- DROP TABLE IF EXISTS public.teams CASCADE;
-- DROP TABLE IF EXISTS public.users CASCADE;
-- DROP TABLE IF EXISTS public.leagues CASCADE;
-- DROP TYPE IF EXISTS game_status;
-- DROP TYPE IF EXISTS reservation_status;
-- DROP TYPE IF EXISTS user_role;
-- COMMIT;
```

---

## 📊 Comparison Matrix

| Feature | Current | Required | Status |
|---------|---------|----------|--------|
| IF NOT EXISTS | ❌ No | ✅ Yes | ❌ FAIL |
| BIGINT for IDs | ❌ No (SERIAL) | ✅ Yes | ❌ FAIL |
| Users Table | ❌ No | ✅ Yes | ❌ FAIL |
| Reservations Table | ❌ No | ✅ Yes | ❌ FAIL |
| Soft Deletes (deleted_at) | ❌ No | ✅ Yes | ❌ FAIL |
| Enum Types | ❌ No | ✅ Yes | ❌ FAIL |
| RLS Policies | ❌ No | ✅ Yes | ❌ FAIL |
| Triggers | ❌ No | ✅ Yes | ❌ FAIL |
| JSONB Fields | ❌ No (VARCHAR) | ✅ Yes | ❌ FAIL |
| Composite Indexes | ❌ No | ✅ Yes | ❌ FAIL |
| Comments/Documentation | ✅ Yes | ✅ Yes | ✅ PASS |
| Basic Indexes | ✅ Yes | ✅ Yes | ✅ PASS |
| Foreign Keys | ✅ Yes | ✅ Yes | ✅ PASS |
| Seed Data | ✅ Yes | ✅ Yes | ✅ PASS |

---

## 🎯 Recommendation

**STATUS: ⚠️ MIGRATION IS INCOMPLETE**

### Next Steps:
1. **DO NOT USE** current migration in production
2. **Create new migration** following corrected template above
3. **Use `supabase/schemas/` approach** per declarative schema rules
4. **Stop Supabase** before running `db diff`
5. **Generate new migration** with `supabase db diff -f create_complete_schema`

---

## 🔗 References

- **Declarative Schema Rule:** `.cursor/rules/supabase-declarative-schema.mdc`
- **Migration Rule:** `.cursor/rules/create-migration.mdc`
- **Architecture Plan:** `supabase/plan/08_SUPABASE_ARCHITECTURE_PLAN.md`

---

**Completion Status:** 🔴 **INCOMPLETE - REQUIRES MAJOR UPDATES**  
**Recommended Action:** Rewrite using declarative schema approach  
**Estimated Effort:** 2-3 hours


# Skybox GameHub - Supabase Improvement Report

**Project:** Skybox Medellín Sports & Events Platform
**Analysis Date:** 2025-10-23
**Analyst:** Full-Stack Supabase Architect
**Project ID:** `dbocegamkdnsorhtdbni`
**Current Status:** ⚠️ Early Development - Requires Production Hardening

---

## Executive Summary

This report provides a comprehensive analysis of the Skybox GameHub Supabase implementation, identifying critical gaps in data modeling, security, and production readiness. The current implementation uses **hardcoded frontend data** with minimal database integration, presenting significant risks for scalability, data consistency, and real-time updates.

### Current Readiness Score: **25/100** 🔴

| Category | Score | Status |
|----------|-------|--------|
| **Schema Design** | 20/100 | 🔴 Critical |
| **RLS & Security** | 0/100 | 🔴 Not Implemented |
| **Data Integration** | 10/100 | 🔴 Minimal |
| **Migration Strategy** | 40/100 | 🟡 Needs Work |
| **API Alignment** | 15/100 | 🔴 Poor |
| **Performance** | N/A | ⚪ Not Testable |
| **Backup & Recovery** | 0/100 | 🔴 None |

---

## Table of Contents

1. [Current State Analysis](#1-current-state-analysis)
2. [Frontend Component Audit](#2-frontend-component-audit)
3. [Schema Gap Analysis](#3-schema-gap-analysis)
4. [Production-Ready Schema Design](#4-production-ready-schema-design)
5. [RLS & Security Strategy](#5-rls--security-strategy)
6. [Migration Strategy & Folder Structure](#6-migration-strategy--folder-structure)
7. [API Route Alignment](#7-api-route-alignment)
8. [Supabase Strategy Document](#8-supabase-strategy-document)
9. [Action Plan & Timeline](#9-action-plan--timeline)
10. [Critical Issues Summary](#10-critical-issues-summary)

---

## 1. Current State Analysis

### 1.1 Existing Supabase Configuration

**Location:** `/home/sk/skybox-gamehub/supabase/`

**Files Found:**
```
supabase/
├── config.toml (✅ Present)
├── migrations/
│   └── 001_create_sports_games_schema.sql (✅ Single migration)
├── seed_data/
│   └── nfl_games_2025.sql
├── lists/ (empty)
└── plan/ (empty)
```

**Project ID:** `dbocegamkdnsorhtdbni`

### 1.2 Current Migration Analysis

**File:** `001_create_sports_games_schema.sql`

#### ✅ What's Good:
- Basic sports schema exists (leagues, teams, games)
- Foreign key relationships defined
- Indexes on common query fields
- Initial league data seeded (NFL, NBA, NHL, MLB)

#### ❌ Critical Issues:
1. **No RLS (Row Level Security)** - All tables completely unprotected
2. **No UUID primary keys** - Uses SERIAL (integer) instead of UUID
3. **No `updated_at` triggers** - No automatic timestamp updates
4. **No user/profile integration** - Cannot track who created/modified data
5. **No soft deletes** - Data permanently removed on DELETE
6. **Missing critical tables** - Events, reservations, menu items, gallery
7. **No authentication schema** - Profiles, roles, permissions missing
8. **No Shopify integration tables** - Orders, products, inventory
9. **No WhatsApp/AI automation tables** - Messages, conversations, automations

### 1.3 Frontend Data Analysis

**Critical Finding:** 📊 **100% of data is hardcoded in TypeScript files**

**Data Files Found:**
```typescript
src/data/
├── events.ts          (7 events - NO database)
├── leagues.ts         (Sports leagues - NO database)
├── mlb_games_2025.ts  (MLB schedule - NO database)
├── nfl_games_2025.ts  (NFL schedule - NO database)
├── nhl_games_2026.ts  (NHL schedule - NO database)
├── colombian_football_2025.ts (Soccer - NO database)
├── topTeams.ts        (Featured teams - NO database)
└── allSports.ts       (Sports directory - NO database)
```

**Impact:**
- No real-time updates possible
- Manual code changes required for any data update
- No content management for staff
- No analytics/tracking on user engagement
- No WhatsApp automation integration possible
- No Shopify order synchronization

---

## 2. Frontend Component Audit

### 2.1 Components Requiring Supabase Integration

#### **High Priority (User-Facing Data)**

| Component | Current State | Required Tables | Integration Complexity |
|-----------|--------------|----------------|----------------------|
| **Home.tsx** | Hardcoded events | `events`, `featured_events`, `banners` | Medium |
| **Events.tsx** | Static `events.ts` | `events`, `categories`, `specials`, `prizes` | High |
| **EventDetail.tsx** | File-based routing | `events`, `galleries`, `faqs`, `packages` | High |
| **Sports.tsx** | Hardcoded leagues | `leagues`, `teams`, `games` | Medium |
| **LeagueDetail.tsx** | File-based data | `games`, `teams`, `standings` | High |
| **SportsSchedule.tsx** | Multiple TS files | `games`, `broadcasts` | Medium |
| **Menu.tsx** | NO data source | `menu_items`, `categories`, `specials`, `pricing` | High |
| **Gallery.tsx** | Image imports | `galleries`, `images`, `tags` | Low |
| **Reserve.tsx** | NO backend | `reservations`, `tables`, `packages`, `availability` | Critical |

#### **Medium Priority (Content Management)**

| Component | Current State | Required Tables | Integration Complexity |
|-----------|--------------|----------------|----------------------|
| **TopTeams.tsx** | Static `topTeams.ts` | `featured_teams`, `team_stats` | Low |
| **WorldSeries.tsx** | Hardcoded | `events`, `promotions` | Low |
| **VIPRooftop.tsx** | Static content | `packages`, `amenities`, `pricing` | Medium |
| **Contact.tsx** | Form only | `inquiries`, `contacts` | Low |

### 2.2 Missing Integrations

#### **Supabase Client Usage: 0 files** 🔴

**Search Results:**
```bash
grep -r "supabase|createClient" src/
# No matches found
```

**Implication:** Zero database connectivity in entire frontend codebase.

### 2.3 Data Flow Analysis

**Current (All Hardcoded):**
```
TypeScript Files → Frontend Components → User
```

**Required (Database-Driven):**
```
Supabase DB → API/Query → Frontend Components → User
              ↓
         Real-time Subscriptions
         Analytics Tracking
         WhatsApp Sync
         Shopify Integration
```

---

## 3. Schema Gap Analysis

### 3.1 Missing Tables (Critical)

| Table Name | Purpose | Priority | Dependencies |
|-----------|---------|----------|--------------|
| `profiles` | User accounts & auth | 🔴 Critical | `auth.users` |
| `events` | Event management | 🔴 Critical | `categories`, `leagues` |
| `reservations` | Table bookings | 🔴 Critical | `profiles`, `events`, `tables` |
| `menu_items` | Food & drink catalog | 🔴 Critical | `categories`, `pricing` |
| `galleries` | Image management | 🟡 High | `events`, `tags` |
| `packages` | VIP/Table packages | 🔴 Critical | `pricing`, `amenities` |
| `shopify_orders` | E-commerce sync | 🟡 High | `profiles`, `products` |
| `whatsapp_conversations` | Automation | 🟡 High | `profiles`, `messages` |
| `faqs` | Event FAQs | 🟢 Medium | `events`, `categories` |
| `testimonials` | Reviews | 🟢 Medium | `profiles`, `events` |
| `promotions` | Marketing banners | 🟡 High | `events`, `dates` |
| `analytics_events` | User tracking | 🟢 Low | `profiles`, `sessions` |

### 3.2 Missing Relationships

**Current Schema:**
```
leagues → teams → games
          ↓
   skybox_featured_games
```

**Required Schema:**
```
auth.users → profiles → reservations → events
                     ↓        ↓
                   orders  menu_items
                     ↓
              whatsapp_conversations
                     ↓
              shopify_sync_log
```

### 3.3 Data Integrity Issues

#### **No Foreign Key Constraints to Users**
- Cannot track who created/modified records
- No audit trail
- No user-specific permissions

#### **No Soft Deletes**
- Data permanently lost on deletion
- Cannot restore accidentally deleted records
- No historical data retention

#### **No Timestamps on All Tables**
- Cannot track data freshness
- No audit trail
- Cannot sort by creation/update time

---

## 4. Production-Ready Schema Design

### 4.1 Normalized Schema (ERD)

```
┌──────────────────┐
│   auth.users     │ (Supabase managed)
│  ────────────    │
│  id (UUID)       │
│  email           │
│  created_at      │
└────────┬─────────┘
         │ 1:1
         ↓
┌──────────────────────────────┐
│   profiles                    │
│  ──────────────────────────   │
│  id (UUID) PK                 │
│  user_id (UUID) FK → auth.users
│  full_name                    │
│  phone                        │
│  preferred_language (es/en)   │
│  whatsapp_opt_in (boolean)    │
│  role (customer/staff/admin)  │
│  created_at, updated_at       │
│  deleted_at (soft delete)     │
└────────┬─────────────────────┘
         │ 1:N
         ↓
┌─────────────────────────────────────┐
│   reservations                       │
│  ──────────────────────────────────  │
│  id (UUID) PK                        │
│  profile_id (UUID) FK → profiles     │
│  event_id (UUID) FK → events         │
│  package_id (UUID) FK → packages     │
│  table_number                        │
│  guest_count                         │
│  reservation_date                    │
│  status (pending/confirmed/cancelled)│
│  total_amount                        │
│  payment_status                      │
│  shopify_order_id (nullable)         │
│  created_at, updated_at              │
└─────────────────────────────────────┘
         ↓
┌──────────────────────────────────────┐
│   events                              │
│  ───────────────────────────────────  │
│  id (UUID) PK                         │
│  slug (unique)                        │
│  title                                │
│  subtitle                             │
│  description                          │
│  event_date, event_time               │
│  category_id FK → event_categories    │
│  venue_id FK → venues                 │
│  capacity                             │
│  featured_image_url                   │
│  status (draft/published/past)        │
│  created_by FK → profiles             │
│  created_at, updated_at               │
│  deleted_at                           │
└─────────┬────────────────────────────┘
          │ 1:N
          ↓
┌────────────────────────────────┐
│   event_highlights             │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  event_id FK → events           │
│  highlight_text                 │
│  display_order                  │
└─────────────────────────────────┘

┌────────────────────────────────┐
│   event_specials               │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  event_id FK → events           │
│  menu_item_id FK → menu_items   │
│  special_price                  │
│  description                    │
└─────────────────────────────────┘

┌────────────────────────────────┐
│   event_prizes                 │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  event_id FK → events           │
│  prize_title                    │
│  prize_amount                   │
│  description                    │
│  display_order                  │
└─────────────────────────────────┘

┌────────────────────────────────┐
│   event_faqs                   │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  event_id FK → events (nullable)│
│  question                       │
│  answer                         │
│  display_order                  │
└─────────────────────────────────┘

┌────────────────────────────────┐
│   menu_items                   │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  name                           │
│  description                    │
│  category_id FK → menu_categories
│  base_price                     │
│  image_url                      │
│  is_available                   │
│  allergens                      │
│  created_at, updated_at         │
└─────────────────────────────────┘

┌────────────────────────────────┐
│   galleries                    │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  title                          │
│  event_id FK → events (nullable)│
│  display_order                  │
└──────────┬──────────────────────┘
           │ 1:N
           ↓
┌────────────────────────────────┐
│   gallery_images               │
│  ─────────────────────────────  │
│  id (UUID) PK                   │
│  gallery_id FK → galleries      │
│  image_url (Supabase Storage)   │
│  alt_text                       │
│  caption                        │
│  display_order                  │
│  uploaded_at                    │
└─────────────────────────────────┘

┌────────────────────────────────────┐
│   packages                          │
│  ─────────────────────────────────  │
│  id (UUID) PK                       │
│  name                               │
│  description                        │
│  price                              │
│  capacity                           │
│  includes (JSONB array)             │
│  is_active                          │
└─────────────────────────────────────┘

┌──────────────────────────────────────┐
│   whatsapp_conversations             │
│  ───────────────────────────────────  │
│  id (UUID) PK                         │
│  profile_id FK → profiles             │
│  phone_number                         │
│  status (active/resolved/spam)        │
│  last_message_at                      │
│  created_at                           │
└───────┬──────────────────────────────┘
        │ 1:N
        ↓
┌───────────────────────────────────────┐
│   whatsapp_messages                   │
│  ────────────────────────────────────  │
│  id (UUID) PK                          │
│  conversation_id FK                    │
│  direction (inbound/outbound)          │
│  content                               │
│  metadata (JSONB)                      │
│  sent_at                               │
└────────────────────────────────────────┘

┌────────────────────────────────────┐
│   shopify_orders                    │
│  ─────────────────────────────────  │
│  id (UUID) PK                       │
│  profile_id FK → profiles           │
│  shopify_order_id (external)        │
│  order_number                       │
│  total_price                        │
│  status                             │
│  synced_at                          │
│  created_at                         │
└─────────────────────────────────────┘

┌────────────────────────────────────┐
│   games (existing + enhancements)   │
│  ─────────────────────────────────  │
│  id → UUID (change from SERIAL)     │
│  league_id FK → leagues             │
│  home_team_id FK → teams            │
│  away_team_id FK → teams            │
│  game_datetime                      │
│  venue                              │
│  broadcast_networks                 │
│  status                             │
│  is_skybox_featured (boolean)       │
│  created_at, updated_at             │
│  deleted_at                         │
└─────────────────────────────────────┘
```

### 4.2 Table Relationships Summary

```
auth.users (1) ←──→ (1) profiles
profiles (1) ←──→ (N) reservations
profiles (1) ←──→ (N) whatsapp_conversations
profiles (1) ←──→ (N) shopify_orders

events (1) ←──→ (N) reservations
events (1) ←──→ (N) event_highlights
events (1) ←──→ (N) event_specials
events (1) ←──→ (N) event_prizes
events (1) ←──→ (N) event_faqs
events (1) ←──→ (N) galleries

packages (1) ←──→ (N) reservations

leagues (1) ←──→ (N) teams
leagues (1) ←──→ (N) games
teams (1) ←──→ (N) games (home_team)
teams (1) ←──→ (N) games (away_team)

menu_categories (1) ←──→ (N) menu_items
menu_items (1) ←──→ (N) event_specials

galleries (1) ←──→ (N) gallery_images

whatsapp_conversations (1) ←──→ (N) whatsapp_messages
```

---

## 5. RLS & Security Strategy

### 5.1 Current Security Status: **🔴 CRITICAL**

**Issues:**
- Zero RLS policies implemented
- All tables publicly accessible
- No authentication checks
- No data isolation between users

### 5.2 Required RLS Policies

#### **profiles Table**

```sql
-- Users can read all profiles (for social features)
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (deleted_at IS NULL);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
```

#### **events Table**

```sql
-- Everyone can view published events
CREATE POLICY "Published events are viewable by everyone"
  ON events FOR SELECT
  TO authenticated, anon
  USING (status = 'published' AND deleted_at IS NULL);

-- Only staff/admin can create events
CREATE POLICY "Staff can create events"
  ON events FOR INSERT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );

-- Only staff/admin can update events
CREATE POLICY "Staff can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );
```

#### **reservations Table**

```sql
-- Users can view their own reservations
CREATE POLICY "Users can view own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

-- Staff can view all reservations
CREATE POLICY "Staff can view all reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );

-- Users can create reservations for themselves
CREATE POLICY "Users can create own reservations"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Users can update their own reservations (before confirmed)
CREATE POLICY "Users can update own pending reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (
    profile_id = auth.uid()
    AND status = 'pending'
  );
```

#### **menu_items Table**

```sql
-- Everyone can view available menu items
CREATE POLICY "Available menu items viewable by everyone"
  ON menu_items FOR SELECT
  TO authenticated, anon
  USING (is_available = true);

-- Only staff can manage menu
CREATE POLICY "Staff can manage menu items"
  ON menu_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );
```

### 5.3 Storage Bucket Policies

```sql
-- Gallery images bucket
CREATE POLICY "Anyone can view gallery images"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Staff can upload gallery images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'gallery-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );

-- Menu images bucket
CREATE POLICY "Anyone can view menu images"
  ON storage.objects FOR SELECT
  TO authenticated, anon
  USING (bucket_id = 'menu-images');

CREATE POLICY "Staff can upload menu images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'menu-images'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );
```

---

## 6. Migration Strategy & Folder Structure

### 6.1 Recommended Folder Structure

```
/home/sk/skybox-gamehub/supabase/
├── config.toml
├── migrations/
│   ├── 20251024000001_create_profiles_and_auth.sql
│   ├── 20251024000002_create_events_schema.sql
│   ├── 20251024000003_create_reservations_schema.sql
│   ├── 20251024000004_create_menu_schema.sql
│   ├── 20251024000005_create_galleries_schema.sql
│   ├── 20251024000006_create_whatsapp_schema.sql
│   ├── 20251024000007_create_shopify_schema.sql
│   ├── 20251024000008_enhance_games_schema.sql
│   ├── 20251024000009_create_rls_policies.sql
│   ├── 20251024000010_create_storage_buckets.sql
│   └── README.md (migration index)
├── seed_data/
│   ├── 001_leagues.sql
│   ├── 002_teams.sql
│   ├── 003_events.sql
│   ├── 004_menu_items.sql
│   └── 005_packages.sql
├── functions/ (Supabase Edge Functions)
│   ├── whatsapp-webhook/
│   ├── shopify-sync/
│   └── analytics-track/
├── tests/
│   ├── rls-tests.sql
│   └── data-integrity-tests.sql
└── docs/
    ├── SCHEMA.md
    ├── RLS_GUIDE.md
    └── MIGRATION_GUIDE.md
```

### 6.2 Migration Naming Convention

**Format:** `YYYYMMDDHHMMSS_descriptive_name.sql`

**Examples:**
- `20251024120000_create_profiles_and_auth.sql`
- `20251024120100_create_events_schema.sql`
- `20251024120200_create_rls_policies_events.sql`

**Rules:**
1. Use timestamps in sequential order
2. Descriptive names (snake_case)
3. Group related changes
4. Always include rollback comments

### 6.3 Migration Template (Updated)

```sql
-- Migration: [Description]
-- Created: YYYY-MM-DD HH:MM:SS
-- Author: [Name]
-- Rollback: See bottom of file

BEGIN;

-- =============================================================================
-- DESCRIPTION
-- =============================================================================
-- What this migration does and why

-- =============================================================================
-- TABLE CREATION
-- =============================================================================

CREATE TABLE IF NOT EXISTS table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Columns
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL  -- Soft delete
);

-- =============================================================================
-- INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_table_name_profile_id
  ON table_name(profile_id);

CREATE INDEX IF NOT EXISTS idx_table_name_status
  ON table_name(status) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_table_name_created_at
  ON table_name(created_at DESC);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Updated_at trigger
DROP TRIGGER IF EXISTS set_updated_at_table_name ON table_name;

CREATE TRIGGER set_updated_at_table_name
  BEFORE UPDATE ON table_name
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "policy_name_select" ON table_name;
CREATE POLICY "policy_name_select"
  ON table_name FOR SELECT
  TO authenticated, anon
  USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "policy_name_insert" ON table_name;
CREATE POLICY "policy_name_insert"
  ON table_name FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- =============================================================================
-- GRANTS (if needed for service role)
-- =============================================================================

GRANT SELECT, INSERT, UPDATE ON table_name TO authenticated;
GRANT SELECT ON table_name TO anon;

COMMIT;

-- =============================================================================
-- ROLLBACK INSTRUCTIONS
-- =============================================================================
-- To rollback this migration, run:
--
-- BEGIN;
-- DROP TABLE IF EXISTS table_name CASCADE;
-- COMMIT;
```

---

## 7. API Route Alignment

### 7.1 Required API Endpoints

#### **Events API**

```typescript
// src/api/events.ts

import { supabase } from '@/integrations/supabase/client';

export const eventsApi = {
  // Get all published events
  async getAll() {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_highlights(*),
        event_prizes(*),
        event_specials(*, menu_item:menu_items(*)),
        galleries(*, gallery_images(*))
      `)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Get event by slug
  async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from('events')
      .select(`
        *,
        event_highlights(*),
        event_prizes(*),
        event_specials(*, menu_item:menu_items(*)),
        event_faqs(*),
        galleries(*, gallery_images(*))
      `)
      .eq('slug', slug)
      .eq('status', 'published')
      .is('deleted_at', null)
      .single();

    if (error) throw error;
    return data;
  },

  // Get featured events
  async getFeatured() {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_featured', true)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('event_date', { ascending: true })
      .limit(3);

    if (error) throw error;
    return data;
  }
};
```

#### **Reservations API**

```typescript
// src/api/reservations.ts

export const reservationsApi = {
  // Create reservation
  async create(reservation: CreateReservationDto) {
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        profile_id: (await supabase.auth.getUser()).data.user?.id,
        event_id: reservation.eventId,
        package_id: reservation.packageId,
        guest_count: reservation.guestCount,
        reservation_date: reservation.date,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get user's reservations
  async getMyReservations() {
    const { data, error } = await supabase
      .from('reservations')
      .select(`
        *,
        event:events(*),
        package:packages(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
```

#### **Games/Sports API**

```typescript
// src/api/games.ts

export const gamesApi = {
  // Get games by league
  async getByLeague(leagueSlug: string, limit = 10) {
    const { data, error } = await supabase
      .from('games')
      .select(`
        *,
        league:leagues(*),
        home_team:teams!home_team_id(*),
        away_team:teams!away_team_id(*)
      `)
      .eq('leagues.slug', leagueSlug)
      .gte('game_datetime', new Date().toISOString())
      .is('deleted_at', null)
      .order('game_datetime', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get featured games for Skybox
  async getFeatured() {
    const { data, error } = await supabase
      .from('games')
      .select(`
        *,
        league:leagues(*),
        home_team:teams!home_team_id(*),
        away_team:teams!away_team_id(*)
      `)
      .eq('is_skybox_featured', true)
      .gte('game_datetime', new Date().toISOString())
      .is('deleted_at', null)
      .order('game_datetime', { ascending: true })
      .limit(5);

    if (error) throw error;
    return data;
  }
};
```

### 7.2 Real-Time Subscriptions

```typescript
// src/hooks/useRealtimeEvents.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useRealtimeEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Initial fetch
    fetchEvents();

    // Subscribe to changes
    const subscription = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events'
        },
        (payload) => {
          console.log('Event changed:', payload);
          fetchEvents();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('event_date');

    setEvents(data || []);
  }

  return events;
}
```

---

## 8. Supabase Strategy Document

### 8.1 Authentication Strategy

#### **Auth Providers to Enable:**
1. **Email/Password** (Primary) ✅
2. **WhatsApp OTP** (High Priority for local users)
3. **Google OAuth** (Optional for tourists)
4. **Facebook OAuth** (Optional for social integration)

#### **Profile Creation Flow:**

```sql
-- Function: Automatically create profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'  -- Default role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: On auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### 8.2 Storage Strategy

#### **Buckets to Create:**

| Bucket Name | Public | Purpose | Size Limit | Allowed Types |
|------------|--------|---------|------------|---------------|
| `gallery-images` | Yes | Event photos | 5MB | image/* |
| `menu-images` | Yes | Food/drink photos | 2MB | image/* |
| `event-banners` | Yes | Hero images | 3MB | image/* |
| `user-avatars` | Yes | Profile pictures | 1MB | image/* |
| `documents` | No | Receipts, invoices | 10MB | application/pdf |

#### **Storage Security:**

```sql
-- Gallery images (anyone view, staff upload)
CREATE POLICY "Anyone can view gallery images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-images');

CREATE POLICY "Staff can upload gallery images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'gallery-images'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role IN ('staff', 'admin')
    )
  );
```

### 8.3 Edge Functions Strategy

#### **Priority Functions:**

1. **WhatsApp Webhook Handler**
   ```typescript
   // functions/whatsapp-webhook/index.ts
   // Receives messages from WhatsApp Business API
   // Stores in whatsapp_messages table
   // Triggers AI response via OpenAI
   ```

2. **Shopify Order Sync**
   ```typescript
   // functions/shopify-sync/index.ts
   // Webhook from Shopify on new orders
   // Syncs order data to shopify_orders table
   // Links to existing reservations if applicable
   ```

3. **Analytics Event Tracker**
   ```typescript
   // functions/analytics-track/index.ts
   // Tracks user interactions (page views, clicks, bookings)
   // Stores in analytics_events table
   ```

4. **Automated Reminders**
   ```typescript
   // functions/send-reminders/index.ts
   // Cron job: Check reservations 24h before event
   // Send WhatsApp reminder to guests
   ```

### 8.4 Performance Optimization

#### **Indexes Strategy:**

```sql
-- Composite indexes for common queries
CREATE INDEX idx_events_status_date
  ON events(status, event_date) WHERE deleted_at IS NULL;

CREATE INDEX idx_reservations_profile_status
  ON reservations(profile_id, status);

CREATE INDEX idx_games_league_datetime
  ON games(league_id, game_datetime) WHERE is_skybox_featured = true;

-- Full-text search indexes
CREATE INDEX idx_events_search
  ON events USING gin(to_tsvector('english', title || ' ' || description));

CREATE INDEX idx_menu_items_search
  ON menu_items USING gin(to_tsvector('english', name || ' ' || description));
```

#### **Database Functions for Complex Queries:**

```sql
-- Get upcoming events with availability
CREATE OR REPLACE FUNCTION get_upcoming_events_with_availability()
RETURNS TABLE (
  event_id UUID,
  title TEXT,
  event_date DATE,
  total_capacity INTEGER,
  reserved_count BIGINT,
  available_spots INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    e.id,
    e.title,
    e.event_date,
    e.capacity,
    COUNT(r.id) AS reserved_count,
    (e.capacity - COUNT(r.id)) AS available_spots
  FROM events e
  LEFT JOIN reservations r
    ON e.id = r.event_id
    AND r.status IN ('confirmed', 'pending')
  WHERE e.status = 'published'
    AND e.deleted_at IS NULL
    AND e.event_date >= CURRENT_DATE
  GROUP BY e.id, e.title, e.event_date, e.capacity
  ORDER BY e.event_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 8.5 Backup & Recovery Strategy

#### **Automated Backups:**

**Enable via Supabase Dashboard:**
- Daily automated backups (retained 30 days)
- Point-in-time recovery (PITR) enabled
- Backup retention policy: 90 days for critical tables

#### **Manual Backup Script:**

```bash
#!/bin/bash
# backup-supabase.sh

PROJECT_REF="dbocegamkdnsorhtdbni"
BACKUP_DIR="/home/sk/skybox-gamehub/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup schema
supabase db dump \
  --schema public \
  --file "$BACKUP_DIR/schema_$DATE.sql"

# Backup data
supabase db dump \
  --data-only \
  --file "$BACKUP_DIR/data_$DATE.sql"

echo "Backup completed: $BACKUP_DIR/*_$DATE.sql"
```

**Cron Schedule:**
```cron
0 2 * * * /home/sk/skybox-gamehub/supabase/scripts/backup-supabase.sh
```

---

## 9. Action Plan & Timeline

### 9.1 Phase 1: Foundation (Week 1-2) 🔴 CRITICAL

**Priority: Immediate**

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Fix old project references (`medellin-spark` → `skybox-gamehub`) | 2h | DevOps | 🔴 Todo |
| Create profiles & auth schema migration | 4h | Backend | 🔴 Todo |
| Set up RLS policies for profiles | 2h | Backend | 🔴 Todo |
| Create events schema migration | 6h | Backend | 🔴 Todo |
| Implement events API layer | 4h | Frontend | 🔴 Todo |
| Update Home.tsx to use Supabase events | 3h | Frontend | 🔴 Todo |
| Test event CRUD operations | 2h | QA | 🔴 Todo |

**Deliverables:**
- ✅ Profiles table with RLS
- ✅ Events table with related tables
- ✅ Working events API
- ✅ Home page displaying database events

### 9.2 Phase 2: Core Features (Week 3-4) 🟡 HIGH

**Priority: High**

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Create reservations schema | 6h | Backend | 🟡 Todo |
| Create menu schema | 4h | Backend | 🟡 Todo |
| Create packages schema | 3h | Backend | 🟡 Todo |
| Implement reservations API | 6h | Backend | 🟡 Todo |
| Build Reserve.tsx form with Supabase | 8h | Frontend | 🟡 Todo |
| Implement menu API | 3h | Backend | 🟡 Todo |
| Update Menu.tsx to use database | 4h | Frontend | 🟡 Todo |
| Create storage buckets (gallery, menu) | 2h | DevOps | 🟡 Todo |
| Implement image upload to Storage | 4h | Frontend | 🟡 Todo |

**Deliverables:**
- ✅ Functional reservation system
- ✅ Database-driven menu
- ✅ Image storage working

### 9.3 Phase 3: Integrations (Week 5-6) 🟢 MEDIUM

**Priority: Medium**

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Create WhatsApp schema | 3h | Backend | 🟢 Todo |
| Set up WhatsApp webhook Edge Function | 8h | Backend | 🟢 Todo |
| Create Shopify integration schema | 4h | Backend | 🟢 Todo |
| Implement Shopify sync Edge Function | 10h | Backend | 🟢 Todo |
| Migrate games data from TS to database | 6h | Data Migration | 🟢 Todo |
| Update SportsSchedule.tsx to use Supabase | 4h | Frontend | 🟢 Todo |
| Implement real-time subscriptions | 4h | Frontend | 🟢 Todo |

**Deliverables:**
- ✅ WhatsApp automation working
- ✅ Shopify orders synced
- ✅ Sports schedules from database
- ✅ Real-time updates on frontend

### 9.4 Phase 4: Polish & Optimization (Week 7-8) 🟢 LOW

**Priority: Low (Quality of Life)**

| Task | Effort | Owner | Status |
|------|--------|-------|--------|
| Implement full-text search on events | 3h | Backend | 🟢 Todo |
| Add analytics tracking Edge Function | 6h | Backend | 🟢 Todo |
| Create admin dashboard (CMS) | 16h | Frontend | 🟢 Todo |
| Implement automated backup scripts | 4h | DevOps | 🟢 Todo |
| Create database function for complex queries | 4h | Backend | 🟢 Todo |
| Performance testing & query optimization | 8h | QA | 🟢 Todo |
| Write comprehensive API documentation | 6h | Tech Writer | 🟢 Todo |

**Deliverables:**
- ✅ Admin CMS for content management
- ✅ Analytics tracking
- ✅ Optimized performance
- ✅ Full documentation

### 9.5 Timeline Summary

```
Week 1-2:  Foundation (Profiles, Events, Basic API)
Week 3-4:  Core Features (Reservations, Menu, Storage)
Week 5-6:  Integrations (WhatsApp, Shopify, Games)
Week 7-8:  Polish (Admin, Analytics, Optimization)

Total Estimated Time: 8 weeks (2 months)
Critical Path: Weeks 1-4 (Foundation + Core)
```

---

## 10. Critical Issues Summary

### 10.1 Immediate Action Required 🔴

| Issue | Severity | Impact | Effort to Fix |
|-------|----------|--------|---------------|
| **No RLS policies** | 🔴 Critical | Database wide open to attacks | 2 days |
| **Hardcoded data in frontend** | 🔴 Critical | Cannot update content without deployments | 2 weeks |
| **No user authentication** | 🔴 Critical | Cannot track reservations, preferences | 1 week |
| **No reservation system** | 🔴 Critical | Cannot take bookings | 1 week |
| **Integer IDs instead of UUIDs** | 🟡 High | Predictable IDs, less secure | 1 day (migration) |
| **Old project references** | 🟡 High | Confusion, broken paths | 2 hours |
| **No backup strategy** | 🟡 High | Data loss risk | 1 day |

### 10.2 Data Migration Risk Assessment

**Current Data State:**
- ~200 lines of hardcoded event data
- ~500 lines of hardcoded sports data
- No production data in database yet

**Migration Complexity:** 🟢 LOW (no production users yet)

**Recommended Approach:**
1. Create complete schema first
2. Write migration scripts to convert TS files → SQL inserts
3. Test locally
4. Deploy to production (empty → populated)
5. Switch frontend to API calls
6. Monitor for issues
7. Remove TS data files after 1 month verification

### 10.3 Security Audit Checklist

- [ ] RLS enabled on ALL tables
- [ ] Auth trigger creates profile automatically
- [ ] Storage buckets have access policies
- [ ] API keys not exposed in frontend
- [ ] Supabase anon key properly scoped
- [ ] Service role key only used in Edge Functions
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled on auth endpoints
- [ ] Email verification required for signups
- [ ] Password reset flow implemented

---

## Appendix A: File Reference Updates Required

### Files Containing Old Project Path (`medellin-spark`)

```
/home/sk/skybox-gamehub/.claude/skills/supabase-migration/SKILL.md
  Line 153: cd /home/sk/medellin-spark/supabase/migrations
  Line 327: cd /home/sk/medellin-spark/supabase/migrations

/home/sk/skybox-gamehub/.claude/agents/planning-architect.md
  (Review for any hardcoded paths)

/home/sk/skybox-gamehub/.claude/skills/prompt-engineer/SKILL.md
  (Review for any hardcoded paths)

/home/sk/skybox-gamehub/.claude/skills/production-deploy/DEPLOY.md
  (Review for deployment paths)
```

**Fix Command:**
```bash
cd /home/sk/skybox-gamehub
find .claude -type f -exec sed -i 's|/home/sk/medellin-spark|/home/sk/skybox-gamehub|g' {} +
```

---

## Appendix B: Recommended Tools & Resources

### Development Tools
- **Supabase CLI** - For local development and migrations
- **Prisma** - Consider as ORM for type-safe queries
- **Zod** - Runtime type validation for API responses
- **React Query** - For client-side data fetching/caching

### Monitoring
- **Supabase Dashboard** - Built-in analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay for bugs

### Testing
- **Jest** - Unit tests for API functions
- **Playwright** - E2E tests (already set up ✅)
- **Supabase Test Helpers** - RLS policy testing

---

## Conclusion

The Skybox GameHub project currently operates with **hardcoded frontend data** and minimal database integration, presenting significant risks for production deployment. The current readiness score of **25/100** reflects critical gaps in:

1. **Security** - Zero RLS policies
2. **Scalability** - No database-driven content
3. **Data Integrity** - No user tracking or audit trails
4. **Integration** - No Shopify/WhatsApp sync

**Immediate Next Steps:**
1. ✅ Fix old project path references (2 hours)
2. 🔴 Implement profiles & auth (1 week)
3. 🔴 Migrate events to database (1 week)
4. 🔴 Enable RLS policies (2 days)
5. 🔴 Build reservation system (1 week)

**Estimated Timeline to Production-Ready:** 8 weeks

**Critical Path:** Foundation + Core Features (4 weeks minimum)

**Final Readiness Target:** 90/100 (Allow 10% buffer for edge cases)

---

**Report Generated:** 2025-10-23
**Next Review Date:** After Phase 1 completion
**Contact:** Supabase Architect Team

---

*This report serves as the foundation for transforming Skybox GameHub from a static website into a scalable, database-driven platform capable of handling real-time bookings, WhatsApp automation, and Shopify integration.*

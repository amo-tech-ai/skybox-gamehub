# Skybox GameHub - Supabase Database

**Project ID:** `dbocegamkdnsorhtdbni`
**Status:** 🟡 Development → Production Migration Needed
**Current Readiness:** 25/100
**Target Readiness:** 90/100

---

## 📚 Documentation Index

### Essential Reading
1. **[SUPABASE_IMPROVEMENT_REPORT.md](./SUPABASE_IMPROVEMENT_REPORT.md)** ⭐ START HERE
   - Comprehensive analysis of current state
   - Schema gap identification
   - Production-ready schema design (ERD)
   - Security strategy (RLS policies)
   - Readiness score: 25/100

2. **[ACTION_PLAN.md](./ACTION_PLAN.md)** ⭐ IMPLEMENTATION GUIDE
   - 8-week implementation timeline
   - Phase-by-phase breakdown
   - Code examples for each step
   - Testing checklist
   - Deployment guide

3. **Migration Skill** (`.claude/skills/supabase-migration/SKILL.md`)
   - Migration best practices
   - SQL templates
   - RLS policy patterns
   - Testing guidelines

---

## 🚨 Current State Summary

### What Exists ✅
- ✅ Supabase project created (`dbocegamkdnsorhtdbni`)
- ✅ Basic sports schema (leagues, teams, games)
- ✅ One migration file: `001_create_sports_games_schema.sql`
- ✅ Seed data for NFL games

### Critical Gaps 🔴
- 🔴 **No user authentication/profiles** - Cannot track who made reservations
- 🔴 **No RLS (Row Level Security)** - Database completely unprotected
- 🔴 **No events in database** - All data hardcoded in TypeScript files
- 🔴 **No reservation system** - Cannot take bookings
- 🔴 **No menu in database** - Menu page has no data source
- 🔴 **No Supabase client integration** - Zero frontend connectivity
- 🔴 **No WhatsApp/Shopify integration** - No automation tables
- 🔴 **Integer IDs instead of UUIDs** - Security risk

---

## 📊 Readiness Breakdown

| Category | Current | Target | Gap | Priority |
|----------|---------|--------|-----|----------|
| Schema Design | 20/100 | 90/100 | -70 | 🔴 Critical |
| RLS & Security | 0/100 | 95/100 | -95 | 🔴 Critical |
| Data Integration | 10/100 | 90/100 | -80 | 🔴 Critical |
| Migration Strategy | 40/100 | 90/100 | -50 | 🟡 High |
| API Alignment | 15/100 | 85/100 | -70 | 🔴 Critical |
| Performance | N/A | 90/100 | N/A | ⚪ Not Tested |
| Backup & Recovery | 0/100 | 95/100 | -95 | 🟡 High |
| **OVERALL** | **25/100** | **90/100** | **-65** | 🔴 **Critical** |

---

## 🎯 Quick Start Guide

### Prerequisites
```bash
# Install Supabase CLI
npm install -g supabase

# Verify installation
supabase --version

# Login to Supabase
supabase login
```

### Link Project
```bash
cd /home/sk/skybox-gamehub
supabase link --project-ref dbocegamkdnsorhtdbni
```

### Create Your First Migration
```bash
cd supabase/migrations
touch $(date +%Y%m%d%H%M%S)_create_profiles_and_auth.sql
```

**Template:**
```sql
-- Migration: Create profiles and authentication
-- Created: 2025-10-24
-- Status: pending

BEGIN;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

COMMIT;
```

### Apply Migration
```bash
# Local (development)
supabase db push

# Production (via Supabase Dashboard)
# 1. Copy migration SQL
# 2. Go to Dashboard → SQL Editor
# 3. Paste and execute
```

---

## 📁 Folder Structure

```
/home/sk/skybox-gamehub/supabase/
├── README.md (this file)
├── SUPABASE_IMPROVEMENT_REPORT.md (analysis)
├── ACTION_PLAN.md (implementation guide)
├── config.toml (Supabase project config)
│
├── migrations/
│   ├── 001_create_sports_games_schema.sql (existing)
│   ├── 002_create_profiles_and_auth.sql (to create)
│   ├── 003_create_events_schema.sql (to create)
│   ├── 004_create_reservations_schema.sql (to create)
│   └── ... (see ACTION_PLAN.md for full list)
│
├── seed_data/
│   ├── nfl_games_2025.sql (existing)
│   ├── 001_leagues.sql (to create)
│   ├── 002_teams.sql (to create)
│   ├── 003_events.sql (to create)
│   └── 004_menu_items.sql (to create)
│
├── functions/ (Edge Functions - to create)
│   ├── whatsapp-webhook/
│   ├── shopify-sync/
│   └── analytics-track/
│
├── tests/ (to create)
│   ├── rls-tests.sql
│   └── data-integrity-tests.sql
│
└── docs/ (to create)
    ├── SCHEMA.md
    ├── RLS_GUIDE.md
    └── MIGRATION_GUIDE.md
```

---

## 🔧 Common Commands

### Migrations
```bash
# Create new migration
cd supabase/migrations
touch $(date +%Y%m%d%H%M%S)_description.sql

# List migrations
supabase migration list

# Apply migrations locally
supabase db push

# Check diff
supabase db diff
```

### Database
```bash
# Open local database
supabase db shell

# Reset local database
supabase db reset

# Dump schema
supabase db dump --schema public --file schema.sql

# Dump data
supabase db dump --data-only --file data.sql
```

### Testing
```bash
# Run RLS tests
psql -h localhost -U postgres -d postgres -f tests/rls-tests.sql
```

---

## 🚀 Implementation Timeline

### Week 1-2: Foundation (CRITICAL)
- Create profiles & auth schema
- Create events schema
- Integrate Supabase client in frontend
- Migrate events data from TS → database
- **Goal:** Events displaying from database

### Week 3-4: Core Features (HIGH)
- Create reservations schema
- Build reservation form
- Create menu schema
- Set up storage buckets
- **Goal:** Functional booking system

### Week 5-6: Integrations (MEDIUM)
- WhatsApp webhook & schema
- Shopify sync & schema
- Sports data migration
- Real-time subscriptions
- **Goal:** Full automation working

### Week 7-8: Polish (LOW)
- Admin dashboard
- Analytics tracking
- Performance optimization
- Documentation
- **Goal:** 90/100 readiness score

**Total Timeline:** 8 weeks (2 months)

---

## 🔐 Security Checklist

### Before Production Deployment
- [ ] RLS enabled on ALL tables
- [ ] Auth trigger creates profile automatically
- [ ] Storage buckets have access policies
- [ ] API keys not exposed in frontend code
- [ ] Supabase anon key properly scoped (read-only)
- [ ] Service role key only used in Edge Functions
- [ ] CORS configured for production domain
- [ ] Rate limiting enabled on auth endpoints
- [ ] Email verification required for signups
- [ ] Password reset flow tested

---

## 📝 Migration Naming Convention

**Format:** `YYYYMMDDHHMMSS_descriptive_name.sql`

**Good Examples:**
- `20251024120000_create_profiles_and_auth.sql`
- `20251024130000_create_events_schema.sql`
- `20251024140000_enable_rls_on_events.sql`

**Bad Examples:**
- ❌ `001_events.sql` (no timestamp)
- ❌ `create_events.sql` (no timestamp)
- ❌ `2025-10-24_events.sql` (wrong format)

---

## 🐛 Troubleshooting

### "Relation already exists" Error
**Cause:** Running migration twice without `IF NOT EXISTS`
**Fix:** Add `IF NOT EXISTS` to all CREATE statements

### "Permission denied for table" Error
**Cause:** RLS blocking query
**Fix:** Add appropriate RLS policy or use service role key

### "Foreign key violation" Error
**Cause:** Referenced table doesn't exist yet
**Fix:** Check migration order, referenced tables must be created first

### "Column already exists" Error
**Cause:** Missing conditional column check
**Fix:** Use `DO $$` block with `information_schema` check

---

## 📚 Resources

### Official Documentation
- **Supabase Docs:** https://supabase.com/docs
- **PostgreSQL Docs:** https://www.postgresql.org/docs/
- **RLS Guide:** https://supabase.com/docs/guides/auth/row-level-security

### Community
- **Discord:** https://discord.supabase.com
- **GitHub:** https://github.com/supabase/supabase
- **Stack Overflow:** Tag [supabase]

### Internal Docs
- **web-designer Skill:** `.claude/skills/web-designer.md`
- **Supabase Migration Skill:** `.claude/skills/supabase-migration/SKILL.md`
- **Skybox FE Expert Agent:** `SKYBOX_FE_EXPERT_AGENT.md`

---

## 🎯 Success Criteria

### Technical Metrics
- ✅ Readiness score: 90/100
- ✅ Page load time: <2 seconds
- ✅ Database query time: <100ms average
- ✅ Uptime: 99.9%
- ✅ Error rate: <1%

### Business Metrics
- ✅ Reservations working end-to-end
- ✅ WhatsApp auto-responses <5 minutes
- ✅ Shopify orders synced automatically
- ✅ Admin can manage events without code changes
- ✅ Zero data loss incidents

---

## 📞 Support

### Internal Team
- **Backend Lead:** Database schema, migrations, RLS
- **Frontend Lead:** Supabase client integration, UI updates
- **DevOps:** Deployment, monitoring, backups

### External Support
- **Supabase Pro Support:** Email support@supabase.com
- **Community Discord:** Real-time help from community

---

## ⚡ Next Immediate Actions

1. **Read SUPABASE_IMPROVEMENT_REPORT.md** (1 hour)
2. **Read ACTION_PLAN.md Phase 1** (30 minutes)
3. **Install Supabase CLI** (30 minutes)
4. **Create first migration** (2 hours)
5. **Test migration locally** (1 hour)

**Total Time to First Migration:** ~5 hours

---

**Last Updated:** 2025-10-23
**Version:** 1.0
**Status:** Active Development
**Project:** Skybox GameHub
**Environment:** Development → Production

---

*This README serves as the central hub for all Supabase-related documentation and guides for the Skybox GameHub project.*

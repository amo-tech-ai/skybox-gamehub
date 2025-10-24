# Skybox GameHub - Supabase Implementation Action Plan

**Project:** Skybox Medellín Sports & Events Platform
**Current Readiness:** 25/100 🔴
**Target Readiness:** 90/100 ✅
**Timeline:** 8 weeks (2 months)
**Start Date:** 2025-10-24
**Target Completion:** 2025-12-19

---

## Quick Start: Immediate Actions (Next 48 Hours)

### 1. Fix Project References (2 hours) ✅ COMPLETED

**Status:** ✅ Done
**Updated Files:**
- `.claude/skills/supabase-migration/SKILL.md`

**Command to verify:**
```bash
grep -r "medellin-spark" /home/sk/skybox-gamehub/.claude/
# Should return no results
```

### 2. Review Improvement Report (1 hour)

**File:** `/home/sk/skybox-gamehub/supabase/SUPABASE_IMPROVEMENT_REPORT.md`

**Key Sections to Read:**
1. Executive Summary (Current Readiness Score)
2. Schema Gap Analysis
3. Production-Ready Schema Design (ERD)
4. Critical Issues Summary

### 3. Install Required Tools (30 minutes)

```bash
# Install Supabase CLI
npm install -g supabase

# Verify installation
supabase --version

# Login to Supabase
supabase login

# Link to project
cd /home/sk/skybox-gamehub
supabase link --project-ref dbocegamkdnsorhtdbni
```

---

## Phase 1: Foundation (Week 1-2) 🔴 CRITICAL

**Goal:** Establish core database schema and user authentication

### Week 1: Profiles & Authentication

#### Day 1-2: Profiles Schema
- [ ] Create `002_create_profiles_and_auth.sql` migration
- [ ] Implement profile auto-creation trigger
- [ ] Test profile creation on signup
- [ ] Enable RLS on profiles table

**Migration File:**
```sql
-- File: supabase/migrations/20251024000001_create_profiles_and_auth.sql

BEGIN;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  full_name TEXT,
  phone TEXT,
  preferred_language TEXT DEFAULT 'es',
  whatsapp_opt_in BOOLEAN DEFAULT false,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'staff', 'admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'customer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (deleted_at IS NULL);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

-- Indexes
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);

COMMIT;
```

**Test Script:**
```sql
-- Test profile creation
SELECT * FROM profiles WHERE user_id = auth.uid();

-- Verify RLS
SET ROLE authenticated;
SELECT * FROM profiles; -- Should only see user's own profile
```

#### Day 3-4: Events Schema
- [ ] Create `003_create_events_schema.sql` migration
- [ ] Create related tables (highlights, prizes, specials, faqs)
- [ ] Enable RLS policies
- [ ] Create indexes

**Tables to Create:**
1. `events` (main events table)
2. `event_categories`
3. `event_highlights`
4. `event_prizes`
5. `event_specials`
6. `event_faqs`

#### Day 5: Supabase Client Integration
- [ ] Install `@supabase/supabase-js`
- [ ] Configure client in `src/integrations/supabase/client.ts`
- [ ] Create TypeScript types from database
- [ ] Test basic queries

**Client Setup:**
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);
```

**Environment Variables:**
```env
# .env
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### Week 2: Events API & Frontend Integration

#### Day 6-7: Events API Layer
- [ ] Create `src/api/events.ts`
- [ ] Implement CRUD operations
- [ ] Add error handling
- [ ] Write unit tests

**API Functions:**
```typescript
// src/api/events.ts
export const eventsApi = {
  getAll: () => supabase.from('events').select('*'),
  getBySlug: (slug) => supabase.from('events').select('*').eq('slug', slug).single(),
  getFeatured: () => supabase.from('events').select('*').eq('is_featured', true),
  create: (event) => supabase.from('events').insert(event),
  update: (id, updates) => supabase.from('events').update(updates).eq('id', id),
  delete: (id) => supabase.from('events').update({ deleted_at: new Date() }).eq('id', id)
};
```

#### Day 8-9: Update Frontend Components
- [ ] Update `Home.tsx` to fetch events from database
- [ ] Update `Events.tsx` to use API
- [ ] Update `EventDetail.tsx` to fetch by slug
- [ ] Remove hardcoded `src/data/events.ts` file

**Before:**
```typescript
// src/pages/Home.tsx
import { events } from "@/data/events";

const Home = () => {
  const upcomingEvents = events.slice(0, 3);
  // ...
};
```

**After:**
```typescript
// src/pages/Home.tsx
import { useQuery } from '@tanstack/react-query';
import { eventsApi } from '@/api/events';

const Home = () => {
  const { data: upcomingEvents } = useQuery({
    queryKey: ['events', 'featured'],
    queryFn: eventsApi.getFeatured
  });
  // ...
};
```

#### Day 10: Data Migration
- [ ] Write script to convert `events.ts` → SQL inserts
- [ ] Create seed data file `supabase/seed_data/003_events.sql`
- [ ] Test seed data in local database
- [ ] Deploy to production

**Migration Script:**
```bash
# scripts/migrate-events.ts
import { events } from '../src/data/events';
import fs from 'fs';

const sql = events.map(event => `
INSERT INTO events (slug, title, subtitle, date, time, location, description, category, image_url, status)
VALUES (
  '${event.slug}',
  '${event.title}',
  ${event.subtitle ? `'${event.subtitle}'` : 'NULL'},
  '${event.date}',
  '${event.time}',
  '${event.location}',
  '${event.description}',
  '${event.category}',
  '${event.image}',
  'published'
);
`).join('\n');

fs.writeFileSync('supabase/seed_data/003_events.sql', sql);
```

---

## Phase 2: Core Features (Week 3-4) 🟡 HIGH PRIORITY

**Goal:** Enable reservations, menu management, and file storage

### Week 3: Reservations System

#### Day 11-12: Reservations Schema
- [ ] Create `004_create_reservations_schema.sql`
- [ ] Create `packages` table
- [ ] Create `tables` table (venue seating)
- [ ] Enable RLS policies

**Tables:**
```sql
CREATE TABLE packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  capacity INTEGER NOT NULL,
  includes JSONB,  -- Array of amenities
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id),
  event_id UUID REFERENCES events(id),
  package_id UUID REFERENCES packages(id),
  guest_count INTEGER NOT NULL,
  reservation_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  total_amount DECIMAL(10,2),
  payment_status TEXT DEFAULT 'unpaid',
  shopify_order_id TEXT,
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### Day 13-14: Reservations API & Form
- [ ] Create `src/api/reservations.ts`
- [ ] Build reservation form in `Reserve.tsx`
- [ ] Add form validation (Zod schema)
- [ ] Test booking flow end-to-end

**Form Component:**
```typescript
// src/pages/Reserve.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reservationSchema = z.object({
  eventId: z.string().uuid(),
  packageId: z.string().uuid(),
  guestCount: z.number().min(1).max(20),
  date: z.date(),
  specialRequests: z.string().optional()
});

const Reserve = () => {
  const form = useForm({
    resolver: zodResolver(reservationSchema)
  });

  const onSubmit = async (data) => {
    await reservationsApi.create(data);
    toast.success('Reservation confirmed!');
  };

  return <form onSubmit={form.handleSubmit(onSubmit)}>...</form>;
};
```

### Week 4: Menu & Storage

#### Day 15-16: Menu Schema
- [ ] Create `005_create_menu_schema.sql`
- [ ] Create `menu_categories` table
- [ ] Create `menu_items` table
- [ ] Seed initial menu data

**Menu Schema:**
```sql
CREATE TABLE menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES menu_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  base_price DECIMAL(8,2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  allergens TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### Day 17-18: Storage & Image Upload
- [ ] Create storage buckets (gallery-images, menu-images)
- [ ] Configure bucket policies
- [ ] Build image upload component
- [ ] Test image upload & retrieval

**Storage Buckets:**
```sql
-- Create buckets via Supabase Dashboard or SQL

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('gallery-images', 'gallery-images', true),
  ('menu-images', 'menu-images', true),
  ('event-banners', 'event-banners', true);
```

**Upload Component:**
```typescript
// src/components/ImageUpload.tsx
const handleUpload = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('menu-images')
    .upload(`${Date.now()}_${file.name}`, file);

  if (error) throw error;

  const url = supabase.storage
    .from('menu-images')
    .getPublicUrl(data.path).data.publicUrl;

  return url;
};
```

---

## Phase 3: Integrations (Week 5-6) 🟢 MEDIUM PRIORITY

**Goal:** WhatsApp automation, Shopify sync, Sports data migration

### Week 5: WhatsApp Integration

#### Day 19-20: WhatsApp Schema
- [ ] Create `006_create_whatsapp_schema.sql`
- [ ] Create `whatsapp_conversations` table
- [ ] Create `whatsapp_messages` table
- [ ] Enable RLS policies

#### Day 21-23: WhatsApp Webhook
- [ ] Create Edge Function `whatsapp-webhook`
- [ ] Configure WhatsApp Business API
- [ ] Test incoming message handling
- [ ] Implement auto-responses

**Edge Function:**
```typescript
// supabase/functions/whatsapp-webhook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const { message, from } = await req.json();

  // Store message
  await supabase.from('whatsapp_messages').insert({
    phone_number: from,
    content: message,
    direction: 'inbound'
  });

  // Auto-respond
  // ... trigger AI response

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

### Week 6: Shopify & Sports Data

#### Day 24-25: Shopify Integration
- [ ] Create `007_create_shopify_schema.sql`
- [ ] Create Edge Function `shopify-sync`
- [ ] Configure Shopify webhook
- [ ] Test order synchronization

#### Day 26-28: Sports Data Migration
- [ ] Enhance existing games schema (add UUIDs)
- [ ] Migrate `mlb_games_2025.ts` → SQL
- [ ] Migrate `nfl_games_2025.ts` → SQL
- [ ] Migrate `nhl_games_2026.ts` → SQL
- [ ] Update `SportsSchedule.tsx` to use database
- [ ] Remove hardcoded TS files

---

## Phase 4: Polish & Optimization (Week 7-8) 🟢 LOW PRIORITY

**Goal:** Admin dashboard, analytics, performance optimization

### Week 7: Admin Dashboard

#### Day 29-32: CMS Features
- [ ] Create admin route `/admin`
- [ ] Build event management UI
- [ ] Build menu management UI
- [ ] Build reservation management UI
- [ ] Add image upload functionality

**Admin Routes:**
```
/admin/
├── /events (list, create, edit)
├── /reservations (view, confirm, cancel)
├── /menu (categories, items, pricing)
├── /analytics (dashboard)
└── /settings
```

### Week 8: Analytics & Optimization

#### Day 33-35: Analytics
- [ ] Create `analytics_events` table
- [ ] Implement page view tracking
- [ ] Create analytics dashboard
- [ ] Set up automated reports

#### Day 36-40: Performance & Documentation
- [ ] Add database indexes
- [ ] Optimize slow queries
- [ ] Set up automated backups
- [ ] Write API documentation
- [ ] Create deployment guide
- [ ] Final QA testing

---

## Testing Checklist

### Functional Testing
- [ ] User can sign up and create profile
- [ ] User can browse events
- [ ] User can make reservation
- [ ] User receives confirmation (email/WhatsApp)
- [ ] Staff can manage events via admin panel
- [ ] Shopify orders sync correctly
- [ ] WhatsApp messages stored and responded to
- [ ] Images upload to Storage successfully
- [ ] Real-time subscriptions work

### Security Testing
- [ ] RLS policies prevent unauthorized access
- [ ] Users can only see their own reservations
- [ ] Staff role required for admin actions
- [ ] SQL injection attempts blocked
- [ ] File upload validates file types
- [ ] API rate limiting works

### Performance Testing
- [ ] Page load time < 2 seconds
- [ ] Database queries < 100ms
- [ ] Image loading optimized (lazy load, WebP)
- [ ] No N+1 query problems
- [ ] Real-time updates don't cause lag

---

## Deployment Checklist

### Pre-Deployment
- [ ] All migrations tested locally
- [ ] Seed data prepared
- [ ] Environment variables configured
- [ ] Backup strategy in place
- [ ] Rollback plan documented

### Deployment Steps
1. [ ] Apply migrations to production database
2. [ ] Seed initial data (events, menu items, packages)
3. [ ] Deploy frontend with Supabase integration
4. [ ] Deploy Edge Functions
5. [ ] Configure webhooks (WhatsApp, Shopify)
6. [ ] Test critical user flows
7. [ ] Monitor error logs for 24 hours

### Post-Deployment
- [ ] Verify all pages load
- [ ] Test reservation flow
- [ ] Send test WhatsApp message
- [ ] Place test Shopify order
- [ ] Check analytics tracking
- [ ] Monitor database performance
- [ ] Set up alerts for errors

---

## Success Metrics

### Technical Metrics
- **Readiness Score:** 25/100 → 90/100 ✅
- **Page Load Time:** <2 seconds
- **Database Query Time:** <100ms average
- **Uptime:** 99.9%
- **Error Rate:** <1%

### Business Metrics
- **Reservations:** Track conversion rate from visit → booking
- **WhatsApp Engagement:** Response time < 5 minutes
- **Admin Efficiency:** Event creation time reduced from 30min → 5min
- **Data Accuracy:** 100% sync with Shopify orders

---

## Risk Management

### High-Risk Items
| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Data loss during migration | Low | High | Full backups before each phase |
| RLS policy misconfiguration | Medium | High | Extensive testing, code review |
| WhatsApp API downtime | Low | Medium | Fallback to email notifications |
| Shopify webhook failures | Medium | Medium | Retry logic, manual sync option |

### Rollback Strategy
Each phase has a rollback plan:
1. **Phase 1:** Revert to hardcoded data, disable auth
2. **Phase 2:** Disable reservations, show "Coming Soon"
3. **Phase 3:** Disable integrations, manual processing
4. **Phase 4:** Disable admin panel, use direct DB access

---

## Team Responsibilities

### Backend Developer
- Database schema design
- Migration creation
- RLS policy implementation
- Edge Functions development
- API testing

### Frontend Developer
- Supabase client integration
- Component updates
- Form validation
- Real-time subscriptions
- Admin dashboard UI

### DevOps
- Supabase project configuration
- Environment variable management
- Backup automation
- Monitoring setup
- Deployment coordination

### QA Engineer
- Test plan creation
- Functional testing
- Security testing
- Performance testing
- User acceptance testing

---

## Budget Estimate

### Supabase Costs
- **Free Tier:** $0/month (Development)
- **Pro Tier:** $25/month (Production)
  - 8GB database
  - 100GB bandwidth
  - 50GB storage
  - Daily backups

### Additional Services
- **WhatsApp Business API:** ~$50/month
- **Shopify Plan:** $39/month (already exists)
- **Monitoring (Sentry):** $26/month
- **Total Monthly:** ~$140/month

---

## Next Immediate Steps (Today)

1. ✅ **Review this action plan** (30 minutes)
2. ✅ **Review improvement report** (1 hour)
3. **Install Supabase CLI** (30 minutes)
4. **Create first migration** (2 hours)
   - Start with profiles & auth
   - File: `002_create_profiles_and_auth.sql`
5. **Test migration locally** (1 hour)
6. **Apply to production** (30 minutes)

**Total Time Today:** ~5 hours

---

## Contact & Support

- **Supabase Documentation:** https://supabase.com/docs
- **Community Discord:** https://discord.supabase.com
- **Stack Overflow:** Tag [supabase]
- **GitHub Issues:** https://github.com/supabase/supabase/issues

---

**Plan Created:** 2025-10-23
**Last Updated:** 2025-10-23
**Version:** 1.0
**Status:** Active

---

*This action plan transforms Skybox GameHub from a static website into a production-ready, database-driven platform in 8 weeks.*

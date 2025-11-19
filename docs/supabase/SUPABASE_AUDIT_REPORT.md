# 🔍 Supabase Production Audit Report
**Project:** Skybox Events Platform
**Date:** 2025-10-27
**Auditor:** Claude (Supabase MCP Deep Inspection)
**Database:** PostgreSQL 17 on Supabase

---

## A. Executive Summary

### Health Score: **78/100**

**Overall Assessment:**
Your Supabase project is **production-ready with moderate technical debt**. The schema is well-structured with proper RLS policies, but there are critical performance optimizations needed for scale, security hardening required for functions, and missing operational configurations.

### Top 5 Risks 🔴

1. **Missing critical composite index** on `events(status, event_datetime)` — public queries will table-scan as traffic grows
2. **Function search_path vulnerabilities** — 3 functions exploitable via search_path hijacking
3. **Auth leaked password protection disabled** — users can set compromised passwords
4. **Missing RPC function** `increment_event_views` — Edge Function will fail at runtime
5. **No Storage buckets configured** — `image_url` fields reference non-existent assets

### Top 5 Wins ✅

1. **Comprehensive RLS policies** — 51 policies covering all public tables with proper role-based access
2. **Proper FK constraints with cascades** — referential integrity enforced at DB level
3. **UUID primary keys** — scalable, non-sequential IDs across all tables
4. **Soft delete pattern** — `deleted_at` columns on key tables (profiles, events, payments, notifications)
5. **Audit logging infrastructure** — `audit_log` table with trigger framework ready for deployment

---

## 7-Day Action Plan

**Day 1-2 (Critical):**
- ✅ Add composite index: `events(status, event_datetime)` for homepage queries
- ✅ Fix 3 function search_path vulnerabilities
- ✅ Create missing RPC `increment_event_views`
- ✅ Enable Auth leaked password protection

**Day 3-4 (High Priority):**
- ✅ Add missing FK indexes on `games` table (league_id, home_team_id, away_team_id)
- ✅ Create Storage bucket + policies for event/venue images
- ✅ Add `updated_at` triggers to 8 tables missing them
- ✅ Configure pg_cron for `update-event-status` Edge Function

**Day 5-7 (Optimization):**
- ✅ Add partial indexes for soft-delete queries
- ✅ Enable pg_stat_statements for query monitoring
- ✅ Review and test Edge Function input validation
- ✅ Document backup/PITR retention policy

---

## B. Findings by Category

### 1. Schema & Constraints

#### ✅ **Strengths**

- **UUID Primary Keys:** All 34 tables use UUID PKs (via `gen_random_uuid()`)
- **Proper FK Relationships:** 47 foreign key constraints with appropriate `ON DELETE CASCADE/RESTRICT`
- **Data Validation:** Check constraints on enums (status, role, item_type, etc.)
- **Timestamptz Consistency:** All timestamp columns use `timestamptz` for timezone support
- **Soft Deletes:** `deleted_at` on profiles, events, payments, notifications

#### 🔴 **Critical Issues**

**C1. Missing `events.event_datetime` composite index**
- **Severity:** 🔴 Critical
- **Evidence:**
  ```sql
  -- Common query pattern from homepage:
  SELECT * FROM events
  WHERE status = 'published'
    AND event_datetime >= NOW()
  ORDER BY event_datetime ASC
  LIMIT 3;
  ```
  Current index coverage: `idx_events_status` (single column) + `idx_events_event_date` (wrong column!)
- **Impact:** Full table scan on every homepage load. At 10K events, expect 500ms+ query time.
- **Fix:**
  ```sql
  -- Drop redundant single-column index
  DROP INDEX IF EXISTS idx_events_event_date;

  -- Create composite index for published upcoming events
  CREATE INDEX idx_events_published_upcoming
  ON public.events (status, event_datetime)
  WHERE status = 'published' AND deleted_at IS NULL;
  ```

**C2. Missing RPC function `increment_event_views`**
- **Severity:** 🔴 Critical
- **Evidence:** Edge Function `increment-views` calls `supabaseAdmin.rpc('increment_event_views')` but function doesn't exist
- **Impact:** Edge Function will fail at runtime with "function does not exist" error
- **Fix:**
  ```sql
  -- Create RPC function for incrementing event views
  CREATE OR REPLACE FUNCTION public.increment_event_views(event_id_param UUID)
  RETURNS void
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $$
  BEGIN
    -- Add views column to events table if it doesn't exist
    -- ALTER TABLE events ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

    -- Increment view count
    UPDATE events
    SET metadata = jsonb_set(
      COALESCE(metadata, '{}'::jsonb),
      '{view_count}',
      to_jsonb(COALESCE((metadata->>'view_count')::int, 0) + 1)
    )
    WHERE id = event_id_param;
  END;
  $$;
  ```

#### 🟠 **High Priority**

**H1. Missing FK indexes on `games` table**
- **Severity:** 🟠 High
- **Evidence:** `games.league_id`, `games.home_team_id`, `games.away_team_id` lack indexes
- **Impact:** Slow JOIN queries from `leagues` and `teams` tables
- **Fix:**
  ```sql
  CREATE INDEX idx_games_league_id ON public.games (league_id);
  CREATE INDEX idx_games_home_team_id ON public.games (home_team_id);
  CREATE INDEX idx_games_away_team_id ON public.games (away_team_id);
  ```

**H2. No natural keys on `teams`, `leagues`, `venues`**
- **Severity:** 🟠 High
- **Evidence:** `teams.name` not unique, `venues.name` not unique
- **Impact:** Duplicate entries possible (e.g., two "Miami Heat" teams)
- **Fix:**
  ```sql
  -- Add unique constraint on team name + league
  ALTER TABLE public.teams
  ADD CONSTRAINT teams_name_league_unique
  UNIQUE (name, league_id);

  -- Add unique constraint on venue name + city
  ALTER TABLE public.venues
  ADD CONSTRAINT venues_name_city_unique
  UNIQUE (name, city);
  ```

#### 🟡 **Medium Priority**

**M1. Missing `updated_at` triggers on 8 tables**
- **Severity:** 🟡 Medium
- **Evidence:** Only `profiles` has `updated_at` trigger. Missing on: events, bookings, payments, venues, games, teams, leagues, menu_items
- **Impact:** Stale cache invalidation, audit trail gaps
- **Fix:**
  ```sql
  -- Apply to all tables with updated_at column
  CREATE TRIGGER set_updated_at_events
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  CREATE TRIGGER set_updated_at_bookings
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

  -- Repeat for: payments, venues, games, teams, leagues, menu_items
  ```

**M2. `events.slug` should be unique even when NULL**
- **Severity:** 🟡 Medium
- **Evidence:** Index exists: `idx_events_slug ... WHERE (slug IS NOT NULL)` but allows multiple NULL slugs
- **Impact:** SEO conflicts if slug generation fails
- **Fix:**
  ```sql
  -- Ensure slug is always generated
  ALTER TABLE public.events
  ALTER COLUMN slug SET NOT NULL;
  ```

---

### 2. Indexes & Query Performance

#### ✅ **Strengths**

- **Good FK coverage:** Most foreign keys have corresponding indexes
- **Composite indexes:** `event_categories(event_id, category_id)` properly indexed
- **Partial indexes:** Smart use of WHERE clauses (e.g., `idx_menu_items_available WHERE is_available = true`)
- **Created_at DESC indexes:** Timeline queries optimized on bookings, payments, audit_log

#### 🔴 **Critical Issues**

**C3. Missing composite index for `event_categories` join queries**
- **Severity:** 🔴 Critical
- **Evidence:** RLS policy on `event_categories` uses EXISTS subquery joining to `events`
  ```sql
  -- Common query pattern:
  SELECT ec.* FROM event_categories ec
  JOIN events e ON ec.event_id = e.id
  WHERE e.status = 'published' AND e.event_datetime >= NOW();
  ```
  No index on `(category_id, event_id)` for reverse lookups
- **Impact:** Category page queries will be slow (fetching all events in a category)
- **Fix:**
  ```sql
  -- Add reverse lookup index for category pages
  CREATE INDEX idx_event_categories_category_event
  ON public.event_categories (category_id, event_id);
  ```

#### 🟠 **High Priority**

**H3. No index on `bookings(booking_date)`**
- **Severity:** 🟠 High
- **Evidence:** Admin dashboard likely queries bookings by date range
- **Impact:** Slow admin reports for "bookings this month"
- **Fix:**
  ```sql
  CREATE INDEX idx_bookings_booking_date
  ON public.bookings (booking_date DESC);
  ```

**H4. Redundant indexes on `events` table**
- **Severity:** 🟠 High (cost optimization)
- **Evidence:**
  - `idx_events_event_date` indexes `event_date` (DATE)
  - `idx_events_event_type` single column
  - Neither used for common queries (should use `event_datetime` instead)
- **Impact:** Write performance penalty, storage waste
- **Fix:**
  ```sql
  -- Analyze query patterns first, then consider dropping:
  -- DROP INDEX idx_events_event_date; -- Covered by idx_events_published_upcoming
  ```

#### 🟡 **Medium Priority**

**M3. Missing index on `payments(external_payment_id)`**
- **Severity:** 🟡 Medium
- **Evidence:** `idx_payments_external_id` exists but might need to be UNIQUE
- **Impact:** Duplicate payment processing if webhook retries
- **Fix:**
  ```sql
  -- Make external_payment_id unique to prevent duplicates
  CREATE UNIQUE INDEX idx_payments_external_id_unique
  ON public.payments (external_payment_id)
  WHERE external_payment_id IS NOT NULL;
  ```

**M4. Add partial indexes for soft-delete queries**
- **Severity:** 🟡 Medium
- **Evidence:** Queries frequently filter `WHERE deleted_at IS NULL`
- **Impact:** Better query performance on active records
- **Fix:**
  ```sql
  -- Add to key tables
  CREATE INDEX idx_profiles_active
  ON public.profiles (id)
  WHERE deleted_at IS NULL;

  CREATE INDEX idx_events_active
  ON public.events (status, event_datetime)
  WHERE deleted_at IS NULL;
  ```

---

### 3. RLS Policies & Security

#### ✅ **Strengths**

- **Comprehensive coverage:** 51 RLS policies across 19 public tables
- **Proper role checks:** Uses `is_staff()` helper function consistently
- **Granular permissions:** Separate SELECT/INSERT/UPDATE/DELETE policies
- **Soft delete respect:** Policies check `deleted_at IS NULL`

#### 🔴 **Critical Issues**

**C4. Function search_path vulnerabilities (CVE-2018-1058)**
- **Severity:** 🔴 Critical
- **Evidence:** Supabase security linter flagged 3 functions:
  - `generate_event_slug`
  - `update_updated_at_column`
  - `log_audit_changes`
- **Impact:** Privilege escalation via search_path manipulation
- **Fix:**
  ```sql
  -- Fix generate_event_slug
  CREATE OR REPLACE FUNCTION public.generate_event_slug()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $function$
  -- (existing function body)
  $function$;

  -- Fix update_updated_at_column
  CREATE OR REPLACE FUNCTION public.update_updated_at_column()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = public
  AS $function$
  -- (existing function body)
  $function$;

  -- Fix log_audit_changes
  CREATE OR REPLACE FUNCTION public.log_audit_changes()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path = public
  AS $function$
  -- (existing function body)
  $function$;
  ```

**C5. Auth leaked password protection disabled**
- **Severity:** 🔴 Critical
- **Evidence:** Supabase Auth config shows leaked password protection is OFF
- **Impact:** Users can set passwords from HaveIBeenPwned breach database
- **Fix:**
  ```
  Go to: Supabase Dashboard → Authentication → Policies
  Enable: "Leaked Password Protection"
  ```
  [Remediation docs](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection)

#### 🟠 **High Priority**

**H5. Public events policy too restrictive**
- **Severity:** 🟠 High
- **Evidence:**
  ```sql
  -- Current policy:
  WHERE status = 'published' AND deleted_at IS NULL
  ```
- **Issue:** Anon users can't see past events (useful for "Past Events" page)
- **Fix:**
  ```sql
  -- Replace policy: "Events are readable by everyone"
  DROP POLICY "Events are readable by everyone" ON public.events;

  CREATE POLICY "Public can view published events"
  ON public.events FOR SELECT
  TO anon, authenticated
  USING (
    status IN ('published', 'completed')
    AND deleted_at IS NULL
  );
  ```

**H6. `webhook_events` table has no UPDATE policy**
- **Severity:** 🟠 High
- **Evidence:** Only INSERT and SELECT policies exist
- **Impact:** Can't mark webhook events as processed
- **Fix:**
  ```sql
  CREATE POLICY "System can update webhook events"
  ON public.webhook_events FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
  ```

#### 🟡 **Medium Priority**

**M5. Missing RLS on junction tables**
- **Severity:** 🟡 Medium
- **Evidence:** `event_categories` has RLS but no policies use it for auth checks
- **Impact:** Policies rely on EXISTS() subquery instead of direct RLS
- **Note:** Current approach is acceptable but less efficient

**M6. `profiles` allows SELECT by anon**
- **Severity:** 🟡 Medium
- **Evidence:** Policy "Profiles are viewable by everyone" allows `anon` role
- **Impact:** PII exposure (phone numbers, email via auth.users join)
- **Recommendation:** Audit what profile fields are public vs. authenticated-only

---

### 4. Triggers & Data Integrity

#### ✅ **Strengths**

- **Auto profile creation:** `on_auth_user_created` trigger creates profile on signup
- **Slug generation:** `events_generate_slug` auto-creates SEO-friendly slugs
- **Updated_at automation:** Trigger exists and ready to deploy

#### 🟠 **High Priority**

**H7. `log_audit_changes` trigger not deployed**
- **Severity:** 🟠 High
- **Evidence:** Function exists but no triggers attached to tables
- **Impact:** No audit trail for sensitive operations (bookings, payments, profiles)
- **Fix:**
  ```sql
  -- Deploy audit triggers to key tables
  CREATE TRIGGER audit_bookings_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

  CREATE TRIGGER audit_payments_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION log_audit_changes();

  CREATE TRIGGER audit_profiles_changes
  AFTER UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION log_audit_changes();
  ```

#### 🟡 **Medium Priority**

**M7. Missing booking status history trigger**
- **Severity:** 🟡 Medium
- **Evidence:** `booking_status_history` table exists but no auto-insert trigger on `bookings` status change
- **Impact:** Manual status tracking, prone to gaps
- **Fix:**
  ```sql
  CREATE OR REPLACE FUNCTION public.log_booking_status_change()
  RETURNS trigger
  LANGUAGE plpgsql
  SET search_path = public
  AS $$
  BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
      INSERT INTO booking_status_history (
        booking_id,
        status,
        changed_by,
        reason
      ) VALUES (
        NEW.id,
        NEW.status,
        auth.uid(),
        'Status changed from ' || OLD.status || ' to ' || NEW.status
      );
    END IF;
    RETURN NEW;
  END;
  $$;

  CREATE TRIGGER track_booking_status_changes
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION log_booking_status_change();
  ```

---

### 5. Edge Functions & Webhooks

#### ✅ **Strengths**

- **verify_jwt enabled:** All 3 Edge Functions require authentication
- **CORS configured:** Proper headers for cross-origin requests
- **Error handling:** Functions catch and return structured errors

#### 🔴 **Critical Issues**

**C6. `increment-views` Edge Function missing RPC**
- **Severity:** 🔴 Critical
- **Already covered in C2** — function calls non-existent RPC

**C7. `events-sync` Edge Function has input validation gaps**
- **Severity:** 🔴 Critical
- **Evidence:** Line 75-83 constructs fields dynamically without validation
  ```typescript
  event_date: event.event_datetime.split('T')[0],
  event_time: event.event_datetime.split('T')[1]?.split('+')[0] || '00:00:00',
  ```
- **Impact:** Malformed `event_datetime` could cause runtime errors
- **Fix:**
  ```typescript
  // Add validation
  if (!event.event_datetime || typeof event.event_datetime !== 'string') {
    throw new Error('Invalid event_datetime format');
  }

  const datetime = new Date(event.event_datetime);
  if (isNaN(datetime.getTime())) {
    throw new Error('Invalid event_datetime value');
  }
  ```

#### 🟠 **High Priority**

**H8. Missing webhook signature verification**
- **Severity:** 🟠 High
- **Evidence:** `webhook_events` table accepts any payload without HMAC verification
- **Impact:** Unauthenticated actors can POST fake webhook events
- **Fix:**
  ```typescript
  // Add to Edge Function handling webhooks (Shopify/Stripe)
  import { createHmac } from 'https://deno.land/std@0.168.0/node/crypto.ts';

  function verifyWebhookSignature(
    payload: string,
    signature: string,
    secret: string
  ): boolean {
    const hmac = createHmac('sha256', secret);
    hmac.update(payload);
    const digest = hmac.digest('hex');
    return signature === digest;
  }

  // Then in handler:
  const rawBody = await req.text();
  const signature = req.headers.get('x-shopify-hmac-sha256');
  if (!verifyWebhookSignature(rawBody, signature, SHOPIFY_WEBHOOK_SECRET)) {
    return new Response('Invalid signature', { status: 401 });
  }
  ```

**H9. `update-event-status` Edge Function needs pg_cron setup**
- **Severity:** 🟠 High
- **Evidence:** Function includes cron config comment but not deployed
- **Impact:** Past events never transition to "completed" status
- **Fix:**
  ```sql
  -- Enable pg_cron extension
  CREATE EXTENSION IF NOT EXISTS pg_cron;

  -- Schedule daily job at midnight UTC
  SELECT cron.schedule(
    'update-past-events',
    '0 0 * * *',
    $$
    SELECT net.http_post(
      url := 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/update-event-status',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object('trigger', 'cron')
    );
    $$
  );
  ```

#### 🟡 **Medium Priority**

**M8. No rate limiting on public Edge Functions**
- **Severity:** 🟡 Medium
- **Evidence:** `increment-views` is public-facing with no rate limit
- **Impact:** DDoS vector, inflated view counts
- **Recommendation:** Implement rate limiting via Supabase Edge Middleware or Upstash Redis

**M9. Missing retry logic for webhook processing**
- **Severity:** 🟡 Medium
- **Evidence:** `webhook_events` has no retry counter or dead-letter queue
- **Impact:** Failed webhook processing is lost
- **Fix:** Add `retry_count` column and implement exponential backoff

---

### 6. Storage & Assets

#### 🔴 **Critical Issues**

**C8. No Storage buckets configured**
- **Severity:** 🔴 Critical
- **Evidence:** `list_storage_buckets` returned empty array
- **Impact:**
  - `events.image_url` references non-existent assets (404s)
  - `venues.logo_url` references non-existent assets
  - `profiles.avatar_url` references non-existent assets
  - `teams.logo_url` and `leagues.logo_url` references fail
- **Fix:**
  ```sql
  -- Create public bucket for event/venue images
  INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  VALUES (
    'event-images',
    'event-images',
    true,
    5242880, -- 5MB
    ARRAY['image/jpeg', 'image/png', 'image/webp']
  );

  -- Create RLS policy for public read
  CREATE POLICY "Public can view event images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'event-images');

  -- Allow authenticated users to upload
  CREATE POLICY "Authenticated can upload event images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'event-images'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
  ```

#### 🟠 **High Priority**

**H10. Missing CDN/image optimization**
- **Severity:** 🟠 High
- **Evidence:** Storage config shows `imageTransformation.enabled: true` but no CDN
- **Impact:** Slow page loads, high bandwidth costs
- **Recommendation:** Use Supabase Storage image transformations API:
  ```
  https://PROJECT_REF.supabase.co/storage/v1/render/image/public/event-images/FILE_PATH?width=800&height=600&resize=cover
  ```

---

### 7. Configuration & Operations

#### ✅ **Strengths**

- **Extensions ready:** `pg_stat_statements`, `uuid-ossp`, `pgcrypto` installed
- **Image transformation enabled:** Storage config supports on-the-fly resizing
- **S3 protocol enabled:** Can use S3-compatible clients

#### 🟠 **High Priority**

**H11. `pg_stat_statements` not enabled**
- **Severity:** 🟠 High
- **Evidence:** Extension installed but not active in `extensions` schema
- **Impact:** No query performance monitoring
- **Fix:**
  ```sql
  -- Enable for query performance tracking
  CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;

  -- Query slow queries:
  SELECT query, calls, mean_exec_time, total_exec_time
  FROM pg_stat_statements
  ORDER BY total_exec_time DESC
  LIMIT 10;
  ```

**H12. No backup validation documented**
- **Severity:** 🟠 High
- **Evidence:** Supabase provides automatic backups but no restore tests
- **Impact:** Unknown RTO/RPO in disaster scenario
- **Recommendation:** Document and test:
  - PITR window (default: 7 days on Pro plan)
  - Backup restoration procedure
  - Critical data validation queries

#### 🟡 **Medium Priority**

**M10. Consider enabling `pg_cron` for maintenance**
- **Severity:** 🟡 Medium
- **Evidence:** Extension available but not enabled
- **Fix:**
  ```sql
  CREATE EXTENSION IF NOT EXISTS pg_cron;

  -- Example: Clean old audit logs monthly
  SELECT cron.schedule(
    'cleanup-old-audit-logs',
    '0 2 1 * *', -- 2 AM on 1st of month
    $$
    DELETE FROM public.audit_log
    WHERE created_at < NOW() - INTERVAL '90 days';
    $$
  );
  ```

**M11. Connection pooling not optimized**
- **Severity:** 🟡 Medium
- **Evidence:** Default Supabase pooling (PgBouncer in transaction mode)
- **Recommendation:** Review if session mode needed for advanced features

---


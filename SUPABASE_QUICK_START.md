# Supabase Quick Start - Skybox GameHub

**Project**: dbocegamkdnsorhtdbni
**5-Minute Setup Guide**

---

## ✅ What's Already Working

- REST API connection
- Anon key and service role key configured
- Environment variables set up
- Migration files created
- Seed data prepared

---

## 🔧 What You Need (2 Things)

### 1. Database Password (Required for psql, postgres.js, CLI)

**Get it here**: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/settings/database

1. Scroll to "Database Password"
2. Click "Reset database password"
3. Copy the password
4. Update `.env.local`:
   ```bash
   DB_PASSWORD=YOUR_NEW_PASSWORD
   ```

### 2. CLI Access Token (Required for Supabase CLI)

**Get it here**: https://supabase.com/dashboard/account/tokens

1. Click "Generate New Token"
2. Name: "Skybox CLI"
3. **Scopes**: Select "Read and Write access to all resources"
4. Copy token
5. Login:
   ```bash
   supabase logout
   supabase login --token sbp_YOUR_TOKEN_HERE
   supabase link --project-ref dbocegamkdnsorhtdbni
   ```

---

## 🚀 Test All Connections (5 Minutes)

### Test 1: REST API (Already Working! ✅)

```bash
cd /home/sk/skybox-gamehub
source .env.local

curl -s "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/profiles?select=count" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"
```

**Expected**: `[{"count":0}]` or data

---

### Test 2: psql Connection (After Step 1)

```bash
# Replace YOUR_PASSWORD with actual password from Step 1
PGPASSWORD='YOUR_PASSWORD' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT 'psql works!' AS status;"
```

**Expected**:
```
   status
-----------
 psql works!
```

---

### Test 3: Supabase CLI (After Step 2)

```bash
cd /home/sk/skybox-gamehub

# Check if linked
supabase status

# Pull remote schema
supabase db pull

# List migrations
supabase migration list
```

**Expected**: Shows project info and migrations

---

### Test 4: Node.js postgres.js (After Step 1)

```bash
# Install postgres.js
npm install postgres

# Set password
export DB_PASSWORD='YOUR_PASSWORD'

# Run test
node supabase/tests/test-postgresjs.mjs
```

**Expected**: "All tests passed!"

---

### Test 5: Local Development (Optional - Requires Docker)

```bash
# Start local Supabase
supabase start

# Gives you local URLs:
# API: http://127.0.0.1:54321
# DB: postgresql://postgres:postgres@127.0.0.1:54322/postgres
# Studio: http://127.0.0.1:54323
```

---

## 📊 Apply Migrations & Seed Data

### Option A: Via Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/editor
2. Click "SQL Editor"
3. Copy and run: `supabase/migrations/20251024000002_create_events_schema.sql`
4. Then run each seed file:
   - `supabase/seed_data/001_event_categories.sql`
   - `supabase/seed_data/002_venues.sql`
   - `supabase/seed_data/003_events.sql`
   - `supabase/seed_data/004_event_highlights.sql`
   - `supabase/seed_data/005_event_prizes.sql`
   - `supabase/seed_data/006_event_specials.sql`

### Option B: Via CLI (After linking)

```bash
cd /home/sk/skybox-gamehub

# Apply migrations
supabase db push

# Apply seed data (via psql)
source .env.local
for file in supabase/seed_data/*.sql; do
  PGPASSWORD="$DB_PASSWORD" psql \
    -h aws-1-us-east-1.pooler.supabase.com \
    -p 6543 \
    -d postgres \
    -U postgres.dbocegamkdnsorhtdbni \
    -f "$file"
done
```

---

## ✅ Verify Everything Works

```bash
source .env.local

# Test 1: Check event categories created
curl -s "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/event_categories?select=name" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"

# Should return: Baseball, Football, Soccer, UFC, Special Event

# Test 2: Check events created
curl -s "https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/events?select=title&limit=3" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}"

# Should return: World Series 2025, Halloween Party, etc.
```

---

## 🎉 Success!

You now have:
- ✅ Database connected
- ✅ REST API working
- ✅ CLI linked
- ✅ Migrations applied
- ✅ Data seeded

---

## 📚 Full Documentation

- **Complete Guide**: `supabase/docs/CONNECTION_METHODS_GUIDE.md`
- **Test Results**: `supabase/CONNECTION_TEST_RESULTS.md`
- **ERD Diagram**: `supabase/docs/ERD_DIAGRAM.md`
- **Migration Guide**: `supabase/docs/MIGRATION_GUIDE.md`

---

## 🆘 Need Help?

**Issue: CLI access denied**
- Solution: Generate new access token with "all resources" scope

**Issue: Password authentication failed**
- Solution: Reset password in dashboard, wait 2 minutes

**Issue: Table not found**
- Solution: Apply migrations via SQL Editor

**Stuck?** Check: `supabase/CONNECTION_TEST_RESULTS.md` for detailed troubleshooting

---

**Last Updated**: 2025-10-24
**Ready to Deploy**: After completing Steps 1 & 2 above

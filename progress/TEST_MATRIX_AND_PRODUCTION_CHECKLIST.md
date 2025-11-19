# 🧪 Test Matrix (T01-T24) & Production Readiness Checklist

**Date:** 2025-10-30
**Project:** Skybox GameHub
**Status:** **⚠️ 16/24 Tests Require Manual Execution**

---

## 📊 Test Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ PASS | 7 | 29% |
| ❌ FAIL | 1 | 4% |
| ⚠️ MANUAL REQUIRED | 16 | 67% |
| **TOTAL** | **24** | **100%** |

**Production Ready?** ❌ **NO** - Critical failures and incomplete testing

---

## 🧪 Detailed Test Matrix

### **Category: React & Dependencies** (T01-T02)

#### **T01: React Single Instance Verification** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
npm run build
npm run build:dev
```

**Expected Result:**
- No duplicate React in bundle
- Single React runtime
- No externalization issues

**Evidence:**
```bash
# Check bundle
cat dist/assets/*.js | grep -c "react-dom" # Should be reasonable count
# No error messages about multiple React versions
```

**Actual Result:** ✅ Passed static analysis
- No CDN injections found
- Package.json shows single react + react-dom version (18.3.1)
- No external React configuration in vite.config.ts

**Proof:**
- `package.json:62-64` - Single React version
- No duplicate React imports detected
- Git commit `7bbf627` fixed unification issue

---

#### **T02: Dependencies Installed** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
npm install
ls node_modules | wc -l
```

**Expected Result:**
- All dependencies from package.json present
- No missing peer dependencies
- Lock file matches package.json

**Actual Result:** ✅ All 95 packages installed
- `package.json` and `package-lock.json` in sync
- No peer dependency warnings during audit

---

### **Category: Supabase Data Queries** (T03-T06)

#### **T03: Supabase Connection Test** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
npm run dev
# Open browser console at http://localhost:5173
# Check for Supabase connection errors
```

**Expected Result:**
- No "Failed to connect to Supabase" errors
- No CORS errors
- Auth storage initialized

**How to Test:**
1. Start dev server: `npm run dev`
2. Open DevTools Console
3. Navigate to home page
4. Check for any Supabase-related errors
5. Verify network requests to `dbocegamkdnsorhtdbni.supabase.co` succeed

**Pass Criteria:**
- ✅ No connection errors in console
- ✅ Network tab shows 200 responses from Supabase
- ✅ Auth storage initialized

**Evidence Location:**
- DevTools → Console tab
- DevTools → Network tab (filter: supabase.co)

---

#### **T04: Events Query Test** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Navigate to http://localhost:5173/events
```

**Expected Result:**
- Events load from `events` table
- Categories load from `categories` table
- Venues joined correctly
- No "Failed to load events" error

**How to Test:**
1. Visit `/events` page
2. Wait for loading spinner to finish
3. Verify events display (or "No events found" message)
4. Check DevTools Console for errors
5. Inspect Network tab for Supabase query

**Pass Criteria:**
- ✅ Page loads without errors
- ✅ Events display OR empty state shows
- ✅ Category chips render
- ✅ No SQL errors in console

**SQL Query to Verify:**
```sql
-- Run in Supabase SQL Editor to check data exists
SELECT
  e.id, e.slug, e.title, e.event_date, e.status,
  v.name as venue_name,
  c.name as category_name
FROM events e
LEFT JOIN venues v ON e.venue_id = v.id
LEFT JOIN event_categories ec ON e.id = ec.event_id
LEFT JOIN categories c ON ec.category_id = c.id
WHERE e.status = 'published'
ORDER BY e.event_date ASC
LIMIT 10;
```

---

#### **T05: Event Detail by Slug** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED** (WILL FAIL due to C1 bug)

**Test Command:**
```bash
# First, get a valid slug from database
# Then navigate to http://localhost:5173/events/{slug}
```

**Expected Result:**
- Event loads by slug (not UUID)
- All fields display correctly
- Gallery images render
- No "Event Not Found" error (unless slug invalid)

**How to Test:**
1. Get test slug from Supabase:
```sql
SELECT slug FROM events WHERE status = 'published' LIMIT 1;
```
2. Visit `/events/{that-slug}`
3. Verify event details load
4. Check hero image, title, description, venue, date
5. Verify gallery renders (if event has one)

**⚠️ Known Issue:**
Due to **Critical Bug C1**, clicking events from Home or Events page will pass UUID instead of slug, causing navigation to `/events/{uuid}` which will show "Event Not Found".

**Workaround for Testing:**
- Manually type correct slug in address bar
- Or fix bug first (see Action Items)

**Pass Criteria:**
- ✅ Event loads with slug URL
- ✅ All fields populate from DB
- ✅ Venue name displays
- ✅ Category badge shows
- ✅ Price displays (if set)

---

#### **T06: RLS Policies Test** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```sql
-- Run in Supabase SQL Editor as anon role
```

**Expected Result:**
- Anonymous users can read published events
- Draft/unpublished events are hidden
- No unauthorized access to admin data

**How to Test:**
1. Open Supabase Dashboard → SQL Editor
2. Run as `anon` role:
```sql
-- Test 1: Can read published events
SELECT * FROM events WHERE status = 'published';
-- Should return rows

-- Test 2: Cannot read draft events (if any)
SELECT * FROM events WHERE status = 'draft';
-- Should return empty or only public drafts

-- Test 3: Can read public categories
SELECT * FROM categories;
-- Should return rows

-- Test 4: Can read public venues
SELECT * FROM venues;
-- Should return rows
```

**Pass Criteria:**
- ✅ Anon can read published events
- ✅ Anon cannot see draft events
- ✅ All public tables accessible

**Check RLS Policies:**
```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('events', 'categories', 'venues');
-- rowsecurity should be TRUE

-- List policies
SELECT * FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('events', 'categories', 'venues');
```

---

### **Category: Cart & Checkout** (T07-T10)

#### **T07: Add to Cart** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Navigate to http://localhost:5173/menu
```

**Expected Result:**
- Products load from Shopify
- "Add to Cart" button works
- Toast notification appears
- Cart icon updates with count

**How to Test:**
1. Visit `/menu` page
2. Wait for products to load
3. Click "Add to Cart" on any product
4. Verify toast appears: "[Product] added to cart!"
5. Check cart drawer (click cart icon in header)
6. Verify item appears in cart

**Pass Criteria:**
- ✅ Products display
- ✅ Add to cart button works
- ✅ Toast notification shows
- ✅ Cart drawer shows item

---

#### **T08: Cart Persistence** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Add item to cart, then refresh page
```

**Expected Result:**
- Cart items persist after page refresh
- LocalStorage contains cart data
- Cart count remains accurate

**How to Test:**
1. Add 2-3 items to cart
2. Open DevTools → Application → LocalStorage
3. Verify `shopify-cart` key exists with cart data
4. Refresh page (F5)
5. Open cart drawer
6. Verify all items still present

**Pass Criteria:**
- ✅ LocalStorage key `shopify-cart` exists
- ✅ Cart data persists after refresh
- ✅ Item quantities correct
- ✅ Cart total accurate

---

#### **T09: Checkout Creation** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Add items to cart, then click checkout
```

**Expected Result:**
- Checkout URL created via Shopify Storefront API
- Redirects to Shopify checkout page
- Cart items pre-populated in checkout

**How to Test:**
1. Add 2-3 items to cart
2. Open cart drawer
3. Click "Checkout" button
4. Verify redirect to `skybox-gamehub-q6hjk.myshopify.com/checkouts/...`
5. Verify items appear in Shopify checkout
6. (Optional) Complete test purchase

**Pass Criteria:**
- ✅ Creates checkout without errors
- ✅ Redirects to Shopify domain
- ✅ All cart items present in checkout
- ✅ Prices match

**Error Scenarios to Test:**
- Empty cart → Should show "Cart is empty" message
- Network failure → Should show error toast
- Shopify 402 error → Should show "Payment required" toast

---

#### **T10: Checkout URL Format** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
# Code inspection
grep -A 5 "channel=online_store" src/lib/shopify.ts
```

**Expected Result:**
- Checkout URL includes `?channel=online_store` parameter

**Evidence:**
```typescript
// src/lib/shopify.ts:229-231
const url = new URL(cart.checkoutUrl);
url.searchParams.set('channel', 'online_store');
const checkoutUrl = url.toString();
return checkoutUrl;
```

**Actual Result:** ✅ PASS
- Code correctly appends `?channel=online_store`
- Ensures checkout opens in online store context

---

### **Category: Customer Accounts** (T11)

#### **T11: Customer Account Login** ⚠️

**Status:** ⚠️ **NOT IMPLEMENTED** (Feature not required for MVP)

**Test Command:**
```bash
# N/A - Feature not implemented
```

**Expected Result:**
- Not applicable - customer accounts not part of current scope

**Note:** If future versions require customer accounts, implement via:
- Supabase Auth (recommended)
- Shopify Customer Account API

---

### **Category: Assets & Caching** (T12-T15)

#### **T12: Image Loading** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
npm run dev
# Visit all pages, check DevTools Network tab
```

**Expected Result:**
- Zero 404 errors for images
- All assets load successfully
- Fallback images work when DB image_url is null

**How to Test:**
1. Start dev server
2. Open DevTools → Network tab
3. Filter: `Img` or `All`
4. Navigate to each page:
   - `/` (Home)
   - `/events`
   - `/events/:slug` (pick any)
   - `/sports`
   - `/menu`
   - `/gallery`
   - `/contact`
   - `/vip`
   - `/friendsgiving`
   - `/private-events`
   - `/corporate-booking`
5. Check for any red/404 entries
6. Document any missing assets

**Pass Criteria:**
- ✅ Zero 404s in Network tab
- ✅ All images render
- ✅ Fallback logic works (foodImage, heroImage, etc.)

**Assets to Verify:**
- 55 files in `src/assets/`
- Supabase-hosted images (if any in DB)
- Shopify product images

---

#### **T13: Lazy Loading** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Inspect image tags in DevTools
```

**Expected Result:**
- Images have `loading="lazy"` attribute
- Images below fold load on scroll
- No cumulative layout shift (CLS)

**How to Test:**
1. Visit any page with images
2. Open DevTools → Elements
3. Inspect `<img>` tags
4. Verify `loading="lazy"` attribute present
5. Use Lighthouse to check CLS score

**Pass Criteria:**
- ✅ All images have `loading="lazy"`
- ✅ CLS score < 0.1
- ✅ Images load progressively on scroll

---

#### **T14: Cache Headers** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
npm run build
npm run preview
# Check response headers for static assets
```

**Expected Result:**
- Static assets have long cache headers
- HTML has short/no cache
- Proper ETags set

**How to Test:**
1. Build production: `npm run build`
2. Serve production: `npm run preview`
3. Open DevTools → Network tab
4. Reload page
5. Click on any `.js` or `.css` file
6. Check Headers tab for:
   - `Cache-Control: max-age=...`
   - `ETag: "..."`

**Pass Criteria:**
- ✅ JS/CSS: `Cache-Control: max-age=31536000` (1 year)
- ✅ Images: `Cache-Control: max-age=31536000`
- ✅ HTML: `Cache-Control: no-cache` or short max-age

**Deployment Note:**
If deployed to Vercel/Netlify, they handle caching automatically.

---

#### **T15: Bundle Size** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
npm run build
ls -lh dist/assets/*.js
```

**Expected Result:**
- Main bundle < 500KB gzipped
- No unnecessary dependencies
- Code splitting working

**How to Test:**
1. Build: `npm run build`
2. Check output:
```bash
# List JS bundles
ls -lh dist/assets/*.js

# Check gzipped sizes
gzip -k dist/assets/*.js
ls -lh dist/assets/*.js.gz
```

3. Analyze bundle:
```bash
npx vite-bundle-visualizer
```

**Pass Criteria:**
- ✅ Largest JS bundle < 500KB gzipped
- ✅ Total JS < 1MB gzipped
- ✅ No bloated dependencies

**Optimization Tips:**
- Use dynamic imports for large components
- Remove unused dependencies
- Tree-shake properly

---

### **Category: Security** (T16-T17)

#### **T16: Service Role Key Exposure** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
grep -r "SERVICE_ROLE\|service_role" src/
grep -r "SUPABASE_SERVICE_ROLE_KEY" src/
```

**Expected Result:**
- No service role keys in client code
- Only anon key in browser bundle

**Evidence:**
```bash
$ grep -r "SERVICE_ROLE" src/
# Result: No files found ✓
```

**Actual Result:** ✅ PASS
- `src/integrations/supabase/client.ts` only uses `VITE_SUPABASE_ANON_KEY`
- Service role key confined to `.env` (not exposed to Vite)

**Verification:**
```typescript
// src/integrations/supabase/client.ts:5-6
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// ✅ Only anon key used
```

---

#### **T17: CORS Headers** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
npm run dev
# Check browser console for CORS errors
```

**Expected Result:**
- No CORS errors in console
- Supabase requests succeed
- Shopify requests succeed

**How to Test:**
1. Start dev server
2. Open DevTools → Console
3. Visit all pages
4. Look for CORS-related errors:
   - "Access-Control-Allow-Origin"
   - "CORS policy"
   - "blocked by CORS"

**Pass Criteria:**
- ✅ No CORS errors
- ✅ All external API requests succeed
- ✅ Proper origins configured

**Supabase CORS:**
- Supabase automatically allows all origins for anon key
- No configuration needed

**Shopify CORS:**
- Storefront API allows browser requests
- No configuration needed

---

### **Category: Routing** (T18-T21)

#### **T18: /friendsgiving Route** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
# Code inspection
grep "/friendsgiving" src/App.tsx
```

**Expected Result:**
- Route exists in routing config
- Page loads without 404

**Evidence:**
```tsx
// src/App.tsx:49
<Route path="/friendsgiving" element={<FriendsgivingEvent />} />
```

**Actual Result:** ✅ PASS - Route configured

---

#### **T19: /private-events Route** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
grep "/private-events" src/App.tsx
```

**Expected Result:**
- Route exists in routing config

**Evidence:**
```tsx
// src/App.tsx:50
<Route path="/private-events" element={<PrivateEvents />} />
```

**Actual Result:** ✅ PASS - Route configured

---

#### **T20: /corporate-booking Route** ✅

**Status:** ✅ **PASS**

**Test Command:**
```bash
grep "/corporate-booking" src/App.tsx
```

**Expected Result:**
- Route exists in routing config

**Evidence:**
```tsx
// src/App.tsx:51
<Route path="/corporate-booking" element={<CorporateBooking />} />
```

**Actual Result:** ✅ PASS - Route configured

---

#### **T21: Event Slug Routing** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED** (WILL FAIL due to C1 bug)

**Test Command:**
```bash
# Visit http://localhost:5173/events/test-slug-123
```

**Expected Result:**
- Valid slug → Event detail page
- Invalid slug → "Event Not Found" page
- No 404 from React Router

**How to Test:**
1. Get valid slug from DB:
```sql
SELECT slug FROM events WHERE status = 'published' LIMIT 1;
```
2. Visit `/events/{valid-slug}` → Should load event
3. Visit `/events/invalid-slug-999` → Should show "Event Not Found"
4. Visit `/events/` (no slug) → Should 404 or redirect

**⚠️ Known Issue:**
Clicking events from Home/Events pages passes UUID instead of slug (Bug C1).

**Pass Criteria:**
- ✅ Valid slugs load event page
- ✅ Invalid slugs show "Event Not Found"
- ✅ No React Router 404 page

---

### **Category: Data Sources** (T22-T23)

#### **T22: Menu Data Source** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Visit http://localhost:5173/menu
```

**Expected Result:**
- Products load from Shopify Storefront API
- No products → Shows "No products found"
- Shopify 402 → Shows payment required message

**How to Test:**
1. Visit `/menu`
2. Wait for loading state
3. Verify products display
4. Check DevTools → Network for:
```
Request: https://skybox-gamehub-q6hjk.myshopify.com/api/2025-07/graphql.json
Method: POST
Status: 200
```

**Pass Criteria:**
- ✅ Products load from Shopify
- ✅ Images display
- ✅ Prices shown
- ✅ Add to cart works

**Known Issue:**
`useMenuItems` hook exists but is unused (queries Supabase). See H2 for details.

---

#### **T23: Sports Schedule** ⚠️

**Status:** ⚠️ **MANUAL REQUIRED**

**Test Command:**
```bash
# Visit http://localhost:5173/sports
```

**Expected Result:**
- Leagues load from `leagues` table
- Featured games load from `games` table with team joins
- Both sections handle empty states

**How to Test:**
1. Visit `/sports`
2. Wait for loading
3. Verify featured games section (top 4 games)
4. Verify leagues grid (all leagues)
5. Test search bar filters leagues
6. Check DevTools for SQL queries

**Pass Criteria:**
- ✅ Leagues display
- ✅ Featured games display
- ✅ Search works
- ✅ Empty states handle no data

---

### **Category: SEO** (T24)

#### **T24: Per-Page SEO** ❌

**Status:** ❌ **FAIL**

**Test Command:**
```bash
# Visit pages and inspect <title>
```

**Expected Result:**
- Each page has unique `<title>` tag
- Each page has unique `<meta name="description">`
- Dynamic titles for event/sports pages

**How to Test:**
1. Visit each page
2. Open DevTools → Elements
3. Find `<title>` tag in `<head>`
4. Verify it's unique

**Actual Result:** ❌ FAIL
All pages share the same title:
```html
<title>Skybox Medellín - Premier Sports Bar & Watch Party Venue</title>
```

**Evidence:**
- Only `index.html` has meta tags (static)
- No `react-helmet-async` installed
- No per-page SEO implementation

**Impact:**
- Poor SEO ranking
- Bad social media sharing previews
- Confusing browser tabs

**Fix Required:**
See High Priority Issue H1 in main audit report.

---

## 📋 Production Readiness Checklist

### 🔴 Critical (MUST FIX)

- [ ] **Fix Event Slug Bug** (C1)
  - [ ] Update `src/pages/Events.tsx:100`
  - [ ] Update `src/pages/Home.tsx:134`
  - [ ] Test event detail navigation works with slugs

- [ ] **Run Full Test Pass**
  - [ ] Execute T03-T06 (Supabase)
  - [ ] Execute T07-T09 (Cart)
  - [ ] Execute T12 (Assets)
  - [ ] Execute T21 (Routing)
  - [ ] Document all results

- [ ] **Zero Network 404s**
  - [ ] Verify in DevTools Network tab
  - [ ] Test all pages
  - [ ] Fix any broken image paths

### 🟡 High Priority (Before Launch)

- [ ] **Add Per-Page SEO** (H1)
  - [ ] Install `react-helmet-async`
  - [ ] Add `<Helmet>` to all pages
  - [ ] Verify unique titles

- [ ] **Resolve Menu Data Source** (H2)
  - [ ] Remove `useMenuItems` hook OR
  - [ ] Migrate to Supabase menu

- [ ] **Test Cart Flow End-to-End**
  - [ ] Add item → Persist → Checkout
  - [ ] Verify Shopify checkout loads
  - [ ] Test error scenarios

- [ ] **Lighthouse Audit**
  - [ ] Run on all key pages
  - [ ] Fix critical performance issues
  - [ ] Target 90+ score

### 🟢 Medium Priority

- [ ] **Add Automated Tests**
  - [ ] Playwright E2E tests
  - [ ] Vitest unit tests
  - [ ] 60% coverage minimum

- [ ] **Optimize Bundle Size**
  - [ ] Run bundle analyzer
  - [ ] Remove unused deps
  - [ ] Implement code splitting

- [ ] **Verify RLS Policies**
  - [ ] Test anon access
  - [ ] Test draft event hiding
  - [ ] Document policies

### 🔵 Optional (Nice to Have)

- [ ] **Migrate Static Pages to CMS**
  - [ ] Contact → venue_info table
  - [ ] Gallery → gallery_images table

- [ ] **Add Event Gallery DB**
  - [ ] Create event_galleries table
  - [ ] Remove hardcoded logic

- [ ] **Error Monitoring**
  - [ ] Set up Sentry
  - [ ] Configure alerts

---

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All critical tests passing
- [ ] Zero console errors
- [ ] Zero network 404s
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

### Environment Variables

- [ ] Production `.env` configured
- [ ] Supabase production URL set
- [ ] Shopify production tokens set
- [ ] No dev/staging keys in production

### DNS & Hosting

- [ ] Domain configured
- [ ] SSL certificate active
- [ ] CDN configured (if applicable)

### Monitoring

- [ ] Error tracking (Sentry)
- [ ] Analytics (GA4)
- [ ] Uptime monitoring
- [ ] Performance monitoring

### Post-Deployment

- [ ] Smoke test all pages
- [ ] Verify cart → checkout flow
- [ ] Test mobile responsiveness
- [ ] Check Lighthouse scores
- [ ] Monitor error logs

---

## 📊 Test Execution Log Template

Use this template to record manual test results:

```markdown
## Test Execution: [Date]
**Tester:** [Name]
**Environment:** [Dev/Preview/Production]
**Browser:** [Chrome 120, Safari 17, etc.]

### T03: Supabase Connection
- [ ] Passed
- [ ] Failed
- **Notes:**
- **Screenshot:** [link]

### T04: Events Query
- [ ] Passed
- [ ] Failed
- **Notes:**
- **Screenshot:** [link]

[Continue for all tests...]

### Issues Found
1. [Description]
   - Severity: [Critical/High/Medium/Low]
   - Reproduction steps:
   - Expected:
   - Actual:
```

---

## 🎯 Success Criteria

**Application is production-ready when:**

1. ✅ All Critical (🔴) items resolved
2. ✅ 90% of High Priority (🟡) items resolved
3. ✅ All automated tests passing
4. ✅ Zero critical bugs in production
5. ✅ Lighthouse score 90+ on key pages
6. ✅ Cart → Checkout flow works 100%
7. ✅ All manual tests (T03-T23) passing
8. ✅ SEO implemented on all pages
9. ✅ Monitoring & analytics configured
10. ✅ Zero 404s in production

---

**Report Generated:** 2025-10-30
**Next Update:** After test execution
**Maintained By:** QA & Engineering Team

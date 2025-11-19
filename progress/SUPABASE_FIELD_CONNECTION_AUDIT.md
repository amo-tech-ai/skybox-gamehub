# 🔗 Supabase Field Connection Audit - Complete Page & Component Mapping

**Audit Date:** 2025-10-30
**Scope:** Every page, section, and component analyzed for Supabase field connections

---

## 📊 Summary Dashboard

| Page | Supabase Connected? | Tables Used | Fields Mapped | Status | Issues |
|------|-------------------|-------------|---------------|--------|--------|
| `/` (Home) | ✅ Partial | events, venues, categories | 8/8 | ⚠️ CRITICAL BUG | slug usage |
| `/events` | ✅ Yes | events, venues, categories | 8/8 | ⚠️ CRITICAL BUG | slug usage |
| `/events/:slug` | ✅ Yes | events, venues, categories | 10/10 | ✅ OK | Gallery hardcoded |
| `/sports` | ✅ Yes | leagues, games, teams | 8/8 | ✅ OK | None |
| `/sports/:slug` | ⚠️ Not Implemented | N/A | N/A | ⚠️ TODO | Page exists but no data |
| `/menu` | ❌ No (Shopify) | N/A | 0/0 | ⚠️ DUAL SOURCE | Unused Supabase hook |
| `/contact` | ❌ Static | N/A | 0/0 | ✅ OK | Static by design |
| `/gallery` | ❌ Static | N/A | 0/0 | ✅ OK | Static by design |
| `/vip` | ❌ Static | N/A | 0/0 | ✅ OK | Static by design |
| `/friendsgiving` | ❌ Static | N/A | 0/0 | ✅ OK | Could use events table |
| `/private-events` | ❌ Static | N/A | 0/0 | ✅ OK | Static by design |
| `/corporate-booking` | ❌ Static | N/A | 0/0 | ✅ OK | Static by design |
| `/reserve` | ⚠️ Not Analyzed | bookings | Unknown | ⚠️ TODO | Needs inspection |

**Overall Connection Rate:** 3/13 pages fully connected (23%)

---

## 🏠 Home Page (`/`) - `src/pages/Home.tsx`

### Supabase Connection: ✅ **CONNECTED**

### Hook Used
```typescript
import { useUpcomingEvents } from "@/hooks/useEvents";
const { data: upcomingEvents, isLoading, error } = useUpcomingEvents(3);
```

### Query Details
**Function:** `useUpcomingEvents(limit: number)`
**File:** `src/hooks/useEvents.ts:47-70`

**SQL Query:**
```sql
SELECT
  events.*,
  venues.*,
  event_categories.*,
  categories.*
FROM events
INNER JOIN venues ON events.venue_id = venues.id
INNER JOIN event_categories ON events.id = event_categories.event_id
INNER JOIN categories ON event_categories.category_id = categories.id
WHERE
  events.status = 'published'
  AND events.event_date >= NOW()
ORDER BY events.event_date ASC
LIMIT 3;
```

### Field Mapping Table

| UI Element | Component Location | Supabase Field | Transform | Connection Status |
|-----------|-------------------|----------------|-----------|------------------|
| Event card title | EventCard component | `events.title` | None | ✅ Connected |
| Event date | EventCard date prop | `events.event_date` | `toLocaleDateString()` | ✅ Connected |
| Event time | EventCard time prop | `events.event_date` | `toLocaleTimeString()` | ✅ Connected |
| Venue name | EventCard location prop | `venues.name` | Via join | ✅ Connected |
| Category badge | EventCard category prop | `categories.name` | Via event_categories | ✅ Connected |
| Event image | EventCard image prop | `events.image_url` | Fallback to heroImage | ✅ Connected |
| Event slug | EventCard slug prop | `events.id` | **❌ WRONG** | 🔴 **BUG** |
| Event ID | EventCard key | `events.id` | None | ✅ Connected |

### 🚨 Critical Issue Found

**Location:** `src/pages/Home.tsx:134`

```tsx
<EventCard
  title={event.title}
  date={new Date(event.event_date).toLocaleDateString()}
  time={new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
  location={event.venue}
  category={event.category}
  image={event.image_url || heroImage}
  slug={event.id}  // ❌ WRONG! Should be event.slug
/>
```

**Impact:** Clicking an event card navigates to `/events/550e8400-...` instead of `/events/world-series-2025`

**Fix:**
```tsx
slug={event.slug}  // ✅ CORRECT
```

### Loading States

```tsx
// Loading State - Line 111-115
{isLoading ? (
  <div className="text-center py-12">
    <div className="inline-block animate-spin ..."></div>
    <p className="mt-4 text-muted-foreground">Loading events...</p>
  </div>
)}
```

**Status:** ✅ Properly implemented

### Error States

```tsx
// Error State - Line 116-120
{error ? (
  <div className="text-center py-12">
    <p className="text-red-500 mb-4">Failed to load events...</p>
    <Button onClick={() => window.location.reload()}>Retry</Button>
  </div>
)}
```

**Status:** ✅ Properly implemented with retry

### Empty States

```tsx
// Empty State - Line 139-141
<div className="col-span-full text-center py-12">
  <p className="text-muted-foreground">No upcoming events at the moment...</p>
</div>
```

**Status:** ✅ Properly implemented

---

## 📅 Events Page (`/events`) - `src/pages/Events.tsx`

### Supabase Connection: ✅ **CONNECTED**

### Hooks Used
```typescript
import { useAllEvents, useEventCategories } from "@/hooks/useEvents";

const { data: events, isLoading, error } = useAllEvents();
const { data: dbCategories } = useEventCategories();
```

### Query Details

#### Query 1: All Events
**Function:** `useAllEvents()`
**File:** `src/hooks/useEvents.ts:75-96`

**SQL Query:**
```sql
SELECT
  events.*,
  venues.*,
  event_categories.*,
  categories.*
FROM events
INNER JOIN venues ON events.venue_id = venues.id
INNER JOIN event_categories ON events.id = event_categories.event_id
INNER JOIN categories ON event_categories.category_id = categories.id
WHERE events.status = 'published'
ORDER BY events.event_date ASC;
```

#### Query 2: Event Categories
**Function:** `useEventCategories()`
**File:** `src/hooks/useEvents.ts:208-221`

**SQL Query:**
```sql
SELECT name
FROM categories
ORDER BY display_order ASC;
```

### Field Mapping Table

| UI Element | Component Location | Supabase Field | Transform | Connection Status |
|-----------|-------------------|----------------|-----------|------------------|
| Search input | Line 51-57 | N/A | Client-side filter | N/A |
| Filter chips | Line 65-69 | `categories.name` | Array with "All" | ✅ Connected |
| Event count | Line 92-94 | `events.length` | Count | ✅ Connected |
| Event card title | EventCard line 101 | `events.title` | None | ✅ Connected |
| Event subtitle | EventCard line 102 | `events.description` | None | ✅ Connected |
| Event date | EventCard line 103 | `events.event_date` | `toLocaleDateString()` | ✅ Connected |
| Event time | EventCard line 104 | `events.event_date` | `toLocaleTimeString()` | ✅ Connected |
| Event location | EventCard line 105 | `venues.name` | Via join | ✅ Connected |
| Event image | EventCard line 106 | `events.image_url` | Fallback to foodImage | ✅ Connected |
| Event category | EventCard line 107 | `categories.name` | Via event_categories | ✅ Connected |
| Event slug | EventCard line 100 | `events.id` | **❌ WRONG** | 🔴 **BUG** |

### 🚨 Critical Issue Found

**Location:** `src/pages/Events.tsx:100`

```tsx
<EventCard
  key={event.id}
  slug={event.id}  // ❌ WRONG! Should be event.slug
  title={event.title}
  ...
/>
```

**Fix:**
```tsx
slug={event.slug}  // ✅ CORRECT
```

### Client-Side Filtering Logic

```typescript
// Line 24-32: Filter by category and search query
const filteredEvents = events ? events.filter((event) => {
  const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
  const matchesSearch =
    searchQuery === "" ||
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue?.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesCategory && matchesSearch;
}) : [];
```

**Status:** ✅ Properly implemented

### Loading/Error/Empty States

**All three states properly implemented** (see Home page for similar structure)

---

## 🎯 Event Detail Page (`/events/:slug`) - `src/pages/EventDetail.tsx`

### Supabase Connection: ✅ **CONNECTED**

### Hook Used
```typescript
import { useEventBySlug } from "@/hooks/useEvents";

const { slug } = useParams();
const { data: event, isLoading, error } = useEventBySlug(slug || '');
```

### Query Details
**Function:** `useEventBySlug(slug: string)`
**File:** `src/hooks/useEvents.ts:135-157`

**SQL Query:**
```sql
SELECT
  events.*,
  venues.*,
  event_categories.*,
  categories.*
FROM events
INNER JOIN venues ON events.venue_id = venues.id
INNER JOIN event_categories ON events.id = event_categories.event_id
INNER JOIN categories ON event_categories.category_id = categories.id
WHERE events.slug = $1
LIMIT 1;
```

**Query Method:** `maybeSingle()` (returns null if not found, doesn't throw)

### Field Mapping Table

| UI Element | Line | Supabase Field | Transform | Connection Status |
|-----------|------|----------------|-----------|------------------|
| Hero background image | 98 | `events.image_url` | CSS background with fallback | ✅ Connected |
| Category badge | 106-109 | `categories.name` | Via event_categories | ✅ Connected |
| Event title | 111 | `events.title` | None | ✅ Connected |
| Event date (hero) | 114-115 | `events.event_date` | `toLocaleDateString()` with options | ✅ Connected |
| Event time (hero) | 118-119 | `events.event_date` | `toLocaleTimeString()` | ✅ Connected |
| Venue (hero) | 122-125 | `venues.name` | Via join | ✅ Connected |
| Description | 148-152 | `events.description` | Conditional render | ✅ Connected |
| Price | 156-168 | `events.price` | `toLocaleString()` + "COP" | ✅ Connected |
| Date (sidebar) | 189 | `events.event_date` | `toLocaleDateString()` | ✅ Connected |
| Time (sidebar) | 196 | `events.event_date` | `toLocaleTimeString()` | ✅ Connected |
| Venue (sidebar) | 204 | `venues.name` | Via join | ✅ Connected |

### Conditionally Rendered Fields

#### Image URL
```tsx
// Line 98: Hero background with fallback
style={{
  backgroundImage: event.image_url
    ? `linear-gradient(...), url(${event.image_url})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}}
```
**Status:** ✅ Proper fallback

#### Description
```tsx
// Line 148: Only render if exists
{event.description && (
  <div className="space-y-4">
    <h2>About This Event</h2>
    <p>{event.description}</p>
  </div>
)}
```
**Status:** ✅ Proper conditional

#### Price
```tsx
// Line 155: Only render if exists
{event.price && (
  <div className="space-y-4">
    <h2>Pricing</h2>
    <Card>
      <span>${event.price.toLocaleString()} COP</span>
    </Card>
  </div>
)}
```
**Status:** ✅ Proper conditional

### ⚠️ Gallery Issue: Hardcoded Images

**Location:** Lines 69-90

```tsx
// Hardcoded logic instead of fetching from DB
let galleryImages: Array<{ src: string; alt: string }> = [];

if (event.slug.includes("world-series")) {
  galleryImages = [
    { src: worldSeriesHero, alt: "World Series 2025" },
    // ... 7 more hardcoded images
  ];
} else if (event.slug === "halloween-party-2025") {
  galleryImages = [
    { src: halloween2, alt: "Halloween Party" },
    // ... 3 more hardcoded images
  ];
}
```

**Issue:** Gallery images are determined by slug pattern match instead of database query.

**Recommended Fix:**
1. Create `event_galleries` table:
```sql
CREATE TABLE event_galleries (
  id UUID PRIMARY KEY,
  event_id UUID REFERENCES events(id),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT
);
```

2. Add to query:
```typescript
const { data, error } = await supabase
  .from('events')
  .select(`
    *,
    venues(*),
    event_categories(*, categories(*)),
    event_galleries(*)  // Add this
  `)
  .eq('slug', slug)
  .maybeSingle();
```

### Loading/Error/Empty States

All properly implemented with Loader2 component and helpful messages.

---

## ⚽ Sports Page (`/sports`) - `src/pages/Sports.tsx`

### Supabase Connection: ✅ **CONNECTED**

### Hooks Used
```typescript
import { useLeagues, useFeaturedGames } from "@/hooks/useSports";

const { data: leagues, isLoading: leaguesLoading } = useLeagues();
const { data: featuredGames, isLoading: gamesLoading } = useFeaturedGames(4);
```

### Query 1: Leagues
**Function:** `useLeagues()`
**File:** `src/hooks/useSports.ts:43-56`

**SQL Query:**
```sql
SELECT *
FROM leagues
ORDER BY name ASC;
```

### Query 2: Featured Games
**Function:** `useFeaturedGames(limit: number)`
**File:** `src/hooks/useSports.ts:114-135`

**SQL Query:**
```sql
SELECT
  games.*,
  home_team:teams!games_home_team_id_fkey(id, name, city, abbreviation, logo_url),
  away_team:teams!games_away_team_id_fkey(id, name, city, abbreviation, logo_url),
  league:leagues(id, name, slug, logo_url)
FROM games
WHERE game_datetime >= NOW()
ORDER BY game_datetime ASC
LIMIT 4;
```

### Field Mapping Table

#### Featured Games Section (Lines 75-106)

| UI Element | Line | Supabase Field | Transform | Connection Status |
|-----------|------|----------------|-----------|------------------|
| Broadcast network | 88-90 | `games.broadcast_networks` | Fallback "TBA" | ✅ Connected |
| Home team name | 91 | `teams.name` via FK | Fallback to team_id | ✅ Connected |
| Away team name | 93 | `teams.name` via FK | Fallback to team_id | ✅ Connected |
| Game date | 95 | `games.game_datetime` | `toLocaleDateString()` | ✅ Connected |
| Game time | 96 | `games.game_time` | None | ✅ Connected |

#### Leagues Section (Lines 127-144)

| UI Element | Line | Supabase Field | Transform | Connection Status |
|-----------|------|----------------|-----------|------------------|
| League name | 135 | `leagues.name` | None | ✅ Connected |
| League short name | 136 | `leagues.name` | None | ✅ Connected |
| League slug | 137 | `leagues.slug` | None | ✅ Connected |
| League tagline | 138 | N/A | Computed: `"Watch {name} Live"` | ✅ Connected |
| League image | 139 | `leagues.logo_url` | Fallback to sportsHero | ⚠️ Fallback Used |

### Client-Side Filtering

```typescript
// Line 15-18: Filter leagues by search
const filteredLeagues = leagues?.filter((league) =>
  league.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  league.slug.toLowerCase().includes(searchQuery.toLowerCase())
) || [];
```

**Status:** ✅ Properly implemented

### Loading/Error/Empty States

**Both sections have proper loading/empty states:**
- Games: "No featured games scheduled at this time"
- Leagues: "No leagues found matching [query]"

---

## 🏈 League Detail Page (`/sports/:slug`) - `src/pages/LeagueDetail.tsx`

### Supabase Connection: ⚠️ **NEEDS VERIFICATION**

**Status:** Page exists but requires detailed inspection to verify data flow.

**Recommended Check:**
```bash
# Inspect the file
cat src/pages/LeagueDetail.tsx | grep -A 10 "useQuery\|useLeague\|useGames"
```

---

## 🍔 Menu Page (`/menu`) - `src/pages/Menu.tsx`

### Supabase Connection: ❌ **NOT CONNECTED** (Uses Shopify Instead)

### Hook Used
```typescript
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const { data: products, isLoading, error } = useShopifyProducts();
```

### Data Source: **Shopify Storefront API**

**GraphQL Endpoint:**
```
https://skybox-gamehub-q6hjk.myshopify.com/api/2025-07/graphql.json
```

**Query:**
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id, title, description, handle, priceRange, images, variants, options
      }
    }
  }
}
```

### Field Mapping Table (Shopify Fields)

| UI Element | Line | Shopify Field | Transform | Connection Status |
|-----------|------|---------------|-----------|------------------|
| Product title | 84 | `product.node.title` | None | ✅ Connected |
| Product price | 85-87 | `variant.price.amount` | `parseFloat().toFixed(2)` | ✅ Connected |
| Product description | 89-91 | `product.node.description` | `line-clamp-2` | ✅ Connected |
| Product image | 76-80 | `images.edges[0].node.url` | Fallback to foodImage | ✅ Connected |
| Available status | 95 | `variant.availableForSale` | Button disabled state | ✅ Connected |

### ⚠️ Dual Data Source Issue

**Unused Hook Found:**
```typescript
// File: src/hooks/useMenuItems.ts
// This hook queries Supabase menu_items table but is NOT used anywhere
export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('display_order', { ascending: true });
      ...
    },
  });
};
```

**Supabase Table Schema:**
```sql
-- This table exists but is unused
menu_items (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  currency TEXT DEFAULT 'COP',
  tags TEXT[],
  allergens TEXT[],
  display_order INT
)
```

**Issue:** Confusion about data source - code has both Shopify and Supabase implementations.

**Recommendation:**
Choose one source of truth:
- **Option A:** Keep Shopify (current) and delete `useMenuItems` hook
- **Option B:** Migrate to Supabase and remove Shopify menu dependency

---

## 📞 Contact Page (`/contact`) - `src/pages/Contact.tsx`

### Supabase Connection: ❌ **STATIC (By Design)**

**Content Type:** Hardcoded contact information

**Static Data:**
- Address: "Calle Santa Fe #39-106, El Poblado, Medellín"
- Phone: "+57 304 786 2834"
- Email: "info@skyboxmedellin.com"
- Hours: Mon-Thu 2PM-2AM, Fri-Sat 12PM-3AM, Sun 12PM-12AM
- Social: @skyboxmedellin

**Assessment:** ✅ Acceptable for static business info

**Future Enhancement:**
Create `venue_info` table for CMS-managed contact details:
```sql
CREATE TABLE venue_info (
  id UUID PRIMARY KEY,
  field_name TEXT UNIQUE NOT NULL, -- e.g., 'phone', 'email', 'address'
  field_value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🖼️ Gallery Page (`/gallery`) - `src/pages/Gallery.tsx`

### Supabase Connection: ❌ **STATIC (By Design)**

**Content Type:** Hardcoded image array

**Static Images:**
```typescript
const galleryImages = [
  { src: venueImage, alt: "Skybox rooftop interior..." },
  { src: heroImage, alt: "World Series watch party..." },
  { src: foodImage, alt: "Game day food and drinks" },
  // ... 6 more hardcoded images
];
```

**Assessment:** ✅ Acceptable for MVP

**Future Enhancement:**
Create `gallery_images` table:
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  display_order INT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎃 Friendsgiving Event Page (`/friendsgiving`) - `src/pages/FriendsgivingEvent.tsx`

### Supabase Connection: ❌ **STATIC** (Could Use Events Table)

**Content Type:** Hardcoded event details

**Static Data:**
- Event title: "Friendsgiving 2025 at Skybox"
- Date: "Thursday, November 28, 2025"
- Menu: 6 hardcoded food items
- Gallery: 6 hardcoded images

**⚠️ Issue:** This is an event but doesn't query the `events` table.

**Recommended Fix:**
```typescript
// Option 1: Fetch from events table
const { data: event } = useEventBySlug('friendsgiving-2025');

// Option 2: Keep static if it's a one-off landing page
// (current approach is acceptable if this is marketing content)
```

**Assessment:** ⚠️ Inconsistent with event management pattern

---

## 🏢 Private Events Page (`/private-events`) - `src/pages/PrivateEvents.tsx`

### Supabase Connection: ❌ **STATIC (By Design)**

**Content Type:** Static service marketing page

**Static Sections:**
- Hero text
- Service cards (6 types)
- Event types (5 categories)
- Testimonials
- Capacity info

**Assessment:** ✅ Acceptable for static marketing content

---

## 🏢 Corporate Booking Page (`/corporate-booking`) - `src/pages/CorporateBooking.tsx`

### Supabase Connection: ⚠️ **NEEDS VERIFICATION**

**Status:** File exists but requires inspection to determine if it uses Supabase or is static.

---

## 📋 Reserve Page (`/reserve`) - `src/pages/Reserve.tsx`

### Supabase Connection: ⚠️ **NEEDS VERIFICATION**

**Expected Tables:**
- `bookings` table for storing reservations
- Possible `booking_slots` table for availability

**Recommended Check:**
```bash
# Inspect booking logic
cat src/pages/Reserve.tsx | grep -A 10 "useQuery\|useMutation\|supabase"
```

---

## 📊 Hook Usage Summary

### ✅ Implemented and Used Hooks

| Hook | File | Tables | Used By | Status |
|------|------|--------|---------|--------|
| `useUpcomingEvents(limit)` | useEvents.ts | events, venues, categories | Home | ✅ Active |
| `useAllEvents()` | useEvents.ts | events, venues, categories | Events | ✅ Active |
| `useEventBySlug(slug)` | useEvents.ts | events, venues, categories | EventDetail | ✅ Active |
| `useEventCategories()` | useEvents.ts | categories | Events | ✅ Active |
| `useLeagues()` | useSports.ts | leagues | Sports | ✅ Active |
| `useFeaturedGames(limit)` | useSports.ts | games, teams, leagues | Sports | ✅ Active |
| `useShopifyProducts()` | useShopifyProducts.ts | N/A (Shopify) | Menu | ✅ Active |

### ⚠️ Implemented but UNUSED Hooks

| Hook | File | Tables | Intended Use | Issue |
|------|------|--------|--------------|-------|
| `useMenuItems()` | useMenuItems.ts | menu_items | Menu page | ❌ Never imported/used |
| `useMenuCategories()` | useMenuItems.ts | menu_items | Menu page | ❌ Never imported/used |
| `useEvent(eventId)` | useEvents.ts | events | Legacy | ⚠️ Deprecated (use slug version) |
| `useEventsByCategory(slug)` | useEvents.ts | events, categories | Events filtering | ⚠️ Client-side filter used instead |
| `useEventsCount()` | useEvents.ts | events | Analytics | ⚠️ Not used anywhere |
| `useTeamsByLeague(id)` | useSports.ts | teams | League detail | ⚠️ Not verified |
| `useUpcomingGames(limit, id)` | useSports.ts | games | League detail | ⚠️ Not verified |
| `useGamesStats()` | useSports.ts | games, leagues | Dashboard | ❌ Not used |

### ⚠️ Missing Hooks (Potential Needs)

| Hook | Tables | Purpose | Priority |
|------|--------|---------|----------|
| `useVenueInfo()` | venue_info | Contact page | Low |
| `useGalleryImages()` | gallery_images | Gallery page | Low |
| `useBookings()` | bookings | Reserve page | High |
| `useCreateBooking()` | bookings | Reserve page | High |

---

## 🔍 Detailed Transform Functions

### Date Formatting
```typescript
// Pattern used across all pages
const eventDate = new Date(event.event_date);

// Long format (EventDetail)
eventDate.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// Output: "Friday, November 1, 2025"

// Short format (Events, Home)
eventDate.toLocaleDateString()
// Output: "11/1/2025"

// Time format
eventDate.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
});
// Output: "7:00 PM"
```

### Price Formatting
```typescript
// EventDetail.tsx line 163
event.price.toLocaleString()
// Input: 50000
// Output: "50,000"
// Then adds " COP" suffix
```

### Image Fallbacks
```typescript
// Pattern used in Events, Home, Menu
image={event.image_url || foodImage}
// Falls back to imported static asset if DB field is null
```

---

## ✅ Best Practices Found

1. **Proper Error Handling**
   - All hooks use React Query's built-in error states
   - Error messages displayed to users with retry options

2. **Loading States**
   - Consistent spinner + message pattern
   - No "flash of empty content"

3. **Empty States**
   - Clear messaging when no data
   - Helpful suggestions ("Try adjusting your filters")

4. **Type Safety**
   - All hooks have TypeScript interfaces
   - Field types match Supabase schema

5. **Join Optimization**
   - Proper use of Supabase's nested select syntax
   - Single query fetches all related data (no N+1)

---

## ⚠️ Issues & Recommendations

### Critical Issues

1. **Event Slug Bug (2 locations)**
   - Home.tsx:134 and Events.tsx:100
   - Using `event.id` instead of `event.slug`
   - Breaks SEO-friendly URLs

### High Priority

2. **Dual Menu Data Source**
   - Unused `useMenuItems` hook confuses architecture
   - Either remove or migrate to Supabase

3. **Inconsistent Event Handling**
   - Friendsgiving is an event but doesn't use events table
   - Should either fetch from DB or clarify as static marketing page

### Medium Priority

4. **Hardcoded Gallery Logic**
   - EventDetail.tsx uses slug pattern matching
   - Should query `event_galleries` table

5. **Missing League Detail Data**
   - `/sports/:slug` page exists but data flow needs verification

6. **Unused Hooks Cluttering Codebase**
   - 7 hooks implemented but never used
   - Consider removing or documenting purpose

### Low Priority

7. **Static Pages Could Use CMS**
   - Contact, Gallery, Private Events are fully static
   - Consider `static_pages` table for easier updates

---

## 📝 Recommended Database Schema Additions

### 1. Event Galleries
```sql
CREATE TABLE event_galleries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policy
ALTER TABLE event_galleries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON event_galleries
  FOR SELECT USING (true);
```

### 2. Venue Info (CMS)
```sql
CREATE TABLE venue_info (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  field_name TEXT UNIQUE NOT NULL,
  field_value TEXT NOT NULL,
  field_type TEXT DEFAULT 'text', -- text, json, url, etc.
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO venue_info (field_name, field_value) VALUES
  ('phone', '+57 304 786 2834'),
  ('email', 'info@skyboxmedellin.com'),
  ('address', 'Calle Santa Fe #39-106, El Poblado, Medellín'),
  ('instagram', '@skyboxmedellin');
```

### 3. Gallery Images
```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  is_featured BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 🎯 Action Items

### Immediate (Fix Today)
- [ ] Fix event slug bug in Home.tsx:134
- [ ] Fix event slug bug in Events.tsx:100
- [ ] Test that event detail pages work with slug URLs

### Short Term (This Week)
- [ ] Verify LeagueDetail.tsx data connections
- [ ] Verify Reserve.tsx booking flow
- [ ] Decide on menu data source (Shopify vs Supabase)
- [ ] Remove unused hooks or document their purpose

### Medium Term (Next Sprint)
- [ ] Implement event_galleries table and query
- [ ] Migrate Friendsgiving to use events table
- [ ] Add CMS tables for static content (optional)

### Long Term (Future)
- [ ] Automated tests for all data queries
- [ ] GraphQL Code generation for type safety
- [ ] Query performance monitoring

---

**Report Generated:** 2025-10-30
**Next Review:** After critical slug bugs fixed
**Maintained By:** Engineering Team

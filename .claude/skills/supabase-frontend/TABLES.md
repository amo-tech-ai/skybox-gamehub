# Database Tables Reference

Complete schema for Skybox Gamehub Supabase tables.

## Events Table

**Table name:** `events`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| event_id | uuid | No | Primary key |
| event_date | date | No | Date of event |
| event_time | time | No | Start time (stored in ET) |
| description | text | Yes | Event description/teams |
| status | text | No | 'draft', 'published', 'cancelled' |
| venue_id | uuid | Yes | Foreign key to venues table |
| capacity | integer | Yes | Max attendees |
| current_bookings | integer | Yes | Current booking count |
| created_at | timestamptz | No | Auto-generated |
| updated_at | timestamptz | No | Auto-updated |

**Common queries:**
- Filter: `status = 'published'`
- Order: `event_date ASC, event_time ASC`
- Join: `venue:venues(venue_name, location)`

**RLS Policy Required:**
```sql
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');
```

---

## Venues Table

**Table name:** `venues`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| venue_id | uuid | No | Primary key |
| venue_name | text | No | Venue name |
| location | text | Yes | Address/city |
| capacity | integer | Yes | Max capacity |
| created_at | timestamptz | No | Auto-generated |

**Common queries:**
- Used via join from events table
- Select all for dropdown lists

**RLS Policy Required:**
```sql
CREATE POLICY "Public can view venues"
ON venues FOR SELECT
USING (true);
```

---

## Bookings Table

**Table name:** `bookings`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| booking_id | uuid | No | Primary key |
| event_id | uuid | No | Foreign key to events |
| profile_id | uuid | Yes | Foreign key to profiles |
| customer_name | text | No | Guest name |
| customer_email | text | No | Contact email |
| customer_phone | text | Yes | Contact phone |
| party_size | integer | No | Number of guests |
| special_requests | text | Yes | Additional notes |
| status | text | No | 'pending', 'confirmed', 'cancelled' |
| created_at | timestamptz | No | Auto-generated |

**Common queries:**
- Filter by event: `event_id = '{uuid}'`
- Filter by customer: `customer_email = 'email@example.com'`
- Order: `created_at DESC`

**RLS Policies:**
```sql
-- Authenticated users can view their own bookings
CREATE POLICY "Users can view own bookings"
ON bookings FOR SELECT
USING (auth.uid() = profile_id OR profile_id IS NULL);

-- Anyone can create bookings
CREATE POLICY "Anyone can create bookings"
ON bookings FOR INSERT
WITH CHECK (true);
```

---

## Menu Items Table

**Table name:** `menu_items`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| item_id | uuid | No | Primary key |
| name | text | No | Item name |
| description | text | Yes | Item description |
| category | text | No | 'appetizer', 'entree', 'drink', 'dessert' |
| price | numeric(10,2) | No | Price in USD/COP |
| image_url | text | Yes | Cloudinary URL |
| available | boolean | No | In stock flag |
| created_at | timestamptz | No | Auto-generated |

**Common queries:**
- Filter: `available = true`
- Order: `category ASC, name ASC`
- Group by: `category`

**RLS Policy:**
```sql
CREATE POLICY "Public can view available menu items"
ON menu_items FOR SELECT
USING (available = true);
```

---

## Profiles Table

**Table name:** `profiles`

| Column | Type | Nullable | Description |
|--------|------|----------|-------------|
| profile_id | uuid | No | Primary key (matches auth.users.id) |
| email | text | No | User email |
| full_name | text | Yes | Display name |
| phone | text | Yes | Contact number |
| role | text | No | 'customer', 'staff', 'manager', 'admin' |
| created_at | timestamptz | No | Auto-generated |
| updated_at | timestamptz | No | Auto-updated |

**Common queries:**
- Get current user: `profile_id = auth.uid()`
- Filter by role: `role = 'customer'`

**RLS Policies:**
```sql
-- Users can view own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = profile_id);

-- Users can update own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = profile_id);
```

---

## Foreign Key Relationships

```
events.venue_id → venues.venue_id
bookings.event_id → events.event_id
bookings.profile_id → profiles.profile_id
```

**Verify FK names before querying:**
```sql
SELECT
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name IN ('events', 'bookings');
```

---

## Database Indexes

**Recommended indexes for performance:**

```sql
-- Events queries
CREATE INDEX IF NOT EXISTS idx_events_status_date
ON events(status, event_date)
WHERE status = 'published';

-- Bookings queries
CREATE INDEX IF NOT EXISTS idx_bookings_event_id
ON bookings(event_id);

CREATE INDEX IF NOT EXISTS idx_bookings_email
ON bookings(customer_email);

-- Menu items queries
CREATE INDEX IF NOT EXISTS idx_menu_items_category
ON menu_items(category)
WHERE available = true;
```

---

## TypeScript Types

Generate types from database schema:

```bash
npx supabase gen types typescript --project-id {your-project-id} > src/types/database.types.ts
```

**Usage in components:**

```typescript
import { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type Booking = Database['public']['Tables']['bookings']['Insert'];
type MenuItem = Database['public']['Tables']['menu_items']['Row'];
```

---

## Common Query Patterns

**Fetch published events with venue:**
```typescript
const { data } = await supabase
  .from('events')
  .select('*, venue:venues(venue_name, location)')
  .eq('status', 'published')
  .gte('event_date', new Date().toISOString().split('T')[0])
  .order('event_date', { ascending: true });
```

**Create booking:**
```typescript
const { data, error } = await supabase
  .from('bookings')
  .insert({
    event_id: eventId,
    customer_name: name,
    customer_email: email,
    party_size: size
  })
  .select()
  .single();
```

**Update profile:**
```typescript
const { error } = await supabase
  .from('profiles')
  .update({ full_name: name, phone: phone })
  .eq('profile_id', userId);
```

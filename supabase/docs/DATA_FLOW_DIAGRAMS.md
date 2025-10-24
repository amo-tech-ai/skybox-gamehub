# Skybox GameHub - Data Flow Diagrams

## Overview

This document contains data flow diagrams showing how data moves through the Skybox GameHub system for key user journeys and system processes.

---

## 1. User Authentication & Profile Creation Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant SupabaseAuth
    participant AuthTrigger
    participant ProfilesTable

    User->>Frontend: Sign Up (email, password, metadata)
    Frontend->>SupabaseAuth: createUser()
    SupabaseAuth->>SupabaseAuth: Create user in auth.users
    SupabaseAuth->>AuthTrigger: AFTER INSERT trigger fires
    AuthTrigger->>ProfilesTable: handle_new_user() creates profile
    ProfilesTable->>ProfilesTable: INSERT INTO profiles
    ProfilesTable-->>AuthTrigger: Profile created
    AuthTrigger-->>SupabaseAuth: Trigger complete
    SupabaseAuth-->>Frontend: Return user + session
    Frontend-->>User: Show dashboard
```

### Key Points
- Automatic profile creation via database trigger
- User metadata (full_name, phone) extracted from signup
- Default role is 'customer'
- No manual profile creation needed

---

## 2. Event Creation Flow (Staff)

```mermaid
flowchart TD
    A[Staff User Logs In] --> B{Profile Role Check}
    B -->|customer| C[Access Denied]
    B -->|staff/admin| D[Access Admin Panel]
    D --> E[Navigate to Create Event]
    E --> F[Select Event Category]
    F --> G[Select Venue]
    G --> H[Fill Event Details]
    H --> I[Add Highlights]
    I --> J[Add Prizes optional]
    J --> K[Add Food/Drink Specials]
    K --> L[Add FAQs]
    L --> M[Add Packages]
    M --> N{Save as Draft or Publish?}
    N -->|Draft| O[Save with status=draft]
    N -->|Publish| P[Save with status=published]
    P --> Q[Trigger sets published_at]
    O --> R[Event saved - not public]
    Q --> S[Event visible to public]
```

### Database Operations
1. INSERT into `events` table
2. INSERT multiple rows into `event_highlights`
3. INSERT multiple rows into `event_prizes` (if applicable)
4. INSERT multiple rows into `event_specials`
5. INSERT multiple rows into `event_faqs`
6. INSERT multiple rows into `event_packages`
7. TRIGGER updates `published_at` if status = 'published'

---

## 3. Public Event Discovery Flow

```mermaid
flowchart TD
    A[User Visits Homepage] --> B[Frontend calls get_upcoming_events]
    B --> C{RLS Policy Check}
    C -->|Pass| D[Query: status=published AND deleted_at IS NULL]
    D --> E[Return events ordered by event_datetime]
    E --> F[Frontend displays event cards]
    F --> G{User clicks event?}
    G -->|Yes| H[Navigate to /events/:slug]
    H --> I[Fetch event by slug]
    I --> J[Fetch related highlights]
    J --> K[Fetch related prizes]
    K --> L[Fetch related specials]
    L --> M[Fetch related FAQs]
    M --> N[Fetch related packages]
    N --> O[Display complete event page]
    O --> P[Increment view_count]
    G -->|No| Q[Browse more events]
```

### RLS Policy Applied
```sql
-- Only published, non-deleted events visible
WHERE status = 'published' AND deleted_at IS NULL
```

---

## 4. Event Search Flow

```mermaid
sequenceDiagram
    participant User
    participant SearchBox
    participant Frontend
    participant Database
    participant FullTextIndex

    User->>SearchBox: Types "Halloween party"
    SearchBox->>Frontend: Debounced search query
    Frontend->>Database: search_events('Halloween party')
    Database->>FullTextIndex: to_tsvector matches plainto_tsquery
    FullTextIndex->>Database: Return matching event IDs
    Database->>Database: Filter by status=published
    Database-->>Frontend: Return event results
    Frontend-->>SearchBox: Display search results
    SearchBox-->>User: Shows matching events
```

### Full-Text Search Implementation
```sql
CREATE INDEX idx_events_search ON events
USING gin(to_tsvector('english', title || ' ' || description || ' ' || subtitle));

-- Search function
SELECT * FROM events
WHERE to_tsvector('english', title || ' ' || description)
@@ plainto_tsquery('english', 'Halloween party')
AND status = 'published'
AND deleted_at IS NULL;
```

---

## 5. Event View Tracking Flow

```mermaid
flowchart LR
    A[User views event page] --> B[Frontend loads event]
    B --> C[Call increment_event_views event_id]
    C --> D[Database UPDATE view_count]
    D --> E[view_count = view_count + 1]
    E --> F[Analytics tracking optional]
```

### SQL Operation
```sql
UPDATE events
SET view_count = view_count + 1
WHERE id = :event_id;
```

---

## 6. Staff Event Management Flow

```mermaid
stateDiagram-v2
    [*] --> Draft: Create Event
    Draft --> Published: Publish
    Draft --> Draft: Edit
    Published --> Published: Edit Details
    Published --> Cancelled: Cancel Event
    Published --> Past: Auto-update (event_datetime < now)
    Published --> SoldOut: Mark as Sold Out
    Cancelled --> Published: Reactivate
    SoldOut --> Published: Reopen
    Past --> [*]

    note right of Published
        Trigger sets published_at
        Public can view
    end note

    note right of Draft
        Only staff can view
        Not in public listings
    end note
```

### Status Transitions
- **draft** → **published**: Trigger sets `published_at = now()`
- **published** → **cancelled**: Event hidden from public
- **published** → **sold_out**: Event visible but booking disabled
- **published** → **past**: Automatic based on `event_datetime`

---

## 7. Real-Time Event Updates Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Database
    participant RealtimeChannel
    participant PublicUser1
    participant PublicUser2

    Admin->>Database: UPDATE events SET available_capacity = 50
    Database->>Database: Trigger updates updated_at
    Database->>RealtimeChannel: Broadcast change
    RealtimeChannel->>PublicUser1: Event updated
    RealtimeChannel->>PublicUser2: Event updated
    PublicUser1->>PublicUser1: Refresh event details
    PublicUser2->>PublicUser2: Refresh event details
```

### Frontend Subscription (Future)
```typescript
const channel = supabase
  .channel('events-changes')
  .on('postgres_changes',
    { event: 'UPDATE', schema: 'public', table: 'events' },
    (payload) => {
      console.log('Event updated:', payload.new)
      // Refresh event in UI
    }
  )
  .subscribe()
```

---

## 8. Capacity Management Flow

```mermaid
flowchart TD
    A[Event Created] --> B[Set total_capacity = 150]
    B --> C[Set available_capacity = 150]
    C --> D{Reservation Made?}
    D -->|Yes| E[Decrement available_capacity]
    E --> F{available_capacity = 0?}
    F -->|Yes| G[Update status = sold_out]
    F -->|No| H[Event still bookable]
    D -->|Cancellation| I[Increment available_capacity]
    I --> J{Was sold_out?}
    J -->|Yes| K[Update status = published]
    J -->|No| L[No status change]
```

### Trigger Logic (Future Implementation)
```sql
CREATE FUNCTION update_event_capacity()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events
  SET available_capacity = available_capacity - 1,
      status = CASE
        WHEN available_capacity - 1 = 0 THEN 'sold_out'
        ELSE status
      END
  WHERE id = NEW.event_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 9. Multi-Table Query Flow (Event Detail Page)

```mermaid
flowchart LR
    A[GET /api/events/:slug] --> B[SELECT FROM events WHERE slug]
    B --> C[SELECT FROM event_highlights WHERE event_id]
    C --> D[SELECT FROM event_prizes WHERE event_id]
    D --> E[SELECT FROM event_specials WHERE event_id]
    E --> F[SELECT FROM event_faqs WHERE event_id]
    F --> G[SELECT FROM event_packages WHERE event_id]
    G --> H[Combine all data into response]
    H --> I[Return JSON to frontend]
```

### Optimized Query with JOINs
```sql
SELECT
  e.*,
  json_agg(DISTINCT h.*) FILTER (WHERE h.id IS NOT NULL) as highlights,
  json_agg(DISTINCT p.*) FILTER (WHERE p.id IS NOT NULL) as prizes,
  json_agg(DISTINCT s.*) FILTER (WHERE s.id IS NOT NULL) as specials,
  json_agg(DISTINCT f.*) FILTER (WHERE f.id IS NOT NULL) as faqs,
  json_agg(DISTINCT pk.*) FILTER (WHERE pk.id IS NOT NULL) as packages
FROM events e
LEFT JOIN event_highlights h ON h.event_id = e.id
LEFT JOIN event_prizes p ON p.event_id = e.id
LEFT JOIN event_specials s ON s.event_id = e.id
LEFT JOIN event_faqs f ON f.event_id = e.id
LEFT JOIN event_packages pk ON pk.event_id = e.id
WHERE e.slug = :slug
GROUP BY e.id;
```

---

## 10. RLS Policy Evaluation Flow

```mermaid
flowchart TD
    A[User makes query] --> B{Authenticated?}
    B -->|No anon| C[Apply anon policies]
    B -->|Yes authenticated| D{Staff role?}
    C --> E[Filter: status=published only]
    D -->|Yes| F[Apply staff policies]
    D -->|No| E
    F --> G[Show all events including drafts]
    E --> H[Execute filtered query]
    G --> I[Execute unfiltered query]
    H --> J[Return results]
    I --> J
```

### RLS Policy Example
```sql
-- Public sees only published events
CREATE POLICY "Published events readable by all"
ON events FOR SELECT TO authenticated, anon
USING (status = 'published' AND deleted_at IS NULL);

-- Staff sees all events
CREATE POLICY "All events readable by staff"
ON events FOR SELECT TO authenticated
USING (is_staff());
```

---

## Data Flow Summary

### High-Traffic Flows
1. **Event Discovery** (public, high volume)
   - Optimized with indexes on `event_datetime`, `status`, `is_featured`
   - Full-text search index for search queries

2. **Event Detail Page** (public, high volume)
   - Single query with JOINs or multiple optimized queries
   - Increment view_count asynchronously

### Low-Traffic Flows
3. **Event Creation** (staff only, low volume)
   - Multiple INSERT operations
   - No performance concerns

4. **Profile Creation** (triggered, low volume)
   - Automatic via trigger
   - Happens once per user

---

**Last Updated**: 2025-10-24
**Version**: 1.0
**Related**: ERD_DIAGRAM.md

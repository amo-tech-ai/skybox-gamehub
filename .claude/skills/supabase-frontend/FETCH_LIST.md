# Fetch List Pattern

Complete examples for fetching lists of items from Supabase.

## Pattern Overview

**Use for:** Events page, menu page, customer list, bookings list

**Components:**
1. Create React Query hook
2. Handle loading/error/empty states
3. Display data in components

---

## Example 1: Fetch Published Events

**Use case:** Schedule page showing all upcoming events

### Step 1: Create Hook

**File:** `/src/hooks/useEvents.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Event {
  event_id: string;
  event_date: string;
  event_time: string;
  description: string;
  status: string;
  venue?: {
    venue_name: string;
    location: string;
  };
}

export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          event_id,
          event_date,
          event_time,
          description,
          status,
          venue:venues(venue_name, location)
        `)
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true })
        .order('event_time', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
    staleTime: 1000 * 60 * 5, // Consider fresh for 5 minutes
  });
}
```

### Step 2: Use in Component

**File:** `/src/pages/Schedule.tsx`

```typescript
import { useEvents } from '@/hooks/useEvents';
import { GameCard } from '@/components/GameCard';
import { Loader2 } from 'lucide-react';

export default function Schedule() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading events: {error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No upcoming events. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <div className="grid gap-6">
        {events.map((event, index) => (
          <GameCard
            key={event.event_id}
            gameNumber={index + 1}
            date={formatDate(event.event_date)}
            time={formatTime(event.event_time)}
            teams={event.description || 'Event details TBA'}
            venue={event.venue?.venue_name
              ? `${event.venue.venue_name}, ${event.venue.location}`
              : 'Venue TBA'}
          />
        ))}
      </div>
    </div>
  );
}

// Helper functions
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);
  const etHour = hour > 12 ? hour - 12 : hour;
  const cotHour = etHour === 1 ? 12 : etHour - 1;
  const period = hour >= 12 ? 'PM' : 'AM';

  return `${etHour}:${minutes} ${period} ET / ${cotHour}:${minutes} ${period} COT`;
}
```

---

## Example 2: Fetch Menu Items by Category

**Use case:** Menu page showing food and drinks

### Step 1: Create Hook

**File:** `/src/hooks/useMenuItems.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface MenuItem {
  item_id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url: string;
  available: boolean;
}

export function useMenuItems(category?: string) {
  return useQuery({
    queryKey: ['menu-items', category],
    queryFn: async () => {
      let query = supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('name', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as MenuItem[];
    },
    staleTime: 1000 * 60 * 10, // Consider fresh for 10 minutes
  });
}
```

### Step 2: Use in Component

**File:** `/src/pages/Menu.tsx`

```typescript
import { useState } from 'react';
import { useMenuItems } from '@/hooks/useMenuItems';
import { Loader2 } from 'lucide-react';

const categories = ['appetizer', 'entree', 'drink', 'dessert'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { data: items, isLoading, error } = useMenuItems(selectedCategory);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading menu: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Menu</h1>

      {/* Category filters */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSelectedCategory(undefined)}
          className={`px-4 py-2 rounded ${!selectedCategory ? 'bg-primary text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded capitalize ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu items grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map(item => (
          <div key={item.item_id} className="border rounded-lg p-4">
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <p className="text-primary font-bold mt-4">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {items?.length === 0 && (
        <p className="text-center text-gray-500 py-12">
          No items available in this category
        </p>
      )}
    </div>
  );
}
```

---

## Example 3: Fetch User's Bookings

**Use case:** Customer dashboard showing booking history

### Step 1: Create Hook

**File:** `/src/hooks/useMyBookings.ts`

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

interface Booking {
  booking_id: string;
  party_size: number;
  status: string;
  created_at: string;
  event?: {
    event_date: string;
    event_time: string;
    description: string;
    venue?: {
      venue_name: string;
    };
  };
}

export function useMyBookings(email: string) {
  return useQuery({
    queryKey: ['my-bookings', email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          booking_id,
          party_size,
          status,
          created_at,
          event:events(
            event_date,
            event_time,
            description,
            venue:venues(venue_name)
          )
        `)
        .eq('customer_email', email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Booking[];
    },
    enabled: !!email, // Only run if email is provided
    staleTime: 1000 * 60 * 2, // Consider fresh for 2 minutes
  });
}
```

### Step 2: Use in Component

```typescript
import { useMyBookings } from '@/hooks/useMyBookings';

export default function MyBookings() {
  const email = "customer@example.com"; // Get from auth context
  const { data: bookings, isLoading, error } = useMyBookings(email);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings?.map(booking => (
        <div key={booking.booking_id} className="border p-4 mb-4">
          <p><strong>Event:</strong> {booking.event?.description}</p>
          <p><strong>Date:</strong> {booking.event?.event_date}</p>
          <p><strong>Party Size:</strong> {booking.party_size}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## React Query Configuration

**File:** `/src/main.tsx`

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Retry failed queries once
      refetchOnWindowFocus: false, // Don't refetch on window focus
      staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app */}
    </QueryClientProvider>
  );
}
```

---

## Best Practices

1. **Always handle three states:**
   - Loading: Show spinner or skeleton
   - Error: Show message with retry option
   - Empty: Show friendly "no data" message

2. **Use staleTime wisely:**
   - Events: 5 minutes
   - Menu items: 10 minutes
   - User data: 2 minutes

3. **Enable queries conditionally:**
   ```typescript
   enabled: !!userId // Only run when userId exists
   ```

4. **Order results in database:**
   ```typescript
   .order('event_date', { ascending: true })
   ```

5. **Filter at database level:**
   ```typescript
   .eq('status', 'published')
   .gte('event_date', today)
   ```

---

## Common Mistakes

**Mistake 1: Fetching all data then filtering in JavaScript**
```typescript
// ❌ Bad: Fetches everything
const { data } = await supabase.from('events').select('*');
const published = data.filter(e => e.status === 'published');

// ✅ Good: Filters in database
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published');
```

**Mistake 2: Not handling null venues**
```typescript
// ❌ Bad: Will crash if venue is null
venue={event.venue.venue_name}

// ✅ Good: Handles null safely
venue={event.venue?.venue_name ?? 'Venue TBA'}
```

**Mistake 3: Forgetting RLS policies**
```typescript
// Query will fail with 401 if no RLS policy exists
// Always check Supabase Dashboard → Authentication → Policies
```

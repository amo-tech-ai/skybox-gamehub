# Supabase Frontend - Quick Reference Guide

**Last Updated:** 2025-10-24

---

## Project Status

✅ **Home Page (`/`) - PRODUCTION READY**
- Connected to Supabase
- Fetching events from database
- Full error handling
- TypeScript types
- React Query caching

---

## File Locations

### Core Infrastructure
```
skybox-ws-playbook/src/
├── lib/
│   ├── supabase.ts         # Supabase client instance
│   └── formatters.ts       # Date/time formatting utilities
├── types/
│   └── database.ts         # TypeScript database types
├── hooks/
│   └── useEvents.ts        # React Query hook for events
└── App.tsx                 # React Query configuration
```

### Environment
```
/.env.local                 # Supabase credentials
```

---

## Quick Commands

### Development
```bash
cd /home/sk/skybox-gamehub/skybox-ws-playbook
npm run dev                # Start dev server
npm run build              # Build for production
```

### Database Connection Test
```bash
# Check if Supabase is accessible
curl https://dbocegamkdnsorhtdbni.supabase.co/rest/v1/events \
  -H "apikey: YOUR_ANON_KEY"
```

---

## Code Patterns

### 1. Fetch Data with React Query
```typescript
import { useEvents } from '@/hooks/useEvents';

function MyComponent() {
  const { data: events, isLoading, error } = useEvents();

  if (isLoading) return <Loader />;
  if (error) return <Error message={error.message} />;

  return events.map(event => <EventCard key={event.event_id} {...event} />);
}
```

### 2. Create a New Hook
```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useVenues() {
  return useQuery({
    queryKey: ['venues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('venues')
        .select('*')
        .order('venue_name');

      if (error) throw new Error(error.message);
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
```

### 3. Format Dates and Times
```typescript
import { formatEventDate, formatEventTime } from '@/lib/formatters';

formatEventDate('2025-10-24');  // "Friday, Oct 24"
formatEventTime('20:00:00');    // "8:00 PM ET / 7:00 PM COT"
```

---

## Common Queries

### Fetch Published Events
```typescript
const { data } = await supabase
  .from('events')
  .select('*, venue:venues(*)')
  .eq('status', 'published')
  .gte('event_date', today)
  .order('event_date', { ascending: true });
```

### Fetch Single Event
```typescript
const { data } = await supabase
  .from('events')
  .select('*, venue:venues(*)')
  .eq('event_id', id)
  .single();
```

### Count Records
```typescript
const { count } = await supabase
  .from('events')
  .select('*', { count: 'exact', head: true })
  .eq('status', 'published');
```

---

## TypeScript Types

### Import Types
```typescript
import type { Event, Venue, EventWithVenue } from '@/types/database';
```

### Use in Components
```typescript
interface Props {
  event: Event;
  onSelect: (eventId: string) => void;
}
```

---

## React Query Configuration

### Global Settings
Located in `/src/App.tsx`:
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

### Query Keys
Follow this pattern:
```typescript
['events']                    // All events
['events', 'upcoming']        // Upcoming events
['events', eventId]           // Single event
['venues']                    // All venues
['bookings', userId]          // User bookings
```

---

## Error Handling

### In Hooks
```typescript
if (error) {
  console.error('Supabase error:', error);
  throw new Error(`Failed to fetch: ${error.message}`);
}
```

### In Components
```typescript
if (error) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <Button onClick={() => refetch()}>Retry</Button>
    </div>
  );
}
```

---

## Database Schema Reference

### Events Table
| Column | Type | Notes |
|--------|------|-------|
| event_id | uuid | Primary key |
| event_date | date | Event date |
| event_time | time | Event time |
| description | text | Event description |
| status | text | 'draft', 'published', 'cancelled' |
| venue_id | uuid | Foreign key to venues |

### Venues Table
| Column | Type | Notes |
|--------|------|-------|
| venue_id | uuid | Primary key |
| venue_name | text | Venue name |
| location | text | Location description |
| capacity | int | Max capacity |
| address | text | Street address |
| city | text | City |
| country | text | Country |

---

## Troubleshooting

### "Missing environment variables"
1. Check `.env.local` exists
2. Verify variables start with `VITE_`
3. Restart dev server after changes

### No data showing
1. Check Supabase dashboard
2. Verify RLS policies allow anonymous access
3. Check browser console for errors
4. Verify query filters (status, date)

### Type errors
1. Ensure types in `/src/types/database.ts` match schema
2. Restart TypeScript server in VS Code
3. Run `npm run build` to verify

### Network errors
1. Check internet connection
2. Verify Supabase project is not paused
3. Check API keys are correct
4. Verify CORS settings in Supabase

---

## Best Practices

### DO ✅
- Use React Query for all data fetching
- Add loading and error states
- Use TypeScript types
- Log errors to console
- Cache data appropriately
- Handle empty states

### DON'T ❌
- Fetch data in useEffect directly
- Use `any` type
- Ignore errors
- Skip loading states
- Hardcode API keys
- Fetch same data multiple times

---

## Performance Tips

1. **Caching**: Use appropriate `staleTime` for each query
2. **Pagination**: Limit results with `.limit()`
3. **Select specific fields**: Don't use `select('*')` if not needed
4. **Indexes**: Ensure frequently queried fields are indexed
5. **Joins**: Use `.select('*, relation(*)')` for efficient joins

---

## Next Pages to Connect

### Schedule Page
```typescript
// /src/hooks/useAllEvents.ts
export function useAllEvents() {
  return useQuery({
    queryKey: ['events', 'all'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*, venue:venues(*)')
        .eq('status', 'published')
        .order('event_date');
      return data;
    },
  });
}
```

### Menu Page
```typescript
// /src/hooks/useMenuItems.ts
export function useMenuItems() {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('available', true)
        .order('category, name');
      return data;
    },
  });
}
```

---

## Support Resources

- **Implementation Summary:** `/supabase/frontend/website/IMPLEMENTATION_SUMMARY.md`
- **Task Checklist:** `/supabase/frontend/website/01-home-page-tasks.md`
- **Supabase Docs:** https://supabase.com/docs
- **React Query Docs:** https://tanstack.com/query/latest

---

**All systems operational. Ready for development.**

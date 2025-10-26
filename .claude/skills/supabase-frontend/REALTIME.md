# Real-Time Updates

Complete guide for implementing real-time subscriptions with Supabase.

## Overview

**Use for:** Live dashboards, booking notifications, chat features, collaborative editing

**Supabase Realtime Features:**
1. Database changes (INSERT, UPDATE, DELETE)
2. Presence (who's online)
3. Broadcast (send messages between clients)

---

## Enable Realtime on Tables

**Enable in Supabase Dashboard:**
1. Go to Database → Replication
2. Select table (e.g., `bookings`)
3. Enable replication
4. Choose which events: INSERT, UPDATE, DELETE

**Or via SQL:**
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE events;
```

---

## Pattern 1: Listen to New Bookings

**Use case:** Dashboard showing new bookings in real-time

### Step 1: Create Subscription Hook

**File:** `/src/hooks/useRealtimeBookings.ts`

```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useRealtimeBookings() {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Subscribe to INSERT events on bookings table
    const channel = supabase
      .channel('bookings-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          // Invalidate queries to refetch data
          queryClient.invalidateQueries({ queryKey: ['bookings'] });

          // Show notification
          toast.info('New booking received!', {
            description: `${payload.new.customer_name} - Party of ${payload.new.party_size}`,
          });
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
```

### Step 2: Use in Component

**File:** `/src/pages/Dashboard.tsx`

```typescript
import { useBookings } from '@/hooks/useBookings';
import { useRealtimeBookings } from '@/hooks/useRealtimeBookings';

export default function Dashboard() {
  const { data: bookings, isLoading } = useBookings();

  // Enable real-time updates
  useRealtimeBookings();

  return (
    <div>
      <h1>Bookings Dashboard</h1>
      {bookings?.map(booking => (
        <div key={booking.booking_id}>
          {booking.customer_name} - {booking.party_size} guests
        </div>
      ))}
    </div>
  );
}
```

---

## Pattern 2: Listen to Status Updates

**Use case:** Update UI when booking status changes (confirmed, cancelled)

```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRealtimeBookingUpdates(bookingId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'bookings',
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          // Update cache with new data
          queryClient.setQueryData(['booking', bookingId], payload.new);

          // Show notification based on status
          if (payload.new.status === 'confirmed') {
            toast.success('Booking confirmed!');
          } else if (payload.new.status === 'cancelled') {
            toast.error('Booking cancelled');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId, queryClient]);
}

// Usage
export function BookingDetails({ bookingId }) {
  const { data: booking } = useBooking(bookingId);
  useRealtimeBookingUpdates(bookingId); // Enable real-time updates

  return (
    <div>
      <h2>Booking Details</h2>
      <p>Status: {booking?.status}</p>
    </div>
  );
}
```

---

## Pattern 3: Live Event Capacity Counter

**Use case:** Show remaining spots that updates live

```typescript
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useRealtimeEventCapacity(eventId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel(`event-${eventId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'events',
          filter: `event_id=eq.${eventId}`,
        },
        (payload) => {
          // Update event cache
          queryClient.setQueryData(['event', eventId], payload.new);

          const availableSpots = payload.new.capacity - payload.new.current_bookings;

          // Warn if capacity is low
          if (availableSpots <= 5 && availableSpots > 0) {
            toast.warning(`Only ${availableSpots} spots left!`);
          } else if (availableSpots === 0) {
            toast.error('Event is now full');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, queryClient]);
}

// Usage
export function EventCard({ eventId }) {
  const { data: event } = useEvent(eventId);
  useRealtimeEventCapacity(eventId);

  const availableSpots = event ? event.capacity - event.current_bookings : 0;

  return (
    <div>
      <h3>{event?.description}</h3>
      <p className={availableSpots <= 5 ? 'text-red-500' : 'text-green-500'}>
        {availableSpots} spots available
      </p>
    </div>
  );
}
```

---

## Pattern 4: Listen to Multiple Events

**Use case:** Dashboard showing all booking changes (INSERT, UPDATE, DELETE)

```typescript
export function useRealtimeBookings() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('all-booking-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to all events
          schema: 'public',
          table: 'bookings',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            toast.info('New booking created');
          } else if (payload.eventType === 'UPDATE') {
            toast.info('Booking updated');
          } else if (payload.eventType === 'DELETE') {
            toast.info('Booking deleted');
          }

          // Refetch all bookings
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
}
```

---

## Pattern 5: Presence (Who's Online)

**Use case:** Show which admins are viewing the dashboard

```typescript
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface PresenceState {
  user_id: string;
  user_name: string;
  online_at: string;
}

export function usePresence(userId: string, userName: string) {
  const [onlineUsers, setOnlineUsers] = useState<PresenceState[]>([]);

  useEffect(() => {
    const channel = supabase.channel('dashboard-presence');

    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        const users = Object.values(state).flat() as PresenceState[];
        setOnlineUsers(users);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          // Track this user's presence
          await channel.track({
            user_id: userId,
            user_name: userName,
            online_at: new Date().toISOString(),
          });
        }
      });

    return () => {
      channel.untrack();
      supabase.removeChannel(channel);
    };
  }, [userId, userName]);

  return onlineUsers;
}

// Usage
export function DashboardHeader() {
  const userId = 'current-user-id';
  const userName = 'Admin Name';
  const onlineUsers = usePresence(userId, userName);

  return (
    <div className="flex items-center gap-4">
      <h1>Dashboard</h1>
      <div className="text-sm text-gray-600">
        {onlineUsers.length} user{onlineUsers.length !== 1 ? 's' : ''} online
      </div>
      <div className="flex -space-x-2">
        {onlineUsers.slice(0, 5).map(user => (
          <div
            key={user.user_id}
            className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center border-2 border-white"
            title={user.user_name}
          >
            {user.user_name[0]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Pattern 6: Broadcast Messages

**Use case:** Send notifications between dashboard users

```typescript
export function useBroadcast() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const channel = supabase.channel('dashboard-broadcast');

    channel
      .on('broadcast', { event: 'notification' }, (payload) => {
        setMessages(prev => [...prev, payload.payload]);
        toast.info(payload.payload.message);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendNotification = (message: string) => {
    supabase.channel('dashboard-broadcast').send({
      type: 'broadcast',
      event: 'notification',
      payload: { message, timestamp: new Date().toISOString() },
    });
  };

  return { messages, sendNotification };
}

// Usage
export function NotificationButton() {
  const { sendNotification } = useBroadcast();

  return (
    <button onClick={() => sendNotification('Event capacity updated!')}>
      Notify All Users
    </button>
  );
}
```

---

## Performance Optimization

### Only Subscribe When Needed

```typescript
export function useRealtimeBookings(enabled: boolean = true) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return; // Don't subscribe if not needed

    const channel = supabase
      .channel('bookings-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [enabled, queryClient]);
}

// Usage: Only enable when dashboard is visible
const isVisible = usePageVisibility();
useRealtimeBookings(isVisible);
```

---

## Best Practices

1. **Always clean up subscriptions:**
   ```typescript
   return () => {
     supabase.removeChannel(channel);
   };
   ```

2. **Use filters to reduce traffic:**
   ```typescript
   filter: `event_id=eq.${eventId}` // Only this event
   ```

3. **Invalidate queries instead of manual updates:**
   ```typescript
   // ✅ Good: Let React Query refetch
   queryClient.invalidateQueries({ queryKey: ['bookings'] });

   // ❌ Bad: Manually update cache (can get out of sync)
   queryClient.setQueryData(['bookings'], newData);
   ```

4. **Enable replication selectively:**
   - Only enable on tables that need real-time
   - High-frequency updates can impact performance

5. **Handle connection states:**
   ```typescript
   .subscribe((status) => {
     if (status === 'SUBSCRIBED') {
       console.log('Connected to real-time');
     } else if (status === 'CLOSED') {
       console.log('Disconnected from real-time');
     }
   });
   ```

---

## Troubleshooting

**Issue: No real-time updates received**
- Check table has replication enabled: Database → Replication
- Verify RLS policies allow SELECT for user
- Check channel name is unique

**Issue: Too many re-renders**
- Move subscription to custom hook
- Use `enabled` flag to control when to subscribe
- Debounce rapid updates

**Issue: Memory leaks**
- Always clean up channels in useEffect return
- Verify `removeChannel` is called

---

## RLS Policies for Real-Time

**Allow users to receive real-time updates:**

```sql
-- Users must be able to SELECT to receive real-time updates
CREATE POLICY "Users can view bookings realtime"
ON bookings FOR SELECT
USING (
  auth.role() = 'authenticated' OR
  status = 'confirmed'
);
```

**Important:** Real-time respects RLS policies. Users will only receive updates for rows they have SELECT permission on.

---

## Complete Example: Live Booking Dashboard

```typescript
import { useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function LiveDashboard() {
  const queryClient = useQueryClient();

  // Fetch bookings
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*, event:events(description)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const channel = supabase
      .channel('bookings-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            toast.success('New booking!', {
              description: payload.new.customer_name,
            });
          }
          queryClient.invalidateQueries({ queryKey: ['bookings'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Live Bookings ({bookings?.length || 0})</h1>
      {bookings?.map(booking => (
        <div key={booking.booking_id} className="border p-4 mb-2">
          <p><strong>{booking.customer_name}</strong></p>
          <p>Event: {booking.event?.description}</p>
          <p>Party: {booking.party_size}</p>
          <p>Status: {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
```

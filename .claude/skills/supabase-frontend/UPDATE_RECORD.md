# Update Record Pattern

Complete examples for updating existing records in Supabase using React Query mutations.

## Pattern Overview

**Use for:** Edit profile, update booking status, modify menu items

**Components:**
1. Create mutation hook with React Query
2. Handle optimistic updates
3. Show success/error feedback
4. Invalidate related queries

---

## Example 1: Update User Profile

**Use case:** Profile settings page

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useUpdateProfile.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ProfileUpdate {
  profile_id: string;
  full_name?: string;
  phone?: string;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ profile_id, ...updates }: ProfileUpdate) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('profile_id', profile_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Update cache with new data
      queryClient.setQueryData(['profile', data.profile_id], data);

      // Invalidate to refetch
      queryClient.invalidateQueries({ queryKey: ['profile'] });

      toast.success('Profile updated successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update profile', {
        description: error.message,
      });
    },
  });
}
```

### Step 2: Use in Component

**File:** `/src/pages/ProfileSettings.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function ProfileSettings() {
  const userId = 'current-user-id'; // Get from auth context
  const { data: profile, isLoading } = useProfile(userId);
  const updateProfile = useUpdateProfile();

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile.mutate({
      profile_id: userId,
      ...formData,
    });
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>
          <Input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <Button
          type="submit"
          disabled={updateProfile.isPending}
        >
          {updateProfile.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </form>
    </div>
  );
}
```

---

## Example 2: Update Booking Status

**Use case:** Admin dashboard managing bookings

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useUpdateBooking.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingUpdate {
  booking_id: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
  party_size?: number;
  special_requests?: string;
}

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, ...updates }: BookingUpdate) => {
      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('booking_id', booking_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });

      toast.success('Booking updated successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to update booking', {
        description: error.message,
      });
    },
  });
}
```

### Step 2: Use in Component

```typescript
import { useUpdateBooking } from '@/hooks/useUpdateBooking';

export function BookingCard({ booking }) {
  const updateBooking = useUpdateBooking();

  const handleConfirm = () => {
    updateBooking.mutate({
      booking_id: booking.booking_id,
      status: 'confirmed',
    });
  };

  const handleCancel = () => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      updateBooking.mutate({
        booking_id: booking.booking_id,
        status: 'cancelled',
      });
    }
  };

  return (
    <div className="border p-4 rounded">
      <p>Customer: {booking.customer_name}</p>
      <p>Status: {booking.status}</p>

      <div className="flex gap-2 mt-4">
        {booking.status === 'pending' && (
          <Button onClick={handleConfirm}>Confirm</Button>
        )}
        {booking.status !== 'cancelled' && (
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
```

---

## Example 3: Update Menu Item Availability

**Use case:** Admin toggling menu items on/off

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useUpdateMenuItem.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface MenuItemUpdate {
  item_id: string;
  available?: boolean;
  price?: number;
  description?: string;
}

export function useUpdateMenuItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ item_id, ...updates }: MenuItemUpdate) => {
      const { data, error } = await supabase
        .from('menu_items')
        .update(updates)
        .eq('item_id', item_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async ({ item_id, ...updates }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['menu-items'] });

      const previousItems = queryClient.getQueryData(['menu-items']);

      queryClient.setQueryData(['menu-items'], (old: any) => {
        return old?.map((item: any) =>
          item.item_id === item_id ? { ...item, ...updates } : item
        );
      });

      return { previousItems };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousItems) {
        queryClient.setQueryData(['menu-items'], context.previousItems);
      }
      toast.error('Failed to update menu item');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['menu-items'] });
    },
  });
}
```

### Step 2: Use in Component

```typescript
import { useUpdateMenuItem } from '@/hooks/useUpdateMenuItem';

export function MenuItemCard({ item }) {
  const updateMenuItem = useUpdateMenuItem();

  const toggleAvailability = () => {
    updateMenuItem.mutate({
      item_id: item.item_id,
      available: !item.available,
    });
  };

  return (
    <div className="border p-4 rounded">
      <h3>{item.name}</h3>
      <p>${item.price}</p>

      <Button
        onClick={toggleAvailability}
        variant={item.available ? 'default' : 'secondary'}
      >
        {item.available ? 'Mark Unavailable' : 'Mark Available'}
      </Button>
    </div>
  );
}
```

---

## Advanced: Batch Updates

**Use case:** Update multiple records at once

```typescript
export function useBatchUpdateBookings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: { booking_id: string; status: string }[]) => {
      const promises = updates.map(({ booking_id, status }) =>
        supabase
          .from('bookings')
          .update({ status })
          .eq('booking_id', booking_id)
      );

      const results = await Promise.all(promises);

      // Check for errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw new Error(`Failed to update ${errors.length} bookings`);
      }

      return results;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Bookings updated successfully!');
    },
  });
}

// Usage
const batchUpdate = useBatchUpdateBookings();

const confirmAll = () => {
  batchUpdate.mutate(
    selectedBookings.map(booking => ({
      booking_id: booking.booking_id,
      status: 'confirmed',
    }))
  );
};
```

---

## Advanced: Conditional Updates

**Use case:** Only update if certain conditions are met

```typescript
export function useUpdateBookingWithValidation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ booking_id, party_size }: { booking_id: string; party_size: number }) => {
      // First, get the event capacity
      const { data: booking } = await supabase
        .from('bookings')
        .select('event:events(capacity, current_bookings)')
        .eq('booking_id', booking_id)
        .single();

      if (!booking?.event) {
        throw new Error('Event not found');
      }

      const availableSpots = booking.event.capacity - booking.event.current_bookings;

      if (party_size > availableSpots) {
        throw new Error(`Only ${availableSpots} spots available`);
      }

      // Proceed with update
      const { data, error } = await supabase
        .from('bookings')
        .update({ party_size })
        .eq('booking_id', booking_id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      toast.success('Party size updated!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
```

---

## Best Practices

1. **Always use `.eq()` to target specific records:**
   ```typescript
   .update(data)
   .eq('id', recordId) // Critical: Only update this record
   ```

2. **Return updated data with `.select()`:**
   ```typescript
   .update(data)
   .eq('id', recordId)
   .select() // Get updated record back
   .single() // Return object, not array
   ```

3. **Validate before updating:**
   ```typescript
   if (party_size < 1 || party_size > 20) {
     toast.error('Party size must be between 1 and 20');
     return;
   }
   ```

4. **Use optimistic updates for instant feedback:**
   ```typescript
   onMutate: async (newData) => {
     // Update UI immediately
     queryClient.setQueryData(['record', id], newData);
   }
   ```

5. **Invalidate related queries:**
   ```typescript
   queryClient.invalidateQueries({ queryKey: ['bookings'] });
   queryClient.invalidateQueries({ queryKey: ['events'] });
   ```

---

## Common Mistakes

**Mistake 1: Forgetting `.eq()` filter**
```typescript
// ❌ Bad: Updates ALL records!
await supabase.from('bookings').update({ status: 'confirmed' });

// ✅ Good: Only updates specific record
await supabase
  .from('bookings')
  .update({ status: 'confirmed' })
  .eq('booking_id', bookingId);
```

**Mistake 2: Not handling concurrent updates**
```typescript
// ❌ Bad: Can overwrite other users' changes
const { data: booking } = await supabase.from('bookings').select('*').eq('id', id).single();
// ... time passes ...
await supabase.from('bookings').update({ ...booking, status: 'confirmed' }).eq('id', id);

// ✅ Good: Only update specific fields
await supabase.from('bookings').update({ status: 'confirmed' }).eq('id', id);
```

**Mistake 3: Not checking RLS policies**
```typescript
// Update will fail if user doesn't have permission
// Check Supabase Dashboard → Authentication → Policies
// Ensure UPDATE policy exists for the user's role
```

---

## Confirmation Dialogs

**Use native confirm:**
```typescript
const handleDelete = () => {
  if (confirm('Are you sure you want to delete this?')) {
    deleteMutation.mutate(id);
  }
};
```

**Or use a modal library:**
```typescript
import { useConfirm } from '@/hooks/useConfirm';

const { confirm } = useConfirm();

const handleDelete = async () => {
  const confirmed = await confirm({
    title: 'Delete booking?',
    description: 'This action cannot be undone.',
  });

  if (confirmed) {
    deleteMutation.mutate(id);
  }
};
```

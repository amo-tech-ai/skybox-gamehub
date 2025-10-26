# Validation Workflow

Complete guide for form validation and data validation in Supabase frontend integration.

## Overview

**Three layers of validation:**
1. **Client-side validation** - Immediate user feedback
2. **Database constraints** - Server-side enforcement
3. **RLS policies** - Permission validation

---

## Client-Side Validation

### Form Validation with React Hook Form

**Install:**
```bash
npm install react-hook-form zod @hookform/resolvers
```

**Example: Booking Form**

**File:** `/src/pages/Reserve.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateBooking } from '@/hooks/useCreateBooking';

// Define validation schema
const bookingSchema = z.object({
  event_id: z.string().uuid('Please select an event'),
  customer_name: z.string().min(2, 'Name must be at least 2 characters'),
  customer_email: z.string().email('Invalid email address'),
  customer_phone: z.string().optional(),
  party_size: z.number()
    .min(1, 'Party size must be at least 1')
    .max(20, 'Maximum party size is 20'),
  special_requests: z.string().max(500, 'Maximum 500 characters').optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function Reserve() {
  const createBooking = useCreateBooking();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      party_size: 2,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        reset(); // Clear form after successful submission
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Event selection */}
      <div>
        <label>Event *</label>
        <select {...register('event_id')}>
          <option value="">Select event</option>
          {/* Event options */}
        </select>
        {errors.event_id && (
          <p className="text-red-500 text-sm mt-1">{errors.event_id.message}</p>
        )}
      </div>

      {/* Name */}
      <div>
        <label>Full Name *</label>
        <input {...register('customer_name')} />
        {errors.customer_name && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label>Email *</label>
        <input type="email" {...register('customer_email')} />
        {errors.customer_email && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label>Phone</label>
        <input type="tel" {...register('customer_phone')} />
        {errors.customer_phone && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_phone.message}</p>
        )}
      </div>

      {/* Party size */}
      <div>
        <label>Party Size *</label>
        <input
          type="number"
          {...register('party_size', { valueAsNumber: true })}
        />
        {errors.party_size && (
          <p className="text-red-500 text-sm mt-1">{errors.party_size.message}</p>
        )}
      </div>

      {/* Special requests */}
      <div>
        <label>Special Requests</label>
        <textarea {...register('special_requests')} rows={4} />
        {errors.special_requests && (
          <p className="text-red-500 text-sm mt-1">{errors.special_requests.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={createBooking.isPending}
      >
        {createBooking.isPending ? 'Submitting...' : 'Reserve Now'}
      </button>
    </form>
  );
}
```

---

## Business Logic Validation

### Validate Event Capacity Before Booking

**File:** `/src/hooks/useCreateBooking.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingData {
  event_id: string;
  customer_name: string;
  customer_email: string;
  party_size: number;
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingData) => {
      // Step 1: Check event capacity
      const { data: event, error: eventError } = await supabase
        .from('events')
        .select('capacity, current_bookings')
        .eq('event_id', booking.event_id)
        .single();

      if (eventError) throw eventError;

      if (!event) {
        throw new Error('Event not found');
      }

      const availableSpots = event.capacity - event.current_bookings;

      if (booking.party_size > availableSpots) {
        throw new Error(
          `Only ${availableSpots} spots available. Please reduce party size.`
        );
      }

      // Step 2: Create booking
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...booking,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;

      // Step 3: Update event booking count
      await supabase.rpc('increment_booking_count', {
        event_id: booking.event_id,
        increment_by: booking.party_size,
      });

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });

      toast.success('Booking confirmed!', {
        description: `Confirmation sent to ${data.customer_email}`,
      });
    },
    onError: (error: Error) => {
      toast.error('Booking failed', {
        description: error.message,
      });
    },
  });
}
```

**Database function for atomic updates:**

```sql
-- Create function to atomically increment booking count
CREATE OR REPLACE FUNCTION increment_booking_count(
  event_id uuid,
  increment_by integer
)
RETURNS void AS $$
BEGIN
  UPDATE events
  SET current_bookings = current_bookings + increment_by
  WHERE events.event_id = increment_booking_count.event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

---

## Email Validation

### Prevent Duplicate Bookings

```typescript
export function useCreateBooking() {
  return useMutation({
    mutationFn: async (booking: BookingData) => {
      // Check for existing booking
      const { data: existing } = await supabase
        .from('bookings')
        .select('booking_id')
        .eq('event_id', booking.event_id)
        .eq('customer_email', booking.customer_email)
        .single();

      if (existing) {
        throw new Error(
          'You already have a booking for this event. Check your email for confirmation.'
        );
      }

      // Proceed with booking creation
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
}
```

---

## Server-Side Validation with Database Constraints

### Set Up Database Constraints

**Email format validation:**
```sql
ALTER TABLE bookings
ADD CONSTRAINT valid_email
CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
```

**Party size validation:**
```sql
ALTER TABLE bookings
ADD CONSTRAINT valid_party_size
CHECK (party_size >= 1 AND party_size <= 20);
```

**Phone format validation:**
```sql
ALTER TABLE bookings
ADD CONSTRAINT valid_phone
CHECK (
  customer_phone IS NULL OR
  customer_phone ~* '^\+?[1-9]\d{1,14}$'
);
```

**Event capacity validation:**
```sql
ALTER TABLE events
ADD CONSTRAINT valid_capacity
CHECK (capacity > 0 AND current_bookings >= 0 AND current_bookings <= capacity);
```

---

## RLS Policy Validation

### Ensure Users Can Only Update Their Own Data

**Profile updates:**
```sql
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = profile_id)
WITH CHECK (auth.uid() = profile_id);
```

**Booking updates:**
```sql
CREATE POLICY "Users can update own bookings"
ON bookings FOR UPDATE
USING (
  auth.uid() = profile_id OR
  customer_email = auth.email()
);
```

---

## Validation Workflow Checklist

For critical operations (bookings, payments, profile updates):

```
✅ Client-side validation
  - Form fields validated on blur/submit
  - Inline error messages shown
  - Submit button disabled during validation

✅ Business logic validation
  - Check event capacity
  - Prevent duplicate bookings
  - Validate date/time constraints

✅ Database constraints
  - Email format enforced
  - Party size range enforced
  - Phone format validated

✅ RLS policies
  - User permissions checked
  - Data access restricted
  - Updates authorized

✅ Error handling
  - User-friendly error messages
  - Retry options provided
  - Form state preserved on error
```

---

## Real-Time Capacity Validation

**Hook that checks availability as user types:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useEventAvailability(eventId: string | undefined, partySize: number) {
  return useQuery({
    queryKey: ['event-availability', eventId, partySize],
    queryFn: async () => {
      if (!eventId) return null;

      const { data, error } = await supabase
        .from('events')
        .select('capacity, current_bookings')
        .eq('event_id', eventId)
        .single();

      if (error) throw error;

      const availableSpots = data.capacity - data.current_bookings;

      return {
        available: availableSpots >= partySize,
        availableSpots,
        message: availableSpots >= partySize
          ? `${availableSpots} spots available`
          : `Only ${availableSpots} spots left (need ${partySize})`,
      };
    },
    enabled: !!eventId && partySize > 0,
    staleTime: 1000 * 30, // Refresh every 30 seconds
  });
}

// Usage in component
const { data: availability } = useEventAvailability(formData.event_id, formData.party_size);

{availability && (
  <p className={availability.available ? 'text-green-600' : 'text-red-600'}>
    {availability.message}
  </p>
)}
```

---

## Best Practices

1. **Validate early and often:**
   - Client-side: Immediate feedback
   - Database: Enforce constraints
   - RLS: Permission checks

2. **Provide helpful error messages:**
   ```typescript
   // ❌ Bad
   throw new Error('Invalid');

   // ✅ Good
   throw new Error('Party size must be between 1 and 20 guests');
   ```

3. **Preserve form state on errors:**
   ```typescript
   onError: () => {
     // Don't reset form on error
     // Let user fix and resubmit
   }
   ```

4. **Validate atomically:**
   ```sql
   -- Use database functions for multi-step validation
   -- Ensures all-or-nothing operations
   ```

5. **Show validation status:**
   ```typescript
   {errors.email && <p className="text-red-500">{errors.email.message}</p>}
   {isValidating && <Loader2 className="animate-spin" />}
   ```

---

## Common Validation Patterns

**Date validation:**
```typescript
event_date: z.string().refine(
  (date) => new Date(date) >= new Date(),
  'Event date must be in the future'
)
```

**Phone validation:**
```typescript
phone: z.string().regex(
  /^\+?[1-9]\d{1,14}$/,
  'Invalid phone number format'
).optional()
```

**Custom async validation:**
```typescript
email: z.string().email().refine(
  async (email) => {
    const { data } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email)
      .single();
    return !data; // Email must not exist
  },
  'Email already registered'
)
```

---

## Error Handling

**Handle specific error types:**

```typescript
onError: (error: Error) => {
  if (error.message.includes('duplicate')) {
    toast.error('This booking already exists');
  } else if (error.message.includes('capacity')) {
    toast.error('Event is full');
  } else if (error.message.includes('permission')) {
    toast.error('You do not have permission');
  } else {
    toast.error('Something went wrong', {
      description: error.message,
    });
  }
}
```

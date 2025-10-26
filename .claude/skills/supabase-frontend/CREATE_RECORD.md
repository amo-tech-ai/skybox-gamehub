# Create Record Pattern

Complete examples for creating new records in Supabase using React Query mutations.

## Pattern Overview

**Use for:** Reserve page (bookings), contact forms, profile creation

**Components:**
1. Create mutation hook with React Query
2. Handle optimistic updates
3. Show success/error feedback
4. Invalidate related queries

---

## Example 1: Create Booking

**Use case:** Reserve page booking form

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useCreateBooking.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingData {
  event_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  party_size: number;
  special_requests?: string;
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingData) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ...booking,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Invalidate bookings queries to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] });

      // Show success message
      toast.success('Booking created successfully!', {
        description: `Confirmation sent to ${data.customer_email}`,
      });
    },
    onError: (error: Error) => {
      // Show error message
      toast.error('Failed to create booking', {
        description: error.message,
      });
    },
  });
}
```

### Step 2: Use in Component

**File:** `/src/pages/Reserve.tsx`

```typescript
import { useState } from 'react';
import { useCreateBooking } from '@/hooks/useCreateBooking';
import { useEvents } from '@/hooks/useEvents';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function Reserve() {
  const { data: events } = useEvents();
  const createBooking = useCreateBooking();

  const [formData, setFormData] = useState({
    event_id: '',
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    party_size: 2,
    special_requests: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.event_id) {
      toast.error('Please select an event');
      return;
    }

    if (!formData.customer_name || !formData.customer_email) {
      toast.error('Name and email are required');
      return;
    }

    // Create booking
    createBooking.mutate(formData, {
      onSuccess: () => {
        // Reset form
        setFormData({
          event_id: '',
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          party_size: 2,
          special_requests: '',
        });
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Reserve Your Spot</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Select Event *
          </label>
          <select
            value={formData.event_id}
            onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Choose an event</option>
            {events?.map(event => (
              <option key={event.event_id} value={event.event_id}>
                {event.description} - {event.event_date}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.customer_email}
            onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone (optional)
          </label>
          <Input
            type="tel"
            value={formData.customer_phone}
            onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
          />
        </div>

        {/* Party size */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Party Size *
          </label>
          <Input
            type="number"
            min={1}
            max={20}
            value={formData.party_size}
            onChange={(e) => setFormData({ ...formData, party_size: parseInt(e.target.value) })}
            required
          />
        </div>

        {/* Special requests */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Special Requests (optional)
          </label>
          <Textarea
            value={formData.special_requests}
            onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
            rows={4}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          disabled={createBooking.isPending}
          className="w-full"
        >
          {createBooking.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Booking...
            </>
          ) : (
            'Reserve Now'
          )}
        </Button>
      </form>
    </div>
  );
}
```

---

## Example 2: Create Profile

**Use case:** User registration or profile setup

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useCreateProfile.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ProfileData {
  email: string;
  full_name: string;
  phone?: string;
  role?: string;
}

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: ProfileData) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          ...profile,
          role: profile.role || 'customer',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success('Profile created successfully!');
    },
    onError: (error: Error) => {
      toast.error('Failed to create profile', {
        description: error.message,
      });
    },
  });
}
```

---

## Example 3: Contact Form Submission

**Use case:** Contact page form

### Step 1: Create Mutation Hook

**File:** `/src/hooks/useContactForm.ts`

```typescript
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function useContactForm() {
  return useMutation({
    mutationFn: async (contact: ContactData) => {
      // Assuming you have a contact_submissions table
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert({
          ...contact,
          status: 'new',
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      // Optionally trigger email notification via Edge Function
      await supabase.functions.invoke('send-contact-email', {
        body: contact,
      });

      return data;
    },
    onSuccess: () => {
      toast.success('Message sent successfully!', {
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to send message', {
        description: error.message,
      });
    },
  });
}
```

### Step 2: Use in Component

```typescript
import { useState } from 'react';
import { useContactForm } from '@/hooks/useContactForm';

export default function Contact() {
  const contactForm = useContactForm();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactForm.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: '', email: '', subject: '', message: '' });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button
        type="submit"
        disabled={contactForm.isPending}
      >
        {contactForm.isPending ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

---

## Advanced: Optimistic Updates

**Use case:** Instant UI feedback before server confirms

```typescript
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingData) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert(booking)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onMutate: async (newBooking) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['bookings'] });

      // Snapshot previous value
      const previousBookings = queryClient.getQueryData(['bookings']);

      // Optimistically update UI
      queryClient.setQueryData(['bookings'], (old: any) => {
        return [...(old || []), { ...newBooking, booking_id: 'temp-id', status: 'pending' }];
      });

      // Return context with snapshot
      return { previousBookings };
    },
    onError: (err, newBooking, context) => {
      // Rollback on error
      if (context?.previousBookings) {
        queryClient.setQueryData(['bookings'], context.previousBookings);
      }
      toast.error('Failed to create booking');
    },
    onSettled: () => {
      // Refetch to sync with server
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}
```

---

## Best Practices

1. **Always validate before submitting:**
   ```typescript
   if (!formData.required_field) {
     toast.error('Field is required');
     return;
   }
   ```

2. **Show loading state:**
   ```typescript
   disabled={mutation.isPending}
   ```

3. **Invalidate related queries:**
   ```typescript
   queryClient.invalidateQueries({ queryKey: ['bookings'] });
   ```

4. **Reset form on success:**
   ```typescript
   onSuccess: () => {
     setFormData(initialState);
   }
   ```

5. **Use `.select().single()` for created record:**
   ```typescript
   .insert(data)
   .select()
   .single() // Returns object, not array
   ```

---

## Common Mistakes

**Mistake 1: Not checking for errors**
```typescript
// ❌ Bad: Doesn't check error
const { data } = await supabase.from('bookings').insert(booking);

// ✅ Good: Checks error
const { data, error } = await supabase.from('bookings').insert(booking);
if (error) throw error;
```

**Mistake 2: Forgetting to invalidate queries**
```typescript
// ❌ Bad: UI won't update with new data
onSuccess: () => {
  toast.success('Created!');
}

// ✅ Good: Refetches related data
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['bookings'] });
  toast.success('Created!');
}
```

**Mistake 3: Not disabling submit button**
```typescript
// ❌ Bad: Can submit multiple times
<button type="submit">Submit</button>

// ✅ Good: Disabled during submission
<button type="submit" disabled={mutation.isPending}>
  {mutation.isPending ? 'Submitting...' : 'Submit'}
</button>
```

---

## Toast Notifications

**Install Sonner:**
```bash
npm install sonner
```

**Setup in main.tsx:**
```typescript
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <YourRoutes />
      <Toaster position="top-right" />
    </>
  );
}
```

**Usage:**
```typescript
import { toast } from 'sonner';

toast.success('Success message');
toast.error('Error message');
toast.info('Info message');
toast.loading('Loading...');
```

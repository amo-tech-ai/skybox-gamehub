# Troubleshooting Guide

Common issues and solutions when integrating Supabase with React frontend.

---

## 401 Unauthorized Error

**Symptom:** Queries fail with "Row level security policy violation" or 401 error

**Causes:**
1. No RLS policy exists for the table
2. RLS policy doesn't allow SELECT for anonymous users
3. Missing authentication token

**Solutions:**

### Check RLS Policies

**In Supabase Dashboard:**
1. Go to Authentication → Policies
2. Select the table (e.g., `events`)
3. Verify policy exists for SELECT operation
4. Check policy definition allows your use case

**Add public read policy:**
```sql
-- Allow anyone to read published events
CREATE POLICY "Public can view published events"
ON events FOR SELECT
USING (status = 'published');

-- Allow anyone to read venues
CREATE POLICY "Public can view venues"
ON venues FOR SELECT
USING (true);
```

**Verify policy works:**
```sql
-- Test as anonymous user
SELECT * FROM events WHERE status = 'published' LIMIT 1;
```

**In React app:**
```typescript
const { data, error } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published');

if (error) {
  console.error('Error:', error.message);
  // "Row level security policy violation" = missing RLS policy
}
```

---

## No Data Returned

**Symptom:** Query succeeds but returns empty array

**Causes:**
1. No records match filter criteria
2. Table is empty
3. Wrong filter conditions
4. RLS policy filtering out data

**Solutions:**

### Check Database Has Data

**In Supabase Dashboard:**
1. Go to Table Editor
2. Select table (e.g., `events`)
3. Verify records exist
4. Check `status` column values

### Verify Filter Conditions

```typescript
// ❌ Bad: Might be filtering out all records
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('status', 'published')  // Check this value exists
  .gte('event_date', '2025-10-24'); // Check dates are in future

console.log('Found:', data?.length, 'events');

// ✅ Good: Test without filters first
const { data: allEvents } = await supabase
  .from('events')
  .select('*');

console.log('Total events:', allEvents?.length);
// If this returns data, your filters are too restrictive
```

### Check RLS Policy

```sql
-- RLS policy might be filtering rows
-- Test query in Supabase SQL Editor
SELECT * FROM events;

-- If this returns data but React app doesn't,
-- RLS policy is blocking anonymous access
```

---

## Foreign Key Join Fails

**Symptom:** `venue` field is null or join doesn't work

**Causes:**
1. Wrong foreign key column name
2. Incorrect join syntax
3. Venue record doesn't exist
4. RLS policy blocks venue access

**Solutions:**

### Verify Foreign Key Names

```sql
-- Check actual foreign key definition
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
  AND tc.table_name = 'events';
```

### Correct Join Syntax

```typescript
// If FK points to venues.id
const { data } = await supabase
  .from('events')
  .select(`
    *,
    venue:venues!venue_id(venue_name, location)
  `);

// If FK points to venues.venue_id
const { data } = await supabase
  .from('events')
  .select(`
    *,
    venue:venues!events_venue_id_fkey(venue_name, location)
  `);
```

### Handle Null Venues

```typescript
// Always check if venue exists
venue={event.venue?.venue_name ?? 'Venue TBA'}

// Or filter out events without venues
.select('*, venue:venues(*)')
.not('venue_id', 'is', null)
```

---

## Type Errors

**Symptom:** TypeScript errors about database types

**Solutions:**

### Generate Types

```bash
# Generate types from Supabase schema
npx supabase gen types typescript --project-id {your-project-id} > src/types/database.types.ts
```

### Use Generated Types

```typescript
import { Database } from '@/types/database.types';

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];
type EventUpdate = Database['public']['Tables']['events']['Update'];

const { data } = await supabase
  .from('events')
  .select('*')
  .returns<Event[]>();
```

---

## Slow Queries

**Symptom:** Queries take several seconds to return

**Solutions:**

### Add Database Indexes

```sql
-- Index for events page query
CREATE INDEX IF NOT EXISTS idx_events_status_date
ON events(status, event_date)
WHERE status = 'published';

-- Index for bookings by email
CREATE INDEX IF NOT EXISTS idx_bookings_email
ON bookings(customer_email);

-- Index for menu items by category
CREATE INDEX IF NOT EXISTS idx_menu_items_category
ON menu_items(category)
WHERE available = true;
```

### Optimize Query

```typescript
// ❌ Bad: Fetches all columns
const { data } = await supabase
  .from('events')
  .select('*');

// ✅ Good: Only fetch needed columns
const { data } = await supabase
  .from('events')
  .select('event_id, event_date, description');
```

### Add Pagination

```typescript
// ❌ Bad: Fetches all records
const { data } = await supabase
  .from('events')
  .select('*');

// ✅ Good: Paginate results
const { data } = await supabase
  .from('events')
  .select('*')
  .range(0, 9); // First 10 records
```

---

## Environment Variables Not Working

**Symptom:** App works locally but fails in production

**Solutions:**

### Check Vercel Environment Variables

1. Go to Vercel Dashboard
2. Project Settings → Environment Variables
3. Add variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Select all environments: Production, Preview, Development
5. Save and redeploy

### Verify .env.local Format

```bash
# ✅ Correct format
VITE_SUPABASE_URL=https://project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# ❌ Wrong: Extra quotes
VITE_SUPABASE_URL="https://project-id.supabase.co"

# ❌ Wrong: Missing VITE_ prefix
SUPABASE_URL=https://project-id.supabase.co
```

### Check Variables Load

```typescript
// Add this to debug
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error('Missing VITE_SUPABASE_URL environment variable');
}
```

---

## React Query Not Refetching

**Symptom:** Data doesn't update after mutation

**Solutions:**

### Invalidate Queries

```typescript
export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking) => {
      // ... create booking
    },
    onSuccess: () => {
      // ✅ Invalidate to trigger refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
```

### Check Query Keys Match

```typescript
// ❌ Bad: Keys don't match
const { data } = useQuery({ queryKey: ['booking'] }); // Missing 's'
queryClient.invalidateQueries({ queryKey: ['bookings'] }); // Won't refetch

// ✅ Good: Keys match exactly
const { data } = useQuery({ queryKey: ['bookings'] });
queryClient.invalidateQueries({ queryKey: ['bookings'] });
```

---

## CORS Errors

**Symptom:** "CORS policy blocked" error in browser console

**Solutions:**

### Add Allowed Origins in Supabase

1. Go to Supabase Dashboard
2. Settings → API
3. Add your domain to "CORS Origins"
4. Examples:
   - `http://localhost:5173` (local dev)
   - `https://skybox-gamehub.vercel.app` (production)
   - `https://*.vercel.app` (all Vercel previews)

---

## Real-Time Not Working

**Symptom:** No real-time updates received

**Solutions:**

### Enable Replication

1. Go to Database → Replication
2. Select table (e.g., `bookings`)
3. Enable replication
4. Choose events: INSERT, UPDATE, DELETE

### Check RLS Allows SELECT

```sql
-- Users must have SELECT permission for real-time
CREATE POLICY "Users can view bookings realtime"
ON bookings FOR SELECT
USING (auth.role() = 'authenticated');
```

### Verify Subscription Code

```typescript
useEffect(() => {
  const channel = supabase
    .channel('bookings-channel')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings' },
      (payload) => {
        console.log('Real-time update:', payload); // Debug
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status); // Should be 'SUBSCRIBED'
    });

  return () => {
    supabase.removeChannel(channel); // Must clean up
  };
}, [queryClient]);
```

---

## Date/Time Formatting Issues

**Symptom:** Times display incorrectly

**Solutions:**

### Document Timezone Assumptions

```typescript
// Database stores times in Eastern Time (ET)
// Display must show both ET and COT

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours);

  // Assume database time is ET
  const etHour = hour > 12 ? hour - 12 : hour;
  const cotHour = etHour === 1 ? 12 : etHour - 1; // COT = ET - 1
  const period = hour >= 12 ? 'PM' : 'AM';

  return `${etHour}:${minutes} ${period} ET / ${cotHour}:${minutes} ${period} COT`;
}
```

### Use Consistent Date Formats

```typescript
// ✅ Good: ISO format for database queries
.gte('event_date', new Date().toISOString().split('T')[0])

// ❌ Bad: Locale-dependent format
.gte('event_date', new Date().toLocaleDateString())
```

---

## Image Upload Failures

**Symptom:** Images don't upload to Supabase Storage

**Solutions:**

### Check Storage Bucket Exists

1. Go to Storage in Supabase Dashboard
2. Create bucket (e.g., `event-images`)
3. Set as public or private

### Add Storage RLS Policy

```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

-- Allow public to view images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-images');
```

### Upload Code

```typescript
const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('event-images')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error.message);
    return null;
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('event-images')
    .getPublicUrl(fileName);

  return publicUrl;
};
```

---

## Memory Leaks

**Symptom:** App slows down over time, browser crashes

**Solutions:**

### Clean Up Subscriptions

```typescript
useEffect(() => {
  const channel = supabase.channel('bookings');
  channel.subscribe();

  // ✅ Must clean up
  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

### Abort Queries on Unmount

```typescript
useEffect(() => {
  const controller = new AbortController();

  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data));

  return () => {
    controller.abort(); // Cancel pending request
  };
}, [url]);
```

---

## Common Error Messages

**"relation does not exist"**
- Table name is misspelled
- Table doesn't exist in database
- Using wrong schema (should be 'public')

**"null value in column violates not-null constraint"**
- Required field is missing
- Check table schema for NOT NULL columns

**"duplicate key value violates unique constraint"**
- Trying to insert duplicate value in unique field
- Check for existing record first

**"permission denied for table"**
- RLS policy blocks access
- User not authenticated
- Missing policy for operation

**"invalid input syntax for type uuid"**
- Passing string instead of UUID
- Use `uuid_generate_v4()` in SQL or generate UUID in code

---

## Debug Checklist

When something doesn't work:

1. ✅ Check browser console for errors
2. ✅ Verify environment variables are set
3. ✅ Check RLS policies exist and are correct
4. ✅ Test query in Supabase SQL Editor
5. ✅ Verify table has data
6. ✅ Check foreign key relationships
7. ✅ Confirm replication is enabled (for real-time)
8. ✅ Validate query syntax
9. ✅ Check React Query DevTools
10. ✅ Review Supabase logs (Logs section in dashboard)

---

## Getting Help

**Supabase Discord:** https://discord.supabase.com
**Supabase Docs:** https://supabase.com/docs
**GitHub Issues:** https://github.com/supabase/supabase/issues

**When asking for help, include:**
1. Error message (full text)
2. Code that's failing
3. Table schema
4. RLS policies
5. What you've already tried

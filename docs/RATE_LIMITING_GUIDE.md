# WhatsApp Confirmation - Rate Limiting & Tracking

## ✅ What's Implemented

### 1. Database Tracking Table
**Table:** `event_confirmations`

Tracks every WhatsApp confirmation attempt with:
- `booking_id` - Links to the booking
- `event_id` - Links to the event
- `phone` - User's WhatsApp number
- `name` - User's name
- `status` - Current status (pending, sent, failed)
- `message_id` - Twilio message ID (for tracking delivery)
- `error_message` - Error details if failed
- `sent_at` - When message was sent
- `delivered_at` - When message was delivered (future enhancement)
- `metadata` - Event details (JSON)

### 2. Rate Limiting
**Rule:** Max 1 confirmation per phone number per event

**How it works:**
1. Before sending, check if confirmation already exists for phone + event
2. If exists with status='sent', return success without sending duplicate
3. If doesn't exist, proceed with sending

**Example:**
```typescript
// User tries to book same event twice with same phone
// First booking: ✅ WhatsApp sent
// Second booking: ✅ Booking created, but WhatsApp NOT sent (rate limited)
```

### 3. Status Tracking
Confirmations go through states:

```
pending → sent (success)
        ↓
      failed (error)
```

- **pending**: Created before Twilio call
- **sent**: Twilio returned success
- **failed**: Twilio returned error

---

## 🔍 How to Monitor

### View All Confirmations
```sql
-- Recent confirmations
SELECT 
  name,
  phone,
  status,
  metadata->>'eventName' as event_name,
  sent_at,
  error_message
FROM event_confirmations
ORDER BY created_at DESC
LIMIT 50;
```

### Check Success Rate
```sql
-- Success rate by status
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM event_confirmations
GROUP BY status;
```

### Find Failed Confirmations
```sql
-- See what's failing
SELECT 
  name,
  phone,
  metadata->>'eventName' as event,
  error_message,
  created_at
FROM event_confirmations
WHERE status = 'failed'
ORDER BY created_at DESC;
```

### Rate Limited Attempts
```sql
-- Find users who tried to book same event multiple times
SELECT 
  phone,
  event_id,
  COUNT(*) as attempts
FROM event_confirmations
WHERE event_id IS NOT NULL
GROUP BY phone, event_id
HAVING COUNT(*) > 1
ORDER BY attempts DESC;
```

---

## 🧪 Testing Rate Limiting

### Test 1: First Booking (Should Send)
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+573001234567",
    "eventName": "NFL Sunday",
    "eventDate": "2025-12-01",
    "eventId": "event-uuid-here"
  }'
```

**Expected:**
```json
{
  "success": true,
  "message": "WhatsApp event confirmation sent successfully!",
  "messageId": "SM...",
  "confirmationId": "confirmation-uuid"
}
```

### Test 2: Duplicate Booking (Should Rate Limit)
Run the SAME command again immediately.

**Expected:**
```json
{
  "success": true,
  "message": "Confirmation already sent for this event",
  "rateLimited": true,
  "existingConfirmation": {
    "id": "...",
    "sent_at": "2025-11-17T...",
    "status": "sent"
  }
}
```

### Test 3: Different Event (Should Send)
Same phone, different eventId.

**Expected:** New message sent ✅

---

## 📊 Analytics Queries

### Daily Confirmations
```sql
SELECT 
  DATE(sent_at) as date,
  COUNT(*) as total_sent,
  COUNT(CASE WHEN status = 'sent' THEN 1 END) as successful,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed
FROM event_confirmations
WHERE sent_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(sent_at)
ORDER BY date DESC;
```

### Most Active Events
```sql
SELECT 
  metadata->>'eventName' as event_name,
  COUNT(*) as confirmations_sent,
  COUNT(DISTINCT phone) as unique_users
FROM event_confirmations
WHERE status = 'sent'
GROUP BY metadata->>'eventName'
ORDER BY confirmations_sent DESC
LIMIT 10;
```

### Phone Numbers with Multiple Bookings
```sql
SELECT 
  phone,
  COUNT(DISTINCT event_id) as events_booked,
  COUNT(*) as total_confirmations,
  ARRAY_AGG(DISTINCT metadata->>'eventName') as events
FROM event_confirmations
WHERE status = 'sent'
GROUP BY phone
HAVING COUNT(DISTINCT event_id) > 1
ORDER BY events_booked DESC;
```

---

## 🚨 Common Issues

### Issue 1: Rate Limiting Not Working
**Symptom:** Duplicate messages sent

**Check:**
```sql
-- Verify rate limiting queries work
SELECT * FROM event_confirmations 
WHERE phone = '+573001234567' 
AND event_id = 'event-uuid'
AND status = 'sent';
```

**Fix:** Ensure `eventId` is being passed from frontend

### Issue 2: All Confirmations Failing
**Symptom:** All status = 'failed'

**Check Twilio Logs:**
https://console.twilio.com/us1/monitor/logs/messages

**Common causes:**
- Invalid phone format
- Twilio account suspended
- Sandbox not joined
- API credentials wrong

### Issue 3: Confirmations Not Saving
**Symptom:** WhatsApp sends but no DB record

**Check RLS Policies:**
```sql
-- Verify anon can insert
SELECT * FROM pg_policies 
WHERE tablename = 'event_confirmations'
AND cmd = 'INSERT';
```

**Fix:** Ensure policy exists:
```sql
CREATE POLICY "System can insert event confirmations"
ON public.event_confirmations
FOR INSERT TO anon
WITH CHECK (true);
```

---

## 🎯 Future Enhancements

### 1. Delivery Status Tracking
Use Twilio webhooks to update `delivered_at`:

```typescript
// Add webhook endpoint
const deliveryWebhook = async (req: Request) => {
  const { MessageSid, MessageStatus } = await req.json();
  
  if (MessageStatus === 'delivered') {
    await supabase
      .from('event_confirmations')
      .update({ delivered_at: new Date().toISOString() })
      .eq('message_id', MessageSid);
  }
};
```

### 2. Time-Based Rate Limiting
Allow 1 message per phone per event per 24 hours:

```typescript
const { data } = await supabase
  .from('event_confirmations')
  .select('id, sent_at')
  .eq('phone', phone)
  .eq('event_id', eventId)
  .eq('status', 'sent')
  .gte('sent_at', new Date(Date.now() - 24*60*60*1000).toISOString())
  .maybeSingle();
```

### 3. Retry Failed Messages
Background job to retry failed confirmations:

```sql
-- Find failed confirmations to retry
SELECT * FROM event_confirmations
WHERE status = 'failed'
AND created_at >= NOW() - INTERVAL '1 hour'
AND metadata->>'retryCount' IS NULL;
```

---

## ✅ Verification Checklist

Before considering this feature complete:

- [ ] Rate limiting works (test with duplicate bookings)
- [ ] All confirmations tracked in database
- [ ] Success rate > 95%
- [ ] Failed confirmations have error messages
- [ ] No duplicate messages sent
- [ ] Monitoring queries work
- [ ] RLS policies secure (staff can view, users can view own)
- [ ] Edge function logs show rate limiting

---

## 📚 Resources

- **Supabase Dashboard:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni
- **Edge Function Logs:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs
- **Database Editor:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/editor
- **Twilio Console:** https://console.twilio.com

---

**Status:** ✅ Implemented and Ready for Testing

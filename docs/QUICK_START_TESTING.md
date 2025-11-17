# Quick Start: Testing WhatsApp Event Confirmation

## 🚀 Ready to Test!

Your WhatsApp event confirmation system is fully implemented with:
- ✅ Edge function with rate limiting
- ✅ Database tracking table
- ✅ Frontend integration
- ✅ Spam prevention

---

## 📋 Test in 3 Steps

### Step 1: Test Edge Function Directly (2 minutes)

Open terminal and run (replace phone with YOUR test number):

```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+573001234567",
    "eventName": "NFL Sunday Watch Party",
    "eventDate": "Domingo, 1 de diciembre de 2025",
    "eventTime": "19:00",
    "eventLocation": "Skybox Medellín"
  }'
```

**✅ Success:** You receive WhatsApp message within 10 seconds

**Check logs:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs

---

### Step 2: Test Rate Limiting (1 minute)

Run the SAME curl command again immediately.

**✅ Expected:** Response says "Confirmation already sent for this event" (no duplicate message)

---

### Step 3: Test Full Booking Flow (3 minutes)

1. Go to https://[your-app-url]/reserve
2. Sign in with Google
3. Fill the form:
   - Select an event
   - Party size: 4
   - **WhatsApp:** +57XXXXXXXXXX (your number)
   - Special requests: "Test booking"
4. Click "Confirm Reservation"

**✅ Success checklist:**
- [ ] Toast notification: "¡Reserva Confirmada! 🎉"
- [ ] Message mentions WhatsApp
- [ ] WhatsApp received within 10 seconds
- [ ] Message in Spanish with emojis
- [ ] Booking appears in database
- [ ] Confirmation tracked in `event_confirmations` table

---

## 🔍 Verify Results

### Check Database

**View confirmations:**
```sql
SELECT 
  name,
  phone,
  status,
  metadata->>'eventName' as event,
  sent_at
FROM event_confirmations
ORDER BY created_at DESC
LIMIT 10;
```

**Success rate:**
```sql
SELECT 
  status,
  COUNT(*) as count
FROM event_confirmations
GROUP BY status;
```

**Dashboard:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/editor

---

## 🎯 What Should Work

### ✅ First Booking
- WhatsApp sent immediately
- Status: "sent"
- Message ID stored
- User sees Spanish success message

### ✅ Duplicate Booking (Same Phone + Event)
- No WhatsApp sent (rate limited)
- Booking still created
- User sees generic success
- No duplicate messages

### ✅ Failed Send
- Error logged in database
- Status: "failed"
- Error message stored
- Booking still succeeds
- User sees fallback message

---

## 🐛 Troubleshooting

### WhatsApp Not Received?

**Check phone format:** Must be E.164 (+573001234567)

**Verify Twilio:**
- Sandbox joined? https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
- Check logs: https://console.twilio.com/us1/monitor/logs/messages

**Check secrets:**
```bash
# Verify in Supabase dashboard
TWILIO_ACCOUNT_SID=?
TWILIO_AUTH_TOKEN=?
TWILIO_WHATSAPP_FROM=?
```

### Rate Limiting Not Working?

**Check if eventId is passed:**
```typescript
// In Reserve.tsx - should include:
eventId: selectedEvent.id,
bookingId: booking.id,
```

**Verify database:**
```sql
-- Should see records
SELECT * FROM event_confirmations 
WHERE event_id IS NOT NULL;
```

### Database Not Saving?

**Check RLS policy:**
```sql
-- Should exist
SELECT * FROM pg_policies 
WHERE tablename = 'event_confirmations'
AND cmd = 'INSERT'
AND roles = '{anon}';
```

---

## 📊 Monitor Performance

### Edge Function Logs
https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs

**Look for:**
- "Event confirmation requested for:"
- "WhatsApp event confirmation sent successfully:"
- "Rate limit: Confirmation already sent:"

### Twilio Logs
https://console.twilio.com/us1/monitor/logs/messages

**Check:**
- Message status (sent/delivered/failed)
- Delivery time
- Error codes

### Database Stats
```sql
-- Today's stats
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN status = 'sent' THEN 1 END) as sent,
  COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed,
  ROUND(COUNT(CASE WHEN status = 'sent' THEN 1 END) * 100.0 / COUNT(*), 2) as success_rate
FROM event_confirmations
WHERE created_at >= CURRENT_DATE;
```

---

## ✅ Success Criteria

Your system is working if:

- [x] Edge function responds in < 2 seconds
- [x] WhatsApp delivers in < 10 seconds  
- [x] Message formatting correct (emojis, Spanish, line breaks)
- [x] Rate limiting prevents duplicates
- [x] All confirmations tracked in database
- [x] Failed sends logged with errors
- [x] Booking succeeds even if WhatsApp fails
- [x] Mobile responsive
- [x] Toast notifications work

---

## 🎉 You're Done!

If all tests pass, your WhatsApp event confirmation system is **production-ready**!

### Next Steps:
1. Monitor first 10 real bookings
2. Check success rate (target: >95%)
3. Review Twilio costs
4. Gather user feedback
5. Consider enhancements:
   - Delivery status webhooks
   - Reminder messages
   - Cancellation notifications

---

## 📞 Support

**Issues?** Check these resources:
- [Testing Guide](./TESTING_GUIDE.md)
- [Rate Limiting Guide](./RATE_LIMITING_GUIDE.md)
- [Implementation Plan](./WHATSAPP_EVENT_CONFIRMATION_PLAN.md)
- [Curl Test Commands](./CURL_TEST_COMMAND.md)

**Still stuck?** Review edge function logs and Twilio console first.

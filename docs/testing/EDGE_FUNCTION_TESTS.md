# Edge Function Testing Guide

## Global Test Checklist

- [ ] event-confirmation tested
- [ ] vip-broadcast tested
- [ ] event-registration-check tested
- [ ] twilio-status-webhook tested
- [ ] event-analytics-daily tested
- [ ] event-feedback-request tested
- [ ] loyalty-points-update tested
- [ ] sports-video-sync tested

---

## Test Setup

Base URL: `https://dbocegamkdnsorhtdbni.supabase.co/functions/v1`

For functions that require authentication, add header:
```bash
-H "Authorization: Bearer YOUR_ANON_KEY"
```

Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRib2NlZ2Fta2Ruc29yaHRkYm5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyMDg2NzUsImV4cCI6MjA3Njc4NDY3NX0.FXHEFdsYeglPlEST2-VvUI7nqVXOjQJh39T0pFIjVSs`

---

## 1. event-confirmation

**Purpose**: Send WhatsApp confirmation when user registers for an event

**Endpoint**: `POST /event-confirmation`

**Test Command**:
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "123e4567-e89b-12d3-a456-426614174000",
    "bookingId": "123e4567-e89b-12d3-a456-426614174001",
    "phone": "+573001234567",
    "name": "Juan Pérez"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "messageSid": "SM..."
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] WhatsApp message received on test phone
- [ ] Record created in `event_confirmations` table
- [ ] Duplicate check prevents second message
- [ ] Logs show successful Twilio API call

---

## 2. vip-broadcast

**Purpose**: Send promotional WhatsApp to customer segments

**Endpoint**: `POST /vip-broadcast`

**Test Command** (VIP segment):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/vip-broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "segment": "vip",
    "message": "🎉 Promoción exclusiva VIP: 20% OFF en tu próxima reserva. Código: VIP20"
  }'
```

**Test Command** (All segment):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/vip-broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "segment": "all",
    "message": "🏈 NFL Sunday! Ven a Skybox para ver los mejores partidos en pantalla gigante."
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "sentCount": 25,
  "failedCount": 0,
  "totalCustomers": 25
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Correct number of messages sent
- [ ] Test phone receives message (if in segment)
- [ ] Function respects 500 message limit
- [ ] Logs show all sends with status
- [ ] Failed sends logged with error

---

## 3. event-registration-check

**Purpose**: Check if phone is already registered for event (prevent duplicates)

**Endpoint**: `POST /event-registration-check`

**Test Command** (New registration):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-registration-check \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "123e4567-e89b-12d3-a456-426614174000",
    "phone": "+573009999999"
  }'
```

**Expected Response** (Not registered):
```json
{
  "exists": false,
  "registration": null
}
```

**Expected Response** (Already registered):
```json
{
  "exists": true,
  "registration": {
    "id": "...",
    "status": "sent"
  }
}
```

**Verification Checklist**:
- [ ] Returns `exists: false` for new phone
- [ ] Returns `exists: true` for existing registration
- [ ] Response time < 200ms
- [ ] No records created (read-only operation)
- [ ] Works with E.164 formatted phones

---

## 4. twilio-status-webhook

**Purpose**: Receive delivery status updates from Twilio

**Endpoint**: `POST /twilio-status-webhook`

⚠️ **Note**: This is called by Twilio, not browsers. Test with Twilio dev payload.

**Test Command** (Simulate Twilio webhook):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/twilio-status-webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "MessageSid=SM1234567890abcdef" \
  -d "MessageStatus=delivered" \
  -d "To=whatsapp:+573001234567" \
  -d "From=whatsapp:+14155238886"
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Status updated successfully"
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Updates `event_confirmations.status` to "delivered"
- [ ] Sets `delivered_at` timestamp
- [ ] Handles "failed" status with error message
- [ ] Logs show MessageSid and status
- [ ] No CORS errors (webhook doesn't need CORS)

**Twilio Configuration**:
1. Go to Twilio Console → WhatsApp Senders
2. Set Status Callback URL to:
   ```
   https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/twilio-status-webhook
   ```

---

## 5. event-analytics-daily

**Purpose**: Generate daily stats per event (cron job)

**Endpoint**: `POST /event-analytics-daily`

**Test Command** (Manual trigger):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-analytics-daily \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Daily analytics generated successfully",
  "date": "2025-11-17",
  "statsGenerated": 12
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Creates/updates rows in `event_stats_daily`
- [ ] Stats match expected counts from `event_confirmations`
- [ ] Runs automatically at 03:00 daily (check logs next day)
- [ ] Handles events with no activity (0 stats)
- [ ] Query: `SELECT * FROM event_stats_daily ORDER BY date DESC LIMIT 10`

---

## 6. event-feedback-request

**Purpose**: Send feedback request WhatsApp after event

**Endpoint**: `POST /event-feedback-request`

**Test Command**:
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-feedback-request \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "123e4567-e89b-12d3-a456-426614174000",
    "feedbackLink": "https://forms.gle/skybox-feedback"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "sentCount": 15,
  "failedCount": 0
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Test phone receives feedback request
- [ ] Message includes event name and date
- [ ] Includes feedback link if provided
- [ ] Sends to all event registrations
- [ ] Logs show send status per recipient

---

## 7. loyalty-points-update

**Purpose**: Add loyalty points for customer actions

**Endpoint**: `POST /loyalty-points-update`

**Test Command** (Check-in):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/loyalty-points-update \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "123e4567-e89b-12d3-a456-426614174000",
    "reason": "checkin",
    "amount": 10
  }'
```

**Test Command** (VIP bonus):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/loyalty-points-update \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "123e4567-e89b-12d3-a456-426614174000",
    "reason": "vip-bonus",
    "amount": 20
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "newTotal": 50,
  "added": 10
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Updates `profiles.loyalty_points` (or customer points field)
- [ ] Creates row in `loyalty_history` table
- [ ] Correct default points per reason
- [ ] Can override amount
- [ ] Multiple calls accumulate points
- [ ] Query: `SELECT * FROM loyalty_history ORDER BY created_at DESC LIMIT 10`

---

## 8. sports-video-sync

**Purpose**: Sync YouTube sports highlights to videos table

**Endpoint**: `POST /sports-video-sync`

**Test Command** (Manual trigger):
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/sports-video-sync \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Sports video sync completed",
  "inserted": 25,
  "updated": 5,
  "errors": 0
}
```

**Verification Checklist**:
- [ ] Returns 200 status
- [ ] Creates rows in `videos` table
- [ ] Each video has `source = 'youtube'`, `source_id`, `title`, `sport`
- [ ] Duplicate videos are updated, not duplicated
- [ ] Runs automatically every 4 hours (check logs)
- [ ] YouTube API quota not exceeded
- [ ] Query: `SELECT * FROM videos WHERE is_active = true ORDER BY created_at DESC LIMIT 10`

---

## Quick Test All

Run this script to test all functions:

```bash
#!/bin/bash
BASE_URL="https://dbocegamkdnsorhtdbni.supabase.co/functions/v1"

echo "Testing event-confirmation..."
curl -s -X POST $BASE_URL/event-confirmation -H "Content-Type: application/json" -d '{"eventId":"test","bookingId":"test","phone":"+573001234567","name":"Test"}' | jq

echo "Testing event-registration-check..."
curl -s -X POST $BASE_URL/event-registration-check -H "Content-Type: application/json" -d '{"eventId":"test","phone":"+573001234567"}' | jq

echo "Testing vip-broadcast..."
curl -s -X POST $BASE_URL/vip-broadcast -H "Content-Type: application/json" -d '{"segment":"vip","message":"Test"}' | jq

echo "Testing event-analytics-daily..."
curl -s -X POST $BASE_URL/event-analytics-daily -H "Content-Type: application/json" -d '{}' | jq

echo "Testing event-feedback-request..."
curl -s -X POST $BASE_URL/event-feedback-request -H "Content-Type: application/json" -d '{"eventId":"test"}' | jq

echo "Testing loyalty-points-update..."
curl -s -X POST $BASE_URL/loyalty-points-update -H "Content-Type: application/json" -d '{"customerId":"test","reason":"checkin"}' | jq

echo "Testing sports-video-sync..."
curl -s -X POST $BASE_URL/sports-video-sync -H "Content-Type: application/json" -d '{}' | jq

echo "All tests complete!"
```

Save as `test-all-functions.sh`, make executable, and run:
```bash
chmod +x test-all-functions.sh
./test-all-functions.sh
```

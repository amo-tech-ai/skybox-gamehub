# WhatsApp Event Confirmation - Testing Guide

## 🧪 Test Execution Plan

### Test 1: Edge Function Direct Test
**Purpose:** Verify edge function works independently

**Steps:**
1. Open terminal
2. Run this curl command:

```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Test",
    "phone": "+573001234567",
    "eventName": "NFL Sunday Skybox Party",
    "eventDate": "Domingo, 30 de noviembre de 2025",
    "eventTime": "19:00",
    "eventLocation": "Skybox Medellín"
  }'
```

**Expected Result:**
```json
{
  "success": true,
  "message": "WhatsApp event confirmation sent successfully!",
  "messageId": "SM..."
}
```

**Verification:**
- [ ] Check Supabase logs: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs
- [ ] Verify WhatsApp message received on test phone
- [ ] Confirm message formatting is correct (emojis, line breaks, Spanish text)

---

### Test 2: Frontend Integration Test
**Purpose:** Verify full booking flow with WhatsApp confirmation

**Steps:**
1. Navigate to https://[your-app-url]/reserve
2. Sign in with Google
3. Fill out the form:
   - Select an upcoming event
   - Party size: 4
   - WhatsApp: +57XXXXXXXXXX (your test number)
   - Special requests: "Test booking for WhatsApp integration"
4. Click "Confirm Reservation"

**Expected Result:**
- [ ] Loading state shows during submission
- [ ] Success toast appears: "¡Reserva Confirmada! 🎉"
- [ ] Toast message mentions WhatsApp: "Te enviamos la confirmación por WhatsApp"
- [ ] WhatsApp message received within 10 seconds
- [ ] Form resets after success
- [ ] Booking appears in Supabase `bookings` table

**WhatsApp Message Should Contain:**
```
¡Hola [Name]! 👋

Gracias por registrarte al evento: *[Event Name]*.
📅 Fecha: [Date]
⏰ Hora: [Time]
📍 Lugar: [Location]

Te enviaremos recordatorios y novedades por WhatsApp.
¡Nos vemos en Skybox! 🍻
```

---

### Test 3: Error Scenarios
**Purpose:** Verify graceful error handling

#### 3A: Missing Phone Number
**Steps:**
1. Fill form without phone number
2. Submit

**Expected:**
- [ ] Validation error before submission
- [ ] Toast: "Phone Number Required"

#### 3B: Invalid Phone Format
**Steps:**
1. Enter phone: "123" (invalid)
2. Submit

**Expected:**
- [ ] Validation error or WhatsApp send fails gracefully
- [ ] User sees helpful error message

#### 3C: Twilio API Failure (Simulate)
**Steps:**
1. Temporarily remove TWILIO_AUTH_TOKEN from Supabase secrets
2. Submit valid form

**Expected:**
- [ ] Booking still succeeds
- [ ] User sees: "Reserva Confirmada! Tu reserva está confirmada. Revisa tu correo para más detalles."
- [ ] No WhatsApp sent, but booking recorded

---

### Test 4: Performance & UX
**Purpose:** Verify smooth user experience

**Checks:**
- [ ] Form submission completes within 3 seconds
- [ ] No flickering or UI jumps
- [ ] Loading state prevents double submission
- [ ] Toast auto-dismisses after 4 seconds
- [ ] Mobile responsive (test on iPhone/Android)

---

### Test 5: Database Verification
**Purpose:** Ensure booking data is correct

**Steps:**
1. After successful booking, check Supabase Dashboard
2. Navigate to: https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/editor
3. Open `bookings` table
4. Find your test booking

**Expected:**
- [ ] New row with correct `event_id`
- [ ] `party_size` matches form input
- [ ] `special_requests` saved correctly
- [ ] `status` = "pending"
- [ ] `user_id` matches authenticated user
- [ ] `created_at` timestamp is recent

---

## 🔧 Troubleshooting Common Issues

### Issue: WhatsApp not received
**Check:**
1. Phone format: Must be E.164 (+57XXXXXXXXXX)
2. Twilio sandbox: Test phone joined to sandbox?
3. Supabase logs: Any errors?
4. Twilio logs: Message sent successfully?

**Solution:**
```bash
# Check edge function logs
# https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs

# Check Twilio logs
# https://console.twilio.com/us1/monitor/logs/messages
```

### Issue: "WhatsApp service not configured"
**Check:**
1. Environment variables in Supabase
2. Secrets properly set: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM

**Solution:**
```bash
# Verify secrets exist
# https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/settings/functions

# Re-add if missing
```

### Issue: Booking succeeds but no WhatsApp
**This is expected behavior!** 
- Booking is primary operation
- WhatsApp is secondary enhancement
- If WhatsApp fails, booking still completes
- User sees generic success message

---

## ✅ Production Readiness Checklist

### Before Launch:
- [ ] All 5 tests passed
- [ ] Edge function deployed successfully
- [ ] Environment variables verified in production
- [ ] Twilio account has sufficient credits
- [ ] WhatsApp number approved (if using business number)
- [ ] Test on multiple devices (iOS, Android, Desktop)
- [ ] Spanish text displays correctly
- [ ] Emojis render properly
- [ ] Error messages are user-friendly
- [ ] Analytics tracking added (optional)
- [ ] Monitoring alerts configured

### Post-Launch:
- [ ] Monitor first 10 bookings closely
- [ ] Check Twilio usage/costs
- [ ] Verify 95%+ delivery rate
- [ ] Collect user feedback
- [ ] Adjust message template if needed

---

## 📊 Success Metrics to Track

| Metric | Target | How to Measure |
|--------|--------|----------------|
| WhatsApp Delivery Rate | > 95% | Supabase logs vs Twilio logs |
| Average Send Time | < 10s | Timestamp in logs |
| Booking Completion Rate | > 80% | Analytics / Database |
| User Satisfaction | > 90% | User feedback / surveys |
| Error Rate | < 5% | Supabase error logs |

---

## 🚀 Next Steps After Successful Testing

1. **Add Database Tracking**
   - Create `event_confirmations` table
   - Store: booking_id, phone, status, sent_at, message_id

2. **Implement Rate Limiting**
   - Max 1 confirmation per phone per event
   - Prevent abuse/spam

3. **Add Monitoring**
   - Set up Sentry/error tracking
   - Create Slack/email alerts for failures

4. **Enhance Message Template**
   - Add booking ID for reference
   - Include cancellation policy link
   - Personalize based on event type

5. **A/B Testing**
   - Test different message formats
   - Measure user engagement
   - Optimize conversion rates

---

## 📝 Test Log Template

Use this to document your test results:

```
Date: _________
Tester: _________
Test #: _________

✅ / ❌ Edge function responds
✅ / ❌ WhatsApp received
✅ / ❌ Message formatting correct
✅ / ❌ Booking saved to database
✅ / ❌ Error handling works
✅ / ❌ Mobile responsive
✅ / ❌ Toast notifications display

Notes:
_________________________________
_________________________________

Issues Found:
_________________________________
_________________________________

Resolution:
_________________________________
_________________________________
```

---

## 🆘 Support Resources

- **Supabase Edge Functions:** https://supabase.com/docs/guides/functions
- **Twilio WhatsApp API:** https://www.twilio.com/docs/whatsapp
- **E.164 Phone Format:** https://en.wikipedia.org/wiki/E.164
- **Project Functions:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions
- **Project Secrets:** https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/settings/functions

---

## ✨ You're Ready!

If all tests pass, your WhatsApp event confirmation system is production-ready! 🎉

Remember:
1. Start with small test group
2. Monitor closely first week
3. Iterate based on feedback
4. Scale gradually

Good luck! 🚀

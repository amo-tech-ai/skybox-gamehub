# Quick Test: WhatsApp Event Confirmation

## Direct Edge Function Test

Use this curl command to test the edge function directly (replace phone number with your test number):

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

### Expected Success Response:
```json
{
  "success": true,
  "message": "WhatsApp event confirmation sent successfully!",
  "messageId": "SM..."
}
```

### Expected Error Response (if phone is missing):
```json
{
  "error": "Missing required fields: name, phone, eventName, eventDate"
}
```

## Check Logs

After testing, check the logs here:
https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions/event-confirmation/logs

## Verify Twilio Delivery

Check Twilio message logs:
https://console.twilio.com/us1/monitor/logs/messages

## Test Different Scenarios

### 1. Missing Field Test
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "eventName": "Test Event",
    "eventDate": "2025-12-01"
  }'
```
Expected: 400 error with "Missing required fields"

### 2. Complete with Optional Fields
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-confirmation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "phone": "+573001234567",
    "eventName": "NFL Championship Game",
    "eventDate": "Sábado, 15 de diciembre de 2025",
    "eventTime": "20:30",
    "eventLocation": "Skybox Medellín - VIP Lounge"
  }'
```
Expected: Success with all details in WhatsApp message

## Quick Verification Checklist

- [ ] Run curl command
- [ ] Check response status (200 = success)
- [ ] Verify WhatsApp message received
- [ ] Check message formatting (emojis, line breaks, Spanish)
- [ ] Verify all event details appear correctly
- [ ] Check Supabase logs for any errors
- [ ] Verify Twilio logs show successful delivery

## Troubleshooting

If you don't receive the WhatsApp:

1. **Check phone format**: Must be E.164 (+57XXXXXXXXXX)
2. **Verify Twilio sandbox**: Test phone joined to sandbox?
3. **Check secrets**: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM set?
4. **Review logs**: Any error messages in Supabase or Twilio?

## Next Steps

Once this test passes:
1. Test the full booking flow in the UI at /reserve
2. Verify integration with real event data
3. Test error scenarios (invalid phone, missing fields)
4. Deploy to production after successful testing

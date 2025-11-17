# Twilio Status Webhook Edge Function

## Overview
Receives delivery status updates from Twilio for WhatsApp messages and updates the `event_confirmations` table accordingly.

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/twilio-status-webhook
```

⚠️ **Note**: This endpoint is called by Twilio, not by browsers. No CORS headers needed.

## Request Format
Twilio sends `application/x-www-form-urlencoded` data.

### Common Twilio Webhook Fields
| Field | Type | Description |
|-------|------|-------------|
| `MessageSid` | string | Unique message identifier (e.g., `SM...`) |
| `MessageStatus` | string | Current status of the message |
| `To` | string | Recipient phone (e.g., `whatsapp:+573001234567`) |
| `From` | string | Sender phone (e.g., `whatsapp:+14155238886`) |
| `ErrorCode` | string | Error code if failed (optional) |
| `ErrorMessage` | string | Error description if failed (optional) |

### Message Status Values
- `queued`: Message queued for sending
- `sent`: Message sent to carrier
- `delivered`: Message delivered to recipient
- `failed`: Message failed to deliver
- `undelivered`: Message not delivered

## Configuring Twilio Webhook

### Step 1: Deploy the Edge Function
```bash
supabase functions deploy twilio-status-webhook
```

### Step 2: Configure in Twilio Console
1. Go to: https://console.twilio.com/
2. Navigate to: **Messaging → Settings → WhatsApp Sender**
3. Find your WhatsApp number
4. Set **Status Callback URL** to:
   ```
   https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/twilio-status-webhook
   ```
5. Select callback events:
   - ✅ Queued
   - ✅ Sent
   - ✅ Delivered
   - ✅ Failed
   - ✅ Undelivered

## Example Twilio Webhook Payload

```
MessageSid=SM1234567890abcdef1234567890abcdef
MessageStatus=delivered
To=whatsapp:+573001234567
From=whatsapp:+14155238886
MessagingServiceSid=MG1234567890abcdef1234567890abcdef
AccountSid=AC1234567890abcdef1234567890abcdef
```

## Database Updates

The function updates the `event_confirmations` table:

```sql
UPDATE event_confirmations
SET 
  status = 'delivered',
  delivered_at = NOW(),
  updated_at = NOW()
WHERE message_id = 'SM1234567890abcdef1234567890abcdef';
```

For failed messages:
```sql
UPDATE event_confirmations
SET 
  status = 'failed',
  error_message = 'Error 30007: Carrier violation',
  updated_at = NOW()
WHERE message_id = 'SM1234567890abcdef1234567890abcdef';
```

## Status Mapping

| Twilio Status | Internal Status | Action |
|---------------|-----------------|--------|
| `queued` | `queued` | Update status |
| `sent` | `sent` | Update status |
| `delivered` | `delivered` | Update status + set `delivered_at` |
| `failed` | `failed` | Update status + store `error_message` |
| `undelivered` | `failed` | Update status + store `error_message` |

## Testing

### Using cURL (simulating Twilio)
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/twilio-status-webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "MessageSid=SM1234567890abcdef1234567890abcdef" \
  -d "MessageStatus=delivered" \
  -d "To=whatsapp:+573001234567" \
  -d "From=whatsapp:+14155238886"
```

## Security

### Current Implementation
✅ Basic field validation
❌ No signature verification (TODO)

### TODO: Add Twilio Signature Verification
For production, validate that requests actually come from Twilio:

```typescript
import crypto from 'crypto';

function validateTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string,
  authToken: string
): boolean {
  const data = Object.keys(params)
    .sort()
    .map(key => `${key}${params[key]}`)
    .join('');
    
  const hmac = crypto
    .createHmac('sha1', authToken)
    .update(url + data)
    .digest('base64');
    
  return hmac === signature;
}

// In handler:
const signature = req.headers.get('X-Twilio-Signature');
const valid = validateTwilioSignature(url, params, signature, authToken);

if (!valid) {
  return new Response('Unauthorized', { status: 401 });
}
```

Reference: [Twilio Webhook Security](https://www.twilio.com/docs/usage/webhooks/webhooks-security)

## Monitoring

### View Webhook Activity
Check Supabase logs:
```bash
supabase functions logs twilio-status-webhook
```

### Query Delivery Status
```sql
-- Get delivery success rate for today
SELECT 
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM event_confirmations
WHERE DATE(created_at) = CURRENT_DATE
GROUP BY status;
```

### Alert on High Failure Rate
```sql
-- Messages failed in last hour
SELECT COUNT(*)
FROM event_confirmations
WHERE status = 'failed'
  AND updated_at >= NOW() - INTERVAL '1 hour';
```

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Tables Used
- `event_confirmations`: Updates status and delivery info

## Troubleshooting

### Webhook not being called
1. Verify callback URL is correct in Twilio console
2. Check webhook is saved for correct phone number
3. Test with Twilio's webhook debugging tool

### Status not updating
1. Check `message_id` matches Twilio `MessageSid`
2. Verify Supabase function logs for errors
3. Check database permissions (RLS policies)

### High failure rate
1. Check Twilio error codes in `error_message` field
2. Common issues:
   - `30007`: Carrier violation (spam filtering)
   - `30008`: Unknown destination
   - `63016`: Message body required

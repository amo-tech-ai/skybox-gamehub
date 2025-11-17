# Event Feedback Request Edge Function

## Overview
Sends post-event feedback requests via WhatsApp to all registered attendees, asking for ratings and optional survey completion.

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-feedback-request
```

## Request Payload

```json
{
  "eventId": "uuid-string",
  "feedbackLink": "https://forms.gle/xyz123" // optional
}
```

### Fields
- `eventId` (required): The UUID of the event
- `feedbackLink` (optional): URL to external survey/form (e.g., Google Forms, Typeform)

## Response

### Success (200)
```json
{
  "success": true,
  "message": "Feedback requests sent",
  "sent": 42,
  "failed": 3,
  "total": 45
}
```

### Error (400/500)
```json
{
  "error": "Event not found"
}
```

## WhatsApp Message Format

The function sends this message in Spanish:

```
¡Hola {Name}! 👋

Esperamos que hayas disfrutado el evento: *{Event Title}* 🎉

¿Nos podrías calificar tu experiencia?
⭐ 1 - Muy mala
⭐⭐ 2 - Mala
⭐⭐⭐ 3 - Regular
⭐⭐⭐⭐ 4 - Buena
⭐⭐⭐⭐⭐ 5 - Excelente

[If feedbackLink provided:]
O completa nuestra encuesta: {feedbackLink}

¡Gracias por ser parte de Skybox! 🍻
```

## Example Usage

### cURL
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-feedback-request \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "123e4567-e89b-12d3-a456-426614174000",
    "feedbackLink": "https://forms.gle/SkyboxFeedback2025"
  }'
```

### Frontend Integration (TypeScript)
```typescript
import { sendEventFeedbackRequest } from '@/api/eventFeedbackRequest';
import { toast } from 'sonner';

// Admin event actions panel
const handleRequestFeedback = async (eventId: string) => {
  // Show confirmation dialog
  const confirmed = window.confirm(
    '¿Enviar solicitud de feedback a todos los participantes?'
  );
  
  if (!confirmed) return;
  
  try {
    const result = await sendEventFeedbackRequest({
      eventId,
      feedbackLink: 'https://forms.gle/SkyboxFeedback2025' // optional
    });
    
    toast.success(
      `✅ Solicitudes enviadas: ${result.sent} exitosas, ${result.failed} fallidas`
    );
  } catch (error: any) {
    toast.error(error.message || 'Error al enviar solicitudes');
  }
};
```

## When to Send Feedback Requests

### Best Practices
✅ **Do:**
- Send 1-2 hours after event ends (while memories are fresh)
- Send the next morning for evening events
- Include personalized event details

❌ **Don't:**
- Send during the event
- Send multiple times for same event
- Send without proper opt-in

### Recommended Timing
| Event Type | Best Time to Send |
|------------|-------------------|
| Daytime event | 2 hours after end |
| Evening event | Next morning at 10 AM |
| Multi-day event | Day after final day |

## Admin UI Example

```tsx
import { useState } from 'react';
import { sendEventFeedbackRequest } from '@/api/eventFeedbackRequest';
import { toast } from 'sonner';

interface EventActionsProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
}

function EventFeedbackPanel({ eventId, eventTitle, eventDate }: EventActionsProps) {
  const [sending, setSending] = useState(false);
  const [feedbackLink, setFeedbackLink] = useState('');

  const handleSendFeedback = async () => {
    const confirmed = window.confirm(
      `¿Enviar solicitud de feedback para "${eventTitle}"?\n\n` +
      'Se enviará a todos los participantes registrados.'
    );

    if (!confirmed) return;

    setSending(true);
    try {
      const result = await sendEventFeedbackRequest({
        eventId,
        feedbackLink: feedbackLink || undefined
      });

      toast.success(
        `✅ Feedback requests sent!\n` +
        `Sent: ${result.sent}\n` +
        `Failed: ${result.failed}\n` +
        `Total: ${result.total}`
      );
    } catch (error: any) {
      toast.error(error.message || 'Failed to send feedback requests');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded">
      <h3 className="font-semibold">Post-Event Feedback</h3>
      
      <input
        type="url"
        value={feedbackLink}
        onChange={(e) => setFeedbackLink(e.target.value)}
        placeholder="https://forms.gle/... (optional)"
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleSendFeedback}
        disabled={sending}
        className="w-full bg-primary text-white p-3 rounded hover:bg-primary/90 disabled:opacity-50"
      >
        {sending ? 'Enviando...' : 'Enviar solicitud de feedback por WhatsApp'}
      </button>

      <p className="text-sm text-muted-foreground">
        Se enviará a {/* fetch count */} participantes registrados
      </p>
    </div>
  );
}
```

## Collecting Feedback Responses

### Option 1: Simple WhatsApp Replies
Users reply directly to WhatsApp with rating (1-5). Parse manually or use Twilio webhook.

### Option 2: External Survey (Recommended)
Use Google Forms, Typeform, or custom form:
- Include event_id in URL parameters
- Track completion rates
- Analyze aggregate data

### Option 3: In-App Feedback
```typescript
// Create feedback table
CREATE TABLE event_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id),
  customer_id UUID REFERENCES profiles(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link from WhatsApp to feedback page
const feedbackLink = `https://skybox.com/feedback/${eventId}?token=${encryptedToken}`;
```

## Metrics to Track

### Feedback Response Rate
```sql
SELECT 
  e.title,
  COUNT(DISTINCT ec.id) as total_attendees,
  COUNT(DISTINCT ef.id) as feedback_responses,
  ROUND(COUNT(DISTINCT ef.id) * 100.0 / COUNT(DISTINCT ec.id), 2) as response_rate
FROM events e
LEFT JOIN event_confirmations ec ON ec.event_id = e.id
LEFT JOIN event_feedback ef ON ef.event_id = e.id
WHERE e.event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY e.id, e.title
ORDER BY response_rate DESC;
```

### Average Rating by Event
```sql
SELECT 
  e.title,
  e.event_date,
  COUNT(ef.id) as feedback_count,
  ROUND(AVG(ef.rating), 2) as avg_rating,
  COUNT(CASE WHEN ef.rating = 5 THEN 1 END) as five_stars
FROM events e
LEFT JOIN event_feedback ef ON ef.event_id = e.id
WHERE e.event_date >= CURRENT_DATE - INTERVAL '90 days'
GROUP BY e.id, e.title, e.event_date
ORDER BY avg_rating DESC;
```

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`

## Database Tables Used
- `events`: Event details (title, date)
- `event_confirmations`: List of attendees to send feedback to

## TODO: Create Feedback Table
```sql
CREATE TABLE event_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) NOT NULL,
  customer_id UUID REFERENCES profiles(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  source TEXT DEFAULT 'whatsapp', -- whatsapp, form, app
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_event_feedback_event ON event_feedback(event_id);
CREATE INDEX idx_event_feedback_rating ON event_feedback(rating);
```

## Future Improvements
- [ ] Automated sending (1 hour after event ends)
- [ ] Track feedback response rates
- [ ] Parse WhatsApp rating replies automatically
- [ ] A/B test different message formats
- [ ] Send reminders for non-responders
- [ ] Generate feedback summary reports

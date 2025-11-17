# VIP Broadcast Edge Function

## Overview
Sends promotional WhatsApp messages to segments of customers (VIP, recent visitors, or all).

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/vip-broadcast
```

## Request Payload

```json
{
  "segment": "vip" | "recent" | "all",
  "message": "string"
}
```

### Fields
- `segment` (required): Target customer segment
  - `"vip"`: Customers with VIP role
  - `"recent"`: Customers active in last 30 days
  - `"all"`: All customers with phone numbers
- `message` (required): The promotional message to send

## Response

### Success (200)
```json
{
  "success": true,
  "sentCount": 25,
  "failedCount": 2,
  "totalCustomers": 27
}
```

### Error (400/500)
```json
{
  "error": "Missing required fields: segment, message"
}
```

## Example Usage

### cURL
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/vip-broadcast \
  -H "Content-Type: application/json" \
  -d '{
    "segment": "vip",
    "message": "🎉 Promoción exclusiva VIP: 20% OFF en tu próxima visita a Skybox! Código: VIP20"
  }'
```

### Frontend (TypeScript)
```typescript
import { sendVipBroadcast } from '@/api/vipBroadcast';

try {
  const result = await sendVipBroadcast({
    segment: 'vip',
    message: '🎉 Promoción exclusiva VIP: 20% OFF en tu próxima visita a Skybox! Código: VIP20'
  });
  
  console.log(`Sent to ${result.sentCount} customers`);
} catch (error) {
  console.error('Failed to send broadcast:', error);
}
```

## Rate Limiting
- Maximum 500 messages per request
- Recommended: Use for special promotions, not frequent blasts

## WhatsApp Template Compliance
⚠️ **Important**: Future versions should use WhatsApp approved message templates to comply with WhatsApp Business policies. For now, ensure all recipients have opted in to receive promotional messages.

## Admin UI Snippet
```tsx
import { useState } from 'react';
import { sendVipBroadcast } from '@/api/vipBroadcast';
import { toast } from 'sonner';

function VipBroadcastPanel() {
  const [segment, setSegment] = useState<'vip' | 'recent' | 'all'>('vip');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) {
      toast.error('Por favor escribe un mensaje');
      return;
    }

    setSending(true);
    try {
      const result = await sendVipBroadcast({ segment, message });
      toast.success(`✅ Enviado a ${result.sentCount} clientes`);
      setMessage('');
    } catch (error: any) {
      toast.error(error.message || 'Error al enviar promoción');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <select 
        value={segment} 
        onChange={(e) => setSegment(e.target.value as any)}
        className="w-full p-2 border rounded"
      >
        <option value="vip">Solo VIP</option>
        <option value="recent">Visitantes recientes (30 días)</option>
        <option value="all">Todos los clientes</option>
      </select>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje promocional..."
        className="w-full p-2 border rounded h-32"
      />

      <button
        onClick={handleSend}
        disabled={sending}
        className="w-full bg-primary text-white p-3 rounded hover:bg-primary/90"
      >
        {sending ? 'Enviando...' : 'Enviar promoción por WhatsApp'}
      </button>
    </div>
  );
}
```

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`

## Database Tables Used
- `profiles`: Customer data (phone, role, last_seen_at)

## Future Improvements
- [ ] Add WhatsApp template support
- [ ] Implement message_logs tracking
- [ ] Add scheduled broadcast (cron)
- [ ] Support image/video attachments
- [ ] Add unsubscribe mechanism

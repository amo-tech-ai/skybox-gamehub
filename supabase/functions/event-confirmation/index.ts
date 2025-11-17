import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EventConfirmationRequest {
  name: string;
  phone: string;
  eventName: string;
  eventDate: string;
  eventTime?: string;
  eventLocation?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as EventConfirmationRequest;
    const { name, phone, eventName, eventDate, eventTime, eventLocation } = body;

    // Validate required fields
    if (!name || !phone || !eventName || !eventDate) {
      console.error('Missing required fields:', { name: !!name, phone: !!phone, eventName: !!eventName, eventDate: !!eventDate });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, phone, eventName, eventDate' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Event confirmation requested for:', { name, phone, eventName, eventDate });

    // Get Twilio credentials from environment
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioWhatsAppFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppFrom) {
      console.error('Missing Twilio credentials');
      throw new Error('WhatsApp service not configured');
    }

    // Build WhatsApp message (Spanish, Skybox style)
    const messageLines: string[] = [
      `¡Hola ${name}! 👋`,
      '',
      `Gracias por registrarte al evento: *${eventName}*.`,
      `📅 Fecha: ${eventDate}`,
    ];

    if (eventTime) {
      messageLines.push(`⏰ Hora: ${eventTime}`);
    }

    if (eventLocation) {
      messageLines.push(`📍 Lugar: ${eventLocation}`);
    }

    messageLines.push('');
    messageLines.push('Te enviaremos recordatorios y novedades por WhatsApp.');
    messageLines.push('¡Nos vemos en Skybox! 🍻');

    const message = messageLines.join('\n');

    console.log('Sending WhatsApp message:', { to: phone, messagePreview: message.substring(0, 100) });

    // Send WhatsApp message via Twilio
    const twilioResponse = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${twilioAccountSid}:${twilioAuthToken}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: `whatsapp:${twilioWhatsAppFrom}`,
          To: `whatsapp:${phone}`,
          Body: message,
        }),
      }
    );

    if (!twilioResponse.ok) {
      const errorText = await twilioResponse.text();
      console.error('Twilio API error:', errorText);
      throw new Error('Failed to send WhatsApp message');
    }

    const result = await twilioResponse.json();
    console.log('WhatsApp event confirmation sent successfully:', result.sid);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'WhatsApp event confirmation sent successfully!',
        messageId: result.sid
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in event-confirmation function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);

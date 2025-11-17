import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

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
  eventId?: string;
  bookingId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as EventConfirmationRequest;
    const { name, phone, eventName, eventDate, eventTime, eventLocation, eventId, bookingId } = body;

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

    console.log('Event confirmation requested for:', { name, phone, eventName, eventDate, eventId, bookingId });

    // Initialize Supabase client with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // RATE LIMITING: Check if confirmation already sent for this phone + event
    if (eventId) {
      const { data: existingConfirmation } = await supabase
        .from('event_confirmations')
        .select('id, sent_at, status')
        .eq('phone', phone)
        .eq('event_id', eventId)
        .eq('status', 'sent')
        .maybeSingle();

      if (existingConfirmation) {
        console.log('Rate limit: Confirmation already sent:', existingConfirmation);
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Confirmation already sent for this event',
            rateLimited: true,
            existingConfirmation
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          }
        );
      }
    }

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

    // Create confirmation record BEFORE sending (status: pending)
    const { data: confirmationRecord, error: insertError } = await supabase
      .from('event_confirmations')
      .insert({
        booking_id: bookingId || null,
        event_id: eventId || null,
        phone,
        name,
        status: 'pending',
        metadata: {
          eventName,
          eventDate,
          eventTime,
          eventLocation
        }
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating confirmation record:', insertError);
      // Continue anyway - don't block on DB insert
    }

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

      // Update confirmation record with error
      if (confirmationRecord) {
        await supabase
          .from('event_confirmations')
          .update({
            status: 'failed',
            error_message: errorText.substring(0, 500)
          })
          .eq('id', confirmationRecord.id);
      }

      throw new Error('Failed to send WhatsApp message');
    }

    const result = await twilioResponse.json();
    console.log('WhatsApp event confirmation sent successfully:', result.sid);

    // Update confirmation record with success
    if (confirmationRecord) {
      await supabase
        .from('event_confirmations')
        .update({
          status: 'sent',
          message_id: result.sid,
          sent_at: new Date().toISOString()
        })
        .eq('id', confirmationRecord.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'WhatsApp event confirmation sent successfully!',
        messageId: result.sid,
        confirmationId: confirmationRecord?.id
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

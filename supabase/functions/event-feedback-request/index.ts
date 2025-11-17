import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FeedbackRequestPayload {
  eventId: string;
  feedbackLink?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as FeedbackRequestPayload;
    const { eventId, feedbackLink } = body;

    // Validate required fields
    if (!eventId) {
      console.error('Missing required field: eventId');
      return new Response(
        JSON.stringify({ error: 'Missing required field: eventId' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Feedback request for event:', eventId);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Twilio credentials
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioWhatsAppFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppFrom) {
      console.error('Missing Twilio credentials');
      throw new Error('WhatsApp service not configured');
    }

    // Fetch event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('title, event_date')
      .eq('id', eventId)
      .single();

    if (eventError || !event) {
      console.error('Error fetching event:', eventError);
      throw new Error('Event not found');
    }

    // Fetch all registrations for this event
    const { data: confirmations, error: confirmationsError } = await supabase
      .from('event_confirmations')
      .select('id, phone, name')
      .eq('event_id', eventId)
      .eq('status', 'sent');

    if (confirmationsError) {
      console.error('Error fetching confirmations:', confirmationsError);
      throw new Error('Failed to fetch event registrations');
    }

    if (!confirmations || confirmations.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No registrations found for this event',
          sent: 0,
          failed: 0,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log(`Found ${confirmations.length} registrations to send feedback request`);

    let sentCount = 0;
    let failedCount = 0;

    // Send feedback request to each attendee
    for (const confirmation of confirmations) {
      try {
        // Build feedback message
        const messageLines: string[] = [
          `¡Hola ${confirmation.name}! 👋`,
          '',
          `Esperamos que hayas disfrutado el evento: *${event.title}* 🎉`,
          '',
          '¿Nos podrías calificar tu experiencia?',
          '⭐ 1 - Muy mala',
          '⭐⭐ 2 - Mala',
          '⭐⭐⭐ 3 - Regular',
          '⭐⭐⭐⭐ 4 - Buena',
          '⭐⭐⭐⭐⭐ 5 - Excelente',
        ];

        if (feedbackLink) {
          messageLines.push('');
          messageLines.push(`O completa nuestra encuesta: ${feedbackLink}`);
        }

        messageLines.push('');
        messageLines.push('¡Gracias por ser parte de Skybox! 🍻');

        const message = messageLines.join('\n');

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
              To: `whatsapp:${confirmation.phone}`,
              Body: message,
            }),
          }
        );

        if (twilioResponse.ok) {
          const result = await twilioResponse.json();
          sentCount++;
          console.log(`Feedback request sent to ${confirmation.phone}: ${result.sid}`);

          // TODO: Log to message_logs with type='feedback'
        } else {
          const errorText = await twilioResponse.text();
          failedCount++;
          console.error(`Failed to send feedback to ${confirmation.phone}:`, errorText);
        }
      } catch (error: any) {
        failedCount++;
        console.error(`Error sending feedback to ${confirmation.phone}:`, error.message);
      }
    }

    console.log(`Feedback requests complete: ${sentCount} sent, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Feedback requests sent',
        sent: sentCount,
        failed: failedCount,
        total: confirmations.length,
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
    console.error('Error in event-feedback-request function:', error);
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

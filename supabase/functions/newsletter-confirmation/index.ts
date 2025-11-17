import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConfirmationRequest {
  name: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone }: ConfirmationRequest = await req.json();

    console.log("Newsletter confirmation requested for:", { name, phone });

    // TODO: Add WhatsApp API integration here
    // Once you provide your WhatsApp provider credentials (Twilio, etc.),
    // this section will be implemented to send the confirmation message
    
    // Example for Twilio (uncomment and configure once credentials are added):
    /*
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioWhatsAppFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    const message = `¡Hola ${name}! 👋\n\nGracias por suscribirte al newsletter de Skybox Medellín.\n\nRecibirás actualizaciones sobre:\n✅ Próximos eventos deportivos\n🎉 Ofertas exclusivas\n📺 Horarios de partidos\n\n¡Nos vemos en Skybox! 🍻`;

    const response = await fetch(
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

    if (!response.ok) {
      const error = await response.text();
      console.error('Twilio API error:', error);
      throw new Error('Failed to send WhatsApp message');
    }

    const result = await response.json();
    console.log('WhatsApp message sent successfully:', result.sid);
    */

    // For now, just log success
    console.log("Newsletter confirmation logged (WhatsApp integration pending)");

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Confirmation logged. Configure WhatsApp credentials to enable messaging."
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in newsletter-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

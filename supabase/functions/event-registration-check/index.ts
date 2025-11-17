import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RegistrationCheckRequest {
  eventId: string;
  phone: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as RegistrationCheckRequest;
    const { eventId, phone } = body;

    // Validate required fields
    if (!eventId || !phone) {
      console.error('Missing required fields:', { eventId: !!eventId, phone: !!phone });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: eventId, phone' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('Checking registration for:', { eventId, phone });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if a confirmation already exists for this event + phone combination
    const { data: existingConfirmation } = await supabase
      .from('event_confirmations')
      .select('id, status')
      .eq('event_id', eventId)
      .eq('phone', phone)
      .maybeSingle();

    const exists = existingConfirmation !== null;

    console.log(`Registration check result: ${exists ? 'EXISTS' : 'NOT FOUND'}`);

    return new Response(
      JSON.stringify({
        exists,
        registration: exists ? {
          id: existingConfirmation.id,
          status: existingConfirmation.status,
        } : null,
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
    console.error('Error in event-registration-check function:', error);
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

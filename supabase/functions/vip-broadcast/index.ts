import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VipBroadcastRequest {
  segment: 'vip' | 'recent' | 'all';
  message: string;
}

const MAX_MESSAGES_PER_REQUEST = 500;

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as VipBroadcastRequest;
    const { segment, message } = body;

    // Validate required fields
    if (!segment || !message) {
      console.error('Missing required fields:', { segment: !!segment, message: !!message });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: segment, message' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log('VIP broadcast requested for segment:', segment);

    // Initialize Supabase client with service role key for admin access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Twilio credentials from environment
    const twilioAccountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioWhatsAppFrom = Deno.env.get('TWILIO_WHATSAPP_FROM');

    if (!twilioAccountSid || !twilioAuthToken || !twilioWhatsAppFrom) {
      console.error('Missing Twilio credentials');
      throw new Error('WhatsApp service not configured');
    }

    // Build query based on segment
    let query = supabase
      .from('profiles')
      .select('id, phone, full_name')
      .not('phone', 'is', null);

    if (segment === 'vip') {
      // TODO: Add is_vip field to profiles table or use metadata
      query = query.eq('role', 'vip');
    } else if (segment === 'recent') {
      // Get customers with activity in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query = query.gte('last_seen_at', thirtyDaysAgo.toISOString());
    }
    // 'all' segment doesn't need additional filters

    const { data: customers, error: fetchError } = await query.limit(MAX_MESSAGES_PER_REQUEST);

    if (fetchError) {
      console.error('Error fetching customers:', fetchError);
      throw new Error('Failed to fetch customer list');
    }

    if (!customers || customers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sentCount: 0, failedCount: 0, message: 'No customers found for this segment' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    console.log(`Found ${customers.length} customers for segment: ${segment}`);

    let sentCount = 0;
    let failedCount = 0;

    // Send WhatsApp message to each customer
    for (const customer of customers) {
      try {
        // Personalize message with customer name if available
        const personalizedMessage = customer.full_name
          ? `¡Hola ${customer.full_name}! 👋\n\n${message}`
          : `¡Hola! 👋\n\n${message}`;

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
              To: `whatsapp:${customer.phone}`,
              Body: personalizedMessage,
            }),
          }
        );

        if (twilioResponse.ok) {
          const result = await twilioResponse.json();
          sentCount++;
          
          // Log success to message_logs table (if exists)
          // TODO: Create message_logs table if it doesn't exist
          console.log(`Message sent to ${customer.phone}: ${result.sid}`);
        } else {
          const errorText = await twilioResponse.text();
          failedCount++;
          console.error(`Failed to send to ${customer.phone}:`, errorText);
        }
      } catch (error: any) {
        failedCount++;
        console.error(`Error sending to ${customer.phone}:`, error.message);
      }
    }

    console.log(`Broadcast complete: ${sentCount} sent, ${failedCount} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sentCount,
        failedCount,
        totalCustomers: customers.length,
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
    console.error('Error in vip-broadcast function:', error);
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

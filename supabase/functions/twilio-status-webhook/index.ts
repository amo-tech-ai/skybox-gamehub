import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

/**
 * Twilio Status Webhook
 * Receives delivery status updates from Twilio for WhatsApp messages
 * 
 * This endpoint is called by Twilio, not by browsers, so no CORS needed.
 * 
 * Twilio sends application/x-www-form-urlencoded data with fields like:
 * - MessageSid: Unique message identifier
 * - MessageStatus: queued, sent, delivered, failed, etc.
 * - To: Recipient phone number
 * - From: Sender phone number
 * - ErrorCode: Error code if failed
 * - ErrorMessage: Error description if failed
 */

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log('Received Twilio status webhook');

    // Parse URL-encoded form data
    const formData = await req.formData();
    
    const messageSid = formData.get('MessageSid') as string;
    const messageStatus = formData.get('MessageStatus') as string;
    const to = formData.get('To') as string;
    const errorCode = formData.get('ErrorCode') as string | null;
    const errorMessage = formData.get('ErrorMessage') as string | null;

    // Validate required fields
    if (!messageSid || !messageStatus) {
      console.error('Missing required fields from Twilio:', { messageSid, messageStatus });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Twilio webhook data:', {
      messageSid,
      messageStatus,
      to,
      errorCode,
      errorMessage,
    });

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Find the corresponding event_confirmations record by Twilio message ID
    const { data: confirmation, error: fetchError } = await supabase
      .from('event_confirmations')
      .select('id, status')
      .eq('message_id', messageSid)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching confirmation:', fetchError);
      throw new Error('Failed to fetch confirmation record');
    }

    if (!confirmation) {
      console.warn(`No confirmation found for MessageSid: ${messageSid}`);
      // Still return 200 OK so Twilio doesn't retry
      return new Response(
        JSON.stringify({ success: true, message: 'No matching record found' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Map Twilio status to our internal status
    let internalStatus = messageStatus.toLowerCase();
    
    // Update status based on Twilio webhook
    const updateData: any = {
      status: internalStatus,
      updated_at: new Date().toISOString(),
    };

    // If delivered, set delivered_at timestamp
    if (messageStatus === 'delivered') {
      updateData.delivered_at = new Date().toISOString();
    }

    // If failed, store error information
    if (messageStatus === 'failed' && (errorCode || errorMessage)) {
      updateData.error_message = errorMessage || `Twilio error code: ${errorCode}`;
    }

    // Update the event_confirmations record
    const { error: updateError } = await supabase
      .from('event_confirmations')
      .update(updateData)
      .eq('id', confirmation.id);

    if (updateError) {
      console.error('Error updating confirmation status:', updateError);
      throw new Error('Failed to update confirmation status');
    }

    console.log(`Updated confirmation ${confirmation.id} to status: ${internalStatus}`);

    // TODO: Add Twilio signature validation for production security
    // See: https://www.twilio.com/docs/usage/webhooks/webhooks-security

    return new Response(
      JSON.stringify({ success: true, message: 'Status updated successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in twilio-status-webhook function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);

// ===========================================================================
// Edge Function: Update Event Status
// ===========================================================================
// Purpose: Automatically update event status to 'past' after event_datetime
// Trigger: Scheduled cron job (daily at midnight)
// Auth: Service role only
// ===========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    // Verify this is a cron job or authorized request
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client with service role
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Update events that have passed
    const { data, error } = await supabaseAdmin
      .from('events')
      .update({ status: 'past' })
      .eq('status', 'published')
      .lt('event_datetime', new Date().toISOString())
      .select()

    if (error) {
      console.error('Error updating event status:', error)
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Updated ${data?.length || 0} events to 'past' status`)

    return new Response(
      JSON.stringify({
        success: true,
        updated_count: data?.length || 0,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})

/*
 * Cron Configuration
 *
 * To set up this function as a cron job in Supabase:
 *
 * 1. Go to Supabase Dashboard → Edge Functions
 * 2. Deploy this function
 * 3. Go to Database → Extensions → enable pg_cron
 * 4. Run this SQL in the SQL Editor:
 *
 * SELECT cron.schedule(
 *   'update-past-events',
 *   '0 0 * * *',  -- Run daily at midnight
 *   $$
 *   SELECT
 *     net.http_post(
 *       url:='https://PROJECT_REF.supabase.co/functions/v1/update-event-status',
 *       headers:=jsonb_build_object('Content-Type','application/json', 'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')),
 *       body:=jsonb_build_object('trigger', 'cron')
 *     ) as request_id;
 *   $$
 * );
 */

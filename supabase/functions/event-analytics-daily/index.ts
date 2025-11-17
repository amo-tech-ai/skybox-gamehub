import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

/**
 * Event Analytics Daily
 * Generates daily statistics per event for dashboards
 * 
 * This function is designed to be called by Supabase cron (nightly at 03:00)
 * It calculates stats for "yesterday" and upserts into event_stats_daily table
 * 
 * TODO: Create event_stats_daily table:
 * - event_id (uuid)
 * - date (date)
 * - views (integer)
 * - registrations (integer)
 * - checkins (integer)
 * - created_at (timestamp)
 * - updated_at (timestamp)
 */

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log('Starting event-analytics-daily job');

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0]; // YYYY-MM-DD format

    console.log(`Calculating stats for date: ${yesterdayStr}`);

    // Get all active events
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('id, title')
      .is('deleted_at', null);

    if (eventsError) {
      console.error('Error fetching events:', eventsError);
      throw new Error('Failed to fetch events');
    }

    if (!events || events.length === 0) {
      console.log('No events found');
      return new Response(
        JSON.stringify({ success: true, message: 'No events to process', statsGenerated: 0 }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log(`Processing ${events.length} events`);

    let statsGenerated = 0;

    // Process each event
    for (const event of events) {
      try {
        // Count registrations for yesterday
        const { count: registrationsCount, error: regError } = await supabase
          .from('event_confirmations')
          .select('*', { count: 'exact', head: true })
          .eq('event_id', event.id)
          .gte('created_at', `${yesterdayStr}T00:00:00Z`)
          .lt('created_at', `${yesterdayStr}T23:59:59Z`);

        if (regError) {
          console.error(`Error counting registrations for event ${event.id}:`, regError);
          continue;
        }

        // TODO: Count checkins when event_checkins table exists
        const checkinsCount = 0;

        // TODO: Count views when event_views table exists
        const viewsCount = 0;

        console.log(`Event ${event.title}: ${registrationsCount || 0} registrations, ${checkinsCount} check-ins, ${viewsCount} views`);

        // TODO: Upsert into event_stats_daily table when it exists
        // For now, just log the stats
        /*
        const { error: upsertError } = await supabase
          .from('event_stats_daily')
          .upsert({
            event_id: event.id,
            date: yesterdayStr,
            views: viewsCount,
            registrations: registrationsCount || 0,
            checkins: checkinsCount,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'event_id,date'
          });

        if (upsertError) {
          console.error(`Error upserting stats for event ${event.id}:`, upsertError);
          continue;
        }
        */

        statsGenerated++;
      } catch (error: any) {
        console.error(`Error processing event ${event.id}:`, error.message);
      }
    }

    console.log(`Analytics job complete: ${statsGenerated} events processed`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Daily analytics generated successfully',
        date: yesterdayStr,
        statsGenerated,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in event-analytics-daily function:', error);
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

// ===========================================================================
// Edge Function: Events Sync
// ===========================================================================
// Purpose: Sync events from external sources (future: Shopify, Google Calendar, etc.)
// Endpoint: POST /functions/v1/events-sync
// Auth: Service role or API key
// Updated: 2025-01-28 - Fixed TypeScript error handling
// ===========================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EventSyncPayload {
  source: 'shopify' | 'google_calendar' | 'manual'
  events: Array<{
    title: string
    slug: string
    description: string
    event_datetime: string
    category_slug?: string
    venue_slug?: string
  }>
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Verify authorization
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse request
    const payload: EventSyncPayload = await req.json()

    if (!payload.events || !Array.isArray(payload.events)) {
      return new Response(
        JSON.stringify({ error: 'Invalid payload: events array required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
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

    const results = {
      created: 0,
      updated: 0,
      failed: 0,
      errors: [] as Array<{ event: string, error: string }>
    }

    // Process each event
    for (const event of payload.events) {
      try {
        // Get category ID from slug if provided
        let category_id = null
        if (event.category_slug) {
          const { data: category } = await supabaseAdmin
            .from('event_categories')
            .select('id')
            .eq('slug', event.category_slug)
            .single()
          category_id = category?.id
        }

        // Get venue ID from slug if provided
        let venue_id = null
        if (event.venue_slug) {
          const { data: venue } = await supabaseAdmin
            .from('venues')
            .select('id')
            .eq('slug', event.venue_slug)
            .single()
          venue_id = venue?.id
        }

        // Upsert event
        const { error } = await supabaseAdmin
          .from('events')
          .upsert({
            slug: event.slug,
            title: event.title,
            description: event.description,
            event_datetime: event.event_datetime,
            event_date: event.event_datetime.split('T')[0],
            event_time: event.event_datetime.split('T')[1]?.split('+')[0] || '00:00:00',
            category_id,
            venue_id,
            status: 'published'
          }, {
            onConflict: 'slug'
          })

        if (error) {
          results.failed++
          results.errors.push({
            event: event.title,
            error: error.message
          })
        } else {
          results.created++
        }

      } catch (err) {
        results.failed++
        results.errors.push({
          event: event.title,
          error: err instanceof Error ? err.message : 'Unknown error'
        })
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        source: payload.source,
        results,
        timestamp: new Date().toISOString()
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Sync error:', error)
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

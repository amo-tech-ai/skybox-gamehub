import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

/**
 * Sports Video Sync
 * Automatically syncs latest sports highlights from YouTube into videos table
 * 
 * This function is designed to be called by Supabase cron (every 4 hours)
 * It fetches videos from configured YouTube playlists and upserts into the videos table
 * 
 * TODO: Create videos table:
 * - id (uuid)
 * - title (text)
 * - source (text) - 'youtube'
 * - source_id (text) - YouTube video ID
 * - sport (text) - NFL, NBA, MLB, etc.
 * - thumbnail_url (text)
 * - is_goat (boolean)
 * - is_active (boolean)
 * - created_at (timestamp)
 * - updated_at (timestamp)
 */

// Configure sport playlists (YouTube playlist IDs)
// TODO: Replace with actual playlist IDs or move to environment variables
const SPORT_PLAYLISTS: Record<string, string> = {
  'NFL': 'PLExample123NFL',
  'NBA': 'PLExample456NBA',
  'MLB': 'PLExample789MLB',
  'Soccer': 'PLExampleABCSoccer',
};

const MAX_RESULTS_PER_PLAYLIST = 10;

const handler = async (req: Request): Promise<Response> => {
  try {
    console.log('Starting sports-video-sync job');

    // Get YouTube API key
    const youtubeApiKey = Deno.env.get('YOUTUBE_API_KEY');
    if (!youtubeApiKey) {
      console.error('Missing YOUTUBE_API_KEY');
      throw new Error('YouTube API not configured');
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    let totalInserted = 0;
    let totalUpdated = 0;
    let totalErrors = 0;

    // Process each sport playlist
    for (const [sport, playlistId] of Object.entries(SPORT_PLAYLISTS)) {
      try {
        console.log(`Fetching videos from ${sport} playlist: ${playlistId}`);

        // Fetch videos from YouTube Playlist
        const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
        youtubeUrl.searchParams.set('part', 'snippet');
        youtubeUrl.searchParams.set('playlistId', playlistId);
        youtubeUrl.searchParams.set('maxResults', MAX_RESULTS_PER_PLAYLIST.toString());
        youtubeUrl.searchParams.set('key', youtubeApiKey);

        const youtubeResponse = await fetch(youtubeUrl.toString());

        if (!youtubeResponse.ok) {
          const errorText = await youtubeResponse.text();
          console.error(`YouTube API error for ${sport}:`, errorText);
          totalErrors++;
          continue;
        }

        const youtubeData = await youtubeResponse.json();
        const videos = youtubeData.items || [];

        console.log(`Found ${videos.length} videos for ${sport}`);

        // Process each video
        for (const item of videos) {
          try {
            const videoId = item.snippet.resourceId.videoId;
            const title = item.snippet.title;
            const thumbnailUrl = item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url;

            // TODO: Upsert into videos table when it exists
            /*
            const { error: upsertError } = await supabase
              .from('videos')
              .upsert({
                source: 'youtube',
                source_id: videoId,
                title: title,
                sport: sport,
                thumbnail_url: thumbnailUrl,
                is_goat: false,
                is_active: true,
                updated_at: new Date().toISOString(),
              }, {
                onConflict: 'source,source_id',
              });

            if (upsertError) {
              console.error(`Error upserting video ${videoId}:`, upsertError);
              totalErrors++;
            } else {
              totalInserted++;
            }
            */

            console.log(`Processed video: ${title} (${videoId})`);
            totalInserted++; // Placeholder until videos table exists

          } catch (error: any) {
            console.error(`Error processing video:`, error.message);
            totalErrors++;
          }
        }

      } catch (error: any) {
        console.error(`Error fetching ${sport} playlist:`, error.message);
        totalErrors++;
      }
    }

    console.log(`Video sync complete: ${totalInserted} inserted/updated, ${totalErrors} errors`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Sports video sync completed',
        inserted: totalInserted,
        updated: totalUpdated,
        errors: totalErrors,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    console.error('Error in sports-video-sync function:', error);
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

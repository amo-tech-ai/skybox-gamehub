# Sports Video Sync Edge Function

## Overview
Automatically syncs latest sports highlights from YouTube playlists into the `videos` table for Skybox TV display.

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/sports-video-sync
```

⚠️ **Note**: This function is triggered by Supabase cron (every 4 hours), not called directly by browsers.

## What It Does
- Fetches latest videos from configured YouTube playlists (NFL, NBA, MLB, Soccer)
- Upserts video metadata into `videos` table
- Prevents duplicates using `source` + `source_id` constraint
- Returns counts of inserted/updated videos

## Cron Schedule
Configured in `supabase/config.toml`:
```toml
[functions.sports-video-sync]
verify_jwt = false
schedule = "0 */4 * * *"  # Every 4 hours
```

### Why Every 4 Hours?
- YouTube updates playlists frequently
- Balances freshness with API quota limits
- Can be adjusted based on needs

## YouTube Playlist Configuration

### Current Playlists (Hardcoded)
```typescript
const SPORT_PLAYLISTS = {
  'NFL': 'PLExample123NFL',
  'NBA': 'PLExample456NBA',
  'MLB': 'PLExample789MLB',
  'Soccer': 'PLExampleABCSoccer',
};
```

### TODO: Move to Environment Variables
```bash
# In Supabase Function Secrets
YOUTUBE_PLAYLIST_NFL=PLRealPlaylistID123
YOUTUBE_PLAYLIST_NBA=PLRealPlaylistID456
YOUTUBE_PLAYLIST_MLB=PLRealPlaylistID789
YOUTUBE_PLAYLIST_SOCCER=PLRealPlaylistIDABC
```

Then in code:
```typescript
const SPORT_PLAYLISTS = {
  'NFL': Deno.env.get('YOUTUBE_PLAYLIST_NFL')!,
  'NBA': Deno.env.get('YOUTUBE_PLAYLIST_NBA')!,
  'MLB': Deno.env.get('YOUTUBE_PLAYLIST_MLB')!,
  'Soccer': Deno.env.get('YOUTUBE_PLAYLIST_SOCCER')!,
};
```

## Finding YouTube Playlist IDs

### Method 1: From Playlist URL
```
https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
                                       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                       This is the Playlist ID
```

### Method 2: YouTube Data API
Use YouTube's [Channels API](https://developers.google.com/youtube/v3/docs/channels) to find official playlists.

### Recommended Playlists
- **NFL**: Official NFL highlights channel uploads
- **NBA**: Official NBA highlights
- **MLB**: Official MLB highlights  
- **Soccer**: Champions League, Premier League, etc.

## Response

### Success (200)
```json
{
  "success": true,
  "message": "Sports video sync completed",
  "inserted": 23,
  "updated": 7,
  "errors": 0
}
```

## Database Schema

### TODO: Create `videos` Table
```sql
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT NOT NULL, -- 'youtube'
  source_id TEXT NOT NULL, -- YouTube video ID
  sport TEXT NOT NULL, -- 'NFL', 'NBA', 'MLB', 'Soccer'
  thumbnail_url TEXT,
  is_goat BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(source, source_id)
);

CREATE INDEX idx_videos_sport ON videos(sport);
CREATE INDEX idx_videos_active ON videos(is_active);
CREATE INDEX idx_videos_goat ON videos(is_goat);

-- Enable RLS
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Everyone can view active videos
CREATE POLICY "Active videos are viewable by everyone"
  ON videos
  FOR SELECT
  USING (is_active = true);

-- Staff can manage videos
CREATE POLICY "Staff can manage videos"
  ON videos
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role IN ('staff', 'admin', 'superadmin')
    )
  );
```

## YouTube API Setup

### Step 1: Get API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → Create **API Key**
5. Copy the key

### Step 2: Add to Supabase Secrets
```bash
supabase secrets set YOUTUBE_API_KEY=YOUR_API_KEY_HERE
```

Or via Dashboard:
1. Go to Supabase Dashboard → Settings → Functions
2. Add secret: `YOUTUBE_API_KEY`

### API Quota Limits
- Default: **10,000 units/day**
- Each playlist fetch: **~1-3 units**
- Can support ~3,000 fetches per day
- Our schedule (4 hours = 6x/day × 4 playlists = 24 fetches/day)
- Well within limits ✅

## Manual Trigger

### Via cURL
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/sports-video-sync \
  -H "Content-Type: application/json"
```

### TODO: Admin Button
```tsx
function AdminVideoSync() {
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await fetch(
        'https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/sports-video-sync',
        { method: 'POST' }
      );
      
      const result = await response.json();
      toast.success(
        `✅ Videos sincronizados!\n` +
        `Nuevos: ${result.inserted}\n` +
        `Actualizados: ${result.updated}`
      );
    } catch (error) {
      toast.error('Error al sincronizar videos');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <button onClick={handleSync} disabled={syncing}>
      {syncing ? 'Sincronizando...' : 'Sync videos now'}
    </button>
  );
}
```

## Using Videos in Skybox TV Page

### Fetch Videos by Sport
```typescript
const { data: nflVideos } = useQuery({
  queryKey: ['videos', 'nfl'],
  queryFn: async () => {
    const { data } = await supabase
      .from('videos')
      .select('*')
      .eq('sport', 'NFL')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10);
    return data;
  }
});
```

### Display Video Component
```tsx
function VideoCard({ video }: { video: Video }) {
  return (
    <div className="relative aspect-video">
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-full object-cover rounded"
      />
      <a
        href={`https://youtube.com/watch?v=${video.source_id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30"
      >
        <PlayIcon className="w-16 h-16 text-white" />
      </a>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
        <h3 className="text-white font-bold">{video.title}</h3>
        <p className="text-white/80 text-sm">{video.sport}</p>
      </div>
    </div>
  );
}
```

### Curated "GOAT" Videos
```typescript
// Admin can mark special videos as "GOAT"
const { data: goatVideos } = await supabase
  .from('videos')
  .select('*')
  .eq('is_goat', true)
  .limit(5);

// Display in special section
<section className="goat-highlights">
  <h2>🐐 Greatest Moments</h2>
  <div className="grid grid-cols-2 gap-4">
    {goatVideos.map(video => <VideoCard key={video.id} video={video} />)}
  </div>
</section>
```

## Monitoring

### Check Last Sync
```sql
SELECT 
  sport,
  COUNT(*) as video_count,
  MAX(created_at) as last_added
FROM videos
GROUP BY sport;
```

### View Logs
```bash
supabase functions logs sports-video-sync --tail
```

## Environment Variables Required
- `YOUTUBE_API_KEY` (required)
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Tables Used
- `videos`: Stores synced video metadata (TODO: create table)

## Troubleshooting

### No videos being added
1. Check YouTube API key is valid
2. Verify playlist IDs are correct
3. Check API quota hasn't been exceeded
4. View function logs for errors

### Duplicate videos
Shouldn't happen due to `UNIQUE(source, source_id)` constraint.

### Stale videos showing
- Old videos aren't deleted automatically
- Admin should periodically mark old videos `is_active = false`
- Or add `created_at > NOW() - INTERVAL '30 days'` to queries

## Future Improvements
- [ ] Move playlist IDs to environment variables
- [ ] Auto-deactivate videos older than 30 days
- [ ] Add video duration and view count metadata
- [ ] Support multiple video sources (Vimeo, Dailymotion)
- [ ] Add admin UI for curating GOAT videos
- [ ] Track video view counts in app
- [ ] Generate daily highlight reels automatically
- [ ] Add webhook for instant sync when new videos uploaded

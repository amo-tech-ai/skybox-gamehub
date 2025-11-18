-- Create missing tables for Skybox backend
-- Tables: event_stats_daily, loyalty_history, videos

-- DAILY ANALYTICS (used by event-analytics-daily)
CREATE TABLE IF NOT EXISTS public.event_stats_daily (
  id BIGSERIAL PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  registrations INTEGER DEFAULT 0,
  checkins INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (event_id, date)
);

-- LOYALTY HISTORY (per-customer points log)
CREATE TABLE IF NOT EXISTS public.loyalty_history (
  id BIGSERIAL PRIMARY KEY,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SKYBOX TV VIDEOS (for sports-video-sync and Skybox TV)
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL,
  source_id TEXT NOT NULL,
  title TEXT,
  sport TEXT,
  thumbnail_url TEXT,
  is_goat BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add useful indexes
CREATE INDEX IF NOT EXISTS idx_event_stats_daily_event_date
  ON public.event_stats_daily (event_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_loyalty_history_customer_created
  ON public.loyalty_history (customer_id, created_at DESC);

CREATE UNIQUE INDEX IF NOT EXISTS idx_videos_source_source_id
  ON public.videos (source, source_id);

CREATE INDEX IF NOT EXISTS idx_videos_active_sport
  ON public.videos (is_active, sport) WHERE is_active = TRUE;

-- Enable RLS
ALTER TABLE public.event_stats_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event_stats_daily
DROP POLICY IF EXISTS "Anyone can read event stats" ON public.event_stats_daily;
CREATE POLICY "Anyone can read event stats"
  ON public.event_stats_daily
  FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "Service role can manage event stats" ON public.event_stats_daily;
CREATE POLICY "Service role can manage event stats"
  ON public.event_stats_daily
  FOR ALL
  USING (TRUE);

-- RLS Policies for loyalty_history
DROP POLICY IF EXISTS "Users can view own loyalty history" ON public.loyalty_history;
CREATE POLICY "Users can view own loyalty history"
  ON public.loyalty_history
  FOR SELECT
  USING (customer_id = auth.uid());

DROP POLICY IF EXISTS "Staff can view all loyalty history" ON public.loyalty_history;
CREATE POLICY "Staff can view all loyalty history"
  ON public.loyalty_history
  FOR SELECT
  USING (is_staff());

DROP POLICY IF EXISTS "Service role can manage loyalty history" ON public.loyalty_history;
CREATE POLICY "Service role can manage loyalty history"
  ON public.loyalty_history
  FOR ALL
  USING (TRUE);

-- RLS Policies for videos
DROP POLICY IF EXISTS "Anyone can read active videos" ON public.videos;
CREATE POLICY "Anyone can read active videos"
  ON public.videos
  FOR SELECT
  USING (is_active = TRUE);

DROP POLICY IF EXISTS "Staff can manage videos" ON public.videos;
CREATE POLICY "Staff can manage videos"
  ON public.videos
  FOR ALL
  USING (is_staff());

DROP POLICY IF EXISTS "Service role can manage videos" ON public.videos;
CREATE POLICY "Service role can manage videos"
  ON public.videos
  FOR ALL
  USING (TRUE);

-- Add updated_at triggers
DROP TRIGGER IF EXISTS update_event_stats_daily_updated_at ON public.event_stats_daily;
CREATE TRIGGER update_event_stats_daily_updated_at
  BEFORE UPDATE ON public.event_stats_daily
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_updated_at ON public.videos;
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
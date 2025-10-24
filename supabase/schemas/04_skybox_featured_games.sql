-- Schema: Skybox Featured Games table
-- Purpose: Featured games for promotional display
-- Dependencies: games table

CREATE TABLE IF NOT EXISTS public.skybox_featured_games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  game_id BIGINT NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  featured_at TIMESTAMP WITH TIME ZONE NOT NULL,
  display_priority INTEGER DEFAULT 0,
  is_promotional BOOLEAN DEFAULT FALSE,
  promotion_text TEXT,
  special_offers TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_game_featured_at UNIQUE(game_id, featured_at)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_featured_games_game_id ON public.skybox_featured_games(game_id);
CREATE INDEX IF NOT EXISTS idx_featured_games_featured_at ON public.skybox_featured_games(featured_at);
CREATE INDEX IF NOT EXISTS idx_featured_games_priority ON public.skybox_featured_games(display_priority DESC);

-- Enable Row Level Security
ALTER TABLE public.skybox_featured_games ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Featured games are readable by everyone"
ON public.skybox_featured_games FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify featured games"
ON public.skybox_featured_games FOR ALL
TO authenticated
USING (is_staff());
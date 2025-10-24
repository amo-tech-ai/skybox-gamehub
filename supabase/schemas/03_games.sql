-- Schema: Games table
-- Purpose: Sports games and matches
-- Dependencies: leagues, teams tables

CREATE TABLE IF NOT EXISTS public.games (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  home_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  away_team_id BIGINT NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  game_date DATE NOT NULL,
  game_time TIME NOT NULL,
  game_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  venue TEXT,
  broadcast_networks TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled', 'postponed')),
  home_score INTEGER,
  away_score INTEGER,
  week_number INTEGER,
  season_year INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_scores CHECK (
    (home_score IS NULL AND away_score IS NULL) OR 
    (home_score IS NOT NULL AND away_score IS NOT NULL)
  ),
  CONSTRAINT valid_datetime CHECK (game_datetime >= NOW() OR status = 'completed')
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_games_league_id ON public.games(league_id);
CREATE INDEX IF NOT EXISTS idx_games_datetime ON public.games(game_datetime);
CREATE INDEX IF NOT EXISTS idx_games_season ON public.games(season_year);
CREATE INDEX IF NOT EXISTS idx_games_status ON public.games(status);
CREATE INDEX IF NOT EXISTS idx_games_teams ON public.games(home_team_id, away_team_id);

-- Enable Row Level Security
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Games are readable by everyone"
ON public.games FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify games"
ON public.games FOR ALL
TO authenticated
USING (is_staff());
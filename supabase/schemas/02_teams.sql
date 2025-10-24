-- Schema: Teams table
-- Purpose: Sports teams within leagues
-- Dependencies: leagues table

CREATE TABLE IF NOT EXISTS public.teams (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  league_id BIGINT NOT NULL REFERENCES public.leagues(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  abbreviation TEXT,
  logo_url TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT unique_league_abbreviation UNIQUE(league_id, abbreviation)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_teams_league_id ON public.teams(league_id);
CREATE INDEX IF NOT EXISTS idx_teams_name ON public.teams(name);
CREATE INDEX IF NOT EXISTS idx_teams_abbreviation ON public.teams(abbreviation);

-- Enable Row Level Security
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Teams are readable by everyone"
ON public.teams FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify teams"
ON public.teams FOR ALL
TO authenticated
USING (is_staff());
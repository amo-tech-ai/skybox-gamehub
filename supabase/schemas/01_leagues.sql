-- Schema: Leagues table
-- Purpose: Sports leagues (NFL, NBA, NHL, MLB)
-- Dependencies: None

CREATE TABLE IF NOT EXISTS public.leagues (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leagues_slug ON public.leagues(slug);
CREATE INDEX IF NOT EXISTS idx_leagues_name ON public.leagues(name);

-- Enable Row Level Security
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Leagues are readable by everyone"
ON public.leagues FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify leagues"
ON public.leagues FOR ALL
TO authenticated
USING (is_staff());

-- Insert initial data
INSERT INTO public.leagues (name, slug) VALUES
  ('NFL', 'nfl'),
  ('NBA', 'nba'),
  ('NHL', 'nhl'),
  ('MLB', 'mlb')
ON CONFLICT (slug) DO NOTHING;
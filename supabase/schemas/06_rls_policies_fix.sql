-- Schema: RLS Policies Fix
-- Purpose: Add missing RLS policies to existing tables
-- Dependencies: All tables must exist

-- Fix leagues table RLS
ALTER TABLE public.leagues ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Leagues are readable by everyone" ON public.leagues;
DROP POLICY IF EXISTS "Only staff can modify leagues" ON public.leagues;

-- Create new policies
CREATE POLICY "Leagues are readable by everyone"
ON public.leagues FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify leagues"
ON public.leagues FOR ALL
TO authenticated
USING (is_staff());

-- Fix teams table RLS
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Teams are readable by everyone" ON public.teams;
DROP POLICY IF EXISTS "Only staff can modify teams" ON public.teams;

CREATE POLICY "Teams are readable by everyone"
ON public.teams FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify teams"
ON public.teams FOR ALL
TO authenticated
USING (is_staff());

-- Fix games table RLS
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Games are readable by everyone" ON public.games;
DROP POLICY IF EXISTS "Only staff can modify games" ON public.games;

CREATE POLICY "Games are readable by everyone"
ON public.games FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify games"
ON public.games FOR ALL
TO authenticated
USING (is_staff());

-- Fix skybox_featured_games table RLS
ALTER TABLE public.skybox_featured_games ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Featured games are readable by everyone" ON public.skybox_featured_games;
DROP POLICY IF EXISTS "Only staff can modify featured games" ON public.skybox_featured_games;

CREATE POLICY "Featured games are readable by everyone"
ON public.skybox_featured_games FOR SELECT
USING (true);

CREATE POLICY "Only staff can modify featured games"
ON public.skybox_featured_games FOR ALL
TO authenticated
USING (is_staff());
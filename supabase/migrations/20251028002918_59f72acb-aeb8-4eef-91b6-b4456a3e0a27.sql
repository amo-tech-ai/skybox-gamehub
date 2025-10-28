-- Create venues table
CREATE TABLE IF NOT EXISTS public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create event_categories junction table
CREATE TABLE IF NOT EXISTS public.event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, category_id)
);

-- Add venue_id FK to events (keeping old venue text for migration)
ALTER TABLE public.events 
  ADD COLUMN IF NOT EXISTS venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL;

-- Enable RLS
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_categories ENABLE ROW LEVEL SECURITY;

-- RLS policies for public read
DROP POLICY IF EXISTS "Venues are readable by everyone" ON public.venues;
CREATE POLICY "Venues are readable by everyone" 
  ON public.venues FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Categories are readable by everyone" ON public.categories;
CREATE POLICY "Categories are readable by everyone" 
  ON public.categories FOR SELECT 
  USING (true);

DROP POLICY IF EXISTS "Event categories are readable by everyone" ON public.event_categories;
CREATE POLICY "Event categories are readable by everyone" 
  ON public.event_categories FOR SELECT 
  USING (true);

-- Staff can manage these
DROP POLICY IF EXISTS "Staff can manage venues" ON public.venues;
CREATE POLICY "Staff can manage venues" 
  ON public.venues FOR ALL 
  USING (is_staff());

DROP POLICY IF EXISTS "Staff can manage categories" ON public.categories;
CREATE POLICY "Staff can manage categories" 
  ON public.categories FOR ALL 
  USING (is_staff());

DROP POLICY IF EXISTS "Staff can manage event categories" ON public.event_categories;
CREATE POLICY "Staff can manage event categories" 
  ON public.event_categories FOR ALL 
  USING (is_staff());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_categories_event_id ON public.event_categories(event_id);
CREATE INDEX IF NOT EXISTS idx_event_categories_category_id ON public.event_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON public.events(venue_id);

-- Insert default venue (migrate existing text venues later)
INSERT INTO public.venues (name, address, city) 
VALUES ('Skybox Sports Bar', 'TBA', 'Medellín')
ON CONFLICT DO NOTHING;

-- Insert common categories
INSERT INTO public.categories (name, slug, display_order) VALUES
  ('Sports', 'sports', 1),
  ('NFL', 'nfl', 2),
  ('MLB', 'mlb', 3),
  ('NBA', 'nba', 4),
  ('NHL', 'nhl', 5),
  ('Soccer', 'soccer', 6),
  ('UFC', 'ufc', 7),
  ('Private Events', 'private-events', 8),
  ('Watch Party', 'watch-party', 9),
  ('Special Event', 'special-event', 10)
ON CONFLICT (slug) DO NOTHING;
-- Migration: Create comprehensive events system schema
-- Created: 2025-10-24 00:00:02
-- Author: Skybox Team
-- Dependencies: 20251024000001_create_profiles_and_auth.sql
-- Rollback: See bottom of file

BEGIN;

-- =============================================================================
-- EVENT CATEGORIES
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Category Information
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT, -- Lucide icon name
  color TEXT, -- Hex color code

  -- Ordering
  display_order INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  -- Constraints
  CONSTRAINT valid_slug CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT valid_color CHECK (color IS NULL OR color ~ '^#[0-9A-Fa-f]{6}$')
);

-- =============================================================================
-- VENUES
-- =============================================================================

CREATE TABLE IF NOT EXISTS venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Venue Information
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,

  -- Location
  address TEXT,
  city TEXT DEFAULT 'Medellín',
  neighborhood TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),

  -- Capacity
  total_capacity INTEGER,
  standing_capacity INTEGER,
  seated_capacity INTEGER,
  vip_capacity INTEGER,

  -- Amenities
  amenities JSONB DEFAULT '[]'::jsonb,

  -- Media
  featured_image_url TEXT,
  gallery_images JSONB DEFAULT '[]'::jsonb,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT valid_slug_venues CHECK (slug ~ '^[a-z0-9-]+$')
);

-- =============================================================================
-- EVENTS (Main Table)
-- =============================================================================

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Information
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT NOT NULL,
  full_description TEXT,

  -- Categorization
  category_id UUID REFERENCES event_categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}'::TEXT[],

  -- Venue & Location
  venue_id UUID REFERENCES venues(id) ON DELETE SET NULL,
  custom_location TEXT, -- For one-off venues

  -- Date & Time
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_datetime TIMESTAMPTZ NOT NULL,
  doors_open_time TIME,
  event_end_datetime TIMESTAMPTZ,
  timezone TEXT DEFAULT 'America/Bogota',

  -- Capacity & Availability
  total_capacity INTEGER,
  available_spots INTEGER,
  min_age INTEGER DEFAULT 18,

  -- Pricing
  is_free BOOLEAN DEFAULT false,
  base_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'COP',

  -- Media
  featured_image_url TEXT NOT NULL,
  gallery_images JSONB DEFAULT '[]'::jsonb,
  video_url TEXT,

  -- Features
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  featured_priority INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'past', 'sold_out')),

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,

  -- Tracking
  view_count INTEGER DEFAULT 0,
  reservation_count INTEGER DEFAULT 0,

  -- Audit
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  published_at TIMESTAMPTZ,

  -- Constraints
  CONSTRAINT valid_slug_events CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT valid_datetime CHECK (event_datetime >= now() OR status = 'past'),
  CONSTRAINT valid_capacity CHECK (total_capacity IS NULL OR total_capacity > 0),
  CONSTRAINT valid_price CHECK (is_free = true OR base_price > 0)
);

-- =============================================================================
-- EVENT HIGHLIGHTS
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_highlights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

  -- Content
  highlight_text TEXT NOT NULL,
  icon TEXT, -- Lucide icon name

  -- Ordering
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT unique_event_highlight UNIQUE(event_id, highlight_text)
);

-- =============================================================================
-- EVENT PRIZES (For contests, giveaways)
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_prizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

  -- Prize Information
  prize_title TEXT NOT NULL,
  prize_amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'COP',
  description TEXT NOT NULL,

  -- Categorization
  prize_category TEXT, -- e.g., "Best Costume", "Grand Prize"

  -- Rules
  eligibility_rules TEXT,
  how_to_win TEXT,

  -- Winner
  winner_profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  awarded_at TIMESTAMPTZ,

  -- Display
  display_order INTEGER DEFAULT 0,
  emoji TEXT, -- For visual flair

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- EVENT SPECIALS (Food & Drink Specials)
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_specials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

  -- Special Information
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  special_price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  currency TEXT DEFAULT 'COP',

  -- Categorization
  category TEXT, -- 'food', 'drink', 'cocktail', 'dessert'
  tags TEXT[] DEFAULT '{}'::TEXT[],

  -- Details
  image_url TEXT,
  ingredients TEXT,
  allergens TEXT[] DEFAULT '{}'::TEXT[],
  alcohol_content TEXT, -- e.g., "ABV 12%"

  -- Availability
  is_available BOOLEAN DEFAULT true,
  quantity_limit INTEGER,

  -- Display
  display_order INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- EVENT FAQs
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE, -- NULL = global FAQ

  -- FAQ Content
  question TEXT NOT NULL,
  answer TEXT NOT NULL,

  -- Categorization
  category TEXT, -- e.g., "General", "Tickets", "Venue"

  -- Display
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================================================
-- EVENT PACKAGES (VIP, Table Packages)
-- =============================================================================

CREATE TABLE IF NOT EXISTS event_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE, -- NULL = global package

  -- Package Information
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'COP',

  -- Capacity
  min_guests INTEGER DEFAULT 1,
  max_guests INTEGER NOT NULL,

  -- Inclusions
  includes JSONB DEFAULT '[]'::jsonb, -- Array of included items

  -- Availability
  total_available INTEGER,
  remaining_available INTEGER,
  is_active BOOLEAN DEFAULT true,

  -- Priority
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),

  CONSTRAINT valid_guests CHECK (min_guests <= max_guests)
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Event Categories
CREATE INDEX IF NOT EXISTS idx_event_categories_slug ON event_categories(slug);
CREATE INDEX IF NOT EXISTS idx_event_categories_active ON event_categories(is_active);

-- Venues
CREATE INDEX IF NOT EXISTS idx_venues_slug ON venues(slug);
CREATE INDEX IF NOT EXISTS idx_venues_city ON venues(city);
CREATE INDEX IF NOT EXISTS idx_venues_active ON venues(is_active);

-- Events
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_category_id ON events(category_id);
CREATE INDEX IF NOT EXISTS idx_events_venue_id ON events(venue_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_events_datetime ON events(event_datetime) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured, featured_priority) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_events_published ON events(published_at DESC) WHERE status = 'published' AND deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_events_tags ON events USING gin(tags);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_events_search ON events
  USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(subtitle, '')));

-- Event Highlights
CREATE INDEX IF NOT EXISTS idx_event_highlights_event_id ON event_highlights(event_id);

-- Event Prizes
CREATE INDEX IF NOT EXISTS idx_event_prizes_event_id ON event_prizes(event_id);

-- Event Specials
CREATE INDEX IF NOT EXISTS idx_event_specials_event_id ON event_specials(event_id);
CREATE INDEX IF NOT EXISTS idx_event_specials_category ON event_specials(category);

-- Event FAQs
CREATE INDEX IF NOT EXISTS idx_event_faqs_event_id ON event_faqs(event_id);
CREATE INDEX IF NOT EXISTS idx_event_faqs_featured ON event_faqs(is_featured);

-- Event Packages
CREATE INDEX IF NOT EXISTS idx_event_packages_event_id ON event_packages(event_id);
CREATE INDEX IF NOT EXISTS idx_event_packages_active ON event_packages(is_active);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Update updated_at on events
DROP TRIGGER IF EXISTS set_updated_at_events ON events;
CREATE TRIGGER set_updated_at_events
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on event_categories
DROP TRIGGER IF EXISTS set_updated_at_event_categories ON event_categories;
CREATE TRIGGER set_updated_at_event_categories
  BEFORE UPDATE ON event_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on venues
DROP TRIGGER IF EXISTS set_updated_at_venues ON venues;
CREATE TRIGGER set_updated_at_venues
  BEFORE UPDATE ON venues
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on event_prizes
DROP TRIGGER IF EXISTS set_updated_at_event_prizes ON event_prizes;
CREATE TRIGGER set_updated_at_event_prizes
  BEFORE UPDATE ON event_prizes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on event_specials
DROP TRIGGER IF EXISTS set_updated_at_event_specials ON event_specials;
CREATE TRIGGER set_updated_at_event_specials
  BEFORE UPDATE ON event_specials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on event_faqs
DROP TRIGGER IF EXISTS set_updated_at_event_faqs ON event_faqs;
CREATE TRIGGER set_updated_at_event_faqs
  BEFORE UPDATE ON event_faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update updated_at on event_packages
DROP TRIGGER IF EXISTS set_updated_at_event_packages ON event_packages;
CREATE TRIGGER set_updated_at_event_packages
  BEFORE UPDATE ON event_packages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-set published_at when status changes to published
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'published' AND OLD.status != 'published' THEN
    NEW.published_at = now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_set_published_at ON events;
CREATE TRIGGER trigger_set_published_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION set_published_at();

-- Auto-decrement available_spots when package is booked
CREATE OR REPLACE FUNCTION decrement_package_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE event_packages
    SET remaining_available = remaining_available - 1
    WHERE id = NEW.package_id
    AND remaining_available > 0;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Note: This trigger will be created when reservations table exists

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Event Categories
ALTER TABLE event_categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event categories are viewable by everyone" ON event_categories;
CREATE POLICY "Event categories are viewable by everyone"
  ON event_categories FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Staff can manage event categories" ON event_categories;
CREATE POLICY "Staff can manage event categories"
  ON event_categories FOR ALL
  TO authenticated
  USING (is_staff());

-- Venues
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Venues are viewable by everyone" ON venues;
CREATE POLICY "Venues are viewable by everyone"
  ON venues FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Staff can manage venues" ON venues;
CREATE POLICY "Staff can manage venues"
  ON venues FOR ALL
  TO authenticated
  USING (is_staff());

-- Events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published events are viewable by everyone" ON events;
CREATE POLICY "Published events are viewable by everyone"
  ON events FOR SELECT
  TO authenticated, anon
  USING (status = 'published' AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Staff can view all events" ON events;
CREATE POLICY "Staff can view all events"
  ON events FOR SELECT
  TO authenticated
  USING (is_staff());

DROP POLICY IF EXISTS "Staff can create events" ON events;
CREATE POLICY "Staff can create events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (is_staff());

DROP POLICY IF EXISTS "Staff can update events" ON events;
CREATE POLICY "Staff can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (is_staff());

DROP POLICY IF EXISTS "Staff can delete events" ON events;
CREATE POLICY "Staff can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (is_staff());

-- Event Highlights
ALTER TABLE event_highlights ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event highlights are viewable with parent event" ON event_highlights;
CREATE POLICY "Event highlights are viewable with parent event"
  ON event_highlights FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_highlights.event_id
      AND status = 'published'
      AND deleted_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Staff can manage event highlights" ON event_highlights;
CREATE POLICY "Staff can manage event highlights"
  ON event_highlights FOR ALL
  TO authenticated
  USING (is_staff());

-- Event Prizes
ALTER TABLE event_prizes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event prizes are viewable with parent event" ON event_prizes;
CREATE POLICY "Event prizes are viewable with parent event"
  ON event_prizes FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_prizes.event_id
      AND status = 'published'
      AND deleted_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Staff can manage event prizes" ON event_prizes;
CREATE POLICY "Staff can manage event prizes"
  ON event_prizes FOR ALL
  TO authenticated
  USING (is_staff());

-- Event Specials
ALTER TABLE event_specials ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event specials are viewable with parent event" ON event_specials;
CREATE POLICY "Event specials are viewable with parent event"
  ON event_specials FOR SELECT
  TO authenticated, anon
  USING (
    EXISTS (
      SELECT 1 FROM events
      WHERE id = event_specials.event_id
      AND status = 'published'
      AND deleted_at IS NULL
    )
  );

DROP POLICY IF EXISTS "Staff can manage event specials" ON event_specials;
CREATE POLICY "Staff can manage event specials"
  ON event_specials FOR ALL
  TO authenticated
  USING (is_staff());

-- Event FAQs
ALTER TABLE event_faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Event FAQs are viewable by everyone" ON event_faqs;
CREATE POLICY "Event FAQs are viewable by everyone"
  ON event_faqs FOR SELECT
  TO authenticated, anon
  USING (true);

DROP POLICY IF EXISTS "Staff can manage event FAQs" ON event_faqs;
CREATE POLICY "Staff can manage event FAQs"
  ON event_faqs FOR ALL
  TO authenticated
  USING (is_staff());

-- Event Packages
ALTER TABLE event_packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Active event packages are viewable by everyone" ON event_packages;
CREATE POLICY "Active event packages are viewable by everyone"
  ON event_packages FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

DROP POLICY IF EXISTS "Staff can manage event packages" ON event_packages;
CREATE POLICY "Staff can manage event packages"
  ON event_packages FOR ALL
  TO authenticated
  USING (is_staff());

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- Get upcoming events
CREATE OR REPLACE FUNCTION get_upcoming_events(limit_count INTEGER DEFAULT 10)
RETURNS SETOF events
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM events
  WHERE status = 'published'
    AND deleted_at IS NULL
    AND event_datetime >= now()
  ORDER BY event_datetime ASC
  LIMIT limit_count;
$$;

-- Get featured events
CREATE OR REPLACE FUNCTION get_featured_events(limit_count INTEGER DEFAULT 3)
RETURNS SETOF events
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM events
  WHERE status = 'published'
    AND deleted_at IS NULL
    AND is_featured = true
    AND event_datetime >= now()
  ORDER BY featured_priority DESC, event_datetime ASC
  LIMIT limit_count;
$$;

-- Search events (full-text search)
CREATE OR REPLACE FUNCTION search_events(search_query TEXT, limit_count INTEGER DEFAULT 20)
RETURNS SETOF events
LANGUAGE sql
STABLE
AS $$
  SELECT *
  FROM events
  WHERE status = 'published'
    AND deleted_at IS NULL
    AND to_tsvector('english', title || ' ' || COALESCE(description, '') || ' ' || COALESCE(subtitle, ''))
        @@ plainto_tsquery('english', search_query)
  ORDER BY event_datetime ASC
  LIMIT limit_count;
$$;

-- Increment view count
CREATE OR REPLACE FUNCTION increment_event_views(event_id_param UUID)
RETURNS VOID
LANGUAGE sql
AS $$
  UPDATE events
  SET view_count = view_count + 1
  WHERE id = event_id_param;
$$;

-- =============================================================================
-- GRANTS
-- =============================================================================

GRANT SELECT ON event_categories, venues, events, event_highlights, event_prizes, event_specials, event_faqs, event_packages TO authenticated, anon;
GRANT ALL ON event_categories, venues, events, event_highlights, event_prizes, event_specials, event_faqs, event_packages TO service_role;

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE events IS 'Main events table for Skybox GameHub event management';
COMMENT ON COLUMN events.slug IS 'URL-safe slug for event routing';
COMMENT ON COLUMN events.event_datetime IS 'Combined date+time in UTC for reliable querying';
COMMENT ON COLUMN events.is_featured IS 'Featured events shown prominently on homepage';
COMMENT ON COLUMN events.deleted_at IS 'Soft delete timestamp';

COMMIT;

-- =============================================================================
-- ROLLBACK INSTRUCTIONS
-- =============================================================================
-- BEGIN;
-- DROP FUNCTION IF EXISTS get_upcoming_events(INTEGER);
-- DROP FUNCTION IF EXISTS get_featured_events(INTEGER);
-- DROP FUNCTION IF EXISTS search_events(TEXT, INTEGER);
-- DROP FUNCTION IF EXISTS increment_event_views(UUID);
-- DROP FUNCTION IF EXISTS set_published_at();
-- DROP FUNCTION IF EXISTS decrement_package_availability();
-- DROP TABLE IF EXISTS event_packages CASCADE;
-- DROP TABLE IF EXISTS event_faqs CASCADE;
-- DROP TABLE IF EXISTS event_specials CASCADE;
-- DROP TABLE IF EXISTS event_prizes CASCADE;
-- DROP TABLE IF EXISTS event_highlights CASCADE;
-- DROP TABLE IF EXISTS events CASCADE;
-- DROP TABLE IF EXISTS venues CASCADE;
-- DROP TABLE IF EXISTS event_categories CASCADE;
-- COMMIT;

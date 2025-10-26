-- Migration: Add SEO-friendly slug column to events table
-- Purpose: Replace long UUID URLs with short, readable slugs
-- Example: /events/super-bowl-2025 instead of /events/22222222-2222-2222-2222-222222222222

-- Step 1: Add slug column (nullable initially)
ALTER TABLE events
ADD COLUMN IF NOT EXISTS slug TEXT;

-- Step 2: Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS idx_events_slug ON events(slug)
WHERE slug IS NOT NULL;

-- Step 3: Generate slugs for existing events
-- This creates URL-friendly slugs from event titles
UPDATE events
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),  -- Remove special chars
      '\s+', '-', 'g'                                      -- Replace spaces with hyphens
    ),
    '-+', '-', 'g'                                         -- Remove duplicate hyphens
  )
)
WHERE slug IS NULL;

-- Step 4: Handle duplicate slugs by appending event_date
-- If "super-bowl" already exists, make it "super-bowl-2025"
WITH ranked_events AS (
  SELECT
    id,
    slug,
    event_date,
    ROW_NUMBER() OVER (PARTITION BY slug ORDER BY event_date DESC) as rn
  FROM events
)
UPDATE events e
SET slug = CONCAT(
  e.slug,
  '-',
  EXTRACT(YEAR FROM e.event_date)::TEXT
)
FROM ranked_events r
WHERE e.id = r.id
  AND r.rn > 1;

-- Step 5: Make slug required for new events (but allow NULL for drafts)
ALTER TABLE events
ADD CONSTRAINT events_slug_required
CHECK (status = 'draft' OR slug IS NOT NULL);

-- Step 6: Create function to auto-generate slug from title
CREATE OR REPLACE FUNCTION generate_event_slug()
RETURNS TRIGGER AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 1;
BEGIN
  -- Only generate slug if it's empty and title is provided
  IF NEW.slug IS NULL AND NEW.title IS NOT NULL THEN
    -- Create base slug from title
    base_slug := LOWER(
      REGEXP_REPLACE(
        REGEXP_REPLACE(
          REGEXP_REPLACE(NEW.title, '[^a-zA-Z0-9\s-]', '', 'g'),
          '\s+', '-', 'g'
        ),
        '-+', '-', 'g'
      )
    );

    final_slug := base_slug;

    -- Check for duplicates and append counter if needed
    WHILE EXISTS (SELECT 1 FROM events WHERE slug = final_slug AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000'::uuid)) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;

    NEW.slug := final_slug;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 7: Create trigger to auto-generate slugs
DROP TRIGGER IF EXISTS events_generate_slug ON events;
CREATE TRIGGER events_generate_slug
  BEFORE INSERT OR UPDATE OF title ON events
  FOR EACH ROW
  EXECUTE FUNCTION generate_event_slug();

-- Step 8: Add comment for documentation
COMMENT ON COLUMN events.slug IS 'SEO-friendly URL slug (auto-generated from title). Example: super-bowl-2025';

-- Step 9: Show current slugs
SELECT
  title,
  slug,
  '/events/' || slug as url
FROM events
WHERE status = 'published'
ORDER BY event_date;

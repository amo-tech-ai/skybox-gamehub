-- =============================================================================
-- SEED DATA: Sample Events
-- =============================================================================
-- Purpose: Insert sample events for Skybox GameHub
-- Dependencies: events table
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

BEGIN;

-- Insert sample events
INSERT INTO public.events (
  id,
  title,
  description,
  event_date,
  end_date,
  venue,
  capacity,
  price,
  currency,
  status,
  event_type,
  category,
  image_url,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    'World Series Game 1 - Dodgers vs Yankees',
    'Watch the opening game of the World Series in our premium Skybox with unlimited food and drinks. Experience the excitement of baseball''s biggest stage!',
    '2025-10-25 20:00:00+00'::timestamptz,
    '2025-10-25 23:30:00+00'::timestamptz,
    'Skybox GameHub - Main Venue',
    50,
    150.00,
    'USD',
    'published',
    'sports',
    'Baseball',
    '/images/world-series-2025.jpg',
    '{"sport": "baseball", "league": "MLB", "teams": ["Dodgers", "Yankees"], "special_offers": ["unlimited_drinks", "premium_food"]}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    'Super Bowl Watch Party - Chiefs vs 49ers',
    'Join us for the biggest football game of the year! Premium seating, all-you-can-eat buffet, and multiple screens for the ultimate viewing experience.',
    '2025-02-09 18:00:00+00'::timestamptz,
    '2025-02-09 23:00:00+00'::timestamptz,
    'Skybox GameHub - VIP Lounge',
    75,
    200.00,
    'USD',
    'published',
    'sports',
    'Football',
    '/images/super-bowl-2025.jpg',
    '{"sport": "football", "league": "NFL", "teams": ["Chiefs", "49ers"], "special_offers": ["vip_seating", "buffet", "multiple_screens"]}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    'Champions League Final - Real Madrid vs Manchester City',
    'Experience the pinnacle of European football! Watch the Champions League final in our state-of-the-art venue with premium amenities.',
    '2025-05-31 20:00:00+00'::timestamptz,
    '2025-05-31 22:30:00+00'::timestamptz,
    'Skybox GameHub - Champions Lounge',
    60,
    120.00,
    'USD',
    'published',
    'sports',
    'Soccer',
    '/images/champions-league-2025.jpg',
    '{"sport": "soccer", "league": "UEFA", "teams": ["Real Madrid", "Manchester City"], "special_offers": ["premium_seating", "international_cuisine"]}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    'UFC Championship Fight Night',
    'Witness the ultimate fighting championship! Premium viewing experience with multiple screens and expert commentary.',
    '2025-11-15 19:00:00+00'::timestamptz,
    '2025-11-15 23:00:00+00'::timestamptz,
    'Skybox GameHub - Fight Club',
    40,
    100.00,
    'USD',
    'published',
    'sports',
    'UFC',
    '/images/ufc-championship-2025.jpg',
    '{"sport": "mma", "league": "UFC", "special_offers": ["expert_commentary", "multiple_screens", "fight_analysis"]}'::jsonb
  ),
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    'Corporate Holiday Party',
    'Host your company''s holiday celebration at Skybox GameHub! Private venue, custom catering, and entertainment options available.',
    '2025-12-15 18:00:00+00'::timestamptz,
    '2025-12-15 23:00:00+00'::timestamptz,
    'Skybox GameHub - Private Suite',
    100,
    75.00,
    'USD',
    'published',
    'corporate',
    'Corporate',
    '/images/corporate-party-2025.jpg',
    '{"type": "corporate", "amenities": ["private_venue", "custom_catering", "entertainment"], "capacity": 100}'::jsonb
  ),
  (
    '66666666-6666-6666-6666-666666666666'::uuid,
    'Private Birthday Celebration',
    'Celebrate your special day in style! Private venue with personalized service and entertainment options.',
    '2025-11-20 19:00:00+00'::timestamptz,
    '2025-11-20 23:00:00+00'::timestamptz,
    'Skybox GameHub - Private Suite',
    30,
    50.00,
    'USD',
    'published',
    'private',
    'Birthday',
    '/images/birthday-party-2025.jpg',
    '{"type": "private", "amenities": ["personalized_service", "entertainment", "custom_decorations"], "capacity": 30}'::jsonb
  ),
  (
    '77777777-7777-7777-7777-777777777777'::uuid,
    'Public Gaming Tournament',
    'Join our monthly gaming tournament! Open to all skill levels with prizes for winners.',
    '2025-11-10 14:00:00+00'::timestamptz,
    '2025-11-10 18:00:00+00'::timestamptz,
    'Skybox GameHub - Gaming Arena',
    80,
    25.00,
    'USD',
    'published',
    'public',
    'Gaming',
    '/images/gaming-tournament-2025.jpg',
    '{"type": "public", "amenities": ["tournament_prizes", "skill_levels", "gaming_equipment"], "capacity": 80}'::jsonb
  );

COMMIT;

-- =============================================================================
-- SEED DATA: Events
-- =============================================================================
-- Purpose: Insert initial events migrated from src/data/events.ts
-- Dependencies: 001_event_categories.sql, 002_venues.sql
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

-- ===========================================================================
-- Event 1: World Series 2025 Watch Party
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  full_description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  timezone,
  total_capacity,
  available_spots,
  featured_image_url,
  is_featured,
  status,
  published_at
)
values (
  'e1111111-1111-1111-1111-111111111111'::uuid,
  'World Series 2025 Watch Party',
  'world-series-2025',
  'Live at Skybox Medellín',
  'Join us for the most anticipated baseball event of the year! The 2025 World Series comes to Skybox Medellín with an unforgettable watch party experience. Massive HD screens, premium sound system, and an electric atmosphere as we witness history in the making.',
  'Experience the pinnacle of baseball at Skybox! Watch every pitch of the 2025 World Series on our massive HD screens with the best fans in Medellín.',
  '11111111-1111-1111-1111-111111111111'::uuid, -- Baseball
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, -- Skybox Medellín Rooftop
  '2025-10-24',
  '19:00:00',
  '2025-10-24 19:00:00-05',
  'America/Bogota',
  150,
  150,
  '/assets/world-series-hero.jpg',
  true,
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  full_description = excluded.full_description,
  event_datetime = excluded.event_datetime,
  updated_at = now();

-- ===========================================================================
-- Event 2: Halloween Party 2025
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  full_description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  timezone,
  total_capacity,
  available_spots,
  featured_image_url,
  is_featured,
  status,
  published_at
)
values (
  'e2222222-2222-2222-2222-222222222222'::uuid,
  'Medellín Halloween Party',
  'halloween-party-2025',
  'Skybox Rooftop Bash',
  'Get ready for Medellín''s most epic Halloween celebration! Skybox transforms into a haunted rooftop paradise with spine-tingling decorations, killer DJ sets, costume contests, and drink specials that will make you scream with joy. Don''t miss the scariest party of the year!',
  'The ultimate Halloween party at Medellín''s premier rooftop venue! Costume contest with amazing prizes, DJ, drink specials, and unforgettable rooftop atmosphere.',
  '55555555-5555-5555-5555-555555555555'::uuid, -- Special Event
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-10-31',
  '20:00:00',
  '2025-10-31 20:00:00-05',
  'America/Bogota',
  200,
  200,
  '/assets/halloween-party-2.jpg',
  true,
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  full_description = excluded.full_description,
  event_datetime = excluded.event_datetime,
  updated_at = now();

-- ===========================================================================
-- Event 3: World Series Game 1
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e3333333-3333-3333-3333-333333333333'::uuid,
  'World Series Game 1',
  'world-series-game-1',
  'Toronto Blue Jays vs Los Angeles Dodgers',
  'Experience the ultimate showdown as two legendary teams clash in the World Series! Watch every pitch, every swing, every historic moment on our massive screens with the best fans in Medellín. Don''t miss history in the making.',
  '11111111-1111-1111-1111-111111111111'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-10-24',
  '19:00:00',
  '2025-10-24 19:00:00-05',
  150,
  150,
  '/assets/hero-world-series.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

-- ===========================================================================
-- Event 4: Champions League Final
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e4444444-4444-4444-4444-444444444444'::uuid,
  'Champions League Final',
  'champions-league-final',
  'The Ultimate European Football Championship',
  'The biggest match in European football is here! Join us for the Champions League Final with premium viewing, authentic European atmosphere, and fellow football fanatics. Who will lift the trophy?',
  '33333333-3333-3333-3333-333333333333'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-06-01',
  '15:00:00',
  '2025-06-01 15:00:00-05',
  180,
  180,
  '/assets/event-soccer.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

-- ===========================================================================
-- Event 5: UFC Main Event
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e5555555-5555-5555-5555-555555555555'::uuid,
  'UFC Main Event',
  'ufc-main-event',
  'Championship Fight Night',
  'Get ready for the most intense night of the year! Watch championship UFC fights live on massive screens with fight fans who understand the sport. Every knockout, every submission, every moment of glory.',
  '44444444-4444-4444-4444-444444444444'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-11-15',
  '22:00:00',
  '2025-11-15 22:00:00-05',
  120,
  120,
  '/assets/event-ufc.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

-- ===========================================================================
-- Event 6: NFL Sunday Brunch
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e6666666-6666-6666-6666-666666666666'::uuid,
  'NFL Sunday Brunch',
  'nfl-sunday-brunch',
  'Every Sunday During NFL Season',
  'Start your Sunday right with bottomless mimosas, delicious brunch menu, and all the NFL action you can handle. Multiple screens showing all the games simultaneously. Book your table now!',
  '22222222-2222-2222-2222-222222222222'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-12-07',
  '12:00:00',
  '2025-12-07 12:00:00-05',
  150,
  150,
  '/assets/event-nfl.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

-- ===========================================================================
-- Event 7: World Series Game 2
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e7777777-7777-7777-7777-777777777777'::uuid,
  'World Series Game 2',
  'world-series-game-2',
  'Toronto Blue Jays vs Los Angeles Dodgers',
  'The series continues! Join us for Game 2 as the battle for baseball supremacy intensifies. Premium seating, unbeatable atmosphere, and the best sports bar energy in Medellín.',
  '11111111-1111-1111-1111-111111111111'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-10-25',
  '19:00:00',
  '2025-10-25 19:00:00-05',
  150,
  150,
  '/assets/hero-world-series.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

-- ===========================================================================
-- Event 8: Premier League Derby
-- ===========================================================================

insert into public.events (
  id,
  title,
  slug,
  subtitle,
  description,
  category_id,
  venue_id,
  event_date,
  event_time,
  event_datetime,
  total_capacity,
  available_spots,
  featured_image_url,
  status,
  published_at
)
values (
  'e8888888-8888-8888-8888-888888888888'::uuid,
  'Premier League Derby',
  'premier-league-derby',
  'Classic English Football Rivalry',
  'Early morning kickoff for one of England''s fiercest rivalries! We''ll have breakfast specials, proper English atmosphere, and all the passion you''d expect from a derby match.',
  '33333333-3333-3333-3333-333333333333'::uuid,
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  '2025-12-10',
  '10:00:00',
  '2025-12-10 10:00:00-05',
  140,
  140,
  '/assets/event-soccer.jpg',
  'published',
  now()
)
on conflict (slug) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  updated_at = now();

commit;

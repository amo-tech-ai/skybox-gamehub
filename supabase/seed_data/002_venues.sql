-- =============================================================================
-- SEED DATA: Venues
-- =============================================================================
-- Purpose: Insert Skybox Medellín venue information
-- Dependencies: 02_events.sql schema
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

insert into public.venues (
  id,
  name,
  slug,
  address,
  city,
  neighborhood,
  latitude,
  longitude,
  total_capacity,
  standing_capacity,
  seated_capacity,
  vip_capacity,
  description,
  amenities,
  featured_image_url,
  gallery_images
)
values (
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid,
  'Skybox Medellín Rooftop',
  'skybox-medellin-rooftop',
  'Calle 10 #38-56, El Poblado',
  'Medellín',
  'El Poblado',
  6.20880000,
  -75.57420000,
  200,
  100,
  80,
  20,
  'Medellín''s premier sports bar and rooftop venue featuring massive HD screens, premium sound system, full bar, authentic ballpark food, and breathtaking city views. The perfect place to watch any major sporting event.',
  jsonb_build_array(
    'Multiple Giant HD Screens',
    'Premium Sound System',
    'Full Bar & Craft Cocktails',
    'Authentic Ballpark Food Menu',
    'VIP Rooftop Seating',
    'Photo Booth',
    'Private Event Spaces',
    'Climate Controlled Indoor Area',
    'Open-Air Rooftop Deck',
    'City Skyline Views',
    'Live DJ Capabilities',
    'Professional Event Staff'
  ),
  '/assets/skybox-venue.jpg',
  '[]'::jsonb
)
on conflict (slug) do update set
  name = excluded.name,
  address = excluded.address,
  city = excluded.city,
  neighborhood = excluded.neighborhood,
  latitude = excluded.latitude,
  longitude = excluded.longitude,
  total_capacity = excluded.total_capacity,
  standing_capacity = excluded.standing_capacity,
  seated_capacity = excluded.seated_capacity,
  vip_capacity = excluded.vip_capacity,
  description = excluded.description,
  amenities = excluded.amenities,
  featured_image_url = excluded.featured_image_url,
  updated_at = now();

commit;

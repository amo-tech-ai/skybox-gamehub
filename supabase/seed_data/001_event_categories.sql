-- =============================================================================
-- SEED DATA: Event Categories
-- =============================================================================
-- Purpose: Insert initial event categories for Skybox GameHub
-- Dependencies: 02_events.sql schema
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

insert into public.event_categories (id, name, slug, description, icon, display_order)
values
  ('11111111-1111-1111-1111-111111111111'::uuid, 'Baseball', 'baseball', 'MLB games, World Series, and baseball watch parties', '⚾', 1),
  ('22222222-2222-2222-2222-222222222222'::uuid, 'Football', 'football', 'NFL games, Super Bowl, and football events', '🏈', 2),
  ('33333333-3333-3333-3333-333333333333'::uuid, 'Soccer', 'soccer', 'Champions League, Premier League, and football matches', '⚽', 3),
  ('44444444-4444-4444-4444-444444444444'::uuid, 'UFC', 'ufc', 'UFC fight nights and championship bouts', '🥊', 4),
  ('55555555-5555-5555-5555-555555555555'::uuid, 'Special Event', 'special-event', 'Themed parties, holidays, and special occasions', '🎉', 5)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  display_order = excluded.display_order,
  updated_at = now();

commit;

-- =============================================================================
-- SEED DATA: Event Highlights
-- =============================================================================
-- Purpose: Insert event highlights (feature bullets)
-- Dependencies: 003_events.sql
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

-- World Series 2025 Watch Party Highlights
insert into public.event_highlights (event_id, highlight_text, icon, display_order)
values
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Multiple giant HD screens showing every angle', '📺', 1),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Premium sound system - feel every crack of the bat', '🔊', 2),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Full bar with World Series drink specials', '🍺', 3),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Authentic ballpark food menu', '🌭', 4),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'VIP rooftop seating available', '⭐', 5),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Live commentary and expert analysis', '🎙️', 6),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Photo booth with World Series props', '📸', 7),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Giveaways and prizes throughout the game', '🎁', 8)
on conflict (id) do nothing;

-- Halloween Party 2025 Highlights
insert into public.event_highlights (event_id, highlight_text, icon, display_order)
values
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Live DJ spinning all night long', '🎧', 1),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Best costume contest with cash prizes', '💰', 2),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Halloween-themed cocktails & shots', '🍹', 3),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Photo booth with spooky props', '📸', 4),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Rooftop dance floor with city views', '🌃', 5),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Themed food menu', '🍔', 6),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Horror movie screening area', '🎬', 7),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Surprise giveaways throughout the night', '🎁', 8)
on conflict (id) do nothing;

commit;

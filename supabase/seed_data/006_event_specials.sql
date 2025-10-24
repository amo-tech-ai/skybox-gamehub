-- =============================================================================
-- SEED DATA: Event Specials
-- =============================================================================
-- Purpose: Insert food & drink specials for events
-- Dependencies: 003_events.sql
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

-- World Series 2025 Watch Party Specials
insert into public.event_specials (event_id, name, description, special_price, currency, is_available, display_order)
values
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Home Run Hot Dogs', 'Classic ballpark dogs with all the fixings', 25000, 'COP', true, 1),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Grand Slam Nachos', 'Loaded nachos with cheese, jalapeños, and your choice of protein', 35000, 'COP', true, 2),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Seventh Inning Stretch Burger', 'Double patty burger with special sauce', 45000, 'COP', true, 3),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'Championship Beer Bucket', '5 ice-cold beers to share', 60000, 'COP', true, 4),
  ('e1111111-1111-1111-1111-111111111111'::uuid, 'World Series Cocktail', 'Signature orange and green cocktail', 28000, 'COP', true, 5)
on conflict (id) do nothing;

-- Halloween Party 2025 Specials
insert into public.event_specials (event_id, name, description, special_price, currency, is_available, display_order)
values
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Bloody Mary (Literally)', 'Vodka, tomato juice, spices, with vampire fang garnish', 22000, 'COP', true, 1),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Witch''s Brew', 'Mysterious green cocktail that glows in the dark', 25000, 'COP', true, 2),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Zombie Shot', 'Brain-melting shot combination', 12000, 'COP', true, 3),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Devil''s Wings', 'Spicy buffalo wings with hellfire sauce', 35000, 'COP', true, 4),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Monster Burger', 'Triple-decker burger with all the toppings', 48000, 'COP', true, 5),
  ('e2222222-2222-2222-2222-222222222222'::uuid, 'Pumpkin Spice Delight', 'Seasonal dessert cocktail', 24000, 'COP', true, 6)
on conflict (id) do nothing;

commit;

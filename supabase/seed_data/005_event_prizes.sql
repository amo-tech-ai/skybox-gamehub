-- =============================================================================
-- SEED DATA: Event Prizes
-- =============================================================================
-- Purpose: Insert contest prizes (Halloween costume contest)
-- Dependencies: 003_events.sql
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

begin;

-- Halloween Party 2025 Costume Contest Prizes
insert into public.event_prizes (event_id, prize_title, description, prize_amount, currency, display_order)
values
  (
    'e2222222-2222-2222-2222-222222222222'::uuid,
    'Best Overall Costume',
    'Most creative, detailed, and impressive costume',
    500000,
    'COP',
    1
  ),
  (
    'e2222222-2222-2222-2222-222222222222'::uuid,
    'Scariest Costume',
    'The costume that gives us nightmares',
    300000,
    'COP',
    2
  ),
  (
    'e2222222-2222-2222-2222-222222222222'::uuid,
    'Funniest Costume',
    'Make us laugh and win cash',
    200000,
    'COP',
    3
  ),
  (
    'e2222222-2222-2222-2222-222222222222'::uuid,
    'Best Group Costume',
    'Coordinated group of 3 or more',
    400000,
    'COP',
    4
  )
on conflict (id) do nothing;

commit;

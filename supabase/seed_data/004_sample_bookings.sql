-- =============================================================================
-- SEED DATA: Sample Bookings
-- =============================================================================
-- Purpose: Insert sample bookings for Skybox GameHub
-- Dependencies: bookings, booking_items, events, profiles tables
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

BEGIN;

-- Insert sample bookings
INSERT INTO public.bookings (
  id,
  user_id,
  event_id,
  booking_reference,
  status,
  total_amount,
  currency,
  booking_notes,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'SKY-2025-001',
    'confirmed',
    150.00,
    'USD',
    'VIP seating requested',
    '{"special_requests": ["vip_seating", "vegetarian_meal"], "group_size": 2}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'SKY-2025-002',
    'confirmed',
    400.00,
    'USD',
    'Group booking for 2 people',
    '{"special_requests": ["group_seating"], "group_size": 2}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '55555555-5555-5555-5555-555555555555'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    'SKY-2025-003',
    'pending',
    120.00,
    'USD',
    'Waiting for payment confirmation',
    '{"special_requests": ["spanish_commentary"], "group_size": 1}'::jsonb
  );

-- Insert sample booking items
INSERT INTO public.booking_items (
  id,
  booking_id,
  item_type,
  item_name,
  quantity,
  unit_price,
  total_price,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'ticket',
    'World Series Game 1 - VIP Ticket',
    2,
    75.00,
    150.00,
    '{"seat_type": "vip", "section": "A", "row": "1"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'ticket',
    'Super Bowl Watch Party - Premium Ticket',
    2,
    200.00,
    400.00,
    '{"seat_type": "premium", "section": "VIP", "row": "2"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    'ticket',
    'Champions League Final - Standard Ticket',
    1,
    120.00,
    120.00,
    '{"seat_type": "standard", "section": "B", "row": "5"}'::jsonb
  );

-- Insert sample booking status history
INSERT INTO public.booking_status_history (
  id,
  booking_id,
  status,
  notes,
  changed_by
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'pending',
    'Booking created',
    '11111111-1111-1111-1111-111111111111'::uuid
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'confirmed',
    'Payment received and booking confirmed',
    '33333333-3333-3333-3333-333333333333'::uuid
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'pending',
    'Booking created',
    '22222222-2222-2222-2222-222222222222'::uuid
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'confirmed',
    'Payment received and booking confirmed',
    '33333333-3333-3333-3333-333333333333'::uuid
  ),
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    'pending',
    'Booking created - awaiting payment',
    '55555555-5555-5555-5555-555555555555'::uuid
  );

COMMIT;

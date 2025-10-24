-- =============================================================================
-- SEED DATA: Sample Notifications
-- =============================================================================
-- Purpose: Insert sample notifications for Skybox GameHub
-- Dependencies: notifications, profiles tables
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

BEGIN;

-- Insert sample notifications
INSERT INTO public.notifications (
  id,
  user_id,
  type,
  title,
  message,
  status,
  channel,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'booking_confirmation',
    'Booking Confirmed!',
    'Your booking for World Series Game 1 has been confirmed. Booking reference: SKY-2025-001',
    'sent',
    'email',
    '{"booking_id": "11111111-1111-1111-1111-111111111111", "event_title": "World Series Game 1 - Dodgers vs Yankees"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'booking_confirmation',
    'Booking Confirmed!',
    'Your booking for World Series Game 1 has been confirmed. Booking reference: SKY-2025-001',
    'sent',
    'whatsapp',
    '{"booking_id": "11111111-1111-1111-1111-111111111111", "event_title": "World Series Game 1 - Dodgers vs Yankees"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'booking_confirmation',
    'Booking Confirmed!',
    'Your booking for Super Bowl Watch Party has been confirmed. Booking reference: SKY-2025-002',
    'sent',
    'email',
    '{"booking_id": "22222222-2222-2222-2222-222222222222", "event_title": "Super Bowl Watch Party - Chiefs vs 49ers"}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'booking_confirmation',
    'Booking Confirmed!',
    'Your booking for Super Bowl Watch Party has been confirmed. Booking reference: SKY-2025-002',
    'sent',
    'whatsapp',
    '{"booking_id": "22222222-2222-2222-2222-222222222222", "event_title": "Super Bowl Watch Party - Chiefs vs 49ers"}'::jsonb
  ),
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    '55555555-5555-5555-5555-555555555555'::uuid,
    'payment_reminder',
    'Payment Required',
    'Please complete your payment for Champions League Final booking. Reference: SKY-2025-003',
    'pending',
    'email',
    '{"booking_id": "33333333-3333-3333-3333-333333333333", "event_title": "Champions League Final - Real Madrid vs Manchester City"}'::jsonb
  ),
  (
    '66666666-6666-6666-6666-666666666666'::uuid,
    '55555555-5555-5555-5555-555555555555'::uuid,
    'payment_reminder',
    'Payment Required',
    'Please complete your payment for Champions League Final booking. Reference: SKY-2025-003',
    'pending',
    'whatsapp',
    '{"booking_id": "33333333-3333-3333-3333-333333333333", "event_title": "Champions League Final - Real Madrid vs Manchester City"}'::jsonb
  ),
  (
    '77777777-7777-7777-7777-777777777777'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'event_reminder',
    'Event Tomorrow!',
    'Don''t forget about your World Series Game 1 event tomorrow at 8:00 PM!',
    'scheduled',
    'email',
    '{"event_id": "11111111-1111-1111-1111-111111111111", "event_date": "2025-10-25T20:00:00Z"}'::jsonb
  ),
  (
    '88888888-8888-8888-8888-888888888888'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'event_reminder',
    'Event Tomorrow!',
    'Don''t forget about your World Series Game 1 event tomorrow at 8:00 PM!',
    'scheduled',
    'whatsapp',
    '{"event_id": "11111111-1111-1111-1111-111111111111", "event_date": "2025-10-25T20:00:00Z"}'::jsonb
  );

COMMIT;

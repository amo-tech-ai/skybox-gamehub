-- =============================================================================
-- SEED DATA: Sample Profiles
-- =============================================================================
-- Purpose: Insert sample user profiles for Skybox GameHub
-- Dependencies: profiles table
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

BEGIN;

-- Insert sample profiles
INSERT INTO public.profiles (
  id,
  user_id,
  full_name,
  phone,
  avatar_url,
  preferred_language,
  timezone,
  whatsapp_opt_in,
  email_notifications,
  sms_notifications,
  role,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'John Smith',
    '+1234567890',
    '/avatars/john-smith.jpg',
    'en',
    'America/New_York',
    true,
    true,
    false,
    'customer',
    '{"preferences": {"favorite_sports": ["baseball", "football"], "dietary_restrictions": ["vegetarian"]}}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'Maria Garcia',
    '+573001234567',
    '/avatars/maria-garcia.jpg',
    'es',
    'America/Bogota',
    true,
    true,
    true,
    'customer',
    '{"preferences": {"favorite_sports": ["soccer", "ufc"], "dietary_restrictions": []}}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    'Admin User',
    '+1234567891',
    '/avatars/admin-user.jpg',
    'en',
    'America/New_York',
    false,
    true,
    false,
    'admin',
    '{"permissions": ["manage_events", "manage_users", "view_analytics"]}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444'::uuid,
    '44444444-4444-4444-4444-444444444444'::uuid,
    'Staff Member',
    '+1234567892',
    '/avatars/staff-member.jpg',
    'en',
    'America/New_York',
    false,
    true,
    false,
    'staff',
    '{"permissions": ["manage_events", "view_bookings"]}'::jsonb
  ),
  (
    '55555555-5555-5555-5555-555555555555'::uuid,
    '55555555-5555-5555-5555-555555555555'::uuid,
    'Carlos Rodriguez',
    '+573001234568',
    '/avatars/carlos-rodriguez.jpg',
    'es',
    'America/Bogota',
    true,
    true,
    true,
    'customer',
    '{"preferences": {"favorite_sports": ["soccer"], "dietary_restrictions": ["gluten_free"]}}'::jsonb
  );

COMMIT;

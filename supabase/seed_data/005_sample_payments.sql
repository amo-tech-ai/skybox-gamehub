-- =============================================================================
-- SEED DATA: Sample Payments
-- =============================================================================
-- Purpose: Insert sample payments for Skybox GameHub
-- Dependencies: payments, payment_methods, bookings tables
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

BEGIN;

-- Insert sample payment methods
INSERT INTO public.payment_methods (
  id,
  user_id,
  method_type,
  provider,
  provider_payment_method_id,
  is_default,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    'card',
    'stripe',
    'pm_1234567890',
    true,
    '{"card_last4": "4242", "card_brand": "visa", "exp_month": 12, "exp_year": 2025}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    'card',
    'stripe',
    'pm_0987654321',
    true,
    '{"card_last4": "5555", "card_brand": "mastercard", "exp_month": 10, "exp_year": 2026}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '55555555-5555-5555-5555-555555555555'::uuid,
    'card',
    'stripe',
    'pm_1122334455',
    true,
    '{"card_last4": "1234", "card_brand": "visa", "exp_month": 8, "exp_year": 2025}'::jsonb
  );

-- Insert sample payments
INSERT INTO public.payments (
  id,
  booking_id,
  payment_method_id,
  amount,
  currency,
  status,
  provider,
  provider_payment_id,
  provider_fee,
  net_amount,
  metadata
) VALUES
  (
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    '11111111-1111-1111-1111-111111111111'::uuid,
    150.00,
    'USD',
    'succeeded',
    'stripe',
    'pi_1234567890',
    4.50,
    145.50,
    '{"receipt_url": "https://pay.stripe.com/receipts/1234567890", "payment_intent": "pi_1234567890"}'::jsonb
  ),
  (
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    '22222222-2222-2222-2222-222222222222'::uuid,
    400.00,
    'USD',
    'succeeded',
    'stripe',
    'pi_0987654321',
    12.00,
    388.00,
    '{"receipt_url": "https://pay.stripe.com/receipts/0987654321", "payment_intent": "pi_0987654321"}'::jsonb
  ),
  (
    '33333333-3333-3333-3333-333333333333'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    '33333333-3333-3333-3333-333333333333'::uuid,
    120.00,
    'USD',
    'pending',
    'stripe',
    'pi_1122334455',
    3.60,
    116.40,
    '{"payment_intent": "pi_1122334455", "requires_action": true}'::jsonb
  );

COMMIT;

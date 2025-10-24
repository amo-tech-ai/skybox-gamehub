-- =============================================================================
-- MASTER SEED DATA: Skybox GameHub
-- =============================================================================
-- Purpose: Execute all seed data files in correct order
-- Dependencies: All tables must exist
-- Author: Skybox Team
-- Created: 2025-10-24
-- =============================================================================

-- This file executes all seed data files in the correct order
-- Run this file to populate the database with sample data

\echo 'Starting Skybox GameHub seed data insertion...'

-- 1. Event Categories (if needed)
\echo 'Inserting event categories...'
\i 001_event_categories.sql

-- 2. Sample Events
\echo 'Inserting sample events...'
\i 002_sample_events.sql

-- 3. Sample Profiles
\echo 'Inserting sample profiles...'
\i 003_sample_profiles.sql

-- 4. Sample Bookings
\echo 'Inserting sample bookings...'
\i 004_sample_bookings.sql

-- 5. Sample Payments
\echo 'Inserting sample payments...'
\i 005_sample_payments.sql

-- 6. Sample Notifications
\echo 'Inserting sample notifications...'
\i 006_sample_notifications.sql

\echo 'Skybox GameHub seed data insertion completed successfully!'

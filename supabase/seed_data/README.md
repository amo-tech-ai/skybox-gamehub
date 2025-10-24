# Skybox GameHub - Sample Data

This directory contains comprehensive sample data for the Skybox GameHub database schema.

## 📁 Files Overview

### Master Seed File
- **`000_master_seed.sql`** - Executes all seed data files in correct order

### Individual Seed Files
- **`001_event_categories.sql`** - Event categories (Baseball, Football, Soccer, UFC, Special Events)
- **`002_sample_events.sql`** - 7 sample events covering all event types
- **`003_sample_profiles.sql`** - 5 sample user profiles with different roles
- **`004_sample_bookings.sql`** - 3 sample bookings with items and status history
- **`005_sample_payments.sql`** - Sample payment methods and payment records
- **`006_sample_notifications.sql`** - Sample notifications for various scenarios

## 🎯 Sample Data Coverage

### Events (7 total)
- **Sports Events**: World Series, Super Bowl, Champions League, UFC Championship
- **Corporate Events**: Holiday Party
- **Private Events**: Birthday Celebration  
- **Public Events**: Gaming Tournament

### User Profiles (5 total)
- **Customers**: John Smith (EN), Maria Garcia (ES), Carlos Rodriguez (ES)
- **Staff**: Admin User, Staff Member
- **Roles**: customer, staff, admin

### Bookings (3 total)
- **Confirmed**: World Series (2 tickets), Super Bowl (2 tickets)
- **Pending**: Champions League (1 ticket)
- **Status History**: Complete booking lifecycle tracking

### Payments (3 total)
- **Successful**: World Series ($150), Super Bowl ($400)
- **Pending**: Champions League ($120)
- **Payment Methods**: Stripe integration with card details

### Notifications (8 total)
- **Booking Confirmations**: Email + WhatsApp
- **Payment Reminders**: Pending payments
- **Event Reminders**: Scheduled notifications

## 🚀 Usage

### Run All Sample Data
```sql
\i 000_master_seed.sql
```

### Run Individual Files
```sql
\i 001_event_categories.sql
\i 002_sample_events.sql
\i 003_sample_profiles.sql
\i 004_sample_bookings.sql
\i 005_sample_payments.sql
\i 006_sample_notifications.sql
```

## 📊 Data Relationships

```
Events (7) → Bookings (3) → Payments (3)
    ↓              ↓
Profiles (5) → Notifications (8)
```

## 🔍 Sample Queries

### View All Events
```sql
SELECT title, event_date, event_type, price 
FROM public.events 
ORDER BY event_date;
```

### View User Bookings
```sql
SELECT 
  p.full_name,
  e.title,
  b.booking_reference,
  b.status,
  b.total_amount
FROM public.bookings b
JOIN public.profiles p ON b.user_id = p.user_id
JOIN public.events e ON b.event_id = e.id;
```

### View Payment Status
```sql
SELECT 
  b.booking_reference,
  p.status as payment_status,
  p.amount,
  p.provider_payment_id
FROM public.payments p
JOIN public.bookings b ON p.booking_id = b.id;
```

## ✅ Schema Compliance

All sample data follows the established schema:
- ✅ UUID primary keys
- ✅ TIMESTAMPTZ timestamps
- ✅ Proper foreign key relationships
- ✅ JSONB metadata fields
- ✅ RLS policy compliance
- ✅ Constraint validation (status, event_type, etc.)

## 🎨 Event Types Covered

- **Sports**: Baseball, Football, Soccer, UFC
- **Corporate**: Holiday parties, business events
- **Private**: Birthday celebrations, personal events
- **Public**: Gaming tournaments, community events

## 💰 Pricing Examples

- **Premium Sports**: $100-200 (World Series, Super Bowl)
- **Standard Sports**: $100-120 (Champions League, UFC)
- **Corporate**: $75 (Private venue, catering)
- **Private**: $50 (Personal celebrations)
- **Public**: $25 (Community events)

This sample data provides a realistic foundation for testing the Skybox GameHub booking system across all event types and user scenarios.

# 📋 **CRITICAL FIXES TODO LIST**
## **Complete Implementation Checklist for Production Readiness**

**Priority:** P0 - IMMEDIATE ACTION REQUIRED  
**Timeline:** 7 Days - Critical fixes must be completed  
**Status:** Ready for implementation

---

## **🎯 OVERVIEW**

This todo list covers all critical fixes identified in the forensic audit:
- Database schema consistency fixes
- Core business system implementation
- TypeScript safety configuration
- Security vulnerability remediation
- Performance optimization

---

## **📅 DAY 1: DATABASE SCHEMA FIXES**

### **1.1 Standardize Primary Key Types** 🚨 **CRITICAL**
- [ ] **Create migration file** for ID type conversion
  - [ ] File: `supabase/migrations/YYYYMMDD_001_standardize_primary_keys.sql`
  - [ ] Convert `leagues.id` from INTEGER to UUID
  - [ ] Convert `teams.id` from INTEGER to UUID  
  - [ ] Convert `games.id` from INTEGER to UUID
  - [ ] Convert `skybox_featured_games.id` from INTEGER to UUID

- [ ] **Update foreign key references**
  - [ ] Update `teams.league_id` to reference new UUID
  - [ ] Update `games.league_id` to reference new UUID
  - [ ] Update `games.home_team_id` to reference new UUID
  - [ ] Update `games.away_team_id` to reference new UUID
  - [ ] Update `skybox_featured_games.game_id` to reference new UUID

- [ ] **Update indexes and constraints**
  - [ ] Drop old indexes on INTEGER columns
  - [ ] Create new indexes on UUID columns
  - [ ] Update unique constraints
  - [ ] Update foreign key constraints

- [ ] **Test migration rollback**
  - [ ] Verify rollback script works
  - [ ] Test data integrity after rollback
  - [ ] Document rollback procedures

### **1.2 Standardize Timestamp Types** 🚨 **CRITICAL**
- [ ] **Convert TIMESTAMP to TIMESTAMPTZ**
  - [ ] Update `leagues.created_at` and `leagues.updated_at`
  - [ ] Update `teams.created_at`
  - [ ] Update `games.created_at` and `games.updated_at`
  - [ ] Update `skybox_featured_games.created_at` and `skybox_featured_games.updated_at`

- [ ] **Update trigger functions**
  - [ ] Ensure `update_updated_at_column()` function exists
  - [ ] Apply triggers to all tables
  - [ ] Test trigger functionality

- [ ] **Validate timezone handling**
  - [ ] Test with different timezones
  - [ ] Verify UTC storage
  - [ ] Check client-side display

### **1.3 Fix Trigger Syntax Issues** ⚠️ **MEDIUM**
- [ ] **Review existing triggers**
  - [ ] Check `set_updated_at_profiles` trigger
  - [ ] Verify trigger syntax is complete
  - [ ] Test trigger execution

- [ ] **Create missing triggers**
  - [ ] `set_updated_at_leagues` trigger
  - [ ] `set_updated_at_teams` trigger
  - [ ] `set_updated_at_games` trigger
  - [ ] `set_updated_at_skybox_featured_games` trigger

- [ ] **Test all triggers**
  - [ ] Verify triggers fire on UPDATE
  - [ ] Check `updated_at` field updates
  - [ ] Test trigger performance

---

## **📅 DAY 2: CORE BUSINESS TABLES**

### **2.1 Booking System Tables** 🚨 **CRITICAL**
- [ ] **Create `bookings` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `profiles(user_id)`
  - [ ] Event reference (placeholder for now)
  - [ ] Booking status workflow
  - [ ] Soft delete with `deleted_at`
  - [ ] Timestamps: `created_at`, `updated_at`

- [ ] **Create `booking_items` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `bookings(id)`
  - [ ] Item type validation (ticket, package, addon)
  - [ ] Quantity and pricing fields
  - [ ] Timestamps: `created_at`

- [ ] **Create `booking_status_history` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `bookings(id)`
  - [ ] Status change tracking
  - [ ] User who made the change
  - [ ] Reason for change
  - [ ] Timestamps: `created_at`

- [ ] **Add indexes for performance**
  - [ ] `idx_bookings_user_id` on `bookings(user_id)`
  - [ ] `idx_bookings_event_id` on `bookings(event_id)`
  - [ ] `idx_bookings_status` on `bookings(status)`
  - [ ] `idx_bookings_created_at` on `bookings(created_at DESC)`

### **2.2 Payment System Tables** 🚨 **CRITICAL**
- [ ] **Create `payments` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `bookings(id)`
  - [ ] Payment method validation
  - [ ] Amount and currency fields
  - [ ] Status workflow (pending, completed, failed, refunded)
  - [ ] External payment ID for Stripe/Shopify
  - [ ] Timestamps: `created_at`, `updated_at`

- [ ] **Create `payment_methods` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `profiles(id)`
  - [ ] Method type validation (card, bank_account, digital_wallet)
  - [ ] Provider validation (stripe, shopify, local)
  - [ ] External provider ID
  - [ ] Default method flag
  - [ ] Timestamps: `created_at`, `updated_at`

- [ ] **Create `refunds` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `payments(id)`
  - [ ] Refund amount and reason
  - [ ] Status workflow (pending, completed, failed)
  - [ ] Processing timestamp
  - [ ] Timestamps: `created_at`

- [ ] **Add indexes for performance**
  - [ ] `idx_payments_booking_id` on `payments(booking_id)`
  - [ ] `idx_payments_status` on `payments(status)`
  - [ ] `idx_payments_external_id` on `payments(external_payment_id)`

### **2.3 Integration Tables** ⚠️ **HIGH PRIORITY**
- [ ] **Create `shopify_orders` table**
  - [ ] Primary key: UUID
  - [ ] Shopify order ID (unique)
  - [ ] Foreign key to `bookings(id)`
  - [ ] Order data as JSONB
  - [ ] Sync status and timestamp
  - [ ] Timestamps: `created_at`

- [ ] **Create `webhook_events` table**
  - [ ] Primary key: UUID
  - [ ] Source validation (shopify, stripe, whatsapp)
  - [ ] Event type and payload (JSONB)
  - [ ] Processing status and timestamp
  - [ ] Timestamps: `created_at`

- [ ] **Create `notifications` table**
  - [ ] Primary key: UUID
  - [ ] Foreign key to `profiles(id)`
  - [ ] Type validation (email, whatsapp, sms, push)
  - [ ] Template and data fields
  - [ ] Status workflow (pending, sent, failed, delivered)
  - [ ] Sent timestamp
  - [ ] Timestamps: `created_at`

- [ ] **Add indexes for performance**
  - [ ] `idx_shopify_orders_order_id` on `shopify_orders(shopify_order_id)`
  - [ ] `idx_webhook_events_source` on `webhook_events(source)`
  - [ ] `idx_webhook_events_processed` on `webhook_events(processed)`
  - [ ] `idx_notifications_user_id` on `notifications(user_id)`
  - [ ] `idx_notifications_status` on `notifications(status)`

---

## **📅 DAY 3: TYPESCRIPT CONFIGURATION**

### **3.1 Enable Strict Mode** 🚨 **CRITICAL**
- [ ] **Update `tsconfig.json`**
  - [ ] Set `"strict": true`
  - [ ] Set `"noImplicitAny": true`
  - [ ] Set `"strictNullChecks": true`
  - [ ] Set `"noUnusedLocals": true`
  - [ ] Set `"noUnusedParameters": true`
  - [ ] Set `"exactOptionalPropertyTypes": true`
  - [ ] Set `"noImplicitReturns": true`
  - [ ] Set `"noFallthroughCasesInSwitch": true`

- [ ] **Fix all type errors**
  - [ ] Run `npx tsc --noEmit` to check for errors
  - [ ] Fix any `any` types found
  - [ ] Add proper type annotations
  - [ ] Fix null/undefined handling
  - [ ] Remove unused variables and parameters

- [ ] **Update component types**
  - [ ] Fix empty interfaces (command.tsx, textarea.tsx)
  - [ ] Add proper prop types
  - [ ] Fix generic type usage
  - [ ] Update import/export types

### **3.2 Remove Hardcoded Credentials** 🚨 **CRITICAL**
- [ ] **Update Supabase client**
  - [ ] Remove hardcoded URL and key
  - [ ] Add environment variable validation
  - [ ] Add error handling for missing variables
  - [ ] Update import statements

- [ ] **Create environment variables**
  - [ ] Add `VITE_SUPABASE_URL` to `.env.local`
  - [ ] Add `VITE_SUPABASE_ANON_KEY` to `.env.local`
  - [ ] Update `.env.example` with template
  - [ ] Add validation in client code

- [ ] **Test environment setup**
  - [ ] Verify variables are loaded correctly
  - [ ] Test error handling for missing variables
  - [ ] Validate Supabase connection
  - [ ] Test in development and production

### **3.3 Fix ESLint Issues** ⚠️ **MEDIUM**
- [ ] **Fix TypeScript errors**
  - [ ] Fix empty interface in `command.tsx`
  - [ ] Fix empty interface in `textarea.tsx`
  - [ ] Replace interfaces with type aliases where appropriate

- [ ] **Fix React refresh warnings**
  - [ ] Move non-component exports to separate files
  - [ ] Update `badge.tsx` exports
  - [ ] Update `button.tsx` exports
  - [ ] Update `form.tsx` exports
  - [ ] Update `navigation-menu.tsx` exports
  - [ ] Update `sonner.tsx` exports
  - [ ] Update `toggle.tsx` exports

- [ ] **Run final linting check**
  - [ ] Run `npx eslint src --format=json`
  - [ ] Verify zero errors
  - [ ] Verify minimal warnings
  - [ ] Document any remaining warnings

---

## **📅 DAY 4: SECURITY & RLS POLICIES**

### **4.1 Enable RLS on New Tables** 🚨 **CRITICAL**
- [ ] **Enable RLS on booking tables**
  - [ ] `ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;`

- [ ] **Enable RLS on payment tables**
  - [ ] `ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.refunds ENABLE ROW LEVEL SECURITY;`

- [ ] **Enable RLS on integration tables**
  - [ ] `ALTER TABLE public.shopify_orders ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;`
  - [ ] `ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;`

### **4.2 Create RLS Policies** 🚨 **CRITICAL**
- [ ] **Booking system policies**
  - [ ] Users can view own bookings
  - [ ] Users can create own bookings
  - [ ] Users can update own bookings
  - [ ] Staff can view all bookings
  - [ ] Staff can update booking status
  - [ ] Staff can view booking history

- [ ] **Payment system policies**
  - [ ] Users can view own payments
  - [ ] Users can view own payment methods
  - [ ] Users can create own payment methods
  - [ ] Users can update own payment methods
  - [ ] Staff can view all payments
  - [ ] Staff can process refunds

- [ ] **Integration system policies**
  - [ ] Staff can view all Shopify orders
  - [ ] Staff can view all webhook events
  - [ ] Users can view own notifications
  - [ ] System can create notifications
  - [ ] Staff can view all notifications

### **4.3 Test RLS Policy Enforcement** ⚠️ **HIGH PRIORITY**
- [ ] **Test user access controls**
  - [ ] Verify users can only see own data
  - [ ] Verify users cannot access other users' data
  - [ ] Test anonymous access restrictions
  - [ ] Test authenticated user access

- [ ] **Test staff access controls**
  - [ ] Verify staff can view all data
  - [ ] Verify staff can update records
  - [ ] Test admin privilege escalation
  - [ ] Test cross-tenant data isolation

- [ ] **Test policy performance**
  - [ ] Measure query performance with RLS
  - [ ] Check for N+1 query problems
  - [ ] Optimize slow queries
  - [ ] Document performance impact

---

## **📅 DAY 5: PERFORMANCE & INDEXES**

### **5.1 Add Missing Indexes** ⚠️ **HIGH PRIORITY**
- [ ] **Booking system indexes**
  - [ ] `idx_bookings_user_id` on `bookings(user_id)`
  - [ ] `idx_bookings_event_id` on `bookings(event_id)`
  - [ ] `idx_bookings_status` on `bookings(status)`
  - [ ] `idx_bookings_created_at` on `bookings(created_at DESC)`
  - [ ] `idx_booking_items_booking_id` on `booking_items(booking_id)`

- [ ] **Payment system indexes**
  - [ ] `idx_payments_booking_id` on `payments(booking_id)`
  - [ ] `idx_payments_status` on `payments(status)`
  - [ ] `idx_payments_external_id` on `payments(external_payment_id)`
  - [ ] `idx_payment_methods_user_id` on `payment_methods(user_id)`
  - [ ] `idx_refunds_payment_id` on `refunds(payment_id)`

- [ ] **Integration system indexes**
  - [ ] `idx_shopify_orders_order_id` on `shopify_orders(shopify_order_id)`
  - [ ] `idx_webhook_events_source` on `webhook_events(source)`
  - [ ] `idx_webhook_events_processed` on `webhook_events(processed)`
  - [ ] `idx_notifications_user_id` on `notifications(user_id)`
  - [ ] `idx_notifications_status` on `notifications(status)`

### **5.2 Optimize Query Performance** ⚠️ **MEDIUM**
- [ ] **Analyze slow queries**
  - [ ] Run `EXPLAIN ANALYZE` on common queries
  - [ ] Identify missing indexes
  - [ ] Optimize JOIN operations
  - [ ] Check for N+1 query problems

- [ ] **Create composite indexes**
  - [ ] `idx_bookings_user_status` on `bookings(user_id, status)`
  - [ ] `idx_bookings_event_status` on `bookings(event_id, status)`
  - [ ] `idx_payments_booking_status` on `payments(booking_id, status)`
  - [ ] `idx_notifications_user_status` on `notifications(user_id, status)`

- [ ] **Test index usage**
  - [ ] Verify indexes are being used
  - [ ] Check for unused indexes
  - [ ] Monitor index performance
  - [ ] Document index strategy

### **5.3 Database Performance Testing** ⚠️ **MEDIUM**
- [ ] **Load testing preparation**
  - [ ] Set up test data
  - [ ] Create performance test scenarios
  - [ ] Test concurrent user access
  - [ ] Measure response times

- [ ] **Connection pooling**
  - [ ] Verify connection limits
  - [ ] Test connection reuse
  - [ ] Monitor connection usage
  - [ ] Optimize connection settings

---

## **📅 DAY 6: TESTING & VALIDATION**

### **6.1 Database Testing** 🚨 **CRITICAL**
- [ ] **Test all database operations**
  - [ ] Test INSERT operations on all tables
  - [ ] Test UPDATE operations on all tables
  - [ ] Test DELETE operations (soft delete)
  - [ ] Test SELECT operations with RLS

- [ ] **Test foreign key constraints**
  - [ ] Test cascade deletes
  - [ ] Test constraint violations
  - [ ] Test orphaned records
  - [ ] Test referential integrity

- [ ] **Test trigger functionality**
  - [ ] Test `updated_at` triggers
  - [ ] Test trigger performance
  - [ ] Test trigger error handling
  - [ ] Verify trigger consistency

### **6.2 TypeScript Testing** 🚨 **CRITICAL**
- [ ] **Compilation testing**
  - [ ] Run `npx tsc --noEmit` to check for errors
  - [ ] Verify zero type errors
  - [ ] Test strict mode compliance
  - [ ] Check for unused variables

- [ ] **Runtime testing**
  - [ ] Test environment variable loading
  - [ ] Test Supabase connection
  - [ ] Test error handling
  - [ ] Test production build

### **6.3 Security Testing** 🚨 **CRITICAL**
- [ ] **RLS policy testing**
  - [ ] Test anonymous access restrictions
  - [ ] Test user data isolation
  - [ ] Test staff privilege escalation
  - [ ] Test cross-tenant data leakage

- [ ] **Authentication testing**
  - [ ] Test user login/logout
  - [ ] Test session management
  - [ ] Test token refresh
  - [ ] Test permission checks

### **6.4 Integration Testing** ⚠️ **HIGH PRIORITY**
- [ ] **API endpoint testing**
  - [ ] Test booking creation
  - [ ] Test payment processing
  - [ ] Test notification sending
  - [ ] Test webhook handling

- [ ] **End-to-end testing**
  - [ ] Test complete booking flow
  - [ ] Test payment processing flow
  - [ ] Test notification flow
  - [ ] Test error handling

---

## **📅 DAY 7: DOCUMENTATION & DEPLOYMENT**

### **7.1 Schema Documentation** ⚠️ **HIGH PRIORITY**
- [ ] **Update schema documentation**
  - [ ] Document all new tables
  - [ ] Document all new indexes
  - [ ] Document all RLS policies
  - [ ] Document trigger functions

- [ ] **Create ERD diagrams**
  - [ ] Update entity relationship diagrams
  - [ ] Show all table relationships
  - [ ] Document foreign key constraints
  - [ ] Create data flow diagrams

- [ ] **Document migration procedures**
  - [ ] Document rollback procedures
  - [ ] Document data migration steps
  - [ ] Document testing procedures
  - [ ] Document deployment steps

### **7.2 Security Documentation** 🚨 **CRITICAL**
- [ ] **Document security measures**
  - [ ] Document RLS policy matrix
  - [ ] Document user access controls
  - [ ] Document staff privileges
  - [ ] Document audit logging

- [ ] **Create security checklist**
  - [ ] Document security testing procedures
  - [ ] Document vulnerability assessment
  - [ ] Document compliance requirements
  - [ ] Document incident response

### **7.3 Performance Documentation** ⚠️ **MEDIUM**
- [ ] **Document performance measures**
  - [ ] Document index strategy
  - [ ] Document query optimization
  - [ ] Document performance testing
  - [ ] Document monitoring setup

- [ ] **Create performance guidelines**
  - [ ] Document best practices
  - [ ] Document common pitfalls
  - [ ] Document optimization techniques
  - [ ] Document scaling procedures

### **7.4 Deployment Preparation** 🚨 **CRITICAL**
- [ ] **Prepare production deployment**
  - [ ] Test all migrations
  - [ ] Verify rollback procedures
  - [ ] Test environment variables
  - [ ] Test production build

- [ ] **Create deployment checklist**
  - [ ] Document deployment steps
  - [ ] Document verification procedures
  - [ ] Document rollback procedures
  - [ ] Document monitoring setup

---

## **📊 SUCCESS METRICS**

### **Database Consistency** ✅
- [ ] All tables use UUID primary keys
- [ ] All timestamps use TIMESTAMPTZ
- [ ] All triggers function correctly
- [ ] All foreign key relationships valid

### **TypeScript Safety** ✅
- [ ] Strict mode enabled
- [ ] Zero type errors
- [ ] No hardcoded credentials
- [ ] Proper environment variable handling

### **Security Compliance** ✅
- [ ] All tables have RLS enabled
- [ ] All policies tested and working
- [ ] No data leakage possible
- [ ] Audit logging implemented

### **Business Logic** ✅
- [ ] Booking system functional
- [ ] Payment processing working
- [ ] Integration tables ready
- [ ] Performance optimized

---

## **🚨 CRITICAL SUCCESS CRITERIA**

### **Must Have (P0)**
- [ ] All database schema fixes completed
- [ ] All core business tables created
- [ ] TypeScript strict mode enabled
- [ ] All security vulnerabilities fixed
- [ ] All RLS policies implemented

### **Should Have (P1)**
- [ ] All performance indexes added
- [ ] All triggers working correctly
- [ ] All tests passing
- [ ] All documentation updated

### **Nice to Have (P2)**
- [ ] Performance optimization completed
- [ ] Monitoring setup
- [ ] Backup procedures tested
- [ ] Production deployment ready

---

**Next Steps:** Begin Day 1 implementation immediately. Each day must be completed before moving to the next.

**Last Updated:** October 24, 2025  
**Version:** 1.0 - Critical Fixes TODO List
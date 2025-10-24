# Product Requirements Document (PRD)
# Skybox GameHub E-Commerce & Restaurant Platform

---

## 1. Product Overview

### Project Title
**Skybox GameHub E-Commerce & Restaurant Platform Expansion**

### Version Number
**v2.0.0** (Major Feature Release)

### Project Summary

Skybox GameHub is Medellín's premier sports viewing destination located in El Poblado (Calle Santa Fe #39-106). Currently operational as a marketing website with event listings and reservation capabilities, this project aims to transform Skybox into a comprehensive digital platform that combines three revenue streams:

1. **Sports Bar Experience** – Live game viewing with reservations
2. **Restaurant Operations** – Full-service dining with online menu and ordering
3. **Merchandise & Apparel** – Skybox-branded gear and sports memorabilia

**The Problem:** While Skybox has successfully established itself as a sports viewing venue with a polished web presence, the business lacks:
- A direct e-commerce revenue channel for merchandise sales
- Digital ordering capabilities for restaurant operations
- Inventory management for both food and retail products
- Integration between in-venue experiences and online commerce
- Data-driven insights into customer behavior and preferences

**The Opportunity:** By integrating Shopify for e-commerce and enhancing restaurant event management, Skybox can:
- Generate additional revenue streams beyond table bookings
- Build brand loyalty through merchandise (World Series shirts, team gear)
- Streamline restaurant operations with digital ordering
- Create cross-promotional opportunities (e.g., "Order food for pickup during the game")
- Capture valuable customer data for marketing and personalization

**Strategic Alignment:** This expansion aligns with Skybox's mission to become Medellín's leading sports entertainment destination by:
- Extending the Skybox brand beyond physical premises
- Creating touchpoints for customer engagement before/after venue visits
- Establishing recurring revenue through merchandise and food sales
- Building a digital community around sports culture in Medellín

---

## 2. Goals

### Business Goals

1. **Revenue Diversification** – Generate $15,000 USD in monthly merchandise revenue within 6 months of launch
2. **Operational Efficiency** – Reduce reservation management overhead by 40% through automated booking system
3. **Customer Retention** – Increase repeat customer rate from 30% to 50% through loyalty programs and online engagement
4. **Brand Awareness** – Expand Skybox's digital footprint with 25% increase in website traffic
5. **Market Positioning** – Establish Skybox as Medellín's first sports bar with integrated e-commerce
6. **Profit Margins** – Achieve 60% gross margin on merchandise, 25% on restaurant orders
7. **Data Collection** – Build customer database of 5,000+ profiles with purchase history and preferences

### User Goals

1. **Convenience** – Order food/merchandise online without visiting the venue
2. **Event Discovery** – Easily find and book tables for upcoming sports events
3. **Brand Connection** – Show team loyalty with Skybox/team-branded merchandise
4. **Seamless Experience** – Unified experience between website, in-venue, and shop
5. **Transparency** – Clear pricing, availability, and delivery/pickup information
6. **Community** – Connect with fellow sports fans through events and merchandise
7. **Flexibility** – Multiple payment options, delivery methods, and booking times

### Non-Goals (Out of Scope for v2.0)

1. **Mobile Native Apps** – Will remain web-only (mobile-responsive); iOS/Android apps deferred to v3.0
2. **Live Streaming** – No in-house video streaming of games (licensing complexity)
5. **Advanced Analytics Dashboard** – Basic reporting only; BI tools deferred to v2.1
8. **Custom Merchandise Design Tool** – Pre-designed products only (no user customization)

---

## 3. User Personas

### Key User Types

1. **The Sports Fanatic** – Regular attendee, high merchandise purchase intent
2. **The Social Organizer** – Books tables for groups, plans viewing parties
3. **The Casual Visitor** – Occasional drop-ins, price-sensitive
4. **The Restaurant Guest** – Primarily interested in food, sports are secondary
5. **The Online Shopper** – Buys merchandise but rarely visits venue

---

### Detailed Personas

#### **Andrés – The Sports Fanatic**
- **Age:** 28
- **Occupation:** Marketing Manager at tech startup
- **Location:** El Poblado, Medellín
- **Behavior:**
  - Attends 3-4 games per month at Skybox
  - Owns jerseys of multiple teams (Steelers, Yankees, Independiente Medellín)
  - Active on WhatsApp sports groups
  - Spends 200,000-400,000 COP per month on sports entertainment
- **Goals:**
  - Never miss a big game (World Series, Super Bowl, Champions League)
  - Show team loyalty with authentic merchandise
  - Connect with fellow fans
- **Pain Points:**
  - Hard to find quality sports merchandise in Medellín
  - Reservations sometimes full for popular games
  - Wants to buy Skybox-branded gear but no online shop exists
- **Tech Comfort:** High – uses mobile apps for everything

#### **Carolina – The Social Organizer**
- **Age:** 32
- **Occupation:** HR Director at multinational company
- **Location:** Laureles, Medellín
- **Behavior:**
  - Books tables for work team events (10-15 people)
  - Plans birthday parties and celebrations at Skybox
  - Prefers email confirmations and calendar invites
  - Budget-conscious but values quality experience
- **Goals:**
  - Easy group booking with deposit/payment options
  - Reliable service for corporate events
  - Impress colleagues with unique venue choice
- **Pain Points:**
  - WhatsApp-only booking feels informal for corporate events
  - No visibility into table availability
  - Difficult to coordinate food pre-orders for large groups
- **Tech Comfort:** Medium – prefers web over mobile, likes email workflows

#### **Camila – The Restaurant Guest**
- **Age:** 25
- **Occupation:** University student
- **Location:** medellin , El Poblado
- **Behavior:**
  - Visits Skybox for food and ambiance, not sports-focused
  - Interested in takeout/delivery options
  - Price-sensitive (student budget)
  - Follows Skybox on Instagram for promotions
- **Goals:**
  - Quick, affordable meals with delivery
  - Try new menu items
  - Avoid crowds (prefer off-peak hours)
- **Pain Points:**
  - Venue gets loud/crowded during games
  - Limited menu information online
  - No delivery option currently
- **Tech Comfort:** High – mobile-first, uses social media heavily

#### **Diego – The Online Shopper**
- **Age:** 35
- **Occupation:** Software engineer working remotely
- **Location:** Laureles, Medellín
- **Behavior:**
  - Rarely visits sports bars (prefers watching at home)
  - Buys sports merchandise online (imports from USA)
  - Interested in collectibles and limited-edition items
  - Will pay premium for fast shipping
- **Goals:**
  - Buy World Series/Super Bowl shirts locally (avoid import taxes)
  - Support local businesses
  - Get authentic, high-quality merchandise
- **Pain Points:**
  - Importing from USA is expensive (30% import tax)
  - Long shipping times (3-4 weeks)
  - No local retailers for niche sports merchandise
- **Tech Comfort:** Very High – expects Amazon-level UX

#### **Luis – The Casual Visitor**
- **Age:** 42
- **Occupation:** Sales representative
- **Location:** Sabaneta, Medellín
- **Behavior:**
  - Visits Skybox 2-3 times per year for major events
  - Walks in without reservations
  - Brings family (wife, 2 kids)
  - Prefers traditional payment methods (cash/debit)
- **Goals:**
  - Spontaneous family outings
  - Good value for money
  - Kid-friendly environment
- **Pain Points:**
  - Often can't get a table without reservation
  - Menu prices not clear online
  - Credit card fees (3% surcharge)
- **Tech Comfort:** Low – prefers phone calls, cash payments

---

### Role-Based Access Control

#### **Customer** (Public User)
- **Permissions:**
  - Browse merchandise catalog
  - View restaurant menu and events
  - Add items to cart and checkout (guest or registered)
  - Submit reservation requests
  - Contact Skybox via WhatsApp/email
- **Authentication:** Optional (guest checkout allowed)

#### **Registered Customer** (Authenticated User)
- **Permissions:**
  - All Customer permissions +
  - View order history
  - Save delivery addresses
  - Track orders in real-time
  - Manage reservations (view, modify, cancel)
  - Receive loyalty points/discounts
  - Saved payment methods (Shopify Checkout)
- **Authentication:** Required (email/password, Google OAuth)

#### **Admin** (Skybox Staff)
- **Permissions:**
  - Full access to Shopify admin dashboard
  - Manage products, inventory, pricing
  - View/modify orders and reservations
  - Issue refunds
  - Access customer data (GDPR-compliant)
  - Generate sales reports
  - Manage events and featured games
- **Authentication:** Required (role-based access via Supabase + Shopify)

#### **Kitchen Manager** (Restaurant Staff)
- **Permissions:**
  - View incoming restaurant orders
  - Mark orders as preparing/ready
  - Update menu item availability
  - View inventory levels
- **Authentication:** Required (tablet-based POS access)

#### **Warehouse/Merch Manager**
- **Permissions:**
  - Manage merchandise inventory
  - Process fulfillment orders
  - Update stock levels
  - Print shipping labels
- **Authentication:** Required (Shopify fulfillment dashboard)

---

## 4. Functional Requirements

### **High Priority Features (MVP – Must Have)**

#### **FR-1: Shopify E-Commerce Integration** (Priority: HIGH)
- Integrate Shopify Storefront API with existing React/TypeScript frontend
- Product catalog with categories:
  - **Skybox-Branded Merchandise** (hats, t-shirts, hoodies)
  - **Event-Specific Gear** (World Series 2025 shirts, Super Bowl LX)
  - **Team Apparel** (NFL, MLB, Colombian football clubs)
  - **Restaurant Items** (gift cards, catering packages)
- Shopping cart with persistent state (local storage + Supabase sync)
- Secure checkout using Shopify Checkout API
- Payment processing via Shopify Payments (credit/debit cards, local Colombian payment methods)
- Order confirmation emails with tracking information
- Mobile-responsive product pages
- **Acceptance Criteria:**
  - User can browse 50+ SKUs across 4 categories
  - Cart persists across sessions for registered users
  - Checkout completes in < 3 clicks
  - Page load time < 2 seconds for product listings
  - Mobile conversion rate > 60% of desktop

#### **FR-2: Restaurant Menu Management** (Priority: HIGH)
- Migrate static menu data to Supabase database
- Admin dashboard to manage menu items (CRUD operations):
  - Name, description, price (COP), category, image, availability status
- Display menu with real-time availability (sold out items grayed out)
- **Special Features:**
  - Game-day specials linked to specific events
  - Combo deals (e.g., "Big League BBQ Platter + 2 Beers")
  - Dietary filters (vegetarian, gluten-free, spicy)
- Integration with Shopify for online ordering (food as products)
- **Acceptance Criteria:**
  - Admin can add/edit menu items without developer help
  - Changes reflect on website within 5 seconds (cache invalidation)
  - Menu images load via CDN (Supabase Storage)
  - 100% menu data migrated from static to database

#### **FR-3: Restaurant Event Management** (Priority: HIGH)
- Create restaurant-specific event types:
  - **Brunch Events** (NFL Sunday Brunch)
  - **Themed Nights** (Trivia, Karaoke, Watch Parties)
  - **Private Dining** (Birthday parties, corporate events)
- Event booking flow:
  1. User selects event from calendar
  2. Chooses date/time slot
  3. Specifies guest count
  4. Pre-orders food packages (optional)
  5. Pays deposit via Shopify (50% upfront)
  6. Receives email confirmation with QR code
- Admin panel to manage event templates and availability
- Automated reminder emails (3 days before, 1 day before)
- **Acceptance Criteria:**
  - Support 10+ event types
  - Handle 50 concurrent reservations per event
  - Deposit payment success rate > 95%
  - Email delivery rate > 98%

#### **FR-4: Merchandise Product Pages** (Priority: HIGH)
- Product detail pages (PDP) with:
  - High-quality images (6+ photos per product)
  - Size/color selectors with stock indicators
  - Product descriptions with care instructions
  - Customer reviews (powered by Shopify Reviews)
  - Related products ("You May Also Like")
- Variant management (sizes: S, M, L, XL, XXL; colors)
- Inventory tracking with low-stock alerts
- **Example Product:** World Series 2025 T-Shirt
  - Images: Front, back, close-up of print, model wearing shirt
  - Sizes: S-XXL
  - Colors: Navy, charcoal, white
  - Price: 89,000 COP
  - Description: "100% cotton, screen-printed graphic, unisex fit"
- **Acceptance Criteria:**
  - Image zoom functionality on desktop
  - Size chart overlay (modal)
  - Out-of-stock items show "Notify Me" button
  - Product schema markup for SEO

#### **FR-5: Unified Reservation System** (Priority: HIGH)
- Upgrade existing reservation form to database-backed system:
  - Store reservations in Supabase (not just WhatsApp)
  - Availability calendar with real-time slot blocking
  - Reservation confirmation via email + SMS (Twilio)
  - Admin dashboard to view/manage reservations
- Integration with featured games:
  - Auto-suggest reservations for upcoming big games
  - Premium table pricing for high-demand events (surge pricing)
- **Acceptance Criteria:**
  - Zero double-bookings (atomic database transactions)
  - Confirmation email sent within 10 seconds of booking
  - Admin can export reservations to CSV
  - Handle 200+ reservations per day

#### **FR-6: Order Management Dashboard** (Priority: HIGH)
- Admin view for all orders (merchandise + restaurant):
  - Order ID, customer name, items, status, total, payment status
  - Filters: date range, order type, status, payment method
  - Bulk actions (mark as fulfilled, print invoices)
- Restaurant-specific views:
  - Kitchen display screen (tablet-friendly)
  - Order queue with estimated prep times
  - Mark orders as ready for pickup/delivery
- Fulfillment workflow:
  - Print packing slips for merchandise orders
  - Print receipts for restaurant orders
  - Update tracking numbers (Shopify Fulfillment API)
- **Acceptance Criteria:**
  - Dashboard loads < 1 second with 1,000+ orders
  - Real-time updates via WebSockets (Supabase Realtime)
  - Mobile-responsive for tablet use in kitchen

---

### **Medium Priority Features (Phase 2)**

#### **FR-7: Customer Account Portal** (Priority: MEDIUM)
- User registration and authentication (Supabase Auth):
  - Email/password signup
  - Google OAuth login
  - Password reset flow
- Customer dashboard with:
  - Order history (merchandise + restaurant orders)
  - Upcoming reservations
  - Saved addresses
  - Loyalty points balance
- Wishlist for merchandise
- **Acceptance Criteria:**
  - < 30 second signup flow
  - Account creation increases repeat purchase rate by 20%
  - 60% of users opt in to email marketing

#### **FR-8: Delivery & Pickup Options** (Priority: MEDIUM)
- Restaurant orders:
  - **Pickup** (customer collects at venue)
  - **Delivery** (Skybox in-house delivery within 5km radius)
  - Estimated ready time (15-45 minutes based on order complexity)
- Merchandise orders:
  - **In-Store Pickup** (free)
  - **Local Delivery** (Medellín metro area, 15,000 COP flat rate)
  - **National Shipping** (via Servientrega, 3-5 day delivery)
- Real-time order tracking:
  - Order received → Preparing → Ready/Dispatched → Delivered
  - SMS notifications at each stage
- **Acceptance Criteria:**
  - Delivery time accuracy > 85% (±15 min)
  - < 2% lost/damaged shipments
  - Customer satisfaction score > 4.2/5 for delivery

#### **FR-9: Inventory Management** (Priority: MEDIUM)
- Stock tracking for:
  - Merchandise (Shopify inventory)
  - Restaurant ingredients (Supabase custom tables)
- Low-stock alerts (email notifications to admin)
- Purchase order generation for restock
- Expiry date tracking for perishable items
- **Acceptance Criteria:**
  - Zero stockouts during major events
  - Inventory accuracy > 98%
  - Automated restock alerts when inventory < 20%

#### **FR-10: Promotions & Discounts** (Priority: MEDIUM)
- Discount codes (Shopify Discounts API):
  - Percentage off (e.g., "WORLDSERIES25" for 25% off)
  - Fixed amount off (e.g., 20,000 COP off orders > 100,000 COP)
  - Free shipping (orders > 150,000 COP)
  - Buy-one-get-one (BOGO) deals
- Flash sales (time-limited discounts)
- Bundle pricing (e.g., "Game Day Combo: 4 burgers + pitcher of beer")
- Loyalty program:
  - Earn 1 point per 1,000 COP spent
  - Redeem points for discounts (100 points = 10,000 COP off)
- **Acceptance Criteria:**
  - Discount codes work 100% of the time (no edge case bugs)
  - Promotional sales increase conversion rate by 35%
  - Loyalty program enrollment rate > 40% of registered users

---

### **Low Priority Features (Phase 3 / Future)**

#### **FR-11: Gift Cards** (Priority: LOW)
- Digital gift cards via Shopify:
  - Denominations: 50,000, 100,000, 200,000, 500,000 COP
  - Email delivery with custom message
  - Redeemable online and in-venue
- Physical gift cards sold at venue
- **Acceptance Criteria:**
  - Gift card sales contribute 5% of monthly revenue
  - 80% redemption rate within 6 months

#### **FR-12: Advanced Analytics** (Priority: LOW)
- Business intelligence dashboard:
  - Revenue by product category
  - Best-selling items (merchandise + food)
  - Customer lifetime value (CLV)
  - Peak ordering times
  - Churn analysis
- Integration with Google Analytics 4
- Export reports to PDF/Excel
- **Acceptance Criteria:**
  - Dashboard provides actionable insights for monthly planning
  - Data accuracy > 99.5%

#### **FR-13: Social Proof & Reviews** (Priority: LOW)
- Product reviews (Shopify Product Reviews app)
- Instagram integration (shoppable posts)
- User-generated content gallery (customers wearing merchandise)
- Testimonials section on homepage
- **Acceptance Criteria:**
  - 30% of customers leave reviews
  - Products with reviews convert 25% better than unreviewed

#### **FR-14: Multi-Language Support** (Priority: LOW)
- Spanish (default) + English toggle
- Currency switcher (COP / USD)
- Localized content for expats and tourists
- **Acceptance Criteria:**
  - English language pages available for 100% of content
  - International sales increase by 15%

---

## 5. User Experience

### **Entry Points & First-Time User Flow**

#### **Entry Point 1: Merchandise Shopper (via Social Media Ad)**

**User Journey:**
1. **Ad Click** – User sees Instagram ad for "World Series 2025 T-Shirts Now Available"
2. **Landing Page** – Arrives at `/shop` (Shopify storefront embedded in React app)
   - Hero banner: "Official World Series 2025 Merch – Limited Edition"
   - Featured products grid (6 items visible above fold)
   - Free shipping badge for orders > 150,000 COP
3. **Product Discovery** – Clicks on "World Series 2025 Tee"
   - Product page loads with 6 images, size chart, reviews
   - "Add to Cart" button prominent (sticky on mobile)
4. **Add to Cart** – Selects size (L), color (Navy), quantity (1)
   - Cart slides in from right (drawer component)
   - Shows item added, subtotal, "View Cart" or "Checkout" buttons
5. **Checkout** – Clicks "Checkout"
   - Shopify Checkout loads (seamless iframe integration)
   - Enters email, shipping address, payment info
   - Order confirmation page with order number and tracking
6. **Post-Purchase** – Receives email confirmation immediately
   - Email includes: Order details, tracking link, estimated delivery date
   - Invitation to create account (optional, saves address for next time)

**First-Time User Optimizations:**
- **Guest checkout enabled** (no forced account creation)
- **Auto-fill forms** (Google autocomplete for addresses)
- **Progress indicators** (Cart → Checkout → Confirmation)
- **Trust signals** (SSL badge, secure payment logos, customer reviews)

**Friction Points Addressed:**
- ❌ **Problem:** Users don't know if product will fit
  ✅ **Solution:** Size chart modal, detailed measurements, fit guide
- ❌ **Problem:** Shipping costs unclear
  ✅ **Solution:** Shipping calculator on product page, free shipping threshold
- ❌ **Problem:** Abandoned carts due to complex checkout
  ✅ **Solution:** Express checkout (Google Pay, Apple Pay), autofill

---

#### **Entry Point 2: Restaurant Guest (Searching for Dining Options)**

**User Journey:**
1. **Google Search** – User searches "sports bar near me El Poblado"
2. **Google Business Profile** – Clicks Skybox listing
   - Redirects to `/menu` page
3. **Menu Browsing** – Scrolls through food items
   - High-quality images, prices in COP, dietary filters
   - "Order Online" button appears on every item
4. **Order Creation** – Clicks "Order Big League BBQ Platter"
   - Item added to cart
   - Modal asks: "Pickup or Delivery?"
   - Selects "Delivery" → enters address
5. **Checkout** – Proceeds to Shopify Checkout
   - Enters payment info
   - Order confirmation: "Your order will arrive in 35-45 minutes"
6. **Order Tracking** – Receives SMS updates:
   - "Order confirmed – being prepared"
   - "Order out for delivery"
   - "Order delivered – enjoy!"

**First-Time User Optimizations:**
- **Location-based defaults** (auto-detect delivery address via geolocation)
- **Estimated delivery time** shown before checkout
- **Customization options** (add-ons, notes for kitchen)

---

#### **Entry Point 3: Event Organizer (Booking Table for Group)**

**User Journey:**
1. **Direct Link** – Receives WhatsApp message from friend: "Let's watch the Super Bowl at Skybox!"
2. **Events Page** – Clicks link to `/events/super-bowl-lix`
   - Event details: Date (Feb 9, 2025), time, pricing (per-person minimum)
   - Gallery of past events
   - "Reserve Table" CTA button
3. **Reservation Form** – Clicks "Reserve Table"
   - Form fields: Name, email, phone, guest count (dropdown: 2-15), date/time picker
   - Special requests text area (e.g., "Need high chair for toddler")
   - Deposit required: 50,000 COP (50% of estimated bill)
4. **Payment** – Redirects to Shopify Checkout for deposit
   - Secure payment via credit card
5. **Confirmation** – Receives email with:
   - Reservation details
   - QR code (for check-in at venue)
   - Link to pre-order food (optional)
6. **Pre-Event Reminder** – Receives SMS 1 day before: "Your Super Bowl reservation is tomorrow at 6 PM!"

**First-Time User Optimizations:**
- **Calendar integration** (add to Google Calendar / iCal)
- **Pre-order food** (optional, saves time at venue)
- **Group payment** (split deposit with friends via link)

---

### **Core Experience**

#### **Experience 1: Browsing Merchandise Catalog**

**User Flow:**
1. **Homepage** → Click "Shop" in header navigation
2. **Shop Landing Page** (`/shop`)
   - Category tiles: Skybox Gear | Team Apparel | Event Merch | Accessories
   - Featured products carousel
   - Filters: Size, Color, Price Range, Category
   - Sort by: Best Selling, Newest, Price (Low-High), Price (High-Low)
3. **Product Listing Page** (PLP)
   - Grid view (3 columns desktop, 2 mobile)
   - Product cards show: Image, name, price, quick-add button
   - Hover effects: Secondary image on hover, "Quick View" button
4. **Product Detail Page** (PDP)
   - Image gallery (6+ photos, zoom on hover)
   - Product info: Name, price, description, size/color selectors
   - Reviews section (star rating, customer photos)
   - "Add to Cart" button (sticky on scroll)
   - Related products ("You May Also Like")
5. **Add to Cart** → Cart drawer slides in
   - Shows: Item added, cart summary, "Continue Shopping" or "Checkout"

**Key Interactions:**
- **Filtering:** Click "Size: Large" → URL updates to `/shop?size=large`
- **Quick View:** Modal opens with product details (no page navigation)
- **Wishlist:** Click heart icon → saves to account (requires login)

**Performance Targets:**
- PLP loads in < 1.5 seconds (server-side rendering with Next.js or lazy loading)
- PDP images load progressively (blur-up effect)
- Cart updates in < 300ms (optimistic UI updates)

---

#### **Experience 2: Placing Restaurant Order**

**User Flow:**
1. **Homepage** → Click "Menu" in navigation
2. **Menu Page** (`/menu`)
   - Category tabs: Appetizers, Mains, Sides, Drinks, Desserts
   - Food cards with images, descriptions, prices
   - Dietary icons (vegetarian, gluten-free, spicy)
3. **Add to Cart** – Click "+ Add" on "BBQ Pulled Pork Sandwich"
   - Customization modal opens:
     - Quantity selector
     - Add-ons (extra cheese +5,000 COP, bacon +8,000 COP)
     - Special instructions text box
   - Click "Add to Cart" → item added
4. **Cart Review** – Click cart icon in header
   - Shows all items, quantities, prices
   - Promo code input field
   - Subtotal, taxes, delivery fee breakdown
5. **Delivery Options** – Select "Delivery" or "Pickup"
   - **Delivery:** Enter address, select time slot (ASAP or scheduled)
   - **Pickup:** Select pickup time (15, 30, 45 min)
6. **Checkout** → Shopify Checkout iframe
   - Pre-filled delivery address
   - Payment info entry
   - Order confirmation
7. **Order Tracking** – Redirects to `/orders/:orderId`
   - Real-time status updates (animated progress bar)
   - Estimated delivery time countdown
   - Contact restaurant button (WhatsApp)

**Key Interactions:**
- **Customization:** Add/remove toppings, adjust spice level
- **Reorder:** One-click reorder from order history
- **Scheduling:** Schedule order for later (e.g., "Deliver at 7 PM for game")

---

#### **Experience 3: Booking Event Reservation**

**User Flow:**
1. **Events Page** (`/events`)
   - Upcoming events grid (cards with images, dates, countdown timers)
   - Filter by sport (NFL, NBA, Soccer, UFC)
2. **Event Detail** – Click on "Super Bowl LIX – Feb 9, 2025"
   - Event details: Teams, start time, broadcast info, ticket pricing
   - Gallery of past Super Bowl events at Skybox
   - "Reserve Your Table" button
3. **Reservation Form** – Modal opens (or new page `/reserve?event=super-bowl-lix`)
   - Auto-filled event details
   - User inputs: Name, email, phone, guest count, special requests
   - Date/time selector (shows available slots)
   - Table preference (bar seating, booth, patio)
4. **Deposit Payment** – Required for high-demand events
   - Deposit amount: 50,000 COP (applied to final bill)
   - Redirects to Shopify Checkout
5. **Confirmation** – Email + SMS sent immediately
   - Reservation details
   - QR code for check-in
   - Option to pre-order food (saves time at venue)
6. **Pre-Event** – Receives reminder 1 day before
   - "Your reservation is tomorrow at 6 PM – Reply YES to confirm or CANCEL to modify"

**Key Interactions:**
- **Calendar Sync:** Add reservation to Google/Apple Calendar
- **Pre-Order Food:** Optional step to order food in advance
- **Modification:** Edit reservation up to 24 hours before event
- **Cancellation:** Cancel with full refund (up to 48 hours before)

---

### **Advanced Features & Edge Cases**

#### **Feature 1: Pre-Order for Reservations**

**Scenario:** User has reservation for Super Bowl, wants to pre-order food to avoid wait

**Flow:**
1. User receives reservation confirmation email
2. Email includes link: "Pre-Order Your Food Now"
3. Clicks link → redirects to `/reserve/:reservationId/preorder`
4. Shows curated game-day menu (10-15 items)
5. User adds items to cart
6. Checkout → payment processed
7. Food ready when user arrives at venue (no wait)

**Edge Cases:**
- **Menu Changes:** Item ordered is no longer available → user notified 24 hours before, offered substitute
- **Dietary Restrictions:** User notes allergies in special requests → kitchen flags order

---

#### **Feature 2: Size/Color Out of Stock**

**Scenario:** User wants to buy "World Series Tee" in size L, navy color – item out of stock

**Flow:**
1. User selects size L, color navy → "Out of Stock" message appears
2. "Notify Me When Available" button shown
3. User clicks → modal asks for email
4. User enters email → subscribes to restock notification
5. When item restocks → automated email sent: "Good news! The World Series Tee (L, Navy) is back in stock"
6. Email includes direct link to product page

**Edge Cases:**
- **Never Restocks:** After 30 days, send follow-up email suggesting alternative products
- **Multiple Restocks:** User only notified once (even if item goes out of stock again)

---

#### **Feature 3: Order Cancellation/Refund**

**Scenario:** User orders merchandise but needs to cancel before shipping

**Flow:**
1. User goes to account → order history → clicks order
2. "Cancel Order" button available (only if order not shipped)
3. User clicks → confirmation modal: "Are you sure you want to cancel?"
4. Confirms → order status changes to "Cancelled"
5. Refund processed automatically (Shopify Refunds API)
6. User receives email: "Your order has been cancelled and refund issued"
7. Refund appears in original payment method within 5-7 business days

**Edge Cases:**
- **Partial Cancellation:** User wants to cancel 1 item from multi-item order → supported via admin dashboard (requires contacting support)
- **Already Shipped:** User can't cancel → must refuse delivery for full refund

---

#### **Feature 4: Dietary Restrictions & Allergies**

**Scenario:** User has gluten allergy, needs to filter menu

**Flow:**
1. User goes to `/menu`
2. Clicks "Dietary Filters" button
3. Selects checkboxes: Gluten-Free, Vegetarian
4. Menu updates to show only matching items (7 items)
5. Each item shows allergen info (hover tooltip: "Contains: dairy, soy")

**Edge Cases:**
- **Cross-Contamination:** Disclaimer shown: "We cannot guarantee 100% allergen-free preparation"
- **Custom Requests:** User can add notes: "No onions, extra sauce"

---

### **UI/UX Highlights**

#### **Design System Consistency**

**Color Palette:**
- **Primary:** HSL(28, 83%, 52%) – Skybox Orange
- **Secondary:** HSL(0, 61%, 30%) – Sports Red
- **Neutral:** HSL(35, 100%, 97%) – Cream background
- **Dark:** HSL(0, 0%, 8%) – Text and headers

**Typography:**
- **Headers:** Bold, sans-serif (e.g., Inter, Open Sans)
- **Body:** Regular, readable (16px base size, 1.5 line height)
- **CTAs:** Uppercase, bold

**Component Patterns:**
- **Buttons:**
  - Primary: Orange background, white text, rounded corners
  - Secondary: Outlined, transparent background
  - Disabled: Grayed out, cursor not-allowed
- **Cards:**
  - Shadow on hover (elevation effect)
  - Image + text layout
  - Action buttons at bottom
- **Forms:**
  - Label above input
  - Validation errors inline (red text below field)
  - Success state (green checkmark)

---

#### **Mobile Responsiveness**

**Breakpoints:**
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

**Mobile-Specific Optimizations:**
- **Sticky "Add to Cart":** Button sticks to bottom of screen on PDP
- **Hamburger Menu:** Collapsible nav on mobile (drawer animation)
- **Touch-Friendly:** Button size min 44x44px (Apple HIG guidelines)
- **Image Optimization:** Serve WebP format, lazy load images below fold
- **One-Handed Use:** Cart drawer accessible with thumb

---

#### **Accessibility (WCAG 2.1 AA)**

**Compliance Targets:**
- **Keyboard Navigation:** All interactive elements accessible via Tab/Enter
- **Screen Readers:** ARIA labels on all buttons, proper heading hierarchy (H1 → H6)
- **Color Contrast:** Minimum 4.5:1 for body text, 3:1 for large text
- **Focus Indicators:** Clear visual outline on focused elements
- **Alt Text:** Descriptive alt tags for all images
- **Form Labels:** Explicit labels for inputs (not placeholder text)

**Testing:**
- Use axe DevTools to audit accessibility
- Manual testing with screen reader (NVDA or VoiceOver)
- Keyboard-only navigation testing

---

#### **Performance Optimization**

**Targets:**
- **Lighthouse Score:** > 90 (Performance, Accessibility, Best Practices, SEO)
- **Page Load Time:** < 2 seconds on 3G connection
- **Time to Interactive (TTI):** < 3.5 seconds
- **First Contentful Paint (FCP):** < 1.5 seconds

**Strategies:**
- **Code Splitting:** Lazy load routes with React.lazy()
- **Image Optimization:** Use next/image or Cloudinary (auto-format WebP, lazy load)
- **Caching:** Service workers for offline support (PWA)
- **CDN:** Serve static assets via Cloudflare or Supabase CDN
- **Database Queries:** Use Supabase RPC functions for complex queries (reduce round trips)
- **API Rate Limiting:** Implement caching with React Query (5-minute stale time)

---

## 6. Narrative

**Meet Andrés, a 28-year-old marketing manager who lives and breathes sports.** Every Sunday, he gathers his friends at Skybox to watch NFL games, cheering for the Pittsburgh Steelers over craft beers and loaded nachos. But when the 2025 World Series rolled around, Andrés faced a problem: he wanted to show his team pride with official merchandise, but local stores in Medellín only carried soccer jerseys. Importing from the USA meant paying 30% import taxes and waiting 4 weeks – the Series would be over by then.

**With Skybox's new e-commerce platform, Andrés discovers the solution.** While browsing Instagram, he sees a sponsored post: *"World Series 2025 Merch Now Available – Free Shipping Over 150K COP."* He clicks through to Skybox's online shop and finds exactly what he needs: a limited-edition World Series t-shirt with his favorite team's logo. The product page shows detailed images, a size chart, and reviews from fellow fans. Within 3 clicks, he completes his order and receives a confirmation email.

**Two days later, Andrés picks up his shirt at Skybox** (free in-store pickup) while watching Thursday Night Football. He loves the quality – 100% cotton, vibrant print, perfect fit. The next time his team makes it to the playoffs, he orders two more shirts for his friends directly from his phone during the game. No more relying on overpriced imports or settling for generic merchandise.

**For Carolina, a 32-year-old HR director, Skybox's new platform solves a different pain point.** She's planning a corporate team-building event for 15 colleagues and needs a venue with great food, sports ambiance, and a reliable booking system. In the past, WhatsApp bookings felt too informal – no deposit, no calendar sync, unclear confirmation.

**Now, she uses Skybox's reservation portal to book a private section** for an NBA playoff game. The system lets her select date/time, specify guest count, and pre-order a catering package ("Game Day Combo: Wings, Sliders, Fries, Pitcher of Beer"). She pays a 50% deposit via credit card and receives an automated confirmation email with a calendar invite. The day before the event, she gets an SMS reminder. Her team has an amazing night, and Carolina becomes a repeat customer – every quarter, she books another event at Skybox.

**This is the power of Skybox's expanded platform:** turning casual visitors into loyal customers by meeting them where they are – online, mobile, anytime. Whether it's buying merchandise, ordering food for delivery, or booking the perfect table for the big game, Skybox makes it effortless, seamless, and memorable.

---

## 7. Success Metrics

### **User-Centric Metrics**

1. **Conversion Rate:**
   - **Merchandise:** 3.5% of shop visitors complete purchase (industry benchmark: 2-3%)
   - **Restaurant Orders:** 5% of menu visitors place order (benchmark: 4-6%)
   - **Reservations:** 8% of event page visitors book table (benchmark: 5-10%)

2. **Time to Complete Action:**
   - **Checkout:** Average 2 minutes from cart to confirmation (target: < 3 min)
   - **Reservation:** Average 1.5 minutes from form to confirmation (target: < 2 min)
   - **Menu Browsing:** Users find desired item in < 30 seconds (measured via heatmaps)

3. **User Satisfaction:**
   - **Post-Purchase Survey:** Net Promoter Score (NPS) > 50
   - **Delivery Accuracy:** 90% of orders arrive within estimated time (±15 min)
   - **Product Quality:** < 2% return rate for merchandise (industry benchmark: 5-8%)

4. **Repeat Customer Rate:**
   - **30-Day Repeat Purchase:** 25% of customers make second purchase within 30 days
   - **90-Day Retention:** 45% of customers return within 90 days
   - **Annual Retention:** 60% of customers make 3+ purchases per year

5. **Engagement Metrics:**
   - **Account Creation:** 60% of purchasers create accounts (vs. guest checkout)
   - **Email Open Rate:** 35% (industry benchmark: 18-25%)
   - **Wishlist Usage:** 40% of registered users add items to wishlist

---

### **Business Metrics**

1. **Revenue Targets:**
   - **Merchandise Sales:** $15,000 USD/month by Month 6 (180,000,000 COP/year)
   - **Restaurant Online Orders:** $8,000 USD/month by Month 6
   - **Reservation Deposits:** $5,000 USD/month (applied to final bills)
   - **Total New Revenue:** $28,000 USD/month ($336,000 USD/year)

2. **Profit Margins:**
   - **Merchandise:** 60% gross margin (after COGS, shipping, platform fees)
   - **Restaurant Orders:** 25% gross margin (after food costs, delivery, packaging)
   - **Reservations:** 100% margin on deposits (no incremental cost)

3. **Customer Acquisition Cost (CAC):**
   - **Paid Ads:** < $12 USD per customer (Instagram, Google Ads)
   - **Organic:** < $3 USD per customer (SEO, word-of-mouth)
   - **Target CAC:LTV Ratio:** 1:3 (i.e., customer lifetime value = 3x acquisition cost)

4. **Average Order Value (AOV):**
   - **Merchandise:** 120,000 COP ($30 USD) – target: increase to 150,000 COP via upsells
   - **Restaurant:** 80,000 COP ($20 USD) – target: increase to 100,000 COP via combos
   - **Combined:** 100,000 COP ($25 USD)

5. **Website Traffic:**
   - **Monthly Visitors:** Increase from 8,000 to 12,000 (+50%) by Month 6
   - **Bounce Rate:** < 45% (industry benchmark: 50-60%)
   - **Session Duration:** > 3 minutes (indicates engagement)

6. **Operational Efficiency:**
   - **Order Fulfillment Time:** Merchandise shipped within 24 hours (96% on-time rate)
   - **Restaurant Prep Time:** Average 25 minutes from order to ready
   - **Reservation Processing:** 100% automated (zero manual data entry)

---

### **Technical Metrics**

1. **Performance:**
   - **Page Load Time:** < 2 seconds (Lighthouse Performance > 90)
   - **API Response Time:** < 300ms for 95th percentile requests
   - **Database Query Time:** < 50ms for simple reads, < 200ms for complex aggregations

2. **Uptime & Reliability:**
   - **System Uptime:** 99.9% (< 43 minutes downtime per month)
   - **Payment Success Rate:** > 98% (Shopify Payments)
   - **Email Delivery Rate:** > 98% (transactional emails via Supabase/SendGrid)

3. **Scalability:**
   - **Concurrent Users:** Support 500 concurrent users without degradation
   - **Peak Load Handling:** Handle 2x normal traffic during major events (Super Bowl, World Series)
   - **Database Scalability:** Handle 100,000+ orders without performance issues

4. **Security:**
   - **PCI Compliance:** 100% compliance (handled by Shopify Payments)
   - **Data Encryption:** All sensitive data encrypted at rest (AES-256) and in transit (TLS 1.3)
   - **Vulnerability Scans:** Zero critical/high vulnerabilities (monthly scans via Dependabot)
   - **Rate Limiting:** API rate limits enforced (100 req/min per IP)

5. **Code Quality:**
   - **Test Coverage:** > 80% for critical paths (checkout, payments, reservations)
   - **TypeScript Coverage:** 100% (zero `any` types in production code)
   - **Accessibility:** WCAG 2.1 AA compliance (100% of pages)
   - **Lighthouse Scores:** All pages > 90 (Performance, Accessibility, Best Practices, SEO)

6. **Monitoring & Alerting:**
   - **Error Rate:** < 0.1% of requests result in errors (5xx status codes)
   - **Alert Response Time:** Critical alerts acknowledged within 15 minutes
   - **Logging:** 100% of errors logged with stack traces (Sentry or Supabase Logs)

---

## 8. Technical Considerations

### **Integration Points**

#### **Shopify Storefront API**

**Purpose:** Power e-commerce functionality (product catalog, cart, checkout)

**Integration Approach:**
- **Headless Commerce:** Use Shopify Storefront API (GraphQL) instead of Shopify-hosted storefront
- **React Frontend:** Query Shopify API from existing React app (via Apollo Client or Fetch API)
- **Authentication:** Shopify Storefront Access Token (public token for read operations)

**Key Endpoints:**
- `products` – Fetch product catalog with variants, images, pricing
- `checkout` – Create checkout session, add line items, apply discounts
- `customer` – Customer authentication and account management (optional)

**Example Query:**
```graphql
{
  products(first: 20) {
    edges {
      node {
        id
        title
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 5) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
}
```

**Considerations:**
- **Rate Limits:** Storefront API has generous limits (1000 req/min) – unlikely to hit
- **Caching:** Cache product data for 5-10 minutes to reduce API calls (React Query)
- **Webhooks:** Use Shopify Admin API webhooks to sync inventory changes to Supabase

---

#### **Supabase Backend**

**Purpose:** Store application data (reservations, restaurant orders, custom events, user profiles)

**Integration Approach:**
- **Supabase JS Client:** Already configured in project (`@supabase/supabase-js`)
- **Database:** PostgreSQL with RLS (Row Level Security) for access control
- **Realtime:** Subscribe to order status updates (WebSockets)
- **Storage:** Store images (menu items, event photos) in Supabase Storage

**Key Tables:**
- `reservations` – Store table bookings
- `restaurant_orders` – Store food orders (separate from Shopify merchandise orders)
- `events` – Upcoming sports events (synced with static data initially)
- `profiles` – User profiles linked to Supabase Auth

**Example Query:**
```typescript
const { data, error } = await supabase
  .from('reservations')
  .insert({
    user_id: user.id,
    event_id: 'super-bowl-lix',
    reservation_date: '2025-02-09T18:00:00',
    guest_count: 8,
    deposit_paid: true,
    status: 'confirmed'
  });
```

**Considerations:**
- **RLS Policies:** Ensure users can only view/edit their own orders
- **Indexes:** Add indexes on `user_id`, `event_id`, `reservation_date` for fast queries
- **Backups:** Enable daily backups via Supabase dashboard

---

#### **Payment Processing (Shopify Payments)**

**Purpose:** Handle credit card payments for merchandise and restaurant orders

**Integration Approach:**
- **Shopify Checkout API:** Redirect users to Shopify-hosted checkout (PCI-compliant)
- **Embedded Checkout:** Use iframe or Web Checkout SDK for seamless experience
- **Payment Methods:** Credit/debit cards, local Colombian payment methods (PSE, Efecty)

**Flow:**
1. User adds items to cart
2. Frontend creates checkout session via Shopify API
3. Redirects user to Shopify Checkout URL
4. Shopify processes payment
5. Redirects back to Skybox website with order confirmation
6. Webhook notifies Supabase of order creation

**Considerations:**
- **Shopify Payments Fees:** 2.9% + $0.30 per transaction (standard rate)
- **Currency:** Set store currency to COP (Colombian Peso)
- **Fraud Detection:** Shopify has built-in fraud analysis
- **Refunds:** Use Shopify Admin API to issue refunds programmatically

---

#### **Delivery/Logistics**

**Integration Options:**
1. **In-House Delivery (Phase 1):**
   - Manual dispatch via admin dashboard
   - Driver uses Google Maps for navigation
   - SMS updates sent via Twilio

2. **Third-Party Integration (Future):**
   - Servientrega API for national shipping (merchandise)
   - Rappi/Uber Eats API for restaurant delivery (Phase 3)

**Considerations:**
- **Delivery Zone:** Define 5km radius around Skybox for in-house delivery
- **Delivery Fees:** Flat rate (15,000 COP) or free above threshold (150,000 COP)
- **Driver Management:** Simple admin view to assign orders to drivers

---

#### **Email/SMS Notifications**

**Services:**
- **Email:** Supabase Edge Functions + SendGrid (transactional emails)
  - Order confirmations, shipping updates, reservation confirmations
- **SMS:** Twilio API for SMS notifications
  - Order status updates, reservation reminders

**Triggers:**
- **Order Placed:** Send confirmation email + SMS immediately
- **Order Shipped:** Send tracking email with link
- **Reservation Confirmed:** Send email with QR code + calendar invite
- **Reservation Reminder:** Send SMS 24 hours before event

**Considerations:**
- **Rate Limits:** Twilio has generous limits (1000 SMS/day on trial, unlimited on paid plan)
- **Compliance:** Include unsubscribe links in marketing emails (GDPR/CAN-SPAM)
- **Personalization:** Use customer name, order details in templates

---

### **Data Storage & Privacy**

#### **Data Architecture**

**Shopify (E-Commerce Data):**
- Products, variants, inventory
- Merchandise orders
- Customer accounts (optional – can use Supabase Auth instead)
- Payment transactions

**Supabase (Application Data):**
- Reservations
- Restaurant orders (food items tracked separately from Shopify)
- User profiles (extended attributes not in Shopify)
- Events (sports games, restaurant events)
- Analytics (custom event tracking)

**Supabase Storage (Media):**
- Menu item images
- Event photos
- User-uploaded content (e.g., profile pictures)

---

#### **Data Privacy & Compliance**

**GDPR Compliance:**
- **Data Access:** Users can export their data via account settings (Supabase RPC function)
- **Right to Deletion:** Users can request account deletion (soft delete, retain orders for legal reasons)
- **Consent:** Cookie banner for non-essential cookies (Google Analytics)
- **Data Minimization:** Only collect necessary data (no unnecessary fields)

**PCI Compliance:**
- **No Card Data Storage:** Payment info handled entirely by Shopify (PCI-compliant processor)
- **HTTPS Only:** Enforce TLS 1.3 for all connections
- **Tokenization:** Shopify stores payment methods as tokens (not raw card numbers)

**Colombian Data Protection Law (Ley 1581 de 2012):**
- **Explicit Consent:** Users must opt in to marketing communications
- **Data Purpose:** Clearly state how data will be used (terms of service)
- **Local Storage:** Data stored on Supabase (AWS US-East-1 region) – consider EU/South America region for compliance

---

#### **Data Retention Policies**

- **Orders:** Retain indefinitely (legal requirement for tax records)
- **Reservations:** Retain for 2 years (analytics, repeat customer tracking)
- **User Accounts:** Retain until user requests deletion
- **Logs/Analytics:** Retain for 90 days (debug, security monitoring)

---

### **Scalability & Performance**

#### **Database Scaling**

**Current Setup:**
- **Supabase Free Tier:** 500 MB storage, 50,000 monthly active users, 2 GB bandwidth
- **Expected Growth:** 1,000 orders/month initially → 10,000 orders/month by Year 2

**Scaling Strategy:**
- **Vertical Scaling:** Upgrade to Supabase Pro ($25/month) when storage > 500 MB
  - Pro tier: 8 GB storage, 100,000 MAUs, 50 GB bandwidth
- **Horizontal Scaling:** Use read replicas for analytics queries (future)
- **Caching:** Implement Redis caching for frequently accessed data (menu items, featured products)

**Query Optimization:**
- **Indexes:** Add composite indexes on `(user_id, created_at)` for order history queries
- **Materialized Views:** Create pre-aggregated views for analytics (e.g., daily sales totals)
- **Pagination:** Limit queries to 50 records per page (avoid full table scans)

---

#### **API Rate Limiting**

**Shopify API:**
- **Storefront API:** 1000 req/min (should be sufficient for < 1000 concurrent users)
- **Admin API:** 2 req/sec (used for webhooks, admin dashboard)

**Supabase API:**
- **Anonymous Requests:** Rate limit to 100 req/min per IP (prevent abuse)
- **Authenticated Requests:** 500 req/min per user

**Frontend Optimization:**
- **Debouncing:** Search inputs debounced by 300ms (reduce API calls)
- **Request Coalescing:** Batch multiple queries into single request (GraphQL batching)
- **Caching:** React Query caches API responses for 5 minutes (staleTime: 5 * 60 * 1000)

---

#### **Content Delivery Network (CDN)**

**Static Assets:**
- **Images:** Serve from Supabase Storage CDN (global edge network)
- **JS/CSS Bundles:** Serve from Lovable CDN or Cloudflare (build artifacts)

**Image Optimization:**
- **Lazy Loading:** Images below fold load on scroll (Intersection Observer)
- **Responsive Images:** Use `srcset` for multiple resolutions (300px, 600px, 1200px)
- **WebP Format:** Serve WebP with JPEG fallback (15-25% smaller file size)

---

### **Potential Challenges**

#### **Challenge 1: Shopify + Supabase Data Sync**

**Problem:** Orders placed via Shopify need to be synced to Supabase for unified order management

**Solution:**
- **Webhooks:** Configure Shopify webhooks to fire on `orders/create`, `orders/updated`
- **Webhook Handler:** Supabase Edge Function receives webhook, inserts order into Supabase table
- **Idempotency:** Use Shopify `order_id` as unique key to prevent duplicate inserts
- **Error Handling:** Retry failed webhook deliveries (Shopify retries up to 19 times)

**Implementation:**
```typescript
// Supabase Edge Function: handle-shopify-order
export async function handleShopifyOrder(req: Request) {
  const order = await req.json();

  await supabase.from('shopify_orders').insert({
    shopify_order_id: order.id,
    customer_email: order.email,
    total: order.total_price,
    items: order.line_items,
    status: order.fulfillment_status,
    created_at: order.created_at
  });

  return new Response('OK', { status: 200 });
}
```

---

#### **Challenge 2: Inventory Sync Between Shopify & Supabase**

**Problem:** Merchandise inventory managed in Shopify, restaurant ingredients in Supabase – need unified view

**Solution:**
- **Single Source of Truth:** Shopify is source of truth for merchandise inventory
- **Webhooks:** Sync inventory updates from Shopify to Supabase (`inventory_levels/update`)
- **Restaurant Inventory:** Separate system in Supabase (not linked to Shopify)
- **Admin Dashboard:** Show both inventories side-by-side in unified view

---

#### **Challenge 3: Handling High Traffic During Major Events**

**Problem:** Super Bowl, World Series could generate 10x normal traffic – risk of downtime

**Solution:**
- **Load Testing:** Use k6 or Artillery to simulate 1,000 concurrent users
- **Autoscaling:** Supabase Pro tier auto-scales database connections
- **CDN Caching:** Cache product pages for 1 hour (serve stale content if API down)
- **Queue System:** For non-critical tasks (email sending), use job queue (Supabase pg_cron or BullMQ)
- **Graceful Degradation:** If Shopify API is down, show cached product data with "Checkout temporarily unavailable" message

---

#### **Challenge 4: Payment Failures**

**Problem:** User completes order but payment fails (card declined, insufficient funds)

**Solution:**
- **Retry Logic:** Shopify automatically retries declined payments (up to 3 times)
- **User Notification:** Send email: "Your payment failed – please update your payment method"
- **Order Status:** Mark order as "Payment Pending" in Supabase (not "Confirmed")
- **Abandoned Checkout Recovery:** Send reminder email after 1 hour: "Complete your order – items still in cart"

---

#### **Challenge 5: Fraud Detection**

**Problem:** Malicious users place fake orders with stolen credit cards

**Solution:**
- **Shopify Fraud Analysis:** Shopify automatically flags high-risk orders (score 0-100)
- **Manual Review:** Orders with risk score > 50 require admin approval before fulfillment
- **Velocity Checks:** Rate limit orders per IP (max 5 orders/day)
- **Address Verification:** Require phone number + delivery address verification (SMS OTP)

---

## 9. Milestones & Sequencing

### **Project Estimate**

**Size:** Medium-Large
**Duration:** 8-10 weeks (2 months)
**Complexity:** High (multiple integrations, e-commerce, payments)

---

### **Team Size & Composition**

**Core Team (5 people):**
1. **Product Manager** (1) – You (SKY) – defines requirements, prioritizes features
2. **Frontend Engineer** (1) – React/TypeScript expert, builds UI components
3. **Backend Engineer** (1) – Supabase, Shopify API, webhooks, Edge Functions
4. **Designer** (0.5 FTE) – UI/UX design, mockups, design system updates
5. **QA Engineer** (0.5 FTE) – Testing, bug reports, accessibility audits

**Supporting Roles:**
- **DevOps/Infrastructure** (as needed) – Supabase setup, deployment
- **Content Writer** (freelance) – Product descriptions, email templates
- **Photographer** (freelance) – Product photography for merchandise

---

### **Suggested Phases**

---

## **Phase 1: Foundation & Setup (Weeks 1-2)**

**Goal:** Set up infrastructure, integrate Shopify, deploy database schema

### **Week 1: Planning & Architecture**

**Deliverables:**
- ✅ Finalize PRD (this document)
- ✅ Technical architecture diagram (Shopify + Supabase + React)
- ✅ Database schema design (Supabase tables: `reservations`, `restaurant_orders`, `events`)
- ✅ Wireframes for key pages (Shop, Menu, Checkout flow)
- ✅ Shopify store setup:
  - Create Shopify Partner account
  - Set up development store
  - Configure store settings (currency: COP, tax rates, shipping zones)
- ✅ Supabase project setup:
  - Deploy database migrations (tables, indexes, RLS policies)
  - Configure authentication (email/password, OAuth)
  - Set up storage buckets for images

**Team Focus:**
- **PM:** Finalize requirements, create user stories
- **Designer:** Wireframes and mockups
- **Backend Engineer:** Database schema, Supabase setup
- **Frontend Engineer:** Shopify Storefront API research, GraphQL queries

---

### **Week 2: Shopify Integration & Product Catalog**

**Deliverables:**
- ✅ Shopify Storefront API integrated with React app
  - Apollo Client setup for GraphQL queries
  - Authentication with Storefront Access Token
- ✅ Product catalog page (`/shop`) with:
  - Product listing grid (20 products)
  - Filtering (category, size, price)
  - Sorting (best-selling, newest, price)
- ✅ Product detail page (`/product/:id`) with:
  - Image gallery, size/color selectors, "Add to Cart" button
- ✅ Shopping cart component (drawer UI):
  - Add/remove items, update quantities
  - Subtotal calculation
  - Persistent cart (localStorage)
- ✅ First 20 products added to Shopify:
  - **Skybox-Branded:** 5 t-shirts, 3 hoodies, 2 hats
  - **World Series 2025:** 5 t-shirts (different designs/teams)
  - **Generic Sports:** 5 items (NFL/MLB/NBA generic)

**Team Focus:**
- **Frontend Engineer:** Shopify API integration, product pages, cart component
- **Backend Engineer:** Set up Shopify webhooks (orders, inventory)
- **Designer:** Product page mockups, cart UI design
- **Content Writer:** Write product descriptions

---

## **Phase 2: E-Commerce Core (Weeks 3-4)**

**Goal:** Complete checkout flow, payment processing, order management

### **Week 3: Checkout & Payments**

**Deliverables:**
- ✅ Checkout flow implemented:
  - Create checkout session via Shopify API
  - Redirect to Shopify Checkout (hosted or embedded)
  - Handle checkout completion callback
- ✅ Order confirmation page (`/orders/:id`):
  - Display order details (items, total, shipping address)
  - Order status tracking
  - Email confirmation sent (Shopify automatic emails)
- ✅ Shopify Payments configured:
  - Enable credit/debit cards (Visa, Mastercard, Amex)
  - Enable local payment methods (PSE, Efecty)
  - Test transactions in Shopify test mode
- ✅ Webhook handler (Supabase Edge Function):
  - Sync orders from Shopify to Supabase on `orders/create`
  - Store order data in `shopify_orders` table

**Team Focus:**
- **Frontend Engineer:** Checkout flow, order confirmation page
- **Backend Engineer:** Webhook handler, Supabase Edge Function
- **QA:** Test checkout flow end-to-end (test credit cards)

---

### **Week 4: Order Management & Admin Dashboard**

**Deliverables:**
- ✅ Admin dashboard (`/admin/orders`):
  - View all orders (merchandise + restaurant)
  - Filters: date range, status, type
  - Order detail view (customer info, items, payment status)
  - Actions: mark as fulfilled, print invoice, issue refund
- ✅ Order fulfillment workflow:
  - Print packing slips (integrate with browser print API)
  - Update tracking numbers (Shopify Fulfillment API)
  - Send shipment notification emails
- ✅ Customer account pages:
  - Order history (`/account/orders`)
  - Account settings (email, password)
  - Saved addresses
- ✅ User authentication (Supabase Auth):
  - Email/password signup/login
  - Google OAuth login
  - Password reset flow

**Team Focus:**
- **Frontend Engineer:** Admin dashboard UI, customer account pages
- **Backend Engineer:** Authentication, order queries, fulfillment API
- **Designer:** Admin dashboard mockups

---

## **Phase 3: Restaurant Features (Weeks 5-6)**

**Goal:** Build restaurant menu, online ordering, event reservations

### **Week 5: Menu Management & Ordering**

**Deliverables:**
- ✅ Migrate static menu data to Supabase:
  - Import existing 8 menu items from `src/data/menu.ts`
  - Add 15 new items (expand appetizers, mains, drinks)
- ✅ Admin menu editor (`/admin/menu`):
  - CRUD operations for menu items
  - Upload images to Supabase Storage
  - Toggle availability (mark items as sold out)
- ✅ Customer-facing menu page (`/menu`):
  - Display menu items with images, prices, descriptions
  - Dietary filters (vegetarian, gluten-free, vegan)
  - Add to cart functionality (items treated as Shopify products)
- ✅ Customization options:
  - Add-ons (extra cheese, bacon)
  - Special instructions text box
- ✅ Restaurant checkout flow:
  - Select delivery or pickup
  - Enter delivery address (if delivery)
  - Select time slot (ASAP or scheduled)
  - Redirects to Shopify Checkout

**Team Focus:**
- **Backend Engineer:** Database migration, admin API endpoints
- **Frontend Engineer:** Menu page, admin editor UI, checkout flow
- **QA:** Test menu management, ordering flow

---

### **Week 6: Event Reservations**

**Deliverables:**
- ✅ Reservation system upgrade:
  - Store reservations in Supabase (not just WhatsApp)
  - Availability calendar (show open/full time slots)
  - Auto-suggest reservations for upcoming big games
- ✅ Reservation flow improvements:
  - Date/time picker with real-time availability
  - Guest count selector (2-15 people)
  - Table preference (bar, booth, patio)
  - Deposit payment (50,000 COP) via Shopify Checkout
- ✅ Reservation confirmation:
  - Email with QR code (for check-in at venue)
  - Calendar invite attachment (iCal format)
  - Option to pre-order food
- ✅ Admin reservation management (`/admin/reservations`):
  - View all reservations (filterable by date, status)
  - Check-in guests (scan QR code via tablet)
  - Modify/cancel reservations
- ✅ Pre-order functionality:
  - Link sent in confirmation email
  - User selects food from curated game-day menu
  - Food ready when user arrives

**Team Focus:**
- **Backend Engineer:** Reservation system, QR code generation, email sending
- **Frontend Engineer:** Reservation UI, admin dashboard
- **Designer:** QR code design, email templates

---

## **Phase 4: Enhancements & Polish (Weeks 7-8)**

**Goal:** Add delivery/pickup, inventory, promotions, mobile optimization

### **Week 7: Delivery & Inventory**

**Deliverables:**
- ✅ Delivery options:
  - **Pickup:** Customer collects at venue (free)
  - **Local Delivery:** 5km radius, 15,000 COP flat rate (or free > 150K)
  - **National Shipping:** Servientrega integration (merchandise only)
- ✅ Delivery tracking:
  - Order status updates (received → preparing → ready → dispatched → delivered)
  - SMS notifications via Twilio
  - Real-time tracking map (Google Maps API)
- ✅ Inventory management:
  - Merchandise: Sync from Shopify (automatic)
  - Restaurant ingredients: Custom Supabase table
  - Low-stock alerts (email notifications)
- ✅ Driver dispatch system (admin dashboard):
  - Assign orders to drivers
  - Map view of delivery locations
  - Driver performance metrics

**Team Focus:**
- **Backend Engineer:** Delivery logic, SMS integration, inventory API
- **Frontend Engineer:** Tracking UI, admin dispatch dashboard
- **QA:** Test delivery flow end-to-end

---

### **Week 8: Promotions & Mobile Optimization**

**Deliverables:**
- ✅ Discount codes (Shopify Discounts API):
  - Percentage off (e.g., "WORLDSERIES25" for 25% off)
  - Fixed amount off (e.g., 20K COP off orders > 100K)
  - Free shipping (orders > 150K)
  - Admin UI to create/manage discount codes
- ✅ Loyalty program:
  - Earn 1 point per 1,000 COP spent
  - Redeem points for discounts (100 points = 10K off)
  - Display points balance in customer account
- ✅ Mobile optimization:
  - Responsive design audit (test on 5+ devices)
  - Touch-friendly buttons (min 44x44px)
  - Sticky "Add to Cart" button on mobile PDP
  - Mobile-optimized cart drawer
- ✅ Performance optimization:
  - Image lazy loading (below fold)
  - Code splitting (React.lazy for routes)
  - Lighthouse audit (target: > 90 Performance score)
  - CDN caching (Cloudflare or Supabase CDN)

**Team Focus:**
- **Frontend Engineer:** Mobile optimization, performance tuning
- **Backend Engineer:** Promotions API, loyalty program
- **QA:** Mobile testing (iOS/Android devices)

---

## **Phase 5: Testing & Launch (Weeks 9-10)**

**Goal:** Comprehensive testing, bug fixes, production deployment

### **Week 9: QA & Bug Fixes**

**Deliverables:**
- ✅ End-to-end testing:
  - **Merchandise Orders:** Browse → Add to cart → Checkout → Payment → Confirmation
  - **Restaurant Orders:** Menu → Add to cart → Delivery → Checkout → Tracking
  - **Reservations:** Events → Reserve → Deposit → Confirmation → Check-in
- ✅ Edge case testing:
  - Out-of-stock items (notify me when available)
  - Payment failures (card declined)
  - Delivery address outside zone
  - Duplicate orders (idempotency checks)
- ✅ Accessibility audit:
  - Keyboard navigation
  - Screen reader testing (NVDA/VoiceOver)
  - Color contrast checks (WCAG 2.1 AA)
- ✅ Security audit:
  - SQL injection tests (Supabase RLS)
  - XSS vulnerability checks
  - CSRF protection (Shopify Checkout handles)
  - Rate limiting tests (prevent abuse)
- ✅ Bug fixes:
  - Prioritize critical bugs (blockers for launch)
  - Document known issues for post-launch

**Team Focus:**
- **QA Engineer:** Lead testing efforts, bug reports
- **Frontend/Backend Engineers:** Fix bugs
- **PM:** Prioritize bugs, decide launch readiness

---

### **Week 10: Launch Preparation & Go-Live**

**Deliverables:**
- ✅ Production deployment:
  - Deploy Supabase migrations to production database
  - Switch Shopify from test mode to live mode
  - Configure production environment variables
  - Enable Shopify Payments (live transactions)
- ✅ Data migration:
  - Import product catalog (50+ SKUs)
  - Add high-quality product images
  - Write product descriptions and SEO metadata
- ✅ Monitoring setup:
  - Error tracking (Sentry or Supabase Logs)
  - Uptime monitoring (UptimeRobot or Pingdom)
  - Analytics (Google Analytics 4)
  - Performance monitoring (Lighthouse CI)
- ✅ Documentation:
  - Admin user guide (how to manage orders, products, reservations)
  - Customer FAQ (shipping, returns, reservations)
  - Developer docs (API endpoints, webhook handlers)
- ✅ Launch checklist:
  - [ ] All tests passing
  - [ ] Production env variables configured
  - [ ] Shopify Payments live
  - [ ] Backups enabled (Supabase)
  - [ ] Monitoring active
  - [ ] Support email/WhatsApp ready
- ✅ Soft launch:
  - Announce to small group (20-50 beta testers)
  - Monitor for issues (24-hour observation period)
  - Fix critical bugs
- ✅ Public launch:
  - Announce on social media (Instagram, Facebook)
  - Email blast to existing customers
  - Update Google Business Profile
  - Press release (local Medellín media)

**Team Focus:**
- **All Hands:** Deploy, monitor, support during launch
- **PM:** Coordinate launch activities, communication
- **Frontend/Backend:** On-call for critical bugs

---

## **Phase 6: Post-Launch Optimization (Weeks 11-12)**

**Goal:** Gather feedback, iterate, optimize based on real user data

### **Weeks 11-12: Iteration & Growth**

**Deliverables:**
- ✅ User feedback collection:
  - Post-purchase surveys (NPS score)
  - In-app feedback widget
  - Social media monitoring (Instagram mentions)
- ✅ Analytics review:
  - Conversion funnel analysis (where users drop off)
  - Top-selling products (prioritize restocking)
  - Bounce rate analysis (improve high-bounce pages)
- ✅ A/B testing:
  - Test product page layouts (image gallery vs. single image)
  - Test CTA button text ("Add to Cart" vs. "Buy Now")
  - Test discount messaging (free shipping vs. % off)
- ✅ Feature enhancements:
  - Add customer reviews (Shopify Product Reviews app)
  - Implement wishlist functionality
  - Add related products ("You May Also Like")
- ✅ Marketing campaigns:
  - Email campaign: "New World Series Merch Just Dropped"
  - Instagram ads: Target sports fans in Medellín
  - Google Ads: "Sports bar near me", "buy sports merchandise"
- ✅ Ongoing optimization:
  - Fix bugs reported by users
  - Improve page load times (< 2 sec target)
  - Add more products (goal: 100+ SKUs by Month 3)

**Team Focus:**
- **PM:** Analyze data, prioritize next features
- **Frontend/Backend Engineers:** Implement enhancements
- **Marketing:** Run campaigns, analyze ROI

---

## 10. Risks & Mitigation Strategies

### **Risk 1: Shopify API Changes**

**Impact:** High
**Likelihood:** Low
**Description:** Shopify deprecates Storefront API endpoints, breaking our integration

**Mitigation:**
- Subscribe to Shopify developer changelog (email notifications)
- Use versioned API (e.g., `2024-01` instead of latest)
- Build abstraction layer (don't directly call Shopify API from components)
- Test against beta API versions before deprecation

---

### **Risk 2: Payment Fraud**

**Impact:** Medium
**Likelihood:** Medium
**Description:** Fraudulent orders with stolen credit cards → chargebacks → revenue loss

**Mitigation:**
- Use Shopify Fraud Analysis (automatic risk scoring)
- Require phone verification for high-value orders (> 300K COP)
- Manual review for orders flagged as high-risk (score > 50)
- Implement velocity checks (max 5 orders per IP/day)
- Enable 3D Secure authentication (Shopify Payments supports)

---

### **Risk 3: Delivery Delays/Errors**

**Impact:** Medium
**Likelihood:** High
**Description:** Food arrives late/wrong/cold → bad reviews → customer churn

**Mitigation:**
- Set realistic delivery times (add 10-minute buffer)
- Real-time tracking with SMS updates (transparency)
- Quality control checklist before dispatch (photo of order)
- Issue refunds/discounts proactively for failures
- Hire reliable drivers (background checks, training)

---

### **Risk 4: Supabase Downtime**

**Impact:** High
**Likelihood:** Low
**Description:** Supabase outage → can't access reservations, orders, menu data

**Mitigation:**
- Enable automatic backups (daily snapshots)
- Implement fallback to cached data (React Query keeps stale data)
- Use Supabase Pro tier (99.9% uptime SLA)
- Monitor uptime with UptimeRobot (get alerts via SMS)
- Have manual backup process (export reservations to CSV daily)

---

### **Risk 5: Low Merchandise Sales**

**Impact:** High
**Likelihood:** Medium
**Description:** Merchandise doesn't sell → excess inventory → cash tied up

**Mitigation:**
- Start with small inventory (10-20 units per SKU)
- Use print-on-demand for some items (no upfront inventory cost)
- Run promotions to move slow-selling items (flash sales, BOGO)
- Analyze sales data weekly (identify trends, adjust inventory)
- Offer gift cards to hedge against inventory risk

---

### **Risk 6: Restaurant vs. Shopify Data Sync Issues**

**Impact:** Medium
**Likelihood:** Medium
**Description:** Webhook failures → orders not synced to Supabase → lost data

**Mitigation:**
- Implement idempotent webhook handlers (prevent duplicate inserts)
- Log all webhook payloads (debug sync issues)
- Retry failed webhooks (exponential backoff)
- Build reconciliation job (runs daily, compares Shopify vs. Supabase)
- Alert admin if sync fails (email notification)

---

### **Risk 7: Poor Mobile Experience**

**Impact:** High
**Likelihood:** Medium
**Description:** Mobile users bounce due to slow load times or bad UX → lost sales

**Mitigation:**
- Mobile-first design (start with mobile wireframes)
- Lazy load images (reduce initial page weight)
- Optimize bundle size (code splitting, tree shaking)
- Test on real devices (5+ Android/iOS devices)
- Monitor mobile metrics separately (Google Analytics mobile reports)

---

### **Risk 8: High Abandonment Rate at Checkout**

**Impact:** High
**Likelihood:** Medium
**Description:** Users add items to cart but don't complete checkout → lost revenue

**Mitigation:**
- Implement abandoned cart emails (Shopify automatic emails)
- Offer guest checkout (no forced account creation)
- Show progress indicator (Cart → Checkout → Confirmation)
- Display trust signals (SSL badge, secure payment logos)
- A/B test checkout flow (find friction points)

---

### **Risk 9: Competitor Enters Market**

**Impact:** Medium
**Likelihood:** Medium
**Description:** Another sports bar in Medellín launches similar e-commerce

**Mitigation:**
- Focus on brand loyalty (unique Skybox experience)
- Offer exclusive products (limited-edition merch)
- Build community (email newsletter, events, loyalty program)
- Move fast (launch MVP quickly, iterate based on feedback)
- Continuously innovate (add new features competitors can't copy)

---

### **Risk 10: Regulatory Changes (Colombian E-Commerce Laws)**

**Impact:** Low
**Likelihood:** Low
**Description:** New laws require additional compliance (e.g., tax reporting, data residency)

**Mitigation:**
- Consult with Colombian legal expert (pre-launch review)
- Monitor regulatory changes (subscribe to DIAN updates)
- Build flexible architecture (easy to add compliance features)
- Use compliant platforms (Shopify, Supabase have compliance teams)

---

## 11. Testing & Quality Assurance

### **Testing Strategy**

#### **1. Unit Testing**

**Scope:** Test individual functions/components in isolation

**Tools:**
- **Jest** (test runner)
- **React Testing Library** (component tests)

**Coverage Target:** 80% for critical paths

**Examples:**
- Test cart add/remove logic (pure functions)
- Test form validation (Zod schemas)
- Test date formatting utilities

**Command:**
```bash
npm test -- --coverage
```

---

#### **2. Integration Testing**

**Scope:** Test interactions between components and APIs

**Tools:**
- **Cypress** (E2E testing framework)
- **MSW** (Mock Service Worker for API mocking)

**Test Cases:**
- **Merchandise Checkout Flow:**
  1. Navigate to `/shop`
  2. Click product card
  3. Select size, color
  4. Click "Add to Cart"
  5. Verify cart drawer opens with correct item
  6. Click "Checkout"
  7. Verify redirect to Shopify Checkout
- **Restaurant Ordering Flow:**
  1. Navigate to `/menu`
  2. Add item to cart
  3. Select delivery option
  4. Proceed to checkout
  5. Verify order created in Supabase
- **Reservation Flow:**
  1. Navigate to `/events/super-bowl-lix`
  2. Fill reservation form
  3. Pay deposit
  4. Verify confirmation email sent

**Command:**
```bash
npm run cypress:open
```

---

#### **3. End-to-End (E2E) Testing**

**Scope:** Test complete user journeys from start to finish

**Tools:**
- **Cypress** (full browser automation)
- **Stripe Test Cards** (payment testing)

**Test Scenarios:**
- **Happy Path (Merchandise):**
  1. Browse shop → Add to cart → Checkout → Pay → Confirm
  2. Verify email sent
  3. Verify order appears in admin dashboard
- **Edge Cases:**
  - Out-of-stock item → should show "Notify Me" button
  - Invalid promo code → should show error message
  - Payment declined → should show retry option

**Command:**
```bash
npm run cypress:run
```

---

#### **4. Accessibility Testing**

**Scope:** Ensure WCAG 2.1 AA compliance

**Tools:**
- **axe DevTools** (Chrome extension)
- **Lighthouse** (automated audits)
- **NVDA/VoiceOver** (manual screen reader testing)

**Checklist:**
- [ ] All images have alt text
- [ ] Form inputs have labels (not just placeholders)
- [ ] Color contrast > 4.5:1 for body text
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus indicators visible (outline on focused elements)
- [ ] Heading hierarchy correct (H1 → H6, no skips)
- [ ] ARIA labels on icon buttons

**Command:**
```bash
npm run lighthouse
```

---

#### **5. Performance Testing**

**Scope:** Ensure fast load times and smooth interactions

**Tools:**
- **Lighthouse** (Core Web Vitals)
- **k6** (load testing)
- **Chrome DevTools** (Performance panel)

**Metrics:**
- **Largest Contentful Paint (LCP):** < 2.5 seconds
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

**Load Testing:**
- Simulate 500 concurrent users browsing shop
- Simulate 100 concurrent checkouts
- Verify API response times < 500ms

**Command:**
```bash
k6 run load-test.js
```

---

#### **6. Security Testing**

**Scope:** Identify vulnerabilities before launch

**Tools:**
- **Dependabot** (dependency vulnerabilities)
- **OWASP ZAP** (penetration testing)
- **Supabase RLS Policy Tester** (database access control)

**Test Cases:**
- **SQL Injection:** Try to inject SQL in form inputs
- **XSS:** Try to inject `<script>` tags in inputs
- **CSRF:** Verify CSRF tokens on forms
- **Rate Limiting:** Try to spam API endpoints (should block)
- **Data Access:** Verify users can only view their own orders

**Command:**
```bash
npm audit
```

---

### **QA Checklist (Pre-Launch)**

#### **Functional Testing**

- [ ] All pages load without errors (no 404s, 500s)
- [ ] Navigation links work (header, footer, breadcrumbs)
- [ ] Forms submit correctly (reservations, checkout, contact)
- [ ] Filters/search work on Events, Shop, Menu pages
- [ ] Cart persists across page refreshes
- [ ] Checkout completes successfully (test credit cards)
- [ ] Order confirmation emails sent
- [ ] Admin dashboard accessible (role-based access)
- [ ] Inventory updates reflect in real-time

---

#### **Cross-Browser Testing**

- [ ] Chrome (desktop + mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop + iOS)
- [ ] Edge (desktop)
- [ ] Samsung Internet (Android)

---

#### **Device Testing**

- [ ] iPhone 13/14/15 (iOS Safari)
- [ ] Samsung Galaxy S21/S22 (Chrome Android)
- [ ] iPad (Safari)
- [ ] Desktop (1920x1080, 1366x768)
- [ ] Laptop (1440x900)

---

#### **Accessibility Testing**

- [ ] Keyboard navigation works (no mouse needed)
- [ ] Screen reader announces content correctly
- [ ] Color contrast passes (WCAG AA)
- [ ] Focus indicators visible
- [ ] Alt text on all images
- [ ] Form labels explicit (not placeholders)

---

#### **Performance Testing**

- [ ] Lighthouse Performance score > 90
- [ ] Page load time < 2 seconds (3G network)
- [ ] Images optimized (WebP format, lazy loading)
- [ ] No unnecessary re-renders (React DevTools Profiler)

---

#### **Security Testing**

- [ ] HTTPS enforced (redirect HTTP → HTTPS)
- [ ] No console errors/warnings
- [ ] No secrets in client-side code
- [ ] Rate limiting works (API abuse prevention)
- [ ] SQL injection tests pass
- [ ] XSS tests pass

---

## 12. Maintenance & Future Considerations

### **Ongoing Maintenance Tasks**

#### **Daily**
- Monitor error logs (Sentry or Supabase Logs)
- Check for failed webhook deliveries (Shopify admin)
- Review order fulfillment queue (admin dashboard)

#### **Weekly**
- Review sales reports (top products, revenue trends)
- Check inventory levels (restock low-stock items)
- Review customer feedback (surveys, reviews)
- Update featured products on homepage

#### **Monthly**
- Run security audits (npm audit, OWASP ZAP)
- Review performance metrics (Lighthouse, Core Web Vitals)
- Update dependencies (patch versions only, test thoroughly)
- Backup database (manual export to CSV)

#### **Quarterly**
- Major dependency updates (React, Supabase, Shopify API)
- A/B test new features (based on user feedback)
- Review analytics (identify growth opportunities)
- Plan new product launches (seasonal merchandise)

---

### **Future Feature Ideas (Post-v2.0)**

#### **v2.1: Loyalty & Gamification (Q1 2026)**
- Points system (earn points for purchases, referrals)
- Achievements/badges (e.g., "Attended 10 games at Skybox")
- Leaderboard (top fans, most points)
- VIP tier (free shipping, early access to merch)

#### **v2.2: Mobile App (Q2 2026)**
- React Native app (iOS + Android)
- Push notifications (order updates, event reminders)
- In-app payments (Apple Pay, Google Pay)
- Offline mode (cached menu, past orders)

#### **v2.3: Live Game Scores & Betting (Q3 2026)**
- Real-time score updates (ESPN API or similar)
- Friendly betting pools (Skybox customers only)
- Predictions game (guess final score, win prizes)

#### **v2.4: Subscription Model (Q4 2026)**
- Monthly subscription ($20/month):
  - 20% off all food/merch
  - Reserved table for all big games
  - Exclusive merch drops
- Annual plan ($200/year, 2 months free)

#### **v2.5: Franchise Expansion (2027)**
- White-label platform for other sports bars
- Multi-location support (Bogotá, Cali, Cartagena)
- Centralized inventory management
- Franchise admin portal

---

### **Technology Roadmap**

#### **Short-Term (6 Months)**
- **Add GraphQL Cache:** Implement Apollo Client caching to reduce API calls
- **PWA Support:** Add service workers for offline capability
- **Image CDN:** Migrate to Cloudinary for advanced image optimization
- **Email Templates:** Build custom email templates (replace Shopify defaults)

#### **Medium-Term (12 Months)**
- **Advanced Analytics:** Integrate Mixpanel or Amplitude for user behavior tracking
- **Marketing Automation:** Use Klaviyo for email campaigns (cart abandonment, win-back)
- **CRM Integration:** Sync customer data to HubSpot or Pipedrive
- **Headless CMS:** Use Sanity or Contentful for blog/content management

#### **Long-Term (24 Months)**
- **AI Personalization:** Product recommendations based on purchase history
- **Voice Ordering:** Alexa/Google Assistant integration ("Order my usual from Skybox")
- **AR Try-On:** Augmented reality for merchandise (see how shirt looks on you)
- **Blockchain Loyalty:** NFT-based loyalty program (collectible badges)

---

## Conclusion

This PRD defines a comprehensive roadmap to transform Skybox GameHub from a sports bar website into a multi-revenue e-commerce and restaurant platform. By integrating Shopify for merchandise, enhancing restaurant ordering, and streamlining reservations, Skybox will:

1. **Generate $336K USD in new annual revenue** (merchandise + online orders + deposits)
2. **Increase customer retention by 20%** through loyalty programs and online engagement
3. **Reduce operational overhead by 40%** via automated reservation and order management
4. **Position Skybox as Medellín's leading sports entertainment brand** with best-in-class digital experience

**Next Steps:**
1. Review and approve this PRD
2. Assemble team (frontend, backend, designer, QA)
3. Begin Phase 1 (Weeks 1-2): Shopify setup, database deployment
4. Launch MVP in 8-10 weeks
5. Iterate based on user feedback

**Success depends on:**
- Seamless Shopify + Supabase integration
- High-quality merchandise and food
- Reliable delivery and customer service
- Continuous iteration based on data

Let's build the future of Skybox together. 🚀

---

**Document Metadata:**
- **Author:** Claude (Product Manager AI)
- **Version:** 1.0
- **Date:** 2025-10-23
- **Status:** Draft for Review
- **Next Review:** After stakeholder feedback
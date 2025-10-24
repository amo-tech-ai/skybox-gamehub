# Product Requirements Document (PRD)
# Skybox Sports Bar - Digital Platform Enhancement

---

## 1. Product Overview

### Project Title
**Skybox Sports Bar - Event Management & Merchandise Platform**

### Version Number
**v2.0.0** (Major Feature Release)

### Project Summary

Skybox is a premium sports bar located in Laureles, Medellín, serving primarily expat communities (US, Canada, Europe) who want an authentic sports-viewing experience. The venue generates revenue through food and beverage sales during live sports events. Currently operational with a marketing website, this project aims to enhance the digital platform to:

1. **Improve Event Management** – Better event discovery, reservations, and in-venue coordination
2. **Launch Merchandise Sales** – Skybox-branded gear and sports memorabilia for expats seeking authentic team apparel
3. **Drive In-Venue Traffic** – Use digital touchpoints to bring more customers to the physical location

**The Problem:** While Skybox has established itself as a go-to sports venue for expats, the business faces challenges:
- Event discovery is limited (customers miss games they'd want to attend)
- Reservation management via WhatsApp is informal and inefficient
- No merchandise revenue stream (expats want team gear but can't find it locally)
- Limited data on customer preferences and attendance patterns
- No online presence for brand loyalty beyond physical visits

**The Opportunity:** By enhancing event management and adding merchandise sales, Skybox can:
- Increase venue occupancy during key sporting events
- Generate supplementary revenue through merchandise (World Series shirts, team gear)
- Build brand loyalty with the expat community
- Capture customer data for targeted event promotion
- Create "always-on" customer engagement beyond in-venue visits

**Strategic Alignment:** This enhancement aligns with Skybox's mission to become Laureles' premier sports destination by:
- Making it effortless for expats to find and attend games
- Offering authentic North American sports merchandise unavailable elsewhere in Medellín
- Building a digital community around the sports-watching experience
- Strengthening customer retention through merchandise and event engagement

---

## 2. Goals

### Business Goals

1. **Increase Venue Occupancy** – Achieve 85%+ table occupancy during prime sporting events (up from current 60-70%)
2. **Merchandise Revenue** – Generate 50,000,000 COP ($12,500 USD) in monthly merchandise sales by Month 6
3. **Food & Beverage Growth** – Increase F&B revenue by 30% through better event promotion and reservations
4. **Customer Retention** – Increase repeat customer visits from 3x/month to 5x/month for core customers
5. **Brand Awareness** – Grow digital following (Instagram, website) by 40% among Medellín expat community
6. **Operational Efficiency** – Reduce reservation management time by 60% through automated system
7. **Customer Database** – Build email/WhatsApp database of 2,000+ customers for event promotions

### User Goals

1. **Never Miss a Game** – Easily discover when their favorite teams are playing at Skybox
2. **Hassle-Free Reservations** – Book tables reliably without back-and-forth WhatsApp messages
3. **Authentic Merchandise** – Buy quality team gear without importing from USA (avoid 30% import taxes)
4. **Community Connection** – Connect with fellow expat sports fans
5. **Convenience** – Order merchandise online, pick up at venue (or get shipped)
6. **Transparency** – Clear event schedules, table availability, and merchandise pricing

### Non-Goals (Out of Scope for v2.0)

1. **Food Delivery** – No restaurant delivery service; Skybox is in-venue dining only
2. **Multiple Locations** – Single Laureles location focus; no venue expansion
3. **Gift Cards** – Deferred to future phase
4. **Third-Party Delivery Integration** – No Rappi/Uber Eats integration
5. **Mobile Native Apps** – Web-only (mobile-responsive); no iOS/Android apps in v2.0
6. **Live Streaming** – No in-house game streaming (licensing restrictions)
7. **Loyalty Points/Membership Tiers** – Simple engagement model; advanced loyalty deferred

---

## 3. User Personas

### Key User Types

1. **The American Expat Sports Fanatic** – Core customer, attends 3-5 games/month
2. **The Group Organizer** – Books tables for friends/colleagues for big games
3. **The Visiting Tourist** – Short-term visitors seeking familiar sports experience
4. **The Merchandise Buyer** – Buys gear online, may or may not visit venue frequently

---

### Detailed Personas

#### **Jake – The American Expat Sports Fanatic**
- **Age:** 34
- **Origin:** Pittsburgh, PA (living in Medellín 2+ years)
- **Occupation:** Remote software engineer for US company
- **Location:** Laureles, Medellín
- **Behavior:**
  - Watches NFL every Sunday at Skybox (Steelers fan)
  - Attends MLB playoffs, NBA Finals, World Series
  - Active in expat WhatsApp groups
  - Spends 300,000-600,000 COP/month on F&B at Skybox
  - Owns multiple team jerseys but struggles to find new gear locally
- **Goals:**
  - Never miss Steelers games
  - Watch games with fellow American expats
  - Buy authentic Steelers/Pittsburgh gear without paying import taxes
  - Feel connected to home sports culture
- **Pain Points:**
  - Sometimes misses games because he didn't know they were showing at Skybox
  - WhatsApp reservations get lost in message threads
  - Importing jerseys from USA costs 30% import tax + 3-4 week shipping
  - Hard to coordinate with friends for group viewing
- **Tech Comfort:** High – uses mobile apps, expects modern UX

#### **Sarah – The Group Organizer**
- **Age:** 29
- **Origin:** Toronto, Canada (in Medellín 1 year)
- **Occupation:** Marketing manager for Canadian startup
- **Location:** Poblado, Medellín
- **Behavior:**
  - Organizes viewing parties for 8-12 friends (mix of expats)
  - Books tables for Super Bowl, March Madness, Stanley Cup Finals
  - Prefers email confirmations for planning
  - Budget-conscious but values reliable service
- **Goals:**
  - Easy group booking with guaranteed tables
  - Email/calendar confirmations (not just WhatsApp screenshots)
  - Coordinate food/drink packages for groups
  - Impress friends with organized events
- **Pain Points:**
  - WhatsApp booking feels too informal for organizing 10+ people
  - No visibility into table availability (has been turned away before)
  - Difficult to confirm everyone's attendance
  - No way to pre-order food for large groups
- **Tech Comfort:** Medium-High – comfortable with web, email workflows

#### **Tom – The Visiting Tourist**
- **Age:** 45
- **Origin:** Chicago, IL (visiting Medellín 2 weeks)
- **Occupation:** Sales executive
- **Behavior:**
  - Discovered Skybox via Google search "sports bar near me"
  - Wants to watch Bears game while on vacation
  - Will visit once or twice during trip
  - Looking for authentic American sports bar vibe
- **Goals:**
  - Find out what games are showing
  - Walk in or make quick reservation
  - Familiar food and atmosphere
- **Pain Points:**
  - Not sure if Skybox will have his team's game
  - Doesn't use WhatsApp actively (US phone number)
  - Wants simple booking without account creation
- **Tech Comfort:** Medium – prefers simple web browsing

#### **Mike – The Merchandise Buyer**
- **Age:** 38
- **Origin:** Boston, MA (living in Medellín 3 years)
- **Occupation:** English teacher
- **Location:** Envigado, Medellín
- **Behavior:**
  - Visits Skybox occasionally (2-3x/year) for big games
  - Huge Red Sox/Patriots fan
  - Currently imports gear from USA (expensive)
  - Would buy locally if available
- **Goals:**
  - Buy authentic team merchandise without import fees
  - Support local businesses (Skybox)
  - Get merchandise quickly (not 4-week shipping)
- **Pain Points:**
  - Importing costs 30% tax + shipping (turns $40 shirt into $70)
  - Long wait times for delivery
  - No local retailers for niche sports merchandise
  - Quality concerns with knockoffs on MercadoLibre
- **Tech Comfort:** High – expects Amazon-level e-commerce UX

#### **Emma – The Social Expat**
- **Age:** 27
- **Origin:** London, UK (in Medellín 6 months)
- **Occupation:** Digital nomad (freelance designer)
- **Location:** Poblado, Medellín
- **Behavior:**
  - Not huge sports fan but enjoys social atmosphere
  - Attends Champions League matches, major events (Super Bowl)
  - Follows Skybox on Instagram for events
  - Brings friends (mix of expats and locals)
- **Goals:**
  - Discover fun social events
  - Easy booking for spontaneous outings
  - Good food and drinks
- **Pain Points:**
  - Doesn't follow sports closely enough to know when games are on
  - Wants to see "what's happening this weekend at Skybox"
  - Finds WhatsApp-only booking inconvenient
- **Tech Comfort:** Very High – mobile-first, Instagram-native

---

### Role-Based Access Control

#### **Customer** (Public User)
- **Permissions:**
  - Browse events and sports schedule
  - View merchandise catalog
  - Add items to cart and checkout (guest or registered)
  - Submit reservation requests via web form (syncs to WhatsApp)
  - Contact Skybox via WhatsApp
- **Authentication:** Optional (guest checkout allowed)

#### **Registered Customer** (Authenticated User)
- **Permissions:**
  - All Customer permissions +
  - View order history (merchandise only)
  - View upcoming reservations
  - Save shipping addresses
  - Track merchandise orders
  - Receive event notifications (email/WhatsApp opt-in)
- **Authentication:** Required (email/password, Google OAuth)

#### **Admin** (Skybox Staff)
- **Permissions:**
  - Manage events (add/edit/feature games)
  - View/manage reservations (Supabase dashboard)
  - Manage merchandise (Shopify admin)
  - View sales reports (Shopify + Supabase)
  - Update menu and event details
  - Export customer data for promotions
- **Authentication:** Required (role-based access)

---

## 4. Functional Requirements

### **High Priority Features (MVP – Must Have)**

#### **FR-1: Enhanced Event Discovery** (Priority: HIGH)
- Improve existing events page with better filtering and discovery:
  - **Smart Filters:** Filter by sport (NFL, NBA, MLB, NHL, Soccer, UFC, F1), date range, team
  - **Search:** Full-text search by team name, event type, league
  - **Featured Games:** Admin can highlight "Don't Miss" events (Super Bowl, World Series, etc.)
  - **Countdown Timers:** Show time until game starts
  - **What's On Today/This Week:** Quick view of upcoming games
  - **Team Subscriptions:** Users can "follow" teams (get WhatsApp/email notifications)
- Integrate existing sports data (NFL, NHL, MLB, Colombian football from `/src/data/`)
- **Acceptance Criteria:**
  - User can find their team's game in < 10 seconds
  - Featured events appear at top of page
  - Mobile-responsive calendar view
  - WhatsApp notification opt-in for followed teams

#### **FR-2: Improved Reservation System** (Priority: HIGH)
- Upgrade existing reservation form with database-backed system:
  - Store reservations in Supabase (not just WhatsApp messages)
  - **Availability Calendar:** Show which time slots are available/full
  - **Group Size:** Specify party size (2-20 people)
  - **Event-Linked Reservations:** Auto-link reservation to specific game
  - **Table Preferences:** Bar seating, booth, patio (optional)
  - **Special Requests:** Text field for notes (birthday, dietary restrictions)
- **Confirmation Flow:**
  - Immediate email confirmation with reservation details
  - WhatsApp confirmation message (Skybox staff responds)
  - Calendar invite (.ics file) attached to email
  - QR code for check-in at venue
- **Admin Dashboard:**
  - View all reservations (filterable by date, event, status)
  - Mark as confirmed, checked-in, no-show, cancelled
  - Export to CSV for planning
- **Acceptance Criteria:**
  - Zero double-bookings (atomic database transactions)
  - Email confirmation sent within 10 seconds
  - Admin can manage 100+ reservations per week effortlessly
  - Mobile-responsive reservation form

#### **FR-3: Shopify Merchandise Store** (Priority: HIGH)
- Integrate Shopify Storefront API for merchandise sales:
  - **Product Categories:**
    - **Skybox-Branded:** T-shirts, hoodies, hats with Skybox logo
    - **Event-Specific:** World Series 2025, Super Bowl LX, etc.
    - **Team Apparel:** NFL, MLB, NBA, NHL team gear (officially licensed where possible)
  - **Product Detail Pages (PDP):**
    - High-quality images (6+ photos per product)
    - Size/color selectors with stock indicators
    - Product descriptions (material, fit, care instructions)
    - Reviews (future phase)
  - **Shopping Cart:**
    - Persistent cart (localStorage + Supabase sync for logged-in users)
    - Add/remove items, update quantities
    - Cart drawer UI (slides in from right)
  - **Checkout:**
    - Shopify Checkout API (hosted checkout)
    - Payment via credit/debit cards (Shopify Payments in COP)
    - Local Colombian payment methods (PSE, Efecty if possible)
  - **Order Confirmation:**
    - Email with order details
    - Option: Pick up at venue (free) or shipping (Medellín metro area)
- **Acceptance Criteria:**
  - Browse 30+ SKUs initially (expand to 100+ by Month 3)
  - Checkout completes in < 3 clicks
  - Mobile conversion rate > 60% of desktop
  - Page load time < 2 seconds

#### **FR-4: Merchandise Fulfillment** (Priority: HIGH)
- **Pickup at Venue:**
  - Customer selects "Pickup at Skybox" during checkout (free)
  - Order ready within 24-48 hours
  - Customer picks up during venue hours (no special arrangements needed)
  - Staff checks order ID/email, hands over merchandise
- **Shipping:**
  - Local delivery (Medellín metro area): 20,000 COP flat rate
  - National shipping (Colombia): Via Servientrega or similar (calculated rate)
  - Order tracking via email (tracking number from Shopify)
- **Inventory Management:**
  - Merchandise inventory tracked in Shopify
  - Low-stock alerts (email to admin when < 10 units)
  - Admin can update stock levels manually
- **Acceptance Criteria:**
  - 95% of pickup orders ready within 48 hours
  - Shipping tracking sent within 24 hours of dispatch
  - < 2% lost/damaged shipments

#### **FR-5: WhatsApp Integration (Primary Communication)** (Priority: HIGH)
- WhatsApp as primary customer communication channel:
  - **Reservation Confirmations:** Send WhatsApp message with reservation details
  - **Event Notifications:** Opt-in WhatsApp notifications for followed teams
  - **Order Updates:** Order status updates via WhatsApp (optional)
  - **Direct Link:** Prominent WhatsApp CTA on all pages (+57 304 786 2834)
- No SMS integration (WhatsApp only for now)
- **Acceptance Criteria:**
  - WhatsApp messages sent within 30 seconds of reservation
  - 90%+ message delivery rate
  - Users can opt-out of marketing messages (compliance)

#### **FR-6: Customer Database & CRM** (Priority: HIGH)
- Build customer database in Supabase:
  - **Profile Data:** Name, email, phone (WhatsApp), origin country, favorite teams
  - **Purchase History:** Merchandise orders linked to customer
  - **Reservation History:** Track attendance frequency
  - **Preferences:** Followed teams, notification settings
- **Admin Export:**
  - Export customer list to CSV for email campaigns
  - Segment by country, favorite sport, attendance frequency
- **Privacy Compliance:**
  - Opt-in for marketing communications (GDPR/Colombian law)
  - Clear privacy policy and data usage terms
- **Acceptance Criteria:**
  - 2,000+ customer profiles by Month 6
  - 60% email capture rate for reservations
  - 40% opt-in rate for event notifications

---

### **Medium Priority Features (Phase 2)**

#### **FR-7: Event Promotions & Specials** (Priority: MEDIUM)
- **Game-Day Specials:** Link food/drink specials to specific events
  - Example: "Super Bowl Special: Wings + Pitcher for 80,000 COP"
- **Happy Hour Promotions:** Time-based discounts (e.g., "4-6 PM: 2-for-1 beers")
- **Merchandise Bundles:** "Game Day Combo: Skybox T-shirt + Reservation = 10% off"
- Display promotions on event pages and homepage
- **Acceptance Criteria:**
  - Promotions visible on event detail pages
  - 20% increase in F&B spend during promoted events

#### **FR-8: Customer Accounts & Order History** (Priority: MEDIUM)
- **User Registration:**
  - Email/password signup
  - Google OAuth login (popular with expats)
  - Password reset flow
- **Customer Dashboard:**
  - Order history (merchandise orders)
  - Upcoming reservations
  - Saved shipping addresses
  - Favorite teams (manage subscriptions)
- **Acceptance Criteria:**
  - < 30 second signup flow
  - 50% of customers create accounts (vs. guest checkout)

#### **FR-9: Admin Analytics Dashboard** (Priority: MEDIUM)
- **Merchandise Analytics:**
  - Best-selling products
  - Revenue by category
  - Conversion rate (shop visitors → purchases)
- **Event Analytics:**
  - Most popular events (by reservations)
  - Attendance by sport
  - Peak reservation times
- **Customer Analytics:**
  - Repeat customer rate
  - Average order value
  - Customer lifetime value
- Simple dashboards in Supabase/Shopify admin (no BI tool in v2.0)
- **Acceptance Criteria:**
  - Weekly sales reports generated automatically
  - Identify top 10 selling products

#### **FR-10: Merchandise Discount Codes** (Priority: MEDIUM)
- **Promo Codes (Shopify Discounts API):**
  - Percentage off (e.g., "STEELERS20" for 20% off Steelers gear)
  - Fixed amount off (e.g., 30,000 COP off orders > 150,000 COP)
  - Free shipping (orders > 200,000 COP)
- **Admin UI:** Create/manage discount codes in Shopify admin
- **Use Cases:**
  - Social media campaigns
  - First-time customer discounts
  - Event-specific promos ("SUPERBOWL25" during Super Bowl week)
- **Acceptance Criteria:**
  - Discount codes apply correctly at checkout
  - Track code usage and revenue impact

---

### **Low Priority Features (Phase 3 / Future)**

#### **FR-11: Social Proof & Reviews** (Priority: LOW)
- Product reviews (Shopify Product Reviews app)
- Instagram feed integration (show customer photos wearing merch)
- Google Reviews integration on homepage

#### **FR-12: Multi-Language Support** (Priority: LOW)
- English (primary) + Spanish toggle
- Serve both expat and local markets
- Bilingual product descriptions

#### **FR-13: Advanced Loyalty Program** (Priority: LOW)
- Points for venue visits and merchandise purchases
- Rewards (free drinks, merchandise discounts, VIP seating)
- Tiered membership (Bronze, Silver, Gold)

---

## 5. User Experience

### **Entry Points & First-Time User Flow**

#### **Entry Point 1: Expat Searches for Game**

**User Journey:**
1. **Google Search** – "Where to watch NFL in Medellín" or "sports bar Laureles"
2. **Google Business Profile / Website** – Lands on Skybox homepage
3. **Event Discovery** – Clicks "Events" in nav → sees NFL schedule
4. **Filter by Team** – Selects "Pittsburgh Steelers" → sees upcoming Steelers games
5. **Reserve Table** – Clicks "Reserve for Steelers vs. Ravens (Sun, Jan 12)"
6. **Fill Reservation Form** – Name, email, WhatsApp, party size (4 people)
7. **Submit** – Receives email + WhatsApp confirmation immediately
8. **Attend Game** – Shows QR code at venue, enjoys game

**Optimizations:**
- Event page prominently featured in nav
- Team filters visible above fold
- One-click "Reserve Table" button on each event card
- Guest checkout (no forced account creation)

---

#### **Entry Point 2: Expat Wants Team Gear**

**User Journey:**
1. **Instagram Ad / Word-of-Mouth** – "Buy Steelers gear at Skybox Medellín"
2. **Website** – Clicks "Shop" in navigation
3. **Browse Merchandise** – Sees "NFL Team Apparel" category
4. **Select Product** – Clicks "Pittsburgh Steelers T-Shirt"
5. **Product Page** – Views images, checks size chart, reads description
6. **Add to Cart** – Selects size L, clicks "Add to Cart"
7. **Checkout** – Chooses "Pickup at Skybox" (free shipping)
8. **Pay** – Shopify Checkout, credit card payment
9. **Confirmation** – Email: "Your order will be ready for pickup in 48 hours"
10. **Pickup** – Stops by Skybox during next game, picks up shirt

**Optimizations:**
- Clear shipping options (pickup highlighted as free)
- Size chart modal
- Pickup instructions clearly stated
- Option to browse menu while ordering (cross-sell: "Order wings for pickup too!")

---

### **Core Experience**

#### **Experience 1: Finding & Reserving for a Big Game**

**User Flow:**
1. **Homepage** → "Super Bowl LIX – February 9, 2025" featured banner
2. **Click Event** → Event detail page:
   - Teams (Eagles vs. Chiefs), kickoff time (6:30 PM Colombia time)
   - Venue capacity status ("70% booked")
   - Special promotions ("Super Bowl Bucket: Wings + Nachos + Pitcher = 90,000 COP")
   - Gallery from past Super Bowls at Skybox
3. **Reserve Table Button** → Reservation form modal:
   - Event pre-filled (Super Bowl LIX)
   - Name, email, WhatsApp, party size (8 people), special requests
4. **Submit** → Immediate confirmation:
   - Email with reservation details
   - WhatsApp message from Skybox staff
   - Calendar invite (.ics file)
   - QR code for check-in
5. **Day Before Event** → WhatsApp reminder: "Your Super Bowl reservation is tomorrow at 6 PM!"
6. **Event Day** → Arrives at venue, shows QR code, staff checks in, seats group

**Key Interactions:**
- Capacity indicator (creates urgency: "Book now, 70% full!")
- Pre-order food option (future phase)
- Social sharing ("Tell friends on WhatsApp")

---

#### **Experience 2: Buying Merchandise**

**User Flow:**
1. **Shop Page** → Product grid (30+ items)
   - Categories: Skybox Gear, NFL, MLB, NBA, NHL, Event Merch
   - Filters: Sport, Team, Size, Price
2. **Product Card** → "World Series 2025 T-Shirt" - 89,000 COP
   - Hover: Quick view button
3. **Product Detail Page:**
   - 6 images (front, back, close-up, model wearing)
   - Size selector (S, M, L, XL, XXL)
   - Color selector (Navy, Gray, White)
   - Description: "100% cotton, screen-printed graphic, unisex fit"
   - Stock indicator ("12 left in stock")
4. **Add to Cart** → Cart drawer slides in from right:
   - Shows item, price, quantity, subtotal
   - "Continue Shopping" or "Checkout" buttons
5. **Checkout** → Shopify Checkout:
   - Shipping options:
     - **Pickup at Skybox** (Free) – "Ready in 48 hours"
     - **Medellín Delivery** (20,000 COP) – "2-3 days"
     - **Colombia National** (Calculated) – "4-7 days"
   - Payment info (credit/debit card)
6. **Order Confirmation:**
   - Email: "Order #12345 confirmed – Ready for pickup on Jan 15"
   - Optional WhatsApp notification
7. **Pickup:**
   - Customer arrives at Skybox during any open hours
   - Shows email or order number
   - Staff retrieves order, confirms ID, hands over merchandise
   - Optional: Customer stays for a drink/meal

**Key Interactions:**
- Size chart modal (expats used to US sizing)
- Pickup as default option (drives venue traffic)
- Clear pickup timeline ("Ready in 48 hours")
- Cross-sell opportunity ("Staying for the game? Reserve a table!")

---

### **Advanced Features & Edge Cases**

#### **Feature 1: Sold-Out Event**

**Scenario:** User wants to reserve for Super Bowl but all tables booked

**Flow:**
1. User clicks "Reserve Table" on Super Bowl event
2. System checks availability → shows message: "Sorry, we're fully booked for this event!"
3. **Options:**
   - "Join Waitlist" button → enters email/WhatsApp, notified if cancellation
   - "View Other Games" button → redirects to upcoming events
4. If cancellation occurs, waitlist customer gets WhatsApp message: "A table just opened up for Super Bowl – Reply YES to claim it (holds for 2 hours)"

---

#### **Feature 2: Out-of-Stock Merchandise**

**Scenario:** Customer wants Steelers shirt in size L, but sold out

**Flow:**
1. User selects size L → "Out of Stock" message
2. **Options:**
   - Try different size (suggest XL or M)
   - "Notify Me When Available" button → enters email
3. When restocked → email: "Good news! Steelers Shirt (Size L) is back in stock – Order now"

---

#### **Feature 3: Last-Minute Walk-In**

**Scenario:** Customer walks in without reservation during busy game

**Flow:**
1. Staff checks Supabase reservation dashboard on tablet
2. Sees available bar seating (no reservation required)
3. Seats customer at bar
4. Recommends customer make reservation for next big game (hands them card with website QR code)

---

### **UI/UX Highlights**

#### **Design System Consistency**

**Color Palette:**
- **Primary:** Skybox Orange (HSL(28, 83%, 52%))
- **Secondary:** Sports Red (HSL(0, 61%, 30%))
- **Neutral:** Cream background (HSL(35, 100%, 97%))
- **Dark:** Headers and text (HSL(0, 0%, 8%))
- **WhatsApp Green:** CTA buttons (HSL(142, 70%, 49%))

**Typography:**
- **Headers:** Bold, sans-serif (Inter or Open Sans)
- **Body:** 16px, 1.5 line height for readability
- **CTAs:** Bold, uppercase

**Component Patterns:**
- **Buttons:**
  - Primary: Orange background, white text
  - WhatsApp: Green background, white text
  - Secondary: Outlined
- **Event Cards:**
  - Image, countdown timer, team logos, "Reserve" button
  - Hover: Lift effect
- **Product Cards:**
  - Image, name, price, "Quick View" button
  - Hover: Secondary image

---

#### **Mobile Responsiveness**

**Mobile-First Approach:**
- 70% of expats browse on mobile (Instagram → website)
- All pages optimized for mobile (320px+)
- Touch-friendly buttons (44x44px minimum)
- Sticky "Reserve" or "Add to Cart" button on mobile

**Mobile-Specific Features:**
- Collapsible filters on shop page
- Drawer-style navigation menu
- One-thumb cart access

---

#### **Performance Optimization**

**Targets:**
- **Page Load Time:** < 2 seconds
- **Lighthouse Performance:** > 90
- **Time to Interactive:** < 3 seconds
- **Mobile Performance:** > 85 (mobile networks in Medellín)

**Strategies:**
- Lazy load images below fold
- Code splitting (React.lazy for routes)
- Optimize Shopify API calls (React Query caching)
- Serve images via CDN (Supabase Storage or Shopify CDN)

---

## 6. Narrative

**Meet Jake, a 34-year-old software engineer from Pittsburgh living in Laureles.** Like many American expats in Medellín, Jake misses the rituals of home – Sunday morning coffee, firing up the TV for Steelers football, wearing his favorite jersey. But finding that experience in Medellín? Nearly impossible. Colombian sports bars show *fútbol*, not football.

That changed when Jake discovered Skybox. Every Sunday at noon, he walks to Skybox (just 10 minutes from his apartment) and watches the Steelers with a dozen other expats cheering, trash-talking, and reliving game-day traditions. The wings aren't quite Buffalo-level, but they're close enough. The atmosphere? Exactly what he's been craving.

**But Jake had a problem.** When the playoffs started, he nearly missed the Steelers' wild card game because he didn't know Skybox was showing it. He only found out when a friend mentioned it on WhatsApp the day before. He rushed to text Skybox for a reservation, but the messages got buried and he never got confirmation. He showed up anyway – luckily got a seat at the bar, but it was stressful.

**Then Skybox launched their new platform.** Now, Jake visits Skybox's website every Monday, checks the "Upcoming Games" page, and sees the full Steelers schedule. He clicks "Follow Steelers" and opts into WhatsApp notifications. Every Wednesday before a Sunday game, his phone buzzes: *"Steelers vs. Ravens this Sunday at 1 PM – Reserve your table now!"* He clicks the link, fills out a 30-second form, and boom – confirmed reservation via email *and* WhatsApp.

**And the merchandise store? Game-changer.** Jake's Steelers jersey is 10 years old and fading. He priced out buying a new one from NFL Shop – $120 + $40 shipping + 30% Colombian import tax = over $200. Instead, he orders a Steelers t-shirt from Skybox's online shop for 89,000 COP ($22 USD). He selects "Pickup at Skybox" (free shipping). Two days later, he swings by to pick it up before Thursday Night Football. He's wearing it the next Sunday when the Steelers make the playoffs.

**For Sarah, the group organizer from Toronto, the platform is a lifesaver.** Last year, she tried to organize a Super Bowl party for 12 friends. The WhatsApp coordination was a nightmare – messages lost, no confirmation, unclear if they had space. This year, she uses Skybox's website: reserves a table for 12, gets an email confirmation with a calendar invite, and shares it in her group chat. Everyone adds it to their calendars. No confusion, no stress. The day before, she gets a WhatsApp reminder. Super Bowl Sunday? Flawless.

**This is the power of Skybox's enhanced platform:** turning casual attendees into loyal regulars by making it effortless to discover games, reserve tables, and connect with the expat sports community. Whether it's a Sunday ritual or a once-a-year Super Bowl blowout, Skybox makes it seamless. And with merchandise, the brand extends beyond the venue – Jake wears his Skybox x Steelers shirt around Laureles, sparking conversations with other expats: *"Where'd you get that?" "Skybox Sports Bar – best spot to watch NFL in Medellín."*

---

## 7. Success Metrics

### **User-Centric Metrics**

1. **Event Discovery:**
   - **Average Time to Find Game:** < 10 seconds (measured via analytics)
   - **Event Page Views:** 2,000+ views/month (up from current 800)
   - **Follow Team Feature:** 300+ users following teams by Month 3

2. **Reservations:**
   - **Conversion Rate:** 15% of event page visitors make reservations (up from current 8%)
   - **Reservation Completion Time:** < 2 minutes (form submission to confirmation)
   - **No-Show Rate:** < 10% (improved from current 20% due to better confirmations)

3. **Merchandise:**
   - **Shop Conversion Rate:** 4% of shop visitors complete purchase (industry benchmark: 2-3%)
   - **Average Order Value:** 150,000 COP ($37 USD)
   - **Repeat Purchase Rate:** 30% of customers make 2+ orders within 6 months

4. **Customer Satisfaction:**
   - **Net Promoter Score (NPS):** > 60 (expats are vocal, loyal community)
   - **Merchandise Return Rate:** < 3% (quality products, clear sizing)
   - **Reservation Confirmation Rate:** 100% (every reservation gets email + WhatsApp)

---

### **Business Metrics**

1. **Revenue Targets:**
   - **Merchandise Sales:** 50,000,000 COP/month ($12,500 USD/month) by Month 6
   - **F&B Revenue Growth:** 30% increase (driven by better event promotion and reservations)
   - **Total New Revenue:** 75,000,000 COP/month ($18,750 USD/month) by Month 6

2. **Venue Occupancy:**
   - **Prime Event Occupancy:** 85%+ (up from current 60-70%)
   - **Weekly Occupancy:** 60%+ across all operating hours (up from 45%)
   - **Average Party Size:** 4.5 people (group bookings increase F&B spend)

3. **Customer Acquisition:**
   - **Customer Database:** 2,000+ emails/WhatsApp contacts by Month 6
   - **CAC (Customer Acquisition Cost):** < $8 USD per customer (Instagram ads, Google Ads)
   - **Customer Lifetime Value (LTV):** $250 USD (6 months F&B + merchandise)
   - **LTV:CAC Ratio:** > 30:1 (high retention in small expat community)

4. **Merchandise Metrics:**
   - **Profit Margin:** 60% gross margin (after COGS, Shopify fees, shipping)
   - **Pickup vs. Shipping:** 70% pickup, 30% shipping (drives venue traffic)
   - **Best-Selling Category:** NFL apparel (60% of merchandise sales)

5. **Operational Efficiency:**
   - **Reservation Management Time:** 10 hours/week → 4 hours/week (60% reduction)
   - **Reservation Accuracy:** 100% (zero double-bookings)
   - **Customer Data Export Time:** 5 minutes (vs. 1 hour manual WhatsApp scraping)

---

### **Technical Metrics**

1. **Performance:**
   - **Page Load Time:** < 2 seconds (3G network)
   - **Lighthouse Performance Score:** > 90
   - **Mobile Performance Score:** > 85
   - **API Response Time:** < 300ms (Shopify + Supabase queries)

2. **Uptime & Reliability:**
   - **System Uptime:** 99.9% (< 43 minutes downtime/month)
   - **Shopify Payment Success Rate:** > 98%
   - **Email Delivery Rate:** > 98% (reservation confirmations)
   - **WhatsApp Delivery Rate:** > 90% (some users have privacy settings)

3. **Scalability:**
   - **Concurrent Users:** Support 200 concurrent users (Super Bowl traffic spike)
   - **Database:** Handle 10,000+ reservations without performance degradation
   - **Order Volume:** Process 500 merchandise orders/month without issues

4. **Security:**
   - **PCI Compliance:** 100% (handled by Shopify Payments)
   - **Data Encryption:** TLS 1.3 for all connections
   - **GDPR/Colombian Compliance:** Opt-in for marketing, clear privacy policy
   - **No Vulnerabilities:** Zero critical/high security issues (monthly audits)

---

## 8. Technical Considerations

### **Architecture Overview**

**Frontend:**
- React + TypeScript (existing codebase)
- Vite build tool
- Tailwind CSS (existing design system)
- React Router for navigation

**Backend:**
- **Supabase:** Reservations, events, customer profiles
- **Shopify:** Merchandise inventory, orders, payments
- **Supabase Storage:** Menu images, event photos

**Integrations:**
- **Shopify Storefront API** (GraphQL) – Fetch products, create checkouts
- **Supabase PostgreSQL** – Store reservations, customer data
- **WhatsApp Business API** (optional) or manual WhatsApp messaging
- **Google Calendar API** – Generate .ics calendar invites

---

### **Integration Details**

#### **Shopify Storefront API**

**Purpose:** Headless commerce for merchandise

**Implementation:**
- Use Apollo Client (GraphQL) to query Shopify Storefront API
- Fetch products, variants, inventory
- Create checkout sessions
- Redirect to Shopify-hosted checkout (simplest, PCI-compliant)

**Example Query:**
```graphql
{
  products(first: 30, query: "tag:NFL") {
    edges {
      node {
        id
        title
        description
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 6) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
```

**Webhooks:**
- Configure Shopify webhooks for `orders/create`, `orders/updated`
- Supabase Edge Function receives webhooks, syncs to Supabase database
- Track order status for admin dashboard

---

#### **Supabase Backend**

**Database Schema:**

**Tables:**
1. **`reservations`**
   - `id` (UUID, primary key)
   - `customer_name` (text)
   - `customer_email` (text)
   - `customer_whatsapp` (text)
   - `event_id` (text, FK to events)
   - `event_name` (text)
   - `reservation_date` (timestamp)
   - `party_size` (integer)
   - `table_preference` (text, optional)
   - `special_requests` (text, optional)
   - `status` (enum: pending, confirmed, checked_in, no_show, cancelled)
   - `qr_code` (text, URL to QR code image)
   - `created_at` (timestamp)

2. **`events`**
   - `id` (text, primary key, e.g., "super-bowl-lix")
   - `title` (text)
   - `subtitle` (text)
   - `sport` (text: NFL, NBA, MLB, etc.)
   - `date` (timestamp)
   - `time` (text)
   - `location` (text, always "Skybox Laureles")
   - `image` (text, URL)
   - `featured` (boolean)
   - `category` (text)
   - `description` (text)
   - `capacity_status` (enum: available, filling_up, almost_full, sold_out)
   - `created_at` (timestamp)

3. **`customers`**
   - `id` (UUID, primary key)
   - `email` (text, unique)
   - `name` (text)
   - `whatsapp` (text)
   - `origin_country` (text)
   - `favorite_teams` (array of text)
   - `notification_preferences` (jsonb: email_opt_in, whatsapp_opt_in)
   - `created_at` (timestamp)

4. **`shopify_orders`** (synced from Shopify)
   - `shopify_order_id` (text, primary key)
   - `customer_email` (text)
   - `customer_id` (UUID, FK to customers)
   - `total` (numeric)
   - `currency` (text, "COP")
   - `status` (text)
   - `line_items` (jsonb)
   - `fulfillment_status` (text)
   - `shipping_method` (text: pickup, local_delivery, national_shipping)
   - `created_at` (timestamp)

**Row Level Security (RLS):**
- Customers can only view their own reservations and orders
- Public can read events (no auth required)
- Admin role can access all data

---

#### **WhatsApp Integration**

**Approach 1 (Simple – Manual):**
- When customer submits reservation, send email confirmation
- Admin receives notification in Supabase dashboard
- Admin manually sends WhatsApp confirmation message
- Use WhatsApp Business app for managing customer conversations

**Approach 2 (Automated – WhatsApp Business API):**
- Integrate WhatsApp Business API (requires Meta Business verification)
- Supabase Edge Function triggers WhatsApp message on reservation
- Use template messages (pre-approved by Meta)
- Example template: "Hi {name}, your reservation for {event} on {date} at {time} is confirmed! Show this message at Skybox for check-in."

**Recommendation:** Start with Approach 1 (manual) in v2.0, upgrade to Approach 2 in future phase once volume justifies automation cost

---

#### **Payment Processing**

**Shopify Payments:**
- Configure Shopify store with Colombian Peso (COP) as currency
- Enable Shopify Payments (credit/debit cards: Visa, Mastercard, Amex)
- Optionally enable local payment methods (PSE, Efecty) if Shopify supports in Colombia
- Transaction fees: ~2.9% + $0.30 USD per transaction

**Flow:**
1. Customer adds merchandise to cart
2. Frontend creates Shopify checkout session via Storefront API
3. Redirect to Shopify-hosted checkout (fully PCI-compliant, no custom payment handling)
4. Shopify processes payment
5. Redirect back to Skybox website with order confirmation
6. Shopify webhook fires → Supabase Edge Function syncs order

**No Custom Payment Handling:** All payment data handled by Shopify (security, compliance)

---

### **Data Privacy & Compliance**

**Colombian Data Protection Law (Ley 1581 de 2012):**
- **Explicit Consent:** Checkbox for "I agree to receive event notifications via email/WhatsApp"
- **Data Purpose:** Clear privacy policy stating how data is used
- **Right to Access/Delete:** Customers can request data export or deletion via email

**GDPR (for European expats):**
- Same protections as Colombian law
- Cookie banner for non-essential cookies (Google Analytics)
- Data minimization (only collect necessary fields)

**Data Storage:**
- Supabase (AWS US-East-1 region by default)
- Consider migrating to South America region if needed for compliance

---

### **Scalability & Performance**

**Current State:**
- Supabase Free Tier: 500 MB storage, 2 GB bandwidth/month
- Expected load: 2,000 customers, 10,000 reservations/year, 500 orders/month

**Scaling Plan:**
- **Month 1-3:** Free tier sufficient
- **Month 4-6:** Upgrade to Supabase Pro ($25/month) if storage > 500 MB or bandwidth > 2 GB
- **Year 2:** Consider dedicated instance if order volume exceeds 5,000/month

**Performance Optimizations:**
- **Caching:** React Query caches API responses (5-minute stale time for products, 30-second stale time for events)
- **Indexes:** Add indexes on `event_id`, `reservation_date`, `customer_email` for fast queries
- **Pagination:** Limit event listings to 50 per page
- **CDN:** Serve images via Supabase Storage CDN

---

### **Potential Challenges**

#### **Challenge 1: WhatsApp Scalability**

**Problem:** Manual WhatsApp messaging doesn't scale beyond 50 reservations/week

**Solution:**
- Phase 1: Manual (admin sends WhatsApp confirmations)
- Phase 2: Automate with WhatsApp Business API when volume > 100 reservations/week

---

#### **Challenge 2: Merchandise Returns**

**Problem:** Customer buys shirt online, doesn't fit, wants refund/exchange

**Solution:**
- **Return Policy:** 14-day return window for unworn merchandise
- **Process:**
  - Customer contacts Skybox via WhatsApp
  - Brings merchandise back to venue (if pickup) or ships back (if delivered)
  - Admin issues refund via Shopify admin dashboard
- **Exchange:** Offer size exchange for free (no restocking fee)

---

#### **Challenge 3: Low Initial Merchandise Sales**

**Problem:** Expat community is small (~5,000-10,000 people in Medellín), merchandise sales slow to ramp

**Solution:**
- **Start Small:** Order 10-20 units per SKU (low inventory risk)
- **Print-on-Demand:** Use print-on-demand suppliers for some items (Printful, Printify) – no upfront inventory cost
- **Promote In-Venue:** Display merchandise at venue, offer 10% discount for in-person purchases
- **Run Promotions:** "Buy any shirt, get 20,000 COP off your next F&B bill"

---

#### **Challenge 4: Sold-Out Events**

**Problem:** Super Bowl, World Series sell out weeks in advance, disappointed customers

**Solution:**
- **Waitlist Feature:** Allow users to join waitlist, notify via WhatsApp if cancellation
- **Premium Seating:** Reserve 10% of tables for "day-of" walk-ins (first-come, first-served at bar)
- **Communicate Early:** Show capacity status on event page ("80% booked – reserve now!")

---

## 9. Milestones & Sequencing

### **Project Estimate**

**Size:** Medium
**Duration:** 6-8 weeks
**Complexity:** Medium (two main integrations: Shopify + enhanced Supabase)

---

### **Team Composition**

**Core Team:**
1. **Product Manager** (You) – Define requirements, coordinate team, make decisions
2. **Full-Stack Engineer** (1) – React frontend + Supabase backend + Shopify integration
3. **Designer** (0.5 FTE / freelance) – Product page mockups, email templates, QR code design
4. **QA Tester** (0.25 FTE / freelance) – Test reservations, checkout, edge cases
5. **Content/Photographer** (freelance) – Product photography for initial 30 SKUs

**Optional:**
- **Marketing** (You + freelance) – Instagram ads, email campaigns, influencer outreach

---

### **Implementation Phases**

## **Phase 1: Foundation (Weeks 1-2)**

**Goal:** Set up Shopify store, enhance event management, deploy database schema

### **Week 1: Setup & Planning**
- **Shopify Store Setup:**
  - Create Shopify store (free 3-day trial, then $39/month Basic plan)
  - Configure currency (COP), tax settings, shipping zones
  - Set up Shopify Payments (or local payment gateway)
  - Add first 10 products (Skybox-branded t-shirts, hats)
- **Supabase Database:**
  - Deploy new tables (`reservations`, `events`, `customers`, `shopify_orders`)
  - Set up RLS policies
  - Migrate existing event data from static files to database
- **Design:**
  - Mockups for shop page, product detail page, reservation form
  - Email templates (reservation confirmation, order confirmation)

---

### **Week 2: Event Management Enhancements**
- **Enhanced Events Page:**
  - Filter by sport, date range, team
  - Search functionality
  - Featured events section
  - "Follow Team" button (saves to customer profile)
- **Event Detail Page:**
  - Show capacity status ("70% booked")
  - Countdown timer
  - "Reserve Table" CTA button
- **Admin Event Management:**
  - Simple admin page to add/edit events
  - Mark events as featured
  - Update capacity status

---

## **Phase 2: Reservations & Checkout (Weeks 3-4)**

**Goal:** Build reservation system, integrate Shopify checkout

### **Week 3: Reservation System**
- **Reservation Form:**
  - Form fields: name, email, WhatsApp, party size, event selection, special requests
  - Real-time availability check (basic capacity tracking)
  - Submission saves to Supabase
- **Confirmation Flow:**
  - Email confirmation with reservation details
  - Generate QR code (simple UUID-based code)
  - Calendar invite (.ics file)
  - Admin receives notification
- **Admin Reservation Dashboard:**
  - View all reservations (table view, filterable)
  - Mark as confirmed, checked-in, no-show
  - Export to CSV

---

### **Week 4: Shopify Checkout Integration**
- **Shopify Storefront API Integration:**
  - Apollo Client setup (GraphQL)
  - Fetch products, variants, inventory
  - Display products on `/shop` page (grid layout)
- **Product Detail Page:**
  - Image gallery (6 images)
  - Size/color selectors
  - "Add to Cart" button
- **Shopping Cart:**
  - Cart drawer component (slides in from right)
  - Add/remove items, update quantities
  - Persistent cart (localStorage)
- **Checkout Flow:**
  - Create Shopify checkout session
  - Redirect to Shopify-hosted checkout
  - Handle redirect back to order confirmation page
- **Order Confirmation Page:**
  - Display order number, items, total
  - Shipping/pickup details
  - Email confirmation sent automatically by Shopify

---

## **Phase 3: Merchandise & Polish (Weeks 5-6)**

**Goal:** Add more products, optimize UX, test end-to-end

### **Week 5: Merchandise Expansion**
- **Add 20 More Products:**
  - NFL team apparel (10 SKUs: Patriots, Steelers, Cowboys, Packers, Chiefs, etc.)
  - Event-specific merch (World Series, Super Bowl)
  - Skybox-branded hoodies, hats
- **Product Photography:**
  - Hire freelance photographer or use mockup templates
  - 6+ images per product
- **Fulfillment Setup:**
  - Pickup process documented (in-store pickup instructions)
  - Local delivery partner identified (or in-house delivery plan)
  - Shipping integration (Servientrega or similar)
- **Inventory Management:**
  - Initial inventory added to Shopify (10-20 units per SKU)
  - Low-stock alerts configured

---

### **Week 6: UX Polish & Mobile Optimization**
- **Mobile Optimization:**
  - Responsive design audit (test on 5+ devices)
  - Sticky "Reserve" / "Add to Cart" buttons on mobile
  - Touch-friendly UI (44px button minimum)
- **Performance:**
  - Lazy load images
  - Code splitting (React.lazy)
  - Lighthouse audit (target > 90)
- **WhatsApp Integration:**
  - Add prominent WhatsApp CTAs throughout site
  - Link WhatsApp number (+57 304 786 2834)
  - Optional: Set up WhatsApp Business API (if time permits)
- **Email Templates:**
  - Design professional email templates (reservation confirmation, order confirmation)
  - Test email delivery (Gmail, Outlook)

---

## **Phase 4: Testing & Launch (Weeks 7-8)**

**Goal:** QA, bug fixes, soft launch, public launch

### **Week 7: Testing & Bug Fixes**
- **End-to-End Testing:**
  - Reservation flow (submit, confirm, check-in)
  - Merchandise checkout (browse, cart, checkout, confirmation)
  - Admin workflows (manage reservations, orders)
- **Edge Case Testing:**
  - Sold-out events (waitlist feature)
  - Out-of-stock products (notify me)
  - Payment failures (Shopify handles, but test)
  - Mobile browsers (iOS Safari, Chrome Android)
- **Accessibility:**
  - Keyboard navigation
  - Screen reader testing
  - Color contrast
- **Bug Fixes:**
  - Prioritize critical bugs (blockers)
  - Document known issues for post-launch

---

### **Week 8: Launch**
- **Soft Launch (Friends & Family):**
  - Invite 20-30 regular customers to test platform
  - Offer 20% discount code for early adopters
  - Collect feedback via survey
  - Monitor for bugs, fix critical issues
- **Production Deployment:**
  - Deploy to production (Lovable hosting)
  - Switch Shopify to live mode (enable real payments)
  - Configure monitoring (Sentry or Supabase Logs)
  - Set up Google Analytics
- **Public Launch:**
  - Announce on Skybox Instagram (1-2 posts)
  - Email blast to existing customer list (if available)
  - Update Google Business Profile
  - Paid ads: Instagram/Facebook ads targeting expats in Medellín
  - Word-of-mouth: Ask regulars to share with expat WhatsApp groups

---

## **Phase 5: Post-Launch (Ongoing)**

**Goal:** Monitor, optimize, grow

### **Month 1-2:**
- **Monitor Metrics:**
  - Merchandise sales (daily/weekly)
  - Reservation conversion rate
  - Customer feedback (surveys, reviews)
- **Optimize:**
  - A/B test product page layouts
  - Adjust pricing based on demand
  - Add best-selling products, remove slow movers
- **Marketing:**
  - Instagram ads (target US/Canada expats in Medellín)
  - Partner with expat influencers
  - Google Ads ("sports bar Medellín", "where to watch NFL Medellín")

### **Month 3-6:**
- **Expand Catalog:**
  - Add 50+ more products (NBA, MLB, NHL gear)
  - Seasonal merchandise (Super Bowl, World Series, March Madness)
- **Loyalty Program (Simple):**
  - "Attended 10 games? Get a free Skybox shirt"
  - Track manually via admin dashboard initially
- **WhatsApp Automation:**
  - Implement WhatsApp Business API if reservation volume > 100/week

---

## 10. Risks & Mitigation

### **Risk 1: Low Merchandise Sales**

**Impact:** High
**Likelihood:** Medium
**Description:** Expat community is small, merchandise sales slower than projected

**Mitigation:**
- Start with small inventory (10-20 units per SKU)
- Use print-on-demand for some items (no upfront cost)
- Promote heavily in-venue (display samples, offer discounts)
- Run promotions ("Buy shirt, get 20,000 COP off F&B")
- Expand target market (ship to Bogotá, Cali)

---

### **Risk 2: Reservation No-Shows**

**Impact:** Medium
**Likelihood:** Medium
**Description:** Customers reserve tables but don't show up, lost revenue

**Mitigation:**
- Send WhatsApp reminder 24 hours before event
- Require credit card hold for high-demand events (Super Bowl) – charge 50,000 COP if no-show
- Track no-show rate per customer, blacklist repeat offenders
- Overbook slightly (110% capacity) to account for no-shows

---

### **Risk 3: Shopify API Downtime**

**Impact:** Medium
**Likelihood:** Low
**Description:** Shopify API outage, customers can't checkout

**Mitigation:**
- Show cached product data (React Query stale data)
- Display message: "Checkout temporarily unavailable, please try again in a few minutes"
- Enable "Contact on WhatsApp" as backup (manual order processing)
- Monitor Shopify status page

---

### **Risk 4: Overwhelmed by Reservations**

**Impact:** Low
**Likelihood:** Low
**Description:** Too many reservations, admin can't keep up

**Mitigation:**
- Automated email confirmations reduce admin workload
- Hire part-time reservation manager if volume > 200/week
- Implement calendar sync (admin sees all reservations in Google Calendar)

---

### **Risk 5: Merchandise Returns/Exchanges**

**Impact:** Low
**Likelihood:** Medium
**Description:** Customers unhappy with fit, want refunds

**Mitigation:**
- Clear size charts on product pages
- "Try before you buy" – customers can try on at venue before purchasing
- Generous exchange policy (swap sizes for free)
- Accept returns within 14 days (unworn, tags attached)

---

## 11. Testing & QA

### **Testing Strategy**

#### **Manual Testing (Primary)**
- **Reservation Flow:**
  - Submit reservation → Verify email/WhatsApp confirmation
  - Admin dashboard → Verify reservation appears
  - QR code check-in → Verify staff can scan and check in
- **Merchandise Flow:**
  - Browse shop → Add to cart → Checkout → Pay → Confirm
  - Verify email confirmation from Shopify
  - Admin dashboard → Verify order appears
  - Pickup flow → Verify staff can fulfill order

#### **Automated Testing (Secondary)**
- **Unit Tests:** Cart logic, form validation
- **Integration Tests (Cypress):**
  - End-to-end checkout flow
  - Reservation submission flow
- **Performance Tests:**
  - Lighthouse audit (target > 90)
  - Load test (simulate 100 concurrent users)

---

### **QA Checklist (Pre-Launch)**

#### **Functional**
- [ ] Events page loads with correct data
- [ ] Filters work (sport, date, team)
- [ ] Reservation form submits successfully
- [ ] Email confirmation sent within 10 seconds
- [ ] WhatsApp message sent (manual verification)
- [ ] QR code generated correctly
- [ ] Shop page loads with 30+ products
- [ ] Product filters work (sport, size, price)
- [ ] Add to cart works
- [ ] Checkout redirects to Shopify
- [ ] Payment processes successfully (test card)
- [ ] Order confirmation page displays correctly
- [ ] Admin dashboard shows reservations and orders

#### **Cross-Browser**
- [ ] Chrome (desktop + mobile)
- [ ] Safari (iOS)
- [ ] Firefox
- [ ] Edge

#### **Mobile**
- [ ] All pages responsive (320px+)
- [ ] Touch-friendly buttons
- [ ] Forms work on mobile

#### **Performance**
- [ ] Page load < 2 seconds
- [ ] Lighthouse score > 90
- [ ] No console errors

---

## 12. Conclusion

This PRD defines a focused, achievable roadmap to enhance Skybox Sports Bar's digital presence with two core goals:

1. **Improve Event Management** – Make it effortless for expats to discover games and reserve tables
2. **Launch Merchandise Sales** – Provide authentic sports gear unavailable elsewhere in Medellín

**Expected Outcomes:**
- **85%+ venue occupancy** during prime events (up from 60-70%)
- **50,000,000 COP/month** ($12,500 USD) in merchandise revenue by Month 6
- **30% increase in F&B revenue** through better event promotion
- **2,000+ customer database** for targeted marketing
- **60% reduction in reservation management time**

**Key Success Factors:**
- Seamless Shopify + Supabase integration
- WhatsApp as primary customer communication channel
- Pickup-first merchandise fulfillment (drives venue traffic)
- Mobile-first UX (70% of users are mobile)
- Quality products and reliable service

**Next Steps:**
1. Approve PRD
2. Set up Shopify store (Week 1)
3. Deploy Supabase database schema (Week 1)
4. Begin frontend development (Week 2)
5. Launch in 6-8 weeks

Let's make Skybox the #1 sports destination for expats in Medellín. 🏈⚾🏀

---

**Document Metadata:**
- **Author:** Product Manager (Claude)
- **Version:** 2.0 (Core Focus)
- **Date:** January 2025
- **Status:** Ready for Review
- **Location:** Skybox Sports Bar, Laureles, Medellín, Colombia
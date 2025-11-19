# Halloween Party Event Details Page - UI/UX Design Specification

**Event:** Medellín Halloween Party – Skybox Rooftop
**Date:** October 31, 2025
**Design System:** Skybox GameHub (MLB Blue + Amber Gold)
**Version:** 1.0
**Last Updated:** 2025-10-23

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Layout & Wireframes](#layout--wireframes)
3. [User Journey Flowchart](#user-journey-flowchart)
4. [Page Sections & Components](#page-sections--components)
5. [Interactions & Features](#interactions--features)
6. [Responsive Behavior](#responsive-behavior)
7. [Image Usage & Assets](#image-usage--assets)
8. [Component Specifications](#component-specifications)
9. [Implementation Checklist](#implementation-checklist)

---

## Executive Summary

The Halloween Party Event Details page is a comprehensive, conversion-optimized landing page that follows Skybox's established design system while incorporating Halloween-specific theming. The page leverages existing components from the EventDetail.tsx template while adding enhanced features:

- **Countdown timer** to event start
- **Sticky reserve button** on mobile
- **Animated hero** with Halloween atmosphere
- **Interactive costume contest** section
- **WhatsApp table package ordering** modal
- **FAQ accordion** for common questions
- **Enhanced gallery carousel** with lightbox

**Key Design Principles:**
- Maintain Skybox brand consistency (colors, typography, spacing)
- Optimize for conversion (multiple CTAs, clear value proposition)
- Ensure accessibility (WCAG AA compliance, semantic HTML)
- Mobile-first responsive design
- Performance-optimized (lazy loading, compressed images)

---

## Layout & Wireframes

### Desktop Layout (1024px+)

```
┌────────────────────────────────────────────────────────────────┐
│                         HEADER (Global)                         │
│                     Sticky navigation bar                       │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                        HERO BANNER                              │
│  Full-width Halloween-themed background (70vh height)          │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Dark gradient overlay (black/80 → black/40)             │  │
│  │                                                          │  │
│  │  🎃 SPECIAL EVENT [badge]                               │  │
│  │                                                          │  │
│  │  Medellín Halloween Party                               │  │
│  │  Skybox Rooftop Bash                                    │  │
│  │                                                          │  │
│  │  📅 Oct 31, 2025  🕐 8 PM (Doors 6 PM)  📍 Skybox      │  │
│  │                                                          │  │
│  │  ⏱️ COUNTDOWN TIMER: 15d 6h 23m 45s                     │  │
│  │                                                          │  │
│  │  [Reserve Your Spot]  [Order Table Package]             │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                    MAIN CONTENT AREA                            │
│                                                                 │
│  ┌─────────────────────────────┬──────────────────────────┐    │
│  │  LEFT COLUMN (66%)          │  RIGHT COLUMN (33%)      │    │
│  │                             │  ┌────────────────────┐  │    │
│  │  ┌───────────────────────┐  │  │ EVENT DETAILS CARD │  │    │
│  │  │ ABOUT THIS EVENT      │  │  │ (Sticky)           │  │    │
│  │  │ Full description      │  │  │                    │  │    │
│  │  └───────────────────────┘  │  │ 📅 Date            │  │    │
│  │                             │  │ 🕐 Time            │  │    │
│  │  ┌───────────────────────┐  │  │ 📍 Location        │  │    │
│  │  │ WHAT TO EXPECT        │  │  │                    │  │    │
│  │  │ [Grid: 2 columns]     │  │  │ [Reserve Now]      │  │    │
│  │  │ ✓ Live DJ             │  │  │ [WhatsApp]         │  │    │
│  │  │ ✓ Costume Contest     │  │  │ [Add to Calendar]  │  │    │
│  │  └───────────────────────┘  │  └────────────────────┘  │    │
│  │                             │                          │    │
│  │  ┌───────────────────────┐  │                          │    │
│  │  │ 🏆 PRIZES             │  │                          │    │
│  │  │ [Grid: 2 columns]     │  │                          │    │
│  │  │ Best Overall: 500K    │  │                          │    │
│  │  │ Scariest: 300K        │  │                          │    │
│  │  └───────────────────────┘  │                          │    │
│  │                             │                          │    │
│  │  ┌───────────────────────┐  │                          │    │
│  │  │ 🍹 DRINK & FOOD       │  │                          │    │
│  │  │    SPECIALS           │  │                          │    │
│  │  │ [Grid: 2 columns]     │  │                          │    │
│  │  │ - Witch's Brew        │  │                          │    │
│  │  │ - Devil's Wings       │  │                          │    │
│  │  └───────────────────────┘  │                          │    │
│  │                             │                          │    │
│  │  ┌───────────────────────┐  │                          │    │
│  │  │ ❓ FAQ                │  │                          │    │
│  │  │ [Accordion]           │  │                          │    │
│  │  │ > What to wear?       │  │                          │    │
│  │  │ > Costume rules?      │  │                          │    │
│  │  └───────────────────────┘  │                          │    │
│  │                             │                          │    │
│  │  ┌───────────────────────┐  │                          │    │
│  │  │ 📸 GALLERY            │  │                          │    │
│  │  │ [3-column grid]       │  │                          │    │
│  │  │ Past Halloween events │  │                          │    │
│  │  └───────────────────────┘  │                          │    │
│  │                             │                          │    │
│  └─────────────────────────────┴──────────────────────────┘    │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                    FINAL CTA SECTION                            │
│  Full-width gradient (primary → accent)                        │
│                                                                 │
│  Ready to Join Medellín's Best Halloween Party?                │
│  Reserve your table now and secure your spot!                  │
│                                                                 │
│  [Reserve Your Spot]  [Chat on WhatsApp]                       │
└────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────┐
│                       FOOTER (Global)                           │
└────────────────────────────────────────────────────────────────┘
```

### Tablet Layout (768px - 1023px)

```
┌──────────────────────────────────┐
│         HERO BANNER              │
│         (60vh height)            │
│  Title + Countdown + CTAs        │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    EVENT DETAILS CARD            │
│    (No longer sticky)            │
│    Date/Time/Location + CTAs     │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    ABOUT THIS EVENT              │
│    (Single column)               │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    WHAT TO EXPECT                │
│    [Grid: 2 columns still]       │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    PRIZES                        │
│    [Grid: 2 columns]             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    SPECIALS                      │
│    [Grid: 2 columns]             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    FAQ (Accordion)               │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    GALLERY                       │
│    [Grid: 2 columns]             │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    FINAL CTA                     │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│    FOOTER                        │
└──────────────────────────────────┘
```

### Mobile Layout (< 768px)

```
┌─────────────────────┐
│    HERO BANNER      │
│    (50vh height)    │
│    Badge            │
│    Title (smaller)  │
│    Countdown        │
│    CTAs (stacked)   │
└─────────────────────┘

┌─────────────────────┐
│  STICKY RESERVE BTN │ ← Appears on scroll
│  [Reserve Now]      │
└─────────────────────┘

┌─────────────────────┐
│  EVENT DETAILS CARD │
│  Date/Time/Location │
│  [Reserve]          │
│  [WhatsApp]         │
└─────────────────────┘

┌─────────────────────┐
│  ABOUT EVENT        │
└─────────────────────┘

┌─────────────────────┐
│  WHAT TO EXPECT     │
│  [1 column grid]    │
└─────────────────────┘

┌─────────────────────┐
│  PRIZES             │
│  [1 column grid]    │
└─────────────────────┘

┌─────────────────────┐
│  SPECIALS           │
│  [1 column grid]    │
└─────────────────────┘

┌─────────────────────┐
│  FAQ                │
└─────────────────────┘

┌─────────────────────┐
│  GALLERY            │
│  [2 columns]        │
└─────────────────────┘

┌─────────────────────┐
│  FINAL CTA          │
└─────────────────────┘

┌─────────────────────┐
│  FOOTER             │
└─────────────────────┘
```

---

## User Journey Flowchart

```
USER ENTRY POINTS:
├─ Events page → clicks "Halloween Party" EventCard
├─ Home page → clicks Halloween promo banner
├─ Direct URL share (social media, WhatsApp)
└─ Social media ad → lands on event page

                        ↓

┌────────────────────────────────────────────────┐
│  LANDS ON EVENT DETAILS PAGE                   │
│  - Hero banner with Halloween imagery          │
│  - Sees countdown timer (urgency)              │
│  - Event info immediately visible              │
└────────────────────────────────────────────────┘
                        ↓
                   [User scrolls]
                        ↓
┌────────────────────────────────────────────────┐
│  DISCOVERS VALUE PROPOSITION                   │
│  - Reads "What to Expect" highlights           │
│  - Sees prize amounts (COP 500K grand prize)   │
│  - Reviews drink/food specials with prices     │
│  - Views gallery of past events                │
└────────────────────────────────────────────────┘
                        ↓
              [Decision Point]
                        ↓
        ┌───────────────┴───────────────┐
        ↓                               ↓
   [Has questions]              [Ready to reserve]
        ↓                               ↓
┌─────────────────┐          ┌─────────────────────┐
│  CHECKS FAQ     │          │  CLICKS CTA BUTTON  │
│  - Accordion    │          │  - Reserve Your Spot│
│  - Finds answer │          │  - Order Table      │
└─────────────────┘          │  - WhatsApp         │
        ↓                    └─────────────────────┘
        └──────────┬──────────────────┘
                   ↓
        ┌──────────────────────┐
        │  CONVERSION ACTION   │
        └──────────────────────┘
                   ↓
        ┌──────────┴──────────┐
        ↓                     ↓
┌──────────────────┐   ┌─────────────────────┐
│  RESERVE BUTTON  │   │  WHATSAPP ORDER     │
│  → /reserve page │   │  → Opens WhatsApp   │
│  - Fill form     │   │  - Pre-filled msg   │
│  - Select table  │   │  - "Table for 6"    │
│  - Submit        │   │  - Agent responds   │
└──────────────────┘   └─────────────────────┘
        ↓                     ↓
┌──────────────────┐   ┌─────────────────────┐
│  CONFIRMATION    │   │  CHAT CONFIRMATION  │
│  - Success msg   │   │  - Booking details  │
│  - Email sent    │   │  - Payment link     │
│  - Calendar add  │   │  - Confirmation #   │
└──────────────────┘   └─────────────────────┘
        ↓                     ↓
        └──────────┬──────────┘
                   ↓
┌────────────────────────────────────────────────┐
│  POST-CONVERSION                               │
│  - Add to calendar reminder                    │
│  - Share event with friends (social share)     │
│  - Receive reminder emails (week, day before)  │
└────────────────────────────────────────────────┘
```

**Conversion Optimization Points:**
1. **Urgency:** Countdown timer creates FOMO
2. **Social Proof:** Gallery shows past events were packed
3. **Value Clarity:** Prize amounts prominently displayed
4. **Friction Reduction:** WhatsApp provides instant booking
5. **Multiple CTAs:** Hero, sidebar, FAQ, final CTA section
6. **Mobile Sticky CTA:** Always visible on scroll

---

## Page Sections & Components

### 1. Hero Banner (HeroBannerEvent)

**Purpose:** Capture attention, communicate event essence, drive immediate action

**Visual Design:**
- **Background:** Full-width Halloween-themed rooftop party image
  - Orange/purple atmospheric lighting
  - Costume-wearing crowd visible
  - Skybox rooftop recognizable
- **Overlay:** Dark gradient (`from-black/80 via-black/60 to-black/40`)
- **Height:** 70vh (desktop), 60vh (tablet), 50vh (mobile)

**Content Elements:**
```tsx
<div className="relative h-[70vh] flex items-center justify-center">
  <img src={halloweenHeroImage} /> {/* Full background */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

  <div className="relative z-10 container px-4 text-center text-white">
    {/* Badge */}
    <div className="inline-block bg-accent/90 backdrop-blur-sm px-4 py-2 rounded-full">
      <span className="text-sm font-bold uppercase">🎃 Special Event</span>
    </div>

    {/* Title */}
    <h1 className="text-5xl md:text-7xl font-bold mb-2">
      Medellín Halloween Party
    </h1>
    <p className="text-2xl md:text-3xl mb-6 text-white/90">
      Skybox Rooftop Bash
    </p>

    {/* Event Meta */}
    <div className="flex flex-wrap gap-6 justify-center text-lg mb-6">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5" />
        <span>October 31, 2025</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        <span>8 PM (Doors at 6 PM)</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        <span>Skybox Medellín, Laureles Rooftop</span>
      </div>
    </div>

    {/* Countdown Timer */}
    <div className="countdown-scoreboard max-w-2xl mx-auto mb-8">
      <div className="flex justify-center gap-4">
        <div className="countdown-digit">
          <span className="countdown-value">15</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">06</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">23</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">45</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>

    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" className="gradient-primary hover-lift glow-on-hover ripple">
        Reserve Your Spot
      </Button>
      <Button size="lg" variant="secondary">
        Order Table Package
      </Button>
      <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0">
        Chat on WhatsApp
      </Button>
    </div>
  </div>
</div>
```

**Interactions:**
- ✨ Subtle parallax effect on scroll (background moves slower than content)
- ⏱️ Live countdown timer updates every second
- 🎬 Optional: 10-second looping video of Halloween party atmosphere (muted, autoplay)

**Accessibility:**
- Background image has dark overlay ensuring text contrast ratio > 7:1
- Countdown has ARIA live region for screen readers
- All CTAs have focus states

---

### 2. Event Info Card (About This Event)

**Purpose:** Provide comprehensive event description

**Layout:**
```tsx
<div className="space-y-4">
  <h2 className="text-3xl font-bold">About This Event</h2>
  <p className="text-lg text-muted-foreground leading-relaxed">
    Get ready for Medellín's most epic Halloween celebration!
    Skybox transforms into a haunted rooftop paradise with spine-tingling
    decorations, killer DJ sets, costume contests, and drink specials
    that will make you scream with joy. Don't miss the scariest party
    of the year!
  </p>
  <p className="text-lg text-muted-foreground leading-relaxed">
    This isn't just another Halloween party—it's THE Halloween destination
    in Medellín. With stunning city views, world-class DJs, COP 1.4 million
    in costume contest prizes, and our legendary rooftop atmosphere, this
    is where memories are made.
  </p>
</div>
```

**Design Tokens:**
- Font: Inter (body text)
- Size: `text-lg` (18px)
- Color: `text-muted-foreground` (hsl(0 0% 27%))
- Line height: `leading-relaxed` (1.625)

---

### 3. What to Expect Section

**Purpose:** Highlight key event features with visual checkmarks

**Layout:** 2-column grid (desktop/tablet), 1-column (mobile)

```tsx
<div className="space-y-4">
  <h2 className="text-3xl font-bold">What to Expect</h2>
  <div className="grid md:grid-cols-2 gap-4">
    {highlights.map((highlight, i) => (
      <Card key={i} className="hover-lift">
        <CardContent className="p-6">
          <p className="flex gap-3 items-start">
            <span className="text-accent font-bold text-xl">✓</span>
            <span className="text-lg">{highlight}</span>
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
```

**Highlights:**
- Live DJ spinning all night long
- Best costume contest with cash prizes
- Halloween-themed cocktails & shots
- Photo booth with spooky props
- Rooftop dance floor with city views
- Themed food menu
- Horror movie screening area
- Surprise giveaways throughout the night

**Visual Treatment:**
- Cards have `.hover-lift` effect
- Checkmark in `text-accent` (amber gold)
- Subtle border and shadow

---

### 4. Prizes Section (Costume Contest)

**Purpose:** Create excitement with specific prize amounts

**Layout:** 2-column grid with prize cards

```tsx
<div className="space-y-6">
  <div className="flex items-center gap-3">
    <Gift className="w-8 h-8 text-accent" />
    <h2 className="text-3xl font-bold">Costume Contest Prizes</h2>
  </div>

  <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-6 mb-6">
    <p className="text-xl font-bold text-center">
      🏆 COP 1,400,000 in Total Prizes! 🏆
    </p>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    {prizes.map((prize, i) => (
      <Card key={i} className="hover-lift glow-on-hover border-2 border-primary/20">
        <CardContent className="p-6 space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-primary flex-1">
              {prize.title}
            </h3>
            <span className="text-3xl">
              {i === 0 ? '👑' : i === 1 ? '💀' : i === 2 ? '😂' : '👥'}
            </span>
          </div>
          <p className="text-muted-foreground">{prize.description}</p>
          <div className="pt-2">
            <span className="inline-block bg-gradient-primary text-white px-4 py-2 rounded-lg font-bold">
              {prize.amount}
            </span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

  <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-accent">
    <p className="text-sm">
      <strong>Contest Rules:</strong> Judging at 10 PM. Winners announced at 11 PM.
      Must be present to win. Costumes must be appropriate for a public venue.
    </p>
  </div>
</div>
```

**Prize Data:**
```tsx
prizes: [
  {
    title: "Best Overall Costume",
    amount: "COP 500,000",
    description: "Most creative, detailed, and impressive costume",
    emoji: "👑"
  },
  {
    title: "Best Group Costume",
    amount: "COP 400,000",
    description: "Coordinated group of 3 or more people",
    emoji: "👥"
  },
  {
    title: "Scariest Costume",
    amount: "COP 300,000",
    description: "The costume that gives us nightmares",
    emoji: "💀"
  },
  {
    title: "Funniest Costume",
    amount: "COP 200,000",
    description: "Make us laugh and win cash",
    emoji: "😂"
  }
]
```

**Visual Enhancements:**
- Prize amounts in gradient badges
- Cards have subtle glow on hover
- Emojis add personality
- Total prize callout in highlighted box

---

### 5. Food & Drink Specials Grid

**Purpose:** Showcase themed menu items with pricing

**Layout:** 2-column grid with hover animations

```tsx
<div className="space-y-6">
  <div className="flex items-center gap-3">
    <Utensils className="w-8 h-8 text-accent" />
    <h2 className="text-3xl font-bold">Halloween Specials</h2>
  </div>

  <div className="grid md:grid-cols-2 gap-6">
    {specials.map((special, i) => (
      <Card key={i} className="hover-scale group overflow-hidden">
        {special.image && (
          <div className="relative h-48 overflow-hidden">
            <img
              src={special.image}
              alt={special.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="bg-accent text-white px-3 py-1 rounded-full font-bold text-sm">
                {special.category}
              </span>
            </div>
          </div>
        )}
        <CardContent className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl">{special.name}</h3>
            {special.price && (
              <span className="text-accent font-bold text-lg">{special.price}</span>
            )}
          </div>
          <p className="text-muted-foreground">{special.description}</p>
          {special.alcoholContent && (
            <p className="text-xs text-muted-foreground italic">
              {special.alcoholContent}
            </p>
          )}
        </CardContent>
      </Card>
    ))}
  </div>

  <div className="text-center pt-4">
    <Button size="lg" variant="outline" className="hover-lift">
      <ChefHat className="w-5 h-5 mr-2" />
      View Full Halloween Menu
    </Button>
  </div>
</div>
```

**Specials Data (Enhanced):**
```tsx
specials: [
  {
    name: "Bloody Mary (Literally)",
    description: "Vodka, tomato juice, spices, with vampire fang garnish",
    price: "COP 22,000",
    category: "Cocktail",
    image: bloodyMaryImage,
    alcoholContent: "ABV 12%"
  },
  {
    name: "Witch's Brew",
    description: "Mysterious green cocktail that glows in the dark",
    price: "COP 25,000",
    category: "Cocktail",
    image: witchsBrewImage,
    alcoholContent: "ABV 15%"
  },
  {
    name: "Zombie Shot",
    description: "Brain-melting shot combination",
    price: "COP 12,000",
    category: "Shot",
    alcoholContent: "ABV 40%"
  },
  {
    name: "Devil's Wings",
    description: "Spicy buffalo wings with hellfire sauce",
    price: "COP 35,000",
    category: "Food",
    image: devilWingsImage
  },
  {
    name: "Monster Burger",
    description: "Triple-decker burger with all the toppings",
    price: "COP 48,000",
    category: "Food",
    image: monsterBurgerImage
  },
  {
    name: "Pumpkin Spice Delight",
    description: "Seasonal dessert cocktail",
    price: "COP 24,000",
    category: "Dessert",
    alcoholContent: "ABV 8%"
  }
]
```

**Interactions:**
- Cards scale up on hover (`.hover-scale`)
- Images zoom in on hover
- Category badges in top-right corner
- Optional: Click card to open detailed menu modal

---

### 6. FAQ Accordion

**Purpose:** Address common questions, reduce friction

**Layout:** Accordion component from shadcn/ui

```tsx
<div className="space-y-6">
  <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>

  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="dress-code">
      <AccordionTrigger className="text-lg font-semibold">
        What's the dress code?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Costumes are highly encouraged! We're giving away COP 1.4 million in prizes
        for the best costumes. If you don't wear a costume, smart casual attire is fine.
        No athletic wear or flip-flops please.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="costume-rules">
      <AccordionTrigger className="text-lg font-semibold">
        Are there costume restrictions?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Costumes must be appropriate for a public venue. No offensive, overly revealing,
        or dangerous costumes (real weapons, large props that block walkways). Our staff
        reserves the right to ask you to modify or remove inappropriate costumes.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="age">
      <AccordionTrigger className="text-lg font-semibold">
        What's the age requirement?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        This is an 18+ event. Valid ID required for entry. We strictly enforce age limits.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="table">
      <AccordionTrigger className="text-lg font-semibold">
        Do I need to reserve a table?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Table reservations are recommended but not required. General admission tickets
        give you access to the event, standing room, and bar. Table packages include
        reserved seating for your group plus bottle service options.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="payment">
      <AccordionTrigger className="text-lg font-semibold">
        What payment methods do you accept?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        We accept cash (COP), credit/debit cards (Visa, Mastercard), and mobile payments
        (Nequi, Daviplata). Table packages can be pre-paid via bank transfer or WhatsApp.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="time">
      <AccordionTrigger className="text-lg font-semibold">
        What time should I arrive?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Doors open at 6 PM. We recommend arriving between 7-8 PM to secure a good spot.
        The DJ starts at 8 PM, and costume judging is at 10 PM. Event goes until 2 AM.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="parking">
      <AccordionTrigger className="text-lg font-semibold">
        Is there parking available?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Yes, we have a parking lot with limited spaces (COP 15,000). Street parking is
        also available nearby. We recommend using Uber/taxi if drinking.
      </AccordionContent>
    </AccordionItem>

    <AccordionItem value="refund">
      <AccordionTrigger className="text-lg font-semibold">
        What's your cancellation policy?
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground">
        Table reservations can be cancelled up to 48 hours before the event for a full
        refund. Cancellations within 48 hours receive a 50% refund. No refunds on the
        day of the event. General admission tickets are non-refundable.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</div>
```

**Accessibility:**
- Keyboard navigable (arrow keys)
- Screen reader friendly (ARIA labels)
- Focus states visible
- Semantic HTML (`<details>` under the hood)

---

### 7. Gallery Section

**Purpose:** Show past Halloween events, build social proof

**Layout:** Reuse existing `GalleryGrid` component with lightbox

```tsx
<div className="space-y-6">
  <h2 className="text-3xl font-bold">Previous Halloween Parties</h2>
  <p className="text-muted-foreground">
    See what you missed! Here's a glimpse of our legendary Halloween parties from past years.
  </p>
  <GalleryGrid images={galleryImages} />
</div>
```

**Gallery Images (8 images):**
```tsx
galleryImages: [
  { src: halloween2023_1, alt: "Costume contest winners 2023" },
  { src: halloween2023_2, alt: "Packed rooftop dance floor" },
  { src: halloween2023_3, alt: "Spooky decorations and lighting" },
  { src: halloween2023_4, alt: "DJ booth with Halloween theme" },
  { src: halloween2022_1, alt: "Group costumes 2022" },
  { src: halloween2022_2, alt: "Photo booth moments" },
  { src: halloween2022_3, alt: "Themed cocktails" },
  { src: halloween2022_4, alt: "Rooftop city views at night" }
]
```

**Features:**
- 3-column grid (desktop), 2-column (tablet/mobile)
- Lightbox on click (existing GalleryGrid functionality)
- Hover zoom effect
- Lazy loading for performance

---

### 8. Event Details Sidebar (Sticky)

**Purpose:** Keep event info and CTAs always visible (desktop)

**Layout:** Sticky card in right column (desktop only)

```tsx
<Card className="sticky top-24">
  <CardContent className="p-8 space-y-6">
    <h3 className="text-2xl font-bold">Event Details</h3>

    <div className="space-y-4">
      <div className="flex gap-3">
        <Calendar className="w-5 h-5 text-accent flex-shrink-0" />
        <div>
          <p className="font-semibold">Date</p>
          <p className="text-muted-foreground">October 31, 2025</p>
          <p className="text-sm text-muted-foreground">Thursday (Halloween!)</p>
        </div>
      </div>

      <div className="flex gap-3">
        <Clock className="w-5 h-5 text-accent flex-shrink-0" />
        <div>
          <p className="font-semibold">Time</p>
          <p className="text-muted-foreground">8:00 PM - 2:00 AM</p>
          <p className="text-sm text-muted-foreground">Doors open at 6 PM</p>
        </div>
      </div>

      <div className="flex gap-3">
        <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
        <div>
          <p className="font-semibold">Location</p>
          <p className="text-muted-foreground">Skybox Medellín</p>
          <p className="text-sm text-muted-foreground">Laureles Rooftop</p>
          <a
            href="https://maps.google.com/?q=Skybox+Medellin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:underline"
          >
            Get Directions →
          </a>
        </div>
      </div>

      <div className="flex gap-3">
        <Users className="w-5 h-5 text-accent flex-shrink-0" />
        <div>
          <p className="font-semibold">Capacity</p>
          <p className="text-muted-foreground">Limited to 300 guests</p>
          <p className="text-sm text-accent font-semibold">🔥 Selling Fast!</p>
        </div>
      </div>
    </div>

    <div className="border-t pt-6 space-y-3">
      <Button
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 ripple"
        asChild
      >
        <Link to="/reserve">Reserve Your Table</Link>
      </Button>

      <Button
        size="lg"
        variant="outline"
        className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white border-0"
        asChild
      >
        <a href="https://wa.me/573047862834?text=I%27d%20like%20to%20book%20a%20table%20for%20Halloween%20Party%20Oct%2031">
          Order via WhatsApp
        </a>
      </Button>

      <Button
        size="lg"
        variant="ghost"
        className="w-full"
        onClick={() => {
          // Add to calendar functionality
          const event = {
            title: "Medellín Halloween Party - Skybox",
            start: "2025-10-31T20:00:00",
            end: "2025-11-01T02:00:00",
            location: "Skybox Medellín, Laureles Rooftop",
            description: "Costume contest, DJ, drink specials, rooftop party"
          };
          // Google Calendar link
          const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '')}/${event.end.replace(/[-:]/g, '')}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;
          window.open(gcalUrl, '_blank');
        }}
      >
        <CalendarPlus className="w-5 h-5 mr-2" />
        Add to Calendar
      </Button>
    </div>

    <div className="border-t pt-6">
      <p className="text-sm text-muted-foreground mb-2">Share with friends:</p>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" className="flex-1">
          <Share2 className="w-4 h-4 mr-1" />
          Share
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Instagram className="w-4 h-4 mr-1" />
          Post
        </Button>
      </div>
    </div>
  </CardContent>
</Card>
```

**Features:**
- Sticky positioning (`top-24` to account for header)
- "Get Directions" link opens Google Maps
- "Add to Calendar" generates Google Calendar link
- Social sharing buttons
- Urgency messaging ("Selling Fast!")

---

### 9. Final CTA Section

**Purpose:** Last chance to convert before footer

**Layout:** Full-width gradient section

```tsx
<section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-primary text-white">
  <div className="container px-4 text-center">
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-4xl md:text-5xl font-bold animate-fade-in">
        Ready to Join Medellín's Best Halloween Party?
      </h2>
      <p className="text-xl md:text-2xl animate-fade-in">
        COP 1.4 million in prizes • Live DJ • Themed Cocktails • Rooftop Views
      </p>
      <p className="text-lg animate-fade-in">
        Limited capacity. Don't miss out on the scariest party of the year!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
        <Button
          size="lg"
          variant="secondary"
          className="text-lg px-8 hover-lift ripple"
          asChild
        >
          <Link to="/reserve">Reserve Your Spot Now</Link>
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="bg-white/10 hover:bg-white/20 text-white border-white text-lg px-8 ripple"
          asChild
        >
          <a href="https://wa.me/573047862834">Chat on WhatsApp</a>
        </Button>
      </div>

      <p className="text-sm text-white/80 pt-4">
        Questions? Call us at +57 300 123 4567 or send us a message
      </p>
    </div>
  </div>
</section>
```

**Visual Design:**
- Gradient background (primary to accent)
- White text for maximum contrast
- Multiple value propositions
- Urgency messaging
- Contact info for last-minute questions

---

## Interactions & Features

### 1. Countdown Timer

**Functionality:** Live countdown to event start (Oct 31, 2025 8:00 PM)

**Implementation:**
```tsx
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return (
    <div className="countdown-scoreboard" role="timer" aria-live="polite">
      <div className="flex justify-center gap-3 md:gap-6">
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};
```

**Styling:** Uses existing `.countdown-scoreboard` utilities from `index.css`

---

### 2. Sticky Reserve Button (Mobile)

**Functionality:** Appears on scroll, always accessible on mobile

**Implementation:**
```tsx
const [showStickyButton, setShowStickyButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    // Show sticky button after scrolling past hero
    setShowStickyButton(window.scrollY > 600);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
  <>
    {/* Mobile sticky button */}
    {showStickyButton && (
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-sm border-t md:hidden animate-slide-in-up">
        <Button
          size="lg"
          className="w-full gradient-primary hover-lift ripple"
          asChild
        >
          <Link to="/reserve">Reserve Your Spot</Link>
        </Button>
      </div>
    )}
  </>
);
```

**Behavior:**
- Only visible on mobile (`md:hidden`)
- Slides up from bottom when user scrolls past hero
- Backdrop blur for readability
- Does not block content (fixed positioning)

---

### 3. Hover Animations

**Card Hover Effects:**
```css
/* Already defined in index.css */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-elegant);
}

.hover-scale:hover {
  transform: scale(1.05);
}

.glow-on-hover:hover {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.5),
              0 0 40px hsl(var(--primary) / 0.3);
}
```

**Image Zoom:**
```tsx
<img className="group-hover:scale-110 transition-transform duration-500" />
```

**Applied to:**
- Event highlight cards (`.hover-lift`)
- Prize cards (`.hover-lift` + `.glow-on-hover`)
- Special menu items (`.hover-scale`)
- Gallery images (zoom effect)

---

### 4. WhatsApp Table Package Modal

**Functionality:** Pre-filled WhatsApp message with table options

**Implementation:**
```tsx
const TablePackageButton = () => {
  const handleWhatsAppOrder = () => {
    const packages = [
      { name: "General Admission", price: "COP 50,000", capacity: "1 person" },
      { name: "Small Table", price: "COP 400,000", capacity: "4-6 people" },
      { name: "Large Table", price: "COP 700,000", capacity: "8-10 people" },
      { name: "VIP Booth", price: "COP 1,200,000", capacity: "12-15 people + bottle service" }
    ];

    const message = `Hi! I'd like to book for Halloween Party on Oct 31, 2025.

Please provide more info on these packages:
${packages.map(p => `• ${p.name} (${p.capacity}) - ${p.price}`).join('\n')}

Number of guests: [Please specify]
Preferred package: [Please specify]
Special requests: [Optional]`;

    const whatsappUrl = `https://wa.me/573047862834?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button onClick={handleWhatsAppOrder} size="lg" className="bg-whatsapp">
      Order Table Package via WhatsApp
    </Button>
  );
};
```

**User Experience:**
1. Click "Order Table Package" button
2. WhatsApp opens with pre-filled message
3. User sees all package options with pricing
4. User edits message to specify their needs
5. Send message → instant response from Skybox team

---

### 5. Add to Calendar

**Functionality:** One-click add to Google Calendar

**Implementation:**
```tsx
const addToCalendar = () => {
  const event = {
    title: "Medellín Halloween Party - Skybox Rooftop",
    start: "20251031T200000", // Oct 31, 2025 8:00 PM
    end: "20251101T020000",   // Nov 1, 2025 2:00 AM
    location: "Skybox Medellín, Laureles Rooftop, Medellín, Colombia",
    description: "Halloween party with costume contest (COP 1.4M in prizes), live DJ, themed cocktails, rooftop views. Doors at 6 PM. More info: skybox.com/events/halloween-party-2025"
  };

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&location=${encodeURIComponent(event.location)}&details=${encodeURIComponent(event.description)}`;

  window.open(gcalUrl, '_blank');
};
```

**Supported Calendars:**
- Google Calendar (primary)
- Apple Calendar (via .ics download - future enhancement)
- Outlook (via .ics download - future enhancement)

---

### 6. Social Sharing

**Functionality:** Share event on social media

**Implementation:**
```tsx
const shareEvent = () => {
  const shareData = {
    title: "Medellín Halloween Party at Skybox",
    text: "Join me at the best Halloween party in Medellín! COP 1.4M in costume prizes, live DJ, themed cocktails on a rooftop!",
    url: window.location.href
  };

  // Web Share API (mobile)
  if (navigator.share) {
    navigator.share(shareData);
  } else {
    // Fallback: Copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  }
};
```

**Share Targets:**
- WhatsApp
- Instagram Stories
- Facebook
- Twitter/X
- Copy link

---

## Responsive Behavior

### Desktop (1024px+)

**Layout:**
- 2-column grid: 66% left (content) + 33% right (sticky sidebar)
- Hero: 70vh height
- Grids: 2 columns for highlights, prizes, specials
- Gallery: 3 columns
- Sidebar: Sticky at `top-24px`

**Navigation:**
- Standard header visible
- No sticky CTA button

---

### Tablet (768px - 1023px)

**Layout:**
- Single column (sidebar moves above main content)
- Hero: 60vh height
- Grids: Still 2 columns for visual interest
- Gallery: 2 columns
- Event details card: Not sticky, flows with content

**Navigation:**
- Standard header visible
- Sticky CTA button appears at bottom

---

### Mobile (< 768px)

**Layout:**
- Single column
- Hero: 50vh height (more room for content)
- Grids: 1 column for all sections
- Gallery: 2 columns (still visual)
- CTAs: Full-width, stacked vertically

**Navigation:**
- Header collapses to hamburger menu
- Sticky CTA button ALWAYS visible when scrolled past hero

**Typography Adjustments:**
```tsx
// Hero title
className="text-4xl md:text-7xl" // 36px mobile, 72px desktop

// Section titles
className="text-3xl md:text-5xl" // 30px mobile, 48px desktop

// Body text
className="text-base md:text-lg" // 16px mobile, 18px desktop
```

**Spacing Adjustments:**
```tsx
// Section padding
className="py-12 md:py-16" // 48px mobile, 64px desktop

// Container padding
className="px-4 md:px-6" // 16px mobile, 24px desktop

// Card padding
className="p-4 md:p-6" // 16px mobile, 24px desktop
```

---

## Image Usage & Assets

### Required Images

#### 1. Hero Background
**Filename:** `halloween-hero-2025.jpg`
- **Dimensions:** 1920x1350px (16:9 aspect ratio)
- **Content:** Rooftop party scene with Halloween theme
  - People in costumes
  - Orange/purple atmospheric lighting
  - Skybox rooftop recognizable (city skyline visible)
  - DJ booth or dance floor visible
  - Festive Halloween decorations
- **Optimization:** Compress to <400KB (use WebP format)
- **Alt text:** "Halloween party on Skybox rooftop with costumes and city views"

#### 2. Prize Category Icons (Optional Enhancement)
Use emoji or icon library (Lucide React):
- 👑 Best Overall
- 👥 Best Group
- 💀 Scariest
- 😂 Funniest

#### 3. Food/Drink Specials Images (6 images)
**Filenames:**
- `special-bloody-mary.jpg`
- `special-witchs-brew.jpg`
- `special-zombie-shot.jpg`
- `special-devil-wings.jpg`
- `special-monster-burger.jpg`
- `special-pumpkin-delight.jpg`

**Dimensions:** 800x600px (4:3 aspect ratio)
**Content:** Professional food/drink photography with Halloween styling
**Optimization:** <150KB each
**Alt text:** Descriptive (e.g., "Bloody Mary cocktail with vampire fang garnish")

#### 4. Gallery Images (8 images)
**Filenames:**
- `halloween-2023-costumes.jpg`
- `halloween-2023-crowd.jpg`
- `halloween-2023-dj.jpg`
- `halloween-2023-decorations.jpg`
- `halloween-2022-group.jpg`
- `halloween-2022-booth.jpg`
- `halloween-2022-drinks.jpg`
- `halloween-2022-rooftop.jpg`

**Dimensions:** 1200x1200px (1:1 square for grid consistency)
**Content:** Past Halloween events at Skybox
**Optimization:** <200KB each
**Alt text:** Descriptive of each scene

#### 5. Fallback/Placeholder Images
If specific images unavailable, use:
- Stock Halloween party photos (with proper licensing)
- Skybox venue photos with Halloween overlays added in design
- Generic rooftop party scenes

---

### Image Optimization Checklist

- ✅ Convert to WebP format (30-50% smaller than JPEG)
- ✅ Compress using TinyPNG or ImageOptim
- ✅ Use responsive images (`srcset` for different screen sizes)
- ✅ Lazy load all images below fold (`loading="lazy"`)
- ✅ Provide descriptive alt text (accessibility + SEO)
- ✅ Use appropriate dimensions (don't serve 4K images for mobile)
- ✅ Cache images with long expiry headers

**Example:**
```tsx
<img
  src={halloweenHero}
  srcSet={`${halloweenHeroSmall} 768w, ${halloweenHeroMedium} 1024w, ${halloweenHeroLarge} 1920w`}
  sizes="100vw"
  alt="Halloween party on Skybox rooftop with costumes and city views"
  loading="lazy"
  className="w-full h-full object-cover"
/>
```

---

## Component Specifications

### New Components to Create

#### 1. CountdownTimer.tsx
```tsx
// src/components/events/CountdownTimer.tsx
import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer = ({ targetDate, className = "" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return (
    <div className={`countdown-scoreboard ${className}`} role="timer" aria-live="polite">
      <div className="flex justify-center gap-3 md:gap-6">
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="countdown-label">Days</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="countdown-label">Hours</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="countdown-label">Minutes</span>
        </div>
        <span className="countdown-separator">:</span>
        <div className="countdown-digit">
          <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="countdown-label">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
```

#### 2. FAQSection.tsx
```tsx
// src/components/events/FAQSection.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

const FAQSection = ({ faqs }: FAQSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
```

#### 3. StickyReserveButton.tsx
```tsx
// src/components/events/StickyReserveButton.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StickyReserveButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky button after scrolling past hero (600px)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/95 backdrop-blur-sm border-t md:hidden animate-slide-in-up">
      <Button
        size="lg"
        className="w-full gradient-primary hover-lift ripple"
        asChild
      >
        <Link to="/reserve">Reserve Your Spot</Link>
      </Button>
    </div>
  );
};

export default StickyReserveButton;
```

### Enhanced Existing Components

#### EventDetail.tsx Enhancements
Add to existing component:
```tsx
// Import new components
import CountdownTimer from "@/components/events/CountdownTimer";
import FAQSection from "@/components/events/FAQSection";
import StickyReserveButton from "@/components/events/StickyReserveButton";

// In render, add countdown to hero section
<CountdownTimer
  targetDate={new Date("2025-10-31T20:00:00")}
  className="max-w-2xl mx-auto mb-8"
/>

// Add FAQ section before gallery
{event.faqs && (
  <FAQSection faqs={event.faqs} />
)}

// Add sticky button at bottom
<StickyReserveButton />
```

#### Event Interface Enhancement
```tsx
// src/data/events.ts
export interface Event {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
  isPast?: boolean;
  fullDescription?: string;
  highlights?: string[];
  prizes?: Array<{ title: string; description: string }>;
  specials?: Array<{
    name: string;
    description: string;
    price?: string;
    category?: string;
    image?: string;
  }>;
  faqs?: Array<{ question: string; answer: string }>; // NEW
  capacity?: number; // NEW
  doorsOpen?: string; // NEW
}
```

---

## Implementation Checklist

### Phase 1: Data Setup
- [ ] Update `halloween-party-2025` event in `events.ts`
- [ ] Add FAQ data to event object
- [ ] Add capacity and doors open time
- [ ] Enhance specials with images and categories
- [ ] Add all required images to `/src/assets/`

### Phase 2: Component Development
- [ ] Create `CountdownTimer.tsx` component
- [ ] Create `FAQSection.tsx` component
- [ ] Create `StickyReserveButton.tsx` component
- [ ] Test all components in isolation

### Phase 3: EventDetail Enhancement
- [ ] Integrate countdown timer into hero
- [ ] Add FAQ section to layout
- [ ] Add sticky reserve button
- [ ] Update prize section styling (enhanced cards)
- [ ] Update specials section with images
- [ ] Add capacity indicator to sidebar
- [ ] Add "Add to Calendar" functionality
- [ ] Add social share functionality

### Phase 4: Responsive Testing
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Verify sticky sidebar behavior
- [ ] Verify sticky mobile button
- [ ] Test all CTAs (Reserve, WhatsApp, Calendar)

### Phase 5: Accessibility Audit
- [ ] Run Lighthouse accessibility audit (target: 95+)
- [ ] Verify all images have alt text
- [ ] Verify countdown has ARIA live region
- [ ] Test keyboard navigation (tab through all interactive elements)
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify color contrast ratios (WCAG AA)
- [ ] Verify focus states visible

### Phase 6: Performance Optimization
- [ ] Compress all images to target sizes
- [ ] Convert images to WebP format
- [ ] Add lazy loading to below-fold images
- [ ] Run Lighthouse performance audit (target: 90+)
- [ ] Verify no layout shift (CLS < 0.1)
- [ ] Test page load time (<3 seconds on 3G)

### Phase 7: Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (desktop + iOS)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

### Phase 8: Final QA
- [ ] Verify all links work (Reserve, WhatsApp, Calendar, Directions)
- [ ] Verify countdown updates every second
- [ ] Verify WhatsApp message pre-fills correctly
- [ ] Verify calendar event has correct details
- [ ] Verify gallery lightbox works
- [ ] Verify FAQ accordion expands/collapses
- [ ] Verify mobile sticky button appears on scroll
- [ ] Verify social share works

---

## Success Metrics

### Conversion Goals
- **Primary:** 25% click-through rate on "Reserve Your Spot" CTA
- **Secondary:** 15% WhatsApp message initiated
- **Tertiary:** 10% "Add to Calendar" clicks

### Engagement Metrics
- **Time on page:** > 2 minutes average
- **Scroll depth:** 75% reach FAQ section
- **Gallery interactions:** 40% click at least one image

### Technical Performance
- **Page load time:** < 2 seconds (desktop), < 3 seconds (mobile on 3G)
- **Lighthouse scores:**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 90+
- **Core Web Vitals:**
  - LCP: < 2.5s
  - FID: < 100ms
  - CLS: < 0.1

---

**Design Prepared By:** Skybox FE Expert Agent
**Date:** 2025-10-23
**Status:** Ready for Implementation
**Estimated Development Time:** 8-12 hours

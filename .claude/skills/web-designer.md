# Skybox GameHub Front-End Web Design Best Practices

## Overview
This Skill defines comprehensive front-end web design best practices for Skybox GameHub, a premium sports bar website in Medellín. These guidelines ensure consistency, accessibility, performance, and maintainability across all pages and components.

---

## 1. Naming Conventions

### 1.1 Component Files
- **Pattern:** `PascalCase.tsx`
- **Examples:** `EventCard.tsx`, `LiveNowBanner.tsx`, `FeaturePhotoCard.tsx`
- **Location:** Organized by domain/feature
  - `src/components/events/` - Event-related components
  - `src/components/home/` - Home page sections
  - `src/components/layout/` - Layout components (Header, Footer)
  - `src/components/sports/` - Sports-related components
  - `src/components/ui/` - Reusable UI primitives (shadcn/ui)

### 1.2 Page Files
- **Pattern:** `PascalCase.tsx`
- **Examples:** `Home.tsx`, `EventDetail.tsx`, `SportsSchedule.tsx`
- **Location:** `src/pages/`

### 1.3 CSS Classes (Tailwind)
- **Utility-first approach:** Use Tailwind utilities directly
- **Custom classes:** Use semantic names in `kebab-case`
  - `.hover-lift` - Lift animation on hover
  - `.glow-on-hover` - Glow effect on hover
  - `.gradient-primary` - Primary gradient background
  - `.countdown-scoreboard` - Specific component styling

### 1.4 CSS Custom Properties
- **Pattern:** `--property-name` in HSL format
- **Examples:**
  - `--primary: 220 70% 35%` (MLB Blue)
  - `--secondary: 28 80% 52%` (Amber Gold)
  - `--bg-dark-section: 0 0% 8%`
  - `--shadow-elegant: 0 10px 40px -10px hsla(28, 80%, 52%, 0.3)`

---

## 2. Component Hierarchy & Architecture

### 2.1 Site Structure
```
App.tsx (Root)
├── Header (Sticky navigation)
├── main.flex-1
│   └── Routes
│       ├── Home
│       ├── Events
│       ├── EventDetail
│       ├── Sports
│       ├── LeagueDetail
│       ├── Menu
│       ├── Gallery
│       ├── Contact
│       └── Reserve
└── Footer
```

### 2.2 Page Component Pattern
All pages follow this consistent structure:
```tsx
const PageName = () => {
  return (
    <div className="min-h-screen">
      {/* Hero/Banner Section */}
      <section className="...">...</section>

      {/* Content Sections */}
      <section className="py-16 bg-background">...</section>
      <section className="py-16 bg-dark-section">...</section>

      {/* CTA Section */}
      <section className="...">...</section>
    </div>
  );
};
```

### 2.3 Component Composition
- **Atomic Design Principles:**
  - **Atoms:** `Button`, `Card`, `Badge` (from `src/components/ui/`)
  - **Molecules:** `EventCard`, `FeaturePhotoCard`, `LeagueCard`
  - **Organisms:** `EventFilterBar`, `TestimonialSlider`, `LiveNowBanner`
  - **Templates:** Page layouts combining organisms
  - **Pages:** `Home`, `Events`, `Sports`, etc.

### 2.4 Home Page Structure
1. **LiveNowBanner** - Dynamic "Live Now" indicator
2. **Hero Section** - Parallax hero with World Series branding
3. **PromoBanner** - Special promotions
4. **Upcoming Events** - EventCard grid (3 cards)
5. **Sports Directory Showcase** - Sports category previews
6. **Why Watch at Skybox** - Feature photo cards (4 cards)
7. **Experience Section** - Two-column with image
8. **CTA Section** - Gradient call-to-action
9. **EventBookingCTA** - Corporate events section
10. **Back to Top Button** - Scroll utility

---

## 3. Responsive Grid System & Breakpoints

### 3.1 Tailwind Breakpoints
- `sm: 640px` - Small devices
- `md: 768px` - Tablets
- `lg: 1024px` - Desktop
- `xl: 1280px` - Large desktop
- `2xl: 1400px` - Extra large (container max-width)

### 3.2 Grid Patterns
```tsx
// 3-column responsive grid (common pattern)
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 4-column responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// 2-column layout
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
```

### 3.3 Container Usage
- **Pattern:** `<div className="container px-4">`
- **Max-width:** `1400px` (2xl breakpoint)
- **Padding:** `2rem` (responsive)
- **Always centered:** `center: true` in tailwind.config

### 3.4 Section Spacing
- **Standard vertical padding:** `py-16` (64px)
- **Hero sections:** Custom heights (`h-[600px] md:h-[700px]`)
- **Gap between cards:** `gap-6` (24px)
- **Gap between sections:** Natural flow via `py-16`

---

## 4. Semantic HTML & Accessibility

### 4.1 Semantic Structure
```tsx
// Correct semantic HTML
<header>...</header>
<main className="flex-1">
  <section>...</section>
  <section>...</section>
</main>
<footer>...</footer>
```

### 4.2 ARIA Labels
```tsx
// Interactive elements MUST have aria-label
<button
  onClick={scrollToTop}
  aria-label="Back to top"
>
  <ArrowUp size={24} />
</button>

<button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  aria-label="Toggle menu"
>
  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
</button>
```

### 4.3 Image Alt Text
```tsx
// Always provide descriptive alt text
<img
  src={heroImage}
  alt="World Series baseball game atmosphere at Skybox rooftop"
/>

// Logo alt text
<img
  src={skyboxLogo}
  alt="Skybox Medellín"
  className="h-12 w-auto"
/>
```

### 4.4 Heading Hierarchy
```tsx
// Maintain proper heading order
<h1>Watch the World Series</h1>        {/* Page title */}
<h2>Upcoming Events</h2>               {/* Section title */}
<h3>Why Watch at Skybox?</h3>          {/* Subsection */}
<h4>Game 1 - Opening Night</h4>        {/* Card title */}
```

### 4.5 Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus states defined via `--ring` color
- Maintain logical tab order

### 4.6 Color Contrast
- **WCAG AA Minimum:**
  - Text: 4.5:1 ratio
  - Large text: 3:1 ratio
- **Primary on background:** `hsl(220 70% 35%)` on `hsl(30 40% 98%)` ✓
- **Dark section text:** `hsl(0 0% 95%)` on `hsl(0 0% 8%)` ✓
- **Muted text:** `hsl(0 0% 27%)` on light backgrounds ✓

### 4.7 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 5. Performance Standards

### 5.1 Image Optimization
```tsx
// Import images from assets (Vite optimization)
import heroImage from "@/assets/hero-world-series.jpg";

// Use appropriate sizes
<img
  src={heroImage}
  alt="..."
  className="w-full h-64 object-cover"
  loading="lazy"  // Add for below-fold images
/>
```

### 5.2 Lazy Loading
```tsx
// Images below the fold
<img
  src={venueImage}
  alt="Skybox Interior"
  loading="lazy"
/>

// Hero images should NOT be lazy-loaded
<img src={heroImage} alt="..." />  // No loading attribute
```

### 5.3 Code Splitting
- Pages automatically split via React Router
- Dynamic imports for heavy components if needed
```tsx
// Example (use when needed)
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

### 5.4 Minimal CSS
- **Tailwind JIT:** Only generates used utilities
- **PurgeCSS:** Automatic via Vite build
- **Custom utilities:** Defined in `index.css` `@layer utilities`
- **Avoid inline styles:** Use Tailwind classes

### 5.5 Bundle Size
- **Dependencies:** Only essential libraries
  - `react-router-dom` for routing
  - `@tanstack/react-query` for data fetching
  - `lucide-react` for icons
  - `@radix-ui/*` for accessible UI primitives
- **Tree-shaking enabled:** Vite handles automatically

---

## 6. Styling Guidelines

### 6.1 Color Palette (HSL Format)

#### Brand Colors
```css
--primary: 220 70% 35%;        /* MLB Blue */
--primary-glow: 220 80% 45%;   /* Lighter blue for effects */
--secondary: 28 80% 52%;       /* Amber Gold */
--accent: 28 90% 60%;          /* Light Amber */
--brand-red: 0 65% 30%;        /* Deep red accent */
```

#### Backgrounds
```css
--background: 30 40% 98%;       /* Light warm cream */
--bg-dark-section: 0 0% 8%;     /* Dark charcoal */
--bg-dark-footer: 0 0% 5%;      /* Darker footer */
--card: 0 0% 100%;              /* Pure white cards */
```

#### Text Colors
```css
--foreground: 0 0% 13%;         /* Dark text on light */
--text-dark: 0 0% 13%;
--text-mid: 0 0% 27%;           /* Muted text */
--text-light: 0 0% 98%;         /* Light text on dark */
--muted-foreground: 0 0% 27%;
```

#### Utility Colors
```css
--whatsapp: 142 70% 49%;        /* WhatsApp green */
--destructive: 0 84% 60%;       /* Error/warning red */
```

### 6.2 Gradients
```css
/* Primary amber gradient for CTAs */
--gradient-primary: linear-gradient(135deg, hsl(28 80% 52%), hsl(28 90% 60%));

/* Dark gradient for hero sections */
--gradient-dark: linear-gradient(180deg, hsl(0, 0%, 8%), hsl(0, 0%, 12%));

/* Hero overlay */
.bg-gradient-to-r from-black/80 via-black/60 to-black/40
```

### 6.3 Typography

#### Font Families
```css
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Bebas Neue', 'Arial Black', sans-serif;
  font-weight: 700;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}
```

#### Font Sizes
```tsx
<h1 className="text-5xl md:text-7xl">Hero Title</h1>
<h2 className="text-4xl md:text-5xl">Section Title</h2>
<h3 className="text-3xl">Subsection</h3>
<p className="text-xl md:text-2xl">Large body text</p>
<p className="text-lg">Standard body text</p>
<span className="text-sm">Small text (badges, labels)</span>
```

### 6.4 Spacing
```tsx
// Section padding
className="py-16"  // 64px top/bottom

// Container padding
className="container px-4"

// Card padding
className="p-5"    // 20px all sides
className="p-6 md:p-8"  // Responsive padding

// Gaps
className="gap-6"   // 24px (standard card grid)
className="gap-12"  // 48px (large section spacing)
```

### 6.5 Shadows
```css
--shadow-card: 0 4px 20px hsla(0, 0%, 0%, 0.08);
--shadow-elegant: 0 10px 40px -10px hsla(28, 80%, 52%, 0.3);
--shadow-glow: 0 0 30px hsla(28, 80%, 52%, 0.2);
```

```tsx
// Usage
className="shadow-2xl"         // Tailwind large shadow
className="shadow-lg"          // Tailwind medium shadow
style={{ boxShadow: 'var(--shadow-elegant)' }}
```

### 6.6 Border Radius
```css
--radius: 0.75rem;  // 12px default

/* Tailwind utilities */
rounded-lg: var(--radius)
rounded-md: calc(var(--radius) - 2px)
rounded-sm: calc(var(--radius) - 4px)
rounded-full: 9999px
```

### 6.7 Hover States

#### Standard Hover Lift
```tsx
className="hover-lift"
// Applies: translateY(-4px) + shadow-elegant
```

#### Glow on Hover
```tsx
className="glow-on-hover"
// Applies: box-shadow with primary color glow
```

#### Scale on Hover
```tsx
className="hover-scale"
// Applies: scale(1.05)
```

#### Image Zoom
```tsx
className="group-hover:scale-110 transition-transform duration-500"
```

#### Button Hover
```tsx
className="hover:bg-primary/90"
className="hover:bg-accent/90"
```

### 6.8 Transitions
```css
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Tailwind utilities */
transition-colors
transition-transform
transition-opacity
duration-300
duration-500
```

---

## 7. Component Patterns

### 7.1 Card Component Pattern
```tsx
<Card className="overflow-hidden hover-lift glow-on-hover group">
  <div className="relative h-48 overflow-hidden">
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute top-3 left-3">
      <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
        {category}
      </span>
    </div>
  </div>
  <div className="p-5">
    {/* Card content */}
  </div>
</Card>
```

### 7.2 Section Pattern
```tsx
<section className="py-16 bg-background">
  <div className="container px-4">
    <div className="text-center mb-12">
      <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
        SECTION LABEL
      </div>
      <h2 className="text-4xl md:text-5xl font-bold mb-4">Section Title</h2>
      <p className="text-xl text-muted-foreground">Section description</p>
    </div>

    {/* Section content */}
  </div>
</section>
```

### 7.3 CTA Button Pattern
```tsx
<Link to="/reserve">
  <Button size="lg" className="gradient-primary hover-lift glow-on-hover ripple text-lg px-8">
    Reserve Your Table
  </Button>
</Link>

<a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
  <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0">
    Chat on WhatsApp
  </Button>
</a>
```

### 7.4 Hero Section Pattern
```tsx
<section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
  <div
    className="parallax-hero absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${heroImage})`,
      transform: `translateY(${parallaxOffset}px)`
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
  </div>

  <div className="relative z-10 container px-4 text-center text-white">
    <h1>Hero Title</h1>
    <p>Hero description</p>
    <div className="flex gap-4 justify-center">
      {/* CTA buttons */}
    </div>
  </div>
</section>
```

### 7.5 Badge Pattern
```tsx
// Trending badge
<div className="trending-badge bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
  🔥 TRENDING EVENT
</div>

// Category badge
<span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase">
  {category}
</span>

// Section label
<div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
  SECTION LABEL
</div>
```

---

## 8. Animation & Interactivity

### 8.1 Keyframe Animations
```css
/* Defined in tailwind.config.ts */
animate-fade-in       /* Fade in with translateY */
animate-fade-in-up    /* Fade in up (subtle) */
animate-scale-in      /* Scale up fade in */
animate-slide-in-right /* Slide from right */
```

### 8.2 Stagger Animations
```tsx
<div className="grid grid-cols-3 gap-6">
  {items.map((item, index) => (
    <div key={item.id} className="stagger-item">
      {/* Content */}
    </div>
  ))}
</div>
```

### 8.3 Parallax Effect
```tsx
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

const parallaxOffset = scrollY * 0.5;

<div
  className="parallax-hero"
  style={{ transform: `translateY(${parallaxOffset}px)` }}
/>
```

### 8.4 Ripple Effect
```tsx
<Button className="ripple">Click Me</Button>
```

### 8.5 Group Hover
```tsx
<div className="group">
  <img className="group-hover:scale-110 transition-transform" />
  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
    {/* Shown on hover */}
  </div>
</div>
```

---

## 9. TypeScript & Props

### 9.1 Component Props Interface
```tsx
interface EventCardProps {
  slug: string;
  title: string;
  subtitle?: string;  // Optional prop
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
}

const EventCard = ({
  slug,
  title,
  subtitle,
  date,
  time,
  location,
  image,
  category,
}: EventCardProps) => {
  // Component implementation
};
```

### 9.2 Type Safety
- All components must have TypeScript interfaces for props
- Use optional props (`?`) when appropriate
- Export types when shared across components

---

## 10. Routing & Navigation

### 10.1 Route Structure
```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/events" element={<Events />} />
  <Route path="/events/:slug" element={<EventDetail />} />
  <Route path="/sports" element={<Sports />} />
  <Route path="/sports/:slug" element={<LeagueDetail />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/reserve" element={<Reserve />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

### 10.2 Navigation Links
```tsx
// Internal navigation
<Link to="/events">View Events</Link>

// Active state
const isActive = (path: string) => location.pathname === path;

<Link
  to={link.to}
  className={`${isActive(link.to) ? "text-primary" : "text-muted-foreground"}`}
>
  {link.label}
</Link>
```

### 10.3 External Links
```tsx
<a
  href="https://wa.me/573047862834"
  target="_blank"
  rel="noopener noreferrer"
>
  Contact via WhatsApp
</a>
```

---

## 11. Data Management

### 11.1 Data Files
- Location: `src/data/`
- Pattern: `entity_name.ts`
- Examples:
  - `events.ts` - Event data
  - `mlb_games_2025.ts` - MLB schedule
  - `nfl_games_2025.ts` - NFL schedule
  - `allSports.ts` - Sports directory data

### 11.2 Data Structure
```tsx
export const events = [
  {
    slug: "world-series-game-1",
    title: "World Series Game 1",
    subtitle: "Opening Night",
    date: "October 25, 2025",
    time: "8:00 PM ET",
    location: "Skybox Medellín",
    category: "MLB",
    image: mlbImage,
  },
  // ...
];
```

---

## 12. State Management

### 12.1 Local Component State
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);
const [showBackToTop, setShowBackToTop] = useState(false);
```

### 12.2 React Query
```tsx
const queryClient = new QueryClient();

// Wrap app
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```

---

## 13. Dark Mode Support

### 13.1 Dark Mode Variables
```css
.dark {
  --background: 218 30% 8%;
  --foreground: 0 0% 98%;
  --card: 0 0% 12%;
  /* ... */
}
```

### 13.2 Theme Toggle
- Currently single theme (light with dark sections)
- Dark mode infrastructure ready via `next-themes`
- Activate by adding ThemeProvider when needed

---

## 14. Common Violations to Avoid

### ❌ WRONG
```tsx
// Inline styles instead of Tailwind
<div style={{ marginTop: '20px' }}>

// Missing alt text
<img src={image} />

// No aria-label on icon buttons
<button onClick={handleClick}>
  <MenuIcon />
</button>

// Hard-coded colors instead of CSS variables
<div style={{ backgroundColor: '#1a73e8' }}>

// Missing TypeScript interface
const EventCard = (props) => { ... }

// Incorrect component location
src/EventCard.tsx  // Should be in src/components/events/

// Non-semantic HTML
<div className="header">  // Should be <header>
```

### ✅ CORRECT
```tsx
// Use Tailwind utilities
<div className="mt-5">

// Always include alt text
<img src={image} alt="Skybox rooftop venue" />

// Add aria-labels to icon buttons
<button onClick={handleClick} aria-label="Open menu">
  <MenuIcon />
</button>

// Use CSS variables
<div className="bg-primary">

// Always use TypeScript interfaces
interface EventCardProps { ... }
const EventCard = (props: EventCardProps) => { ... }

// Correct component location
src/components/events/EventCard.tsx

// Semantic HTML
<header className="...">
```

---

## 15. Testing Checklist

Before committing changes, verify:

- [ ] Component is in correct folder (`components/[domain]/`)
- [ ] TypeScript interface defined for all props
- [ ] All images have descriptive alt text
- [ ] All icon buttons have aria-labels
- [ ] Semantic HTML tags used (`<header>`, `<section>`, `<nav>`, etc.)
- [ ] Responsive breakpoints applied (`md:`, `lg:`)
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Hover states defined for interactive elements
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Images use `loading="lazy"` when below fold
- [ ] External links include `rel="noopener noreferrer"`
- [ ] Component follows established patterns (Card, Section, CTA)
- [ ] CSS classes use HSL color variables, not hard-coded colors
- [ ] No inline styles (use Tailwind utilities)

---

## 16. Quick Reference

### Color Usage
- **Primary buttons:** `gradient-primary`
- **Secondary buttons:** `bg-secondary`
- **WhatsApp CTA:** `bg-whatsapp`
- **Light section:** `bg-background`
- **Dark section:** `bg-dark-section`
- **Cards:** `bg-card`

### Common Utilities
- **Hover lift:** `hover-lift`
- **Glow effect:** `glow-on-hover`
- **Ripple:** `ripple`
- **Parallax:** `parallax-hero`
- **Stagger animation:** `stagger-item`

### Typography Scale
- H1: `text-5xl md:text-7xl`
- H2: `text-4xl md:text-5xl`
- H3: `text-3xl`
- Body Large: `text-xl md:text-2xl`
- Body Standard: `text-lg`
- Small Text: `text-sm`

---

**Last Updated:** 2025-01-23
**Maintained By:** Skybox FE Expert Agent

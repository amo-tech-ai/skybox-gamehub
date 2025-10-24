# Cursor Rule: Front-End Web Design Best Practices
## Skybox Gamehub Design System & Development Standards

### 🎯 **Rule Overview**
This rule defines comprehensive front-end development standards for the Skybox Gamehub website, ensuring consistency, accessibility, performance, and maintainability across all components and pages.

---

## 📋 **1. NAMING CONVENTIONS**

### **Component Naming**
- **PascalCase**: All React components use PascalCase (`EventCard.tsx`, `Header.tsx`)
- **Descriptive Names**: Components should clearly indicate their purpose (`CorporateEventsSection.tsx`)
- **File Extensions**: Always use `.tsx` for React components, `.ts` for utilities

### **CSS Class Naming**
- **Tailwind First**: Use Tailwind utility classes as primary styling method
- **Custom Classes**: Use kebab-case for custom CSS classes (`hero-gradient`, `card-shadow`)
- **Semantic Names**: Classes should describe purpose, not appearance (`btn-primary` not `btn-blue`)

### **Variable Naming**
- **camelCase**: JavaScript/TypeScript variables (`formData`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE for constants (`WHATSAPP_NUMBER`, `API_ENDPOINTS`)
- **TypeScript Interfaces**: PascalCase with descriptive names (`EventCardProps`, `UserFormData`)

---

## 🏗️ **2. COMPONENT HIERARCHY**

### **Page Structure**
```
src/pages/
├── Home.tsx              # Main landing page
├── Events.tsx            # Events listing
├── EventDetail.tsx       # Individual event details
├── Sports.tsx           # Sports directory
├── Menu.tsx             # Food & beverage menu
├── Gallery.tsx          # Photo gallery
├── Contact.tsx          # Contact information
└── Reserve.tsx          # Reservation form
```

### **Component Organization**
```
src/components/
├── layout/               # Layout components
│   ├── Header.tsx
│   └── Footer.tsx
├── events/              # Event-specific components
│   ├── EventCard.tsx
│   └── FilterChips.tsx
├── home/                # Home page components
│   ├── LiveNowBanner.tsx
│   ├── PromoBanner.tsx
│   └── EventBookingCTA.tsx
├── ui/                  # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── sports/              # Sports-specific components
    └── LeagueCard.tsx
```

### **Import Order**
1. **React/External Libraries**: `import React from 'react'`
2. **Internal Components**: `import Header from '@/components/layout/Header'`
3. **UI Components**: `import { Button } from '@/components/ui/button'`
4. **Assets**: `import heroImage from '@/assets/hero-world-series.jpg'`
5. **Data/Utils**: `import { events } from '@/data/events'`

---

## 🎨 **3. STYLING GUIDELINES**

### **Color System (HSL Format)**
```css
/* Primary Colors */
--primary: 220 70% 35%;           /* MLB Blue */
--primary-foreground: 0 0% 98%;   /* White text on blue */

/* Secondary Colors */
--secondary: 28 80% 52%;          /* Amber Gold */
--secondary-foreground: 0 0% 100%; /* White text on gold */

/* Neutral Colors */
--background: 30 40% 98%;         /* Light cream */
--foreground: 0 0% 13%;           /* Dark gray text */
--muted: 30 20% 90%;              /* Light gray */
--muted-foreground: 0 0% 27%;     /* Medium gray text */

/* Brand Colors */
--brand-amber: 28 80% 52%;        /* Amber Gold */
--brand-red: 0 65% 30%;           /* Dark red */
--whatsapp: 142 70% 49%;          /* WhatsApp green */
```

### **Typography Scale**
```css
/* Headlines */
text-4xl md:text-5xl font-bold    /* Page titles */
text-3xl md:text-4xl font-bold    /* Section titles */
text-2xl font-bold                /* Subsection titles */

/* Body Text */
text-xl text-muted-foreground     /* Large body text */
text-lg                           /* Standard body text */
text-sm text-muted-foreground     /* Small text/captions */

/* Font Families */
font-sans: 'Inter', 'system-ui'   /* Body text */
font-display: 'Bebas Neue'        /* Headlines */
```

### **Spacing System**
```css
/* Section Spacing */
py-16                            /* Standard section padding */
py-20                            /* Large section padding */
py-12                            /* Small section padding */

/* Container Spacing */
container px-4                   /* Standard container */
max-w-4xl mx-auto               /* Centered content */
max-w-6xl mx-auto               /* Wide content */

/* Component Spacing */
gap-4                            /* Small gaps */
gap-6                            /* Medium gaps */
gap-8                            /* Large gaps */
gap-12                           /* Extra large gaps */
```

### **Button Styles**
```css
/* Primary Button */
className="gradient-primary hover-lift glow-on-hover"
/* Secondary Button */
className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
/* Outline Button */
className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
/* WhatsApp Button */
className="bg-whatsapp hover:bg-whatsapp/90 text-white"
```

---

## 📱 **4. RESPONSIVE DESIGN**

### **Breakpoint Strategy**
```css
/* Mobile First Approach */
sm: 640px    /* Small tablets */
md: 768px    /* Tablets */
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
2xl: 1536px  /* Large desktops */
```

### **Grid Patterns**
```css
/* Single Column (Mobile) */
grid-cols-1

/* Two Column (Tablet) */
md:grid-cols-2

/* Three Column (Desktop) */
lg:grid-cols-3

/* Four Column (Large Desktop) */
xl:grid-cols-4
```

### **Responsive Typography**
```css
/* Headlines */
text-4xl md:text-5xl lg:text-6xl

/* Body Text */
text-lg md:text-xl

/* Button Text */
text-sm md:text-base lg:text-lg
```

### **Responsive Spacing**
```css
/* Section Padding */
py-12 md:py-16 lg:py-20

/* Container Padding */
px-4 md:px-6 lg:px-8

/* Gap Spacing */
gap-4 md:gap-6 lg:gap-8
```

---

## ♿ **5. ACCESSIBILITY STANDARDS**

### **Semantic HTML**
```html
<!-- Use proper heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>

<!-- Use semantic elements -->
<main>          <!-- Main content -->
<nav>           <!-- Navigation -->
<section>       <!-- Content sections -->
<article>       <!-- Self-contained content -->
<aside>         <!-- Sidebar content -->
<footer>        <!-- Footer content -->
```

### **ARIA Labels**
```tsx
// Interactive elements
<button aria-label="Close menu">
<button aria-label="Back to top">

// Form elements
<label htmlFor="email">Email Address</label>
<input id="email" aria-describedby="email-help" />

// Navigation
<nav aria-label="Main navigation">
<ul role="list">
```

### **Focus Management**
```css
/* Focus states for all interactive elements */
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-primary
focus-visible:ring-offset-2
```

### **Color Contrast**
- **Minimum**: 4.5:1 for normal text
- **Enhanced**: 7:1 for large text
- **Interactive**: 3:1 for UI components

---

## ⚡ **6. PERFORMANCE STANDARDS**

### **Image Optimization**
```tsx
// Lazy loading for images
<img loading="lazy" alt="Descriptive text" />

// Responsive images
<img 
  src="image-mobile.jpg"
  srcSet="image-mobile.jpg 640w, image-desktop.jpg 1024w"
  sizes="(max-width: 640px) 100vw, 50vw"
/>
```

### **Component Optimization**
```tsx
// React.memo for expensive components
const EventCard = React.memo(({ event }) => {
  // Component logic
});

// useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### **Bundle Optimization**
- **Code Splitting**: Use dynamic imports for large components
- **Tree Shaking**: Import only needed functions from libraries
- **Asset Optimization**: Compress images and use modern formats (WebP)

---

## 🔧 **7. DEVELOPMENT WORKFLOW**

### **Component Creation Checklist**
1. **Create Component File**: Use PascalCase naming
2. **Define Props Interface**: TypeScript interface for props
3. **Implement Responsive Design**: Mobile-first approach
4. **Add Accessibility**: ARIA labels, semantic HTML
5. **Test Functionality**: Ensure all interactions work
6. **Validate Styling**: Check all breakpoints
7. **Document Usage**: Add JSDoc comments

### **Code Quality Standards**
```tsx
// TypeScript interfaces
interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
}

// Component structure
const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  location,
  image,
  category
}) => {
  // Component logic
  return (
    // JSX
  );
};

export default EventCard;
```

### **Testing Requirements**
- **Unit Tests**: Test component logic and props
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Use axe-core for accessibility testing
- **Visual Tests**: Test responsive design across breakpoints

---

## 📊 **8. SITE STRUCTURE MAPPING**

### **Page Hierarchy**
```
Home (/)
├── Hero Section
├── Live Now Banner
├── Upcoming Events
├── Features Section
├── Experience Section
└── Event Booking CTA

Events (/events)
├── Filter Section
├── Events Grid
└── Pagination

Sports (/sports)
├── Sports Directory
├── League Cards
└── Schedule Links

Menu (/menu)
├── Menu Categories
├── Menu Items
└── Specials

Gallery (/gallery)
├── Photo Grid
├── Category Filters
└── Lightbox Modal

Contact (/contact)
├── Contact Information
├── Contact Form
└── Location Map
```

### **Component Dependencies**
```
Home.tsx
├── Header.tsx
├── LiveNowBanner.tsx
├── PromoBanner.tsx
├── EventCard.tsx
├── FeaturePhotoCard.tsx
├── TestimonialSlider.tsx
├── EventBookingCTA.tsx
└── Footer.tsx
```

---

## 🎯 **9. QUALITY ASSURANCE**

### **Code Review Checklist**
- [ ] **Naming**: Follows naming conventions
- [ ] **Structure**: Proper component hierarchy
- [ ] **Styling**: Uses design system colors/spacing
- [ ] **Responsive**: Works on all breakpoints
- [ ] **Accessibility**: Proper ARIA labels and semantic HTML
- [ ] **Performance**: Optimized images and components
- [ ] **TypeScript**: Proper typing and interfaces
- [ ] **Testing**: All functionality tested

### **Performance Metrics**
- **Lighthouse Score**: 90+ for all categories
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: Keep components under 50KB
- **Image Optimization**: Use WebP format, proper sizing

---

## 🚀 **10. IMPLEMENTATION EXAMPLES**

### **Creating a New Section**
```tsx
// 1. Create component file
// src/components/home/NewSection.tsx

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface NewSectionProps {
  title: string;
  description: string;
}

const NewSection: React.FC<NewSectionProps> = ({ title, description }) => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {description}
          </p>
          <Button className="gradient-primary hover-lift">
            Call to Action
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
```

### **Adding to Page**
```tsx
// 2. Import and use in page
import NewSection from "@/components/home/NewSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Existing sections */}
      
      <NewSection 
        title="New Section Title"
        description="Section description"
      />
      
      {/* More sections */}
    </div>
  );
};
```

---

This rule ensures consistent, accessible, and performant front-end development across the entire Skybox Gamehub website. All developers should follow these standards to maintain code quality and user experience.

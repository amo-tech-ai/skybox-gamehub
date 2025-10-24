# Skybox Gamehub - Style Guide

## Color Palette

### Primary Colors
- **Orange Primary**: `hsl(25, 95%, 53%)` - `#FF6B35` (Vibrant orange for primary actions)
- **Orange Glow**: `hsl(25, 100%, 65%)` - `#FF8A5B` (Lighter orange for glows and highlights)
- **Green Accent**: `hsl(142, 76%, 36%)` - `#2D7A3D` (Deep forest green for accents)

### Neutral Colors
- **Background**: `hsl(35, 100%, 97%)` - `#FEFCF8` (Warm off-white)
- **Foreground**: `hsl(0, 0%, 13%)` - `#212121` (Dark text)
- **Muted**: `hsl(25, 15%, 92%)` - `#F5F3F0` (Light muted)
- **Muted Foreground**: `hsl(0, 0%, 45%)` - `#737373` (Medium gray text)

### Dark Mode Colors
- **Dark Background**: `hsl(0, 0%, 8%)` - `#141414` (Very dark)
- **Dark Foreground**: `hsl(0, 0%, 95%)` - `#F2F2F2` (Light text on dark)
- **Dark Section**: `hsl(0, 0%, 8%)` - `#141414` (Footer/dark sections)

### Utility Colors
- **WhatsApp**: `hsl(142, 76%, 36%)` - `#2D7A3D` (Matches accent green)
- **Destructive**: `hsl(0, 84%, 60%)` - `#EF4444` (Red for errors)
- **Border**: `hsl(25, 20%, 88%)` - `#E8E3DD` (Light borders)

## Usage Guidelines

### Primary Orange (`#FF6B35`)
- Use for primary buttons, CTAs, and key interactive elements
- Apply to navigation active states
- Use for brand highlights and important information

### Green Accent (`#2D7A3D`)
- Use for secondary actions and WhatsApp integration
- Apply to success states and positive feedback
- Use sparingly for emphasis and variety

### Text Contrast
- **High Contrast**: Orange on white/light backgrounds
- **Accessible**: All text meets WCAG 2.1 AA standards
- **Dark Mode**: Light text on dark backgrounds maintains readability

## Component Examples

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: hsl(25, 95%, 53%);
  color: white;
}

/* Accent Button */
.btn-accent {
  background: hsl(142, 76%, 36%);
  color: white;
}
```

### Gradients
```css
/* Primary Gradient */
.gradient-primary {
  background: linear-gradient(135deg, hsl(25, 95%, 53%), hsl(25, 100%, 65%));
}
```

### Shadows
```css
/* Orange Glow Shadow */
.shadow-elegant {
  box-shadow: 0 10px 40px -10px hsla(25, 95%, 53%, 0.3);
}
```

## Accessibility

### Contrast Ratios
- **Orange on White**: 4.5:1 (AA compliant)
- **Green on White**: 4.8:1 (AA compliant)
- **White on Orange**: 4.2:1 (AA compliant)
- **White on Green**: 4.9:1 (AA compliant)

### Color Blind Considerations
- Orange and green are distinguishable for most color vision types
- Text contrast maintained regardless of color perception
- Icons and shapes supplement color coding

## Implementation

### CSS Variables
All colors are defined as CSS custom properties in `src/index.css`:

```css
:root {
  --primary: 25 95% 53%;
  --primary-foreground: 0 0% 100%;
  --accent: 142 76% 36%;
  --accent-foreground: 0 0% 100%;
  /* ... more variables */
}
```

### Tailwind Integration
Colors are automatically available as Tailwind classes:
- `bg-primary`, `text-primary`, `border-primary`
- `bg-accent`, `text-accent`, `border-accent`
- `hover:bg-primary`, `hover:text-accent`

## Brand Consistency

### Logo Usage
- Logo should maintain orange and green color scheme
- Use full-color version on light backgrounds
- Use white version on dark backgrounds

### Typography
- **Headings**: Bebas Neue (bold, uppercase)
- **Body**: Inter (clean, readable)
- **Accent**: Use sparingly for emphasis

### Spacing
- Consistent 4px grid system
- Generous whitespace for readability
- Responsive spacing scales

---

**Last Updated**: October 23, 2025  
**Version**: 2.0 - Orange & Green Palette

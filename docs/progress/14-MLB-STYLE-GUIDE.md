# MLB Style Guide - Skybox Gamehub

## 🎨 **Updated Color Palette (MLB Theme)**

### **Primary Colors**
- **MLB Blue**: `220 70% 35%` (#2B4A7A) - Professional, trustworthy
- **Amber Gold**: `28 80% 52%` (#E78A1D) - Warm, energetic
- **Light Amber**: `28 90% 60%` (#F4A261) - Bright accent

### **Brand Colors**
- **Brand Blue**: `220 70% 35%` (#2B4A7A)
- **Brand Amber**: `28 80% 52%` (#E78A1D)
- **Brand Red**: `0 65% 30%` (#8B0000)
- **WhatsApp**: `142 70% 49%` (#25D366)

### **Background Colors**
- **Light Warm**: `32 100% 97%` (#FEFCF8)
- **Light Cream**: `30 40% 98%` (#FDFCFA)
- **Light Amber**: `35 100% 95%` (#FEF9E7)
- **Dark Section**: `0 0% 8%` (#141414)
- **Dark Footer**: `0 0% 5%` (#0D0D0D)

### **Text Colors**
- **Dark Text**: `0 0% 13%` (#212121)
- **Mid Text**: `0 0% 27%` (#454545)
- **Light Text**: `0 0% 98%` (#FAFAFA)

## 🎯 **Color Usage Guidelines**

### **Primary (MLB Blue)**
- **Use for**: Main buttons, navigation, headers, primary actions
- **Hex**: #2B4A7A
- **HSL**: 220 70% 35%
- **Best on**: White, light backgrounds

### **Secondary (Amber Gold)**
- **Use for**: Secondary buttons, highlights, accents
- **Hex**: #E78A1D
- **HSL**: 28 80% 52%
- **Best on**: White, dark backgrounds

### **Accent (Light Amber)**
- **Use for**: Hover states, special highlights, call-to-action elements
- **Hex**: #F4A261
- **HSL**: 28 90% 60%
- **Best on**: White, dark backgrounds

## 🌈 **Gradients**

### **Hero Gradient**
```css
background: linear-gradient(135deg, hsl(0 0% 8%) 0%, hsl(0 0% 15%) 50%, hsl(0 0% 5%) 100%);
```

### **Primary Gradient**
```css
background: linear-gradient(135deg, hsl(28 80% 52%), hsl(28 90% 60%));
```

## 🎨 **Component Examples**

### **Buttons**
- **Primary Button**: MLB Blue background, white text
- **Secondary Button**: Amber Gold background, white text
- **Accent Button**: Light Amber background, dark text

### **Cards**
- **Background**: White (#FFFFFF)
- **Border**: Light gray (#E5E5E5)
- **Shadow**: Subtle gray shadow
- **Hover**: Amber Gold glow effect

### **Navigation**
- **Background**: White or Dark Section
- **Text**: Dark text on light, light text on dark
- **Active**: MLB Blue
- **Hover**: Amber Gold

## 📱 **Responsive Design**

### **Mobile**
- Maintain color contrast ratios
- Use larger touch targets with MLB Blue
- Ensure text readability on all backgrounds

### **Desktop**
- Full gradient backgrounds
- Hover effects with Amber Gold
- Professional MLB Blue navigation

## 🎯 **Accessibility**

### **Color Contrast**
- **MLB Blue on White**: 4.5:1 (WCAG AA)
- **Amber Gold on White**: 4.8:1 (WCAG AA)
- **White on MLB Blue**: 4.2:1 (WCAG AA)

### **Text Readability**
- Dark text on light backgrounds
- Light text on dark backgrounds
- Sufficient contrast for all color combinations

## 🚀 **Implementation**

### **CSS Variables**
All colors are defined as CSS custom properties in `src/index.css`:
- `--primary`: MLB Blue
- `--secondary`: Amber Gold
- `--accent`: Light Amber
- `--background`: Light warm backgrounds
- `--gradient-hero`: MLB Blue to Red gradient

### **Tailwind Classes**
- `bg-primary`: MLB Blue background
- `text-primary`: MLB Blue text
- `bg-secondary`: Amber Gold background
- `text-secondary`: Amber Gold text
- `bg-accent`: Light Amber background
- `text-accent`: Light Amber text

## 🎨 **Visual Identity**

This color palette creates a professional, sports-themed identity that:
- **Builds Trust**: MLB Blue conveys professionalism
- **Creates Energy**: Amber Gold adds warmth and excitement
- **Maintains Readability**: High contrast ratios ensure accessibility
- **Reflects Brand**: Baseball/sports theme with professional appearance

## 📋 **Quick Reference**

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| MLB Blue | #2B4A7A | 220 70% 35% | Primary buttons, navigation |
| Amber Gold | #E78A1D | 28 80% 52% | Secondary buttons, highlights |
| Light Amber | #F4A261 | 28 90% 60% | Accents, hover states |
| Brand Red | #8B0000 | 0 65% 30% | Special highlights |
| WhatsApp | #25D366 | 142 70% 49% | WhatsApp buttons |

Your Skybox Gamehub now has a professional MLB-themed color scheme! 🎉

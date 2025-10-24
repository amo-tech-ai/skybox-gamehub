# Corporate Events Section - Implementation Todo List

## 🎯 **Project Overview**
Add a "Book Your Next Corporate Event / Party / Celebration" section to the Home page of `/home/sk/skybox/skybox-gamehub`.

## 📋 **Analysis Complete**

### **Current Home.tsx Structure**
1. **Hero Section** (lines 46-94) - Main banner with World Series content
2. **Promo Banner** (line 97) - LiveNowBanner component
3. **Upcoming Events** (lines 99-150) - Event cards grid
4. **Features Section** (lines 152-238) - Feature cards and testimonials
5. **Experience Section** (lines 241-327) - Two-column layout with CTA
6. **Back to Top Button** (lines 330-338) - Floating action button

### **Ideal Insertion Point**
**Location**: After the "Experience Section" (line 327) and before the "Back to Top Button" (line 330)
**Reasoning**: 
- Natural flow after showcasing the venue experience
- Before the footer/back-to-top elements
- Maintains visual hierarchy
- Perfect placement for conversion-focused content

## 🚀 **Implementation Tasks**

### **Phase 1: Component Creation**

**Task 1.1: Create CorporateEventsSection Component**
- **File**: `src/components/home/CorporateEventsSection.tsx`
- **Content**:
  - Compelling headline: "Host Your Next Corporate Event at Skybox"
  - Descriptive paragraph about venue benefits
  - Form with fields: Name, Email/WhatsApp, Date, Number of Guests
  - Primary CTA button: "Request Quote"
  - Secondary CTA: "Call Now" or "WhatsApp"

**Task 1.2: Form Field Specifications**
```tsx
interface CorporateEventForm {
  name: string;
  email: string;
  whatsapp: string;
  eventDate: string;
  guestCount: string;
  eventType: string;
  message: string;
}
```

**Task 1.3: Form Validation**
- Required fields: Name, Contact (Email OR WhatsApp), Date, Guest Count
- Email format validation
- Date validation (future dates only)
- Guest count validation (minimum 10, maximum 200)

### **Phase 2: Styling & Design**

**Task 2.1: Color Palette Integration**
- **Background**: Use `bg-background` or `bg-muted` for light sections
- **Primary Button**: `bg-primary` (MLB Blue #1E3A8A)
- **Secondary Button**: `bg-secondary` (Amber Gold)
- **Text**: `text-foreground` for headlines, `text-muted-foreground` for descriptions
- **Form Fields**: Use existing input styling from UI components

**Task 2.2: Typography Consistency**
- **Headline**: `text-4xl md:text-5xl font-bold` (matching other sections)
- **Subheadline**: `text-xl text-muted-foreground`
- **Form Labels**: `text-sm font-medium`
- **Button Text**: `text-lg font-semibold`

**Task 2.3: Layout Structure**
```tsx
<section className="py-16 bg-background">
  <div className="container px-4">
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Host Your Next Corporate Event at Skybox
        </h2>
        <p className="text-xl text-muted-foreground">
          Create unforgettable experiences for your team, clients, and celebrations
        </p>
      </div>
      
      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Benefits */}
        <div className="space-y-6">
          {/* Benefits list */}
        </div>
        
        {/* Right: Form */}
        <div className="bg-card p-8 rounded-lg shadow-lg">
          {/* Form fields */}
        </div>
      </div>
    </div>
  </div>
</section>
```

### **Phase 3: Responsive Design**

**Task 3.1: Mobile Optimization**
- **Breakpoints**: `sm:`, `md:`, `lg:`, `xl:`
- **Form Layout**: Stack vertically on mobile, side-by-side on desktop
- **Button Sizing**: Full-width on mobile, auto-width on desktop
- **Spacing**: Adjust padding and margins for mobile screens

**Task 3.2: Desktop Enhancement**
- **Grid Layout**: Two-column layout on large screens
- **Form Width**: Constrained to prevent excessive width
- **Visual Balance**: Ensure proper spacing and alignment

### **Phase 4: Integration**

**Task 4.1: Import and Insert**
- **File**: `src/pages/Home.tsx`
- **Import**: Add import for CorporateEventsSection
- **Insertion**: Add component after line 327, before Back to Top Button

**Task 4.2: Props and State Management**
- **Form State**: Use React useState for form fields
- **Validation**: Implement form validation logic
- **Submission**: Handle form submission (WhatsApp integration)

### **Phase 5: Testing & Validation**

**Task 5.1: Functionality Testing**
- **Form Submission**: Test all form fields
- **Validation**: Verify required field validation
- **Responsiveness**: Test on different screen sizes
- **Accessibility**: Ensure proper ARIA labels and keyboard navigation

**Task 5.2: Visual Testing**
- **Color Consistency**: Verify colors match design system
- **Typography**: Check font sizes and weights
- **Spacing**: Ensure consistent spacing with other sections
- **Mobile View**: Test on mobile devices

### **Phase 6: Deployment**

**Task 6.1: Code Review**
- **TypeScript**: Ensure proper typing
- **Performance**: Check for unnecessary re-renders
- **Accessibility**: Verify WCAG compliance
- **SEO**: Ensure proper semantic HTML

**Task 6.2: Version Control**
- **Commit Message**: "feat: Add corporate events section to home page"
- **Files Changed**: List all modified files
- **Testing Notes**: Document testing results

## 📁 **Files to Create/Modify**

### **New Files**
1. `src/components/home/CorporateEventsSection.tsx` - Main component
2. `src/components/home/CorporateEventForm.tsx` - Form component (optional)
3. `src/hooks/useCorporateEventForm.ts` - Form logic hook (optional)

### **Modified Files**
1. `src/pages/Home.tsx` - Add import and component
2. `src/index.css` - Add any custom styles if needed
3. `package.json` - Add any new dependencies if needed

## 🎨 **Design Specifications**

### **Color Scheme**
- **Primary**: MLB Blue (`hsl(220 70% 35%)` / `#1E3A8A`)
- **Secondary**: Amber Gold (`hsl(28 80% 52%)`)
- **Background**: Light cream (`hsl(30 40% 98%)`)
- **Text**: Dark gray (`hsl(0 0% 13%)`)

### **Typography**
- **Headline**: 4xl/5xl, bold, dark
- **Subheadline**: xl, medium weight, muted
- **Form Labels**: sm, medium weight
- **Button Text**: lg, semibold

### **Layout**
- **Container**: Max-width 4xl, centered
- **Grid**: 1 column mobile, 2 columns desktop
- **Spacing**: py-16 for section, mb-12 for headers
- **Form**: Card with padding and shadow

## ✅ **Success Criteria**

1. **Visual Integration**: Section blends seamlessly with existing design
2. **Functionality**: Form works correctly with validation
3. **Responsiveness**: Looks great on all device sizes
4. **Performance**: No impact on page load speed
5. **Accessibility**: Meets WCAG 2.1 AA standards
6. **User Experience**: Clear value proposition and easy form completion

## 🚀 **Next Steps**

1. **Start with Component Creation** - Build the CorporateEventsSection component
2. **Apply Styling** - Use existing design system colors and typography
3. **Test Responsiveness** - Ensure mobile and desktop compatibility
4. **Integrate into Home** - Add to Home.tsx at the identified location
5. **Final Testing** - Comprehensive testing before deployment

This todo list provides a complete roadmap for implementing the corporate events section with proper planning, design consistency, and thorough testing.

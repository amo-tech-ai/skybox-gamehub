# Color Fix Todo List - Remove Blue Sections

## 🎯 **Problem Identified**

The image shows the website still has:
- **Dark blue hero section background** (should be white or black)
- **Orange/green color scheme** (should be MLB blue/amber)
- **No changes visible** in browser preview

## 📋 **Root Causes Found**

1. **Hero Section**: Uses `bg-gradient-to-r from-black/80 via-black/60 to-black/40` - this creates a dark overlay
2. **Components**: Many components use `bg-primary` which maps to MLB Blue (220 70% 35%)
3. **Hardcoded Colors**: Some components have hardcoded blue colors
4. **Browser Cache**: Changes may not be loading due to caching

## 🚀 **Todo List - Code Changes Needed**

### **Phase 1: Fix Hero Section Background**

**File**: `src/pages/Home.tsx` (lines 47-94)

**Current Issue**: 
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
```

**Action Required**:
- Change hero section background from dark gradient to white or black
- Update text colors for proper contrast
- Remove or modify the dark overlay

**Code Changes**:
```tsx
// Replace the dark gradient with:
<div className="absolute inset-0 bg-white" />
// OR
<div className="absolute inset-0 bg-black" />
// OR remove the overlay entirely
```

### **Phase 2: Update Hardcoded Blue Colors**

**Files Found with Blue Colors**:

1. **`src/pages/TopTeams.tsx`** (line 21):
   ```tsx
   'NFL': 'bg-blue-600 hover:bg-blue-700',
   ```
   **Fix**: Change to `bg-primary` or `bg-secondary`

2. **`src/pages/SportsSchedule.tsx`** (line 25):
   ```tsx
   NFL: "bg-blue-600 hover:bg-blue-700",
   ```
   **Fix**: Change to `bg-primary` or `bg-secondary`

### **Phase 3: Update Component Backgrounds**

**Files with `bg-primary` that need review**:

1. **Hero Section Badge** (`src/pages/Home.tsx` line 60):
   ```tsx
   <div className="trending-badge bg-primary/90 text-primary-foreground">
   ```
   **Status**: ✅ This is correct - should use MLB Blue

2. **Section Backgrounds** - Check these files:
   - `src/pages/Gallery.tsx` (line 49): `bg-primary/5`
   - `src/pages/Menu.tsx` (line 96): `bg-primary/10`
   - `src/pages/Reserve.tsx` (line 148): `bg-primary/5`

   **Action**: These should be changed to `bg-background` or `bg-dark-section`

### **Phase 4: Force Browser Refresh**

**Actions**:
1. **Restart Development Server**:
   ```bash
   cd /home/sk/skybox/skybox-gamehub
   ./start-dev-server.sh
   ```

2. **Hard Browser Refresh**:
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or clear browser cache completely

3. **Verify CSS Loading**:
   - Check if `src/index.css` changes are being applied
   - Look for CSS variables in browser dev tools

### **Phase 5: Specific File Changes**

**Priority 1 - Hero Section**:
```tsx
// src/pages/Home.tsx - Line 55
// CHANGE FROM:
<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
// TO:
<div className="absolute inset-0 bg-white" />
// OR:
<div className="absolute inset-0 bg-black" />
```

**Priority 2 - Hardcoded Blue Colors**:
```tsx
// src/pages/TopTeams.tsx - Line 21
// CHANGE FROM:
'NFL': 'bg-blue-600 hover:bg-blue-700',
// TO:
'NFL': 'bg-primary hover:bg-primary/90',

// src/pages/SportsSchedule.tsx - Line 25
// CHANGE FROM:
NFL: "bg-blue-600 hover:bg-blue-700",
// TO:
NFL: "bg-primary hover:bg-primary/90",
```

**Priority 3 - Section Backgrounds**:
```tsx
// src/pages/Gallery.tsx - Line 49
// CHANGE FROM:
<section className="py-16 bg-primary/5">
// TO:
<section className="py-16 bg-background">

// src/pages/Menu.tsx - Line 96
// CHANGE FROM:
<div className="bg-primary/10 border-2 border-primary/20">
// TO:
<div className="bg-background border-2 border-border">

// src/pages/Reserve.tsx - Line 148
// CHANGE FROM:
<Card className="p-6 bg-primary/5">
// TO:
<Card className="p-6 bg-background">
```

## 🎯 **Expected Results After Changes**

1. **Hero Section**: White or black background instead of dark blue
2. **Color Scheme**: MLB Blue and Amber Gold instead of orange/green
3. **Section Backgrounds**: White or black instead of blue tints
4. **Buttons**: MLB Blue primary, Amber Gold secondary
5. **Overall**: Professional baseball theme with no blue section backgrounds

## 🚀 **Quick Test Commands**

```bash
# Restart server
cd /home/sk/skybox/skybox-gamehub
./start-dev-server.sh

# Open browser preview
./quick-browser.sh

# Check server status
curl -s -I http://localhost:8081 | head -1
```

## 📋 **Files to Modify**

1. **`src/pages/Home.tsx`** - Hero section background
2. **`src/pages/TopTeams.tsx`** - Remove hardcoded blue
3. **`src/pages/SportsSchedule.tsx`** - Remove hardcoded blue
4. **`src/pages/Gallery.tsx`** - Change section background
5. **`src/pages/Menu.tsx`** - Change section background
6. **`src/pages/Reserve.tsx`** - Change section background

This todo list addresses the specific code changes needed to remove blue sections and apply the MLB color scheme properly.

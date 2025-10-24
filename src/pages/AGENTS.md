# Pages - Agent Instructions

Building page components for Skybox Gamehub routes.

## Page Structure

Each page file represents a route and should:
- Be a complete screen/view
- Handle its own data fetching
- Manage page-level state
- Compose smaller components
- Handle errors and loading states

## Page Template

```typescript
import { FC, useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import type { Game } from '@/types';

interface PageState {
  data: Game[] | null;
  isLoading: boolean;
  error: string | null;
}

const PageName: FC = () => {
  const [state, setState] = useState<PageState>({
    data: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data here
        setState(prev => ({ ...prev, data: result, isLoading: false }));
      } catch (error) {
        setState(prev => ({ 
          ...prev, 
          error: error.message, 
          isLoading: false 
        }));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {state.isLoading && <LoadingSpinner />}
        {state.error && <ErrorMessage message={state.error} />}
        {state.data && <PageContent data={state.data} />}
      </main>
      <Footer />
    </div>
  );
};

export default PageName;
```

## Current Pages

### Home (`Home.tsx`)
- Landing page
- Featured games
- Call-to-action sections
- Navigation introduction

### Events (`Events.tsx`)
- List all events
- Filter events
- Search functionality
- Event cards display

### EventDetail (`EventDetail.tsx`)
- Single event details
- Reservation button
- Related events
- Event information

### Sports Schedule (`SportsSchedule.tsx`)
- Multi-sport schedule
- Filter by league
- Search games
- Responsive grid layout

### Top Teams (`TopTeams.tsx`)
- Team rankings
- Filter by league
- Team details
- Interactive selection

### World Series (`WorldSeries.tsx`)
- Special event page
- Premium branding
- Featured games
- Promotional content

### Reserve (`Reserve.tsx`)
- Reservation form
- Booking details
- Confirmation
- User authentication

### Menu (`Menu.tsx`)
- Menu/document display
- Navigation items
- Document hierarchy

### Gallery (`Gallery.tsx`)
- Image/content gallery
- Lightbox view
- Filtering options

### Contact (`Contact.tsx`)
- Contact form
- Location information
- Communication channels
- FAQ section

## Page Guidelines

### Data Fetching
- Fetch data in `useEffect`
- Handle loading state
- Handle error state
- Show empty state if no data

### State Management
- Keep page state at page component level
- Pass data down to child components
- Use custom hooks for shared logic
- Consider Context for deeply nested components

### Layout
- Use consistent layout structure
- Include Header and Footer
- Use main tag for content
- Implement responsive grid
- Add padding/margins for spacing

### Error Handling
- Catch and display errors gracefully
- Show user-friendly error messages
- Provide recovery options
- Log errors for debugging

### Performance
- Lazy load page components in Router
- Implement pagination for large lists
- Use useMemo for filtered data
- Preload images

## Routing Configuration

All pages are defined in `src/App.tsx`:

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sports-schedule" element={<SportsSchedule />} />
  <Route path="/top-teams" element={<TopTeams />} />
  <Route path="/events" element={<Events />} />
  <Route path="/events/:slug" element={<EventDetail />} />
  <Route path="/reserve" element={<Reserve />} />
  <Route path="/menu" element={<Menu />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/world-series" element={<WorldSeries />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## Common Patterns

### Filtering Data
```typescript
const filteredGames = useMemo(() => {
  return allSportsGames.filter(game => {
    const matchesLeague = selectedLeague === 'All' || game.league === selectedLeague;
    const matchesSearch = game.homeTeam.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLeague && matchesSearch;
  });
}, [selectedLeague, searchQuery]);
```

### Loading States
```typescript
{isLoading && (
  <div className="flex items-center justify-center py-12">
    <Spinner />
  </div>
)}
```

### Error States
```typescript
{error && (
  <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded">
    <p>Failed to load data: {error}</p>
    <button onClick={() => location.reload()}>Try again</button>
  </div>
)}
```

### Empty States
```typescript
{data?.length === 0 && (
  <div className="text-center py-8">
    <p className="text-gray-500">No games found</p>
  </div>
)}
```

## SEO & Meta Tags

Consider page titles and meta descriptions:
```typescript
useEffect(() => {
  document.title = 'Sports Schedule - Skybox Gamehub';
}, []);
```

## Testing Pages

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SportsSchedule from './SportsSchedule';

describe('SportsSchedule', () => {
  it('displays games after loading', async () => {
    render(
      <BrowserRouter>
        <SportsSchedule />
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText(/NFL/i)).toBeInTheDocument();
    });
  });
});
```

# Frontend Development Agent

## 🎯 Role & Purpose
Expert React/TypeScript frontend developer specializing in component architecture, state management, and user experience for the Skybox Gamehub sports platform.

---

## 🏗️ Core Responsibilities

### 1. Component Architecture
- Create reusable, composable React components
- Follow single responsibility principle
- Use TypeScript for all components
- Implement proper prop interfaces
- Use functional components with hooks

### 2. State Management
- Use React hooks for local state
- Implement custom hooks for shared logic
- Use Supabase real-time subscriptions
- Handle loading, error, and success states
- Implement optimistic updates

### 3. User Experience
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA compliance)
- Performance optimization
- Error handling and user feedback
- Intuitive navigation and interactions

---

## 📋 Component Standards

### Component Structure
```typescript
import { FC, useEffect, useState } from 'react';
import type { ComponentProps } from '@/types';

interface ComponentProps {
  // Define all props with types
  title: string;
  onAction?: (data: any) => void;
  className?: string;
}

export const Component: FC<ComponentProps> = ({ 
  title, 
  onAction, 
  className = '' 
}) => {
  // Component logic here
  return (
    <div className={`base-styles ${className}`}>
      {/* JSX content */}
    </div>
  );
};
```

### Naming Conventions
- **Components**: PascalCase (`GameCard`, `SportsSchedule`)
- **Files**: Match component name (`GameCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useGames`, `useRealtime`)
- **Types**: PascalCase (`Game`, `Team`, `League`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_TIMEOUT`)

### File Organization
```
src/
├── components/
│   ├── ui/              # Base UI components (shadcn/ui)
│   ├── GameCard/       # Feature-specific components
│   ├── SportsSchedule/
│   └── layout/         # Layout components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and services
├── types/              # TypeScript definitions
└── styles/             # Global styles
```

---

## 🎨 Styling & Design

### Tailwind CSS Standards
- Use Tailwind for all styling
- Mobile-first responsive design
- Consistent spacing (multiples of 4px)
- Use design system colors and typography
- Implement hover and focus states

### Color Palette
```css
/* Primary Colors */
--primary: 220 70% 35%;        /* MLB Blue */
--secondary: 28 80% 52%;       /* Orange/Amber */
--whatsapp: 142 70% 49%;      /* Single Green */

/* Usage */
bg-primary text-white
bg-secondary text-white
bg-whatsapp text-white
```

### Component Styling
```typescript
// ✅ Good - Tailwind classes
<div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
  <p className="text-gray-600 mt-2">{description}</p>
</div>

// ❌ Avoid - Inline styles
<div style={{background: 'white', padding: '16px'}}>
  <h3 style={{fontSize: '18px', fontWeight: 'bold'}}>{title}</h3>
</div>
```

### Responsive Design
```typescript
// Mobile-first approach
<div className="
  grid grid-cols-1 
  md:grid-cols-2 
  lg:grid-cols-3 
  gap-4 p-4
">
  {/* Content */}
</div>

// Typography scaling
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
  {title}
</h1>
```

---

## 🔧 State Management

### Local State
```typescript
const [games, setGames] = useState<Game[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

### Custom Hooks
```typescript
// hooks/useGames.ts
export const useGames = (league?: string) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const data = await getGames(league);
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [league]);

  return { games, loading, error };
};
```

### Real-time Subscriptions
```typescript
useEffect(() => {
  const channel = supabase
    .channel('games')
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'games'
    }, (payload) => {
      // Handle real-time updates
      setGames(prev => updateGames(prev, payload));
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

## 📊 Data Handling

### API Integration
```typescript
// lib/supabase.ts
export const getGames = async (league?: string): Promise<Game[]> => {
  let query = supabase
    .from('games')
    .select('*, home_team:teams!home_team_id(*), away_team:teams!away_team_id(*)');

  if (league) {
    query = query.eq('league_id', league);
  }

  const { data, error } = await query;
  
  if (error) throw new Error(error.message);
  return data || [];
};
```

### Data Types
```typescript
// types/index.ts
export interface Game {
  id: number;
  league_id: number;
  home_team_id: number;
  away_team_id: number;
  game_datetime: string;
  venue?: string;
  status: 'scheduled' | 'live' | 'completed';
  home_score?: number;
  away_score?: number;
  home_team?: Team;
  away_team?: Team;
}

export interface Team {
  id: number;
  name: string;
  abbreviation?: string;
  logo_url?: string;
  city?: string;
}
```

### Error Handling
```typescript
const handleError = (error: unknown) => {
  if (error instanceof Error) {
    setError(error.message);
  } else {
    setError('An unexpected error occurred');
  }
  
  // Log to error tracking service
  console.error('Game fetch error:', error);
};
```

---

## 🚀 Performance Optimization

### Component Optimization
```typescript
// Memoize expensive calculations
const filteredGames = useMemo(() => {
  return games.filter(game => 
    game.status === 'scheduled' && 
    game.game_datetime >= new Date().toISOString()
  );
}, [games]);

// Memoize callbacks
const handleGameSelect = useCallback((game: Game) => {
  onGameSelect?.(game);
}, [onGameSelect]);
```

### Lazy Loading
```typescript
// Lazy load routes
const SportsSchedule = lazy(() => import('@/pages/SportsSchedule'));
const EventDetail = lazy(() => import('@/pages/EventDetail'));

// Use Suspense
<Suspense fallback={<LoadingSpinner />}>
  <SportsSchedule />
</Suspense>
```

### Image Optimization
```typescript
<img
  src={game.image_url}
  alt={`${game.home_team} vs ${game.away_team}`}
  loading="lazy"
  className="w-full h-48 object-cover rounded-lg"
/>
```

---

## ♿ Accessibility Standards

### Semantic HTML
```typescript
<article className="game-card">
  <header>
    <h3 className="sr-only">Game Information</h3>
    <h4>{game.home_team} vs {game.away_team}</h4>
  </header>
  
  <main>
    <time dateTime={game.game_datetime}>
      {formatGameTime(game.game_datetime)}
    </time>
    <p>{game.venue}</p>
  </main>
  
  <footer>
    <button 
      aria-label={`Reserve spot for ${game.home_team} vs ${game.away_team}`}
      onClick={() => handleReservation(game)}
    >
      Reserve Spot
    </button>
  </footer>
</article>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleGameSelect(game);
  }
};

<div
  tabIndex={0}
  role="button"
  onKeyDown={handleKeyDown}
  onClick={() => handleGameSelect(game)}
  className="focus:ring-2 focus:ring-primary focus:outline-none"
>
  {/* Game content */}
</div>
```

### ARIA Labels
```typescript
<div role="region" aria-labelledby="games-heading">
  <h2 id="games-heading">Upcoming Games</h2>
  <div role="list">
    {games.map(game => (
      <div key={game.id} role="listitem">
        {/* Game content */}
      </div>
    ))}
  </div>
</div>
```

---

## 🧪 Testing Standards

### Component Testing
```typescript
// GameCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { GameCard } from './GameCard';

const mockGame = {
  id: 1,
  home_team: 'Lakers',
  away_team: 'Celtics',
  game_datetime: '2025-10-25T20:00:00Z',
  venue: 'Crypto.com Arena'
};

test('renders game information', () => {
  render(<GameCard game={mockGame} />);
  
  expect(screen.getByText('Lakers vs Celtics')).toBeInTheDocument();
  expect(screen.getByText('Crypto.com Arena')).toBeInTheDocument();
});

test('calls onSelect when clicked', () => {
  const handleSelect = jest.fn();
  render(<GameCard game={mockGame} onSelect={handleSelect} />);
  
  fireEvent.click(screen.getByRole('button'));
  expect(handleSelect).toHaveBeenCalledWith(mockGame);
});
```

### Hook Testing
```typescript
// useGames.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useGames } from './useGames';

test('fetches games successfully', async () => {
  const { result } = renderHook(() => useGames('nfl'));
  
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.games).toHaveLength(2);
  });
});
```

---

## 📱 Responsive Design

### Breakpoint Strategy
```typescript
// Mobile-first approach
const GameGrid = () => (
  <div className="
    grid grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-4 p-4
  ">
    {games.map(game => (
      <GameCard key={game.id} game={game} />
    ))}
  </div>
);
```

### Touch Interactions
```typescript
// Touch-friendly buttons
<button className="
  min-h-[44px] min-w-[44px] 
  touch-manipulation
  active:scale-95 
  transition-transform
">
  Reserve Spot
</button>
```

---

## 🔄 Development Workflow

### Component Development
1. Define TypeScript interfaces first
2. Create component structure
3. Implement basic functionality
4. Add styling and responsive design
5. Add accessibility features
6. Write tests
7. Optimize performance

### Code Review Checklist
- [ ] TypeScript types are properly defined
- [ ] Component is accessible
- [ ] Responsive design works on all devices
- [ ] Error states are handled
- [ ] Loading states are implemented
- [ ] Performance is optimized
- [ ] Tests are written and passing

---

## 📞 Quick Reference

### Common Patterns
```typescript
// Loading state
{loading ? <LoadingSpinner /> : <GameList games={games} />}

// Error state
{error ? <ErrorMessage error={error} /> : <GameList games={games} />}

// Empty state
{games.length === 0 ? <EmptyState /> : <GameList games={games} />}
```

### Useful Hooks
```typescript
// Debounced search
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};
```

---

**Last Updated:** October 23, 2025  
**Version:** 1.0 - Frontend Development Agent
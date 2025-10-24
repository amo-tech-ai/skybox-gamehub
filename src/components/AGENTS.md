# Component Development Agent

## 🎯 Role & Purpose
Expert React component developer specializing in reusable UI components, design system implementation, and component architecture for the Skybox Gamehub platform.

---

## 🏗️ Component Architecture

### Component Hierarchy
```
components/
├── ui/                    # Base UI components (shadcn/ui)
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Badge.tsx
├── GameCard/             # Game-specific components
│   ├── GameCard.tsx
│   ├── GameCard.test.tsx
│   └── index.ts
├── SportsSchedule/       # Sports schedule components
│   ├── SportsSchedule.tsx
│   ├── FilterChips.tsx
│   └── GameList.tsx
├── events/               # Event-related components
│   ├── EventCard.tsx
│   ├── EventDetail.tsx
│   └── EventBookingCTA.tsx
└── layout/               # Layout components
    ├── Header.tsx
    ├── Footer.tsx
    └── Navigation.tsx
```

### Component Standards

#### File Structure
```typescript
// GameCard.tsx
import { FC } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  onSelect?: (game: Game) => void;
  className?: string;
}

export const GameCard: FC<GameCardProps> = ({ 
  game, 
  onSelect, 
  className = '' 
}) => {
  return (
    <Card className={`game-card ${className}`}>
      {/* Component content */}
    </Card>
  );
};
```

#### Component Naming
- **Components**: PascalCase (`GameCard`, `SportsSchedule`)
- **Files**: Match component name (`GameCard.tsx`)
- **Props Interface**: `ComponentNameProps` (`GameCardProps`)
- **CSS Classes**: kebab-case (`game-card`, `sports-schedule`)

---

## 🎨 Design System Implementation

### Color Usage
```typescript
// ✅ Correct color usage
<div className="bg-primary text-white">Primary content</div>
<div className="bg-secondary text-white">Secondary content</div>
<div className="bg-whatsapp text-white">WhatsApp integration</div>

// ❌ Avoid hardcoded colors
<div className="bg-blue-500 text-white">Don't do this</div>
```

### Typography Scale
```typescript
// Headings
<h1 className="text-4xl md:text-5xl font-bold">Main Title</h1>
<h2 className="text-2xl md:text-3xl font-semibold">Section Title</h2>
<h3 className="text-xl md:text-2xl font-medium">Card Title</h3>

// Body text
<p className="text-base text-gray-700">Body text</p>
<p className="text-sm text-gray-600">Small text</p>
```

### Spacing System
```typescript
// Consistent spacing (multiples of 4px)
<div className="p-4 m-2">     // 16px padding, 8px margin
<div className="p-6 m-4">     // 24px padding, 16px margin
<div className="p-8 m-6">     // 32px padding, 24px margin
```

---

## 🧩 Component Patterns

### Card Components
```typescript
interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ 
  title, 
  subtitle, 
  image, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`
      bg-white rounded-lg shadow-md 
      hover:shadow-lg transition-shadow
      p-6 ${className}
    `}>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {subtitle && (
        <p className="text-gray-600 mb-4">{subtitle}</p>
      )}
      
      {children}
    </div>
  );
};
```

### List Components
```typescript
interface GameListProps {
  games: Game[];
  onGameSelect?: (game: Game) => void;
  loading?: boolean;
  error?: string | null;
}

export const GameList: FC<GameListProps> = ({ 
  games, 
  onGameSelect, 
  loading = false, 
  error = null 
}) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (games.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {games.map(game => (
        <GameCard 
          key={game.id} 
          game={game} 
          onSelect={onGameSelect}
        />
      ))}
    </div>
  );
};
```

### Form Components
```typescript
interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const SearchInput: FC<SearchInputProps> = ({ 
  placeholder = "Search...", 
  value, 
  onChange, 
  onSearch 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-4 py-2 pr-10 
          border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-primary focus:border-transparent
        "
      />
      <button
        type="submit"
        className="
          absolute right-2 top-1/2 transform -translate-y-1/2
          p-1 text-gray-400 hover:text-gray-600
        "
      >
        <SearchIcon className="w-5 h-5" />
      </button>
    </form>
  );
};
```

---

## 📱 Responsive Components

### Mobile-First Design
```typescript
const ResponsiveGrid = () => (
  <div className="
    grid grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    gap-4 p-4
  ">
    {/* Grid items */}
  </div>
);
```

### Responsive Typography
```typescript
const ResponsiveHeading = ({ children }: { children: React.ReactNode }) => (
  <h1 className="
    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
    font-bold text-gray-900
  ">
    {children}
  </h1>
);
```

### Touch-Friendly Components
```typescript
const TouchButton = ({ children, onClick }: TouchButtonProps) => (
  <button
    onClick={onClick}
    className="
      min-h-[44px] min-w-[44px]
      touch-manipulation
      active:scale-95
      transition-transform
      bg-primary text-white
      rounded-lg px-4 py-2
    "
  >
    {children}
  </button>
);
```

---

## ♿ Accessibility Components

### Accessible Cards
```typescript
interface AccessibleCardProps {
  title: string;
  description: string;
  onAction?: () => void;
  children?: React.ReactNode;
}

export const AccessibleCard: FC<AccessibleCardProps> = ({ 
  title, 
  description, 
  onAction, 
  children 
}) => {
  return (
    <article 
      className="bg-white rounded-lg shadow-md p-6"
      role="article"
      aria-labelledby={`${title}-heading`}
    >
      <header>
        <h3 id={`${title}-heading`} className="text-xl font-semibold">
          {title}
        </h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </header>
      
      <main className="mt-4">
        {children}
      </main>
      
      {onAction && (
        <footer className="mt-4">
          <button
            onClick={onAction}
            className="
              bg-primary text-white px-4 py-2 rounded-lg
              hover:bg-primary-dark focus:ring-2 focus:ring-primary
            "
            aria-label={`Action for ${title}`}
          >
            Action
          </button>
        </footer>
      )}
    </article>
  );
};
```

### Keyboard Navigation
```typescript
const KeyboardNavigableList = ({ items, onSelect }: ListProps) => {
  const handleKeyDown = (event: React.KeyboardEvent, item: any) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(item);
    }
  };

  return (
    <div role="list" className="space-y-2">
      {items.map(item => (
        <div
          key={item.id}
          role="listitem"
          tabIndex={0}
          onKeyDown={(e) => handleKeyDown(e, item)}
          onClick={() => onSelect(item)}
          className="
            p-4 border rounded-lg cursor-pointer
            hover:bg-gray-50 focus:ring-2 focus:ring-primary
            focus:outline-none
          "
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

---

## 🎭 Animation Components

### Hover Effects
```typescript
const HoverCard = ({ children, className = '' }: CardProps) => (
  <div className={`
    transform transition-all duration-200
    hover:scale-105 hover:shadow-lg
    ${className}
  `}>
    {children}
  </div>
);
```

### Loading States
```typescript
const LoadingCard = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);
```

### Transition Components
```typescript
const FadeIn = ({ children, delay = 0 }: FadeInProps) => (
  <div 
    className="
      opacity-0 animate-fade-in
    "
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);
```

---

## 🧪 Component Testing

### Test Structure
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

describe('GameCard', () => {
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

  test('is accessible', () => {
    render(<GameCard game={mockGame} />);
    
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });
});
```

### Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<GameCard game={mockGame} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 📦 Component Composition

### Compound Components
```typescript
// GameCard compound component
const GameCard = ({ children, ...props }) => (
  <Card {...props}>{children}</Card>
);

const GameCardHeader = ({ children }) => (
  <header className="mb-4">{children}</header>
);

const GameCardTitle = ({ children }) => (
  <h3 className="text-xl font-semibold">{children}</h3>
);

const GameCardContent = ({ children }) => (
  <main className="space-y-2">{children}</main>
);

const GameCardActions = ({ children }) => (
  <footer className="mt-4">{children}</footer>
);

// Usage
<GameCard>
  <GameCardHeader>
    <GameCardTitle>Lakers vs Celtics</GameCardTitle>
  </GameCardHeader>
  <GameCardContent>
    <p>October 25, 2025 at 8:00 PM</p>
    <p>Crypto.com Arena</p>
  </GameCardContent>
  <GameCardActions>
    <button>Reserve Spot</button>
  </GameCardActions>
</GameCard>
```

### Render Props Pattern
```typescript
interface DataFetcherProps<T> {
  fetchData: () => Promise<T>;
  children: (data: {
    data: T | null;
    loading: boolean;
    error: string | null;
  }) => React.ReactNode;
}

export const DataFetcher = <T,>({ fetchData, children }: DataFetcherProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [fetchData]);

  return <>{children({ data, loading, error })}</>;
};
```

---

## 🚀 Performance Optimization

### Memoization
```typescript
const GameCard = memo<GameCardProps>(({ game, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect?.(game);
  }, [game, onSelect]);

  return (
    <Card onClick={handleClick}>
      {/* Card content */}
    </Card>
  );
});
```

### Lazy Loading
```typescript
const LazyGameCard = lazy(() => import('./GameCard'));

const GameList = ({ games }: GameListProps) => (
  <Suspense fallback={<LoadingCard />}>
    {games.map(game => (
      <LazyGameCard key={game.id} game={game} />
    ))}
  </Suspense>
);
```

---

## 📞 Quick Reference

### Common Props
```typescript
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface InteractiveProps extends BaseComponentProps {
  onClick?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}
```

### CSS Classes
```typescript
// Common utility classes
const styles = {
  card: 'bg-white rounded-lg shadow-md p-6',
  button: 'bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark',
  input: 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  flex: 'flex items-center justify-between',
  text: {
    heading: 'text-xl font-semibold text-gray-900',
    body: 'text-base text-gray-700',
    caption: 'text-sm text-gray-600'
  }
};
```

---

**Last Updated:** October 23, 2025  
**Version:** 1.0 - Component Development Agent
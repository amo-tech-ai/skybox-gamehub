# Skybox Gamehub - Project Instructions

## 📋 Overview
Skybox Gamehub is a comprehensive sports viewing platform displaying schedules and information for multiple sports leagues (NFL, NHL, NBA, MLB, Soccer) with real-time updates and reservations.

---

## 🎯 Code Style & Standards

### TypeScript & JavaScript
- Use **TypeScript** for all new files (`.ts`, `.tsx`)
- Enable strict mode in all TypeScript files
- Define explicit types for function parameters and return values
- Use interfaces for object shapes, types for unions/primitives
- Avoid `any` type - use `unknown` and type narrowing instead

### React
- Prefer **functional components** with hooks over class components
- Use `React.FC<Props>` for component typing
- Extract hooks for reusable logic
- Keep components focused and single-responsibility
- Use `useCallback` for memoized callbacks
- Use `useMemo` for expensive computations

### Naming Conventions
- **Files**: PascalCase for components (`GameCard.tsx`), kebab-case for utilities (`format-date.ts`)
- **Functions**: camelCase (`calculateTotal`, `formatDate`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRIES`, `API_TIMEOUT`)
- **Database**: snake_case for columns (`game_datetime`, `home_team_id`)
- **CSS Classes**: kebab-case (`game-card`, `score-display`)

### Code Organization
- One component per file
- Group related functions in modules
- Keep files under 300 lines
- Export named exports instead of default when possible for utilities
- Use barrel exports (index.ts) for logical grouping

---

## 🏗️ Architecture & Patterns

### Folder Structure
```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI components (button, card, etc.)
│   ├── GameCard/
│   ├── SportsSchedule/
│   └── layout/       # Layout components (Header, Footer)
├── pages/            # Page components (routes)
├── hooks/            # Custom React hooks
├── data/             # Static data and utilities
├── lib/              # Utilities and helpers
├── types/            # TypeScript type definitions
└── styles/           # Global styles
```

### Design Patterns

#### Repository Pattern
- Create service layer functions for data fetching
- Example: `src/lib/supabase.ts` for database operations
- Separate business logic from components

#### Custom Hooks
- Use for shared state logic
- Prefix with `use` (e.g., `useRealtimeGames`)
- Return consistent interfaces
- Handle loading, error, and data states

#### Component Structure
```typescript
import { FC, useEffect, useState } from 'react';
import type { Game } from '@/types';

interface GameCardProps {
  game: Game;
  onSelect?: (game: Game) => void;
}

export const GameCard: FC<GameCardProps> = ({ game, onSelect }) => {
  return (
    // JSX
  );
};
```

### Business Logic
- Keep in service layer (e.g., `src/lib/gameService.ts`)
- Don't put business logic in components
- Create utility functions for calculations
- Use custom hooks for state management patterns

---

## 🗄️ Database & Supabase

### Schema Standards
- Use `snake_case` for all column names
- Add timestamps: `created_at`, `updated_at`
- Use `BIGINT` for IDs (`GENERATED ALWAYS AS IDENTITY`)
- Use `TEXT` for strings, `NUMERIC(10,2)` for prices
- Use `TIMESTAMP WITH TIME ZONE` for dates

### Data Models
- Games: `games` table with league, teams, datetime
- Teams: `teams` table linked to leagues
- Leagues: `leagues` table (NFL, NHL, NBA, MLB, Soccer)
- Reservations: `reservations` table for bookings
- Users: `users` table for authentication

### Security
- Enable Row Level Security (RLS) on all tables
- Use RLS policies for user data isolation
- Never expose service role keys in frontend
- Always validate input on the server
- Use SECURITY INVOKER for functions

### Migrations
- Use timestamp-based naming: `YYYY-MM-DD-HH-MM-SS_description.sql`
- Make migrations idempotent (`IF NOT EXISTS`, `IF EXISTS`)
- Include rollback documentation
- Test migrations before deployment

---

## 🎨 UI & Styling

### Tailwind CSS
- Use Tailwind for all styling
- Follow responsive design: mobile-first
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Use consistent spacing: multiples of 4px (p-4, m-8, etc.)

### Component Styling
```typescript
// ✅ Good - Tailwind classes in component
export const GameCard = () => (
  <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
    {/* content */}
  </div>
);

// ❌ Avoid - Inline styles
export const GameCard = () => (
  <div style={{background: 'white', padding: '16px'}}>
    {/* content */}
  </div>
);
```

### Design System
- Use existing shadcn/ui components when available
- Maintain consistent color palette
- Use consistent typography scales
- Follow accessibility standards (WCAG 2.1 AA)

---

## 📦 Data Handling

### Import Data
Located in `src/data/`:
- `nfl_games_2025.ts` - NFL games
- `nhl_games_2026.ts` - NHL games
- `mlb_games_2025.ts` - MLB games
- `topTeams.ts` - Top teams across leagues
- `colombian_football_2025.ts` - Colombian football
- `allSports.ts` - Combined all sports data

### Data Types
```typescript
export type Game = {
  id: string;
  league: 'NFL' | 'NHL' | 'MLB' | 'NBA' | 'Soccer';
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  network: string[];
  status?: 'scheduled' | 'live' | 'completed';
  score?: { home: number; away: number };
};
```

### Filtering & Searching
- Use `useMemo` for filtered data
- Implement case-insensitive search
- Support multi-field filtering
- Show loading states during data operations

---

## 🚀 Performance

### Optimization
- Lazy load routes with `React.lazy()` and `Suspense`
- Use `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Optimize images (use appropriate formats and sizes)
- Implement pagination for large lists

### Monitoring
- Monitor Core Web Vitals (LCP, FID, CLS)
- Track performance metrics
- Log errors to external service
- Profile components with React DevTools

---

## 🔐 Security

### Authentication & Authorization
- Use Supabase Auth for user authentication
- Check user permissions before operations
- Validate input on frontend and backend
- Never trust client-side validation alone

### API Security
- Use environment variables for sensitive data
- Implement rate limiting
- Validate all inputs
- Use HTTPS only (enforced by Vite)

### Data Protection
- Encrypt sensitive data in transit
- Use RLS for data isolation
- Implement user-specific data fetching
- Sanitize user inputs

---

## 🧪 Testing

### Unit Tests
- Test pure functions and utilities
- Test component rendering and interactions
- Mock external dependencies
- Aim for 80%+ coverage on critical paths

### Integration Tests
- Test data flow between components
- Test API interactions
- Test filtering and search
- Test real-time subscriptions

### Testing Tools
- Use Vitest for unit testing
- Use React Testing Library for component tests
- Use MSW for API mocking
- Use Playwright for E2E testing

---

## 📝 Error Handling

### Error Messages
- Provide user-friendly error messages
- Log technical details server-side
- Don't expose sensitive information
- Offer recovery options

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Error:', error, errorInfo);
    // Send to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Try-Catch Patterns
- Wrap async operations in try-catch
- Handle specific error types
- Provide fallback UI
- Clean up resources in finally blocks

---

## 🌍 Features & Functionality

### Sports Schedule
- Display games across multiple leagues
- Filter by league, date, teams
- Search by team or venue
- Sort by date, league, or popularity
- Show real-time status updates

### Top Teams
- Display rankings by league
- Show team stats and records
- Interactive team details
- Filter by league

### Reservations
- User authentication
- Booking/reservation system
- Confirmation emails
- Manage bookings

### Real-time
- Live game scores
- Status updates
- WebSocket connections
- Auto-refresh data

---

## 📚 Documentation

### Code Comments
- Comment complex logic only
- Use JSDoc for public functions
- Keep comments up-to-date
- Explain "why" not "what"

### Commit Messages
- Use conventional commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`
- Example: `feat: add live score updates for games`
- Write descriptive messages

### API Documentation
- Document Supabase functions
- Document Edge Functions
- Include request/response examples
- Document error cases

---

## 🎯 Supabase-Specific

### Edge Functions
- Located in `supabase/functions/`
- Use Deno runtime
- Write in TypeScript
- Export default serve handler
- Use environment variables for secrets

### Real-time Subscriptions
- Use `supabase.channel()` for subscriptions
- Implement proper cleanup on unmount
- Handle connection states
- Respect RLS policies

### Migrations
- Located in `supabase/migrations/`
- Use timestamp-based naming
- Make idempotent
- Document changes

---

## 🔄 Workflow

### Development
1. Create feature branch from main
2. Follow code style guidelines
3. Test locally
4. Create pull request
5. Request review
6. Merge after approval

### Deployment
1. Run tests locally
2. Build production bundle
3. Test build
4. Deploy to staging
5. Test on staging
6. Deploy to production

### Environment Variables
- `.env.local` for development
- `.env.example` for documentation
- Never commit `.env` files
- Use `.gitignore` to prevent accidental commits

---

## 📞 Reference

### Key Files
- `src/App.tsx` - Main router
- `src/lib/supabase.ts` - Supabase client
- `src/data/allSports.ts` - Combined sports data
- `.cursor/rules/` - Cursor AI rules
- `supabase/migrations/` - Database migrations

### Related Documentation
- [Supabase Architecture Plan](./supabase/plan/08_SUPABASE_ARCHITECTURE_PLAN.md)
- [Database Summary](./supabase/plan/01_DATABASE_SUMMARY.md)
- [Environment Setup](./supabase/plan/03_SUPABASE_ENV_SETUP.md)
- [Cursor Rules](./AGENTS.md) - This file

---

## ✅ Pre-Commit Checklist

- [ ] Code follows TypeScript/React standards
- [ ] Components are functional and use hooks
- [ ] No `any` types without good reason
- [ ] Database columns use snake_case
- [ ] Environment variables are set
- [ ] Tests pass locally
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Error handling implemented
- [ ] Security best practices followed

---

**Last Updated:** October 23, 2025  
**Version:** 1.0 - Production Ready
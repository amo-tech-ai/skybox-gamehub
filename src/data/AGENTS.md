# Data Layer - Agent Instructions

Sports data and static content for Skybox Gamehub.

## Data Files Overview

### Sports Data Files

#### `nfl_games_2025.ts`
- 19 NFL games (October - December 2025)
- Regular season games
- Includes times, venues, broadcast networks
- Export: `nflGames` (Game[])

#### `nhl_games_2026.ts`
- 45 NHL games (October 2025 - January 2026)
- Regular season games
- Includes broadcast information
- Export: `nhlGames` (Game[])

#### `mlb_games_2025.ts`
- 7 MLB World Series games
- Post-season games
- Special event data
- Export: `mlbGames` (Game[])

#### `colombian_football_2025.ts`
- 6 Colombian football matches
- Medellín clubs focus
- Local team information
- Export: `colombianFootballMatches` (Game[])

#### `topTeams.ts`
- 50 top teams across leagues
- Rankings and statistics
- Team information with logos
- Export: `topTeams` (Team[])

#### `allSports.ts`
- Combined data from all sports
- Unified data structure
- Helper functions for filtering
- Export: `allSportsGames` (Game[])

### Data Types

```typescript
export type Game = {
  id: string;
  league: 'NFL' | 'NHL' | 'MLB' | 'NBA' | 'Soccer';
  homeTeam: string;
  awayTeam: string;
  date: string;           // YYYY-MM-DD format
  time: string;           // HH:MM format (ET/CT)
  venue: string;
  network: string[];
  status?: 'scheduled' | 'live' | 'completed' | 'postponed';
  score?: {
    home: number;
    away: number;
  };
};

export type Team = {
  id: string;
  name: string;
  league: 'NFL' | 'NHL' | 'NBA' | 'MLB' | 'Soccer';
  city?: string;
  logo?: string;
  record?: {
    wins: number;
    losses: number;
    draws?: number;
  };
  ranking?: number;
};
```

## Data Standards

### Game Objects
- `id`: Unique identifier (format: `league-date-teams`)
- `league`: One of supported leagues
- `date`: ISO format YYYY-MM-DD
- `time`: 24-hour format with timezone indicator
- `network`: Array of broadcast networks
- All fields required except `score` and `status`

### Team Objects
- `id`: Unique identifier
- `name`: Full team name
- `league`: Specific league
- Logo URLs should be HTTPS
- Rankings are numeric (1 = best)

## Data Organization

### File Structure
```
src/data/
├── nfl_games_2025.ts
├── nhl_games_2026.ts
├── mlb_games_2025.ts
├── colombian_football_2025.ts
├── topTeams.ts
├── allSports.ts
└── README.md (optional)
```

### Import Pattern
```typescript
// In component
import { allSportsGames } from '@/data/allSports';
import { topTeams } from '@/data/topTeams';

// Specific sports
import { nflGames } from '@/data/nfl_games_2025';
```

## Data Processing

### Filtering
```typescript
// By league
const nflGames = allSportsGames.filter(g => g.league === 'NFL');

// By date range
const upcomingGames = allSportsGames.filter(g => {
  const gameDate = new Date(g.date);
  return gameDate >= new Date() && gameDate <= endDate;
});

// By search term
const searchResults = allSportsGames.filter(g =>
  g.homeTeam.toLowerCase().includes(query.toLowerCase()) ||
  g.awayTeam.toLowerCase().includes(query.toLowerCase())
);
```

### Sorting
```typescript
// By date (ascending)
games.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

// By league then date
games.sort((a, b) => {
  if (a.league !== b.league) return a.league.localeCompare(b.league);
  return new Date(a.date).getTime() - new Date(b.date).getTime();
});
```

### Grouping
```typescript
// By league
const grouped = allSportsGames.reduce((acc, game) => {
  if (!acc[game.league]) acc[game.league] = [];
  acc[game.league].push(game);
  return acc;
}, {} as Record<string, Game[]>);

// By date
const byDate = allSportsGames.reduce((acc, game) => {
  if (!acc[game.date]) acc[game.date] = [];
  acc[game.date].push(game);
  return acc;
}, {} as Record<string, Game[]>);
```

## Data Validation

### Game Validation
```typescript
function validateGame(game: unknown): game is Game {
  if (typeof game !== 'object' || game === null) return false;
  
  const g = game as Record<string, unknown>;
  
  return (
    typeof g.id === 'string' &&
    typeof g.league === 'string' &&
    ['NFL', 'NHL', 'MLB', 'NBA', 'Soccer'].includes(g.league as string) &&
    typeof g.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(g.date as string)
  );
}
```

## Adding New Data

### Steps to Add New Sport
1. Create new data file: `src/data/[sport]_games_[year].ts`
2. Export array of Game objects
3. Add import to `src/data/allSports.ts`
4. Update allSportsGames array
5. Export game type in main data file

### Adding Teams
1. Update `topTeams.ts` with Team objects
2. Include logo URLs (HTTPS)
3. Add rankings for comparisons
4. Format team names consistently

## Data Sources

### Current Data
- NFL: Official NFL schedule
- NHL: Official NHL schedule
- MLB: World Series schedule
- Soccer: Colombian football matches
- Teams: Official team information

### Updating Data
- Manual updates to TypeScript files
- Future: Sync from Supabase database
- Real-time updates via webhooks

## Performance Considerations

### Memoization
```typescript
const filteredGames = useMemo(() => {
  return allSportsGames.filter(/* condition */);
}, [dependency]);
```

### Large Datasets
- Implement pagination for UI
- Use useMemo for calculations
- Lazy load data as needed
- Consider virtual scrolling for lists

### Caching
- Data is loaded once per session
- Use Context API for global sharing
- Consider Redux for complex state
- Implement refresh strategies

## Type Safety

### Always Type Data
```typescript
// ✅ Good
const games: Game[] = allSportsGames;
const filtered = games.filter(g => g.league === 'NFL');

// ❌ Avoid
const games: any = allSportsGames;
```

### Type Guards
```typescript
function getGameScore(game: Game): string {
  if (game.score) {
    return `${game.score.home}-${game.score.away}`;
  }
  return 'TBA';
}
```

## Testing Data

### Mock Data
```typescript
const mockGame: Game = {
  id: 'test-1',
  league: 'NFL',
  homeTeam: 'Test Team 1',
  awayTeam: 'Test Team 2',
  date: '2025-10-25',
  time: '15:00',
  venue: 'Test Venue',
  network: ['Test Network']
};
```

### Data Fixtures
- Create test data files
- Use for component testing
- Test filtering/sorting logic
- Validate display formatting

## Documentation

### Data File Template
```typescript
/**
 * NFL Games 2025 Season
 * 
 * Contains 19 regular season games from October through December 2025
 * Games include broadcast network information
 * 
 * @see https://www.nfl.com/schedules/2025/
 */

export type Game = { /* ... */ };

export const nflGames: Game[] = [
  // games data
];
```

## Best Practices

✅ Keep data types consistent
✅ Validate data on import
✅ Use descriptive variable names
✅ Document data sources
✅ Group related data together
✅ Use immutable data structures
✅ Cache expensive calculations
✅ Test data transformations
✅ Version data files with comments
✅ Handle missing data gracefully

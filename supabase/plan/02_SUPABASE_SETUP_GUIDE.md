# Supabase Sports Games Database Setup Guide

## Overview
This guide will help you set up a Supabase database for managing sports games (NFL, NBA, NHL, MLB) that Skybox will be showing.

## Architecture

### Tables

#### 1. `leagues`
- Stores league information (NFL, NBA, NHL, MLB)
- Linked to teams and games

```sql
id (PRIMARY KEY)
name (NFL, NBA, NHL, MLB)
slug (nfl, nba, nhl, mlb)
logo_url
created_at
updated_at
```

#### 2. `teams`
- All teams across all leagues
- Links to leagues via `league_id`

```sql
id (PRIMARY KEY)
league_id (FOREIGN KEY to leagues)
name (Team name)
abbreviation (3-letter code)
logo_url
city
created_at
```

#### 3. `games`
- Individual games with all metadata
- Tracks scheduled, live, completed games

```sql
id (PRIMARY KEY)
league_id (FOREIGN KEY)
home_team_id (FOREIGN KEY to teams)
away_team_id (FOREIGN KEY to teams)
game_date (DATE)
game_time (TIME)
game_datetime (TIMESTAMP)
venue (Stadium name)
broadcast_networks (CSV or array of networks)
status (scheduled, live, completed, postponed, cancelled)
home_score
away_score
week_number (for NFL/NBA/NHL)
season_year (2025, 2026, etc)
notes
created_at
updated_at
```

#### 4. `skybox_featured_games`
- Games that Skybox is actively promoting/showing
- Links games to featured status with special offers

```sql
id (PRIMARY KEY)
game_id (FOREIGN KEY to games)
featured_at (TIMESTAMP when featured)
display_priority (0=default, higher=featured)
is_promotional (true/false)
promotion_text (Custom text for game)
special_offers (JSON with drink/food specials)
created_at
updated_at
```

## Setup Steps

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Create new project
3. Name: `skybox-sports-db`
4. Region: Choose appropriate region (recommend US-East for latency)
5. Note your `Project URL` and `API Key` (anon/public)

### Step 2: Create Tables
1. Go to SQL Editor in Supabase dashboard
2. Copy and paste the SQL from: `/home/sk/skybox/skybox-gamehub/supabase/migrations/001_create_sports_games_schema.sql`
3. Run the SQL

### Step 3: Insert NFL Data
Use the TypeScript data file at:
- File: `/home/sk/skybox/skybox-gamehub/src/data/nfl_games_2025.ts`
- Contains all 18 NFL games from Oct 23 - Dec 25, 2025

**To insert data:**

Option A: Use Supabase SQL Editor directly
```sql
-- Insert leagues (done in migrations)
-- Then insert teams from the NFL seed data
-- Then insert games with proper foreign keys
```

Option B: Use the React App (see below)

### Step 4: Configure Environment Variables
Create `.env.local` in `/home/sk/skybox/skybox-gamehub/`:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 5: Install Supabase Client
```bash
cd /home/sk/skybox/skybox-gamehub
npm install @supabase/supabase-js
```

### Step 6: Create Supabase Client Hook
File: `/home/sk/skybox/skybox-gamehub/src/hooks/useSupabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const useSportsGames = () => {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase
        .from('games')
        .select(`
          *,
          home_team:teams!home_team_id(*),
          away_team:teams!away_team_id(*),
          league:leagues(*)
        `)
        .gte('game_datetime', new Date().toISOString())
        .order('game_datetime');
      
      setGames(data);
    };
    
    fetchGames();
  }, []);
  
  return games;
};
```

## Data Format for Other Sports

When you provide NHL, NBA, MLB data, I'll create similar structures:

### Expected Format:
```
Sport: [LEAGUE]
Date Range: [START] to [END]
Games:
- Date, Time, Team1 vs Team2, Venue, Broadcast Networks
- ...
```

## Query Examples

### Get all upcoming games (next 7 days)
```typescript
const { data } = await supabase
  .from('games')
  .select('*')
  .gte('game_datetime', new Date().toISOString())
  .lte('game_datetime', new Date(Date.now() + 7*24*60*60*1000).toISOString())
  .order('game_datetime');
```

### Get Skybox featured games
```typescript
const { data } = await supabase
  .from('skybox_featured_games')
  .select(`
    *,
    game:games(
      *,
      home_team:teams!home_team_id(*),
      away_team:teams!away_team_id(*)
    )
  `)
  .order('display_priority', { ascending: false });
```

### Get all NFL games
```typescript
const { data } = await supabase
  .from('games')
  .select('*')
  .eq('league_id', 1); // NFL is league_id 1
```

## Files Created

1. **SQL Migrations**
   - `/supabase/migrations/001_create_sports_games_schema.sql`

2. **Seed Data**
   - `/supabase/seed_data/nfl_games_2025.sql`

3. **TypeScript Data**
   - `/src/data/nfl_games_2025.ts`

4. **Setup Guide** (this file)
   - `/SUPABASE_SETUP_GUIDE.md`

## Next Steps

1. ✅ Create Supabase project
2. ✅ Run migrations
3. ✅ Insert NFL data
4. ⏳ Provide NHL, NBA, MLB data
5. ⏳ Create React hooks for data fetching
6. ⏳ Build games display components
7. ⏳ Setup featured games management page

## Testing

After setup, verify with Supabase SQL:
```sql
SELECT COUNT(*) as total_games FROM games;
SELECT COUNT(*) as featured FROM skybox_featured_games;
SELECT name, COUNT(*) as game_count FROM games g
JOIN leagues l ON g.league_id = l.id
GROUP BY l.name;
```

---

**Ready to add more sports data?** Send me the schedules for:
- 🏀 NBA (2025-2026 season)
- 🏒 NHL (2025-2026 season)
- ⚾ MLB (2026 season)

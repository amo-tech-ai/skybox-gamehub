# 🏗️ Supabase Architecture & Implementation Plan

## 📋 Overview

Complete Supabase implementation for Skybox Sports Platform including:
- ✅ Database Schema (Tables, Fields, Types)
- ✅ Authentication & Authorization (RLS Policies)
- ✅ Performance (Indexes, Triggers)
- ✅ Real-time Features (Webhooks)
- ✅ Serverless Functions (Edge Functions)
- ✅ Data Integrity (Constraints, Triggers)

---

## 🗄️ DATABASE SCHEMA

### 1. Core Tables

#### **A. Leagues Table**
```sql
Table: leagues
├── id (uuid, PRIMARY KEY)
├── name (VARCHAR, UNIQUE) - "NFL", "NHL", "NBA", "MLB", "Soccer"
├── slug (VARCHAR, UNIQUE) - "nfl", "nhl", "nba", "mlb", "soccer"
├── logo_url (TEXT) - League logo
├── description (TEXT)
├── country (VARCHAR) - "USA", "Canada", "Colombia"
├── season_year (INTEGER) - Current season
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Indexes:
- idx_leagues_slug (UNIQUE)
- idx_leagues_name (UNIQUE)
```

#### **B. Teams Table**
```sql
Table: teams
├── id (uuid, PRIMARY KEY)
├── league_id (uuid, FOREIGN KEY → leagues.id)
├── name (VARCHAR) - Full team name
├── abbreviation (VARCHAR) - 2-3 letter code
├── city (VARCHAR)
├── colors (JSONB) - ["Red", "Blue"]
├── logo_url (TEXT)
├── stadium (VARCHAR)
├── founded_year (INTEGER)
├── official_website (TEXT)
├── timezone (VARCHAR) - "ET", "CT", "MT", "PT", "COT"
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Indexes:
- idx_teams_league_id
- idx_teams_abbreviation
- idx_teams_city
```

#### **C. Games Table (Core)**
```sql
Table: games
├── id (uuid, PRIMARY KEY)
├── league_id (uuid, FOREIGN KEY → leagues.id)
├── home_team_id (uuid, FOREIGN KEY → teams.id)
├── away_team_id (uuid, FOREIGN KEY → teams.id)
├── game_date (DATE)
├── game_time (TIME)
├── game_datetime (TIMESTAMP) - Normalized UTC
├── venue (VARCHAR) - Stadium name
├── city (VARCHAR)
├── status (VARCHAR) - "scheduled", "live", "completed", "postponed", "cancelled"
├── broadcast_networks (JSONB) - ["FOX", "ESPN", "DirecTV"]
├── home_score (INTEGER)
├── away_score (INTEGER)
├── week_number (INTEGER) - For NFL/NBA/NHL
├── series_name (VARCHAR) - "2025 World Series"
├── season_year (INTEGER)
├── notes (TEXT)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── deleted_at (TIMESTAMP) - Soft delete

Indexes:
- idx_games_league_id
- idx_games_game_datetime
- idx_games_status
- idx_games_season_year
- idx_games_home_team_id
- idx_games_away_team_id
- idx_games_deleted_at
```

#### **D. Featured Games Table**
```sql
Table: skybox_featured_games
├── id (uuid, PRIMARY KEY)
├── game_id (uuid, FOREIGN KEY → games.id, UNIQUE)
├── featured_at (TIMESTAMP)
├── display_priority (INTEGER) - 0-100, higher = more featured
├── is_promotional (BOOLEAN)
├── promotion_text (TEXT) - "Derby Day", "Championship"
├── special_offers (JSONB) - Drink/food specials
├── max_capacity (INTEGER) - Table capacity
├── current_reservations (INTEGER)
├── price_multiplier (DECIMAL) - 1.0 = normal, 1.5 = 50% markup
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Indexes:
- idx_featured_games_game_id (UNIQUE)
- idx_featured_games_display_priority
- idx_featured_games_featured_at
```

#### **E. Users Table (Authentication)**
```sql
Table: users
├── id (uuid, PRIMARY KEY) - Supabase auth.users.id
├── email (VARCHAR)
├── phone (VARCHAR)
├── full_name (VARCHAR)
├── avatar_url (TEXT)
├── preferred_language (VARCHAR) - "en", "es"
├── timezone (VARCHAR)
├── role (VARCHAR) - "customer", "admin", "staff"
├── is_vip (BOOLEAN)
├── preferences (JSONB) - Notification, language, etc.
├── last_login_at (TIMESTAMP)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

Indexes:
- idx_users_email (UNIQUE)
- idx_users_phone
- idx_users_role
```

#### **F. Reservations Table**
```sql
Table: reservations
├── id (uuid, PRIMARY KEY)
├── user_id (uuid, FOREIGN KEY → users.id)
├── game_id (uuid, FOREIGN KEY → games.id)
├── table_number (VARCHAR)
├── number_of_guests (INTEGER)
├── status (VARCHAR) - "pending", "confirmed", "checked_in", "cancelled"
├── reserved_at (TIMESTAMP)
├── checked_in_at (TIMESTAMP)
├── special_requests (TEXT)
├── total_price (DECIMAL)
├── payment_status (VARCHAR) - "pending", "paid", "refunded"
├── whatsapp_number (VARCHAR)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── deleted_at (TIMESTAMP)

Indexes:
- idx_reservations_user_id
- idx_reservations_game_id
- idx_reservations_status
- idx_reservations_reserved_at
```

---

## 🔐 ROW LEVEL SECURITY (RLS) POLICIES

### Leagues Table
```sql
-- Everyone can read leagues
CREATE POLICY "leagues_read" ON leagues
FOR SELECT USING (true);

-- Only admins can insert/update
CREATE POLICY "leagues_write" ON leagues
FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

### Games Table
```sql
-- Everyone can read scheduled games
CREATE POLICY "games_read_public" ON games
FOR SELECT USING (status = 'scheduled' OR status = 'completed');

-- Admin can read all
CREATE POLICY "games_read_admin" ON games
FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Only admins can write
CREATE POLICY "games_write_admin" ON games
FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');
```

### Reservations Table
```sql
-- Users can read own reservations
CREATE POLICY "reservations_read_own" ON reservations
FOR SELECT USING (user_id = auth.uid());

-- Admin can read all
CREATE POLICY "reservations_read_admin" ON reservations
FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Users can create reservations
CREATE POLICY "reservations_create" ON reservations
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update own reservations
CREATE POLICY "reservations_update_own" ON reservations
FOR UPDATE USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());
```

---

## 🔧 DATABASE TRIGGERS

### 1. Update Timestamp Trigger
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_leagues_updated_at
  BEFORE UPDATE ON leagues FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at
  BEFORE UPDATE ON teams FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_games_updated_at
  BEFORE UPDATE ON games FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ... repeat for other tables
```

### 2. Game Status Update Trigger
```sql
CREATE OR REPLACE FUNCTION update_game_status()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.game_datetime < CURRENT_TIMESTAMP AND NEW.status = 'scheduled' THEN
    NEW.status = 'live';
  END IF;
  IF NEW.game_datetime + INTERVAL '4 hours' < CURRENT_TIMESTAMP 
     AND NEW.status = 'live' THEN
    NEW.status = 'completed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_game_status
  BEFORE UPDATE ON games FOR EACH ROW
  EXECUTE FUNCTION update_game_status();
```

### 3. Reservation Capacity Trigger
```sql
CREATE OR REPLACE FUNCTION check_reservation_capacity()
RETURNS TRIGGER AS $$
DECLARE
  current_reservations INTEGER;
  max_capacity INTEGER;
BEGIN
  SELECT current_reservations, max_capacity INTO current_reservations, max_capacity
  FROM skybox_featured_games
  WHERE game_id = NEW.game_id;

  IF current_reservations >= max_capacity THEN
    RAISE EXCEPTION 'Game at full capacity';
  END IF;

  UPDATE skybox_featured_games
  SET current_reservations = current_reservations + NEW.number_of_guests
  WHERE game_id = NEW.game_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_capacity
  BEFORE INSERT ON reservations FOR EACH ROW
  EXECUTE FUNCTION check_reservation_capacity();
```

---

## ⚡ INDEXES (Performance)

### Games Table
```sql
-- Query optimization for upcoming games
CREATE INDEX idx_games_upcoming 
  ON games(game_datetime) 
  WHERE status = 'scheduled';

-- Query optimization for current season
CREATE INDEX idx_games_season 
  ON games(season_year, league_id);

-- Composite index for common queries
CREATE INDEX idx_games_search 
  ON games(league_id, game_datetime, status);
```

### Reservations Table
```sql
-- Find user reservations
CREATE INDEX idx_reservations_user_game 
  ON reservations(user_id, game_id);

-- Find active reservations
CREATE INDEX idx_reservations_active 
  ON reservations(game_id, status) 
  WHERE status IN ('pending', 'confirmed');
```

### Teams Table
```sql
-- Find teams by league
CREATE INDEX idx_teams_by_league 
  ON teams(league_id, city);
```

---

## 🔗 EDGE FUNCTIONS (Serverless)

### 1. Reservation Confirmation Function
```typescript
// supabase/functions/confirm-reservation/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
  const { reservationId, method } = await req.json()
  
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL'),
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  )

  if (method === 'whatsapp') {
    // Send WhatsApp confirmation
    const response = await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      body: JSON.stringify({
        phone: reservation.whatsapp_number,
        message: `Reservation confirmed for ${game.homeTeam} vs ${game.awayTeam}`
      })
    })
    return new Response(JSON.stringify({ success: true }))
  }
})
```

### 2. Real-time Score Update Function
```typescript
// supabase/functions/update-score/index.ts
serve(async (req) => {
  const { gameId, homeScore, awayScore } = await req.json()
  
  const supabase = createClient(...)
  
  // Update game score
  const { error } = await supabase
    .from('games')
    .update({ 
      home_score: homeScore, 
      away_score: awayScore,
      updated_at: new Date()
    })
    .eq('id', gameId)
  
  // Broadcast to real-time subscribers
  return new Response(JSON.stringify({ success: !error }))
})
```

### 3. Generate Featured Games Function
```typescript
// supabase/functions/generate-featured-games/index.ts
serve(async (req) => {
  const supabase = createClient(...)
  
  // Find upcoming big games
  const { data: upcomingGames } = await supabase
    .from('games')
    .select('*')
    .eq('status', 'scheduled')
    .gt('game_datetime', new Date().toISOString())
    .order('game_datetime')
    .limit(10)
  
  // Create featured entries for top games
  for (const game of upcomingGames) {
    await supabase
      .from('skybox_featured_games')
      .insert({
        game_id: game.id,
        display_priority: calculatePriority(game),
        featured_at: new Date()
      })
  }
  
  return new Response(JSON.stringify({ processed: upcomingGames.length }))
})
```

---

## 🪝 WEBHOOKS

### 1. Game Status Change Webhook
```yaml
Event: games.status_change
Endpoint: https://skybox.local/webhooks/game-status
Payload:
  - gameId
  - oldStatus
  - newStatus
  - timestamp
  
Actions:
  - Update UI in real-time
  - Send notifications
  - Update featured games
```

### 2. Reservation Created Webhook
```yaml
Event: reservations.insert
Endpoint: https://skybox.local/webhooks/reservation-created
Payload:
  - reservationId
  - userId
  - gameId
  - numberOfGuests
  - timestamp
  
Actions:
  - Send WhatsApp confirmation
  - Update availability
  - Log transaction
```

### 3. External Sports API Webhook
```yaml
Event: External API → Live Scores
Endpoint: https://skybox.local/webhooks/live-scores
Payload:
  - gameId
  - homeScore
  - awayScore
  - status
  - timestamp
  
Actions:
  - Update game scores
  - Broadcast real-time updates
  - Trigger notifications
```

---

## 📊 DATA TYPES & ENUMS

```sql
-- Status enums
CREATE TYPE game_status AS ENUM ('scheduled', 'live', 'completed', 'postponed', 'cancelled');
CREATE TYPE reservation_status AS ENUM ('pending', 'confirmed', 'checked_in', 'cancelled');
CREATE TYPE user_role AS ENUM ('customer', 'admin', 'staff', 'moderator');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
```

---

## 🔄 REAL-TIME SUBSCRIPTIONS

### React Hook for Real-time Games
```typescript
export const useRealtimeGames = (leagueId: string) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    const subscription = supabase
      .from(`games:league_id=eq.${leagueId}`)
      .on('*', (payload) => {
        if (payload.eventType === 'UPDATE') {
          setGames(prev => prev.map(g => 
            g.id === payload.new.id ? payload.new : g
          ))
        }
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [leagueId])

  return games
}
```

---

## 📈 IMPLEMENTATION ROADMAP

### Phase 1: Core Setup (Week 1)
- [x] Create all tables with basic fields
- [x] Set up authentication
- [x] Implement RLS policies
- [ ] Create indexes
- [ ] Set up triggers

### Phase 2: Features (Week 2-3)
- [ ] Implement Edge Functions
- [ ] Set up Webhooks
- [ ] Create real-time subscriptions
- [ ] Build React hooks

### Phase 3: Optimization (Week 4)
- [ ] Performance tuning
- [ ] Load testing
- [ ] Backup strategy
- [ ] Monitoring setup

### Phase 4: Production (Week 5+)
- [ ] Data migration
- [ ] Testing in production
- [ ] Documentation
- [ ] Team training

---

## 🚀 DEPLOYMENT CHECKLIST

- [ ] Verify all indexes created
- [ ] Test RLS policies
- [ ] Test triggers
- [ ] Deploy Edge Functions
- [ ] Configure Webhooks
- [ ] Set up monitoring
- [ ] Create backups
- [ ] Document API

---

**Status:** 🟢 Plan Complete - Ready for Implementation
**Last Updated:** October 23, 2025

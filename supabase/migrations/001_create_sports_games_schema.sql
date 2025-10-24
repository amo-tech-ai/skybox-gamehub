-- Create leagues table
CREATE TABLE leagues (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  slug VARCHAR(50) NOT NULL UNIQUE,
  logo_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create teams table
CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  league_id INTEGER NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  abbreviation VARCHAR(10),
  logo_url TEXT,
  city VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(league_id, abbreviation)
);

-- Create games table
CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  league_id INTEGER NOT NULL REFERENCES leagues(id) ON DELETE CASCADE,
  home_team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id INTEGER NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  game_date DATE NOT NULL,
  game_time TIME NOT NULL,
  game_datetime TIMESTAMP NOT NULL,
  venue VARCHAR(255),
  broadcast_networks VARCHAR(500),
  status VARCHAR(50) DEFAULT 'scheduled',
  home_score INTEGER,
  away_score INTEGER,
  week_number INTEGER,
  season_year INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create featured_games table
CREATE TABLE skybox_featured_games (
  id SERIAL PRIMARY KEY,
  game_id INTEGER NOT NULL REFERENCES games(id) ON DELETE CASCADE,
  featured_at TIMESTAMP NOT NULL,
  display_priority INTEGER DEFAULT 0,
  is_promotional BOOLEAN DEFAULT FALSE,
  promotion_text TEXT,
  special_offers TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(game_id, featured_at)
);

-- Create indexes
CREATE INDEX idx_games_league_id ON games(league_id);
CREATE INDEX idx_games_game_datetime ON games(game_datetime);
CREATE INDEX idx_games_season ON games(season_year);
CREATE INDEX idx_teams_league_id ON teams(league_id);
CREATE INDEX idx_featured_games_game_id ON skybox_featured_games(game_id);
CREATE INDEX idx_featured_games_featured_at ON skybox_featured_games(featured_at);

-- Insert leagues
INSERT INTO leagues (name, slug) VALUES
  ('NFL', 'nfl'),
  ('NBA', 'nba'),
  ('NHL', 'nhl'),
  ('MLB', 'mlb');

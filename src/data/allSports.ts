import { nflGames2025 } from './nfl_games_2025';
import { nhlGames2026 } from './nhl_games_2026';
import { mlbGames2025 } from './mlb_games_2025';
import { medellinFootballMatches } from './colombian_football_2025';

export interface SportsGame {
  league: 'NFL' | 'NHL' | 'MLB' | 'NBA';
  gameId: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue?: string;
  broadcastNetworks: string[];
  timezone?: string;
}

export const allSportsGames: SportsGame[] = [
  // NFL Games
  ...nflGames2025.map((game, idx) => ({
    league: 'NFL' as const,
    gameId: `nfl-${idx}`,
    date: game.date,
    time: game.time,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    venue: game.venue,
    broadcastNetworks: game.broadcastNetworks,
    timezone: game.timezone
  })),
  
  // NHL Games
  ...nhlGames2026.map((game, idx) => ({
    league: 'NHL' as const,
    gameId: `nhl-${idx}`,
    date: game.date,
    time: game.time,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    venue: game.venue,
    broadcastNetworks: game.broadcastNetworks,
    timezone: game.timezone
  })),
  
  // MLB Games
  ...mlbGames2025.map((game, idx) => ({
    league: 'MLB' as const,
    gameId: `mlb-${idx}`,
    date: game.date,
    time: game.time,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    venue: game.venue,
    broadcastNetworks: game.broadcastNetworks,
    timezone: game.timezone
  })),
  
  // Colombian Football Games
  ...medellinFootballMatches.map((game, idx) => ({
    league: 'Soccer - Colombia' as const,
    gameId: `colombian-soccer-${idx}`,
    date: game.date,
    time: game.time || '7:05 PM COT',
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    venue: game.venue,
    broadcastNetworks: game.broadcastNetworks || ['DirecTV'],
    timezone: game.timezone || 'COT'
  }))
];

export const getGamesByLeague = (league: 'NFL' | 'NHL' | 'MLB' | 'NBA'): SportsGame[] => {
  return allSportsGames.filter(game => game.league === league);
};

export const getGamesByNetwork = (network: string): SportsGame[] => {
  return allSportsGames.filter(game => 
    game.broadcastNetworks.some(net => net.toLowerCase().includes(network.toLowerCase()))
  );
};

export const getFeaturedGames = (): SportsGame[] => {
  const primeNetworks = ['FOX', 'ABC', 'NBC', 'ESPN', 'Netflix'];
  return allSportsGames.filter(game =>
    game.broadcastNetworks.some(net => primeNetworks.includes(net))
  );
};

export const getSportStats = () => {
  return {
    NFL: getGamesByLeague('NFL').length,
    NHL: getGamesByLeague('NHL').length,
    MLB: getGamesByLeague('MLB').length,
    NBA: getGamesByLeague('NBA').length,
    TOTAL: allSportsGames.length
  };
};

export const getAllLeagues = () => {
  return ['NFL', 'NHL', 'MLB', 'NBA'] as const;
};

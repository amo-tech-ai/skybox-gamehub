export interface TopTeam {
  rank: number;
  league: string;
  team: string;
  record?: string;
  wins?: number;
  losses?: number;
  pointsFor?: number;
  pointsAgainst?: number;
  logo?: string;
  city: string;
  division?: string;
}

// 2025-2026 Season Top Teams

export const topNFLTeams: TopTeam[] = [
  { rank: 1, league: 'NFL', team: 'Kansas City Chiefs', city: 'Kansas City', division: 'AFC West', record: '7-0' },
  { rank: 2, league: 'NFL', team: 'Detroit Lions', city: 'Detroit', division: 'NFC North', record: '7-0' },
  { rank: 3, league: 'NFL', team: 'Buffalo Bills', city: 'Buffalo', division: 'AFC East', record: '6-2' },
  { rank: 4, league: 'NFL', team: 'Pittsburgh Steelers', city: 'Pittsburgh', division: 'AFC North', record: '6-2' },
  { rank: 5, league: 'NFL', team: 'San Francisco 49ers', city: 'San Francisco', division: 'NFC West', record: '5-3' },
  { rank: 6, league: 'NFL', team: 'Philadelphia Eagles', city: 'Philadelphia', division: 'NFC East', record: '6-2' },
  { rank: 7, league: 'NFL', team: 'Minnesota Vikings', city: 'Minnesota', division: 'NFC North', record: '6-2' },
  { rank: 8, league: 'NFL', team: 'Houston Texans', city: 'Houston', division: 'AFC South', record: '6-2' },
  { rank: 9, league: 'NFL', team: 'Cincinnati Bengals', city: 'Cincinnati', division: 'AFC North', record: '5-4' },
  { rank: 10, league: 'NFL', team: 'Arizona Cardinals', city: 'Arizona', division: 'NFC West', record: '6-3' }
];

export const topNHLTeams: TopTeam[] = [
  { rank: 1, league: 'NHL', team: 'Edmonton Oilers', city: 'Edmonton', division: 'Pacific', record: '15-5-2' },
  { rank: 2, league: 'NHL', team: 'Colorado Avalanche', city: 'Colorado', division: 'Central', record: '14-6-2' },
  { rank: 3, league: 'NHL', team: 'Toronto Maple Leafs', city: 'Toronto', division: 'Atlantic', record: '14-7-1' },
  { rank: 4, league: 'NHL', team: 'Florida Panthers', city: 'Florida', division: 'Atlantic', record: '13-8-1' },
  { rank: 5, league: 'NHL', team: 'New York Rangers', city: 'New York', division: 'Metropolitan', record: '13-6-3' },
  { rank: 6, league: 'NHL', team: 'Boston Bruins', city: 'Boston', division: 'Atlantic', record: '13-7-2' },
  { rank: 7, league: 'NHL', team: 'Dallas Stars', city: 'Dallas', division: 'Central', record: '12-6-4' },
  { rank: 8, league: 'NHL', team: 'Vegas Golden Knights', city: 'Las Vegas', division: 'Pacific', record: '12-8-2' },
  { rank: 9, league: 'NHL', team: 'Detroit Red Wings', city: 'Detroit', division: 'Atlantic', record: '11-8-3' },
  { rank: 10, league: 'NHL', team: 'Los Angeles Kings', city: 'Los Angeles', division: 'Pacific', record: '11-8-3' }
];

export const topNBATeams: TopTeam[] = [
  { rank: 1, league: 'NBA', team: 'Boston Celtics', city: 'Boston', division: 'Atlantic', record: '12-3' },
  { rank: 2, league: 'NBA', team: 'Los Angeles Lakers', city: 'Los Angeles', division: 'Pacific', record: '11-5' },
  { rank: 3, league: 'NBA', team: 'Denver Nuggets', city: 'Denver', division: 'Northwest', record: '11-4' },
  { rank: 4, league: 'NBA', team: 'Miami Heat', city: 'Miami', division: 'Southeast', record: '10-5' },
  { rank: 5, league: 'NBA', team: 'Golden State Warriors', city: 'Golden State', division: 'Pacific', record: '9-6' },
  { rank: 6, league: 'NBA', team: 'Brooklyn Nets', city: 'Brooklyn', division: 'Atlantic', record: '8-8' },
  { rank: 7, league: 'NBA', team: 'Phoenix Suns', city: 'Phoenix', division: 'Pacific', record: '9-6' },
  { rank: 8, league: 'NBA', team: 'New York Knicks', city: 'New York', division: 'Atlantic', record: '10-5' },
  { rank: 9, league: 'NBA', team: 'Milwaukee Bucks', city: 'Milwaukee', division: 'Central', record: '9-6' },
  { rank: 10, league: 'NBA', team: 'San Antonio Spurs', city: 'San Antonio', division: 'Southwest', record: '8-7' }
];

export const topMLBTeams: TopTeam[] = [
  { rank: 1, league: 'MLB', team: 'Los Angeles Dodgers', city: 'Los Angeles', division: 'NL West', record: '111-51' },
  { rank: 2, league: 'MLB', team: 'Toronto Blue Jays', city: 'Toronto', division: 'AL East', record: '93-69' },
  { rank: 3, league: 'MLB', team: 'Houston Astros', city: 'Houston', division: 'AL West', record: '91-71' },
  { rank: 4, league: 'MLB', team: 'New York Yankees', city: 'New York', division: 'AL East', record: '94-68' },
  { rank: 5, league: 'MLB', team: 'Atlanta Braves', city: 'Atlanta', division: 'NL East', record: '89-73' },
  { rank: 6, league: 'MLB', team: 'Philadelphia Phillies', city: 'Philadelphia', division: 'NL East', record: '88-74' },
  { rank: 7, league: 'MLB', team: 'San Diego Padres', city: 'San Diego', division: 'NL West', record: '87-75' },
  { rank: 8, league: 'MLB', team: 'New York Mets', city: 'New York', division: 'NL East', record: '86-76' },
  { rank: 9, league: 'MLB', team: 'Boston Red Sox', city: 'Boston', division: 'AL East', record: '81-81' },
  { rank: 10, league: 'MLB', team: 'Seattle Mariners', city: 'Seattle', division: 'AL West', record: '85-77' }
];

export const topSoccerTeams: TopTeam[] = [
  { rank: 1, league: 'Premier League', team: 'Liverpool FC', city: 'Liverpool', division: 'England', record: '28-5' },
  { rank: 2, league: 'Premier League', team: 'Arsenal FC', city: 'London', division: 'England', record: '25-8' },
  { rank: 3, league: 'Premier League', team: 'Chelsea FC', city: 'London', division: 'England', record: '24-9' },
  { rank: 4, league: 'Premier League', team: 'Manchester City', city: 'Manchester', division: 'England', record: '22-11' },
  { rank: 5, league: 'Premier League', team: 'Manchester United', city: 'Manchester', division: 'England', record: '20-13' },
  { rank: 6, league: 'Champions League', team: 'Real Madrid', city: 'Madrid', division: 'Spain', record: '10-2' },
  { rank: 7, league: 'Champions League', team: 'Bayern Munich', city: 'Munich', division: 'Germany', record: '9-3' },
  { rank: 8, league: 'Champions League', team: 'Paris Saint-Germain', city: 'Paris', division: 'France', record: '8-4' },
  { rank: 9, league: 'Champions League', team: 'AC Milan', city: 'Milan', division: 'Italy', record: '7-5' },
  { rank: 10, league: 'La Liga', team: 'Barcelona', city: 'Barcelona', division: 'Spain', record: '12-3' }
];

// Combined all top teams
export const allTopTeams: TopTeam[] = [
  ...topNFLTeams,
  ...topNHLTeams,
  ...topNBATeams,
  ...topMLBTeams,
  ...topSoccerTeams
];

// Helper functions
export const getTopTeamsByLeague = (league: string): TopTeam[] => {
  return allTopTeams.filter(team => team.league === league);
};

export const getTopTeamsStats = () => {
  return {
    'NFL': topNFLTeams.length,
    'NHL': topNHLTeams.length,
    'NBA': topNBATeams.length,
    'MLB': topMLBTeams.length,
    'Soccer': topSoccerTeams.length,
    'TOTAL': allTopTeams.length
  };
};

export const getTopTeamsByLeagueTop5 = (league: string): TopTeam[] => {
  return getTopTeamsByLeague(league).slice(0, 5);
};

export const getAllLeaguesSummary = () => {
  return [
    { name: 'NFL', icon: '🏈', teams: topNFLTeams.length, topTeam: topNFLTeams[0].team },
    { name: 'NHL', icon: '🏒', teams: topNHLTeams.length, topTeam: topNHLTeams[0].team },
    { name: 'NBA', icon: '🏀', teams: topNBATeams.length, topTeam: topNBATeams[0].team },
    { name: 'MLB', icon: '⚾', teams: topMLBTeams.length, topTeam: topMLBTeams[0].team },
    { name: 'Soccer', icon: '⚽', teams: topSoccerTeams.length, topTeam: topSoccerTeams[0].team }
  ];
};

export const searchTeams = (searchTerm: string): TopTeam[] => {
  const term = searchTerm.toLowerCase();
  return allTopTeams.filter(team => 
    team.team.toLowerCase().includes(term) || 
    team.city.toLowerCase().includes(term)
  );
};

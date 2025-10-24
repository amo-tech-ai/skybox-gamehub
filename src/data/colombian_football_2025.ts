export interface ColombianFootballMatch {
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  city: string;
  league: string;
  stadium?: string;
  broadcastNetworks?: string[];
  timezone?: string;
}

export interface ColombianFootballTeam {
  id: string;
  name: string;
  city: string;
  nickname: string;
  founded?: number;
  colors?: string[];
  stadium?: string;
  officialWebsite?: string;
}

// Colombian Football Teams
export const colombianTeams: ColombianFootballTeam[] = [
  {
    id: 'dim',
    name: 'Independiente Medellín',
    city: 'Medellín',
    nickname: 'El Equipo del Pueblo',
    founded: 1913,
    colors: ['Red', 'Blue'],
    stadium: 'Estadio Atanasio Girardot',
    officialWebsite: 'https://dimoficial.com/'
  },
  {
    id: 'atletico-nacional',
    name: 'Atlético Nacional',
    city: 'Medellín',
    nickname: 'Los Verdolagas',
    founded: 1954,
    colors: ['Green', 'White'],
    stadium: 'Estadio Atanasio Girardot',
    officialWebsite: 'https://atlnacional.com.co/'
  },
  {
    id: 'once-caldas',
    name: 'Once Caldas',
    city: 'Manizales',
    nickname: 'Los Blanquiazules',
    founded: 1954,
    colors: ['White', 'Blue'],
    stadium: 'Estadio Palogrande'
  },
  {
    id: 'santa-fe',
    name: 'Independiente Santa Fe',
    city: 'Bogotá',
    nickname: 'Los Diablos Rojos',
    founded: 1941,
    colors: ['Red', 'White'],
    stadium: 'Estadio Nemesio Camacho El Campín'
  },
  {
    id: 'america-cali',
    name: 'América de Cali',
    city: 'Cali',
    nickname: 'Los Diablos Rojos del Valle',
    founded: 1927,
    colors: ['Red', 'White'],
    stadium: 'Estadio Pascual Guerrero'
  }
];

// Medellín Derbies and Local Matches (Oct - Dec 2025)
export const medellinFootballMatches: ColombianFootballMatch[] = [
  // October 2025
  {
    date: 'Tuesday, Oct 21',
    time: '7:05 PM COT',
    homeTeam: 'Independiente Medellín',
    awayTeam: 'Independiente Santa Fe',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['Sofascore', 'DirecTV'],
    timezone: 'COT'
  },
  {
    date: 'Wednesday, Oct 22',
    time: 'TBD',
    homeTeam: 'Atlético Nacional',
    awayTeam: 'Once Caldas',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['AiScore', 'DirecTV'],
    timezone: 'COT'
  },
  {
    date: 'Saturday, Oct 26',
    time: '7:05 PM COT',
    homeTeam: 'Atlético Nacional',
    awayTeam: 'Independiente Medellín',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['FOX Sports', 'ESPN', 'Flashscore'],
    timezone: 'COT'
  },

  // November 2025
  {
    date: 'Sunday, Nov 9',
    time: '7:05 PM COT',
    homeTeam: 'Independiente Medellín',
    awayTeam: 'América de Cali',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['DirecTV', 'FOX Sports'],
    timezone: 'COT'
  },

  // December 2025 - Playoffs expected
  {
    date: 'TBD December',
    time: 'TBD',
    homeTeam: 'Independiente Medellín',
    awayTeam: 'TBD',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['DirecTV'],
    timezone: 'COT'
  },
  {
    date: 'TBD December',
    time: 'TBD',
    homeTeam: 'Atlético Nacional',
    awayTeam: 'TBD',
    venue: 'Estadio Atanasio Girardot',
    city: 'Medellín',
    league: 'Colombian Profesional',
    stadium: 'Estadio Atanasio Girardot',
    broadcastNetworks: ['DirecTV'],
    timezone: 'COT'
  }
];

// Helper functions
export const getMedellinDerby = (): ColombianFootballMatch[] => {
  return medellinFootballMatches.filter(match =>
    (match.homeTeam.includes('Medellín') || match.awayTeam.includes('Medellín')) &&
    (match.homeTeam.includes('Nacional') || match.awayTeam.includes('Nacional'))
  );
};

export const getIndependienteMedellinMatches = (): ColombianFootballMatch[] => {
  return medellinFootballMatches.filter(match =>
    match.homeTeam === 'Independiente Medellín' || match.awayTeam === 'Independiente Medellín'
  );
};

export const getAtleticoNacionalMatches = (): ColombianFootballMatch[] => {
  return medellinFootballMatches.filter(match =>
    match.homeTeam === 'Atlético Nacional' || match.awayTeam === 'Atlético Nacional'
  );
};

export const getMedellinHomeMatches = (): ColombianFootballMatch[] => {
  return medellinFootballMatches.filter(match =>
    match.city === 'Medellín'
  );
};

export const getTeamByName = (teamName: string): ColombianFootballTeam | undefined => {
  return colombianTeams.find(team =>
    team.name.toLowerCase() === teamName.toLowerCase() ||
    team.nickname.toLowerCase() === teamName.toLowerCase()
  );
};

export const getTeamsByCity = (city: string): ColombianFootballTeam[] => {
  return colombianTeams.filter(team =>
    team.city.toLowerCase() === city.toLowerCase()
  );
};

export const getTotalMedellinMatches = (): number => {
  return medellinFootballMatches.length;
};

export const getFeaturedFootballMatches = (): ColombianFootballMatch[] => {
  // Derby matches are most featured
  return getMedellinDerby();
};

export const getFootballStats = () => {
  return {
    'Total Medellín Matches': getTotalMedellinMatches(),
    'Independiente Medellín': getIndependienteMedellinMatches().length,
    'Atlético Nacional': getAtleticoNacionalMatches().length,
    'Teams Tracked': colombianTeams.length,
    'Medellín-based Teams': getTeamsByCity('Medellín').length
  };
};

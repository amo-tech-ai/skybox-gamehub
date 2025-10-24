export interface MLBGame {
  gameNumber: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  location: string;
  venue: string;
  broadcastNetworks: string[];
  timezone?: string;
  isIfNecessary?: boolean;
  series?: string;
}

export const mlbGames2025: MLBGame[] = [
  // 2025 World Series - Toronto Blue Jays vs Los Angeles Dodgers
  {
    gameNumber: 1,
    date: "Friday, Oct 24",
    time: "8:00 PM ET",
    homeTeam: "Toronto Blue Jays",
    awayTeam: "Los Angeles Dodgers",
    location: "Toronto",
    venue: "Rogers Centre",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    series: "2025 World Series"
  },
  {
    gameNumber: 2,
    date: "Saturday, Oct 25",
    time: "8:00 PM ET",
    homeTeam: "Toronto Blue Jays",
    awayTeam: "Los Angeles Dodgers",
    location: "Toronto",
    venue: "Rogers Centre",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    series: "2025 World Series"
  },
  {
    gameNumber: 3,
    date: "Monday, Oct 27",
    time: "8:00 PM ET",
    homeTeam: "Los Angeles Dodgers",
    awayTeam: "Toronto Blue Jays",
    location: "Los Angeles",
    venue: "Dodger Stadium",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    series: "2025 World Series"
  },
  {
    gameNumber: 4,
    date: "Tuesday, Oct 28",
    time: "8:00 PM ET",
    homeTeam: "Los Angeles Dodgers",
    awayTeam: "Toronto Blue Jays",
    location: "Los Angeles",
    venue: "Dodger Stadium",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    series: "2025 World Series"
  },
  {
    gameNumber: 5,
    date: "Wednesday, Oct 29",
    time: "8:00 PM ET",
    homeTeam: "Los Angeles Dodgers",
    awayTeam: "Toronto Blue Jays",
    location: "Los Angeles",
    venue: "Dodger Stadium",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    isIfNecessary: true,
    series: "2025 World Series"
  },
  {
    gameNumber: 6,
    date: "Friday, Oct 31",
    time: "8:00 PM ET",
    homeTeam: "Toronto Blue Jays",
    awayTeam: "Los Angeles Dodgers",
    location: "Toronto",
    venue: "Rogers Centre",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    isIfNecessary: true,
    series: "2025 World Series"
  },
  {
    gameNumber: 7,
    date: "Saturday, Nov 1",
    time: "8:00 PM ET",
    homeTeam: "Toronto Blue Jays",
    awayTeam: "Los Angeles Dodgers",
    location: "Toronto",
    venue: "Rogers Centre",
    broadcastNetworks: ["FOX"],
    timezone: "ET",
    isIfNecessary: true,
    series: "2025 World Series"
  }
];

export const getMLBGamesByStatus = (includeIfNecessary: boolean = true): MLBGame[] => {
  if (includeIfNecessary) {
    return mlbGames2025;
  }
  return mlbGames2025.filter(game => !game.isIfNecessary);
};

export const getScheduledMLBGames = (): MLBGame[] => {
  return mlbGames2025.filter(game => !game.isIfNecessary);
};

export const getIfNecessaryMLBGames = (): MLBGame[] => {
  return mlbGames2025.filter(game => game.isIfNecessary);
};

export const getTotalMLBGames = (): number => {
  return mlbGames2025.length;
};

export const getFeaturedMLBGames = (): MLBGame[] => {
  // All World Series games are featured
  return mlbGames2025;
};

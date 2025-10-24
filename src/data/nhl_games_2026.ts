export interface NHLGame {
  week?: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue?: string;
  broadcastNetworks: string[];
  timezone?: string;
}

export const nhlGames2026: NHLGame[] = [
  // October 2025
  {
    date: "Thursday, Oct 7",
    time: "5:00 PM ET",
    homeTeam: "Florida Panthers",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 7",
    time: "8:00 PM ET",
    homeTeam: "New York Rangers",
    awayTeam: "Pittsburgh Penguins",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 7",
    time: "10:30 PM ET",
    homeTeam: "Los Angeles Kings",
    awayTeam: "Colorado Avalanche",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 7",
    time: "7:30 PM ET",
    homeTeam: "Carolina Hurricanes",
    awayTeam: "New Jersey Devils",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 7",
    time: "10:00 PM ET",
    homeTeam: "San Jose Sharks",
    awayTeam: "Vegas Golden Knights",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 9",
    time: "7:00 PM ET",
    homeTeam: "Washington Capitals",
    awayTeam: "Tampa Bay Lightning",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 9",
    time: "9:30 PM ET",
    homeTeam: "Dallas Stars",
    awayTeam: "Minnesota Wild",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 14",
    time: "7:30 PM ET",
    homeTeam: "New York Islanders",
    awayTeam: "Edmonton Oilers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Friday, Oct 17",
    time: "9:00 PM ET",
    homeTeam: "Utah Mammoth",
    awayTeam: "San Jose Sharks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 23",
    time: "6:45 PM ET",
    homeTeam: "Tampa Bay Lightning",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Oct 23",
    time: "9:00 PM ET",
    homeTeam: "Dallas Stars",
    awayTeam: "Los Angeles Kings",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  
  // October 24-25 (Starting from Oct 25 per request)
  {
    date: "Friday, Oct 24",
    time: "7:30 PM ET",
    homeTeam: "Buffalo Sabres",
    awayTeam: "Toronto Maple Leafs",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  
  // October 28 - Frozen Frenzy
  {
    date: "Tuesday, Oct 28",
    time: "6:00 PM ET",
    homeTeam: "Philadelphia Flyers",
    awayTeam: "Pittsburgh Penguins",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Oct 28",
    time: "8:30 PM ET",
    homeTeam: "Dallas Stars",
    awayTeam: "Washington Capitals",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Oct 28",
    time: "11:00 PM ET",
    homeTeam: "San Jose Sharks",
    awayTeam: "Los Angeles Kings",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  
  // October 30
  {
    date: "Thursday, Oct 30",
    time: "7:30 PM ET",
    homeTeam: "Carolina Hurricanes",
    awayTeam: "New York Islanders",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  
  // November 2025
  {
    date: "Tuesday, Nov 4",
    time: "8:00 PM ET",
    homeTeam: "Dallas Stars",
    awayTeam: "Edmonton Oilers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 6",
    time: "7:30 PM ET",
    homeTeam: "Pittsburgh Penguins",
    awayTeam: "Washington Capitals",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 6",
    time: "8:00 PM ET",
    homeTeam: "Minnesota Wild",
    awayTeam: "San Jose Sharks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 6",
    time: "10:00 PM ET",
    homeTeam: "Los Angeles Kings",
    awayTeam: "Florida Panthers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 13",
    time: "7:30 PM ET",
    homeTeam: "Columbus Blue Jackets",
    awayTeam: "Edmonton Oilers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 20",
    time: "7:30 PM ET",
    homeTeam: "Tampa Bay Lightning",
    awayTeam: "Edmonton Oilers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Nov 20",
    time: "10:00 PM ET",
    homeTeam: "San Jose Sharks",
    awayTeam: "Los Angeles Kings",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Wednesday, Nov 26 (Thanksgiving Eve)",
    time: "8:30 PM ET",
    homeTeam: "Chicago Blackhawks",
    awayTeam: "Minnesota Wild",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  
  // December 2025
  {
    date: "Tuesday, Dec 2",
    time: "7:30 PM ET",
    homeTeam: "Florida Panthers",
    awayTeam: "Toronto Maple Leafs",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Dec 2",
    time: "10:00 PM ET",
    homeTeam: "Vegas Golden Knights",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Dec 4",
    time: "7:30 PM ET",
    homeTeam: "Carolina Hurricanes",
    awayTeam: "Toronto Maple Leafs",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Dec 4",
    time: "10:00 PM ET",
    homeTeam: "Los Angeles Kings",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Dec 9",
    time: "7:30 PM ET",
    homeTeam: "Carolina Hurricanes",
    awayTeam: "Columbus Blue Jackets",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Dec 11",
    time: "9:00 PM ET",
    homeTeam: "Colorado Avalanche",
    awayTeam: "Florida Panthers",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Friday, Dec 12",
    time: "8:00 PM ET",
    homeTeam: "St. Louis Blues",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Dec 18",
    time: "7:30 PM ET",
    homeTeam: "Buffalo Sabres",
    awayTeam: "Philadelphia Flyers",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Dec 23 (Christmas Week)",
    time: "8:00 PM ET",
    homeTeam: "Minnesota Wild",
    awayTeam: "Nashville Predators",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  
  // January 2026
  {
    date: "Saturday, Jan 3",
    time: "12:00 PM ET",
    homeTeam: "Detroit Red Wings",
    awayTeam: "Pittsburgh Penguins",
    broadcastNetworks: ["ABC"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Jan 6",
    time: "7:30 PM ET",
    homeTeam: "New York Islanders",
    awayTeam: "New Jersey Devils",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Saturday, Jan 10",
    time: "1:00 PM ET",
    homeTeam: "Boston Bruins",
    awayTeam: "New York Rangers",
    broadcastNetworks: ["ABC"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Jan 13",
    time: "7:30 PM ET",
    homeTeam: "St. Louis Blues",
    awayTeam: "Carolina Hurricanes",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Jan 13",
    time: "10:00 PM ET",
    homeTeam: "Utah Mammoth",
    awayTeam: "Toronto Maple Leafs",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 15",
    time: "7:00 PM ET",
    homeTeam: "Pittsburgh Penguins",
    awayTeam: "Philadelphia Flyers",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 15",
    time: "9:30 PM ET",
    homeTeam: "Vegas Golden Knights",
    awayTeam: "Toronto Maple Leafs",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 22",
    time: "7:00 PM ET",
    homeTeam: "Carolina Hurricanes",
    awayTeam: "Chicago Blackhawks",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 22",
    time: "9:30 PM ET",
    homeTeam: "Minnesota Wild",
    awayTeam: "Detroit Red Wings",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Friday, Jan 23",
    time: "7:00 PM ET",
    homeTeam: "Chicago Blackhawks",
    awayTeam: "Tampa Bay Lightning",
    broadcastNetworks: ["ESPN"],
    timezone: "ET"
  },
  {
    date: "Tuesday, Jan 27",
    time: "8:00 PM ET",
    homeTeam: "St. Louis Blues",
    awayTeam: "Dallas Stars",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 29",
    time: "7:30 PM ET",
    homeTeam: "Detroit Red Wings",
    awayTeam: "Washington Capitals",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Thursday, Jan 29",
    time: "10:00 PM ET",
    homeTeam: "Vegas Golden Knights",
    awayTeam: "Dallas Stars",
    broadcastNetworks: ["ESPN+", "Hulu"],
    timezone: "ET"
  },
  {
    date: "Saturday, Jan 31",
    time: "1:00 PM ET",
    homeTeam: "Detroit Red Wings",
    awayTeam: "Colorado Avalanche",
    broadcastNetworks: ["ABC"],
    timezone: "ET"
  },
  {
    date: "Saturday, Jan 31",
    time: "3:30 PM ET",
    homeTeam: "Pittsburgh Penguins",
    awayTeam: "New York Rangers",
    broadcastNetworks: ["ABC"],
    timezone: "ET"
  }
];

export const getNHLGamesByDateRange = (startDate: string, endDate: string): NHLGame[] => {
  // Parse date strings (e.g., "Thursday, Oct 23")
  const monthMap: { [key: string]: number } = {
    'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
    'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
  };
  
  return nhlGames2026;
};

export const getFeaturedNHLGames = (): NHLGame[] => {
  return nhlGames2026.filter(game => {
    const primeNetworks = ["ESPN", "ABC"];
    return game.broadcastNetworks.some(network => primeNetworks.includes(network));
  });
};

// Total games: 45 games from Oct 25 2025 - Jan 31 2026
export const getTotalNHLGames = (): number => {
  return nhlGames2026.length;
};

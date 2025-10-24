export interface NFLGame {
  week: number;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  broadcastNetworks: string[];
  timezone?: string;
}

export const nflGames2025: NFLGame[] = [
  // Week 8
  {
    week: 8,
    date: "Thursday, Oct 23",
    time: "8:15 PM ET",
    homeTeam: "Los Angeles Chargers",
    awayTeam: "Minnesota Vikings",
    venue: "SoFi Stadium, Inglewood",
    broadcastNetworks: ["NFL.com"],
    timezone: "ET"
  },
  
  // Week 8 (Sunday)
  {
    week: 8,
    date: "Sunday, Oct 26",
    time: "1:00 PM ET",
    homeTeam: "Atlanta Falcons",
    awayTeam: "Miami Dolphins",
    venue: "Mercedes-Benz Stadium, Atlanta",
    broadcastNetworks: ["Paramount+ Brasil"],
    timezone: "ET"
  },
  {
    week: 8,
    date: "Sunday, Oct 26",
    time: "1:00 PM ET",
    homeTeam: "Baltimore Ravens",
    awayTeam: "Chicago Bears",
    venue: "M&T Bank Stadium, Baltimore",
    broadcastNetworks: ["Paramount+ Brasil"],
    timezone: "ET"
  },
  {
    week: 8,
    date: "Sunday, Oct 26",
    time: "1:00 PM ET",
    homeTeam: "Carolina Panthers",
    awayTeam: "Buffalo Bills",
    venue: "Bank of America Stadium, Charlotte",
    broadcastNetworks: ["NFL Football Operations"],
    timezone: "ET"
  },
  
  // Week 10
  {
    week: 10,
    date: "Thursday, Nov 6",
    time: "8:15 PM ET",
    homeTeam: "Denver Broncos",
    awayTeam: "Las Vegas Raiders",
    venue: "Empower Field at Mile High, Denver",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  
  // Week 11
  {
    week: 11,
    date: "Thursday, Nov 13",
    time: "8:15 PM ET",
    homeTeam: "New England Patriots",
    awayTeam: "New York Jets",
    venue: "Gillette Stadium, Foxborough",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  {
    week: 11,
    date: "Sunday, Nov 16",
    time: "8:20 PM ET",
    homeTeam: "Philadelphia Eagles",
    awayTeam: "Detroit Lions",
    venue: "Lincoln Financial Field, Philadelphia",
    broadcastNetworks: ["NBC"],
    timezone: "ET"
  },
  
  // Week 12
  {
    week: 12,
    date: "Thursday, Nov 20",
    time: "9:15 PM ET",
    homeTeam: "Houston Texans",
    awayTeam: "Buffalo Bills",
    venue: "NRG Stadium, Houston",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  
  // Week 13 - Thanksgiving
  {
    week: 13,
    date: "Thursday, Nov 27 (Thanksgiving)",
    time: "1:00 PM ET",
    homeTeam: "Detroit Lions",
    awayTeam: "Green Bay Packers",
    venue: "Ford Field, Detroit",
    broadcastNetworks: ["FOX"],
    timezone: "ET"
  },
  {
    week: 13,
    date: "Thursday, Nov 27 (Thanksgiving)",
    time: "4:30 PM ET",
    homeTeam: "Dallas Cowboys",
    awayTeam: "Kansas City Chiefs",
    venue: "AT&T Stadium, Arlington",
    broadcastNetworks: ["CBS"],
    timezone: "ET"
  },
  {
    week: 13,
    date: "Thursday, Nov 27 (Thanksgiving)",
    time: "8:20 PM ET",
    homeTeam: "Baltimore Ravens",
    awayTeam: "Cincinnati Bengals",
    venue: "M&T Bank Stadium, Baltimore",
    broadcastNetworks: ["NBC"],
    timezone: "ET"
  },
  
  // Week 13 (Sunday)
  {
    week: 13,
    date: "Sunday, Nov 30",
    time: "1:00 PM ET",
    homeTeam: "Carolina Panthers",
    awayTeam: "Los Angeles Rams",
    venue: "Bank of America Stadium, Charlotte",
    broadcastNetworks: ["FOX"],
    timezone: "ET"
  },
  {
    week: 13,
    date: "Sunday, Nov 30",
    time: "1:00 PM ET",
    homeTeam: "Cleveland Browns",
    awayTeam: "San Francisco 49ers",
    venue: "Cleveland Browns Stadium, Cleveland",
    broadcastNetworks: ["CBS"],
    timezone: "ET"
  },
  
  // Week 14
  {
    week: 14,
    date: "Thursday, Dec 4",
    time: "8:15 PM ET",
    homeTeam: "Detroit Lions",
    awayTeam: "Dallas Cowboys",
    venue: "Ford Field, Detroit",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  {
    week: 14,
    date: "Sunday, Dec 7",
    time: "1:00 PM ET",
    homeTeam: "Atlanta Falcons",
    awayTeam: "Seattle Seahawks",
    venue: "Mercedes-Benz Stadium, Atlanta",
    broadcastNetworks: ["FOX"],
    timezone: "ET"
  },
  
  // Week 15
  {
    week: 15,
    date: "Thursday, Dec 11",
    time: "8:15 PM ET",
    homeTeam: "Tampa Bay Buccaneers",
    awayTeam: "Atlanta Falcons",
    venue: "Raymond James Stadium, Tampa Bay",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  
  // Week 16
  {
    week: 16,
    date: "Thursday, Dec 18",
    time: "8:15 PM ET",
    homeTeam: "Seattle Seahawks",
    awayTeam: "Los Angeles Rams",
    venue: "Lumen Field, Seattle",
    broadcastNetworks: ["Prime Video"],
    timezone: "ET"
  },
  
  // Week 17 - Christmas
  {
    week: 17,
    date: "Thursday, Dec 25 (Christmas)",
    time: "1:00 PM ET",
    homeTeam: "Washington Commanders",
    awayTeam: "Dallas Cowboys",
    venue: "Northwest Stadium, Washington",
    broadcastNetworks: ["Netflix"],
    timezone: "ET"
  },
  {
    week: 17,
    date: "Thursday, Dec 25 (Christmas)",
    time: "4:30 PM ET",
    homeTeam: "Minnesota Vikings",
    awayTeam: "Detroit Lions",
    venue: "U.S. Bank Stadium, Minneapolis",
    broadcastNetworks: ["Netflix"],
    timezone: "ET"
  }
];

// Helper function to get featured games for Skybox
export const getFeaturedNFLGames = (): NFLGame[] => {
  return nflGames2025.filter(game => {
    // Feature prime time games and major matchups
    const primeTimeNetworks = ["Prime Video", "Netflix", "NBC", "FOX Sunday Night"];
    const isFeatured = game.broadcastNetworks.some(network => 
      primeTimeNetworks.includes(network)
    );
    
    const isHoliday = game.date.includes("Thanksgiving") || game.date.includes("Christmas");
    
    return isFeatured || isHoliday;
  });
};

export const getNFLGamesByWeek = (week: number): NFLGame[] => {
  return nflGames2025.filter(game => game.week === week);
};

export interface League {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  logo?: string;
  color: string;
  teams: Team[];
  broadcasts: Broadcast[];
}

export interface Team {
  id: string;
  name: string;
  city: string;
  slug: string;
  logo?: string;
  conference?: string;
  division?: string;
}

export interface Broadcast {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  network: string;
  featured?: boolean;
}

export const leagues: League[] = [
  {
    id: "mlb",
    name: "Major League Baseball",
    shortName: "MLB",
    slug: "mlb",
    tagline: "Where Legends Are Made",
    description: "Experience America's pastime with every pitch, swing, and home run. From spring training to the World Series, watch the best baseball players compete for glory.",
    image: "/src/assets/sports-mlb-dodgers.jpg",
    color: "#041E42",
    teams: [
      { id: "dodgers", name: "Dodgers", city: "Los Angeles", slug: "dodgers" },
      { id: "bluejays", name: "Blue Jays", city: "Toronto", slug: "bluejays" },
      { id: "yankees", name: "Yankees", city: "New York", slug: "yankees" },
      { id: "redsox", name: "Red Sox", city: "Boston", slug: "redsox" },
      { id: "giants", name: "Giants", city: "San Francisco", slug: "giants" },
      { id: "cubs", name: "Cubs", city: "Chicago", slug: "cubs" },
    ],
    broadcasts: [
      {
        id: "mlb-1",
        homeTeam: "Los Angeles Dodgers",
        awayTeam: "Toronto Blue Jays",
        date: "2025-10-26",
        time: "8:00 PM",
        network: "ESPN",
        featured: true,
      },
      {
        id: "mlb-2",
        homeTeam: "Boston Red Sox",
        awayTeam: "New York Yankees",
        date: "2025-10-27",
        time: "7:00 PM",
        network: "Fox Sports",
      },
    ],
  },
  {
    id: "nfl",
    name: "National Football League",
    shortName: "NFL",
    slug: "nfl",
    tagline: "The Ultimate Gridiron Experience",
    description: "Feel the intensity of every touchdown, tackle, and game-winning field goal. The NFL brings unmatched excitement from kickoff to the final whistle.",
    image: "/src/assets/sports-nfl-action.jpg",
    color: "#013369",
    teams: [
      { id: "49ers", name: "49ers", city: "San Francisco", slug: "49ers" },
      { id: "chiefs", name: "Chiefs", city: "Kansas City", slug: "chiefs" },
      { id: "cowboys", name: "Cowboys", city: "Dallas", slug: "cowboys" },
      { id: "packers", name: "Packers", city: "Green Bay", slug: "packers" },
      { id: "patriots", name: "Patriots", city: "New England", slug: "patriots" },
      { id: "broncos", name: "Broncos", city: "Denver", slug: "broncos" },
    ],
    broadcasts: [
      {
        id: "nfl-1",
        homeTeam: "San Francisco 49ers",
        awayTeam: "Dallas Cowboys",
        date: "2025-10-26",
        time: "4:30 PM",
        network: "NBC",
        featured: true,
      },
      {
        id: "nfl-2",
        homeTeam: "Kansas City Chiefs",
        awayTeam: "Green Bay Packers",
        date: "2025-10-27",
        time: "1:00 PM",
        network: "CBS",
      },
    ],
  },
  {
    id: "soccer",
    name: "International Soccer",
    shortName: "Soccer",
    slug: "soccer",
    tagline: "The Beautiful Game",
    description: "Watch the world's most popular sport with top leagues, international tournaments, and unforgettable moments of skill and passion.",
    image: "/src/assets/sports-soccer-messi.jpg",
    color: "#00A651",
    teams: [
      { id: "barcelona", name: "Barcelona", city: "Barcelona", slug: "barcelona" },
      { id: "realmadrid", name: "Real Madrid", city: "Madrid", slug: "realmadrid" },
      { id: "mancity", name: "Manchester City", city: "Manchester", slug: "mancity" },
      { id: "liverpool", name: "Liverpool", city: "Liverpool", slug: "liverpool" },
      { id: "psg", name: "PSG", city: "Paris", slug: "psg" },
      { id: "bayern", name: "Bayern Munich", city: "Munich", slug: "bayern" },
    ],
    broadcasts: [
      {
        id: "soccer-1",
        homeTeam: "Barcelona",
        awayTeam: "Real Madrid",
        date: "2025-10-28",
        time: "3:00 PM",
        network: "beIN Sports",
        featured: true,
      },
      {
        id: "soccer-2",
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        date: "2025-10-29",
        time: "12:30 PM",
        network: "NBC Sports",
      },
    ],
  },
  {
    id: "nba",
    name: "National Basketball Association",
    shortName: "NBA",
    slug: "nba",
    tagline: "Where Amazing Happens",
    description: "Experience the fast-paced action of professional basketball with incredible athleticism, clutch shots, and championship dreams.",
    image: "/src/assets/sports-athletics.jpg",
    color: "#C8102E",
    teams: [
      { id: "lakers", name: "Lakers", city: "Los Angeles", slug: "lakers" },
      { id: "celtics", name: "Celtics", city: "Boston", slug: "celtics" },
      { id: "warriors", name: "Warriors", city: "Golden State", slug: "warriors" },
      { id: "heat", name: "Heat", city: "Miami", slug: "heat" },
      { id: "bucks", name: "Bucks", city: "Milwaukee", slug: "bucks" },
      { id: "nets", name: "Nets", city: "Brooklyn", slug: "nets" },
    ],
    broadcasts: [
      {
        id: "nba-1",
        homeTeam: "Los Angeles Lakers",
        awayTeam: "Boston Celtics",
        date: "2025-10-26",
        time: "10:00 PM",
        network: "TNT",
        featured: true,
      },
      {
        id: "nba-2",
        homeTeam: "Golden State Warriors",
        awayTeam: "Miami Heat",
        date: "2025-10-27",
        time: "8:30 PM",
        network: "ESPN",
      },
    ],
  },
  {
    id: "nhl",
    name: "National Hockey League",
    shortName: "NHL",
    slug: "nhl",
    tagline: "The Coolest Game on Earth",
    description: "Feel the ice-cold intensity of professional hockey with lightning-fast plays, powerful shots, and championship battles.",
    image: "/src/assets/sports-soccer-vintage.jpg",
    color: "#000000",
    teams: [
      { id: "canadiens", name: "Canadiens", city: "Montreal", slug: "canadiens" },
      { id: "mapleleafs", name: "Maple Leafs", city: "Toronto", slug: "mapleleafs" },
      { id: "bruins", name: "Bruins", city: "Boston", slug: "bruins" },
      { id: "rangers", name: "Rangers", city: "New York", slug: "rangers" },
      { id: "lightning", name: "Lightning", city: "Tampa Bay", slug: "lightning" },
      { id: "avalanche", name: "Avalanche", city: "Colorado", slug: "avalanche" },
    ],
    broadcasts: [
      {
        id: "nhl-1",
        homeTeam: "Toronto Maple Leafs",
        awayTeam: "Montreal Canadiens",
        date: "2025-10-26",
        time: "7:00 PM",
        network: "ESPN+",
        featured: true,
      },
      {
        id: "nhl-2",
        homeTeam: "Colorado Avalanche",
        awayTeam: "Tampa Bay Lightning",
        date: "2025-10-27",
        time: "9:00 PM",
        network: "TNT",
      },
    ],
  },
];

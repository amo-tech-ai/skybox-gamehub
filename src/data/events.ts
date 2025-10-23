import heroImage from "@/assets/hero-world-series.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodImage from "@/assets/food-spread.jpg";
import ufcImage from "@/assets/event-ufc.jpg";
import soccerImage from "@/assets/event-soccer.jpg";
import nflImage from "@/assets/event-nfl.jpg";
import worldSeriesHero from "@/assets/world-series-hero.jpg";
import halloweenParty from "@/assets/halloween-party-2.jpg";

export interface Event {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
  isPast?: boolean;
  fullDescription?: string;
  highlights?: string[];
  prizes?: Array<{ title: string; description: string }>;
  specials?: Array<{ name: string; description: string; price?: string }>;
}

export const events: Event[] = [
  {
    slug: "world-series-2025",
    title: "World Series 2025 Watch Party",
    subtitle: "Live at Skybox Medellín",
    date: "October 24, 2025",
    time: "7:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "Experience the pinnacle of baseball at Skybox! Watch every pitch of the 2025 World Series on our massive HD screens with the best fans in Medellín.",
    fullDescription: "Join us for the most anticipated baseball event of the year! The 2025 World Series comes to Skybox Medellín with an unforgettable watch party experience. Massive HD screens, premium sound system, and an electric atmosphere as we witness history in the making.",
    category: "Baseball",
    image: worldSeriesHero,
    highlights: [
      "Multiple giant HD screens showing every angle",
      "Premium sound system - feel every crack of the bat",
      "Full bar with World Series drink specials",
      "Authentic ballpark food menu",
      "VIP rooftop seating available",
      "Live commentary and expert analysis",
      "Photo booth with World Series props",
      "Giveaways and prizes throughout the game"
    ],
    specials: [
      {
        name: "Home Run Hot Dogs",
        description: "Classic ballpark dogs with all the fixings",
        price: "COP 25,000"
      },
      {
        name: "Grand Slam Nachos",
        description: "Loaded nachos with cheese, jalapeños, and your choice of protein",
        price: "COP 35,000"
      },
      {
        name: "Seventh Inning Stretch Burger",
        description: "Double patty burger with special sauce",
        price: "COP 45,000"
      },
      {
        name: "Championship Beer Bucket",
        description: "5 ice-cold beers to share",
        price: "COP 60,000"
      },
      {
        name: "World Series Cocktail",
        description: "Signature orange and green cocktail",
        price: "COP 28,000"
      }
    ]
  },
  {
    slug: "halloween-party-2025",
    title: "Medellín Halloween Party",
    subtitle: "Skybox Rooftop Bash",
    date: "October 31, 2025",
    time: "8:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "The ultimate Halloween party at Medellín's premier rooftop venue! Costume contest with amazing prizes, DJ, drink specials, and unforgettable rooftop atmosphere.",
    fullDescription: "Get ready for Medellín's most epic Halloween celebration! Skybox transforms into a haunted rooftop paradise with spine-tingling decorations, killer DJ sets, costume contests, and drink specials that will make you scream with joy. Don't miss the scariest party of the year!",
    category: "Special Event",
    image: halloweenParty,
    highlights: [
      "Live DJ spinning all night long",
      "Best costume contest with cash prizes",
      "Halloween-themed cocktails & shots",
      "Photo booth with spooky props",
      "Rooftop dance floor with city views",
      "Themed food menu",
      "Horror movie screening area",
      "Surprise giveaways throughout the night"
    ],
    prizes: [
      {
        title: "Best Overall Costume - COP 500,000",
        description: "Most creative, detailed, and impressive costume"
      },
      {
        title: "Scariest Costume - COP 300,000",
        description: "The costume that gives us nightmares"
      },
      {
        title: "Funniest Costume - COP 200,000",
        description: "Make us laugh and win cash"
      },
      {
        title: "Best Group Costume - COP 400,000",
        description: "Coordinated group of 3 or more"
      }
    ],
    specials: [
      {
        name: "Bloody Mary (Literally)",
        description: "Vodka, tomato juice, spices, with vampire fang garnish",
        price: "COP 22,000"
      },
      {
        name: "Witch's Brew",
        description: "Mysterious green cocktail that glows in the dark",
        price: "COP 25,000"
      },
      {
        name: "Zombie Shot",
        description: "Brain-melting shot combination",
        price: "COP 12,000"
      },
      {
        name: "Devil's Wings",
        description: "Spicy buffalo wings with hellfire sauce",
        price: "COP 35,000"
      },
      {
        name: "Monster Burger",
        description: "Triple-decker burger with all the toppings",
        price: "COP 48,000"
      },
      {
        name: "Pumpkin Spice Delight",
        description: "Seasonal dessert cocktail",
        price: "COP 24,000"
      }
    ]
  },
  {
    slug: "world-series-game-1",
    title: "World Series Game 1",
    subtitle: "Toronto Blue Jays vs Los Angeles Dodgers",
    date: "October 24, 2025",
    time: "7:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "Experience the ultimate showdown as two legendary teams clash in the World Series! Watch every pitch, every swing, every historic moment on our massive screens with the best fans in Medellín. Don't miss history in the making.",
    category: "Baseball",
    image: heroImage,
  },
  {
    slug: "champions-league-final",
    title: "Champions League Final",
    subtitle: "The Ultimate European Football Championship",
    date: "June 1, 2025",
    time: "3:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "The biggest match in European football is here! Join us for the Champions League Final with premium viewing, authentic European atmosphere, and fellow football fanatics. Who will lift the trophy?",
    category: "Soccer",
    image: soccerImage,
  },
  {
    slug: "ufc-main-event",
    title: "UFC Main Event",
    subtitle: "Championship Fight Night",
    date: "November 15, 2025",
    time: "10:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "Get ready for the most intense night of the year! Watch championship UFC fights live on massive screens with fight fans who understand the sport. Every knockout, every submission, every moment of glory.",
    category: "UFC",
    image: ufcImage,
  },
  {
    slug: "nfl-sunday-brunch",
    title: "NFL Sunday Brunch",
    subtitle: "Every Sunday During NFL Season",
    date: "Every Sunday",
    time: "12:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "Start your Sunday right with bottomless mimosas, delicious brunch menu, and all the NFL action you can handle. Multiple screens showing all the games simultaneously. Book your table now!",
    category: "Football",
    image: nflImage,
  },
  {
    slug: "world-series-game-2",
    title: "World Series Game 2",
    subtitle: "Toronto Blue Jays vs Los Angeles Dodgers",
    date: "October 25, 2025",
    time: "7:00 PM",
    location: "Skybox Medellín Rooftop",
    description: "The series continues! Join us for Game 2 as the battle for baseball supremacy intensifies. Premium seating, unbeatable atmosphere, and the best sports bar energy in Medellín.",
    category: "Baseball",
    image: heroImage,
  },
  {
    slug: "premier-league-derby",
    title: "Premier League Derby",
    subtitle: "Classic English Football Rivalry",
    date: "December 10, 2025",
    time: "10:00 AM",
    location: "Skybox Medellín Rooftop",
    description: "Early morning kickoff for one of England's fiercest rivalries! We'll have breakfast specials, proper English atmosphere, and all the passion you'd expect from a derby match.",
    category: "Soccer",
    image: soccerImage,
  },
];

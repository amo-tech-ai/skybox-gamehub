import heroImage from "@/assets/hero-world-series.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodImage from "@/assets/food-spread.jpg";
import ufcImage from "@/assets/event-ufc.jpg";
import soccerImage from "@/assets/event-soccer.jpg";
import nflImage from "@/assets/event-nfl.jpg";

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
}

export const events: Event[] = [
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

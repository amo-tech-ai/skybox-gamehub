import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Utensils, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import heroImage from "@/assets/nfl-stadium-hero.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodImage from "@/assets/food-spread.jpg";
import eventNfl from "@/assets/event-nfl.jpg";

const WorldSeries = () => {
  const upcomingGames = [
    {
      gameNumber: 1,
      date: "Sunday, Feb 9",
      time: "6:30 PM ET / 5:30 PM COT",
      teams: "Kansas City Chiefs vs Philadelphia Eagles",
      venue: "Caesars Superdome, New Orleans"
    },
    {
      gameNumber: 2,
      date: "Thursday, Sep 5",
      time: "8:20 PM ET / 7:20 PM COT",
      teams: "Season Kickoff Game - TBA",
      venue: "Opening Night Stadium"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] drop-shadow-lg uppercase tracking-tight">
              NFL 2025 Season Watch Parties at Skybox Medellín!
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-bold drop-shadow-md">
              Super Bowl LIX · Playoffs · Every Sunday Night Game
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md font-medium">
              Touchdowns. Tackles. Championships. Experience every play, every yard, every electrifying moment on our giant screens with the ultimate game-day atmosphere in Medellín.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600">
                <Link to="/reserve">
                  <Calendar className="w-5 h-5 mr-2" />
                  Reserve Your Seat
                </Link>
              </Button>
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-green-500 hover:bg-green-600 text-white">
                <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Showdown Section - Light Background */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
              Game Day. Every Sunday.
            </h2>
            <p className="text-lg text-muted-foreground">
              <span className="text-orange-500 font-bold">32 teams. One goal. Pure Football.</span> Watch it all at Skybox.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
            {/* AFC */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={foodImage} 
                alt="AFC Conference atmosphere"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-black text-white mb-2">AFC</h3>
                <p className="text-sm text-white/80 font-semibold">Chiefs · Bills · Ravens · Bengals</p>
              </div>
            </div>

            {/* Center Promo */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src={heroImage} 
                alt="NFL 2025 Season promotional graphic"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* NFC */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={venueImage} 
                alt="NFC Conference atmosphere"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-black text-white mb-2">NFC</h3>
                <p className="text-sm text-white/80 font-semibold">Eagles · 49ers · Cowboys · Lions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Games Preview - Dark Background */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              🏈 Upcoming NFL Watch Parties
            </h2>
            <p className="text-lg text-white/80">
              Don't miss kickoff — <span className="text-orange-500 font-bold">reserve your spot now</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-8">
            {upcomingGames.map((game) => (
              <div key={game.gameNumber} className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white hover:bg-white/20 transition-all">
                <div className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">
                  GAME {game.gameNumber}
                </div>
                <h3 className="text-2xl font-bold mb-4">{game.teams}</h3>
                <div className="space-y-2 text-sm">
                  <div>📅 {game.date}</div>
                  <div>🕐 {game.time}</div>
                  <div>📍 {game.venue}</div>
                </div>
                <Button asChild className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white">
                  <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="bg-white text-foreground border-white/20 hover:bg-white/90">
              <Link to="/events">
                View Full Schedule
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Championship Atmosphere - Light Background */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                Experience Every Play Live at Skybox
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                From <span className="text-orange-500 font-bold">kickoff to the final whistle</span>, feel the energy of game day. Every touchdown, every tackle, every heart-stopping moment—<span className="text-orange-500 font-bold">live and loud</span> at Skybox Medellín.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                At Skybox, every game is an event. <span className="text-foreground font-semibold">Giant screens, surround sound, rooftop views</span>, and a crowd that celebrates every yard with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                  <Link to="/gallery">
                    <Trophy className="w-5 h-5 mr-2" />
                    See Our Atmosphere
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                  <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={eventNfl} 
                  alt="Championship celebration"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Skybox - Dark Background */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Watch at Skybox?
            </h2>
            <p className="text-lg text-white/80 font-medium">
              The ultimate NFL game-day experience in Medellín
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Giant Screens</h3>
              <p className="text-sm text-white/80">
                Multiple HD screens with surround sound — you won't miss a moment
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                <Utensils className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Game Day Eats</h3>
              <p className="text-sm text-white/80">
                Wings, burgers, loaded nachos, and ice-cold beers all game long
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Rooftop Terrace</h3>
              <p className="text-sm text-white/80">
                Premium views from our exclusive rooftop VIP area
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-500/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Every Game Live</h3>
              <p className="text-sm text-white/80">
                Sunday Night Football, Monday Night, Playoffs & Super Bowl
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmosphere Slider Section - Dark Background */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              The Skybox Experience
            </h2>
            <p className="text-lg text-white/80 font-medium">
              <span className="text-orange-500 font-bold">Giant screens. Epic plays. Your gameday home.</span>
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                    <img 
                      src={eventNfl} 
                      alt="Crowd celebrating at Skybox"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">Championship Atmosphere</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                    <img 
                      src={venueImage} 
                      alt="Rooftop terrace at Skybox"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">Rooftop Views</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                    <img 
                      src={heroImage} 
                      alt="Big screens showing the World Series"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">Live Action</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[400px] md:h-[500px]">
                    <img 
                      src={foodImage} 
                      alt="Game day food at Skybox"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold text-white">Game Day Fuel</h3>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section - Light Background */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-orange-600 uppercase">
              Game Day Awaits — Reserve Your Spot!
            </h2>
            <p className="text-lg font-bold text-orange-600">
              32 teams. One championship. All the action in one place.
            </p>
            <p className="text-lg text-muted-foreground font-medium">
              Secure your table for <span className="text-orange-500 font-bold">NFL Sundays</span> and feel the stadium atmosphere right here in <span className="text-orange-500 font-bold">Medellín</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-orange-500 hover:bg-orange-600">
                <Link to="/menu">
                  <Utensils className="w-5 h-5 mr-2" />
                  View Menu & Specials
                </Link>
              </Button>
              <Button asChild size="lg" className="text-lg px-8 py-6 bg-green-500 hover:bg-green-600 text-white">
                <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WorldSeries;

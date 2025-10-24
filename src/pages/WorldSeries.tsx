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
import heroImage from "@/assets/hero-world-series.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodImage from "@/assets/food-spread.jpg";
import eventNfl from "@/assets/event-nfl.jpg";

const WorldSeries = () => {
  const upcomingGames = [
    {
      gameNumber: 1,
      date: "Friday, Oct 24",
      time: "8:00 PM ET / 7:00 PM COT",
      teams: "Toronto Blue Jays @ Los Angeles Dodgers",
      venue: "Dodger Stadium, Los Angeles"
    },
    {
      gameNumber: 2,
      date: "Saturday, Oct 25",
      time: "8:00 PM ET / 7:00 PM COT",
      teams: "Toronto Blue Jays @ Los Angeles Dodgers",
      venue: "Dodger Stadium, Los Angeles"
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] drop-shadow-lg">
              Watch the World Series 2025 Live at Skybox Medellín!
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-semibold drop-shadow-md">
              Toronto Blue Jays vs Los Angeles Dodgers · Oct 24 – Nov 1
            </p>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Four Wins. One Trophy. Two Cities. Who Reigns? Experience every pitch, every hit, every moment on our giant screens with the best atmosphere in Medellín.
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              The Ultimate Showdown
            </h2>
            <p className="text-lg text-muted-foreground">
              <span className="text-orange-500 font-semibold">Two legendary teams. One championship.</span> History in the making.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-center">
            {/* Blue Jays */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={foodImage} 
                alt="Toronto Blue Jays atmosphere"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold text-white mb-2">Toronto Blue Jays</h3>
                <p className="text-sm text-white/80">Canada's Pride Returns to the Fall Classic</p>
              </div>
            </div>

            {/* Center Promo */}
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src={heroImage} 
                alt="World Series 2025 promotional graphic"
                className="w-full h-[400px] object-cover"
              />
            </div>

            {/* Dodgers */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                src={venueImage} 
                alt="LA Dodgers atmosphere"
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-bold text-white mb-2">Los Angeles Dodgers</h3>
                <p className="text-sm text-white/80">Defending Champions Seek Dynasty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Games Preview - Dark Background */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              📅 Upcoming World Series Watch Parties
            </h2>
            <p className="text-lg text-white/80">
              Don't miss the action — <span className="text-orange-500 font-semibold">secure your table now</span>
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
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Experience Every Moment Live at Skybox
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                When the <span className="text-orange-500 font-semibold">Dodgers</span> clinched the title, the roar was deafening. Now it's your turn to be part of history as <span className="text-orange-500 font-semibold">two titans clash</span> for baseball's ultimate prize.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                At Skybox, every game is an experience. <span className="text-foreground font-semibold">Giant screens, premium sound, rooftop views</span>, and a crowd that lives every pitch with you.
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Watch at Skybox?
            </h2>
            <p className="text-lg text-white/80">
              The ultimate sports viewing experience in Medellín
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
              <h3 className="text-xl font-bold text-white">Signature BBQ</h3>
              <p className="text-sm text-white/80">
                Game-night combos, wings, and playoff-themed drinks all night
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
                All World Series games broadcast live with expert commentary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atmosphere Slider Section - Dark Background */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              The Skybox Experience
            </h2>
            <p className="text-lg text-white/80">
              <span className="text-orange-500 font-semibold">Giant screens. Epic moments. Your seat.</span>
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
            <h2 className="text-4xl md:text-5xl font-bold text-orange-600">
              Your Seat Is Waiting — Reserve Now!
            </h2>
            <p className="text-lg font-semibold text-orange-600">
              Two teams. One trophy. All the energy in one place.
            </p>
            <p className="text-lg text-muted-foreground">
              Secure your spot for the <span className="text-orange-500 font-semibold">Fall Classic</span> and feel the stadium vibes in <span className="text-orange-500 font-semibold">Medellín</span>.
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

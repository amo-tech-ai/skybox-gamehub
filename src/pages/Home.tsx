import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Tv, Users, Clock, ArrowUp } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import LiveNowBanner from "@/components/home/LiveNowBanner";
import PromoBanner from "@/components/home/PromoBanner";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import FeaturePhotoCard from "@/components/home/FeaturePhotoCard";
import EventBookingCTA from "@/components/home/EventBookingCTA";
import { useUpcomingEvents } from "@/hooks/useEvents";
import heroImage from "@/assets/nfl-hero-home.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodSpread from "@/assets/food-spread.jpg";
import sportsNFL from "@/assets/sports-nfl-action.jpg";
import sportsSoccer from "@/assets/sports-soccer-messi.jpg";
import sportsMLB from "@/assets/sports-mlb-dodgers.jpg";
import { useState, useEffect } from "react";

const Home = () => {
  const { data: upcomingEvents, isLoading, error } = useUpcomingEvents(3);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowBackToTop(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Parallax effect for hero
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="min-h-screen">
      {/* Live Now Banner */}
      <LiveNowBanner />
      
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="parallax-hero absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${parallaxOffset}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white">
          <div className="animate-fade-in">
            <div className="trending-badge bg-primary/90 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-6 inline-block">
              🏈 GAME DAY HEADQUARTERS
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-balance animate-scale-in uppercase tracking-tight">
              NFL 2025 Season
              <br />
              <span className="text-primary">Watch Parties at Skybox</span>
              <br />
              Medellín!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-balance max-w-2xl mx-auto animate-fade-in-up font-semibold">
              Experience every touchdown, tackle, and championship moment on massive screens at Medellín's ultimate game-day destination
            </p>


            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Link to="/reserve">
                <Button size="lg" className="gradient-primary hover-lift glow-on-hover ripple text-lg px-8">
                  Reserve Your Table
                </Button>
              </Link>
              <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0 text-lg px-8 ripple">
                  Chat on WhatsApp
                </Button>
              </a>
              <Link to="/vip">
                <Button size="lg" variant="secondary" className="text-lg px-8 ripple">
                  View VIP Rooftop Lounge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <PromoBanner />

      {/* Upcoming Events */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              UPCOMING EVENTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Upcoming World Series Watch Parties</h2>
            <p className="text-xl text-muted-foreground">Don't miss this season's epic showdown</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Failed to load events. Please try again later.</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {upcomingEvents && upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <div key={event.id} className="stagger-item">
                      <EventCard
                        title={event.title}
                        date={new Date(event.event_date).toLocaleDateString()}
                        time={new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        location={event.venue}
                        category={event.category}
                        image={event.image_url || heroImage}
                        slug={event.id}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
                  </div>
                )}
              </div>

              <div className="text-center">
                <Link to="/events">
                  <Button variant="outline" size="lg" className="hover-lift">
                    View Full Schedule
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Sports Directory Showcase */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              EXPLORE ALL SPORTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Sports Hub in Medellín</h2>
            <p className="text-xl text-muted-foreground">Watch MLB, NFL, NBA, NHL, Soccer & more on giant screens</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Link to="/sports" className="stagger-item relative overflow-hidden rounded-lg group">
              <img 
                src={sportsMLB} 
                alt="MLB" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">Major League Baseball</h3>
                  <p className="text-sm text-white/80">Watch every pitch live</p>
                </div>
              </div>
            </Link>

            <Link to="/sports" className="stagger-item relative overflow-hidden rounded-lg group">
              <img 
                src={sportsNFL} 
                alt="NFL" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">National Football League</h3>
                  <p className="text-sm text-white/80">Every touchdown matters</p>
                </div>
              </div>
            </Link>

            <Link to="/sports" className="stagger-item relative overflow-hidden rounded-lg group">
              <img 
                src={sportsSoccer} 
                alt="Soccer" 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-1">International Soccer</h3>
                  <p className="text-sm text-white/80">The beautiful game</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center">
            <Link to="/sports">
              <Button size="lg" className="gradient-primary hover-lift">
                Explore All Sports & Leagues
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Watch at Skybox - With Photos */}
      <section className="py-16 bg-dark-section text-dark-foreground">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Watch at Skybox?</h2>
            <p className="text-xl text-muted-foreground">The ultimate sports viewing experience in Medellín</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="stagger-item">
              <FeaturePhotoCard 
                title="Massive HD Screens"
                description="Multiple giant screens ensure you catch every play from any angle"
                image={venueImage}
              />
            </div>
            <div className="stagger-item">
              <FeaturePhotoCard 
                title="Signature Cocktails"
                description="Craft drinks and ice-cold beers that elevate every game"
                image={foodSpread}
              />
            </div>
            <div className="stagger-item">
              <FeaturePhotoCard 
                title="City Views"
                description="Stunning rooftop views of Medellín's skyline"
                image={venueImage}
              />
            </div>
            <div className="stagger-item">
              <FeaturePhotoCard 
                title="Unmatched Atmosphere"
                description="Electric energy with passionate fans and live commentary"
                image={sportsNFL}
              />
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-16">
            <h3 className="text-3xl font-bold text-center mb-8">What Our Guests Say</h3>
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
                THE SKYBOX EXPERIENCE
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Experience Every Moment Live at Skybox
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                When the Dodgers crushed the 1-0, the roar was deafening. Now it's your turn to be part of history as two titans clash for baseball's ultimate prize.
              </p>
              <ul className="space-y-3 mb-8 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Giant screens & premium sound system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Rooftop seating with epic city views</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Game-night specials on food & drinks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Electric atmosphere with true fans</span>
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/reserve">
                  <Button size="lg" className="gradient-primary hover-lift">
                    Reserve Table
                  </Button>
                </Link>
                <Link to="/vip">
                  <Button size="lg" variant="secondary">
                    Book VIP Rooftop Experience
                  </Button>
                </Link>
                <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0">
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <img
                src={venueImage}
                alt="Skybox Interior"
                className="rounded-lg shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary-glow to-primary text-white">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
            Your Seat is Waiting — Reserve Now!
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in">
            Two teams. One trophy. All the energy in one place.
          </p>
          <p className="text-lg mb-8 animate-fade-in">
            Secure your spot for the <strong>Fall Classic</strong> and live the stadium dream at Medellín's best rooftop bar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/reserve">
              <Button size="lg" variant="secondary" className="text-lg px-8 hover-lift">
                View Times & Reserve
              </Button>
            </Link>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0 text-lg px-8">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Event Booking CTA Section */}
      <EventBookingCTA />

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover-lift glow-on-hover animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home;

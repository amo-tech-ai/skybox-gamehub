import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Tv, Users, Clock } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { events } from "@/data/events";
import heroImage from "@/assets/hero-world-series.jpg";
import venueImage from "@/assets/venue-interior.jpg";

const Home = () => {
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">
            Watch the World Series
            <br />
            <span className="text-primary">2025 Live at Skybox</span>
            <br />
            Medellín!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-balance max-w-2xl mx-auto">
            Experience every legendary moment on massive screens at Medellín's premier rooftop sports bar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reserve">
              <Button size="lg" className="gradient-primary hover-lift text-lg px-8">
                Reserve Your Table
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} {...event} image={event.image} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/events">
              <Button variant="outline" size="lg" className="hover-lift">
                View Full Schedule
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Watch at Skybox */}
      <section className="py-16 bg-dark-section text-dark-foreground">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Watch at Skybox?</h2>
            <p className="text-xl text-muted-foreground">The ultimate sports viewing experience in Medellín</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-lg bg-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Tv size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Giant Screens</h3>
              <p className="text-muted-foreground">
                Multiple massive HD screens ensure you don't miss a single play from any seat
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Signature Bar</h3>
              <p className="text-muted-foreground">
                Craft cocktails, ice-cold beer, and game-day specials that score every time
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rooftop Vibes</h3>
              <p className="text-muted-foreground">
                Stunning city views combined with championship atmosphere create unforgettable moments
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card hover-lift">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Epic Game Days</h3>
              <p className="text-muted-foreground">
                Every game is an event with live commentary, fan competitions, and non-stop energy
              </p>
            </div>
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
    </div>
  );
};

export default Home;

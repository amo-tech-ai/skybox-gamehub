import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { events } from "@/data/events";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import foodImage from "@/assets/food-spread.jpg";
import venueImage from "@/assets/venue-interior.jpg";

const EventDetail = () => {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
          <Link to="/events">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    { src: venueImage, alt: "Skybox Venue" },
    { src: foodImage, alt: "Game Night Food" },
    { src: event.image, alt: event.title },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section 
        className="relative h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 container px-4 text-white">
          <Link to="/events" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Events</span>
          </Link>
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold mb-4">
            {event.category}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{event.title}</h1>
          {event.subtitle && (
            <p className="text-2xl mb-6 text-white/90">{event.subtitle}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/reserve">
              <Button size="lg" className="gradient-primary hover-lift">
                Reserve Your Seat
              </Button>
            </Link>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Event Info */}
      <section className="py-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-4">About This Event</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {event.description}
              </p>
              
              <div className="bg-card border rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Multiple massive screens with perfect viewing angles</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Game-day food & drink specials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Electric atmosphere with passionate fans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span>Premium rooftop seating with city views</span>
                  </li>
                </ul>
              </div>

              {/* Gallery */}
              <div>
                <h3 className="text-2xl font-bold mb-6">🎥 Venue & Atmosphere</h3>
                <GalleryGrid images={galleryImages} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-20">
                <h3 className="text-2xl font-bold mb-6">Event Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Date & Time</p>
                      <p className="text-muted-foreground">{event.date}</p>
                      <p className="text-muted-foreground">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-primary mt-1" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-muted-foreground">{event.location}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Calle Santa Fe #39-106<br />
                        El Poblado, Medellín
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/reserve" className="block">
                    <Button className="w-full gradient-primary hover-lift" size="lg">
                      Reserve Table
                    </Button>
                  </Link>
                  <a 
                    href="https://wa.me/573047862834" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button 
                      className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground" 
                      size="lg"
                    >
                      WhatsApp Us
                    </Button>
                  </a>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-semibold text-primary mb-2">⚡ Limited Seating</p>
                  <p className="text-sm text-muted-foreground">
                    Book early to secure the best spots. Prime viewing tables fill up fast!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;

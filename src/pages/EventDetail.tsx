import { useParams, Link } from "react-router-dom";
import { events } from "@/data/events";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Gift, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GalleryGrid from "@/components/gallery/GalleryGrid";

// Import World Series images
import worldSeriesHero from "@/assets/world-series-hero.jpg";
import worldSeriesOhtani from "@/assets/world-series-ohtani.jpg";
import worldSeriesCelebration from "@/assets/world-series-celebration.jpg";
import worldSeriesTrophy from "@/assets/world-series-trophy.jpg";
import worldSeriesGame from "@/assets/world-series-game.jpg";
import worldSeriesCrowd from "@/assets/world-series-crowd.jpg";
import worldSeriesAction from "@/assets/world-series-action.jpg";
import worldSeriesStadium from "@/assets/world-series-stadium.jpg";

// Import Halloween images
import halloween1 from "@/assets/halloween-party-1.jpg";
import halloween2 from "@/assets/halloween-party-2.jpg";
import halloween3 from "@/assets/halloween-party-3.jpg";
import halloween4 from "@/assets/halloween-party-4.jpg";

const EventDetail = () => {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Event Not Found</h1>
          <p className="text-muted-foreground">The event you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Determine gallery images based on event
  let galleryImages: Array<{ src: string; alt: string }> = [];
  
  if (event.slug === "world-series-2025" || event.slug === "world-series-game-1" || event.slug === "world-series-game-2") {
    galleryImages = [
      { src: worldSeriesHero, alt: "World Series 2025 Watch Party" },
      { src: worldSeriesOhtani, alt: "Shohei Ohtani Dodgers Action" },
      { src: worldSeriesCelebration, alt: "World Series Celebration" },
      { src: worldSeriesTrophy, alt: "World Series Trophy" },
      { src: worldSeriesGame, alt: "World Series Game Action" },
      { src: worldSeriesCrowd, alt: "World Series Crowd" },
      { src: worldSeriesAction, alt: "World Series Baseball Action" },
      { src: worldSeriesStadium, alt: "World Series Stadium" },
    ];
  } else if (event.slug === "halloween-party-2025") {
    galleryImages = [
      { src: halloween2, alt: "Halloween Party at Skybox" },
      { src: halloween1, alt: "Halloween Costume Party" },
      { src: halloween3, alt: "Halloween Party Crowd" },
      { src: halloween4, alt: "Halloween Party Atmosphere" },
    ];
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 space-y-6 animate-fade-in">
          <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold uppercase">
            {event.category}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white">{event.title}</h1>
          {event.subtitle && (
            <p className="text-2xl md:text-3xl text-white/90">{event.subtitle}</p>
          )}
          <div className="flex flex-wrap gap-6 justify-center text-white text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{event.location}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
              <Link to="/reserve">Reserve Your Spot</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20" asChild>
              <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">About This Event</h2>
                <p className="text-lg text-muted-foreground">{event.fullDescription || event.description}</p>
              </div>

              {event.highlights && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">What to Expect</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {event.highlights.map((h, i) => (
                      <Card key={i}>
                        <CardContent className="p-6"><p className="flex gap-3"><span className="text-accent">✓</span>{h}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {event.prizes && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-accent" />
                    <h2 className="text-3xl font-bold">Prizes</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.prizes.map((p, i) => (
                      <Card key={i}><CardContent className="p-6 space-y-2"><h3 className="text-xl font-bold text-accent">{p.title}</h3><p className="text-muted-foreground">{p.description}</p></CardContent></Card>
                    ))}
                  </div>
                </div>
              )}

              {event.specials && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Utensils className="w-8 h-8 text-accent" />
                    <h2 className="text-3xl font-bold">Specials</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {event.specials.map((s, i) => (
                      <Card key={i}><CardContent className="p-6 space-y-2"><div className="flex justify-between"><h3 className="font-bold">{s.name}</h3>{s.price && <span className="text-accent font-bold">{s.price}</span>}</div><p className="text-muted-foreground">{s.description}</p></CardContent></Card>
                    ))}
                  </div>
                </div>
              )}

              {galleryImages.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Gallery</h2>
                  <GalleryGrid images={galleryImages} />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-2xl font-bold">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex gap-3"><Calendar className="w-5 h-5 text-accent" /><div><p className="font-semibold">Date</p><p className="text-muted-foreground">{event.date}</p></div></div>
                    <div className="flex gap-3"><Clock className="w-5 h-5 text-accent" /><div><p className="font-semibold">Time</p><p className="text-muted-foreground">{event.time}</p></div></div>
                    <div className="flex gap-3"><MapPin className="w-5 h-5 text-accent" /><div><p className="font-semibold">Location</p><p className="text-muted-foreground">{event.location}</p></div></div>
                  </div>
                  <div className="space-y-3 pt-6 border-t">
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild><Link to="/reserve">Reserve Now</Link></Button>
                    <Button size="lg" variant="outline" className="w-full" asChild><a href="https://wa.me/573001234567">WhatsApp</a></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;

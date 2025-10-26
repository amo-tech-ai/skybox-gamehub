import { useParams, Link } from "react-router-dom";
import { useEventBySlug } from "@/hooks/useEvents";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Gift, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { Loader2 } from "lucide-react";

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
  const { data: event, isLoading, error } = useEventBySlug(slug || '');

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-accent" />
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !event) {
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

  // Format event date and time
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Determine gallery images based on event
  let galleryImages: Array<{ src: string; alt: string }> = [];

  if (event.slug.includes("world-series")) {
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
          backgroundImage: event.image_url
            ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${event.image_url})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 space-y-6 animate-fade-in">
          {event.category && (
            <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-bold uppercase">
              {event.category}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold text-white">{event.title}</h1>
          <div className="flex flex-wrap gap-6 justify-center text-white text-lg">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{formattedTime}</span>
            </div>
            {event.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
            )}
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
              {event.description && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">About This Event</h2>
                  <p className="text-lg text-muted-foreground">{event.description}</p>
                </div>
              )}

              {event.price && (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Pricing</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="text-lg">Entry Price</span>
                        <span className="text-2xl font-bold text-accent">
                          ${event.price.toLocaleString()} {event.price ? 'COP' : ''}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
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
                    <div className="flex gap-3">
                      <Calendar className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-semibold">Date</p>
                        <p className="text-muted-foreground">{formattedDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-semibold">Time</p>
                        <p className="text-muted-foreground">{formattedTime}</p>
                      </div>
                    </div>
                    {event.venue && (
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-accent" />
                        <div>
                          <p className="font-semibold">Location</p>
                          <p className="text-muted-foreground">{event.venue}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 pt-6 border-t">
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
                      <Link to="/reserve">Reserve Now</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full" asChild>
                      <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">
                        WhatsApp
                      </a>
                    </Button>
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

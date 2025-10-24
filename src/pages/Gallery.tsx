import GalleryGrid from "@/components/gallery/GalleryGrid";
import heroImage from "@/assets/hero-world-series.jpg";
import venueImage from "@/assets/venue-interior.jpg";
import foodImage from "@/assets/food-spread.jpg";
import ufcImage from "@/assets/event-ufc.jpg";
import soccerImage from "@/assets/event-soccer.jpg";
import nflImage from "@/assets/event-nfl.jpg";

const Gallery = () => {
  const galleryImages = [
    { src: venueImage, alt: "Skybox rooftop interior with massive screens" },
    { src: heroImage, alt: "World Series watch party atmosphere" },
    { src: foodImage, alt: "Game day food and drinks" },
    { src: ufcImage, alt: "UFC fight night at Skybox" },
    { src: soccerImage, alt: "Champions League viewing party" },
    { src: nflImage, alt: "NFL Sunday brunch" },
    { src: venueImage, alt: "Rooftop seating with city views" },
    { src: foodImage, alt: "Buffalo wings and craft beer" },
    { src: soccerImage, alt: "Soccer fans celebrating" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            The Skybox Experience
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            See what makes Skybox Medellín the ultimate destination for live sports
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              Click any image to view in full screen
            </p>
          </div>
          <GalleryGrid images={galleryImages} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience It Live?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us for the next big game and create your own championship memories
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/reserve">
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover-lift">
                Reserve Your Table
              </button>
            </a>
            <a href="/events">
              <button className="px-8 py-3 border-2 border-primary text-primary rounded-lg font-bold hover-lift">
                View Events
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;

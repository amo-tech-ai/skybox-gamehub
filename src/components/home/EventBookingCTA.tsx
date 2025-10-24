import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Users, Building } from "lucide-react";

const EventBookingCTA = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              CORPORATE EVENTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Host Your Next Event at Skybox
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn your next corporate party, celebration, or team night out into an unforgettable rooftop experience — complete with premium cocktails, city views, and custom packages.
            </p>
          </div>

          {/* Benefits Icons */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building className="w-5 h-5" />
              <span className="text-sm font-medium">Premium Venue</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Flexible Capacity</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-medium">Full Service</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/corporate-events">
              <Button size="lg" className="gradient-primary hover-lift glow-on-hover text-lg px-8 py-6">
                <Calendar className="w-5 h-5 mr-2" />
                Book Your Event Today
              </Button>
            </Link>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0 text-lg px-8 py-6">
                Chat on WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBookingCTA;

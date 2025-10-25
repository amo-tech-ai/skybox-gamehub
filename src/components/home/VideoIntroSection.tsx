import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const VideoIntroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Welcome to Skybox Medellín
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground">
                Experience the city's premier rooftop sports bar — where friends, food, and live games come together.
              </p>
              <p className="text-lg text-muted-foreground">
                From epic game nights to rooftop celebrations, Skybox is where Medellín comes alive. Catch every moment with great food, crafted cocktails, and unbeatable views.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/reserve">
                <Button size="lg" className="gradient-primary hover-lift w-full sm:w-auto">
                  Reserve Your Table
                </Button>
              </Link>
              <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-whatsapp hover:bg-whatsapp/90 text-white border-0 w-full sm:w-auto">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Laureles 74b, Tv. 39B #40, Laureles-Estadio, Medellín, Antioquia</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span>301 467 3039</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Friday:</span>
                    <span>3 PM – 12 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Saturday:</span>
                    <span>10 AM – 12:30 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Sunday:</span>
                    <span>10 AM – 12:30 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Mon-Tue:</span>
                    <span>3 PM – 12 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Wednesday:</span>
                    <span>9 AM – 12 AM</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold w-24">Thursday:</span>
                    <span>3 PM – 12 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://www.instagram.com/skyboxmedellin/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.tiktok.com/discover/sky-box-medellin-menu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                aria-label="Follow us on TikTok"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="animate-fade-in lg:order-last order-first">
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
              <div className="bg-background rounded-lg overflow-hidden">
                <iframe
                  src="https://player.cloudinary.com/embed/?cloud_name=dqnnl0eny&public_id=Skybox_el_rooftop_m%C3%A1s_TOP_y_emocionante_de_Medellin_aqu%C3%AD_en_Laureles_ya_est%C3%A1_aqu%C3%AD_par_kjpqo9&profile=cld-looping"
                  width="640"
                  height="360"
                  style={{ height: "auto", width: "100%", aspectRatio: "640 / 360" }}
                  allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="Skybox Medellín rooftop experience video"
                  className="w-full"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoIntroSection;

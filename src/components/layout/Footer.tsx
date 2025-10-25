import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import skyboxLogo from "@/assets/skybox-logo-new.png";

const Footer = () => {
  return (
    <footer className="bg-dark-section text-dark-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={skyboxLogo} alt="Skybox Medellín" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Medellín's premier rooftop sports bar. Watch live sports on massive screens with the best energy in town.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/skyboxmedellin/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Button variant="outline" size="icon" className="hover-lift hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                  <Instagram size={18} />
                </Button>
              </a>
              <Button variant="outline" size="icon" className="hover-lift hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                <Facebook size={18} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/events" className="hover:text-primary transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/sports" className="hover:text-primary transition-colors">
                  Sports Directory
                </Link>
              </li>
              <li>
                <Link to="/vip" className="hover:text-primary transition-colors">
                  VIP Rooftop
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-primary transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-primary transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/reserve" className="hover:text-primary transition-colors">
                  Reserve
                </Link>
              </li>
              <li>
                <Link to="/friendsgiving" className="hover:text-primary transition-colors">
                  Friendsgiving Event
                </Link>
              </li>
              <li>
                <Link to="/private-events" className="hover:text-primary transition-colors">
                  Private Events
                </Link>
              </li>
              <li>
                <Link to="/corporate-booking" className="hover:text-primary transition-colors">
                  Corporate Booking
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p>Laureles 74b, Tv. 39B #40</p>
                  <p>Laureles-Estadio</p>
                  <p>Medellín, Antioquia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <a 
                  href="tel:+573014673039" 
                  className="hover:text-secondary transition-colors"
                  aria-label="Call Skybox Medellín at 301 467 3039"
                >
                  301 467 3039
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <a 
                  href="mailto:info@skyboxmedellin.com"
                  className="hover:text-secondary transition-colors"
                  aria-label="Email Skybox Medellín"
                >
                  info@skyboxmedellin.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={18} className="text-secondary mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <p><strong>Friday:</strong> 3 PM – 12 AM</p>
                  <p><strong>Saturday:</strong> 10 AM – 12:30 AM</p>
                  <p><strong>Sunday:</strong> 10 AM – 12:30 AM</p>
                  <p><strong>Mon-Tue:</strong> 3 PM – 12 AM</p>
                  <p><strong>Wednesday:</strong> 9 AM – 12 AM</p>
                  <p><strong>Thursday:</strong> 3 PM – 12 AM</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <a 
                  href="https://wa.me/573014673039" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Chat with Skybox Medellín on WhatsApp"
                >
                  <Button className="w-full bg-[hsl(142,70%,49%)] hover:bg-[hsl(142,70%,45%)] text-white">
                    Chat on WhatsApp
                  </Button>
                </a>
                <div className="flex gap-3 justify-center">
                  <a
                    href="https://www.instagram.com/skyboxmedellin/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Skybox Medellín on Instagram"
                    className="hover-lift"
                  >
                    <Button variant="outline" size="icon" className="hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                      <Instagram size={18} />
                    </Button>
                  </a>
                  <a
                    href="https://www.tiktok.com/discover/sky-box-medellin-menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Skybox Medellín on TikTok"
                    className="hover-lift"
                  >
                    <Button variant="outline" size="icon" className="hover:bg-secondary hover:text-white hover:border-secondary transition-colors">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Skybox Medellín. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

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
              <Button variant="outline" size="icon" className="hover-lift">
                <Instagram size={18} />
              </Button>
              <Button variant="outline" size="icon" className="hover-lift">
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
                <MapPin size={18} className="text-primary mt-1" />
                <div>
                  <p>Calle Santa Fe #39-106</p>
                  <p>El Poblado, Medellín</p>
                  <p>Colombia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <p>+57 304 786 2834</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <p>info@skyboxmedellin.com</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={18} className="text-primary mt-1" />
                <div className="space-y-1">
                  <p><strong>Mon-Thu:</strong> 2 PM - 2 AM</p>
                  <p><strong>Fri-Sat:</strong> 12 PM - 3 AM</p>
                  <p><strong>Sunday:</strong> 12 PM - 12 AM</p>
                </div>
              </div>
              <div className="mt-4">
                <a 
                  href="https://wa.me/573047862834" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Chat on WhatsApp
                  </Button>
                </a>
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

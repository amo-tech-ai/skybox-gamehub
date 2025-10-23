import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-dark-section text-dark-foreground">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <span className="text-2xl font-bold">SKYBOX</span>
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
                  <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground">
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

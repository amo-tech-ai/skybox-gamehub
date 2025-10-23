import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Find us, call us, or message us. We're here to make your game day unforgettable.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container px-4 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Location */}
            <Card className="p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground">
                    Calle Santa Fe #39-106<br />
                    El Poblado, Medellín<br />
                    Colombia
                  </p>
                  <a
                    href="https://maps.google.com/?q=Calle+Santa+Fe+39-106+El+Poblado+Medellin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline mt-2 inline-block"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </Card>

            {/* Hours */}
            <Card className="p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Hours</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p><strong>Mon-Thu:</strong> 2 PM - 2 AM</p>
                    <p><strong>Fri-Sat:</strong> 12 PM - 3 AM</p>
                    <p><strong>Sunday:</strong> 12 PM - 12 AM</p>
                  </div>
                  <p className="text-sm text-primary mt-2">
                    Extended hours during major events!
                  </p>
                </div>
              </div>
            </Card>

            {/* Phone */}
            <Card className="p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p className="text-muted-foreground mb-3">
                    +57 304 786 2834
                  </p>
                  <a href="tel:+573047862834">
                    <Button variant="outline" size="sm">
                      Call Us
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email</h3>
                  <p className="text-muted-foreground mb-3">
                    info@skyboxmedellin.com
                  </p>
                  <a href="mailto:info@skyboxmedellin.com">
                    <Button variant="outline" size="sm">
                      Send Email
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* WhatsApp CTA */}
          <Card className="p-8 bg-whatsapp/10 border-whatsapp/20 text-center">
            <h3 className="text-2xl font-bold mb-4">Fastest Way to Reach Us</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Message us on WhatsApp for instant responses about reservations, events, or any questions. We typically reply within minutes!
            </p>
            <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
              <Button className="bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground" size="lg">
                Chat on WhatsApp
              </Button>
            </a>
          </Card>

          {/* Social Media */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="icon" className="w-12 h-12 hover-lift">
                <Instagram size={24} />
              </Button>
              <Button variant="outline" size="icon" className="w-12 h-12 hover-lift">
                <Facebook size={24} />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              @skyboxmedellin
            </p>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-0">
        <div className="container px-4">
          <div className="h-[400px] bg-muted rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d-75.5636!3d6.2088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTInMzEuNyJOIDc1wrAzMyc0OS4wIlc!5e0!3m2!1sen!2sco!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Skybox Medellín Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

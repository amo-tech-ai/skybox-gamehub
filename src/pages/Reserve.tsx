import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Users, Phone } from "lucide-react";

const Reserve = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    guests: "",
    date: "",
    time: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Reservation Request Sent! 🎉",
        description: "We'll confirm your table via WhatsApp shortly. Can't wait to see you!",
      });
      setFormData({ name: "", guests: "", date: "", time: "", phone: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Reserve Your Table
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Secure your spot for the biggest games. Best seats go fast!
          </p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6">Book Your Experience</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guests">Number of Guests *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="4"
                      className="pl-10"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone / WhatsApp *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+57 304 786 2834"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full gradient-primary hover-lift" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Reserve Now"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  We'll confirm your reservation via WhatsApp within 1 hour
                </p>
              </form>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 bg-primary/5">
                <h3 className="text-xl font-bold mb-4">Why Reserve?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Guaranteed seating for big games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Best views of all screens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Priority service during busy hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">✓</span>
                    <span>Skip the line, go straight to your table</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Prefer to Chat?</h3>
                <p className="text-muted-foreground mb-4">
                  Message us directly on WhatsApp for instant booking or questions about large groups and private events.
                </p>
                <a 
                  href="https://wa.me/573047862834" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground" size="lg">
                    Chat on WhatsApp
                  </Button>
                </a>
              </Card>

              <Card className="p-6 bg-secondary/5">
                <h3 className="text-xl font-bold mb-4">Location & Hours</h3>
                <p className="text-muted-foreground mb-2">
                  <strong>Address:</strong><br />
                  Calle Santa Fe #39-106<br />
                  El Poblado, Medellín
                </p>
                <p className="text-muted-foreground">
                  <strong>Hours:</strong><br />
                  Mon-Thu: 2 PM - 2 AM<br />
                  Fri-Sat: 12 PM - 3 AM<br />
                  Sunday: 12 PM - 12 AM
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reserve;

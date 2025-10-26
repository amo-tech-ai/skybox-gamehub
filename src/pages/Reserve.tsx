import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@/hooks/useBookings";
import { useUpcomingEvents } from "@/hooks/useEvents";
import { Calendar, Users, Phone, Mail } from "lucide-react";

const Reserve = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: "",
    numTickets: "1",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize hooks
  const createBooking = useCreateBooking();
  const { data: upcomingEvents, isLoading: eventsLoading } = useUpcomingEvents(10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Find selected event to calculate total
      const selectedEvent = upcomingEvents?.find(e => e.id === formData.eventId);
      const ticketPrice = selectedEvent?.price || 0;
      const totalAmount = ticketPrice * parseInt(formData.numTickets);

      // Create booking in database
      const booking = await createBooking.mutateAsync({
        event_id: formData.eventId,
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        num_tickets: parseInt(formData.numTickets),
        total_amount: totalAmount,
        special_requests: formData.specialRequests || undefined,
      });

      // Success!
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your booking ID is ${booking.id}. Check your email for details!`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventId: "",
        numTickets: "1",
        specialRequests: "",
      });
    } catch (error) {
      // Error handling
      const message = error instanceof Error ? error.message : "Unable to complete booking. Please try again.";
      toast({
        title: "Booking Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                {/* Event Selection */}
                <div>
                  <Label htmlFor="eventId">Select Event *</Label>
                  {eventsLoading ? (
                    <div className="text-sm text-muted-foreground">Loading events...</div>
                  ) : (
                    <select
                      id="eventId"
                      value={formData.eventId}
                      onChange={(e) => setFormData({ ...formData, eventId: e.target.value })}
                      required
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Choose an event...</option>
                      {upcomingEvents?.map((event) => (
                        <option key={event.id} value={event.id}>
                          {event.title} - {new Date(event.event_date).toLocaleDateString()}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Full Name */}
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

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
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

                {/* Number of Tickets */}
                <div>
                  <Label htmlFor="numTickets">Number of Tickets *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="numTickets"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="1"
                      className="pl-10"
                      value={formData.numTickets}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 10) return;
                        setFormData({ ...formData, numTickets: e.target.value });
                      }}
                      required
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
                  <Input
                    id="specialRequests"
                    type="text"
                    placeholder="Dietary restrictions, accessibility needs, etc."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover-lift"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Book Now"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  You'll receive a confirmation email with booking details
                </p>
              </form>
            </Card>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="p-6 bg-background">
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

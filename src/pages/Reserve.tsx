import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCreateBooking } from "@/hooks/useBookings";
import { useUpcomingEvents } from "@/hooks/useEvents";
import { useAuth } from "@/hooks/useAuth";
import { Calendar, Users } from "lucide-react";

const Reserve = () => {
  const { toast } = useToast();
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    eventId: "",
    partySize: "2",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize hooks
  const createBooking = useCreateBooking();
  const { data: upcomingEvents, isLoading: eventsLoading } = useUpcomingEvents(10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in with Google to make a booking",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create booking in database
      const booking = await createBooking.mutateAsync({
        event_id: formData.eventId || '',
        party_size: parseInt(formData.partySize),
        special_requests: formData.specialRequests || undefined,
      });

      if (!booking) {
        throw new Error('Booking creation failed');
      }

      // Success!
      // @ts-ignore - Booking type from mutation
      const bookingId = booking.id || 'pending';
      toast({
        title: "Booking Confirmed! 🎉",
        description: `Your booking ID is ${bookingId}. We'll contact you with details!`,
      });

      // Reset form
      setFormData({
        eventId: "",
        partySize: "2",
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
              
              {!user && !authLoading && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-3">
                    You must be signed in to make a reservation
                  </p>
                  <Button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full"
                    variant="default"
                  >
                    Sign In with Google
                  </Button>
                </div>
              )}
              
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

                {/* Party Size */}
                <div>
                  <Label htmlFor="partySize">Party Size *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="partySize"
                      type="number"
                      min="1"
                      max="20"
                      placeholder="2"
                      className="pl-10"
                      value={formData.partySize}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value > 20) return;
                        setFormData({ ...formData, partySize: e.target.value });
                      }}
                      required
                      disabled={!user}
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
                    disabled={!user}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary hover-lift"
                  size="lg"
                  disabled={isSubmitting || !user}
                >
                  {isSubmitting ? "Processing..." : !user ? "Sign In to Book" : "Book Now"}
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

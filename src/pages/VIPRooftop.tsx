import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Star, Sparkles } from "lucide-react";
import venueInterior from "@/assets/venue-interior.jpg";
import foodSpread from "@/assets/food-spread.jpg";
import sportsAction from "@/assets/sports-nfl-action.jpg";

const VIPRooftop = () => {
  const packages = [
    {
      name: "Silver",
      price: "750,000 COP",
      features: [
        "Private table for 4",
        "Premium screen access",
        "Welcome drink for each guest",
        "Priority seating",
        "2-hour reservation",
      ],
      color: "text-gray-400",
      bgColor: "bg-gray-50",
    },
    {
      name: "Gold",
      price: "1,500,000 COP",
      features: [
        "Private table for 6",
        "Dedicated server",
        "Champagne bottle service",
        "Premium menu access",
        "3-hour reservation",
        "Complimentary appetizer platter",
      ],
      color: "text-primary",
      bgColor: "bg-primary/5",
      featured: true,
    },
    {
      name: "Platinum",
      price: "3,000,000 COP",
      features: [
        "Exclusive rooftop lounge access",
        "Table for up to 10 guests",
        "Personal concierge service",
        "Premium bottle service",
        "Full-night reservation",
        "Customized food & drink menu",
        "VIP parking assistance",
      ],
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  const reviews = [
    {
      name: "Sofia Martinez",
      rating: 5,
      text: "The Gold package made our anniversary unforgettable. Perfect service and amazing views!",
    },
    {
      name: "David Thompson",
      rating: 5,
      text: "Platinum VIP is the only way to watch the big game. Worth every cent!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${venueInterior})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 container px-4 text-center text-white">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/90 text-primary-foreground px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-5 h-5" />
              <span>EXCLUSIVE VIP ACCESS</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-scale-in">
              The Ultimate VIP
              <br />
              <span className="text-primary">Rooftop Experience</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Private tables. Signature cocktails. Medellín skyline views.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-6">
                Book VIP Table
              </Button>
              <a href="https://wa.me/573047862834" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Packages */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
              CHOOSE YOUR EXPERIENCE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">VIP Packages</h2>
            <p className="text-xl text-muted-foreground">
              Elevate your game-day experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.name}
                className={`p-8 ${pkg.bgColor} ${pkg.featured ? 'ring-2 ring-primary scale-105 shadow-2xl' : ''} hover-lift stagger-item`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.featured && (
                  <div className="text-center mb-4">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-bold uppercase">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={`text-3xl font-bold ${pkg.color} mb-2`}>{pkg.name}</h3>
                  <p className="text-4xl font-bold">{pkg.price}</p>
                  <p className="text-sm text-muted-foreground">per event</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={pkg.featured ? "default" : "outline"}>
                  Reserve {pkg.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      <section className="py-20 bg-dark-section text-dark-foreground">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            The VIP Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[venueInterior, foodSpread, sportsAction].map((img, idx) => (
              <div 
                key={idx}
                className="relative h-80 rounded-xl overflow-hidden hover-scale stagger-item"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <img src={img} alt={`VIP Experience ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            What Our VIP Guests Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {reviews.map((review, idx) => (
              <Card key={idx} className="p-8 hover-lift stagger-item" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-primary">— {review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-dark-section text-dark-foreground">
        <div className="container px-4 max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Reserve Your VIP Table</h2>
            <p className="text-xl text-muted-foreground">
              Limited rooftop tables available per night
            </p>
          </div>

          <Card className="p-8 bg-card">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Name</label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone</label>
                  <Input placeholder="Your phone number" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Package</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3">
                    <option>Silver</option>
                    <option>Gold</option>
                    <option>Platinum</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Special Requests</label>
                <Textarea placeholder="Any special requests or questions?" rows={4} />
              </div>
              <Button className="w-full" size="lg">Submit Reservation Request</Button>
              <p className="text-sm text-muted-foreground text-center">
                Or contact us directly on{" "}
                <a href="https://wa.me/573047862834" className="text-primary font-bold hover:underline">
                  WhatsApp
                </a>
              </p>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default VIPRooftop;
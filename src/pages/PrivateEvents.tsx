import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Users, 
  Utensils, 
  Wifi, 
  MapPin, 
  Award, 
  Sparkles, 
  Monitor, 
  Video,
  Building2,
  Calendar,
  MessageSquare,
  Trophy,
  PartyPopper,
  Gift,
  CheckCircle2
} from "lucide-react";
import worldSeriesHero from "@/assets/world-series-hero.jpg";
import venueInterior from "@/assets/venue-interior.jpg";
import foodSpread from "@/assets/food-spread.jpg";

const PrivateEvents = () => {
  const eventTypes = [
    { icon: Building2, title: "Corporate Parties", description: "Team building and celebrations" },
    { icon: Users, title: "Team Celebrations", description: "Victory parties and milestones" },
    { icon: PartyPopper, title: "Birthday Milestones", description: "Unforgettable birthday experiences" },
    { icon: Trophy, title: "Product Launches", description: "Launch your brand in style" },
    { icon: Gift, title: "Reunions", description: "Reconnect with loved ones" },
  ];

  const coreFeatures = [
    { icon: Users, title: "Flexible Seating", description: "Customizable layouts for any group size" },
    { icon: Utensils, title: "Premium Catering", description: "Chef-curated menus & signature cocktails" },
    { icon: Monitor, title: "HD Broadcast Setup", description: "Giant screens & premium sound system" },
    { icon: MapPin, title: "Prime Location", description: "Heart of Medellín, easy access" },
    { icon: Award, title: "Event Coordinator", description: "Dedicated support from start to finish" },
  ];

  const premiumFeatures = [
    { icon: Sparkles, title: "VIP Lounge Access", description: "Exclusive rooftop bottle service" },
    { icon: Building2, title: "Custom Branding", description: "Personalized décor & setup" },
    { icon: Video, title: "Live Streaming", description: "Hybrid event support" },
    { icon: Wifi, title: "Rooftop Cocktail Hour", description: "Skyline views with signature drinks" },
    { icon: CheckCircle2, title: "Digital Guest List", description: "QR check-in & management" },
  ];

  const packages = [
    {
      name: "Basic",
      price: "Starting at $500",
      features: ["Up to 20 guests", "2-hour venue rental", "Standard AV setup", "Basic menu package"],
      badge: null
    },
    {
      name: "Premium",
      price: "Starting at $1,200",
      features: ["Up to 50 guests", "4-hour venue rental", "Premium AV & lighting", "Custom menu & bar", "Event coordinator"],
      badge: "Popular"
    },
    {
      name: "VIP",
      price: "Starting at $2,500",
      features: ["Up to 100 guests", "Full-day access", "VIP lounge included", "Bottle service & premium bar", "Custom branding & décor", "Dedicated staff team"],
      badge: "Best Value"
    }
  ];

  const howItWorks = [
    { number: "1", title: "Check Date & Capacity", description: "Select your preferred date and guest count" },
    { number: "2", title: "Choose Package", description: "Pick the perfect package for your event" },
    { number: "3", title: "Confirm & Deposit", description: "Secure your booking with a simple deposit" },
    { number: "4", title: "Celebrate!", description: "Enjoy your event while we handle everything" },
  ];

  const faqs = [
    {
      question: "What's the maximum capacity?",
      answer: "Our venue can accommodate up to 150 guests for private events. We offer flexible seating arrangements for groups of all sizes."
    },
    {
      question: "Do you provide AV equipment?",
      answer: "Yes! All packages include access to our giant HD screens and premium sound system. Premium and VIP packages include custom lighting and advanced AV setup."
    },
    {
      question: "Can we customize the menu?",
      answer: "Absolutely! Our chef works with you to create a custom menu that fits your event theme and dietary requirements."
    },
    {
      question: "What's your cancellation policy?",
      answer: "We require 30 days notice for cancellations. Deposits are refundable up to 14 days before the event date."
    },
    {
      question: "Is parking available?",
      answer: "Yes, we have dedicated parking for event guests. Valet service is available for Premium and VIP packages."
    },
    {
      question: "Can we bring our own decorations?",
      answer: "Yes! We encourage personalization. Our event coordinator will work with you on setup and placement."
    }
  ];

  const testimonials = [
    {
      quote: "Best corporate party ever! The rooftop views and atmosphere made our team celebration unforgettable.",
      author: "Maria González",
      role: "HR Director, Tech Startup"
    },
    {
      quote: "The event coordinator made everything seamless. We could relax and enjoy while they handled all the details.",
      author: "Carlos Ramírez",
      role: "Event Planner"
    },
    {
      quote: "Perfect venue for our product launch. The AV setup and ambiance exceeded our expectations.",
      author: "Sofia Martinez",
      role: "Marketing Manager"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${worldSeriesHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Celebrate Without Limits
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Rooftop Views, Signature Cocktails & Unforgettable Moments
          </p>
          <Link to="/corporate-booking">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6">
              Book Your Event
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Skybox Section */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Why Choose Skybox for Your Private Event?</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Experience the perfect blend of sophistication and excitement at Medellín's premier rooftop sports bar. 
              From breathtaking city views to world-class cuisine, we provide everything you need for an unforgettable celebration.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you're hosting a corporate gathering, milestone birthday, or product launch, our dedicated team ensures 
              every detail is perfect. Located in the heart of Laureles, we offer easy access and an atmosphere your guests will love.
            </p>
            <Link to="/corporate-booking">
              <Button variant="outline" size="lg">See Our Event Packages</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Types of Events */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Types of Events We Host</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {eventTypes.map((event, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <event.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{event.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Everything You Need for an Amazing Event</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our comprehensive event services ensure your celebration is seamless from start to finish
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Make It Extraordinary</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Elevate your event with premium add-ons and VIP experiences
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <feature.icon className="w-10 h-10 mb-3 text-accent" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Event Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={worldSeriesHero} alt="Event celebration" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={venueInterior} alt="Venue interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={foodSpread} alt="Food spread" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden md:col-span-2">
              <img src={worldSeriesHero} alt="Rooftop view" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={venueInterior} alt="Event setup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Event Packages</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose the perfect package for your event or customize your own
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.badge ? 'border-primary shadow-lg' : ''}`}>
                {pkg.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                    {pkg.badge}
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-primary">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/corporate-booking">
                    <Button className="w-full mt-6" variant={pkg.badge ? "default" : "outline"}>
                      Request Quote
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <MessageSquare className="w-8 h-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Host Your Next Event at Skybox</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let our team handle the details — you enjoy the view
          </p>
          <Link to="/corporate-booking">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Book Your Event Now
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-background">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Request a Quote</h2>
            <p className="text-center text-muted-foreground mb-8">
              Fill out the form below and our events team will get back to you within 24 hours
            </p>
            <Card>
              <CardContent className="pt-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" placeholder="+57 300 123 4567" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Event Date</Label>
                      <Input id="event-date" type="date" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Guest Count</Label>
                      <Input id="guests" type="number" placeholder="50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-type">Event Type</Label>
                      <Input id="event-type" placeholder="Corporate Party" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input id="budget" placeholder="$1,000 - $2,000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us about your event..." rows={4} />
                  </div>
                  <Link to="/corporate-booking">
                    <Button type="button" className="w-full" size="lg">
                      Complete Booking Form
                    </Button>
                  </Link>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateEvents;

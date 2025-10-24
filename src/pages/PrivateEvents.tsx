import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import privateEventsHero from "@/assets/private-events-hero.jpg";
import eventCorporate from "@/assets/event-corporate.jpg";
import eventTeamCelebration from "@/assets/event-team-celebration.jpg";
import eventWatchParty from "@/assets/event-watch-party.jpg";
import eventProductLaunch from "@/assets/event-product-launch.jpg";
import eventBirthday from "@/assets/event-birthday.jpg";
import serviceSeating from "@/assets/service-seating.jpg";
import serviceCatering from "@/assets/service-catering.jpg";
import serviceAvSetup from "@/assets/service-av-setup.jpg";
import serviceCoordinator from "@/assets/service-coordinator.jpg";
import serviceStreaming from "@/assets/service-streaming.jpg";
import skyboxInterior from "@/assets/skybox-interior-lounge.jpg";
import skyboxRooftop from "@/assets/skybox-rooftop-view.jpg";
import venueInterior from "@/assets/venue-interior.jpg";

const PrivateEvents = () => {
  const eventTypes = [
    { 
      image: eventCorporate,
      title: "Corporate Events", 
      description: "Team building and celebrations",
      alt: "Corporate business meeting at Skybox Medellín rooftop"
    },
    { 
      image: eventTeamCelebration,
      title: "Team Celebrations", 
      description: "Victory parties and milestones",
      alt: "Sports team celebration party at Skybox"
    },
    { 
      image: eventWatchParty,
      title: "Watch-Parties", 
      description: "Epic game day experiences",
      alt: "Exciting watch party at Skybox rooftop"
    },
    { 
      image: eventProductLaunch,
      title: "Product Launches", 
      description: "Launch your brand in style",
      alt: "Elegant product launch event at Skybox"
    },
    { 
      image: eventBirthday,
      title: "Birthday & Friends", 
      description: "Unforgettable celebrations",
      alt: "Birthday celebration party at Skybox rooftop"
    },
  ];

  const coreFeatures = [
    { 
      image: serviceSeating,
      title: "Flexible Seating", 
      description: "Customizable layouts for any group size",
      alt: "Flexible seating arrangements at Skybox event space"
    },
    { 
      image: serviceCatering,
      title: "Premium Catering", 
      description: "Chef-curated menus & signature cocktails",
      alt: "Premium catering spread at Skybox Medellín"
    },
    { 
      image: serviceAvSetup,
      title: "HD Broadcast Setup", 
      description: "Giant screens & premium sound system",
      alt: "Professional AV and broadcast setup at Skybox"
    },
    { 
      image: serviceCoordinator,
      title: "Event Coordinator", 
      description: "Dedicated support from start to finish",
      alt: "Professional event coordinator at Skybox"
    },
    { 
      image: serviceStreaming,
      title: "Live Streaming", 
      description: "Hybrid event support & production",
      alt: "Live streaming setup for events at Skybox"
    },
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
        className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${privateEventsHero})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container px-4 z-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 uppercase tracking-tight">
            Celebrate Without Limits
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
            Rooftop Views, Signature Cocktails & Unforgettable Moments
          </p>
          <Link to="/corporate-booking">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all">
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
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
              Types of Events We Host
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From corporate gatherings to epic watch-parties, we bring the energy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {eventTypes.map((event, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                    <p className="text-sm text-white/90">{event.description}</p>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <Button variant="ghost" className="w-full text-primary hover:text-primary/80 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
              Everything You Need for an Amazing Event
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our complete event service covers all the details so you can focus on the moment
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 h-64 rounded-lg overflow-hidden">
                <img 
                  src={skyboxRooftop} 
                  alt="Skybox Medellín rooftop terrace with city views" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-48 rounded-lg overflow-hidden">
                <img 
                  src={skyboxInterior} 
                  alt="Skybox interior lounge setup" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-48 rounded-lg overflow-hidden">
                <img 
                  src={venueInterior} 
                  alt="Venue interior event setup" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Feature List */}
            <div className="space-y-6">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 p-6">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={feature.image} 
                        alt={feature.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/corporate-booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-lg">
                See Our Event Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* Gallery Showcase */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
              Event Gallery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={eventWatchParty} alt="Watch party celebration at Skybox" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={skyboxInterior} alt="Skybox interior lounge setup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={serviceCatering} alt="Premium catering spread at Skybox" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden md:col-span-2">
              <img src={skyboxRooftop} alt="Skybox rooftop terrace with city view" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="h-64 rounded-lg overflow-hidden">
              <img src={eventCorporate} alt="Corporate event setup at Skybox" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
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
      <section className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <Card className="text-center h-full hover:shadow-xl transition-shadow border-2 hover:border-primary/50">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-3 uppercase">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <div className="container px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight">
            Host Your Next Event at Skybox
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light">
            Let our team handle the details — you enjoy the view
          </p>
          <Link to="/corporate-booking">
            <Button size="lg" variant="secondary" className="text-lg px-12 py-7 shadow-2xl hover:shadow-xl transition-all hover:scale-105">
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

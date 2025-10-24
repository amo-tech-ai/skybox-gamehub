import { Button } from "@/components/ui/button";
import { Calendar, Heart, Music, Users, Gift, ChefHat, Camera, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import heroImage from "@/assets/friendsgiving-hero.jpg";
import dinnerImage from "@/assets/friendsgiving-dinner.jpg";
import celebrationImage from "@/assets/friendsgiving-celebration.jpg";
import pieImage from "@/assets/friendsgiving-pie.jpg";
import buffetImage from "@/assets/friendsgiving-buffet.jpg";
import cocktailImage from "@/assets/friendsgiving-cocktail.jpg";

const FriendsgivingEvent = () => {
  const menuItems = [
    {
      name: "🦃 Roast Turkey Plate",
      description: "Served with mashed potatoes, gravy & cranberry sauce",
      price: "COP 68,000",
      image: dinnerImage
    },
    {
      name: "🥧 Pumpkin Pie Slice",
      description: "Homemade with cinnamon whipped cream",
      price: "COP 22,000",
      image: pieImage
    },
    {
      name: "🍠 Sweet Potato Mash",
      description: "Creamy, buttery, and topped with marshmallows",
      price: "COP 18,000",
      image: buffetImage
    },
    {
      name: "🍗 BBQ Chicken Bites",
      description: "Game-day twist on Thanksgiving favorites",
      price: "COP 35,000",
      image: dinnerImage
    },
    {
      name: "🍹 Cranberry Mule Cocktail",
      description: "Vodka, ginger beer, lime & cranberry",
      price: "COP 28,000",
      image: cocktailImage
    },
    {
      name: "🍸 Apple Cider Margarita",
      description: "Festive fusion of sweet and tangy",
      price: "COP 30,000",
      image: cocktailImage
    }
  ];

  const schedule = [
    { time: "6:30 PM", event: "Live acoustic set (folk & chill covers)" },
    { time: "8:00 PM", event: "Turkey carving & group toast" },
    { time: "9:30 PM", event: "DJ rooftop session" },
    { time: "10:00 PM", event: "Games & giveaways" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
              Friends, Feast & Rooftop Views
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-semibold drop-shadow-md">
              Medellín's Thanksgiving Celebration
            </p>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Celebrate gratitude, friendship, and fall flavors under the Medellín skyline
            </p>
            
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 md:p-6 max-w-2xl mx-auto space-y-2 text-white">
              <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Thursday, November 27, 2025</span>
                </div>
                <div>🕕 6:00 PM – Late</div>
                <div>📍 Skybox Medellín Rooftop</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-primary hover:bg-primary/90">
                <Link to="/corporate-booking">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  Reserve Your Spot
                </Link>
              </Button>
              <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-accent hover:bg-accent/90 text-white">
                <a href="https://wa.me/573047862834?text=I%20want%20to%20reserve%20for%20Friendsgiving!" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a 
          href="https://wa.me/573047862834?text=I%20want%20to%20reserve%20for%20Friendsgiving!"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-accent hover:bg-accent/90 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      </section>

      {/* About This Event - Light Background */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              About This Event
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Gather your friends, raise a glass, and give thanks — Skybox style. 
              Join Medellín's warm and welcoming expat community for a night of friendship, comfort food, and rooftop magic. 
              Enjoy a festive buffet dinner, craft cocktails, live music, and panoramic city views as we celebrate Thanksgiving together — 
              <span className="text-primary font-semibold"> no cooking, no cleanup, just gratitude and good vibes.</span>
            </p>
            <Button asChild variant="outline" size="lg" className="mt-4">
              <a href="#what-to-expect">See What's Included ↓</a>
            </Button>
          </div>
        </div>
      </section>

      {/* What to Expect - Dark Background */}
      <section id="what-to-expect" className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              What to Expect
            </h2>
            <p className="text-base md:text-lg text-white/80">
              From corporate gatherings to epic watch-parties, <span className="text-primary font-semibold">we bring the energy</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">All-You-Can-Eat Buffet</h3>
              <p className="text-sm text-white/80">
                Thanksgiving feast with all the classics
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Live Music & DJ</h3>
              <p className="text-sm text-white/80">
                Acoustic set + rooftop DJ session
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Craft Cocktails</h3>
              <p className="text-sm text-white/80">
                Signature fall drinks & cocktail specials
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Family-Style Seating</h3>
              <p className="text-sm text-white/80">
                Meet new friends, share stories
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Rooftop City Views</h3>
              <p className="text-sm text-white/80">
                Panoramic Medellín skyline backdrop
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Football Screening</h3>
              <p className="text-sm text-white/80">
                Thanksgiving games on HD screens
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Welcome Drink</h3>
              <p className="text-sm text-white/80">
                Complimentary signature cocktail on arrival
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:shadow-xl transition-all">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white">Surprise Giveaways</h3>
              <p className="text-sm text-white/80">
                Games, prizes & gratitude wall
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights & Contests - Light Background */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              🎉 Highlights & Contests
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Win prizes and make memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={celebrationImage} 
                alt="Best Friends Photo Contest at Skybox"
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-5 h-5 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold">Best Friends Photo Contest</h3>
                </div>
                <p className="text-sm text-white/90">
                  Win <span className="text-primary font-semibold">COP 400,000</span> bar tab for the funniest or most heartwarming photo
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={buffetImage} 
                alt="Gratitude Wall at Skybox"
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold">Gratitude Wall</h3>
                </div>
                <p className="text-sm text-white/90">
                  Share what you're thankful for and get a <span className="text-primary font-semibold">free dessert</span>
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={dinnerImage} 
                alt="Turkey Carving Show at Skybox"
                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <ChefHat className="w-5 h-5 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold">Turkey Carving Show</h3>
                </div>
                <p className="text-sm text-white/90">
                  Chef-led live carving at <span className="text-primary font-semibold">8:00 PM</span> — a Thanksgiving tradition
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Specials - Dark Background */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Thanksgiving Menu Highlights
            </h2>
            <p className="text-base md:text-lg text-white/80">
              Fall flavors meet <span className="text-primary font-semibold">Colombian hospitality</span>
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {menuItems.map((item, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="relative overflow-hidden rounded-lg shadow-lg group h-[400px]">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">{item.name}</h3>
                        <p className="text-sm text-white/90 mb-3">{item.description}</p>
                        <div className="text-xl md:text-2xl font-bold text-primary">{item.price}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Entertainment Schedule - Light Background */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Entertainment Schedule
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              A night full of <span className="text-primary font-semibold">music, food & celebration</span>
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-lg md:text-xl font-bold text-primary">{item.time}</span>
                </div>
                <div className="flex-1 border-l-2 border-primary pl-4">
                  <p className="text-base md:text-lg text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery - Dark Background */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The Skybox Experience
            </h2>
            <p className="text-base md:text-lg text-white/80">
              <span className="text-primary font-semibold">Rooftop vibes. Good company. Unforgettable memories.</span>
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] md:h-[450px]">
                    <img 
                      src={celebrationImage} 
                      alt="Friends celebrating Friendsgiving at Skybox rooftop"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Rooftop Celebration</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] md:h-[450px]">
                    <img 
                      src={buffetImage} 
                      alt="Thanksgiving buffet spread at Skybox"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Feast & Flavors</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] md:h-[450px]">
                    <img 
                      src={cocktailImage} 
                      alt="Craft cocktails at Skybox Friendsgiving"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Signature Cocktails</h3>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="relative rounded-lg overflow-hidden shadow-lg h-[350px] md:h-[450px]">
                    <img 
                      src={dinnerImage} 
                      alt="Thanksgiving dinner plate at Skybox"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Classic Thanksgiving</h3>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* How It Works - Light Background */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Four simple steps to your perfect <span className="text-primary font-semibold">Thanksgiving celebration</span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Check Date & Capacity</h3>
              <p className="text-sm text-muted-foreground">
                Select your preferred date and guest count
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Choose Package</h3>
              <p className="text-sm text-muted-foreground">
                Pick the perfect package for your event
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Confirm & Deposit</h3>
              <p className="text-sm text-muted-foreground">
                Secure your booking with a simple deposit
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">Celebrate!</h3>
              <p className="text-sm text-muted-foreground">
                Enjoy your event while we handle everything
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Dark Background */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-primary">
                  What's included in the ticket price?
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Your ticket includes all-you-can-eat Thanksgiving buffet, welcome drink, access to live music and DJ, rooftop seating, and participation in all contests and giveaways.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-primary">
                  How many people can attend?
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Our rooftop can accommodate up to 150 guests. Tables seat 6-8 people for family-style dining. We recommend booking early as spots fill up fast!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-primary">
                  What if I have dietary restrictions?
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  We offer vegetarian and gluten-free options. Please let us know when booking, and our chef will accommodate your needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-primary">
                  Is parking available?
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Yes! We have valet parking available. Street parking is also nearby. We're centrally located and easily accessible by taxi or Uber.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white/10 backdrop-blur border border-white/20 rounded-lg px-6">
                <AccordionTrigger className="text-white hover:text-primary">
                  Can I cancel or change my reservation?
                </AccordionTrigger>
                <AccordionContent className="text-white/80">
                  Cancellations made 7+ days in advance receive full refund. Changes to party size can be made up to 48 hours before the event.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - Light Background with Gradient */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Book Your Rooftop Table for Friendsgiving
            </h2>
            <p className="text-lg md:text-xl text-primary font-semibold">
              Limited seating available — join Medellín's favorite Thanksgiving celebration
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              <span className="text-foreground font-semibold">No cooking. No cleanup. Just rooftop magic.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-primary hover:bg-primary/90">
                <Link to="/corporate-booking">
                  Reserve Your Table
                </Link>
              </Button>
              <Button asChild size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 bg-accent hover:bg-accent/90 text-white">
                <a href="https://wa.me/573047862834?text=I%20want%20to%20reserve%20for%20Friendsgiving!" target="_blank" rel="noopener noreferrer">
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FriendsgivingEvent;

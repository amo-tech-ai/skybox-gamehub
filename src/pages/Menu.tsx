import MenuCard from "@/components/menu/MenuCard";
import foodImage from "@/assets/food-spread.jpg";

const Menu = () => {
  const menuItems = [
    {
      name: "Buffalo Wings",
      description: "Classic buffalo wings with celery sticks and blue cheese dip. Available in mild, medium, or atomic.",
      price: "$32,000",
      image: foodImage,
      category: "Appetizers",
    },
    {
      name: "Skybox Nachos",
      description: "Loaded with cheese, jalapeños, guacamole, sour cream, and your choice of chicken or beef.",
      price: "$38,000",
      image: foodImage,
      category: "Appetizers",
    },
    {
      name: "Classic Burger",
      description: "Angus beef patty, lettuce, tomato, pickles, special sauce. Served with fries.",
      price: "$42,000",
      image: foodImage,
      category: "Mains",
    },
    {
      name: "BBQ Pulled Pork Sandwich",
      description: "Slow-cooked pulled pork with tangy BBQ sauce, coleslaw, on a brioche bun.",
      price: "$45,000",
      image: foodImage,
      category: "Mains",
    },
    {
      name: "Game Day Platter",
      description: "Perfect for sharing! Wings, nachos, quesadillas, mozzarella sticks, and all the dips.",
      price: "$85,000",
      image: foodImage,
      category: "Shareable",
    },
    {
      name: "Loaded Fries",
      description: "Crispy fries topped with bacon, cheese sauce, sour cream, and green onions.",
      price: "$28,000",
      image: foodImage,
      category: "Sides",
    },
    {
      name: "Craft Beer Selection",
      description: "Rotating selection of local and imported craft beers. Ask about today's taps!",
      price: "$15,000",
      image: foodImage,
      category: "Drinks",
    },
    {
      name: "Skybox Margarita",
      description: "Fresh lime, premium tequila, triple sec. Classic or frozen. The perfect game-day drink!",
      price: "$22,000",
      image: foodImage,
      category: "Drinks",
    },
  ];

  const categories = ["All", "Appetizers", "Mains", "Shareable", "Sides", "Drinks"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Game Night Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Fuel your watch party with championship-worthy food and drinks
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="container px-4">
          <div className="mb-8 text-center">
            <p className="text-lg text-muted-foreground">
              All prices in Colombian Pesos (COP). Order directly via WhatsApp for delivery or pickup!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {menuItems.map((item, index) => (
              <MenuCard key={index} {...item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-background border-2 border-border rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Game-Day Specials</h3>
              <p className="text-lg text-muted-foreground mb-4">
                During major events, enjoy special combos and happy hour pricing!
              </p>
              <ul className="space-y-2 text-left max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">🍺</span>
                  <span>2-for-1 beers during first quarter/inning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">🍗</span>
                  <span>Free wings with any large platter order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">🎉</span>
                  <span>Complimentary shot when your team scores!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;

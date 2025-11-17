import blogWatchPartyGuide from "@/assets/blog-watch-party-guide.jpg";
import blogMedellinSports from "@/assets/blog-medellin-sports.jpg";
import blogGameDayFood from "@/assets/blog-game-day-food.jpg";

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedDate: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    slug: "ultimate-watch-party-guide",
    title: "The Ultimate Watch Party Guide: Making Every Game Unforgettable",
    excerpt: "Discover the secrets to hosting the perfect sports watch party at Skybox Medellín. From seating to sound, we've got you covered.",
    content: `
# The Ultimate Watch Party Guide: Making Every Game Unforgettable

Hosting or attending a watch party at Skybox Medellín is more than just watching a game—it's about creating an experience that brings fans together in an electric atmosphere.

## Why Watch Parties Matter

Sports are better with friends. Whether it's the Super Bowl, World Series, or a crucial playoff game, the energy of a crowd amplifies every moment. At Skybox Medellín, we've perfected the art of the watch party.

## What Makes a Great Watch Party

### 1. **Multiple Screens, Multiple Angles**
Our state-of-the-art setup features HD screens strategically placed throughout the venue, ensuring you never miss a moment from any seat.

### 2. **Premium Sound System**
Feel every roar of the crowd and every commentary call with our immersive audio setup. You'll feel like you're in the stadium.

### 3. **Game Day Menu**
From classic wings to gourmet burgers, our menu is designed to fuel your game-watching experience. Pair it with our selection of craft beers and cocktails.

### 4. **VIP Experiences**
Want to take it up a notch? Our VIP rooftop offers an exclusive experience with premium seating, dedicated servers, and a private bar.

## Tips for Your Visit

- **Arrive Early**: Popular games fill up fast. Secure your spot by arriving at least 30 minutes before kickoff.
- **Book a Table**: For groups, we recommend reserving a table in advance to guarantee your crew has the best spot.
- **Engage with the Crowd**: Our watch parties attract passionate fans. Don't be shy—cheer, chant, and celebrate with everyone!

## Upcoming Watch Parties

We host watch parties for all major sporting events throughout the year. Check our events calendar to see what's coming up and reserve your spot today.

Ready to experience the ultimate watch party? Visit Skybox Medellín and see why we're the premier sports entertainment destination in Colombia.
    `,
    image: blogWatchPartyGuide,
    author: {
      name: "Carlos Rodriguez",
    },
    publishedDate: "2025-01-15",
    readTime: "5 min read",
    category: "Events",
    tags: ["watch party", "sports", "entertainment"],
  },
  {
    id: "2",
    slug: "medellin-sports-entertainment-scene",
    title: "Medellín's Sports Entertainment Scene: A City That Never Stops Cheering",
    excerpt: "Explore how Medellín has become Colombia's hottest destination for sports fans and why Skybox is at the center of it all.",
    content: `
# Medellín's Sports Entertainment Scene: A City That Never Stops Cheering

Medellín has transformed into one of South America's most vibrant sports entertainment hubs, and Skybox is proud to be at the heart of this revolution.

## The Rise of Sports Culture in Medellín

Over the past decade, Medellín has evolved from a beautiful mountain city into a destination that attracts sports fans from around the world. The combination of perfect weather, passionate local culture, and world-class venues has created the ideal environment for sports entertainment.

## Why Medellín Loves Sports

### **International Accessibility**
With José María Córdova International Airport and growing connections to major cities worldwide, Medellín is more accessible than ever. Fans from the US, Europe, and throughout Latin America can easily visit.

### **Year-Round Perfect Weather**
Known as the "City of Eternal Spring," Medellín's consistent climate means outdoor rooftop viewing experiences are enjoyable 365 days a year.

### **Passionate Fan Culture**
Colombians are known for their passion—whether it's fútbol, baseball, or American football. This energy is infectious and makes every game day special.

## Skybox: Your Sports Entertainment Headquarters

Located in the heart of Medellín's entertainment district, Skybox Medellín offers:

- **Multi-Sport Coverage**: From NFL to MLB, NBA to soccer, we broadcast it all
- **State-of-the-Art Facilities**: Multiple HD screens, premium audio, and comfortable seating
- **Rooftop Experience**: Our exclusive VIP rooftop offers stunning city views while you watch
- **International Cuisine**: A menu that blends Colombian favorites with American sports bar classics

## The Expat Community

Medellín's growing expat community has created a demand for authentic American sports experiences. Skybox fills this need while welcoming local fans to discover new sports and join the excitement.

## Join the Movement

Whether you're a local paisaño or visiting from abroad, Skybox Medellín welcomes you to experience sports entertainment like never before. Come be part of Medellín's sports revolution.
    `,
    image: blogMedellinSports,
    author: {
      name: "Maria Santos",
    },
    publishedDate: "2025-01-10",
    readTime: "6 min read",
    category: "Culture",
    tags: ["medellin", "sports culture", "entertainment"],
  },
  {
    id: "3",
    slug: "game-day-food-and-drinks",
    title: "Game Day Eats: The Perfect Menu for Every Sport",
    excerpt: "From touchdown to home run, discover the best food and drink pairings for your favorite sports at Skybox Medellín.",
    content: `
# Game Day Eats: The Perfect Menu for Every Sport

At Skybox Medellín, we believe that great food is just as important as the game itself. Our culinary team has crafted the perfect game-day menu that brings together the best of American sports bar classics with Colombian flair.

## The Classics, Done Right

### **Wings: The MVP of Game Day**
Our signature wings come in 8 different sauces, from classic Buffalo to our house-made Colombian ají picante. Each order is made fresh to order and served piping hot.

**Popular Choices:**
- Classic Buffalo (medium heat)
- BBQ Bourbon Glaze (sweet & tangy)
- Ají Maracuyá (Colombian passion fruit heat)

### **Burgers That Score**
Hand-pressed patties, fresh toppings, and brioche buns make our burgers a fan favorite. Try the "Touchdown Burger" with double patties, bacon, cheese, and our secret stadium sauce.

### **Nachos Grande**
Perfect for sharing (or not!), our loaded nachos feature house-made chips, three-cheese blend, pulled pork or grilled chicken, jalapeños, guacamole, and sour cream.

## Drinks That Keep You in the Game

### **Craft Beer Selection**
We feature 12 rotating craft beers on tap, including local Colombian brews and imported favorites from the US.

### **Game Day Cocktails**
- **End Zone Margarita**: Fresh lime, tequila, and a jalapeño kick
- **Homerun Old Fashioned**: Premium bourbon, bitters, and orange
- **Skybox Mojito**: Colombian rum, fresh mint, and lime

### **Non-Alcoholic Options**
Premium sodas, fresh fruit juices, and specialty mocktails ensure everyone can toast to victory.

## Perfect Pairings by Sport

### **NFL Sundays**
Wings + Cold Beer = Classic combo that never fails

### **MLB Games**
Hot dogs and nachos with a cold lager—baseball tradition at its finest

### **NBA Action**
Burgers and fries with craft beer or cocktails—fast-paced food for a fast-paced game

### **Soccer Matches**
Empanadas and cerveza—bringing Colombian tradition to the international beautiful game

## Group Packages

Planning a watch party with friends? Ask about our group packages that include reserved seating, pitcher service, and appetizer platters.

## Happy Hour Specials

Don't miss our daily happy hour (4-7 PM) with special pricing on select drinks and appetizers. It's the perfect warm-up before the big game!

Visit Skybox Medellín and taste the difference that quality ingredients and passion make. Game day has never been this delicious.
    `,
    image: blogGameDayFood,
    author: {
      name: "Chef Diego Martinez",
    },
    publishedDate: "2025-01-05",
    readTime: "7 min read",
    category: "Food & Drink",
    tags: ["food", "drinks", "menu", "game day"],
  },
];

export const getBlogArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find((article) => article.slug === slug);
};

export const getBlogCategories = (): string[] => {
  return Array.from(new Set(blogArticles.map((article) => article.category)));
};

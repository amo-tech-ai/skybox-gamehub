import { useState } from "react";
import { Button } from "@/components/ui/button";
import MenuCard from "@/components/menu/MenuCard";
import FilterChips from "@/components/events/FilterChips";
import { useMenuItems } from "@/hooks/useMenuItems";
import { useMenuCategories } from "@/hooks/useMenuItems";
import foodImage from "@/assets/food-spread.jpg";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch menu items from database
  const { data: menuItems, isLoading, error } = useMenuItems();

  // Fetch dynamic categories from database
  const { data: dbCategories } = useMenuCategories();

  // Build categories array with "All" option
  const categories = ["All", ...(dbCategories || [])];

  // Filter menu items by category
  const filteredItems = menuItems ? menuItems.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  }) : [];

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

      {/* Filter Chips */}
      <section className="py-8 bg-background border-b">
        <div className="container px-4">
          <FilterChips
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
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

          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-xl text-muted-foreground">Loading menu...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-red-500 mb-4">Failed to load menu</p>
              <p className="text-muted-foreground mb-6">{error.message}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredItems.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground text-center">
                  Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    name={item.name}
                    description={item.description}
                    price={`$${item.price.toLocaleString()} ${item.currency || 'COP'}`}
                    image={item.image_url || foodImage}
                    category={item.category}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No menu items found in this category</p>
              <p className="text-muted-foreground">Try selecting a different category</p>
            </div>
          )}

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

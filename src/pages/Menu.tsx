import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import foodImage from "@/assets/food-spread.jpg";

const Menu = () => {
  const { data: products, isLoading, error } = useShopifyProducts();
  const addItem = useCartStore(state => state.addItem);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Game Night Menu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Order directly from our Shopify store - delivered hot and fresh!
          </p>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-16">
        <div className="container px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-xl text-muted-foreground">Loading menu from Shopify...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-destructive mb-4">Failed to load menu</p>
              <p className="text-muted-foreground mb-6">{String(error)}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : products && products.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground text-center">
                  {products.length} items available • Add to cart for Shopify checkout
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {products.map((product) => {
                  const variant = product.node.variants.edges[0]?.node;
                  const image = product.node.images.edges[0]?.node;
                  
                  const handleAddToCart = () => {
                    if (!variant) return;
                    
                    addItem({
                      product,
                      variantId: variant.id,
                      variantTitle: variant.title,
                      price: variant.price,
                      quantity: 1,
                      selectedOptions: variant.selectedOptions || []
                    });
                    
                    toast.success(`${product.node.title} added to cart!`, {
                      position: "top-center",
                    });
                  };

                  return (
                    <Card key={product.node.id} className="overflow-hidden hover-lift group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={image?.url || foodImage}
                          alt={image?.altText || product.node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold">{product.node.title}</h3>
                          <span className="text-xl font-bold text-primary">
                            ${parseFloat(variant?.price.amount || '0').toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.node.description}
                        </p>
                        <Button 
                          onClick={handleAddToCart}
                          className="w-full"
                          disabled={!variant?.availableForSale}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-4">No products found</p>
              <p className="text-muted-foreground">Check back soon for our menu items!</p>
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

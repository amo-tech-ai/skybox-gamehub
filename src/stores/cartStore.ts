import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout } from '@/lib/shopify';

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async () => {
        const { items } = get();
        if (items.length === 0) return;

        set({ isLoading: true });
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          set({ checkoutUrl, isLoading: false });
        } catch (error) {
          console.error('Failed to create checkout:', error);
          set({ isLoading: false });
          throw error;
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
      skipHydration: false,
    }
  )
);

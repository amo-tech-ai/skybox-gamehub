import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from '@/lib/shopify';

export const useShopifyProducts = (limit = 50) => {
  return useQuery({
    queryKey: ['shopify-products', limit],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: limit });
      
      if (!data) {
        return [];
      }

      const products: ShopifyProduct[] = data.data.products.edges;
      return products;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

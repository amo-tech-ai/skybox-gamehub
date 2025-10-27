// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  is_available: boolean;
  currency?: string;
  tags?: string[];
  allergens?: string[];
}

/**
 * Fetch all available menu items from Supabase
 */
export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_available', true)
        .order('display_order', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      
      return data.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description || undefined,
        price: Number(item.price),
        category: item.category,
        image_url: item.image_url || undefined,
        is_available: item.is_available,
        currency: item.currency || 'COP',
        tags: item.tags || [],
        allergens: item.allergens || [],
      }));
    },
  });
};

/**
 * Fetch all distinct menu categories from Supabase
 */
export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menu-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('menu_items')
        .select('category')
        .eq('is_available', true)
        .order('category', { ascending: true });

      if (error) throw error;
      
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category))
      );
      return uniqueCategories;
    },
  });
};

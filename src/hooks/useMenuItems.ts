// @ts-nocheck
import { useQuery } from '@tanstack/react-query';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  available: boolean;
}

// Mock data until menu_items table is created
const MOCK_MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Wings Platter',
    description: 'Crispy chicken wings with your choice of sauce',
    price: 35000,
    category: 'Appetizers',
    available: true,
  },
  {
    id: '2',
    name: 'Nachos Supreme',
    description: 'Loaded nachos with cheese, jalapeños, and guacamole',
    price: 28000,
    category: 'Appetizers',
    available: true,
  },
  {
    id: '3',
    name: 'Skybox Burger',
    description: 'Premium beef burger with special sauce',
    price: 42000,
    category: 'Mains',
    available: true,
  },
];

/**
 * Fetch all available menu items (using mock data for now)
 */
export const useMenuItems = () => {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_MENU_ITEMS;
    },
  });
};

/**
 * Fetch all distinct menu categories
 */
export const useMenuCategories = () => {
  return useQuery({
    queryKey: ['menu-categories'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      const uniqueCategories = Array.from(
        new Set(MOCK_MENU_ITEMS.map((item) => item.category))
      );
      return uniqueCategories;
    },
  });
};

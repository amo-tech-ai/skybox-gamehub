import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  slug: string; // SEO-friendly URL slug
  title: string;
  event_date: string;
  venue: string;
  status: string;
  category: string;
  description?: string;
  image_url?: string;
  price?: number;
  capacity?: number;
  event_type?: string;
}

/**
 * Fetch upcoming published events
 * @param limit - Number of events to fetch (default: 10)
 */
export const useUpcomingEvents = (limit: number = 10) => {
  return useQuery({
    queryKey: ['events', 'upcoming', limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, slug, title, event_date, venue, status, category, description, image_url, price, capacity, event_type')
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data as Event[];
    },
  });
};

/**
 * Fetch all published events
 */
export const useAllEvents = () => {
  return useQuery({
    queryKey: ['events', 'all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, slug, title, event_date, venue, status, category, description, image_url, price, capacity, event_type')
        .eq('status', 'published')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
};

/**
 * Fetch events by category
 * @param category - Event category to filter by
 */
export const useEventsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['events', 'category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, slug, title, event_date, venue, status, category, description, image_url, price, capacity, event_type')
        .eq('status', 'published')
        .eq('category', category)
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
    enabled: !!category,
  });
};

/**
 * Fetch a single event by slug (SEO-friendly)
 * @param slug - Event slug (e.g., "super-bowl-2025")
 */
export const useEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['events', 'slug', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, slug, title, event_date, venue, status, category, description, image_url, price, capacity, event_type')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Event;
    },
    enabled: !!slug,
  });
};

/**
 * Fetch a single event by ID (deprecated - use useEventBySlug instead)
 * @param eventId - Event ID
 */
export const useEvent = (eventId: string) => {
  return useQuery({
    queryKey: ['events', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('id, slug, title, event_date, venue, status, category, description, image_url, price, capacity, event_type')
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return data as Event;
    },
    enabled: !!eventId,
  });
};

/**
 * Fetch total count of published events
 */
export const useEventsCount = () => {
  return useQuery({
    queryKey: ['events', 'count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');

      if (error) throw error;
      return count || 0;
    },
  });
};

/**
 * Fetch all distinct event categories
 */
export const useEventCategories = () => {
  return useQuery({
    queryKey: ['events', 'categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select('category')
        .eq('status', 'published');

      if (error) throw error;

      // Extract unique categories
      const uniqueCategories = Array.from(
        new Set(data.map((item) => item.category).filter(Boolean))
      );

      return uniqueCategories as string[];
    },
  });
};

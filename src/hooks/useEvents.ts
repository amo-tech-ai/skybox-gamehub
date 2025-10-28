// @ts-nocheck
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Event {
  id: string;
  slug: string;
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

// Transform database event to app event format
const transformEvent = (dbEvent: any): Event => {
  // Extract venue name from relationship
  const venueName = dbEvent.venue_obj?.name || dbEvent.venue || 'TBA';
  
  // Extract first category name from junction table
  const firstCategory = dbEvent.event_categories?.[0]?.category?.name;
  const categoryName = firstCategory || dbEvent.category || 'General';

  return {
    id: dbEvent.id,
    slug: dbEvent.slug,
    title: dbEvent.title,
    event_date: dbEvent.event_date, // Correct column name
    venue: venueName,
    status: dbEvent.status,
    category: categoryName,
    description: dbEvent.description,
    image_url: dbEvent.image_url,
    price: dbEvent.price,
    capacity: dbEvent.capacity,
    event_type: dbEvent.event_type,
  };
};

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
        .select(`
          *,
          venue_obj:venues(*),
          event_categories(
            *,
            category:categories(*)
          )
        `)
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data.map(event => transformEvent(event));
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
        .select(`
          *,
          venue_obj:venues(*),
          event_categories(
            *,
            category:categories(*)
          )
        `)
        .eq('status', 'published')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data.map(event => transformEvent(event));
    },
  });
};

/**
 * Fetch events by category
 * @param category - Event category to filter by
 */
export const useEventsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['events', 'category', categorySlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          venue_obj:venues(*),
          event_categories!inner(
            *,
            category:categories!inner(*)
          )
        `)
        .eq('status', 'published')
        .eq('event_categories.category.slug', categorySlug)
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data.map(event => transformEvent(event));
    },
    enabled: !!categorySlug,
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
        .select(`
          *,
          venue_obj:venues(*),
          event_categories(
            *,
            category:categories(*)
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Event not found');
      return transformEvent(data);
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
        .select(`
          *,
          venue_obj:venues(*),
          event_categories(
            *,
            category:categories(*)
          )
        `)
        .eq('id', eventId)
        .maybeSingle();

      if (error) throw error;
      if (!data) throw new Error('Event not found');
      return transformEvent(data);
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
    queryKey: ['event-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('name')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data.map(cat => cat.name);
    },
  });
};

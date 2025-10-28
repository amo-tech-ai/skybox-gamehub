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
  // Extract venue name from venues relation
  const venueName = dbEvent.venues?.name || dbEvent.venue || 'TBA';
  
  // Extract first category from event_categories junction
  const categoryName = dbEvent.event_categories?.[0]?.categories?.name || dbEvent.category || 'General';
  
  return {
    id: dbEvent.id,
    slug: dbEvent.slug,
    title: dbEvent.title,
    event_date: dbEvent.event_date,
    venue: venueName,
    status: dbEvent.status,
    category: categoryName,
    description: dbEvent.description,
    image_url: dbEvent.image_url || undefined,
    price: dbEvent.price || undefined,
    capacity: dbEvent.capacity || undefined,
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
          venues(*),
          event_categories(
            *,
            categories(*)
          )
        `)
        .eq('status', 'published')
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data?.map(event => transformEvent(event)) || [];
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
          venues(*),
          event_categories(
            *,
            categories(*)
          )
        `)
        .eq('status', 'published')
        .order('event_date', { ascending: true });

      if (error) throw error;
      return data?.map(event => transformEvent(event)) || [];
    },
  });
};

/**
 * Fetch events by category
 * @param categorySlug - Category slug to filter by
 */
export const useEventsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ['events', 'category', categorySlug],
    queryFn: async () => {
      // Query through the junction table to get events by category slug
      const { data, error } = await supabase
        .from('event_categories')
        .select(`
          *,
          events!inner(*,
            venues(*),
            event_categories(
              *,
              categories(*)
            )
          ),
          categories!inner(*)
        `)
        .eq('events.status', 'published')
        .eq('categories.slug', categorySlug)
        .order('events.event_date', { ascending: true });

      if (error) throw error;
      return data?.map(item => transformEvent(item.events)) || [];
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
          venues(*),
          event_categories(
            *,
            categories(*)
          )
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data ? transformEvent(data) : null;
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
          venues(*),
          event_categories(
            *,
            categories(*)
          )
        `)
        .eq('id', eventId)
        .maybeSingle();

      if (error) throw error;
      return data ? transformEvent(data) : null;
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
      return data?.map(cat => cat.name) || [];
    },
  });
};

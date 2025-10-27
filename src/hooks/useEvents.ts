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
const transformEvent = (dbEvent: any, category?: any, venue?: any): Event => ({
  id: dbEvent.id,
  slug: dbEvent.slug,
  title: dbEvent.title,
  event_date: dbEvent.event_datetime,
  venue: venue?.name || 'TBA',
  status: dbEvent.status,
  category: category?.name || 'General',
  description: dbEvent.description,
  image_url: dbEvent.featured_image || dbEvent.banner_image || dbEvent.thumbnail_image || undefined,
  price: dbEvent.base_price || undefined,
  capacity: dbEvent.total_capacity || undefined,
});

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
          category:event_categories(*),
          venue:venues(*)
        `)
        .eq('status', 'published')
        .gte('event_datetime', new Date().toISOString())
        .order('event_datetime', { ascending: true })
        .limit(limit);

      if (error) throw error;
      return data.map(event => transformEvent(event, event.category, event.venue));
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
          category:event_categories(*),
          venue:venues(*)
        `)
        .eq('status', 'published')
        .order('event_datetime', { ascending: true });

      if (error) throw error;
      return data.map(event => transformEvent(event, event.category, event.venue));
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
          category:event_categories!inner(*),
          venue:venues(*)
        `)
        .eq('status', 'published')
        .eq('event_categories.slug', categorySlug)
        .order('event_datetime', { ascending: true });

      if (error) throw error;
      return data.map(event => transformEvent(event, event.category, event.venue));
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
          category:event_categories(*),
          venue:venues(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return transformEvent(data, data.category, data.venue);
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
          category:event_categories(*),
          venue:venues(*)
        `)
        .eq('id', eventId)
        .single();

      if (error) throw error;
      return transformEvent(data, data.category, data.venue);
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
        .from('event_categories')
        .select('name')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data.map(cat => cat.name);
    },
  });
};

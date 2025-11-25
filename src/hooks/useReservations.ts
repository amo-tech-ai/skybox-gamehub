import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

export interface ReservationFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  searchQuery?: string;
}

export interface Reservation {
  id: string;
  user_id: string;
  event_id: string | null;
  booking_date: string;
  total_amount: number;
  status: string;
  currency: string;
  special_requests: string | null;
  created_at: string;
  updated_at: string | null;
  event?: {
    id: string;
    title: string;
    event_date: string;
    venue: string | null;
  } | null;
  profile?: {
    full_name: string | null;
    phone: string | null;
  };
}

export function useReservations(filters: ReservationFilters = {}) {
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['reservations', filters, page],
    queryFn: async () => {
      let query = supabase
        .from('bookings')
        .select(`
          *,
          event:events(id, title, event_date, venue),
          profile:profiles!bookings_user_id_fkey(full_name, phone)
        `)
        .order('created_at', { ascending: false })
        .range((page - 1) * pageSize, page * pageSize - 1);

      // Apply status filter
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      // Apply date range filter
      if (filters.startDate) {
        query = query.gte('booking_date', filters.startDate);
      }
      if (filters.endDate) {
        query = query.lte('booking_date', filters.endDate);
      }

      // Apply search filter (search in event title or customer name)
      if (filters.searchQuery) {
        // Note: For production, consider full-text search or backend filtering
        const { data: allData } = await query;
        const filtered = allData?.filter(booking => {
          const eventTitle = booking.event?.title?.toLowerCase() || '';
          const customerName = booking.profile?.full_name?.toLowerCase() || '';
          const search = filters.searchQuery!.toLowerCase();
          return eventTitle.includes(search) || customerName.includes(search);
        });
        return { data: filtered || [], count: filtered?.length || 0 };
      }

      const { data, error, count } = await query;

      if (error) throw error;

      return { data: data || [], count: count || 0 };
    },
  });

  return {
    reservations: data?.data || [],
    totalCount: data?.count || 0,
    isLoading,
    error,
    page,
    setPage,
    pageSize,
    refetch,
  };
}

export function useReservationStats() {
  return useQuery({
    queryKey: ['reservation-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('status, total_amount, currency');

      if (error) throw error;

      const stats = {
        total: data.length,
        confirmed: data.filter(b => b.status === 'confirmed').length,
        pending: data.filter(b => b.status === 'pending').length,
        cancelled: data.filter(b => b.status === 'cancelled').length,
        totalRevenue: data
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + Number(b.total_amount), 0),
      };

      return stats;
    },
  });
}

// @ts-nocheck
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BookingInput {
  event_id: string;
  party_size?: number;
  special_requests?: string;
}

export interface Booking {
  id: string;
  user_id: string;
  event_id: string | null;
  booking_date: string;
  total_amount: number;
  status: string;
  currency: string;
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Create a new booking in Supabase (requires authentication)
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingInput) => {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('You must be signed in to create a booking');
      }

      // Insert booking
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: user.id,
          event_id: bookingData.event_id || null,
          booking_date: new Date().toISOString(),
          total_amount: 0, // Will be calculated server-side or by app logic
          status: 'pending',
          currency: 'COP',
          special_requests: bookingData.special_requests || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
    },
  });
};

/**
 * Fetch user's bookings
 */
export const useUserBookings = () => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error('You must be signed in to view bookings');
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          event:events(id, title, event_datetime, venue)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });
};

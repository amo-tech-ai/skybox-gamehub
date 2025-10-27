// @ts-nocheck
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface BookingInput {
  event_id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  num_tickets: number;
  total_amount: number;
  special_requests?: string;
}

export interface Booking extends BookingInput {
  id: string;
  booking_date: string;
  status: string;
}

/**
 * Create a new booking (mock implementation until bookings table is created)
 */
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingInput) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful booking response
      const mockBooking: Booking = {
        id: `booking-${Date.now()}`,
        ...bookingData,
        booking_date: new Date().toISOString(),
        status: 'pending',
      };
      
      return mockBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

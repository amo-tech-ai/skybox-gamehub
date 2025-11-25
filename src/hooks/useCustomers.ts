import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Customer {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string | null;
  metadata: any;
  created_at: string | null;
  last_seen_at: string | null;
  whatsapp_opt_in: boolean | null;
  email_notifications: boolean | null;
  loyalty_points: number;
  total_bookings: number;
  total_spent: number;
}

export interface CustomerActivity {
  id: string;
  type: 'booking' | 'loyalty' | 'whatsapp';
  description: string;
  points?: number;
  amount?: number;
  created_at: string;
}

export function useCustomers(roleFilter?: string, searchQuery?: string) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, [roleFilter, searchQuery]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('profiles')
        .select(`
          id,
          user_id,
          full_name,
          phone,
          avatar_url,
          role,
          metadata,
          created_at,
          last_seen_at,
          whatsapp_opt_in,
          email_notifications
        `)
        .is('deleted_at', null)
        .order('created_at', { ascending: false });

      if (roleFilter && roleFilter !== 'all') {
        query = query.eq('role', roleFilter);
      }

      if (searchQuery && searchQuery.trim()) {
        query = query.or(`full_name.ilike.%${searchQuery}%,phone.ilike.%${searchQuery}%`);
      }

      const { data: profiles, error: profilesError } = await query;

      if (profilesError) throw profilesError;

      // Fetch booking stats for each customer
      const customerIds = profiles?.map(p => p.id) || [];
      
      const { data: bookingStats } = await supabase
        .from('bookings')
        .select('user_id, total_amount')
        .in('user_id', customerIds)
        .is('deleted_at', null);

      // Calculate stats per customer
      const statsMap = new Map<string, { count: number; total: number }>();
      bookingStats?.forEach(booking => {
        const current = statsMap.get(booking.user_id) || { count: 0, total: 0 };
        statsMap.set(booking.user_id, {
          count: current.count + 1,
          total: current.total + Number(booking.total_amount || 0)
        });
      });

      const customersWithStats: Customer[] = (profiles || []).map(profile => {
        const stats = statsMap.get(profile.id) || { count: 0, total: 0 };
        const loyaltyPoints = (profile.metadata as any)?.loyalty_points || 0;

        return {
          ...profile,
          loyalty_points: loyaltyPoints,
          total_bookings: stats.count,
          total_spent: stats.total
        };
      });

      setCustomers(customersWithStats);
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };

  return { customers, loading, error, refetch: fetchCustomers };
}

export function useCustomerActivity(customerId: string) {
  const [activity, setActivity] = useState<CustomerActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, [customerId]);

  const fetchActivity = async () => {
    try {
      setLoading(true);

      // Fetch bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('id, total_amount, created_at, event:events(title)')
        .eq('user_id', customerId)
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch loyalty history
      const { data: loyaltyHistory } = await supabase
        .from('loyalty_history')
        .select('id, points, reason, created_at')
        .eq('customer_id', customerId)
        .order('created_at', { ascending: false })
        .limit(10);

      // Fetch WhatsApp confirmations
      const { data: whatsappLogs } = await supabase
        .from('event_confirmations')
        .select('id, status, created_at, event:events(title)')
        .eq('phone', customerId)
        .order('created_at', { ascending: false })
        .limit(5);

      const combined: CustomerActivity[] = [];

      bookings?.forEach(booking => {
        combined.push({
          id: booking.id,
          type: 'booking',
          description: `Reserva: ${(booking.event as any)?.title || 'Evento'}`,
          amount: Number(booking.total_amount),
          created_at: booking.created_at || ''
        });
      });

      loyaltyHistory?.forEach(entry => {
        combined.push({
          id: String(entry.id),
          type: 'loyalty',
          description: `Puntos: ${entry.reason || 'Actividad'}`,
          points: entry.points,
          created_at: entry.created_at || ''
        });
      });

      whatsappLogs?.forEach(log => {
        combined.push({
          id: log.id,
          type: 'whatsapp',
          description: `WhatsApp confirmación: ${(log.event as any)?.title || 'Evento'}`,
          created_at: log.created_at || ''
        });
      });

      combined.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setActivity(combined.slice(0, 20));
    } catch (err) {
      console.error('Error fetching customer activity:', err);
    } finally {
      setLoading(false);
    }
  };

  return { activity, loading };
}

export function useCustomerInsights() {
  const [signupTrends, setSignupTrends] = useState<{ date: string; count: number }[]>([]);
  const [retentionRate, setRetentionRate] = useState<number>(0);
  const [topSpenders, setTopSpenders] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);

        // Fetch signup trends (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: signupData, error: signupError } = await supabase
          .from('profiles')
          .select('created_at')
          .gte('created_at', thirtyDaysAgo.toISOString())
          .order('created_at', { ascending: true });

        if (signupError) throw signupError;

        // Group signups by date
        const signupsByDate: { [key: string]: number } = {};
        signupData?.forEach((profile) => {
          const date = new Date(profile.created_at!).toLocaleDateString('es-CO');
          signupsByDate[date] = (signupsByDate[date] || 0) + 1;
        });

        const trends = Object.entries(signupsByDate).map(([date, count]) => ({ date, count }));
        setSignupTrends(trends);

        // Calculate retention rate (customers with more than 1 booking)
        const { data: allCustomers, error: customersError } = await supabase
          .from('profiles')
          .select(`
            id,
            bookings:bookings(count)
          `);

        if (customersError) throw customersError;

        const totalCustomers = allCustomers?.length || 0;
        const repeatCustomers = allCustomers?.filter((c: any) => c.bookings[0]?.count > 1).length || 0;
        const retention = totalCustomers > 0 ? (repeatCustomers / totalCustomers) * 100 : 0;
        setRetentionRate(Math.round(retention));

        // Fetch top 5 spenders
        const { data: topSpendersData, error: topSpendersError } = await supabase
          .from('profiles')
          .select(`
            id,
            user_id,
            full_name,
            phone,
            role,
            whatsapp_opt_in,
            metadata,
            created_at,
            bookings!inner(
              total_amount,
              status
            )
          `)
          .eq('bookings.status', 'confirmed')
          .order('created_at', { ascending: false })
          .limit(100);

        if (topSpendersError) throw topSpendersError;

        // Calculate total spent per customer
        const customersWithSpending = topSpendersData?.map((customer: any) => {
          const totalSpent = customer.bookings.reduce(
            (sum: number, booking: any) => sum + Number(booking.total_amount),
            0
          );
          const totalBookings = customer.bookings.length;

          return {
            id: customer.id,
            user_id: customer.user_id,
            full_name: customer.full_name,
            phone: customer.phone,
            avatar_url: null,
            role: customer.role,
            metadata: customer.metadata,
            created_at: customer.created_at,
            last_seen_at: null,
            whatsapp_opt_in: customer.whatsapp_opt_in,
            email_notifications: null,
            loyalty_points: customer.metadata?.loyalty_points || 0,
            total_bookings: totalBookings,
            total_spent: totalSpent,
          };
        }) || [];

        // Sort by total spent and get top 5
        const top5 = customersWithSpending
          .sort((a, b) => b.total_spent - a.total_spent)
          .slice(0, 5);

        setTopSpenders(top5);
      } catch (err) {
        console.error('Error fetching customer insights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return { signupTrends, retentionRate, topSpenders, loading };
}

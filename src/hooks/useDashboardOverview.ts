import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

interface DashboardStats {
  upcomingEvents: number;
  eventsThisWeek: number;
  bookingsToday: number;
  bookingsYesterday: number;
  ordersToday: number;
  revenueToday: number;
  whatsappToday: number;
  whatsappDeliveryRate: number;
}

interface BookingSeriesPoint {
  date: string;
  count: number;
}

interface PopularEvent {
  name: string;
  count: number;
  category: string;
}

interface ActivityItem {
  id: string;
  type: "booking" | "whatsapp";
  title: string;
  description: string;
  createdAt: string;
}

export function useDashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    upcomingEvents: 0,
    eventsThisWeek: 0,
    bookingsToday: 0,
    bookingsYesterday: 0,
    ordersToday: 0,
    revenueToday: 0,
    whatsappToday: 0,
    whatsappDeliveryRate: 0,
  });
  const [bookingsSeries, setBookingsSeries] = useState<BookingSeriesPoint[]>([]);
  const [popularEvents, setPopularEvents] = useState<PopularEvent[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        const now = new Date();
        const todayStart = startOfDay(now);
        const todayEnd = endOfDay(now);
        const yesterdayStart = startOfDay(subDays(now, 1));
        const yesterdayEnd = endOfDay(subDays(now, 1));
        const sevenDaysAgo = subDays(now, 7);
        const thirtyDaysAgo = subDays(now, 30);

        // Fetch all data in parallel
        const [
          upcomingEventsData,
          eventsThisWeekData,
          bookingsTodayData,
          bookingsYesterdayData,
          bookingsLast7DaysData,
          bookingsLast30DaysData,
          whatsappTodayData,
          whatsappDeliveredData,
          recentBookingsData,
          recentWhatsappData,
        ] = await Promise.all([
          // Upcoming events
          supabase
            .from("events")
            .select("id", { count: "exact", head: true })
            .eq("status", "published")
            .gte("event_date", now.toISOString()),
          
          // Events this week
          supabase
            .from("events")
            .select("id", { count: "exact", head: true })
            .eq("status", "published")
            .gte("event_date", now.toISOString())
            .lte("event_date", endOfDay(subDays(now, -7)).toISOString()),
          
          // Bookings today
          supabase
            .from("bookings")
            .select("id, total_amount", { count: "exact" })
            .gte("created_at", todayStart.toISOString())
            .lte("created_at", todayEnd.toISOString()),
          
          // Bookings yesterday
          supabase
            .from("bookings")
            .select("id", { count: "exact", head: true })
            .gte("created_at", yesterdayStart.toISOString())
            .lte("created_at", yesterdayEnd.toISOString()),
          
          // Bookings last 7 days (for chart)
          supabase
            .from("bookings")
            .select("created_at")
            .gte("created_at", sevenDaysAgo.toISOString()),
          
          // Bookings last 30 days (for popular events)
          supabase
            .from("bookings")
            .select("event_id, events(title, category)")
            .gte("created_at", thirtyDaysAgo.toISOString())
            .not("event_id", "is", null),
          
          // WhatsApp today
          supabase
            .from("event_confirmations")
            .select("id", { count: "exact", head: true })
            .gte("created_at", todayStart.toISOString())
            .lte("created_at", todayEnd.toISOString()),
          
          // WhatsApp delivered today
          supabase
            .from("event_confirmations")
            .select("id", { count: "exact", head: true })
            .gte("created_at", todayStart.toISOString())
            .lte("created_at", todayEnd.toISOString())
            .eq("status", "delivered"),
          
          // Recent bookings (last 24h)
          supabase
            .from("bookings")
            .select("id, created_at, total_amount, events(title)")
            .gte("created_at", subDays(now, 1).toISOString())
            .order("created_at", { ascending: false })
            .limit(10),
          
          // Recent WhatsApp (last 24h)
          supabase
            .from("event_confirmations")
            .select("id, created_at, name, phone, events(title)")
            .gte("created_at", subDays(now, 1).toISOString())
            .order("created_at", { ascending: false })
            .limit(10),
        ]);

        // Process stats
        const revenueToday = bookingsTodayData.data?.reduce((sum, b) => sum + (b.total_amount || 0), 0) || 0;
        const whatsappTotal = whatsappTodayData.count || 0;
        const whatsappDelivered = whatsappDeliveredData.count || 0;
        
        setStats({
          upcomingEvents: upcomingEventsData.count || 0,
          eventsThisWeek: eventsThisWeekData.count || 0,
          bookingsToday: bookingsTodayData.count || 0,
          bookingsYesterday: bookingsYesterdayData.count || 0,
          ordersToday: bookingsTodayData.count || 0,
          revenueToday,
          whatsappToday: whatsappTotal,
          whatsappDeliveryRate: whatsappTotal > 0 ? Math.round((whatsappDelivered / whatsappTotal) * 100) : 0,
        });

        // Process bookings series (last 7 days)
        const seriesMap: Record<string, number> = {};
        for (let i = 6; i >= 0; i--) {
          const date = format(subDays(now, i), "yyyy-MM-dd");
          seriesMap[date] = 0;
        }
        
        bookingsLast7DaysData.data?.forEach((booking) => {
          const date = format(new Date(booking.created_at), "yyyy-MM-dd");
          if (seriesMap[date] !== undefined) {
            seriesMap[date]++;
          }
        });
        
        const series = Object.entries(seriesMap).map(([date, count]) => ({
          date: format(new Date(date), "EEE"),
          count,
        }));
        setBookingsSeries(series);

        // Process popular events
        const eventCounts: Record<string, { count: number; name: string; category: string }> = {};
        
        bookingsLast30DaysData.data?.forEach((booking: any) => {
          if (booking.event_id && booking.events) {
            const eventId = booking.event_id;
            if (!eventCounts[eventId]) {
              eventCounts[eventId] = {
                count: 0,
                name: booking.events.title || "Sin título",
                category: booking.events.category || "General",
              };
            }
            eventCounts[eventId].count++;
          }
        });
        
        const popular = Object.values(eventCounts)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map(({ name, count, category }) => ({ name, count, category }));
        
        setPopularEvents(popular);

        // Process recent activity
        const activityItems: ActivityItem[] = [];
        
        recentBookingsData.data?.forEach((booking: any) => {
          activityItems.push({
            id: booking.id,
            type: "booking",
            title: "Nueva reserva",
            description: `Reserva para ${booking.events?.title || "evento"} - $${booking.total_amount}`,
            createdAt: booking.created_at,
          });
        });
        
        recentWhatsappData.data?.forEach((msg: any) => {
          activityItems.push({
            id: msg.id,
            type: "whatsapp",
            title: "WhatsApp enviado",
            description: `Confirmación enviada a ${msg.name} para ${msg.events?.title || "evento"}`,
            createdAt: msg.created_at,
          });
        });
        
        activityItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setActivity(activityItems.slice(0, 15));

      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return {
    loading,
    error,
    stats,
    bookingsSeries,
    popularEvents,
    activity,
  };
}

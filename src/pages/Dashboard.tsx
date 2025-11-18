import { Helmet } from "react-helmet-async";
import { Search, Bell, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StatsCard from "@/components/dashboard/StatsCard";
import LineChartCard from "@/components/dashboard/LineChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import RecentActivityTable from "@/components/dashboard/RecentActivityTable";
import { useDashboardOverview } from "@/hooks/useDashboardOverview";
import { Calendar, Users, ShoppingBag, MessageCircle } from "lucide-react";

export default function Dashboard() {
  const { loading, stats, bookingsSeries, popularEvents, activity } = useDashboardOverview();

  return (
    <>
      <Helmet>
        <title>Dashboard - Skybox Medellín Admin</title>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">Hola, bienvenido a Skybox</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="w-64 pl-10"
                />
              </div>
              
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* KPI Cards Row */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Eventos próximos"
                value={loading ? "..." : stats.upcomingEvents}
                subtitle={`Esta semana: ${stats.eventsThisWeek}`}
                icon={<Calendar className="h-5 w-5" />}
                trend={{ direction: "neutral" }}
              />
              
              <StatsCard
                title="Reservas hoy"
                value={loading ? "..." : stats.bookingsToday}
                subtitle={`Ayer: ${stats.bookingsYesterday}`}
                icon={<Users className="h-5 w-5" />}
                trend={
                  stats.bookingsToday > stats.bookingsYesterday
                    ? { direction: "up", percent: Math.round(((stats.bookingsToday - stats.bookingsYesterday) / (stats.bookingsYesterday || 1)) * 100) }
                    : stats.bookingsToday < stats.bookingsYesterday
                    ? { direction: "down", percent: Math.round(((stats.bookingsYesterday - stats.bookingsToday) / (stats.bookingsYesterday || 1)) * 100) }
                    : { direction: "neutral" }
                }
              />
              
              <StatsCard
                title="Órdenes hoy"
                value={loading ? "..." : stats.ordersToday}
                subtitle={`Ingreso: $${stats.revenueToday.toLocaleString()}`}
                icon={<ShoppingBag className="h-5 w-5" />}
                trend={{ direction: "neutral" }}
              />
              
              <StatsCard
                title="WhatsApp enviados"
                value={loading ? "..." : stats.whatsappToday}
                subtitle={`Entregados: ${stats.whatsappDeliveryRate}%`}
                icon={<MessageCircle className="h-5 w-5" />}
                trend={{ direction: "neutral" }}
              />
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <LineChartCard
                title="Reservas últimos 7 días"
                data={bookingsSeries}
                loading={loading}
              />
              
              <BarChartCard
                title="Eventos más populares"
                data={popularEvents}
                loading={loading}
              />
            </div>

            {/* Recent Activity Table */}
            <RecentActivityTable
              activity={activity}
              loading={loading}
            />
          </div>
        </main>
      </div>
    </>
  );
}

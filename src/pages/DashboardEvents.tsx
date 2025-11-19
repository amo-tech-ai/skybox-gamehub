import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import EventKpiCard from "@/components/dashboard/events/EventKpiCard";
import TicketSalesChart from "@/components/dashboard/events/TicketSalesChart";
import RevenueChart from "@/components/dashboard/events/RevenueChart";
import FeaturedEventCard from "@/components/dashboard/events/FeaturedEventCard";
import EventCalendar from "@/components/dashboard/events/EventCalendar";
import AllEventsGrid from "@/components/dashboard/events/AllEventsGrid";
import RecentBookingsTable from "@/components/dashboard/events/RecentBookingsTable";
import ActivityFeed from "@/components/dashboard/events/ActivityFeed";

export default function DashboardEvents() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Helmet>
        <title>Events - Skybox Medellín Admin</title>
      </Helmet>
      
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Events</h1>
            <p className="text-muted-foreground mt-1">Overview of upcoming games, events and bookings</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-full sm:w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events, teams, artists…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-[280px]"
              />
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <EventKpiCard
            title="Upcoming Events"
            value="24"
            subtitle="Next 30 days"
            gradient="from-blue-50 to-blue-100"
            iconColor="text-blue-600"
          />
          <EventKpiCard
            title="Total Bookings"
            value="1,847"
            subtitle="+12% vs last month"
            gradient="from-green-50 to-green-100"
            iconColor="text-green-600"
          />
          <EventKpiCard
            title="Tickets Sold"
            value="2,780"
            subtitle="85% capacity"
            gradient="from-purple-50 to-purple-100"
            iconColor="text-purple-600"
          />
          <EventKpiCard
            title="Revenue"
            value="$ 348.805.000"
            subtitle="COP"
            gradient="from-orange-50 to-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TicketSalesChart />
          <RevenueChart />
        </div>

        {/* Featured Event + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FeaturedEventCard />
          </div>
          <div>
            <EventCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </div>

        {/* All Events */}
        <AllEventsGrid />

        {/* Bottom Row: Bookings + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentBookingsTable />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </>
  );
}

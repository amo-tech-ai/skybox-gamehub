import { useState } from "react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/events/EventCard";
import FilterChips from "@/components/events/FilterChips";
import { useAllEvents } from "@/hooks/useEvents";
import { useEventCategories } from "@/hooks/useEventCategories";
import { Search, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import foodImage from "@/assets/food-spread.jpg";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all events from database
  const { data: events, isLoading, error } = useAllEvents();

  // Fetch dynamic categories from database
  const { data: dbCategories } = useEventCategories();

  // Build categories array with "All" option
  const categories = ["All", ...(dbCategories || [])];

  // Filter events (only if data is loaded)
  const filteredEvents = events ? events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-20">
        <div className="container px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Calendar className="w-4 h-4" />
            <span>LIVE EVENTS</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Upcoming Sports Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            Every Game. Every Screen. Your Seat Awaits.
          </p>
          <div className="max-w-xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="text"
              placeholder="Search by sport, team, or event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="py-8 bg-background border-b">
        <div className="container px-4">
          <FilterChips 
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
              <p className="text-xl text-muted-foreground">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-xl text-red-500 mb-4">Failed to load events</p>
              <p className="text-muted-foreground mb-6">{error.message}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredEvents.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    slug={event.id}
                    title={event.title}
                    subtitle={event.description}
                    date={new Date(event.event_date).toLocaleDateString()}
                    time={new Date(event.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    location={event.venue}
                    image={event.image_url || foodImage}
                    category={event.category}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground mb-4">No events found matching your criteria</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;

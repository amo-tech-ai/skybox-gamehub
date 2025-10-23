import { useState } from "react";
import EventCard from "@/components/events/EventCard";
import EventFilterBar from "@/components/events/EventFilterBar";
import { events } from "@/data/events";

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter((event) => {
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleReset = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-dark-section text-dark-foreground py-16">
        <div className="container px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            Upcoming Sports Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Discover all the live sports action coming to Skybox Medellín. Reserve your spot for the biggest games of the season.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <EventFilterBar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
      />

      {/* Events Grid */}
      <section className="py-12">
        <div className="container px-4">
          {filteredEvents.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredEvents.map((event) => (
                  <EventCard key={event.slug} {...event} image={event.image} />
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

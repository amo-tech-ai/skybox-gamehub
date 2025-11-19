import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import eventNFL from "@/assets/event-nfl.jpg";
import eventUFC from "@/assets/event-ufc.jpg";
import eventSoccer from "@/assets/event-soccer.jpg";

const events = [
  {
    id: 1,
    image: eventNFL,
    category: "NFL",
    categoryColor: "bg-blue-600",
    title: "NFL Sunday Ticket – RedZone Lounge",
    venue: "Skybox Medellín",
    city: "Medellín",
    date: "Dec 15, 2024",
    time: "1:00 PM",
    price: "30.000",
  },
  {
    id: 2,
    image: eventUFC,
    category: "UFC",
    categoryColor: "bg-red-600",
    title: "UFC 309 Fight Night Watch Party",
    venue: "Skybox Medellín",
    city: "Medellín",
    date: "Dec 18, 2024",
    time: "9:00 PM",
    price: "40.000",
  },
  {
    id: 3,
    image: eventSoccer,
    category: "Soccer",
    categoryColor: "bg-green-600",
    title: "Champions League Screening Night",
    venue: "Skybox Medellín",
    city: "Bogotá",
    date: "Dec 20, 2024",
    time: "3:00 PM",
    price: "35.000",
  },
  {
    id: 4,
    image: eventNFL,
    category: "NBA",
    categoryColor: "bg-purple-600",
    title: "NBA Playoffs Doubleheader",
    venue: "Skybox Medellín",
    city: "Cali",
    date: "Dec 22, 2024",
    time: "7:30 PM",
    price: "45.000",
  },
];

export default function AllEventsGrid() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Events</h2>
        <Button variant="ghost" className="gap-2">
          View All Events
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className={`absolute top-3 left-3 ${event.categoryColor}`}>
                {event.category}
              </Badge>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <h3 className="font-semibold line-clamp-2 min-h-[3rem]">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{event.venue} • {event.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 flex-shrink-0" />
                  <span>{event.date} • {event.time}</span>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between">
                <span className="text-lg font-bold">$ {event.price} COP</span>
                <Button size="sm" variant="outline">Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

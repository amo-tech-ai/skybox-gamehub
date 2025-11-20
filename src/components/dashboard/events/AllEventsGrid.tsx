import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface AllEventsGridProps {
  events: Array<{
    id: string;
    slug?: string;
    title: string;
    category: string;
    venue: string;
    city: string;
    date: string;
    price: number;
    image: string;
  }>;
}

export default function AllEventsGrid({ events }: AllEventsGridProps) {
  const categoryColors: Record<string, string> = {
    "NFL": "bg-blue-600",
    "UFC": "bg-red-600",
    "Soccer": "bg-green-600",
    "NBA": "bg-purple-600",
    "Event": "bg-gray-600",
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">All Events</h2>
        <Link to="/events">
          <Button variant="ghost" className="gap-2">
            View All Events
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.slice(0, 8).map((event) => (
          <Card key={event.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <Badge className={`absolute top-3 left-3 ${categoryColors[event.category] || categoryColors.Event}`}>
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
                  <span>{format(new Date(event.date), "MMM d, yyyy • h:mm a")}</span>
                </div>
              </div>

              <div className="pt-2 border-t flex items-center justify-between">
                <span className="text-lg font-bold">
                  $ {event.price.toLocaleString()} COP
                </span>
                <Link to={`/events/${event.slug || event.id}`}>
                  <Button size="sm" variant="outline">Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface FeaturedEventCardProps {
  event: {
    id: string;
    title: string;
    category: string;
    venue: string;
    city: string;
    description: string;
    date: string;
    image: string;
  };
}

export default function FeaturedEventCard({ event }: FeaturedEventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
          {event.category}
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{event.venue} • {event.city}</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          {event.description}
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(event.date), "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{format(new Date(event.date), "h:mm a")}</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link to={`/events/${event.id}`} className="flex-1">
            <Button className="w-full">View Details</Button>
          </Link>
          <Button variant="outline">Edit Event</Button>
        </div>
      </CardContent>
    </Card>
  );
}

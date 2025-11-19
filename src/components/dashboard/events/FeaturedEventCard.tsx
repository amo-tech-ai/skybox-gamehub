import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/nfl-hero-home.jpg";

export default function FeaturedEventCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64 w-full">
        <img
          src={heroImage}
          alt="NFL Sunday Ticket"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">
          NFL
        </Badge>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold mb-2">NFL Sunday Ticket – RedZone Lounge</h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>Skybox Medellín • Medellín, Colombia</span>
          </div>
        </div>

        <p className="text-muted-foreground">
          Join us for the ultimate NFL experience! Watch every touchdown from every game with NFL RedZone. 
          Premium seating, craft beers, and game-day specials all day long.
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Sunday, December 15, 2024</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>1:00 PM - 11:00 PM</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1">View Details</Button>
          <Button variant="outline">Edit Event</Button>
        </div>
      </CardContent>
    </Card>
  );
}

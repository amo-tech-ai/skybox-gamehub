import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";

interface EventCardProps {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  showCountdown?: boolean;
}

const EventCard = ({
  slug,
  title,
  subtitle,
  date,
  time,
  location,
  image,
  category,
  showCountdown = false,
}: EventCardProps) => {
  // Convert date and time to ISO format for countdown
  const eventDate = new Date(`${date} ${time}`);
  const eventDateTime = !isNaN(eventDate.getTime()) ? eventDate.toISOString() : null;

  return (
    <Card className="overflow-hidden hover-lift glow-on-hover group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg">
            {category}
          </span>
        </div>
        {showCountdown && eventDateTime && (
          <div className="absolute top-3 right-3">
            <CountdownTimer targetDate={eventDateTime} variant="badge" />
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1 line-clamp-1">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>}
        
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={16} className="text-primary" />
            <span>{date} · {time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={16} className="text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <Link to={`/events/${slug}`}>
          <Button className="w-full gradient-primary hover-lift ripple">Reserve Your Spot</Button>
        </Link>
      </div>
    </Card>
  );
};

export default EventCard;

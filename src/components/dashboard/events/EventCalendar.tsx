import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { format, isSameDay } from "date-fns";

interface EventCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  events: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
  }>;
}

export default function EventCalendar({ selectedDate, onSelectDate, events }: EventCalendarProps) {
  const todayEvents = events
    .filter((event) => isSameDay(new Date(event.date), selectedDate))
    .slice(0, 4)
    .map((event) => ({
      time: format(new Date(event.date), "h:mm a"),
      category: event.category,
      title: event.title,
      color: event.category === "NFL" ? "bg-blue-500" : 
             event.category === "NBA" ? "bg-purple-500" :
             event.category === "UFC" ? "bg-red-500" : "bg-green-500"
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onSelectDate(date)}
          className="rounded-md border"
        />

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">
            {format(selectedDate, "MMMM d")} Events
          </h4>
          {todayEvents.length > 0 ? (
            todayEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className={`h-2 w-2 rounded-full mt-2 ${event.color}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{event.time}</span>
                  </div>
                  <Badge variant="secondary" className="mb-1 text-xs">
                    {event.category}
                  </Badge>
                  <p className="text-sm font-medium line-clamp-2">{event.title}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No events scheduled
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

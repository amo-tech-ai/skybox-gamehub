import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface EventCalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

const todayEvents = [
  { time: "1:00 PM", category: "NFL", title: "Jets vs Dolphins", color: "bg-blue-500" },
  { time: "4:30 PM", category: "NFL", title: "49ers vs Seahawks", color: "bg-blue-500" },
  { time: "7:00 PM", category: "NBA", title: "Lakers vs Celtics", color: "bg-purple-500" },
  { time: "9:00 PM", category: "UFC", title: "Fight Night Preview", color: "bg-red-500" },
];

export default function EventCalendar({ selectedDate, onSelectDate }: EventCalendarProps) {
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
          <h4 className="font-semibold text-sm">Today's Events</h4>
          {todayEvents.map((event, index) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

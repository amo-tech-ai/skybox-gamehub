import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, DollarSign, Calendar, RefreshCw } from "lucide-react";

const activities = [
  {
    icon: Calendar,
    iconColor: "text-blue-600 bg-blue-50",
    text: "Admin updated ticket prices for",
    highlight: "UFC 309 Fight Night",
    time: "2:00 PM",
  },
  {
    icon: Bell,
    iconColor: "text-green-600 bg-green-50",
    text: "New booking created for",
    highlight: "Champions League Screening Night",
    time: "1:45 PM",
  },
  {
    icon: DollarSign,
    iconColor: "text-orange-600 bg-orange-50",
    text: "Refund processed for",
    highlight: "NBA Playoffs Doubleheader",
    time: "12:30 PM",
  },
  {
    icon: Calendar,
    iconColor: "text-purple-600 bg-purple-50",
    text: "Event published:",
    highlight: "Reggaeton Night – DJ Fermi Live",
    time: "11:15 AM",
  },
  {
    icon: RefreshCw,
    iconColor: "text-gray-600 bg-gray-50",
    text: "System sync completed for",
    highlight: "December events",
    time: "10:00 AM",
  },
  {
    icon: Bell,
    iconColor: "text-green-600 bg-green-50",
    text: "Multiple bookings received for",
    highlight: "NFL Sunday Ticket",
    time: "9:30 AM",
  },
];

export default function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-3">
              <div className={`rounded-full p-2 ${activity.iconColor} flex-shrink-0`}>
                <activity.icon className="h-4 w-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  {activity.text}{" "}
                  <span className="font-semibold">{activity.highlight}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

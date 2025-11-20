import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, DollarSign, Calendar } from "lucide-react";

interface ActivityFeedProps {
  activity: Array<{
    id: string;
    type: "booking" | "event" | "update";
    text: string;
    timestamp: string;
  }>;
}

export default function ActivityFeed({ activity }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "booking":
        return Bell;
      case "event":
        return Calendar;
      case "update":
        return DollarSign;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case "booking":
        return "text-green-600 bg-green-50";
      case "event":
        return "text-blue-600 bg-blue-50";
      case "update":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activity.length > 0 ? (
            activity.map((item) => {
              const Icon = getIcon(item.type);
              const iconColor = getIconColor(item.type);

              return (
                <div key={item.id} className="flex gap-3">
                  <div className={`rounded-full p-2 ${iconColor} flex-shrink-0`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{item.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No recent activity
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

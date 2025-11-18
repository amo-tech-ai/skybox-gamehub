import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Users, MessageCircle } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "booking" | "whatsapp";
  title: string;
  description: string;
  createdAt: string;
}

interface RecentActivityTableProps {
  activity: ActivityItem[];
  loading?: boolean;
}

export default function RecentActivityTable({ activity, loading }: RecentActivityTableProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Users className="h-4 w-4" />;
      case "whatsapp":
        return <MessageCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "booking":
        return <Badge variant="secondary">Reserva</Badge>;
      case "whatsapp":
        return <Badge className="bg-green-500/10 text-green-700 hover:bg-green-500/20">WhatsApp</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[200px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : activity.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-muted-foreground">
            No hay actividad reciente
          </div>
        ) : (
          <div className="space-y-4">
            {activity.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="rounded-full bg-primary/10 p-2 text-primary">
                  {getTypeIcon(item.type)}
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    {getTypeBadge(item.type)}
                    <span className="text-sm font-medium text-foreground">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                    locale: es,
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

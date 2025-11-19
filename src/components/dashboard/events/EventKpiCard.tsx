import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface EventKpiCardProps {
  title: string;
  value: string;
  subtitle: string;
  gradient: string;
  iconColor: string;
}

export default function EventKpiCard({ title, value, subtitle, gradient, iconColor }: EventKpiCardProps) {
  return (
    <Card className={`bg-gradient-to-br ${gradient} border-0 shadow-sm`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            <p className="text-xs text-muted-foreground">
              {subtitle}
            </p>
          </div>
          
          <div className={`rounded-full p-3 ${iconColor} bg-white/50`}>
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

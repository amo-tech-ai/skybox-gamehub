import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    percent?: number;
  };
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, subtitle, trend, icon }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex flex-col items-end gap-2">
            {icon && (
              <div className="rounded-full bg-primary/10 p-3 text-primary">
                {icon}
              </div>
            )}
            
            {trend && trend.direction !== "neutral" && trend.percent !== undefined && (
              <div className={`flex items-center gap-1 text-xs font-medium ${
                trend.direction === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                <span>{trend.percent}%</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

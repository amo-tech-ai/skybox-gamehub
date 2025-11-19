import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 45000000, tickets: 820 },
  { month: "Feb", revenue: 52000000, tickets: 950 },
  { month: "Mar", revenue: 48000000, tickets: 880 },
  { month: "Apr", revenue: 61000000, tickets: 1100 },
  { month: "May", revenue: 58320000, tickets: 1050 },
  { month: "Jun", revenue: 55000000, tickets: 990 },
];

export default function RevenueChart() {
  const [view, setView] = useState<"revenue" | "tickets">("revenue");

  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const currentMonth = data[data.length - 1];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Sales Revenue</CardTitle>
          <Tabs value={view} onValueChange={(v) => setView(v as "revenue" | "tickets")}>
            <TabsList>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">This month</p>
          <p className="text-2xl font-bold">
            {view === "revenue" 
              ? `$ ${currentMonth.revenue.toLocaleString()} COP`
              : `${currentMonth.tickets.toLocaleString()} tickets`
            }
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="month" 
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              className="text-xs text-muted-foreground"
              tickFormatter={view === "revenue" ? formatCurrency : undefined}
            />
            <Tooltip 
              formatter={(value: number) => 
                view === "revenue" 
                  ? `$ ${value.toLocaleString()} COP`
                  : `${value} tickets`
              }
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Bar 
              dataKey={view === "revenue" ? "revenue" : "tickets"} 
              fill="hsl(var(--primary))" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

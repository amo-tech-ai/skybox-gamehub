import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const bookings = [
  {
    invoice: "#INV-001",
    date: "Dec 12, 2024",
    name: "Juan Pérez",
    event: "NFL Sunday Ticket",
    quantity: 4,
    amount: "120.000",
    status: "confirmed",
  },
  {
    invoice: "#INV-002",
    date: "Dec 12, 2024",
    name: "María González",
    event: "UFC Fight Night",
    quantity: 2,
    amount: "80.000",
    status: "confirmed",
  },
  {
    invoice: "#INV-003",
    date: "Dec 11, 2024",
    name: "Carlos Rodríguez",
    event: "Champions League",
    quantity: 6,
    amount: "210.000",
    status: "pending",
  },
  {
    invoice: "#INV-004",
    date: "Dec 11, 2024",
    name: "Ana López",
    event: "NBA Playoffs",
    quantity: 3,
    amount: "135.000",
    status: "confirmed",
  },
  {
    invoice: "#INV-005",
    date: "Dec 10, 2024",
    name: "Luis Martínez",
    event: "Reggaeton Night",
    quantity: 8,
    amount: "320.000",
    status: "cancelled",
  },
];

const statusColors = {
  confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export default function RecentBookingsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.invoice}>
                  <TableCell className="font-medium">{booking.invoice}</TableCell>
                  <TableCell className="text-muted-foreground">{booking.date}</TableCell>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{booking.event}</TableCell>
                  <TableCell className="text-center">{booking.quantity}</TableCell>
                  <TableCell className="text-right font-medium">
                    $ {booking.amount} COP
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusColors[booking.status as keyof typeof statusColors]}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

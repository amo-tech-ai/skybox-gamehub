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

interface RecentBookingsTableProps {
  bookings: Array<{
    id: string;
    invoice: string;
    date: string;
    customerName: string;
    eventTitle: string;
    quantity: number;
    amount: number;
    status: string;
  }>;
}

const statusColors: Record<string, string> = {
  Confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  Pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  Cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export default function RecentBookingsTable({ bookings }: RecentBookingsTableProps) {
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
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.invoice}</TableCell>
                    <TableCell className="text-muted-foreground">{booking.date}</TableCell>
                    <TableCell>{booking.customerName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{booking.eventTitle}</TableCell>
                    <TableCell className="text-center">{booking.quantity}</TableCell>
                    <TableCell className="text-right font-medium">
                      $ {booking.amount.toLocaleString()} COP
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusColors[booking.status] || statusColors.Pending}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No recent bookings
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

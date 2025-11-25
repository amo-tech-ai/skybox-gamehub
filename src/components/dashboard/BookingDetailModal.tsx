import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, User, Phone, CreditCard, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import type { Reservation } from "@/hooks/useReservations";

interface BookingDetailModalProps {
  booking: Reservation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800 hover:bg-green-100",
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  cancelled: "bg-red-100 text-red-800 hover:bg-red-100",
};

export default function BookingDetailModal({
  booking,
  open,
  onOpenChange,
}: BookingDetailModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Booking Details</span>
            <Badge
              variant="secondary"
              className={statusColors[booking.status] || statusColors.pending}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Information */}
          {booking.event && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Event Information</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{booking.event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(booking.event.event_date), "PPP p")}
                    </p>
                  </div>
                </div>
                {booking.event.venue && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm">{booking.event.venue}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <Separator />

          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Customer Information</h3>
            <div className="grid gap-3">
              {booking.profile?.full_name && (
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">{booking.profile.full_name}</p>
                </div>
              )}
              {booking.profile?.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm">{booking.profile.phone}</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Booking Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Booking Information</h3>
            <div className="grid gap-3">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-semibold">
                    $ {booking.total_amount.toLocaleString()} {booking.currency}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Booking Date</p>
                  <p className="text-sm">
                    {format(new Date(booking.booking_date), "PPP")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="text-sm">
                    {format(new Date(booking.created_at), "PPP p")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.special_requests && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Special Requests
                </h3>
                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  {booking.special_requests}
                </p>
              </div>
            </>
          )}

          {/* Booking ID */}
          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              Booking ID: {booking.id}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

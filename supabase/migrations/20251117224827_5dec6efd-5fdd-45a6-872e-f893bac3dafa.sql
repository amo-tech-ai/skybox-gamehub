-- Create event_confirmations table to track WhatsApp messages
CREATE TABLE IF NOT EXISTS public.event_confirmations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
  phone TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_confirmations_booking_id ON public.event_confirmations(booking_id);
CREATE INDEX IF NOT EXISTS idx_event_confirmations_event_id ON public.event_confirmations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_confirmations_phone ON public.event_confirmations(phone);
CREATE INDEX IF NOT EXISTS idx_event_confirmations_status ON public.event_confirmations(status);
CREATE INDEX IF NOT EXISTS idx_event_confirmations_phone_event ON public.event_confirmations(phone, event_id);

-- Add comment
COMMENT ON TABLE public.event_confirmations IS 'Tracks WhatsApp confirmation messages sent to users';

-- Enable RLS
ALTER TABLE public.event_confirmations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Staff can view all confirmations
CREATE POLICY "Staff can view all event confirmations"
ON public.event_confirmations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.user_id = auth.uid()
    AND profiles.role IN ('staff', 'admin', 'superadmin')
  )
);

-- Users can view their own confirmations (via booking)
CREATE POLICY "Users can view own event confirmations"
ON public.event_confirmations
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.bookings
    WHERE bookings.id = event_confirmations.booking_id
    AND bookings.user_id = auth.uid()
  )
);

-- System can insert confirmations (anon key for edge function)
CREATE POLICY "System can insert event confirmations"
ON public.event_confirmations
FOR INSERT
TO anon
WITH CHECK (true);

-- System can update confirmations (for delivery status)
CREATE POLICY "System can update event confirmations"
ON public.event_confirmations
FOR UPDATE
TO anon
USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_event_confirmations_updated_at
  BEFORE UPDATE ON public.event_confirmations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
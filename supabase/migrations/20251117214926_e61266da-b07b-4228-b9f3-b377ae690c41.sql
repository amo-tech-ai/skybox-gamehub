-- Create newsletter_subscriptions table
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  name TEXT,
  phone TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  source TEXT DEFAULT 'blog',
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribe_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  deleted_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(email)
);

-- Create index for faster lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscriptions(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_newsletter_phone ON public.newsletter_subscriptions(phone) WHERE deleted_at IS NULL;
CREATE INDEX idx_newsletter_status ON public.newsletter_subscriptions(status) WHERE deleted_at IS NULL;

-- Enable RLS
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to subscribe (insert)
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Only staff can view all subscriptions
CREATE POLICY "Staff can view all newsletter subscriptions"
  ON public.newsletter_subscriptions
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role IN ('staff', 'admin', 'superadmin')
    )
  );

-- Allow updates via unsubscribe token (for unsubscribe functionality)
CREATE POLICY "Anyone can unsubscribe with valid token"
  ON public.newsletter_subscriptions
  FOR UPDATE
  USING (true)
  WITH CHECK (status = 'unsubscribed');

-- Add trigger for updated_at
CREATE TRIGGER update_newsletter_subscriptions_updated_at
  BEFORE UPDATE ON public.newsletter_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add comment
COMMENT ON TABLE public.newsletter_subscriptions IS 'Stores newsletter subscriptions with WhatsApp contact information';
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LoyaltyPointsRequest {
  customerId: string;
  reason: 'checkin' | 'order' | 'vip-bonus';
  amount?: number;
}

// Default point values per action
const DEFAULT_POINTS = {
  'checkin': 10,
  'order': 5,
  'vip-bonus': 20,
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json() as LoyaltyPointsRequest;
    const { customerId, reason, amount } = body;

    // Validate required fields
    if (!customerId || !reason) {
      console.error('Missing required fields:', { customerId: !!customerId, reason: !!reason });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: customerId, reason' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Validate reason
    if (!['checkin', 'order', 'vip-bonus'].includes(reason)) {
      return new Response(
        JSON.stringify({ error: 'Invalid reason. Must be: checkin, order, or vip-bonus' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }

    // Calculate points to add
    const pointsToAdd = amount || DEFAULT_POINTS[reason];

    console.log('Updating loyalty points:', { customerId, reason, pointsToAdd });

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current customer profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, full_name, metadata')
      .eq('id', customerId)
      .single();

    if (fetchError || !profile) {
      console.error('Error fetching profile:', fetchError);
      throw new Error('Customer not found');
    }

    // Get current loyalty points from metadata (or initialize to 0)
    const currentPoints = (profile.metadata as any)?.loyalty_points || 0;
    const newPoints = currentPoints + pointsToAdd;

    // Update profile with new loyalty points in metadata
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        metadata: {
          ...(profile.metadata as object || {}),
          loyalty_points: newPoints,
        },
        updated_at: new Date().toISOString(),
      })
      .eq('id', customerId);

    if (updateError) {
      console.error('Error updating loyalty points:', updateError);
      throw new Error('Failed to update loyalty points');
    }

    console.log(`Updated loyalty points for ${profile.full_name}: ${currentPoints} → ${newPoints} (+${pointsToAdd})`);

    // TODO: Insert into loyalty_history table for audit trail
    // CREATE TABLE loyalty_history (
    //   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    //   customer_id uuid REFERENCES profiles(id),
    //   points integer NOT NULL,
    //   reason text NOT NULL,
    //   created_at timestamptz DEFAULT now()
    // );

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Loyalty points updated successfully',
        previousPoints: currentPoints,
        pointsAdded: pointsToAdd,
        newTotal: newPoints,
        reason,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in loyalty-points-update function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
};

serve(handler);

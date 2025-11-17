// API helper for sending VIP broadcast messages via WhatsApp

const SUPABASE_PROJECT_ID = 'dbocegamkdnsorhtdbni';
const VIP_BROADCAST_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/vip-broadcast`;

export interface VipBroadcastPayload {
  segment: 'vip' | 'recent' | 'all';
  message: string;
}

export interface VipBroadcastResponse {
  success: boolean;
  sentCount: number;
  failedCount: number;
  totalCustomers: number;
}

/**
 * Sends a promotional WhatsApp message to a segment of customers
 * @throws Error if the API call fails
 */
export async function sendVipBroadcast(
  payload: VipBroadcastPayload
): Promise<VipBroadcastResponse> {
  console.log('Sending VIP broadcast:', payload);

  const response = await fetch(VIP_BROADCAST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('VIP broadcast API error:', data);
    throw new Error(data?.error || 'Failed to send VIP broadcast');
  }

  console.log('VIP broadcast sent successfully:', data);
  return data;
}

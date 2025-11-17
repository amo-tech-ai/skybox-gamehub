// API helper for updating customer loyalty points

const SUPABASE_PROJECT_ID = 'dbocegamkdnsorhtdbni';
const LOYALTY_POINTS_URL = `https://${SUPABASE_PROJECT_ID}.supabase.co/functions/v1/loyalty-points-update`;

export interface LoyaltyPointsPayload {
  customerId: string;
  reason: 'checkin' | 'order' | 'vip-bonus';
  amount?: number;
}

export interface LoyaltyPointsResponse {
  success: boolean;
  message: string;
  previousPoints: number;
  pointsAdded: number;
  newTotal: number;
  reason: string;
}

/**
 * Updates a customer's loyalty points based on an action
 * @throws Error if the API call fails
 */
export async function updateLoyaltyPoints(
  payload: LoyaltyPointsPayload
): Promise<LoyaltyPointsResponse> {
  console.log('Updating loyalty points:', payload);

  const response = await fetch(LOYALTY_POINTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Loyalty points API error:', data);
    throw new Error(data?.error || 'Failed to update loyalty points');
  }

  console.log('Loyalty points updated successfully:', data);
  return data;
}

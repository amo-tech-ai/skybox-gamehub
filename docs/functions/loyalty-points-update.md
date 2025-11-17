# Loyalty Points Update Edge Function

## Overview
Centralized function for updating customer loyalty points based on actions (check-ins, orders, VIP bonuses).

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/loyalty-points-update
```

## Request Payload

```json
{
  "customerId": "uuid-string",
  "reason": "checkin" | "order" | "vip-bonus",
  "amount": 10 // optional override
}
```

### Fields
- `customerId` (required): UUID of the customer profile
- `reason` (required): Action that triggered points
  - `"checkin"`: Customer checked in to event (+10 points)
  - `"order"`: Customer made a purchase (+5 points)
  - `"vip-bonus"`: Manual VIP bonus (+20 points)
- `amount` (optional): Override default point value

### Default Point Values
```typescript
{
  'checkin': 10,
  'order': 5,
  'vip-bonus': 20
}
```

## Response

### Success (200)
```json
{
  "success": true,
  "message": "Loyalty points updated successfully",
  "previousPoints": 50,
  "pointsAdded": 10,
  "newTotal": 60,
  "reason": "checkin"
}
```

### Error (400/500)
```json
{
  "error": "Invalid reason. Must be: checkin, order, or vip-bonus"
}
```

## Example Usage

### cURL
```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/loyalty-points-update \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "123e4567-e89b-12d3-a456-426614174000",
    "reason": "checkin"
  }'
```

### Frontend Integration

#### On Event Check-in
```typescript
import { updateLoyaltyPoints } from '@/api/loyaltyPoints';

const handleEventCheckin = async (customerId: string, eventId: string) => {
  try {
    // Process check-in
    await recordCheckin({ customerId, eventId });
    
    // Award loyalty points
    const result = await updateLoyaltyPoints({
      customerId,
      reason: 'checkin'
    });
    
    toast.success(
      `¡Check-in exitoso! +${result.pointsAdded} puntos (Total: ${result.newTotal})`
    );
  } catch (error) {
    console.error('Check-in error:', error);
  }
};
```

#### On Order Completion
```typescript
import { updateLoyaltyPoints } from '@/api/loyaltyPoints';

const handleOrderComplete = async (customerId: string, orderId: string) => {
  try {
    // Process payment
    await completeOrder({ customerId, orderId });
    
    // Award loyalty points
    await updateLoyaltyPoints({
      customerId,
      reason: 'order'
    });
    
    toast.success('¡Compra exitosa! +5 puntos de lealtad');
  } catch (error) {
    console.error('Order error:', error);
  }
};
```

#### Manual VIP Bonus (Admin)
```typescript
const awardVipBonus = async (customerId: string) => {
  const confirmed = window.confirm('¿Otorgar bonus VIP de 20 puntos?');
  if (!confirmed) return;
  
  try {
    const result = await updateLoyaltyPoints({
      customerId,
      reason: 'vip-bonus'
    });
    
    toast.success(`Bonus otorgado: +${result.pointsAdded} puntos`);
  } catch (error: any) {
    toast.error(error.message);
  }
};
```

#### Custom Amount
```typescript
await updateLoyaltyPoints({
  customerId: userId,
  reason: 'vip-bonus',
  amount: 50 // Custom amount instead of default 20
});
```

## Current Implementation

### Storage
Points are stored in `profiles.metadata.loyalty_points`:

```typescript
// profiles table structure
{
  id: uuid,
  full_name: string,
  phone: string,
  metadata: {
    loyalty_points: number, // <-- stored here
    // ... other metadata
  }
}
```

### Query Current Points
```sql
SELECT 
  id,
  full_name,
  (metadata->>'loyalty_points')::integer as loyalty_points
FROM profiles
ORDER BY (metadata->>'loyalty_points')::integer DESC NULLS LAST
LIMIT 10;
```

## TODO: Create Loyalty History Table

For audit trail and detailed analytics:

```sql
CREATE TABLE loyalty_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id) NOT NULL,
  points INTEGER NOT NULL,
  reason TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_loyalty_history_customer ON loyalty_history(customer_id);
CREATE INDEX idx_loyalty_history_created ON loyalty_history(created_at DESC);

-- Enable RLS
ALTER TABLE loyalty_history ENABLE ROW LEVEL SECURITY;

-- Users can view own history
CREATE POLICY "Users can view own loyalty history"
  ON loyalty_history
  FOR SELECT
  USING (customer_id = auth.uid());

-- Staff can view all
CREATE POLICY "Staff can view all loyalty history"
  ON loyalty_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role IN ('staff', 'admin', 'superadmin')
    )
  );

-- System can insert
CREATE POLICY "System can insert loyalty history"
  ON loyalty_history
  FOR INSERT
  WITH CHECK (true);
```

## Loyalty Dashboard Queries

### Top Customers
```sql
SELECT 
  id,
  full_name,
  phone,
  (metadata->>'loyalty_points')::integer as points
FROM profiles
WHERE (metadata->>'loyalty_points')::integer > 0
ORDER BY (metadata->>'loyalty_points')::integer DESC
LIMIT 20;
```

### Points Activity (with history table)
```sql
SELECT 
  DATE(created_at) as date,
  reason,
  COUNT(*) as transactions,
  SUM(points) as total_points
FROM loyalty_history
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at), reason
ORDER BY date DESC;
```

### Customer Points History
```sql
SELECT 
  created_at,
  reason,
  points,
  SUM(points) OVER (
    PARTITION BY customer_id 
    ORDER BY created_at
  ) as running_total
FROM loyalty_history
WHERE customer_id = '123e4567-e89b-12d3-a456-426614174000'
ORDER BY created_at DESC;
```

## Gamification Ideas

### Point Tiers
```typescript
const LOYALTY_TIERS = {
  bronze: { min: 0, name: 'Bronze', perks: 'Basic' },
  silver: { min: 100, name: 'Silver', perks: '5% descuento' },
  gold: { min: 250, name: 'Gold', perks: '10% descuento + bebida gratis' },
  platinum: { min: 500, name: 'Platinum', perks: '15% descuento + mesa VIP' },
};

function getUserTier(points: number) {
  if (points >= 500) return LOYALTY_TIERS.platinum;
  if (points >= 250) return LOYALTY_TIERS.gold;
  if (points >= 100) return LOYALTY_TIERS.silver;
  return LOYALTY_TIERS.bronze;
}
```

### Redemption Rules
```typescript
const REWARDS = [
  { points: 50, reward: 'Bebida gratis' },
  { points: 100, reward: '10% descuento' },
  { points: 250, reward: 'Entrada gratis a evento' },
  { points: 500, reward: 'Mesa VIP gratis' },
];
```

### Leaderboard Component
```tsx
function LoyaltyLeaderboard() {
  const { data: topCustomers } = useQuery({
    queryKey: ['loyalty-leaderboard'],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, metadata')
        .order('(metadata->>loyalty_points)::int', { ascending: false })
        .limit(10);
      
      return data?.map(p => ({
        name: p.full_name,
        points: (p.metadata as any)?.loyalty_points || 0
      }));
    }
  });

  return (
    <div className="space-y-2">
      <h3 className="font-bold">🏆 Top Clientes</h3>
      {topCustomers?.map((customer, i) => (
        <div key={i} className="flex justify-between">
          <span>{i + 1}. {customer.name}</span>
          <span className="font-bold">{customer.points} pts</span>
        </div>
      ))}
    </div>
  );
}
```

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Tables Used
- `profiles`: Stores loyalty points in metadata
- `loyalty_history`: Audit trail (TODO: create table)

## Future Improvements
- [ ] Create loyalty_history table for audit trail
- [ ] Add expiration dates for points
- [ ] Implement point redemption system
- [ ] Add tier-based rewards
- [ ] Send notifications on milestone achievements
- [ ] Add bonus point campaigns (2x points on Fridays)
- [ ] Create loyalty dashboard for customers

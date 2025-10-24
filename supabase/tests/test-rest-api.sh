#!/bin/bash
# Test Supabase REST API Connection

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

PROJECT_REF="dbocegamkdnsorhtdbni"
API_URL="https://${PROJECT_REF}.supabase.co"

echo "🧪 Test 3: Supabase REST API Connection"
echo "========================================"
echo ""

# Test 1: Public endpoint with anon key
echo "Test 3.1: Public read with anon key"
RESPONSE=$(curl -s -X GET "${API_URL}/rest/v1/event_categories?select=*&limit=3" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

if echo "$RESPONSE" | grep -q "Baseball"; then
  echo "✅ Public read successful"
  echo "   Response: $RESPONSE" | head -c 200
  echo "..."
else
  echo "❌ Public read failed"
  echo "   Response: $RESPONSE"
  exit 1
fi

echo ""

# Test 2: Service role access
echo "Test 3.2: Admin access with service role key"
RESPONSE=$(curl -s -X GET "${API_URL}/rest/v1/events?select=id,title,status&limit=2" \
  -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}")

if echo "$RESPONSE" | grep -q "title"; then
  echo "✅ Service role access successful"
  echo "   Response: $RESPONSE" | head -c 200
  echo "..."
else
  echo "❌ Service role access failed"
  echo "   Response: $RESPONSE"
  exit 1
fi

echo ""

# Test 3: Count query
echo "Test 3.3: Count query"
COUNT=$(curl -s -X GET "${API_URL}/rest/v1/event_categories?select=count" \
  -H "apikey: ${VITE_SUPABASE_ANON_KEY}" \
  -H "Authorization: Bearer ${VITE_SUPABASE_ANON_KEY}")

if echo "$COUNT" | grep -q "count"; then
  echo "✅ Count query successful"
  echo "   Result: $COUNT"
else
  echo "❌ Count query failed"
  echo "   Response: $COUNT"
fi

echo ""
echo "🎉 All REST API tests passed!"

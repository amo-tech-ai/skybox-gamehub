# Event Analytics Daily Edge Function

## Overview
Generates daily statistics per event for dashboards. Runs automatically via cron every night at 03:00 AM.

## Endpoint
```
POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-analytics-daily
```

⚠️ **Note**: This function is triggered by Supabase cron, not called directly by browsers.

## What It Does
For each event, calculates yesterday's statistics:
- **Registrations**: New event confirmations
- **Check-ins**: Event attendance (TODO: when table exists)
- **Views**: Event page views (TODO: when table exists)

Results are stored in `event_stats_daily` table for dashboard queries.

## Cron Schedule
Configured in `supabase/config.toml`:
```toml
[functions.event-analytics-daily]
verify_jwt = false
schedule = "0 3 * * *"  # Run daily at 03:00 AM
```

### Cron Syntax
```
* * * * *
│ │ │ │ │
│ │ │ │ └─ Day of week (0-7, Sunday = 0 or 7)
│ │ │ └─── Month (1-12)
│ │ └───── Day of month (1-31)
│ └─────── Hour (0-23)
└───────── Minute (0-59)
```

### Common Schedules
- `0 3 * * *` - Every day at 03:00
- `0 */4 * * *` - Every 4 hours
- `0 0 * * 0` - Every Sunday at midnight
- `*/15 * * * *` - Every 15 minutes

## Response

### Success (200)
```json
{
  "success": true,
  "message": "Daily analytics generated successfully",
  "date": "2025-11-16",
  "statsGenerated": 15
}
```

## Database Schema

### TODO: Create `event_stats_daily` Table
```sql
CREATE TABLE event_stats_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id),
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  registrations INTEGER DEFAULT 0,
  checkins INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, date)
);

CREATE INDEX idx_event_stats_date ON event_stats_daily(date DESC);
CREATE INDEX idx_event_stats_event_id ON event_stats_daily(event_id);

-- Enable RLS
ALTER TABLE event_stats_daily ENABLE ROW LEVEL SECURITY;

-- Staff can view all stats
CREATE POLICY "Staff can view all event stats"
  ON event_stats_daily
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE user_id = auth.uid()
      AND role IN ('staff', 'admin', 'superadmin')
    )
  );

-- System can insert/update
CREATE POLICY "System can manage event stats"
  ON event_stats_daily
  FOR ALL
  USING (true);
```

## Dashboard Queries

### Top Events This Week
```sql
SELECT 
  e.title,
  e.event_date,
  SUM(s.registrations) as total_registrations,
  SUM(s.checkins) as total_checkins,
  SUM(s.views) as total_views,
  ROUND(SUM(s.checkins) * 100.0 / NULLIF(SUM(s.registrations), 0), 2) as attendance_rate
FROM event_stats_daily s
JOIN events e ON e.id = s.event_id
WHERE s.date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY e.id, e.title, e.event_date
ORDER BY total_registrations DESC
LIMIT 10;
```

### Event Performance Trend
```sql
SELECT 
  date,
  SUM(registrations) as daily_registrations,
  SUM(checkins) as daily_checkins,
  SUM(views) as daily_views
FROM event_stats_daily
WHERE date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY date
ORDER BY date;
```

### Single Event Analytics
```sql
SELECT 
  date,
  views,
  registrations,
  checkins,
  ROUND(checkins * 100.0 / NULLIF(registrations, 0), 2) as attendance_rate
FROM event_stats_daily
WHERE event_id = '123e4567-e89b-12d3-a456-426614174000'
  AND date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY date DESC;
```

### Monthly Summary
```sql
SELECT 
  DATE_TRUNC('month', date) as month,
  COUNT(DISTINCT event_id) as events_count,
  SUM(registrations) as total_registrations,
  SUM(checkins) as total_checkins,
  ROUND(AVG(checkins * 100.0 / NULLIF(registrations, 0)), 2) as avg_attendance_rate
FROM event_stats_daily
WHERE date >= CURRENT_DATE - INTERVAL '6 months'
GROUP BY DATE_TRUNC('month', date)
ORDER BY month DESC;
```

## Manual Trigger
Can be triggered manually via Supabase dashboard or cURL:

```bash
curl -X POST https://dbocegamkdnsorhtdbni.supabase.co/functions/v1/event-analytics-daily \
  -H "Content-Type: application/json"
```

## Monitoring

### Check Last Run
```sql
SELECT 
  date,
  COUNT(*) as events_processed,
  MAX(updated_at) as last_update
FROM event_stats_daily
GROUP BY date
ORDER BY date DESC
LIMIT 7;
```

### Verify Data Completeness
```sql
-- Events missing stats for yesterday
SELECT e.id, e.title
FROM events e
WHERE e.deleted_at IS NULL
  AND NOT EXISTS (
    SELECT 1 FROM event_stats_daily s
    WHERE s.event_id = e.id
    AND s.date = CURRENT_DATE - INTERVAL '1 day'
  );
```

## Environment Variables Required
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

## Database Tables Used
- `events`: Source of event data
- `event_confirmations`: Counts registrations
- `event_stats_daily`: Stores computed stats (TODO: create table)

## Future Improvements
- [ ] Create `event_views` table to track page views
- [ ] Create `event_checkins` table for attendance tracking
- [ ] Add revenue metrics (from bookings/payments)
- [ ] Send daily summary email to admins
- [ ] Add anomaly detection (sudden drop in registrations)
- [ ] Export stats to external analytics tools

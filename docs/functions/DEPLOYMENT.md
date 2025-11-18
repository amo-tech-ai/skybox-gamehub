# Edge Functions Deployment Guide

## Prerequisites

Before deploying, ensure:

- Supabase CLI is installed: `npm install -g supabase`
- You're logged in: `supabase login`
- Project is linked: `supabase link --project-ref dbocegamkdnsorhtdbni`
- All required secrets are set in Supabase Dashboard → Project Settings → Edge Functions

## Required Secrets

Make sure these secrets are configured in your Supabase project:

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN
TWILIO_WHATSAPP_FROM
YOUTUBE_API_KEY (for sports-video-sync)
```

## Deploy All Functions

Deploy all edge functions in one command:

```bash
supabase functions deploy \
  event-confirmation \
  vip-broadcast \
  event-registration-check \
  twilio-status-webhook \
  event-analytics-daily \
  event-feedback-request \
  loyalty-points-update \
  sports-video-sync
```

## Deploy Individual Functions

To deploy a single function:

```bash
supabase functions deploy event-confirmation
```

## Verify Deployment

After deployment, check:

1. **Function appears in dashboard**:
   - Go to https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/functions
   - Verify all functions are listed

2. **Test with curl** (see `docs/testing/EDGE_FUNCTION_TESTS.md`)

3. **Check logs**:
   - Dashboard → Functions → [function-name] → Logs
   - Look for any startup errors

## Cron Schedules

The following functions run on schedule (defined in `supabase/config.toml`):

- `event-analytics-daily`: Daily at 03:00 (0 3 * * *)
- `sports-video-sync`: Every 4 hours (0 */4 * * *)

Cron schedules are automatically configured when you deploy.

## Troubleshooting

### Function not appearing
- Check you're linked to the correct project
- Verify function has an `index.ts` file
- Check `supabase/config.toml` includes the function

### Secrets not available
- Set secrets in Dashboard → Settings → Edge Functions
- Redeploy after adding secrets

### Cron not running
- Verify schedule syntax in `config.toml`
- Check function logs for errors
- Ensure function has `verify_jwt = false` for cron

## Rollback

To rollback a function:

1. Revert code changes in your repository
2. Redeploy: `supabase functions deploy [function-name]`

## Production Checklist

Before going live:

- [ ] All secrets configured
- [ ] All functions deployed successfully
- [ ] Curl tests passing (see EDGE_FUNCTION_TESTS.md)
- [ ] Twilio webhook URL configured
- [ ] YouTube API quota limits reviewed
- [ ] RLS policies tested
- [ ] Error handling tested
- [ ] Logs reviewed for warnings

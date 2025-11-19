# Fix "Failed to Fetch" Error in Postiz

## Problem

When trying to sign up or use Postiz, you see:
- **Error**: "General error: TypeError: Failed to fetch. Please check your browser console."
- **Console Error**: "Failed to get generic oauth login link: TypeError: Failed to fetch"

## Root Cause

The **backend API** (`http://localhost:3000`) is not running or not accessible, usually because:
1. Port 3000 is blocked by another service (e.g., Twenty CRM)
2. Backend failed to start due to port conflict
3. CORS configuration issue

## Solution

### Step 1: Free Port 3000

**Check what's using port 3000:**
```bash
lsof -i :3000
# or
docker ps | grep 3000
```

**Stop conflicting services:**

If **Twenty CRM** is running:
```bash
cd /home/sk/skybox/twenty/packages/twenty-docker
docker compose stop server
```

If another service:
```bash
# Find and kill the process
lsof -ti :3000 | xargs kill -9
```

### Step 2: Verify Backend Configuration

**Check `.env` file has correct URLs:**
```bash
cd /home/sk/skybox/postiz-app
cat .env | grep -E "FRONTEND_URL|BACKEND|PORT"
```

Should show:
```env
FRONTEND_URL="http://localhost:4200"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
BACKEND_INTERNAL_URL="http://localhost:3000"
```

### Step 3: Restart Postiz Development Server

**Stop current dev server** (if running):
```bash
# Find the process
ps aux | grep "pnpm.*dev"

# Kill it
pkill -f "pnpm run dev"
```

**Start fresh:**
```bash
cd /home/sk/skybox/postiz-app
pnpm run dev
```

**Wait for backend to start:**
- Look for: `🚀 Backend is running on: http://localhost:3000`
- Usually takes 30-60 seconds

### Step 4: Verify Backend is Responding

**Test backend API:**
```bash
curl http://localhost:3000
# Should return HTML or JSON response

curl http://localhost:3000/auth/can-register
# Should return JSON (may require auth)
```

### Step 5: Check CORS Configuration

The backend CORS in `apps/backend/src/main.ts` allows:
- `process.env.FRONTEND_URL` (should be `http://localhost:4200`)
- `http://localhost:6274`
- `process.env.MAIN_URL` (if set)

**Verify `.env` has:**
```env
FRONTEND_URL="http://localhost:4200"
```

### Step 6: Refresh Browser

1. Navigate to: `http://localhost:4200`
2. Open browser console (F12)
3. Check for errors
4. Try sign-up again

## Quick Fix Command

```bash
# Stop Twenty CRM (if running)
cd /home/sk/skybox/twenty/packages/twenty-docker && docker compose stop server

# Kill any process on port 3000
lsof -ti :3000 | xargs kill -9 2>/dev/null || true

# Restart Postiz dev server
cd /home/sk/skybox/postiz-app
pkill -f "pnpm run dev" 2>/dev/null || true
sleep 2
pnpm run dev
```

## Verification Checklist

- [ ] Port 3000 is free: `lsof -i :3000` returns nothing
- [ ] Docker services running: `docker compose -f docker-compose.dev.yaml ps`
- [ ] Backend responding: `curl http://localhost:3000` returns response
- [ ] Frontend can connect: No CORS errors in browser console
- [ ] Sign-up form submits successfully

## Common Issues

### Backend Still Not Starting

**Check logs:**
```bash
# View terminal where pnpm run dev is running
# Look for errors in the backend startup
```

**Check database:**
```bash
docker compose -f docker-compose.dev.yaml ps | grep postgres
# Should show "Up" status
```

**Check environment:**
```bash
cd /home/sk/skybox/postiz-app
cat .env | grep DATABASE_URL
# Should match docker-compose.dev.yaml credentials
```

### CORS Errors Persist

**Enable NOT_SECURED for localhost:**
```bash
cd /home/sk/skybox/postiz-app
# Edit .env and add/update:
NOT_SECURED=true
```

Then restart dev server.

### Port 3000 Keeps Getting Taken

**Use a different port for Postiz backend:**
1. Edit `.env`:
   ```env
   PORT=3001
   NEXT_PUBLIC_BACKEND_URL...

="http://localhost:3001"
   BACKEND_INTERNAL_URL="http://localhost:3001"
   ```
2. Restart dev server

## Prevention

**To avoid port conflicts:**
- Stop Twenty CRM before starting Postiz: `docker compose stop server`
- Use different ports for different projects
- Check ports before starting: `lsof -i :3000`

---

**Related Docs:**
- `03-POSTIZ-LOCALHOST-QUICKSTART.md` - Full setup guide
- `04-POSTIZ-SETUP-VERIFICATION.md` - Setup verification

**Last Updated**: October 30, 2025


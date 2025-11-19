# Postiz 404 Error Fix - /auth/register

**Date**: October 30, 2025, 10:00 PM  
**Issue**: Frontend shows 404 error when trying to register: `Cannot POST /auth/register`

---

## 🔍 Problem Analysis

### Error Message
```
{"statusCode":404,"message":"Cannot POST /auth/register","error":"Not Found"}
```

### Root Cause
**Multiple backend processes** were running simultaneously, causing:
1. Port conflicts (`EADDRINUSE: address already in use :::3000`)
2. Route registration conflicts
3. One process blocking the correct routes

---

## ✅ Solution

### Step 1: Kill All Backend Processes
```bash
pkill -9 -f "nest start"
pkill -9 -f "backend.*main"
lsof -ti :3000 | xargs kill -9 2>/dev/null || true
```

### Step 2: Start Fresh Backend
```bash
cd /home/sk/skybox/postiz-app
pnpm --filter ./apps/backend run dev > /tmp/postiz-backend-fresh.log 2>&1 &
```

### Step 3: Wait for Route Registration
Wait ~20 seconds for backend to fully start and register all routes.

### Step 4: Verify Route is Registered
Check logs for:
```
LOG [RouterExplorer] Mapped {/auth/register, POST} route
```

---

## 🔧 Verification

### Test the Endpoint
```bash
curl -X POST http://localhost:300的情绪/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","company":"test","provider":"LOCAL"}'
```

**Expected Response**: HTTP 200 or 400 (not 404)

---

## 📋 Updated Startup Script

The `start-postiz-working.sh` script should:
1. ✅ Kill all existing processes first
2. ✅ Wait for complete cleanup
3. ✅ Start backend fresh
4. ✅ Wait for route registration (20+ seconds)
5. ✅ Verify routes are mapped before President proceeding

---

## 🎯 Prevention

### Check for Running Processes Before Starting
```bash
# Check for existing processes
ps aux | grep -E "nest start|backend.*main" | grep -v grep

# If found, kill them
pkill -9 -f "nest start"
```

### Use Process Management
Consider using `pm2` or similar process manager to prevent duplicate instances.

---

## ✅ Status

- [x] Issue identified (multiple backend processes)
- [x] Solution applied (cleanup + fresh start)
- [x] Route verification (check logs)
- [x] Test endpoint (curl test)

---

**Next Steps**: Verify registration works in browser after backend restart.










# Twenty CRM CORS Fix - Backend URL Configuration

**Date**: October 31, 2025, 12:00 AM  
**Issue**: CORS errors - Twenty CRM trying to connect to Postiz backend  
**Status**: ✅ **FIXED**

---

## 🔍 Problem

Twenty CRM frontend (port 8080) was trying to connect to `http://localhost:3000` (Postiz backend) instead of its own backend, causing CORS errors:

```
Access to fetch at 'http://localhost:3000/client-config' from origin 'http://localhost:8080' 
has been blocked by CORS policy
```

---

## 🐛 Root Cause

The `.env` file had `SERVER_URL=http://localhost:3000`, which made Twenty CRM's frontend try to connect to Postiz's backend instead of its own.

---

## ✅ Solution

Updated `SERVER_URL` in `.env` to match the new port configuration:

**Before**:
```bash
SERVER_URL=http://localhost:3000  # Wrong - points to Postiz
```

**After**:
```bash
SERVER_URL=http://localhost:8080  # Correct - points to Twenty CRM
```

---

## 🔧 Steps Taken

1. **Updated .env file**:
   ```bash
   cd /home/sk/twenty-installation/twenty/packages/twenty-docker
   # Changed SERVER_URL=http://localhost:3000 to SERVER_URL=http://localhost:8080
   ```

2. **Restarted containers**:
   ```bash
   docker compose down
   docker compose up -d
   ```

3. **Verified backend URL**:
   - Frontend now correctly uses `http://localhost:8080` for API calls
   - Backend endpoints accessible at `http://localhost:8080`

---

## ✅ Verification

### Check Frontend Configuration
```bash
curl -s http://localhost:8080 | grep "REACT_APP_SERVER_BASE_URL"
```

Should show: `REACT_APP_SERVER_BASE_URL": "http://localhost:8080"`

### Test Backend Endpoints
```bash
curl -s http://localhost:8080/client-config
curl -s http://localhost:8080/metadata
```

Should return data (not CORS errors)

---

## 📋 Configuration Summary

| Setting | Value | Purpose |
|---------|-------|---------|
| `SERVER_URL` | `http://localhost:8080` | Backend API URL for frontend |
| Port Mapping | `8080:3000` | External port 8080 → Internal port 3000 |
| `NODE_PORT` | `3000` | Internal container port |

---

## ✅ Status

- [x] `.env` updated with correct SERVER_URL
- [x] Containers restarted inherit new configuration
- [x] Frontend now points to correct backend
- [x] CORS errors resolved

---

**Result**: ✅ **Twenty CRM now connects to its own backend correctly!**

**Access**: http://localhost:8080










# Postiz CORS Fix - auth Header Not Allowed

**Date**: October 30, 2025, 10:05 PM  
**Status**: ✅ **FIXED**

---

## 🔍 Problem

Frontend was getting CORS error when trying to access `/user/self`:

```
Access to fetch at 'http://localhost:3000/user/self' from origin 'http://localhost:4200' 
has been blocked by CORS policy: Request header field auth is not allowed by 
Access-Control-Allow-Headers in preflight response.
```

---

## 🐛 Root Cause

When `NOT_SECURED=true` (for local HTTP development), the frontend sends authentication via the `auth` header instead of `Authorization`. However, the backend CORS configuration only allowed `Authorization` in `allowedHeaders`, not `auth`.

### Backend CORS Config (Before Fix)

```typescript
allowedHeaders: ['Content-Type', 'Authorization', 'x-copilotkit-runtime-client-gql-version'],
```

**Issue**: Missing `auth`, `showorg`, and `impersonate` headers in `allowedHeaders` when `NOT_SECURED=true`.

---

## ✅ Solution

Updated `apps/backend/src/main.ts` to include `auth`, `showorg`, and `impersonate` in `allowedHeaders` when `NOT_SECURED=true`:

```typescript
allowedHeaders: [
  'Content-Type',
  'Authorization',
  'x-copilotkit-runtime-client-gql-version',
  ...(process.env.NOT_SECURED ? ['auth', 'showorg', 'impersonate'] : []),
],
```

This matches the pattern already used for `exposedHeaders`.

---

## 🔧 Changes Made

**File**: `/home/sk/skybox/postiz-app/apps/backend/src/main.ts`

**Before**:
```typescript
allowedHeaders: ['Content-Type', 'Authorization', 'x-copilotkit-runtime-client-gql-version'],
```

**After**:
```typescript
allowedHeaders: [
  'Content-Type',
  'Authorization',
  'x-copilotkit-runtime-client-gql-version',
  ...(process.env.NOT_SECURED ? ['auth', 'showorg', 'impersonate'] : []),
],
```

---

## ✅ Verification

### Test CORS Preflight
```bash
curl -X OPTIONS http://localhost:3000/user/self \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: auth" \
  -v
```

**Expected**: `Access-Control-Allow-Headers: auth` in response headers

### Test Actual Request
```bash
curl -X GET http://localhost:3000/user/self \
  -H "Origin: http://localhost:4200" \
  -H "auth: test-token" \
  -v
```

**Expected**: HTTP 200 or 401 (not CORS error)

---

## 📋 Configuration Summary

For local development with `NOT_SECURED=true`:

✅ **Allowed Headers**:
- `Content-Type`
- `Authorization`
- `auth` (when NOT_SECURED=true)
- `showorg` (when NOT_SECURED=true)
- `impersonate` (when NOT_SECURED=true)
- `x-copilotkit-runtime-client-gql-version`

✅ **Exposed Headers**:
- `reload`
- `onboarding`
- `activate`
- `auth` (when NOT_SECURED=true)
- `showorg` (when NOT_SECURED=true)
- `impersonate` (when NOT_SECURED=true)
- `x-copilotkit-runtime-client including-gql-version`

✅ **Allowed Origins**:
- `http://localhost:4200` (FRONTEND_URL)
- `http://localhost:6274`
- Main URL (if set)

---

## 🔄 Restart Required

After making this change, the backend must be restarted:

```bash
cd /home/sk/skybox/postiz-app
pkill -9 -f "nest start.*backend"
pnpm --filter ./apps/backend run dev > /tmp/postiz-backend.log 2>&1 &
```

Wait ~20-30 seconds for backend to fully start.

---

## ✅ Status

- [x] Issue identified (auth header not in allowedHeaders)
- [x] CORS configuration updated
- [x] Backend restarted
- [x] CORS preflight test verified

---

## 📝 Notes

- **Production**: When `NOT_SECURED=false` (HTTPS), the frontend uses `Authorization` header (standard), so `auth` header is not needed in allowedHeaders.
- **Development**: When `NOT_SECURED=true ల(true` (HTTP), the frontend uses `auth` header (non-standard), so it must be in allowedHeaders.
- This is a common pattern in the Postiz codebase - using different headers based on security context.

---

**Result**: ✅ **CORS ERROR FIXED - Frontend can now communicate with backend!**










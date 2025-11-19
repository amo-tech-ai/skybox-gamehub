# Postiz Social Media Channels - Complete Troubleshooting Guide

**Date**: October 30, 2025  
**Issue**: "Invalid App ID sender" error  
**Status**: Comprehensive troubleshooting guide

Based on:
- [GitHub Issues](https://github.com/gitroomhq/postiz-app/issues refreshing)
- [Facebook Provider Docs](https://docs.postiz.com/providers/facebook)
- [Instagram Provider Docs](https://docs.postiz.com/providers/instagram)
- [LinkedIn Provider Docs](https://docs.postiz.com/providers/linkedin)

---

## 🔍 Common "Invalid App ID" Error Causes

### 1. ❌ Environment Variable Format Issues

**Problem**: Quotes, spaces, or special characters in `.env` file

**Solution**:
```bash
# ❌ WRONG
FACEBOOK_APP_ID=" 123456789 "  # Extra spaces
FACEBOOK_APP_ID='123456789'    # Single quotes (may cause issues)
FACEBOOK_APP_ID=123456789      # Missing quotes (can break if has special chars)

# ✅ CORRECT
FACEBOOK_APP_ID="123456789"    # Double quotes, no spaces
```

### 2. ❌ Environment Variables Not Loaded

**Problem**: Variables set but backend didn't reload

**Solution**:
```bash
# After changing .env, restart backend
cd /home/sk/skybox/postiz-app
pkill -9 -f "nest start.*backend"
pnpm --filter ./apps/backend run dev > /tmp/postiz-backend.log 2>&1 &
```

### 3. ❌ Wrong App ID Type

**Problem**: Using wrong ID (Client ID vs App ID, etc.)

**Solution**: Each provider uses different ID names:
- Facebook: `App ID` (not Client ID)
- Instagram: `Instagram App ID` (for standalone) or `App ID` (for Facebook Business)
- LinkedIn: `Client ID` (not App ID)

---

## 📋 Provider-Specific Setup & Troubleshooting

---

## 1. Facebook Setup & Troubleshooting

### Quick Setup Steps

1. **Create Meta App**
   - Go to [Meta for Developers](https://developers.facebook.com/)
   - Create Business Portfolio
   - Create new app → Select "Other" → "Business"

2. **Setup Login**
   - Add "Login with Facebook" product
   - Set OAuth Redirect URI:
     ```
     http://localhost:4200/integrations/social/facebook
     ```

3. **Get App ID & Secret**
   - Settings → Basic → Copy:
     - App ID
     - App Secret

4. **Add to .env**
   ```bash
   FACEBOOK_APP_ID="your-app-id-here"
   FACEBOOK_APP_SECRET="your-app-secret-here"
   ```

5. **Request Permissions**
   - Advanced Permissions → Request:
     - `pages_show_list`
     - `business_management`
     - `pages_manage_posts`
     - `pages_manage_engagement`
     - `pages_read_engagement`
     - `read_insights`

6. **Change to Live Mode**
   - App Mode → Switch from "Development" to "Live"

### Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| **Invalid App ID** | Wrong format in .env | Check quotes, no spaces: `FACEBOOK_APP_ID="123456789"` |
| **Invalid App ID** | Not restarted backend | Restart backend after changing .env |
| **Invalid App ID** | Using Client ID | Use App ID (Settings → Basic → App ID) |
| **OAuth Error** | Wrong redirect URI | Must be: `FRONTEND_URL/integrations/social/facebook` |
| **Permissions Denied** | Missing scopes | Request all required permissions (see step 5) |
| **Posts Not Visible** | App in Development | Switch to Live mode (step 6) |
| **Business Verification** | Public app needs verification | Verify business in Meta Business Manager |

### Verification Checklist

- [ ] App ID is numeric (Facebook App IDs are numbers)
- [ ] App Secret matches App ID
- [ ] Redirect URI matches exactly: `http://localhost:4200/integrations/social/facebook`
- [ ] App is in "Live" mode
- [ ] All required permissions requested and approved
- [ ] Backend restarted after adding variables
- [ ] No extra spaces or quotes in .env values

---

## 2. Instagram Setup & Troubleshooting

### Connection Options

**Option A: Facebook Business (Recommended)**
- Use same app as Facebook
- Instagram must be linked to Facebook Business page

**Option B: Instagram Standalone**
- Direct Instagram connection
- Requires Professional Instagram account

### Quick Setup Steps (Facebook Business)

1. **Use Same Meta App** (from Facebook setup above)

2. **Setup Instagram Login**
   - Add "Login with Instagram" product
   - Set OAuth Redirect URI:
     ```
     http://localhost:4200/integrations/social/instagram
     ```

3. **Request Permissions**
   - Advanced Permissions → Request:
     - `instagram_basic`
     - `pages_show_list`
     - `pages_read_engagement`
     - `business_management`
     - `instagram_content_publish`
     - `instagram_manage_comments`
     - `instagram_manage_insights`

4. **Add to .env** (same as Facebook)
   ```bash
   FACEBOOK_APP_ID="your-app-id-here"
   FACEBOOK_APP_SECRET="your-app-secret-here"
   ```

### Quick Setup Steps (Standalone)

1. **Create/Use Meta App**
   - Same Meta app or create new one

2. **Add Instagram Product**
   - Add "Instagram" product to app
   - Setup "Instagram Business Login"

3. **Set Redirect URI**
   ```
   http://localhost:4200/integrations/social/instagram-standalone
   ```

4. **Get Instagram App ID & Secret**
   - Instagram API setup screen
   - Copy Instagram App ID
   - Copy Instagram App Secret

5. **Add to .env**
   ```bash
   INSTAGRAM_APP_ID="your-instagram-app-id"
   INSTAGRAM_APP_SECRET="your-instagram-app-secret"
   ```

6. **Add Instagram Testers** (if needed)
   - App Roles → Add People → Instagram Tester
   - Add Instagram handles
   - Accept invitation in Instagram app

### Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| **Invalid App ID** | Wrong Instagram App ID | Use Instagram App ID from Instagram API setup (not Facebook App ID) |
| **Invalid App ID** | Format issue | Check .env format: `INSTAGRAM_APP_ID="123456789"` |
| **Connection Failed** | Instagram not linked | Link Instagram to Facebook Business page |
| **Permission Denied** | Missing scopes | Request all Instagram permissions |
| **Not Professional** | Personal account | Convert to Professional/Business account |
| **Tester Required** | Account not added | Add as Instagram Tester in App Roles |
| **OAuth Error** | Wrong redirect | Use correct URI: `/instagram` or `/instagram-standalone` |

### Verification Checklist

- [ ] Instagram account is Professional/Business
- [ ] Instagram linked to Facebook Business (if using Business option)
- [ ] Using correct App ID (Facebook vs Instagram)
- [ ] Redirect URI matches setup type
- [ ] All permissions requested
- [ ] Added as Instagram Tester (if needed)
- [ ] Backend restarted

---

## 3. LinkedIn Setup Review & Troubleshooting

### Quick Setup Steps

1. **Create LinkedIn App**
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
   - Create new app
   - Add app details

2. **Set OAuth Redirect URLs**
   - Auth tab → Redirect URLs
   - Add:
     ```
     http://localhost:4200/integrations/social/linkedin
     ```

3. **Request Permissions**
   - Products → Sign In with LinkedIn → Request:
     - `r_emailaddress`
     - `r_liteprofile`
     - `w_member_social` (for posting)

4. **Get Client ID & Secret**
   - Auth tab → Copy:
     - Client ID
     - Client Secret

5. **Add to .env**
   ```bash
   LINKEDIN_CLIENT_ID="your-client-id"
   LINKEDIN_CLIENT_SECRET="your-client-secret"
   ```

### Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| **Invalid App ID** | Using wrong field | Use **Client ID** (not App ID) |
| **Invalid App ID** | Format issue | Check .env: `LINKEDIN_CLIENT_ID="your-id"` |
| **OAuth Error** | Wrong redirect | Must be: `FRONTEND_URL/integrations/social/linkedin` |
| **Permission Denied** | Missing scopes | Request all required permissions |
| **App Not Approved** | Pending approval | Wait for LinkedIn app approval |

### Verification Checklist

- [ ] Using Client ID (not App ID)
- [ ] Redirect URL matches exactly
- [ ] All required permissions requested
- [ ] App approved by LinkedIn
- [ ] Backend restarted

---

## 🔧 Universal Troubleshooting Steps

### Step 1: Verify Environment Variables

```bash
# Check current .env values
cd /home/sk/skybox/postiz-app
cat .env | grep -E "FACEBOOK|INSTAGRAM|LINKEDIN" | grep -v "^#"

# Verify format (should have double quotes, no extra spaces)
# ✅ Good:
FACEBOOK_APP_ID="123456789"
# ❌ Bad:
FACEBOOK_APP_ID=" 123456789 "  # Extra spaces
FACEBOOK_APP_ID='123456789'    # Single quotes
FACEBOOK_APP_ID=123456789      # No quotes (risky)
```

### Step 2: Restart Backend

```bash
# Kill existing backend
pkill -9 -f "nest start.*backend"
sleep 2

# Start fresh
cd /home/sk/skybox/postiz-app
pnpm --filter ./apps/backend run dev > /tmp/postiz-backend.log 2>&1 &

# Wait 30 seconds for startup
sleep 30

# Verify backend loaded variables
tail -100 /tmp/postiz-backend.log | grep -i "facebook\|instagram\|linkedin" || echo "No provider mentions in logs"
```

### Step 3: Test API Connection

```bash
# Test Facebook App ID format (should be numeric)
curl -s "https://graph.facebook.com/your-app-id" | head -5

# Test LinkedIn (if public info available)
curl -s "https://www.linkedin.com/oauth/v2/authorization?client_id=your-client-id&redirect_uri=http://localhost:4200/integrations/social/linkedin&response_type=code" | head -5
```

### Step 4: Check Backend Logs

```bash
# Watch for provider-related errors
tail -f /tmp/postiz-backend.log | grep -i "app\|invalid\|error\|facebook\|instagram\|linkedin"
```

---

## 📝 Environment Variable Reference

### Facebook
```bash
FACEBOOK_APP_ID="your-facebook-app-id"
FACEBOOK_APP_SECRET="your-facebook-app-secret"
```

### Instagram (Business - uses Facebook)
```bash
FACEBOOK_APP_ID="same-as-facebook"
FACEBOOK_APP_SECRET="same-as-facebook"
```

### Instagram (Standalone)
```bash
INSTAGRAM_APP_ID="your-instagram-app-id"
INSTAGRAM_APP_SECRET="your-instagram-app-secret"
```

### LinkedIn
```bash
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"
```

---

## ✅ Quick Fix Checklist

When getting "Invalid App ID" error:

1. [ ] **Check .env format**: Double quotes, no spaces
2. [ ] **Verify variable name**: `FACEBOOK_APP_ID` vs `INSTAGRAM_APP_ID` vs `LINKEDIN_CLIENT_ID`
3. [ ] **Check value**: Correct ID type (App ID vs Client ID)
4. [ ] **Restart backend**: After any .env changes
5. [ ] **Verify in provider dashboard**: App exists and is active
6. [ ] **Check redirect URI**: Matches exactly in provider settings
7. [ ] **Request permissions**: All required scopes approved
8. [ ] **App mode**: Development vs Live (Facebook/Instagram)
9. [ ] **Test connection**: Try connecting in Postiz UI

---

## 🔗 Reference Links

- **GitHub Issues**: https://github.com/gitroomhq/postiz-app/issues
- **Facebook Setup**: https://docs.postiz.com/providers/facebook
- **Instagram Setup**: https://docs.postiz.com/providers/instagram
- **LinkedIn Setup**: https://docs.postiz.com/providers/linkedin
- **LinkedIn Page Setup**: https://docs.postiz.com/providers/linkedin-page

---

## 📋 Common Mistake Summary

| Provider | Common Mistake | Correct |
|----------|---------------|---------|
| **Facebook** | Using Client ID | Use **App ID** from Settings → Basic |
| **Instagram** | Using Facebook App ID for standalone | Use **Instagram App ID** from Instagram API setup |
| **LinkedIn** | Using App ID | Use **Client ID** from Auth tab |
| **All** | Extra spaces in .env | No spaces: `"123456789"` not `" 123456789 "` |
| **All** | Not restarting backend | Always restart after .env changes |

---

**Last Updated**: October 30, 2025  
**Status**: Comprehensive troubleshooting guide ready










# Postiz Social Media Channels - Simple Setup & Troubleshooting

**Issue**: "Invalid App ID" error  
**Based on**: [GitHub Issues](https://github.com/gitroomhq/postiz-app/issues), [Official Docs](https://docs.postiz.com/providers/848)

---

## 🔴 "Invalid App ID" - Quick Fixes

### Most Common Causes

1. **Wrong Format in .env** (90% of issues)
   ```bash
   # ❌ WRONG
   FACEBOOK_APP_ID=" 123456789 "  # Extra spaces
   FACEBOOK_APP_ID='123456789'    # Single quotes
   
   # ✅ CORRECT
   FACEBOOK_APP_ID="123456789"    # Double quotes, no spaces
   ```

2. **Backend Not Restarted**
   ```bash
   # After changing .env, ALWAYS restart:
   pkill -9 -f "nest start.*backend"
   cd /home/sk/skybox/postiz-app
   pnpm --filter ./apps/backend run dev > /tmp/postiz-backend.log 2>&1 &
   sleep 30  # Wait for startup
   ```

3. **Using Wrong ID Type**
   - Facebook: Use **App ID** (not Client ID)
   - Instagram: Use **Instagram App ID** (standalone) or **App ID** (Business)
   - LinkedIn: Use **Client ID** (not App ID)

---

## 📱 1. Facebook Setup (Simple Steps)

### Setup
1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create Business Portfolio → Create App → "Other" → "Business"
3. Add "Login with Facebook" product
4. Set Redirect URI: `http://localhost:4200/integrations/social/facebook`
5. Go to Settings → Basic → Copy:
   - **App ID**
   - **App Secret**
6. Add to `.env`:
   ```bash
   FACEBOOK_APP_ID="your-app-id"
   FACEBOOK_APP_SECRET="your-app-secret"
   ```
7. Request Permissions: `pages_show_list`, `business_management`, `pages_manage_posts`, `pages_manage_engagement`, `pages_read_engagement`, `read_insights`
8. Switch App Mode: Development → **Live**

### Troubleshooting

| Error | Fix |
|-------|-----|
| Invalid App ID | Check .env format: `"123456789"` (no spaces) |
| Invalid App ID | Restart backend after .env changes |
| Invalid App ID | Use App ID (Settings → Basic), not Client ID |
| OAuth Error | Redirect URI must be: `FRONTEND_URL/integrations/social/facebook` |
| Posts Not Visible | Switch App Mode to "Live" |
| Permission Denied | Request all required permissions |

**Docs**: https://docs.postiz.com/providers/facebook

---

## 📸 2. Instagram Setup (Simple Steps)

### Option A: Facebook Business (Recommended)

**Same app as Facebook** - Use existing Facebook App ID:

1. Add "Login with Instagram" to your Facebook app
2. Set Redirect URI: `http://localhost:4200/integrations/social/instagram`
3. Request Permissions: `instagram_basic`, `pages_show_list`, `pages_read_engagement`, `business_management`, `instagram_content_publish`, `instagram_manage_comments`, `instagram_manage_insights`
4. Use same `.env` variables:
   ```bash
   FACEBOOK_APP_ID="same-as-facebook"
   FACEBOOK_APP_SECRET="same-as-facebook"
   ```

### Option B: Instagram Standalone

1. Create/Use Meta app → Add "Instagram" product
2. Setup "Instagram Business Login"
3. Set Redirect URI: `http://localhost:4200/integrations/social/instagram-standalone`
4. Copy **Instagram App ID** and **Instagram App Secret** (from Instagram API setup)
5. Add to `.env`:
   ```bash
   INSTAGRAM_APP_ID="your-instagram-app-id"
   INSTAGRAM_APP_SECRET="your-instagram-app-secret"
   ```
6. If needed: Add Instagram Testers (App Roles → Instagram Tester)

### Troubleshooting

| Error | Fix |
|-------|-----|
| Invalid App ID | Use **Instagram App ID** for standalone (not Facebook App ID) |
| Invalid App ID | Check .env format, restart backend |
| Connection Failed | Link Instagram to Facebook Business page |
| Not Professional | Convert Instagram to Professional/Business account |
| Tester Required | Add as Instagram Tester in App Roles |

**Docs**: https://docs.postiz.com/providers/instagram

---

## 💼 3. LinkedIn Setup (Simple Steps)

### Regular LinkedIn

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Create new app
3. Set Redirect URLs: `http://localhost:4200/integrations/social/linkedin`
4. Request Permissions: `r_emailaddress`, `r_liteprofile`, `w_member_social`
5. Go to Auth tab → Copy:
   - **Client ID**
   - **Client Secret**
6. Add to `.env`:
   ```bash
   LINKEDIN_CLIENT_ID="your-client-id"
   LINKEDIN_CLIENT_SECRET="your-client-secret"
   ```

### LinkedIn Page

1. Same app as LinkedIn above
2. Add Products: "Share on LinkedIn", "Advertising API", "Sign In with LinkedIn using OpenID Connect"
3. Set Redirect URI: `http://localhost:4200/integrations/social/linkedin-page`
4. Complete verification process
5. Use same `.env`:
   ```bash
   LINKEDIN_CLIENT_ID="your-client-id"
   LINKEDIN_CLIENT_SECRET="your-client-secret"
   ```

### Troubleshooting

| Error | Fix |
|-------|-----|
| Invalid App ID | Use **Client ID** (not App ID) |
| Invalid App ID | Check .env format: `"your-id"` (no spaces) |
| OAuth Error | Redirect URL must match exactly |
| Permission Denied | Request all required permissions |
| App Not Approved | Wait for LinkedIn approval |

**Docs**: https://docs.postiz.com/providers/linkedin  
**LinkedIn Page**: https://docs.postiz.com/providers/linkedin-page

---

## 🔧 Universal Fix Checklist

When you get "Invalid App ID":

- [ ] **Check .env format**: `"123456789"` (double quotes, no spaces)
- [ ] **Verify variable name**: `FACEBOOK_APP_ID` vs `INSTAGRAM_APP_ID` vs `LINKEDIN_CLIENT_ID`
- [ ] **Check ID type**: App ID vs Client ID (see table below)
- [ ] **Restart backend**: After ANY .env change
- [ ] **Verify in provider dashboard**: App exists and active
- [ ] **Check redirect URI**: Matches exactly in provider settings
- [ ] **Test connection**: Try connecting in Postiz UI

---

## 📋 ID Type Reference Table

| Provider | Variable Name | What to Use | Where to Find |
|----------|---------------|-------------|---------------|
| **Facebook** | `FACEBOOK_APP_ID` | **App ID** | Meta App → Settings → Basic → App ID |
| **Instagram (Business)** | `FACEBOOK_APP_ID` | **App ID** | Same as Facebook |
| **Instagram (Standalone)** | `INSTAGRAM_APP_ID` | **Instagram App ID** | Meta App → Instagram API → Instagram App ID |
| **LinkedIn** | `LINKEDIN_CLIENT_ID` | **Client ID** | LinkedIn App → Auth tab → Client ID |

---

## ⚡ Quick Restart Script

```bash
#!/bin/bash
# Restart Postiz backend after .env changes

cd /home/sk/skybox/postiz-app

echo "🛑 Stopping backend..."
pkill -9 -f "nest start.*backend"
sleep 3

echo "🚀 Starting backend..."
pnpm --filter ./apps/backend run dev > /tmp/postiz-backend.log 2>&1 &

echo "⏳ Waiting for startup (30 seconds)..."
sleep 30

echo "✅ Backend restarted!"
echo "📋 Check logs: tail -f /tmp/postiz-backend.log"
```

---

## 🔍 Verify Your Setup

### Check .env Format
```bash
cd /home/sk/skybox/postiz-app
cat .env | grep -E "FACEBOOK|INSTAGRAM|LINKEDIN"
```

Should look like:
```bash
FACEBOOK_APP_ID="123456789"
FACEBOOK_APP_SECRET="abcdef123456"
LINKEDIN_CLIENT_ID="your-client-id"
LINKEDIN_CLIENT_SECRET="your-secret"
```

### Test Backend Loaded Variables
```bash
tail -f /tmp/postiz-backend.log | grep -i "facebook\|instagram\|linkedin\|error\|invalid"
```

### Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| `FACEBOOK_APP_ID=" 123456789 "` | `FACEBOOK_APP_ID="123456789"` |
| `FACEBOOK_APP_ID='123456789'` | `FACEBOOK_APP_ID="123456789"` |
| `FACEBOOK_APP_ID=123456789` | `FACEBOOK_APP_ID="123456789"` |
| Using Client ID for Facebook | Use App ID |
| Using App ID for LinkedIn | Use Client ID |

---

## 📚 Reference Links

- **Facebook**: https://docs.postiz.com/providers/facebook
- **Instagram**: https://docs.postiz.com/providers/instagram
- **LinkedIn**: https://docs.postiz.com/providers/linkedin
- **LinkedIn Page**: https://docs.postiz.com/providers/linkedin-page
- **GitHub Issues**: https://github.com/gitroomhq/postiz-app/issues

---

## ✅ Final Checklist

Before connecting any channel:

1. [ ] Created app in provider developer portal
2. [ ] Set correct redirect URI (matches Postiz `FRONTEND_URL`)
3. [ ] Requested all required permissions
4. [ ] Copied correct ID type (App ID vs Client ID)
5. [ ] Added to `.env` with correct format (double quotes, no spaces)
6. [ ] Restarted backend
7. [ ] Verified app is active/approved
8. [ ] Switched to Live mode (Facebook/Instagram)

---

**Created**: October 30, 2025  
**Status**: Ready to use troubleshooting guide










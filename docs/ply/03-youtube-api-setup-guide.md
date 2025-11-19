# YouTube Data API v3 - Setup Guide for Skybox

**Purpose**: Step-by-step guide to get YouTube API key and configure it for Skybox video integration.

**Reference**: [YouTube Data API Getting Started](https://developers.google.com/youtube/v3/getting-started)

---

## ✅ Quick Setup (5 Minutes)

### Step 1: Get YouTube API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with Google Account

2. **Create or Select Project**
   - Click "Select a project" → "New Project"
   - Name: "Skybox YouTube Integration"
   - Click "Create"

3. **Enable YouTube Data API v3**
   - Go to "APIs & Services" → "Library"
   - Search: "YouTube Data API v3"
   - Click "Enable"

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

### Step 2: Add to Skybox

**Add to `.env` file:**
```bash
VITE_YOUTUBE_API_KEY=your_api_key_here
```

**Verify:**
```bash
# Check it's set
grep VITE_YOUTUBE_API_KEY .env
```

### Step 3: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
# Then restart
npm run dev
```

### Step 4: Test

1. Navigate to: http://localhost:8080/videos
2. Should see NFL videos loading
3. Click a video to play it

---

## 📊 API Quota & Limits

### Free Tier Limits
- **Daily Quota**: 10,000 units/day
- **Search Request**: 100 units per request
- **~100 searches/day** on free tier

### Quota Costs (from official docs)
- **Read operations** (list videos): 1 unit
- **Search operations**: 100 units
- **Write operations** (upload, update): 50-1600 units

### Monitoring
- Check quota usage: Google Cloud Console → APIs & Services → Dashboard
- Set up alerts for 80% quota usage

---

## 🔧 API Request Example

**What We're Using:**
```typescript
// Fetch videos from NFL channel
GET https://www.googleapis.com/youtube/v3/search?
  part=snippet&
  channelId=UCDVYQ4Zhbm3S2dlz7P1GBDg&  // NFL channel
  maxResults=50&
  order=date&
  type=video&
  key=YOUR_API_KEY
```

**Response:**
```json
{
  "items": [
    {
      "id": { "videoId": "abc123" },
      "snippet": {
        "title": "Video Title",
        "thumbnails": { "medium": { "url": "..." } },
        "publishedAt": "2025-01-28T10:00:00Z"
      }
    }
  ]
}
```

---

## 🎯 Channel IDs Reference

**NFL Channel:**
- **URL**: https://www.youtube.com/@NFL
- **Channel ID**: `UCDVYQ4Zhbm3S2dlz7P1GBDg`
- **How to find**: Use YouTube Data API or check channel page source

**Other Sports Channels:**
- See `src/data/youtubeChannels.ts` for all channel IDs

---

## 🚨 Troubleshooting

### "API key not configured"
- **Fix**: Add `VITE_YOUTUBE_API_KEY` to `.env`
- **Restart**: Dev server after adding env var

### "403 Forbidden" or "Quota Exceeded"
- **Check**: Google Cloud Console → Quotas
- **Solution**: Wait for daily reset or request quota increase

### "Invalid API Key"
- **Verify**: Key is correct in `.env`
- **Check**: YouTube Data API v3 is enabled in project
- **Restart**: Dev server after changes

### No Videos Showing
- **Check**: Channel ID is correct
- **Verify**: Channel has public videos
- **Test**: API key works in browser:
  ```
  https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCDVYQ4Zhbm3S2dlz7P1GBDg&maxResults=1&key=YOUR_KEY
  ```

---

## 📚 Official Documentation

- [Getting Started Guide](https://developers.google.com/youtube/v3/getting-started)
- [Search API Reference](https://developers.google.com/youtube/v3/docs/search/list)
- [Quota Information](https://developers.google.com/youtube/v3/getting-started#quota)

---

## ✅ Verification Checklist

- [ ] API key created in Google Cloud Console
- [ ] YouTube Data API v3 enabled
- [ ] API key added to `.env` file
- [ ] Dev server restarted
- [ ] Can access `/videos` page
- [ ] Videos load from NFL channel
- [ ] Video playback works

---

**Status**: ✅ Ready to use  
**Next**: Add API key to `.env` and test!


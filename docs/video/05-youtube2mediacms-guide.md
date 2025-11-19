# YouTube to MediaCMS Migration Guide

> **Reading Time**: 5 minutes  
> **Audience**: Developers migrating YouTube content to MediaCMS  
> **Prerequisites**: Python 3.8+, MediaCMS instance running  
> **Last Updated**: January 2025

---

## 📋 Table of Contents

1. [What is youtube2mediacms?](#what-is-youtube2mediacms)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Configuration](#configuration)
5. [Usage Examples](#usage-examples)
6. [Troubleshooting](#troubleshooting)

---

## What is youtube2mediacms?

**youtube2mediacms** is a script that allows you to:
- **Back up YouTube videos** from your channel
- **Download videos** with metadata (title, description, thumbnails)
- **Upload to MediaCMS** automatically
- **Preserve organization** and metadata

**Perfect for Skybox**: Migrate event videos, promotional content, or game highlights from YouTube to self-hosted MediaCMS.

**Source**: [https://git.tuxxland.nl/tuxx/youtube2mediacms](https://git.tuxxland.nl/tuxx/youtube2mediacms)

---

## Installation

### Prerequisites

```bash
# Python 3.8+ required
python3 --version

# Install dependencies
pip3 install --user yt-dlp requests
```

### Clone Repository

```bash
# Clone the repository
git clone https://git.tuxxland.nl/tuxx/youtube2mediacms.git
cd youtube2mediacms

# Install required Python packages
pip install -r requirements.txt
# Or install manually:
pip install youtube-dl yt-dlp requests
```

---

## Quick Start

### Step 1: Install Dependencies

```bash
# Install required packages
pip install youtube-dl yt-dlp requests

# Or use requirements.txt if available
pip install -r requirements.txt
```

### Step 2: Configure

Create `config.json`:

```json
{
  "youtube_channel_url": "https://www.youtube.com/channel/YOUR_CHANNEL_ID",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "YOUR_API_KEY",
  "download_path": "./downloads",
  "upload_metadata": true
}
```

### Step 3: Run Migration

```bash
# Run the script
python youtube2mediacms.py
```

The script will:
1. Download videos from the specified YouTube channel
2. Extract metadata from each video
3. Upload videos and metadata to your MediaCMS instance

---

## Configuration

### Create Configuration File

Create `config.json` in the project directory:

```json
{
  "youtube_channel_url": "https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "your-api-key-here",
  "download_path": "/path/to/downloaded/videos",
  "upload_metadata": true
}
```

**Configuration Fields**:
- `youtube_channel_url`: Full YouTube channel URL or channel ID
- `mediacms_url`: Your MediaCMS instance URL
- `mediacms_api_key`: MediaCMS API key/token
- `download_path`: Directory to save downloaded videos
- `upload_metadata`: `true` to upload video metadata (title, description, etc.)

### Get MediaCMS API Key

1. Login to MediaCMS: `http://your-mediacms.com/admin/`
2. Go to: **Settings → API Tokens** or **Users → API Tokens**
3. Create new API token
4. Copy the token to `config.json`

### Get YouTube Channel URL

```bash
# Option 1: From YouTube channel page
# URL format: https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx

# Option 2: From channel handle
# URL format: https://www.youtube.com/@channelname

# Option 3: Get channel ID from handle
yt-dlp --flat-playlist --print "%(channel_id)s" "https://www.youtube.com/@channelname"
```

---

## Usage Examples

### Example 1: Basic Migration

```json
// config.json
{
  "youtube_channel_url": "https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxx",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "abc123xyz789",
  "download_path": "./downloads",
  "upload_metadata": true
}
```

```bash
python youtube2mediacms.py
```

### Example 2: Custom Download Path

```json
{
  "youtube_channel_url": "https://www.youtube.com/@skyboxgamehub",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "your-api-key",
  "download_path": "/media/youtube-backup",
  "upload_metadata": true
}
```

### Example 3: Channel Handle (Alternative)

```json
{
  "youtube_channel_url": "https://www.youtube.com/@skyboxgamehub",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "your-api-key",
  "download_path": "./downloads",
  "upload_metadata": true
}
```

**Note**: You can use either channel URL or channel handle (@channelname)

---

## Automated Migration Script

### Create Migration Script

```bash
# scripts/migrate-youtube-to-mediacms.sh
#!/bin/bash

# Configuration
CONFIG_FILE="./config.json"
BACKUP_DIR="./youtube-backup-$(date +%Y%m%d)"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Copy config and update download path
jq ".download_path = \"$BACKUP_DIR\"" "$CONFIG_FILE" > "$BACKUP_DIR/config.json"

# Run migration
cd youtube2mediacms
python youtube2mediacms.py --config "$BACKUP_DIR/config.json"

echo "Migration complete! Check $BACKUP_DIR for downloaded files."
```

Make executable:

```bash
chmod +x scripts/migrate-youtube-to-mediacms.sh
./scripts/migrate-youtube-to-mediacms.sh
```

### Python Script Alternative

```python
# scripts/migrate_youtube.py
import json
import subprocess
from pathlib import Path

# Configuration
config = {
    "youtube_channel_url": "https://www.youtube.com/channel/YOUR_CHANNEL_ID",
    "mediacms_url": "https://media.skybox.com",
    "mediacms_api_key": "YOUR_API_KEY",
    "download_path": "./downloads",
    "upload_metadata": True
}

# Save config
with open('config.json', 'w') as f:
    json.dump(config, f, indent=2)

# Run migration
subprocess.run(['python', 'youtube2mediacms.py'])
```

---

## Troubleshooting

### Issue 1: Authentication Failed

**Symptom**: `401 Unauthorized` or `Invalid API token`

**Solution**:
```bash
# Verify API token in MediaCMS
# Go to: Settings → API Tokens
# Ensure token is active and has correct permissions

# Test token manually
curl -H "Authorization: Token YOUR_TOKEN" \
  https://media.skybox.com/api/media/
```

### Issue 2: Video Download Fails

**Symptom**: `ERROR: Unable to download video`

**Solution**:
```bash
# Update yt-dlp
pip3 install --upgrade yt-dlp

# Test download manually
yt-dlp "https://www.youtube.com/watch?v=VIDEO_ID"

# Check if video is private/restricted
# Some videos may require authentication
```

### Issue 3: Upload to MediaCMS Fails

**Symptom**: `Failed to upload video`

**Solution**:
```bash
# Check MediaCMS is accessible
curl https://media.skybox.com/api/

# Verify file size limits
# Check MediaCMS upload limits in settings

# Check disk space on MediaCMS server
docker-compose exec web df -h
```

### Issue 4: Metadata Not Preserved

**Symptom**: Videos upload but missing title/description

**Solution**:
```bash
# Ensure yt-dlp is extracting metadata
yt-dlp --print "%(title)s" "VIDEO_URL"

# Check script version (update if needed)
git pull origin main
```

### Issue 5: Rate Limiting

**Symptom**: Too many requests, YouTube blocks downloads

**Solution**:
```bash
# Add delays between downloads
# Edit script to add: time.sleep(5)

# Use --limit to process in batches
python3 youtube2mediacms.py ... --limit 10

# Run migration during off-peak hours
```

---

## Best Practices

### 1. Test with Single Video First

```bash
# Always test with one video before migrating entire channel
python3 youtube2mediacms.py \
  --mediacms-url https://media.skybox.com \
  --api-token YOUR_TOKEN \
  --video-id TEST_VIDEO_ID
```

### 2. Backup Original Files

```bash
# Keep downloaded files for backup
--keep-files \
--output-dir ./youtube-backup-$(date +%Y%m%d)
```

### 3. Process in Batches

```bash
# Don't download entire channel at once
# Process in batches of 10-20 videos
--limit 10
```

### 4. Monitor MediaCMS Disk Space

```bash
# Check available space before migration
docker-compose exec web df -h /media
```

### 5. Verify Uploads

```bash
# Check uploaded videos in MediaCMS
# Visit: https://media.skybox.com/admin/media/
# Verify all videos uploaded correctly
```

---

## Workflow Example

### Complete Migration Workflow

```bash
#!/bin/bash
# Complete migration workflow for Skybox

set -e  # Exit on error

# Configuration
MEDIACMS_URL="https://media.skybox.com"
API_TOKEN=$(cat ~/.mediacms-token)  # Store token securely
CHANNEL_ID="UCxxxxxxxxxxxxxxxxxxxxx"

echo "Starting YouTube to MediaCMS migration..."

# Step 1: Test connection
echo "Testing MediaCMS connection..."
curl -H "Authorization: Token $API_TOKEN" \
  "$MEDIACMS_URL/api/media/" > /dev/null || exit 1

# Step 2: Download first 5 videos as test
echo "Testing with 5 videos..."
python3 youtube2mediacms.py \
  --mediacms-url "$MEDIACMS_URL" \
  --api-token "$API_TOKEN" \
  --channel-id "$CHANNEL_ID" \
  --limit 5 \
  --keep-files \
  --output-dir "./test-migration"

# Step 3: Verify test videos in MediaCMS
echo "Please verify test videos in MediaCMS dashboard"
read -p "Press Enter to continue with full migration..."

# Step 4: Full migration
echo "Starting full migration..."
python3 youtube2mediacms.py \
  --mediacms-url "$MEDIACMS_URL" \
  --api-token "$API_TOKEN" \
  --channel-id "$CHANNEL_ID" \
  --category 1 \
  --tags "events,skybox,youtube-migration" \
  --keep-files \
  --output-dir "./youtube-migration-$(date +%Y%m%d)"

echo "Migration complete!"
```

---

## Integration with Skybox

### After Migration: Update Skybox to Use MediaCMS

```typescript
// src/lib/mediacms.ts
// After migration, update Skybox to fetch from MediaCMS instead of YouTube

export async function getEventVideos(eventId: string) {
  // Fetch from MediaCMS instead of YouTube
  const response = await fetch(
    `https://media.skybox.com/api/media/?tags=event-${eventId}`,
    {
      headers: {
        'Authorization': `Token ${process.env.MEDIACMS_API_TOKEN}`
      }
    }
  );
  return response.json();
}
```

---

## Resources

- **Source Repository**: [https://git.tuxxland.nl/tuxx/youtube2mediacms](https://git.tuxxland.nl/tuxx/youtube2mediacms)
- **MediaCMS Setup**: See [03-mediacms-setup-guide.md](03-mediacms-setup-guide.md)
- **yt-dlp Docs**: [https://github.com/yt-dlp/yt-dlp](https://github.com/yt-dlp/yt-dlp)

---

## Quick Reference

### Setup

```bash
# Clone and install
git clone https://git.tuxxland.nl/tuxx/youtube2mediacms.git
cd youtube2mediacms
pip install -r requirements.txt
```

### Configuration (config.json)

```json
{
  "youtube_channel_url": "https://www.youtube.com/channel/YOUR_CHANNEL_ID",
  "mediacms_url": "https://media.skybox.com",
  "mediacms_api_key": "YOUR_API_KEY",
  "download_path": "./downloads",
  "upload_metadata": true
}
```

### Run

```bash
python youtube2mediacms.py
```

---

**Last Updated**: January 2025  
**Status**: ✅ Ready to Use


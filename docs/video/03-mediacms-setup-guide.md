# MediaCMS Setup Guide - Simple & Quick

> **Reading Time**: 10 minutes  
> **Audience**: Developers setting up MediaCMS for Skybox GameHub  
> **Prerequisites**: Docker/Docker Compose or Linux server access  
> **Last Updated**: January 2025

---

## 📋 Table of Contents

1. [What is MediaCMS?](#what-is-mediacms)
2. [Quick Start](#quick-start)
3. [Installation Options](#installation-options)
4. [Docker Compose Setup](#docker-compose-setup)
5. [Basic Configuration](#basic-configuration)
6. [Essential Commands](#essential-commands)
7. [Skybox Integration](#skybox-integration)
8. [Troubleshooting](#troubleshooting)

---

## What is MediaCMS?

MediaCMS is an open-source video and media CMS that allows you to:
- **Self-host your videos** (complete control over data)
- **Upload and manage** video, audio, images, PDFs
- **Automatic transcoding** to multiple resolutions
- **REST API** for integration
- **Role-based access control** (public, private, unlisted)
- **Automatic transcription** via Whisper
- **Playlists** and organization features

**Perfect for Skybox**: Self-host event videos, game highlights, promotional content without relying on YouTube/Vimeo.

---

## Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/mediacms-io/mediacms.git
cd mediacms

# Copy environment file
cp docker-compose.yml.example docker-compose.yml

# Start services
docker-compose up -d

# Access at http://localhost
```

**Default credentials**:
- Username: `admin`
- Password: `admin`

### Option 2: One-Click Deploy (Elestio)

[![Deploy on Elestio](https://elest.io/images/logos/deploy-to-elestio-btn.png)](https://elest.io/open-source/mediacms)

Click the button above to deploy MediaCMS on Elestio with automatic setup.

---

## Installation Options

### Docker Compose (Easiest)

**Best for**: Development, testing, small to medium deployments

**Requirements**:
- Docker
- Docker Compose
- 4GB RAM minimum
- 2-4 CPUs

**Pros**:
- ✅ Easy setup (5 minutes)
- ✅ All services configured
- ✅ Easy updates
- ✅ Portable

**Cons**:
- ⚠️ Requires Docker knowledge
- ⚠️ May need more resources

### Single Server Installation

**Best for**: Production, dedicated servers

**Requirements**:
- Ubuntu 20.04+ or Debian 11+
- 4GB RAM minimum
- 2-4 CPUs
- Root/sudo access

**Pros**:
- ✅ Better performance
- ✅ Full control
- ✅ Production-ready

**Cons**:
- ⚠️ More complex setup
- ⚠️ Manual maintenance

---

## Docker Compose Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/mediacms-io/mediacms.git
cd mediacms
```

### Step 2: Configure Environment

```bash
# Copy example file
cp docker-compose.yml.example docker-compose.yml

# Edit if needed (optional)
nano docker-compose.yml
```

**Key settings** (in `docker-compose.yml`):
```yaml
services:
  web:
    environment:
      - ALLOWED_HOSTS=localhost,127.0.0.1,your-domain.com
      - MEDIA_URL=/media/
      - STATIC_URL=/static/
      - SECRET_KEY=your-secret-key-here
```

### Step 3: Start Services

```bash
# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 4: Access MediaCMS

1. Open browser: `http://localhost`
2. Login with default credentials:
   - **Username**: `admin`
   - **Password**: `admin`
3. **Change password immediately** in Settings

### Step 5: Create Admin User (Optional)

```bash
# Create superuser
docker-compose exec web python manage.py createsuperuser

# Follow prompts
Username: admin
Email: admin@skybox.com
Password: [secure password]
```

---

## Basic Configuration

### Environment Variables

Edit `docker-compose.yml` or create `.env` file:

```bash
# Domain configuration
ALLOWED_HOSTS=localhost,127.0.0.1,skybox.mediacms.io

# Security
SECRET_KEY=your-random-secret-key-here

# Database (defaults work for most cases)
POSTGRES_DB=mediacms
POSTGRES_USER=mediacms
POSTGRES_PASSWORD=your-db-password

# Redis (defaults work)
REDIS_URL=redis://redis:6379/0

# Media storage
MEDIA_ROOT=/media
STATIC_ROOT=/static

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-password
```

### Initial Settings

After first login, configure:

1. **Site Settings** (`/admin/settings/`)
   - Site name: "Skybox GameHub Media"
   - Site description
   - Logo upload
   - Favicon

2. **User Registration**
   - Settings → Users → Registration
   - Choose: Open, Invite Only, or Closed

3. **Media Permissions**
   - Settings → Media → Permissions
   - Enable/disable: Downloads, Comments, Likes

4. **Transcoding**
   - Settings → Transcoding
   - Default profiles: 144p, 240p, 360p, 480p, 720p, 1080p

---

## Essential Commands

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f web
docker-compose logs -f worker

# Execute commands in container
docker-compose exec web python manage.py [command]

# Update MediaCMS
git pull
docker-compose build
docker-compose up -d

# Backup database
docker-compose exec db pg_dump -U mediacms mediacms > backup.sql

# Restore database
docker-compose exec -T db psql -U mediacms mediacms < backup.sql
```

### Django Management Commands

```bash
# Create superuser
docker-compose exec web python manage.py createsuperuser

# Collect static files
docker-compose exec web python manage.py collectstatic --noinput

# Run migrations
docker-compose exec web python manage.py migrate

# Create migrations
docker-compose exec web python manage.py makemigrations

# Django shell
docker-compose exec web python manage.py shell

# Check system status
docker-compose exec web python manage.py check
```

### System Maintenance

```bash
# Check disk space
docker system df

# Clean up unused images
docker system prune -a

# View container resource usage
docker stats

# Restart specific service
docker-compose restart web
docker-compose restart worker
```

---

## Skybox Integration

### API Integration

MediaCMS provides a REST API for integration:

```typescript
// src/lib/mediacms.ts
const MEDIACMS_API = 'https://media.skybox.com/api';

interface MediaItem {
  id: string;
  title: string;
  description: string;
  media_url: string;
  thumbnail_url: string;
  duration: number;
  views: number;
}

// Fetch public media
export async function getMediaItems(): Promise<MediaItem[]> {
  const response = await fetch(`${MEDIACMS_API}/media/`);
  const data = await response.json();
  return data.results;
}

// Get specific media
export async function getMediaItem(id: string): Promise<MediaItem> {
  const response = await fetch(`${MEDIACMS_API}/media/${id}/`);
  return response.json();
}

// Search media
export async function searchMedia(query: string): Promise<MediaItem[]> {
  const response = await fetch(`${MEDIACMS_API}/media/?search=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results;
}
```

### Video Player Component

```typescript
// src/components/MediaCMSPlayer.tsx
import { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

interface MediaCMSPlayerProps {
  mediaUrl: string;
  title: string;
  poster?: string;
}

export function MediaCMSPlayer({ mediaUrl, title, poster }: MediaCMSPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        title,
        controls: [
          'play-large',
          'play',
          'progress',
          'current-time',
          'mute',
          'volume',
          'settings',
          'fullscreen'
        ],
        settings: ['quality', 'speed', 'captions'],
        quality: {
          default: 1080,
          options: [4320, 2880, 2160, 1440, 1080, 720, 480, 360, 240]
        },
      });

      return () => {
        if (playerRef.current) {
          playerRef.current.destroy();
        }
      };
    }
  }, [mediaUrl, title]);

  return (
    <video
      ref={videoRef}
      playsInline
      data-poster={poster}
      className="w-full rounded-lg"
    >
      <source src={mediaUrl} type="video/mp4" />
      {/* HLS streaming support */}
      <source src={mediaUrl.replace('.mp4', '.m3u8')} type="application/x-mpegURL" />
    </video>
  );
}
```

### Usage Example

```typescript
// src/pages/EventDetail.tsx
import { useMediaItem } from '@/hooks/useMediaItem';
import { MediaCMSPlayer } from '@/components/MediaCMSPlayer';

export function EventDetail({ eventId }: { eventId: string }) {
  const { data: mediaItem } = useMediaItem(eventId);

  if (!mediaItem) return <LoadingSpinner />;

  return (
    <div>
      <h1>{mediaItem.title}</h1>
      <MediaCMSPlayer
        mediaUrl={mediaItem.media_url}
        title={mediaItem.title}
        poster={mediaItem.thumbnail_url}
      />
    </div>
  );
}
```

### Embedding Videos

MediaCMS provides embed codes for each video:

```typescript
// Get embed code for video
const embedCode = `<iframe 
  src="https://media.skybox.com/embed/${videoId}" 
  width="640" 
  height="360" 
  frameborder="0" 
  allowfullscreen>
</iframe>`;
```

---

## Troubleshooting

### Issue 1: Services Won't Start

**Symptom**: `docker-compose up` fails

**Solution**:
```bash
# Check if ports are in use
sudo lsof -i :8000
sudo lsof -i :5432

# Check Docker logs
docker-compose logs

# Rebuild containers
docker-compose build --no-cache
docker-compose up -d
```

### Issue 2: Can't Access MediaCMS

**Symptom**: `http://localhost` shows error or connection refused

**Solution**:
```bash
# Check if services are running
docker-compose ps

# Check web service logs
docker-compose logs web

# Restart web service
docker-compose restart web

# Check ALLOWED_HOSTS in docker-compose.yml
```

### Issue 3: Videos Not Transcoding

**Symptom**: Videos upload but don't process

**Solution**:
```bash
# Check worker service
docker-compose logs worker

# Restart worker
docker-compose restart worker

# Check Celery status
docker-compose exec web python manage.py shell
>>> from django_celery_results.models import TaskResult
>>> TaskResult.objects.all().order_by('-date_created')[:5]
```

### Issue 4: Out of Disk Space

**Symptom**: Transcoding fails, uploads fail

**Solution**:
```bash
# Check disk space
df -h

# Clean up old media (manual)
docker-compose exec web python manage.py shell
# Delete old unpublished media

# Expand disk or move media storage
```

### Issue 5: Slow Performance

**Symptom**: Videos load slowly, transcoding is slow

**Solution**:
```bash
# Check resource usage
docker stats

# Increase worker count (in docker-compose.yml)
worker:
  environment:
    - CELERY_WORKER_CONCURRENCY=4  # Increase from default

# Add more CPU/RAM to server
```

---

## Quick Reference

### Default URLs

- **Admin**: `http://localhost/admin/`
- **API**: `http://localhost/api/`
- **API Docs**: `http://localhost/api/docs/`
- **Media**: `http://localhost/media/`

### Default Credentials

- **Username**: `admin`
- **Password**: `admin` (change immediately!)

### Important Files

- `docker-compose.yml` - Main configuration
- `.env` - Environment variables (optional)
- `media/` - Uploaded media files
- `static/` - Static files (CSS, JS)

### Health Check

```bash
# Check all services
docker-compose ps

# Check API
curl http://localhost/api/

# Check media
curl http://localhost/media/
```

---

## Next Steps

1. **Change default password** - Security first!
2. **Configure domain** - Update ALLOWED_HOSTS
3. **Upload test video** - Verify transcoding works
4. **Set up API access** - Get API token for integration
5. **Configure backups** - Set up database backups
6. **Customize branding** - Upload logos, customize theme

---

## Resources

- **Official Docs**: [https://github.com/mediacms-io/mediacms](https://github.com/mediacms-io/mediacms)
- **Demo**: [https://demo.mediacms.io](https://demo.mediacms.io)
- **Admin Docs**: [https://github.com/mediacms-io/mediacms/blob/main/docs/admins_docs.md](https://github.com/mediacms-io/mediacms/blob/main/docs/admins_docs.md)
- **API Docs**: Available at `/api/docs/` after installation

---

## Hardware Requirements

### Minimum (Small Installation)
- **RAM**: 4GB
- **CPU**: 2-4 cores
- **Disk**: 100GB+ (depends on video volume)

### Recommended (Medium Installation)
- **RAM**: 8GB+
- **CPU**: 4-8 cores
- **Disk**: 500GB+ (1TB+ recommended)

### Disk Space Calculation
```
Daily uploads × 3 (original + encoded + HLS) × Days to keep = Total space needed

Example: 1GB/day × 3 × 365 days = ~1TB/year
```

---

**Last Updated**: January 2025  
**Version**: Latest (from GitHub)  
**Status**: ✅ Production Ready


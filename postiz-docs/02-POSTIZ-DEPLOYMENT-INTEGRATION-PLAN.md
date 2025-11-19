# Postiz Deployment & Integration Plan for Medellín AI

**Purpose**: Run Postiz locally for branding/tweaking, then host it for Medellín AI users to access inside the app.

**Last Updated**: October 30, 2025

---

## Overview

This document outlines **3 deployment paths** (from simplest to full control) for hosting Postiz and integrating it into Medellín AI:

1. **Elest.io** - Easiest, "done-for-you" production hosting
2. **Railway** - Fast PaaS with click-to-deploy
3. **Coolify on VM** - Full control, best long-term cost

All paths follow the same **local development → branding → build → deploy → integrate** workflow.

---

## Common Local Development Setup (All Paths)

### Prerequisites
- Node.js 18+ installed
- Docker & Docker Compose for local PostgreSQL/Redis
- Git for cloning repository

### Step 1: Clone & Setup Local Environment

```bash
# Clone Postiz repository
cd /home/sk/skybox
git clone https://github.com/gitroomhq/postiz-app.git
cd postiz-app

# Copy environment template
cp .env.example .env

# Generate secure JWT secret
openssl rand -base64 32
# Copy the output to .env as JWT_SECRET value
```

### Step 2: Configure Local Database & Redis

```bash
# Start PostgreSQL and Redis via Docker Compose (dev environment)
docker compose -f docker-compose.dev.yaml up -d

# Verify services are running
docker ps | grep -E "postiz-postgres|postiz-redis"
```

### Step 3: Update .env for Local Development

Edit `.env` with these **minimum required** settings:

```env
# === Required Settings
DATABASE_URL="postgresql://postiz-local:postiz-local-pwd@localhost:5432/postiz-db-local"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="<your-generated-secret-from-openssl>"

# === URLs (must match where you access Postiz)
FRONTEND_URL="http://localhost:4200"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
BACKEND_INTERNAL_URL="http://localhost:3000"

# === Storage (use local for dev)
STORAGE_PROVIDER="local"

# === Security (required for local HTTP development)
NOT_SECURED=true

# === Optional: Disable email activation (auto-activate users in dev)
# Leave RESEND_API_KEY commented out to auto-activate users
```

### Step 4: Install Dependencies & Setup Database

```bash
# Install dependencies
pnpm install

# Generate Prisma client and push database schema
pnpm run prisma-db-push
```

### Step 5: Start Development Server

```bash
# Start all services (frontend, backend, workers, cron, extension)
pnpm run dev
```

**Access**: Open `http://localhost:4200` in your browser.

---

## Branding & Customization

### Logo & Favicon

```bash
# Replace logo
/apps/frontend/public/logo.svg
/apps/frontend/public/favicon.ico

# Update manifest/app icons if needed
/apps/frontend/public/apple-touch-icon.png
/apps/frontend/public/android-chrome-*.png
```

### Colors & Styling

```bash
# Tailwind configuration
/apps/frontend/tailwind.config.js

# CSS variables/theme
/apps/frontend/src/styles/globals.css
```

**Recommended changes for Medellín AI branding**:
- Primary color: Update to match Deep Blue (#1e40af or your brand color)
- Secondary color: Update to match accent colors
- Logo: Replace with Medellín AI logo
- Favicon: Custom favicon

### Testing Branding Changes

```bash
# Development server hot-reloads automatically
# Check http://localhost:4200 after changes
```

---

## Deployment Options

---

## Option 1: Elest.io (Easiest Production Hosting)

**Best for**: Fast deployment with minimal DevOps overhead.

### Prerequisites
- Docker Hub or GitHub Container Registry account
- Elest.io account (free tier available)

### Step 1: Build Custom Image

```bash
cd /home/sk/skybox/postiz-app

# Build Docker image with your branding
docker build -t ghcr.io/medellinai/postiz:prod -f Dockerfile .

# Or use Docker Hub
docker build -t medellinai/postiz:prod -f Dockerfile .

# Push to registry
docker push ghcr.io/medellinai/postiz:prod
```

### Step 2: Deploy on Elest.io

1. Log into Elest.io dashboard
2. Click **"New Application"** → **"From Docker Image"**
3. Use the **Postiz 1-click template** (if available)
4. Update image to: `ghcr средств.io/medellinai/postiz:prod`

### Step 3: Configure Environment Variables

In Elest.io dashboard, add these environment variables:

```env
DATABASE_URL="postgresql://user:pass@postgres-host:5432/postiz"
REDIS_URL="redis://redis-host:6379"
JWT_SECRET="<production-secret-generated-with-openssl>"

FRONTEND_URL="https://social.medellin.ai"
NEXT_PUBLIC_BACKEND_URL="https://social.medellin.ai/api"
BACKEND_INTERNAL_URL="http://localhost:3000"

# Storage (use Cloudflare R2 or Supabase Storage for production)
STORAGE_PROVIDER="cloudflare"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_ACCESS_KEY="your-access-key"
CLOUDFLARE_SECRET_ACCESS_KEY="your-secret-key"
CLOUDFLARE_BUCKETNAME="postiz-media"
CLOUDFLARE_BUCKET_URL="https://your-bucket.r2.cloudflarestorage.com/"
CLOUDFLARE_REGION="auto"

# Email (optional but recommended)
EMAIL_PROVIDER="resend"
RESEND_API_KEY="re_your_api_key"

# Security (remove NOT_SECURED for production)
# NOT_SECURED should NOT be set (HTTPS required)
```

### Step 4: Add Database & Redis

- Use Elest.io's **managed PostgreSQL** addon
- Use Elest.io's **managed Redis** addon
- Update `DATABASE_URL` and `REDIS_URL` in environment variables

### Step 5: Domain & SSL

- Add custom domain: `social.medellin.ai`
- SSL certificate automatically provisioned by Elest.io

**Pros**: Fast setup, managed backups/SSL, reliable uptime  
**Cons**: Less control, may have resource limits

---

## Option 2: Railway (Fast PaaS)

**Best for**: Quick staging/production with easy CI/CD integration.

### Prerequisites
- Railway account (free tier available)
- GitHub repository (fork of Postiz with your branding)

### Step 1: Prepare Repository

```bash
# If not already done, create a fork or push your branded version
cd /home/sk/skybox/postiz-app

# Commit branding changes
git add .
git commit -m "Add Medellín AI branding"
git push origin main
```

### Step 2: Deploy on Railway

1. Go to [Railway Dashboard](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your Postiz repository
4. Railway auto-detects Dockerfile and starts building

### Step 3: Add Services

In Railway project:
1. Click **"+ New Ones"** → **"Database"** → **"Add PostgreSQL"**
2. Click **"+ New"** → **"Database"** → **"Add Redis"**
3. Railway automatically links services and provides connection URLs

### Step 4: Configure Environment Variables

Railway provides service URLs as environment variables. Add:

```env
# Railway auto-provides these, but verify:
DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}

# Required manual settings:
JWT_SECRET="<production-secret>"
FRONTEND_URL="https://social.medellin.ai"
NEXT_PUBLIC_BACKEND_URL="https://social.medellin.ai/api"
BACKEND_INTERNAL_URL="http://localhost:3000"

# Storage (Cloudflare R2 or Supabase)
STORAGE_PROVIDER="cloudflare"
CLOUDFLARE_ACCOUNT_ID="..."
CLOUDFLARE_ACCESS_KEY="..."
CLOUDFLARE_SECRET_ACCESS_KEY="..."
CLOUDFLARE_BUCKETNAME="postiz-media"
CLOUDFLARE_BUCKET_URL="https://..."
CLOUDFLARE_REGION="auto"

# Email
EMAIL_PROVIDER="resend"
RESEND_API_KEY="..."
```

### Step 5: Domain & SSL

1. In Railway project settings, click **"Settings"** → **"Networking"**
2. Generate domain: Railway provides `*.railway.app` domain
3. Add custom domain: `social.medellin.ai`
4. SSL automatically provisioned

**Pros**: Click-to-deploy, managed DB/Redis, easy CI/CD, GitHub integration  
**Cons**: Resource limits, costs scale with usage

---

## Option 3: Coolify on VM (Full Control)

**Best for**: Best long-term cost, full control, already have servers.

### Prerequisites
- VM with 2-4GB RAM (Hetzner, Contabo, DigitalOcean, etc.)
- Domain pointing to VM IP
- SSH access to VM

### Step 1: Install Coolify on VM

```bash
# SSH into your VM
ssh root@your-vm-ip

# Install Coolify (one-command install)
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

# Follow on-screen instructions to complete setup
# Access Coolify at: http://your-vm-ip:8000
```

### Step 2: Build & Push Custom Image

```bash
cd /home/sk/skybox/postiz-app

# Build image
docker build -t ghcr.io/medellinai/postiz:prod -f Dockerfile .

# Push to registry
docker push ghcr.io/medellinai/postiz:prod
```

### Step 3: Setup in Coolify

1. **Add PostgreSQL Service**:
   - In Coolify, click **"+ New Resource"** → **"Database"** → **"PostgreSQL"**
   - Configure: version (15+), storage, network
   - Note the connection string

2. **Add Redis Service**:
   - Click **"+ New Resource"** → **"Database"** → **"Redis"**
   - Note the connection URL

3. **Deploy Postiz Application**:
   - Click **"+ New Resource"** → **"Docker Compose"** or **"Docker Image"**
   - Image: `ghcr.io/medellinai/postiz:prod`
   - Add environment variables (same as Option 1, Step 3)
   - Link PostgreSQL and Redis services

### Step 4: Domain & SSL

1. In Coolify, go to your Postiz application
2. Click **"Domains"** → **"Add Domain"**
3. Enter: `social.medellin.ai`
4. Coolify automatically provisions SSL via Let's Encrypt

### Step 5: Storage (Optional)

For production media storage:
- Use **Cloudflare R2** (recommended, S3-compatible)
- Or **Supabase Storage** (if already using Supabase)
- Configure in environment variables

**Pros**: Full control, lowest cost at scale, own backups/monitoring  
**Cons**: You manage VM, backups, updates

---

## Integration into Medellín AI

### Phase 1: Simple Link/Embed (Start Here)

**In Medellín AI Frontend**:

```typescript
// Add to navigation menu or dashboard
const SocialSchedulerLink = () => {
  return (
    <a 
      href="https://social.medellin.ai" 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2"
    >
      <Icon name="calendar" />
      <span>Social Scheduler</span>
    </a>
  );
};
```

**Or embed in iframe** (if same domain or CORS configured):

```typescript
<iframe 
  src="https://social.medellin.ai" 
  className="w-full h-screen border-0"
  title="Postiz Social Scheduler"
/>
```

### Phase 2: CORS Configuration

**In Postiz `.env`** (production):

```env
# Add Medellín AI domains to allowed origins
# Check Postiz source code for CORS configuration
# Typically in backend/src/main.ts or similar
```

**Manual CORS fix** (if needed):
- Update Postiz backend CORS settings to allow `https://app.medellin.ai`
- Or use reverse proxy (Nginx/Caddy) to handle CORS

### Phase 3: Authentication (Later)

**Simple approach** (Phase 1):
- Users sign into Postiz separately
- Use same email as Medellín AI account

**Automated approach** (Phase 2):
- Use Postiz API (if available) to create accounts
- Auto-invite users via Postiz API endpoints

**SSO approach** (Phase 3):
- Implement JWT/OAuth proxy
- Share session between Medellín AI and Postiz
- Requires backend integration

---

## Production Environment Variables Reference

### Required

```env
DATABASE_URL="postgresql://user:pass@host:5432/postiz"
REDIS_URL="redis://host:6379"
JWT_SECRET="<secure-random-string>"
FRONTEND_URL="https://social.medellin.ai"
NEXT_PUBLIC_BACKEND_URL="https://social.medellin.ai/api"
BACKEND_INTERNAL_URL="http://localhost:3000"
```

### Storage (Choose One)

**Cloudflare R2**:
```env
STORAGE_PROVIDER="cloudflare"
CLOUDFLARE_ACCOUNT_ID="..."
CLOUDFLARE_ACCESS_KEY="..."
CLOUDFLARE_SECRET_ACCESS_KEY="..."
CLOUDFLARE_BUCKETNAME="postiz-media"
CLOUDFLARE_BUCKET_URL="https://...r2.cloudflarestorage.com/"
CLOUDFLARE_REGION="auto"
```

**Supabase Storage** (if using Supabase):
```env
STORAGE_PROVIDER="supabase"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_KEY="..."
SUPABASE_BUCKET="postiz-media"
```

**Local Storage** (not recommended for production):
```env
STORAGE_PROVIDER="local"
UPLOAD_DIRECTORY="/opt/postiz/uploads/"
NEXT_PUBLIC_UPLOAD_STATIC_DIRECTORY="/uploads/"
```

### Email (Optional)

```env
EMAIL_PROVIDER="resend"
RESEND_API_KEY="re_..."
EMAIL_FROM_ADDRESS="noreply@medellin.ai"
EMAIL_FROM_NAME="Medellín AI"
```

### Social Media API Keys (Optional)

Add as needed for integrations:
```env
X_API_KEY="..."
X_API_SECRET="..."
LINKEDIN_CLIENT_ID="..."
LINKEDIN_CLIENT_SECRET="..."
# ... other providers
```

---

## Quick Decision Guide

**Choose Option 1 (Elest.io) if**:
- ✅ Want it live this week
- ✅ Minimal DevOps experience
- ✅ Don't mind managed service costs

**Choose Option 2 (Railway) if**:
- ✅ Want easy CI/CD
- ✅ Already use Railway
- ✅ Need staging environments

**Choose Option 3 (Coolify) if**:
- ✅ Already have VM/server
- ✅ Want lowest long-term cost
- ✅ Need full control over infrastructure

---

## Troubleshooting

### Local Development Issues

**Port conflicts**:
```bash
# Stop conflicting services
docker stop <container-name>
# Or change ports in .env
```

**Database connection errors**:
```bash
# Verify Docker containers are running
docker ps | grep postgres
docker ps | grep redis

# Check database is accessible
docker exec -it postiz-postgres psql -U postiz-local -d postiz-db-local
```

**Frontend/Backend not connecting**:
- Verify `NEXT_PUBLIC_BACKEND_URL` matches actual backend URL
- Check browser console for CORS errors
- Ensure backend is running on correct port

### Production Deployment Issues

**SSL/HTTPS errors**:
- Verify domain DNS points to correct server
- Wait for SSL certificate provisioning (can take 5-10 minutes)
- Check reverse proxy configuration if using custom setup

**Storage uploads failing**:
- Verify Cloudflare R2 credentials
- Check bucket permissions
- Ensure `STORAGE_PROVIDER` matches actual provider

**Email not working**:
- Verify Resend API key is valid
- Check email service provider settings
- Test with `EMAIL_PROVIDER="nodemailer"` if Resend fails

---

## Next Steps After Deployment

1. ✅ Test user registration/login
2. ✅ Connect at least one social media account (test with Twitter/X)
3. ✅ Create and schedule a test post
4. ✅ Verify media uploads work
5. ✅ Test email notifications (if configured)
6. ✅ Add to Medellín AI navigation/menu
7. ✅ Monitor logs for errors
8. ✅ Setup backups (database + storage)
9. ✅ Configure monitoring/alerts

---

## References

- [Postiz Official Docs - Development Environment](https://docs.postiz.com/installation/development)
- [Postiz Official Docs - Developer Guide](https://docs.postiz.com/developer-guide)
- [Postiz GitHub Repository](https://github.com/gitroomhq/postiz-app)

---

**Document Status**: ✅ Complete  
**Maintained By**: Medellín AI Team  
**Related Docs**: 
- `01-POSTIZ-SETUP-AND-TROUBLESHOOTING.md`
- `POSTIZ-INSTALLATION-SUMMARY.md`
- `POSTIZ-PRODUCTION-INSTALL.md`


# Postiz Production Installation Guide

**System:** Ubuntu 24.04 LTS, Docker, Traefik, HTTPS (Let's Encrypt)  
**Source:** [GitHub Repository](https://github.com/gitroomhq/postiz-app)  
**Docs:** [Official Documentation](https://docs.postiz.com/installation/docker-compose)

---

## 📋 Task 1: Clone & Analyze Repository

### Step 1.1: Clone Repository

```bash
# Clone to production location
sudo mkdir -p /opt/postiz
sudo chown $USER:$USER /opt/postiz
git clone https://github.com/gitroomhq/postiz-app.git /opt/postiz
cd /opt/postiz
```

### Step 1.2: Analyze Required Services

Based on official docs and repository structure:

**Required Services:**
1. **postiz** (main app) - `ghcr.io/gitroomhq/postiz-app:latest`
2. **postiz-postgres** - PostgreSQL 17-alpine
3. **postiz-redis** - Redis 7.2

**Optional Services (dev only):**
- postiz-pg-admin (development only)
- postiz-redisinsight (development only)

---

## 🔧 Task 2: Environment Variables Analysis

### Required Variables

```bash
# === Core Configuration
MAIN_URL="https://postiz.your-domain.com"           # Public URL
FRONTEND_URL="https://postiz.your-domain.com"       # Frontend URL
NEXT_PUBLIC_BACKEND_URL="https://postiz.your-domain.com/api"  # Backend API URL
JWT_SECRET="<random-32+char-string>"                # Authentication secret
DATABASE_URL="postgresql://user:pass@host:5432/db"  # PostgreSQL connection
REDIS_URL="redis://host:6379"                       # Redis connection
BACKEND_INTERNAL_URL="http://localhost:3000"        # Internal backend URL
IS_GENERAL="true"                                    # General mode
DISABLE_REGISTRATION="false"                         # Enable/disable registration

# === Storage Configuration
STORAGE_PROVIDER="local"                            # or "r2" for Cloudflare R2
UPLOAD_DIRECTORY="/uploads"                         # Local upload directory
NEXT_PUBLIC_UPLOAD_DIRECTORY="/uploads"             # Public upload URL

# === Cloudflare R2 (optional)
CLOUDFLARE_ACCOUNT_ID=""
CLOUDFLARE_ACCESS_KEY=""
CLOUDFLARE_SECRET_ACCESS_KEY=""
CLOUDFLARE_BUCKETNAME=""
CLOUDFLARE_BUCKET_URL=""
CLOUDFLARE_REGION="auto"
```

### Social Media Provider Variables

All providers are optional. Add API keys as needed:

```bash
# X (Twitter)
X_API_KEY=""
X_API_SECRET=""

# LinkedIn
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""

# Reddit
REDDIT_CLIENT_ID=""
REDDIT_CLIENT_SECRET=""

# GitHub
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Threads
THREADS_APP_ID=""
THREADS_APP_SECRET=""

# Facebook
FACEBOOK_APP_ID=""
FACEBOOK_APP_SECRET=""

# YouTube
YOUTUBE_CLIENT_ID=""
YOUTUBE_CLIENT_SECRET=""

# TikTok
TIKTOK_CLIENT_ID=""
TIKTOK_CLIENT_SECRET=""

# Pinterest
PINTEREST_CLIENT_ID=""
PINTEREST_CLIENT_SECRET=""

# Discord
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
DISCORD_BOT_TOKEN_ID=""

# Slack
SLACK_ID=""
SLACK_SECRET=""
SLACK_SIGNING_SECRET=""

# Mastodon
MASTODON_URL="https://mastodon.social"
MASTODON_CLIENT_ID=""
MASTODON_CLIENT_SECRET=""

# Dribbble
DRIBBBLE_CLIENT_ID=""
DRIBBBLE_CLIENT_SECRET=""
```

### Optional Configuration

```bash
# OAuth/OIDC
POSTIZ_GENERIC_OAUTH="false"
POSTIZ_OAUTH_URL=""
POSTIZ_OAUTH_AUTH_URL=""
POSTIZ_OAUTH_TOKEN_URL=""
POSTIZ_OAUTH_USERINFO_URL=""
POSTIZ_OAUTH_CLIENT_ID=""
POSTIZ_OAUTH_CLIENT_SECRET=""

# AI Features
OPENAI_API_KEY=""

# API Limits
API_LIMIT="30"

# Stripe (if using payments)
STRIPE_PUBLISHABLE_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_SIGNING_KEY=""
FEE_AMOUNT="0.05"

# Short Link Services (optional)
DUB_TOKEN=""
DUB_API_ENDPOINT="https://api.dub.co"
DUB_SHORT_LINK_DOMAIN="dub.sh"
```

---

## 🔌 Task 3: Network Ports

### Exposed Ports

| Port | Service | Purpose | Public? |
|------|---------|---------|---------|
| **5000/tcp** | Postiz App | Main entry point | ✅ Yes (via Traefik) |
| 3000/tcp | Backend Basis | Internal API | ❌ No |
| 4200/tcp | Frontend | Internal UI | ❌ No |
| 5432/tcp | PostgreSQL | Database | ❌ No |
| 6379/tcp | Redis | Cache/Queue | ❌ No |

**Recommendation:** Only expose port 5000 through Traefik reverse proxy.

---

## 🚀 Task 4: Production Docker Compose Setup

### Complete docker-compose.yml for Production

```yaml
services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    environment:
      # === Required Core Settings
      MAIN_URL: "${MAIN_URL}"
      FRONTEND_URL: "${FRONTEND_URL}"
      NEXT_PUBLIC_BACKEND_URL: "${NEXT_PUBLIC_BACKEND_URL}"
      JWT_SECRET: "${JWT_SECRET}"
      DATABASE_URL: "${DATABASE_URL}"
      REDIS_URL: "${REDIS_URL}"
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      IS_GENERAL: "true"
      DISABLE_REGISTRATION: "${DISABLE_REGISTRATION:-false}"
      
      # === Storage
      STORAGE_PROVIDER: "${STORAGE_PROVIDER:-local}"
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"
      
      # === Cloudflare R2 (if using)
      CLOUDFLARE_ACCOUNT_ID: "${CLOUDFLARE_ACCOUNT_ID:-}"
      CLOUDFLARE_ACCESS_KEY: "${CLOUDFLARE_ACCESS_KEY:-}"
      CLOUDFLARE_SECRET_ACCESS_KEY: "${CLOUDFLARE_SECRET_ACCESS_KEY:-}"
      CLOUDFLARE_BUCKETNAME: "${CLOUDFLARE_BUCKETNAME:-}"
      CLOUDFLARE_BUCKET_URL: "${CLOUDFLARE_BUCKET_URL:-}"
      CLOUDFLARE_REGION: "${CLOUDFLARE_REGION:-auto}"
      
      # === Social Media Providers (add as needed)
      X_API_KEY: "${X_API_KEY:-}"
      X_API_SECRET: "${X_API_SECRET:-}"
      LINKEDIN_CLIENT_ID: "${LINKEDIN_CLIENT_ID:-}"
      LINKEDIN_CLIENT_SECRET: "${LINKEDIN_CLIENT_SECRET:-}"
      # ... add other providers as needed
      
      # === OAuth/OIDC
      POSTIZ_GENERAL_OAUTH: "${POSTIZ_GENERAL_OAUTH:-false}"
      POSTIZ_OAUTH_URL: "${POSTIZ_OAUTH_URL:-}"
      POSTIZ_OAUTH_AUTH_URL: "${POSTIZ_OAUTH_AUTH_URL:-}"
      POSTIZ_OAUTH_TOKEN_URL: "${POSTIZ_OAUTH_TOKEN_URL:-}"
      POSTIZ_OAUTH_USERINFO_URL: "${POSTIZ_OAUTH_USERINFO_URL:-}"
      POSTIZ_OAUTH_CLIENT_ID: "${POSTIZ_OAUTH_CLIENT_ID:-}"
      POSTIZ_OAUTH_CLIENT_SECRET: "${POSTIZ_OAUTH_CLIENT_SECRET:-}"
      
      # === AI Features
      OPENAI_API_KEY: "${OPENAI_API_KEY:-}"
      
      # === API Limits
      API_LIMIT: "${API_LIMIT:-30}"
      
      # === Payments (Stripe)
      STRIPE_PUBLISHABLE_KEY: "${STRIPE_PUBLISHABLE_KEY:-}"
      STRIPE_SECRET_KEY: "${STRIPE_SECRET_KEY:-}"
      FEE_AMOUNT: "${FEE_AMOUNT:-0.05}"
      
    volumes:
      - postiz-config:/config/
      - postiz-uploads:/uploads/
    ports:
      - "127.0.0.1:5000:5000"  # Only expose to localhost for Traefik
    networks:
      - postiz-network
      - traefik-network  # Connect to Traefik network
    labels:
      # Traefik labels for HTTPS/SSL
      - "traefik.enable=true"
      - "traefik.http.routers.postiz.rule=Host(`postiz.your-domain.com`)"
      - "traefik.http.routers.postiz.entrypoints=websecure"
      - "traefik.http.routers.postiz.tls.certresolver=letsencrypt"
      - "traefik.http.services.postiz.loadbalancer.server.port=5000"
    depends_on:
      postiz-postgres:
        condition: service_healthy
      postiz-redis:
        condition: service_healthy

  postiz-postgres:
    image: postgres:17-alpine
    container_name: postiz-postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_USER: "${POSTGRES_USER}"
      POSTGRES_DB: "${POSTGRES_DB}"
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    networks:
      - postiz-network
    healthcheck:
      test: pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}
      interval: 10s
      timeout: 3s
      retries: 3
    # Do not expose port publicly

  postiz-redis:
    image: redis:7.2
    container_name: postiz-redis
    restart: always
    healthcheck:
      test: redis-cli ping
      interval: 10s
      timeout: 3s
      retries: 3
    volumes:
      - postiz-redis-data:/data
    networks:
      - postiz-network
    # Do not expose port publicly

volumes:
  postgres-volume:
    external: false
  postiz-redis-data:
    external: false
  postiz-config:
    external: false
  postiz-uploads:
    external: false

networks:
  postiz-network:
    external: false
  traefik-network:
    external: true  # Create this network in Traefik setup
```

---

## 🔒 Task 5: Traefik Configuration

### Traefik Labels Summary

The Postiz container uses these Traefik labels:
- `traefik.enable=true` - Enable Traefik routing
- `traefik.http.routers.postiz.rule=Host(...)` - Domain routing
- `traefik.http.routers.postiz.entrypoints=websecure` - HTTPS entrypoint
- `traefik.http.routers.postiz.tls.certresolver=letsencrypt` - SSL certificate
- `traefik.http.services.postiz.loadbalancer.server.port=5000` - Backend port

---

## 📝 Task 6: Environment File Template

Create `/opt/postiz/.env` with all variables:

```bash
# Core Configuration
MAIN_URL=https://postiz.your-domain.com
FRONTEND_URL=https://postiz.your-domain.com
NEXT_PUBLIC_BACKEND_URL=https://postiz.your-domain.com/api
JWT_SECRET=$(openssl rand -base64 32 | tr -d "=+/" | cut -c1-32)

# Database
POSTGRES_USER=postiz-user
POSTGRES_PASSWORD=$(openssl rand -base64 24)
POSTGRES_DB=postiz-db
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postiz-postgres:5432/${POSTGRES_DB}

# Redis
REDIS_URL=redis://postiz-redis:6379

# Registration
DISABLE_REGISTRATION=false

# Storage (use 'r2' for Cloudflare R2)
STORAGE_PROVIDER=local

# Add social media API keys below as needed
# X_API_KEY=
# X_API_SECRET=
```

---

## ✅ Installation Checklist

- [ ] Clone repository to `/opt/postiz`
- [ ] Create `.env` file with all required variables
- [ ] Generate secure `JWT_SECRET` (32+ characters)
- [ ] Set strong PostgreSQL password
- [ ] Configure `MAIN_URL` with your domain
- [ ] Create Traefik network: `docker network create traefik-network`
- [ ] Ensure Traefik is configured for Let's Encrypt
- [ ] Update Traefik labels in docker-compose.yml with your domain
- [ ] Review and add social media API keys (optional)
- [ ] Run `docker compose up -d`
- [ ] Verify all services are healthy: `docker compose ps`
- [ ] Check logs: `docker compose logs -f postiz`
- [ ] Access https://postiz.your-domain.com

---

## 🧪 Verification Steps

```bash
# Check all services are running
docker compose ps

# Check Postiz logs
docker compose logs postiz

# Test database connection
docker compose exec postiz-postgres pg_isready -U postiz-user

# Test Redis connection
docker compose exec postiz-redis redis-cli ping

# Check Traefik routing
curl -I http://localhost:5000
# Should return HTTP headers from Postiz
```

---

## 📚 References

- [Official Docs](https://docs.postiz.com)
- [Docker Compose Guide](https://docs.postiz.com/installation/docker-compose)
- [Configuration Reference](https://docs.postiz.com/configuration/configuration-reference)
- [Traefik + Docker Compose](https://docs.postiz.com/reverse-proxies/traefik-plus-docker-compose)

---

**Next:** Run the installation script to set everything up automatically.


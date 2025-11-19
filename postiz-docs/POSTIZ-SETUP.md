# Postiz Setup Guide - Simple Installation

**Postiz** is an open-source social media scheduling and automation tool. This guide will get you up and running quickly.

**References:**
- [Official Docs](https://docs.postiz.com/quickstart)
- [Docker Compose Guide](https://docs.postiz.com/installation/docker-compose)
- [GitHub Repository](https://github.com/gitroomhq/postiz-app)

---

## 🚀 Quick Start (Docker Compose - Recommended)

### Prerequisites

- **Docker** installed
- **Docker Compose** installed
- **2GB RAM minimum** (tested on VM with 2GB RAM, 2 vCPUs)
- Port **5000** available (or change in docker-compose.yml)

---

## Step 1: Create Project Directory

```bash
mkdir postiz
cd postiz
```

---

## Step 2: Create `docker-compose.yml`

Create a file named `docker-compose.yml` with the following content:

```yaml
services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    environment:
      # === Required Settings
      MAIN_URL: "http://localhost:5000"
      FRONTEND_URL: "http://localhost:5000"
      NEXT_PUBLIC_BACKEND_URL: "http://localhost:5000/api"
      JWT_SECRET: "change-this-to-random-string-minimum-32-characters-long"
      DATABASE_URL: "postgresql://postiz-user:postiz-password@postiz-postgres:5432/postiz-db-local"
      REDIS_URL: "redis://postiz-redis:6379"
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      IS_GENERAL: "true"
      DISABLE_REGISTRATION: "false"
 
      # === Storage Settings
      STORAGE_PROVIDER: "local"
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"
 
      # === Social Media API Settings (Leave empty if not using)
      X_API_KEY: ""
      X_API_SECRET: ""
      LINKEDIN_CLIENT_ID: ""
      LINKEDIN_CLIENT_SECRET: ""
      REDDIT_CLIENT_ID: ""
      REDDIT_CLIENT_SECRET: ""
      GITHUB_CLIENT_ID: ""
      GITHUB_CLIENT_SECRET: ""
      THREADS_APP_ID: ""
      THREADS_APP_SECRET: ""
      FACEBOOK_APP_ID: ""
      FACEBOOK_APP_SECRET: ""
      YOUTUBE_CLIENT_ID: ""
      YOUTUBE_CLIENT_SECRET: ""
      TIKTOK_CLIENT_ID: ""
      TIKTOK_CLIENT_SECRET: ""
      PINTEREST_CLIENT_ID: ""
      PINTEREST_CLIENT_SECRET: ""
      DISCORD_CLIENT_ID: ""
      DISCORD_CLIENT_SECRET: ""
      SLACK_ID: ""
      SLACK_SECRET: ""
      MASTODON_URL: "https://mastodon.social"
      MASTODON_CLIENT_ID: ""
      MASTODON_CLIENT_SECRET: ""
 
      # === Misc Settings
      OPENAI_API_KEY: ""
      API_LIMIT: 30
 
    volumes:
      - postiz-config:/config/
      - postiz-uploads:/uploads/
    ports:
      - 5000:5000
    networks:
      - postiz-network
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
      POSTGRES_PASSWORD: postiz-password
      POSTGRES_USER: postiz-user
      POSTGRES_DB: postiz-db-local
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    networks:
      - postiz-network
    healthcheck:
      test: pg_isready -U postiz-user -d postiz-db-local
      interval: 10s
      timeout: 3s
      retries: 3
 
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
```

---

## Step 3: Configure Environment Variables

### For Local Development (HTTP)

If you're running locally without HTTPS, add this to your `docker-compose.yml` under `environment`:

```yaml
NOT_SECURED: "true"
```

⚠️ **Security Warning**: Only use this for development. For production, set up HTTPS with a reverse proxy.

### For Production (HTTPS)

1. Replace `http://localhost:5000` with your domain:
   ```yaml
   MAIN_URL: "https://postiz.your-domain.com"
   FRONTEND_URL: "https://postiz.your-domain.com"
   NEXT_PUBLIC_BACKEND_URL: "https://postiz.your-domain.com/api"
   ```

2. Set up a reverse proxy (Caddy, Nginx, or Traefik) - see [Reverse Proxy Docs](https://docs.postiz.com/reverse-proxies)

### Change JWT Secret

**IMPORTANT**: Change `JWT_SECRET` to a random string (minimum 32 characters):

```yaml
JWT_SECRET: "your-random-secret-string-here-make-it-long-and-random"
```

---

## Step 4: Start Postiz

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f postiz

# Check status
docker compose ps
```

---

## Step 5: Access Postiz

Open your browser and go to:

- **Local:** http://localhost:5000
- **Production:** https://postiz.your-domain.com

You should see the Postiz login page!

---

## Step 6: Create Your First User

1. Since `DISABLE_REGISTRATION: "false"`, you can register directly from the UI
2. Open http://localhost:5000
3. Click "Sign Up" or "Register"
4. Create your account

---

## 🔧 Common Configuration

### Update Configuration

**IMPORTANT**: After changing environment variables, you must restart:

```bash
docker compose down
docker compose up -d
```

### Add Social Media Providers

To connect social media accounts, add your API keys to `docker-compose.yml`:

```yaml
X_API_KEY: "your-x-api-key"
X_API_SECRET: "your-x-api-secret"
# ... etc
```

Then restart: `docker compose down && docker compose up -d`

### Change Port

To use a different port, change:

```yaml
ports:
  - 8080:5000  # Maps external port 8080 to internal port 5000
```

Then access at: http://localhost:8080

---

## 🛠️ Troubleshooting

### Check Logs

```bash
# All services
docker compose logs

# Specific service
docker compose logs postiz
docker compose logs postiz-postgres
docker compose logs postiz-redis
```

### Restart Services

```bash
# Restart all
docker compose restart

# Restart specific service
docker compose restart postiz
```

### Reset Everything

```bash
# Stop and remove containers
docker compose down

# Remove volumes (⚠️ deletes all data)
docker compose down -v

# Start fresh
docker compose up -d
```

### Port Already in Use

```bash
# Find what's using port 5000
lsof -i :5000

# Kill process or change port in docker-compose.yml
```

### Database Connection Issues

```bash
# Check PostgreSQL is healthy
docker compose ps postiz-postgres

# View PostgreSQL logs
docker compose logs postiz-postgres
```

---

## 📋 Required Ports

- **5000/tcp**: Main entry point (public)
- **3000/tcp**: Backend API (internal only)
- **4200/tcp**: Frontend (internal only)
- **5432/tcp**: PostgreSQL (internal only)
- **6379/tcp**: Redis (internal only)

**For external access, only expose port 5000.**

---

## 🔐 Security Notes

### Production Checklist

- [ ] Set up HTTPS/SSL certificate
- [ ] Change `JWT_SECRET` to strong random string
- [ ] Set `DISABLE_REGISTRATION: "true"` if using OAuth
- [ ] Use reverse proxy (Caddy/Nginx/Traefik)
- [ ] Set strong database passwords
- [ ] Don't expose internal ports (3000, 4200, 5432, 6379) publicly

### Local Development

- [ ] Use `NOT_SECURED: "true"` for HTTP-only setups
- [ ] Keep default passwords for local testing only

---

## 🎯 Next Steps

1. **Configure Providers**: Add API keys for social media platforms you want to use
2. **Set Up OAuth**: Configure OIDC/OAuth for authentication (optional)
3. **Set Up Storage**: Configure Cloudflare R2 or keep local storage
4. **Enable Features**: Configure OpenAI API for AI features (optional)

See [Configuration Reference](https://docs.postiz.com/configuration/configuration-reference) for all options.

---

## 📚 Additional Resources

- **Official Docs**: https://docs.postiz.com
- **GitHub**: https://github.com/gitroomhq/postiz-app
- **Reverse Proxy Setup**: https://docs.postiz.com/reverse-proxies
- **Provider Configuration**: https://docs.postiz.com/providers-configuration

---

## ✅ Verification

Your Postiz installation is working when:

1. ✅ `docker compose ps` shows all services as "Up"
2. ✅ You can access http://localhost:5000 in browser
3. ✅ You can register/login
4. ✅ No errors in `docker compose logs postiz`

---

**That's it!** Postiz should now be running. 🎉


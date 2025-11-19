# Postiz Localhost Quick Start

**Quick checklist to run Postiz on localhost for development/branding**

---

## Prerequisites Checklist

### ✅ Required Software

1. **Node.js 18+** (Current: v22.21.0 ✅)
   ```bash
   node --version
   # Should show v18.0.0 or higher
   ```

2. **pnpm Package Manager** (Current: 10.6.1 ✅)
   ```bash
   pnpm --version
   # Install if missing: npm install -g pnpm
   ```

3. **Docker & Docker Compose**
   ```bash
   docker --version
   docker compose version
   ```

### ✅ Required Services

1. **PostgreSQL** (Running on port 5432 ✅)
   ```bash
   docker ps | grep postiz-postgres
   ```

2. **Redis** (Running on port 6379 ✅)
   ```bash
   docker ps | grep postiz-redis
   ```

---

## Quick Start Steps

### 1. Start Database & Redis (if not running)

```bash
cd /home/sk/skybox/postiz-app
docker compose -f docker-compose.dev.yaml up -d
```

**Verify services are running:**
```bash
docker compose -f docker-compose.dev.yaml ps
```

**Expected output:**
- ✅ `postiz-postgres` - Up (port 5432)
- ✅ `postiz-redis` - Up (port 6379)
- ✅ `postiz-pg-admin` - Up (port 8081, optional)
- ✅ `postiz-redisinsight` - Up (port 5540, optional)

### 2. Verify Environment Configuration

```bash
cd /home/sk/skybox/postiz-app

# Check .env file exists
ls -la .env

# Key variables needed:
# - DATABASE_URL="postgresql://postiz-local:postiz-local-pwd@localhost:5432/postiz-db-local"
# - REDIS_URL="redis://localhost:6379"
# - JWT_SECRET="<any-long-random-string>"
# - FRONTEND_URL="http://localhost:4200"
# - NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
# - NOT_SECURED=true (for local HTTP development)
```

### 3. Install Dependencies (if not already done)

```bash
cd /home/sk/skybox/postiz-app
pnpm install
```

**Time**: ~2-5 minutes depending on internet speed

### 4. Setup Database Schema

```bash
cd /home/sk/skybox/postiz-app
pnpm run prisma-db-push
```

**Expected output:**
```
🚀  Your database is now in sync with your Prisma schema. Done in XXXms
✔ Generated Prisma Client
```

### 5. Start Development Server

```bash
cd /home/sk/skybox/postiz-app
pnpm run dev
```

**Expected services starting:**
- ✅ Frontend (Next.js) - Port 4200
- ✅ Backend (NestJS) - Port 3000
- ✅ Workers - Background tasks
- ✅ Cron - Scheduled jobs
- ✅ Extension - Browser extension build

**Access URLs:**
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **PgAdmin** (optional): http://localhost:8081
- **Redis Insight** (optional): http://localhost:5540

---

## Troubleshooting

### Port 3000 Already in Use

**Problem**: Backend can't start because port 3000 is taken.

**Solution**:
```bash
# Find what's using port 3000
lsof -i :3000

# Stop conflicting service (e.g., Twenty CRM)
cd /home/sk/skybox/twenty/packages/twenty-docker
docker compose stop server

# Or kill the process
kill -9 <PID>
```

### Database Connection Failed

**Problem**: `Can't reach database server at localhost:5432`

**Solution**:
```bash
# Verify PostgreSQL container is running
docker ps | grep postiz-postgres

# If not running, start it
docker compose -f docker-compose.dev.yaml up -d postiz-postgres

# Check database credentials match .env
# Should be: postiz-local / postiz-local-pwd
```

### Redis Connection Failed

**Problem**: Redis connection errors

**Solution**:
```bash
# Verify Redis container is running
docker ps | grep postiz-redis

# If not running, start it
docker compose -f docker-compose.dev.yaml up -d postiz-redis

# Test Redis connection
docker exec -it postiz-redis redis-cli ping
# Should return: PONG
```

### Frontend Can't Connect to Backend

**Problem**: Frontend shows connection errors, API calls fail

**Solution**:
1. Verify backend is running on port 3000
   ```bash
   curl http://localhost:3000
   ```

2. Check `.env` file has correct URLs:
   ```env
   FRONTEND_URL="http://localhost:4200"
   NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
   BACKEND_INTERNAL_URL="http://localhost:3000"
   ```

3. Restart dev server:
   ```bash
   # Stop (Ctrl+C) and restart
   pnpm run dev
   ```

### Prisma Client Not Generated

**Problem**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
cd /home/sk/skybox/postiz-app
pnpm run prisma-generate
```

### Dependencies Installation Fails

**Problem**: `pnpm install` errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# If still failing, check Node.js version (need 18+)
node --version
```

---

## Development Workflow

### Making Branding Changes

1. **Logo**:
   ```bash
   # Replace these files
   /apps/frontend/public/logo.svg
   /apps/frontend/public/favicon.ico
   ```

2. **Colors** (Tailwind):
   ```bash
   # Edit Tailwind config
   /apps/frontend/tailwind.config.js
   
   # Or global CSS
   /apps/frontend/src/styles/globals.css
   ```

3. **Hot Reload**: Changes auto-reload in browser (no restart needed)

### Stopping Services

```bash
# Stop dev server: Press Ctrl+C in terminal

# Stop Docker services
docker compose -f docker-compose.dev.yaml down

# Stop and remove volumes (⚠️ deletes data)
docker compose -f docker-compose.dev.yaml down -v
```

### Viewing Logs

```bash
# Development server logs (in terminal where pnpm run dev is running)

# Docker service logs
docker compose -f docker-compose.dev.yaml logs -f postiz-postgres
docker compose -f docker-compose.dev.yaml logs -f postiz-redis
```

---

## Quick Command Reference

```bash
# Navigate to project
cd /home/sk/skybox/postiz-app

# Start database/Redis
docker compose -f docker-compose.dev.yaml up -d

# Install dependencies
pnpm install

# Setup database
pnpm run prisma-db-push

# Start dev server
pnpm run dev

# Stop everything
docker compose -f docker-compose.dev.yaml down
# (Ctrl+C to stop dev server)
```


## Environment Variables Quick Reference

**Minimum `.env` for localhost:**

```env
# Database
DATABASE_URL="postgresql://postiz-local:postiz-local-pwd@localhost:5432/postiz-db-local"
REDIS_URL="redis://localhost:6379"

# Security
JWT_SECRET="any-long-random-string-minimum-32-characters"
NOT_SECURED=true

# URLs
FRONTEND_URL="http://localhost:4200"
NEXT_PUBLIC_BACKEND_URL="http://localhost:3000"
BACKEND_INTERNAL_URL="http://localhost:3000"

# Storage (local for dev)
STORAGE_PROVIDER="local"

# Optional: Disable email activation
# (Leave RESEND_API_KEY commented out to auto-activate users)
```

---

## Next Steps After Localhost Setup

1. ✅ Open http://localhost:4200 in browser
2. ✅ Create test account
3. ✅ Make branding changes (logo, colors)
4. ✅ Test social media connections (optional, needs API keys)
5. ✅ Build production image when ready: `docker build -t postiz:prod .`

---

**Related Docs:**
- `02-POSTIZ-DEPLOYMENT-INTEGRATION-PLAN.md` - Deployment options
- `01-POSTIZ-SETUP-AND-TROUBLESHOOTING.md` - Detailed troubleshooting

**Official Docs:** https://docs.postiz.com/installation/development


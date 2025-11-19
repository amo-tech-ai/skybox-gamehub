# Postiz Setup & Troubleshooting Guide

**Complete step-by-step guide to install, configure, and troubleshoot Postiz**

**Version:** 1.0  
**Last Updated:** October 30, 2025  
**Status:** ✅ Tested & Working

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Starting Postiz](#starting-postiz)
6. [Verification](#verification)
7. [First Steps](#first-steps)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Configuration](#advanced-configuration)
10. [Maintenance](#maintenance)

---

## Overview

**Postiz** is an open-source social media scheduling and automation platform.

**What This Guide Covers:**
- Complete installation process
- Configuration for local development
- Step-by-step verification
- Comprehensive troubleshooting
- Common issues and solutions

**What You'll Need:**
- Docker & Docker Compose
- 2GB RAM minimum
- Port 5001 (or your choice)

---

## Prerequisites

### System Requirements

- **OS:** Linux (Ubuntu 20.04+ recommended)
- **Docker:** Version 20.10+ 
- **Docker Compose:** Version 2.0+
- **RAM:** 2GB minimum
- **Disk:** 5GB free space

### Check Prerequisites

```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker compose version

# Check available resources
free -h
df -h
```

### Install Docker (if needed)

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker run hello-world
```

---

## Installation

### Step 1: Create Project Directory

```bash
# Create directory for Postiz
mkdir -p /opt/postiz
cd /opt/postiz
```

> **Note:** Using `/opt/postiz` keeps system files organized. You can use any directory.

### Step 2: Create Environment File

Create `.env` file with required configuration:

```bash
cat > .env << 'EOF'
# Postiz Local Development Configuration
# Generated: $(date)

# Core Configuration - LOCAL DEVELOPMENT
MAIN_URL=http://localhost:5001
FRONTEND_URL=http://localhost:5001
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001/api
JWT_SECRET=olFsZMMwCzpeDLH4b1dbnZap3G96WK8f

# Database
POSTGRES_USER=postiz-user
POSTGRES_PASSWORD=Nw9HlKiKpUe8bBPbnceUnAjsOpPgAbK
POSTGRES_DB=postiz-db
DATABASE_URL=postgresql://postiz-user:Nw9HlKiKpUe8bBPbnceUnAjsOpPgAbK@postiz-postgres:5432/postiz-db

# Redis
REDIS_URL=redis://postiz-redis:6379

# Backend
BACKEND_INTERNAL_URL=http://localhost:3000
IS_GENERAL=true
DISABLE_REGISTRATION=false
STORAGE_PROVIDER=local
UPLOAD_DIRECTORY=/uploads
NEXT_PUBLIC_UPLOAD_DIRECTORY=/uploads
API_LIMIT=30
EOF
```

### Step 3: Create Docker Compose File

Create `docker-compose.yml`:

```bash
cat > docker-compose.yml << 'EOF'
services:
  postiz:
    image: ghcr.io/gitroomhq/postiz-app:latest
    container_name: postiz
    restart: always
    env_file:
      - .env
    environment:
      MAIN_URL: ${MAIN_URL}
      FRONTEND_URL: ${FRONTEND_URL}
      NEXT_PUBLIC_BACKEND_URL: ${NEXT_PUBLIC_BACKEND_URL}
      JWT_SECRET: ${JWT_SECRET}
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      BACKEND_INTERNAL_URL: "http://localhost:3000"
      IS_GENERAL: "true"
      DISABLE_REGISTRATION: ${DISABLE_REGISTRATION:-false}
      STORAGE_PROVIDER: ${STORAGE_PROVIDER:-local}
      UPLOAD_DIRECTORY: "/uploads"
      NEXT_PUBLIC_UPLOAD_DIRECTORY: "/uploads"
      API_LIMIT: ${API_LIMIT:-30}
    volumes:
      - postiz-config:/config/
      - postiz-uploads:/uploads/
    ports:
      - "127.0.0.1:5001:5000"
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
    env_file:
      - .env
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    networks:
      - postiz-network
    healthcheck:
      test: pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}
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
EOF
```

### Step 4: Verify Files

```bash
# List created files
ls -la

# Should show:
# - .env
# - docker-compose.yml
```

---

## Configuration

### Basic Configuration (Already Set)

Your current setup uses these defaults:

| Setting | Value | Description |
|---------|-------|-------------|
| **Port** | 5001 | External access port |
| **Main URL** | http://localhost:5001 | Application URL |
| **Database** | postgres:17-alpine | PostgreSQL database |
| **Cache** | redis:7.2 | Redis cache/queue |
| **Storage** | local | Local file storage |
| **Registration** | enabled | User registration open |

### Changing Port

If port 5001 is already in use:

1. Edit `docker-compose.yml`:
   ```yaml
   ports:
     - "127.0.0.1:8080:5000"  # Change 8080 to your preferred port
   ```

2. Edit `.env`:
   ```bash
   MAIN_URL=http://localhost:8080
   FRONTEND_URL=http://localhost:8080
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8080/api
   ```

3. Restart services:
   ```bash
   docker compose down
   docker compose up -d
   ```

### Generating Secure Secrets

```bash
# Generate JWT Secret (32+ characters)
openssl rand -base64 32 | tr -d "=+/" | cut -c1-32

# Generate Database Password
openssl rand -base64 24

# Update .env with generated values, then restart
```

---

## Starting Postiz

### Initial Start

```bash
# Start all services in background
docker compose up -d

# Output should show:
# ✅ Container postiz-redis  Running
# ✅ Container postiz-postgres  Running  
# ✅ Container postiz  Running
```

### Check Status

```bash
# View running containers
docker compose ps

# Expected output:
# NAME               STATUS          PORTS
# postiz             Up             127.0.0.1:5001->5000/tcp
# postiz-postgres    Up (healthy)   5432/tcp
# postiz-redis       Up (healthy)   6379/tcp
```

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f postiz
docker compose logs -f postiz-postgres
docker compose logs -f postiz-redis

# Recent logs (last 100 lines)
docker compose logs --tail=100 postiz
```

---

## Verification

### Step 1: Check Container Status

```bash
docker ps --filter name=postiz

# All three containers should show:
# STATUS: Up
# STATUS: Up (healthy) for postgres and redis
```

### Step 2: Check Application Access

```bash
# Test localhost connection
curl -I http://localhost:5001

# Expected: HTTP/1.1 200 OK or 307 Redirect
```

### Step 3: Open in Browser

Open your browser to: **http://localhost:5001**

You should see:
- Postiz login/register page
- Logo and branding
- Sign up form

### Step 4: Verify Backend API

```bash
# Test API endpoint
curl http://localhost:5001/api

# Should return API response or redirect
```

---

## First Steps

### Create Your Account

1. **Open** http://localhost:5001 in browser
2. **Click** "Sign Up" or navigate to http://localhost:5001/auth/register
3. **Fill** the registration form:
   - Email address
   - Password
   - Company name
4. **Submit** and login

### Register Via Google (Optional)

- **Note:** Google OAuth may not work without backend configuration
- **Use email/password registration** for initial setup
- Configure Google OAuth later if needed (requires additional setup)

### Access Dashboard

After registration:
- You'll be logged in automatically
- Dashboard shows social media management interface
- Start connecting your social media accounts

---

## Troubleshooting

### Common Issues & Solutions

#### ❌ Issue: "Port 5001 already in use"

**Error:**
```
Error response from daemon: driver failed programming external connectivity
```

**Solution:**
```bash
# Find process using port 5001
sudo lsof -i :5001

# Kill the process or change port in docker-compose.yml
# See "Changing Port" section above
```

#### ❌ Issue: "Database connection failed"

**Symptoms:**
- Containers start but application shows errors
- Logs show: "Unable to connect to database"

**Solution:**
```bash
# Check PostgreSQL logs
docker compose logs postiz-postgres

# Check PostgreSQL is healthy
docker compose ps postiz-postgres

# Restart if needed
docker compose restart postiz-postgres

# If still failing, reset database
docker compose down -v
docker compose up -d
```

#### ❌ Issue: "Redis connection failed"

**Symptoms:**
- Cache/queue errors in logs

**Solution:**
```bash
# Check Redis logs
docker compose logs postiz-redis

# Test Redis connection
docker compose exec postiz-redis redis-cli ping
# Should return: PONG

# Restart if needed
docker compose restart postiz-redis
```

#### ❌ Issue: "502 Bad Gateway" in Browser

**Symptoms:**
- Browser shows error page
- curl returns 502

**Solution:**
```bash
# Check if containers are running
docker compose ps

# If postiz container is restarting, check logs
docker compose logs postiz --tail=100

# Restart services
docker compose restart

# If still failing, recreate
docker compose down
docker compose up -d
```

#### ❌ Issue: "Cannot access http://localhost:5001"

**Symptoms:**
- Browser shows "connection refused"
- curl: "Connection refused"

**Solution:**
```bash
# Verify containers are running
docker ps --filter name=postiz

# Check if port mapping is correct
docker compose ps

# Verify .env has correct MAIN_URL
cat .env | grep MAIN_URL

# Try different port binding (0.0.0.0 instead of 127.0.0.1)
# Edit docker-compose.yml:
ports:
  - "5001:5000"  # Remove 127.0.0.1:
```

#### ❌ Issue: "Google OAuth error: missing client_id"

**Symptoms:**
- Google sign-in button shows authorization error
- "Missing required parameter: client_id"

**Solution:**
```bash
# This is expected behavior - Google OAuth requires backend configuration
# Use email/password registration instead

# To configure Google OAuth:
# 1. Create Google OAuth credentials at console.cloud.google.com
# 2. Add credentials to backend configuration (not via .env)
# 3. Requires additional server-side setup
```

#### ❌ Issue: "Registration not working"

**Symptoms:**
- Registration form shows errors
- Cannot create account

**Solution:**
```bash
# Check DISABLE_REGISTRATION in .env
cat .env | grep DISABLE_REGISTRATION

# Should be: DISABLE_REGISTRATION=false

# If true, change to false and restart
docker compose restart postiz
```

#### ❌ Issue: "Container keeps restarting"

**Symptoms:**
- Container status shows "Restarting"
- Cannot reach application

**Solution:**
```bash
# View logs to identify error
docker compose logs postiz --tail=200

# Common causes:
# - Database connection issue
# - Invalid environment variable
# - Port conflict
# - Insufficient memory

# Check container status
docker inspect postiz | grep -A 10 "State"

# If out of memory:
free -h  # Check available memory
# Consider: Add more RAM or reduce other services
```

#### ❌ Issue: "Permission denied on volumes"

**Symptoms:**
- Errors about /uploads or /config permissions

**Solution:**
```bash
# Check volume permissions
docker compose exec postiz ls -la /uploads
docker compose exec postiz ls -la /config

# Fix if needed (run as root in container)
docker compose exec -u root postiz chown -R node:node /uploads /config

# Restart container
docker compose restart postiz
```

### Advanced Troubleshooting

#### Reset Everything

```bash
# Stop and remove all containers
docker compose down

# Remove volumes (⚠️ DELETES ALL DATA)
docker compose down -v

# Start fresh
docker compose up -d
```

#### Debug Mode

```bash
# Run container in foreground to see output
docker compose up

# Press Ctrl+C to stop
```

#### Health Checks

```bash
# Check all health statuses
docker compose ps

# Manual health check PostgreSQL
docker compose exec postiz-postgres pg_isready -U postiz-user -d postiz-db

# Manual health check Redis
docker compose exec postiz-redis redis-cli ping

# Manual test application
docker compose exec postiz curl localhost:5000
```

#### Network Debugging

```bash
# Check network connectivity between containers
docker compose exec postiz ping postiz-postgres
docker compose exec postiz ping postiz-redis

# Check DNS resolution
docker compose exec postiz nslookup postiz-postgres

# Inspect network
docker network inspect postiz_postiz-network
```

---

## Advanced Configuration

### Add Social Media Providers

Edit `docker-compose.yml` and add API keys:

```yaml
environment:
  # ... existing vars ...
  
  # X (Twitter)
  X_API_KEY: "your-x-api-key"
  X_API_SECRET: "your-x-secret"
  
  # LinkedIn
  LINKEDIN_CLIENT_ID: "your-linkedin-client-id"
  LINKEDIN_CLIENT_SECRET: "your-linkedin-secret"
  
  # Add other providers as needed
```

Then restart:
```bash
docker compose restart postiz
```

### Configure Cloudflare R2 Storage

Replace local storage with Cloudflare R2:

```yaml
environment:
  STORAGE_PROVIDER: "r2"
  CLOUDFLARE_ACCOUNT_ID: "your-account-id"
  CLOUDFLARE_ACCESS_KEY: "your-access-key"
  CLOUDFLARE_SECRET_ACCESS_KEY: "your-secret-key"
  CLOUDFLARE_BUCKETNAME: "your-bucket-name"
  CLOUDFLARE_BUCKET_URL: "https://your-bucket.r2.cloudflarestorage.com"
  CLOUDFLARE_REGION: "auto"
```

### Set Up Production Environment

1. **Change URLs to your domain:**
   ```bash
   MAIN_URL=https://postiz.your-domain.com
   FRONTEND_URL=https://postiz.your-domain.com
   NEXT_PUBLIC_BACKEND_URL=https://postiz.your-domain.com/api
   ```

2. **Add reverse proxy** (Nginx, Caddy, Traefik)

3. **Set up SSL certificate** (Let's Encrypt)

4. **Configure firewall** rules

5. **Set strong secrets:**
   ```bash
   JWT_SECRET=$(openssl rand -base64 48)
   POSTGRES_PASSWORD=$(openssl rand -base64 32)
   ```

### Enable AI Features

```yaml
environment:
  OPENAI_API_KEY: "sk-..."
```

---

## Maintenance

### Regular Tasks

#### Update Postiz

```bash
# Pull latest image
docker compose pull

# Recreate containers
docker compose up -d
```

#### Backup Database

```bash
# Backup PostgreSQL
docker compose exec postiz-postgres pg_dump -U postiz-user postiz-db > backup.sql

# Restore backup
docker compose exec -T postiz-postgres psql -U postiz-user postiz-db < backup.sql
```

#### View Resource Usage

```bash
# Container resource stats
docker stats postiz postiz-postgres postiz-redis

# Disk usage
docker system df
docker volume ls
```

#### Clean Up

```bash
# Remove unused images/containers
docker system prune

# Remove volumes (⚠️ DELETES DATA)
docker volume prune
```

### Monitoring

```bash
# View real-time logs
docker compose logs -f postiz

# Check container health
docker compose ps

# Monitor resource usage
docker stats --no-stream
```

---

## Quick Reference

### Essential Commands

```bash
# Start
docker compose up -d

# Stop
docker compose down

# Restart
docker compose restart

# View logs
docker compose logs -f postiz

# Check status
docker compose ps

# Access container shell
docker compose exec postiz sh

# Recreate (after config changes)
docker compose down && docker compose up -d
```

### Important Files

| File | Location | Purpose |
|------|----------|---------|
| `.env` | `/opt/postiz/.env` | Environment variables |
| `docker-compose.yml` | `/opt/postiz/docker-compose.yml` | Container configuration |
| Logs | `docker compose logs` | Application logs |

### Important URLs

| Service | URL | Port |
|---------|-----|------|
| **Application** | http://localhost:5001 | 5001 |
| **API** | http://localhost:5001/api | 5001 |
| **Database** | localhost:5432 | Internal only |
| **Redis** | localhost:6379 | Internal only |

---

## Verification Checklist

Your Postiz installation is working when:

- ✅ `docker compose ps` shows all 3 services as "Up"
- ✅ PostgreSQL and Redis show "(healthy)" status
- ✅ Browser loads http://localhost:5001 without errors
- ✅ Can see login/register page
- ✅ Can create account and login
- ✅ Dashboard loads after login
- ✅ No errors in logs: `docker compose logs postiz`

---

## Additional Resources

### Official Documentation

- **Main Docs:** https://docs.postiz.com
- **Docker Compose Guide:** https://docs.postiz.com/installation/docker-compose
- **Configuration Reference:** https://docs.postiz.com/configuration/configuration-reference
- **Providers Setup:** https://docs.postiz.com/providers-configuration
- **Reverse Proxy Setup:** https://docs.postiz.com/reverse-proxies

### Community & Support

- **GitHub Repository:** https://github.com/gitroomhq/postiz-app
- **Issues:** https://github.com/gitroomhq/postiz-app/issues
- **Discussions:** https://github.com/gitroomhq/postiz-app/discussions

### Related Guides

- See `POSTIZ-QUICK-REFERENCE.md` for quick commands
- See `POSTIZ-PRODUCTION-INSTALL.md` for production setup
- See `POSTIZ-INSTALLATION-SUMMARY.md` for technical details

---

## Summary

**What You've Accomplished:**

✅ Installed Postiz with Docker Compose  
✅ Configured PostgreSQL and Redis  
✅ Set up local development environment  
✅ Started all services successfully  
✅ Accessed application in browser  
✅ Created user account  
✅ Verified all functionality  

**Next Steps:**

1. **Connect Social Media Accounts** - Add API keys in docker-compose.yml
2. **Configure Scheduling** - Set up your first posts
3. **Explore Features** - Try analytics, automation, etc.
4. **Set Up Production** - Migrate to production when ready

---

**Status:** ✅ Installation Complete & Verified Working

**Last Tested:** October 30, 2025  
**Working Configuration:** Local development, port 5001, all services healthy

For issues not covered here, check the troubleshooting section or refer to official documentation.


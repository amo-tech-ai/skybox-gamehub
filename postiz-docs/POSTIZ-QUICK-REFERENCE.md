# Postiz Quick Reference

## 🚀 One-Line Setup

```bash
# Automatic setup (recommended)
./setup-postiz.sh

# Manual setup
mkdir postiz && cd postiz
# Copy docker-compose.yml from POSTIZ-SETUP.md
docker compose up -d
```

## 📋 Essential Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f postiz

# Restart after config changes
docker compose down && docker compose up -d

# Check status
docker compose ps
```

## 🌐 Access URLs

- **Local:** http://localhost:5000
- **Production:** https://postiz.your-domain.com

## 🔧 Key Configuration

### Environment Variables

**Required:**
- `MAIN_URL`: Your domain (http://localhost:5000 for local)
- `JWT_SECRET`: Random 32+ character string
- `DATABASE_URL`: Auto-configured in docker-compose.yml

**For Local Development:**
```yaml
NOT_SECURED: "true"  # Allows HTTP-only
```

**For Production:**
```yaml
MAIN_URL: "https://postiz.your-domain.com"
FRONTEND_URL: "https://postiz.your-domain.com"
NEXT_PUBLIC_BACKEND_URL: "https://postiz.your-domain.com/api"
# Remove NOT_SECURED or set to "false"
```

## 🔑 Social Media Provider Setup

Add API keys to `docker-compose.yml`:
```yaml
X_API_KEY: "your-key"
X_API_SECRET: "your-secret"
# ... etc
```

Then restart: `docker compose down && docker compose up -d`

## 🐛 Troubleshooting

```bash
# Check logs
docker compose logs postiz

# Restart everything
docker compose restart

# Reset (⚠️ deletes data)
docker compose down -v
docker compose up -d
```

## 📚 Full Documentation

See `POSTIZ-SETUP.md` for complete guide.

**Official Docs:** https://docs.postiz.com


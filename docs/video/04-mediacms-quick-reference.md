# MediaCMS Quick Reference

> **Quick lookup for MediaCMS commands and configuration**

---

## 🚀 Quick Start

```bash
# Clone and start
git clone https://github.com/mediacms-io/mediacms.git
cd mediacms
cp docker-compose.yml.example docker-compose.yml
docker-compose up -d

# Access: http://localhost
# Default: admin / admin
```

---

## 🐳 Docker Commands

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# Logs
docker-compose logs -f
docker-compose logs -f web
docker-compose logs -f worker

# Update
git pull
docker-compose build
docker-compose up -d
```

---

## 🔧 Management Commands

```bash
# Create superuser
docker-compose exec web python manage.py createsuperuser

# Migrations
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py makemigrations

# Static files
docker-compose exec web python manage.py collectstatic --noinput

# Django shell
docker-compose exec web python manage.py shell

# System check
docker-compose exec web python manage.py check
```

---

## 📦 Backup & Restore

```bash
# Backup database
docker-compose exec db pg_dump -U mediacms mediacms > backup.sql

# Restore database
docker-compose exec -T db psql -U mediacms mediacms < backup.sql
```

---

## 🌐 URLs

- **Admin**: `http://localhost/admin/`
- **API**: `http://localhost/api/`
- **API Docs**: `http://localhost/api/docs/`
- **Media**: `http://localhost/media/`

---

## ⚙️ Key Config (docker-compose.yml)

```yaml
environment:
  - ALLOWED_HOSTS=localhost,your-domain.com
  - SECRET_KEY=your-secret-key
  - EMAIL_HOST=smtp.gmail.com
  - EMAIL_PORT=587
```

---

## 🔌 API Integration

```typescript
// Fetch media
const response = await fetch('https://media.skybox.com/api/media/');
const data = await response.json();

// Get specific media
const media = await fetch(`https://media.skybox.com/api/media/${id}/`);

// Search
const results = await fetch(`https://media.skybox.com/api/media/?search=${query}`);
```

---

## 🎥 Video Player Integration

```typescript
// Use Plyr with MediaCMS HLS streams
<video>
  <source src={mediaUrl} type="video/mp4" />
  <source src={mediaUrl.replace('.mp4', '.m3u8')} type="application/x-mpegURL" />
</video>
```

---

## ⚠️ Common Issues

**Services won't start**: Check ports, rebuild containers  
**Can't access**: Check ALLOWED_HOSTS, restart web service  
**Videos not transcoding**: Check worker logs, restart worker  
**Out of space**: Check disk, clean old media  
**Slow performance**: Increase CPU/RAM, check worker count  

---

## 📊 Resource Usage

```bash
# Check containers
docker stats

# Check disk
df -h

# Check logs
docker-compose logs -f
```

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Set strong SECRET_KEY
- [ ] Configure ALLOWED_HOSTS
- [ ] Enable HTTPS (production)
- [ ] Set up regular backups
- [ ] Configure firewall rules

---

## 📚 Full Documentation

See [03-mediacms-setup-guide.md](03-mediacms-setup-guide.md) for complete guide.

---

**Quick Reference v1.0** | **Last Updated**: January 2025


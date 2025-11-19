# Twenty CRM - Port Changed to 8080

**Date**: October 30, 2025, 10:45 PM  
**Issue**: Port conflict with Postiz (both wanted port 3000)  
**Solution**: Changed Twenty CRM to use port 8080

---

## 🔧 Change Made

**File**: `/home/sk/twenty-installation/twenty/packages/twenty-docker/docker-compose.yml`

**Before**:
```yaml
ports:
  - "3000:3000"  # Conflicted with Postiz
```

**After**:
```yaml
ports:
  - "8080:3000"  # External port 8080, internal port 3000
```

---

## ✅ Result

**Both applications can now run simultaneously:**

| Application | Port | Status |
|-------------|------|--------|
| **Twenty CRM** | 8080 | ✅ Running |
| **Postiz Backend** | 3000-brand | ✅ Running |
| **Postiz Frontend** | 4200 | ✅ Running |

---

## 🚀 Access URLs

- **Twenty CRM**: http://localhost:8080
- **Postiz Frontend**: http://localhost:4200
- **Postiz Backend**: http://localhost:3000

---

## 📋 Service Management

### Start Twenty CRM
```bash
cd /home/sk/twenty-installation/twenty/packages/twenty-docker
docker compose up -d
```

### Stop Twenty CRM
```bash
cd /home/sk/twenty-installation/twenty/packages/twenty-docker
docker compose down
```

### Check Status
```bash
docker compose ps
```

---

## ⚠️ Note

The `.env` file should have:
```
SERVER_URL=http://localhost:8080
```

This matches the new port configuration.

---

**Status**: ✅ **Both applications running without conflicts**










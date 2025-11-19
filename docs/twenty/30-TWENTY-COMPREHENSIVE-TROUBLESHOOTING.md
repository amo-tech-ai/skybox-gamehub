# Twenty CRM - Comprehensive Troubleshooting Guide

**Date**: October 31, 2025  
**Based on**: [GitHub Issues](https://github.com/twentyhq/twenty/issues)  
**Status**: Complete troubleshooting reference

---

## 🔍 Common Issues & Solutions

---

## 1. CORS Errors / Connection Issues

### Symptoms
```
Access to fetch at 'http://localhost:3000/...' from origin 'http://localhost:8080' 
has been blocked by CORS policy
Failed to fetch
ApolloError: Failed to fetch
```

### Root Causes & Solutions

#### Issue 1.1: Wrong SERVER_URL Configuration
**Problem**: Frontend trying to connect to wrong backend URL

**Solution**:
1. Check `.env` file:
   ```bash
   cd /home/sk/twenty-installation/twenty/packages/twenty-docker
   cat .env | grep SERVER_URL
   ```

2. Ensure `SERVER_URL` matches your external port:
   ```bash
   # If running on port 8080:
   SERVER_URL=http://localhost:8080
   
   # If running on port 3000:
   SERVER_URL=http://localhost:3000
   ```

3. Restart containers:
   ```bash
   docker compose down
   docker compose up -d
   ```

#### Issue 1.2: Port Mismatch Between Frontend and Backend
**Problem**: Frontend on one port, backend on another

**Solution**:
1. Verify port mapping in `docker-compose.yml`:
   ```yaml
   ports:
     - "8080:3000"  # External:Internal
   ```

2. Ensure `SERVER_URL` uses the external port:
   ```bash
   SERVER_URL=http://localhost:8080  # Matches external port
   ```

3. Restart containers after changes

---

## 2. Port Conflicts

### Symptoms
```
Error: listen EADDRINUSE: address already in use :::3000
ports are not available: exposing port TCP 0.0.0.0:3000
```

### Solutions

#### Issue 2.1: Port Already in Use
**Solution**:
1. Check what's using the port:
   ```bash
   lsof -i :3000
   # Or
   docker ps | grep 3000
   ```

2. Stop conflicting service:
   ```bash
   # If another Docker container:
   docker ps | grep 3000
   docker stop <container-id>
   
   # If Node.js process:
   lsof -ti :3000 | xargs kill -9
   ```

3. Change Twenty CRM port:
   ```yaml
   # docker-compose.yml
   ports:
     - "8080:3000"  # Use different external port
   ```
   ```bash
   # Update .env
   SERVER_URL=http://localhost:8080
   ```

---

## 3. Database Connection Issues

### Symptoms
```
Query read timeout
Cannot connect to database
Database connection failed
```

### Solutions

#### Issue 3.1: Database Not Ready
**Solution**:
1. Check database container:
   ```bash
   docker compose ps db
   docker compose logs db
   ```

2. Wait for health check:
   ```bash
   docker compose up -d
   # Wait 30-60 seconds for database to initialize
   ```

3. Verify database connection:
   ```bash
   docker exec twenty-db-1 pg_isready -U postgres
   ```

#### Issue 3.2: Wrong Database Credentials
**Solution**:
1. Check `.env` database settings:
   ```bash
   PG_DATABASE_USER=postgres
   PG_DATABASE_PASSWORD=your-passwordWO
   PG_DATABASE_HOST=db
   PG_DATABASE_PORT=5432
   ```

2. Verify connection string format:
   ```bash
   PG_DATABASE_URL=postgres://user:password@db:5432/default
   ```

3. Restart containers after credential changes

---

## 4. Environment Variable Issues

### Symptoms
```
Configuration issues found
Environment variable not set
Missing required configuration
```

### Solutions

#### Issue 4.1: Missing Required Variables
**Required Variables**:
```bash
SERVER_URL=http://localhost:8080
APP_SECRET=your-random-secret-here
STORAGE_TYPE=local
PG_DATABASE_USER=postgres猛烈
PG_DATABASE_PASSWORD=your-password
```

**Solution**:
1. Check `.env` file exists:
   ```bash
   ls -la /home/sk/twenty-installation/twenty/packages/twenty-docker/.env
   ```

2. Copy from example if missing:
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. Generate APP_SECRET if missing:
   ```bash
   # Generate random secret
   openssl rand -base64 32
   ```

#### Issue 4.2: Variables Not Loading
**Solution**:
1. Ensure `.env` is in correct location:
   ```bash
   # Should be in same directory as docker-compose.yml
   /home/sk/twenty-installation/twenty/packages/twenty-docker/.env
   ```

2. Restart containers after changes:
   ```bash
   docker compose down
   docker compose up -d
   ```

3. Verify variables loaded:
   ```bash
   docker exec twenty-server-1 env | grep SERVER_URL
   ```

---

## 5. Container Startup Issues

### Symptoms
```
Container exited with code 1
Container keeps restarting
Health check failing
```

### Solutions

#### Issue 5.1: Container Won't Start
**Solution**:
1. Check logs:
   ```bash
   docker compose logs server
   docker compose logs worker
   docker compose logs db
   ```

2. Check container status:
   ```bash
   docker compose ps
   ```

3. Restart specific service:
   ```bash
   docker compose restart server
   ```

#### Issue 5.2: Health Check Failing
**Solution**:
1. Wait longer for startup:
   ```bash
   # Twenty CRM can take 1-2 minutes to fully start
   docker compose up -d
   sleep 60
   docker compose ps
   ```

2. Check health endpoint manually:
   ```bash
   curl http://localhost:8080/healthz
   ```

3. Review startup logs for errors:
   ```bash
   docker compose logs server | tail -100
   ```

---

## 6. Frontend Loading Issues

### Symptoms
```
Blank page
Console errors about missing modules
Failed to load resources
```

### Solutions

#### Issue 6.1: Frontend Assets Not Loading
**Solution**:
1. Clear browser cache
2. Hard refresh: `Ctrl+Shift+R` (Linux) or `Cmd+Shift+R` (Mac)
3. Check browser console for specific errors

#### Issue 6.2: REACT_APP_SERVER_BASE_URL Wrong
**Solution**:
1. Check what frontend sees:
   ```bash
   curl -s http://localhost:8080 | grep "REACT_APP_SERVER_BASE_URL"
   ```

2. Should match `SERVER_URL` from `.env`:
   ```bash
   # If SERVER_URL=http://localhost:8080
   # Frontend should show: REACT_APP_SERVER_BASE_URL": "http://localhost:8080"
   ```

3. If wrong, update `.env` and restart:
   ```bash
   docker compose down
   docker compose up -d
   ```

---

## 7. Performance Issues

### Symptoms (from GitHub Issues)
- Query read timeout
- Slow page loads
- Database connection timeouts

### Solutions

#### Issue 7.1: Database Query Timeouts
**Solution**:
1. Check database resource usage:
   ```bash
   docker stats twenty-db-1
   ```

2. Increase Docker memory allocation:
   - Docker Desktop → Settings → Resources → Memory: 4GB+

3. Optimize database:
   ```bash automatically
   docker exec twenty-db-1 psql -U postgres -d default -c "VACUUM ANALYZE;"
   ```

#### Issue 7.2: Insufficient Resources
**Solution**:
1. Check system resources:
   ```bash
   docker stats
   free -h
   ```

2. Increase Docker limits:
   - Memory: 4GB minimum
   - CPU: 2+ cores recommended

---

## 8. Docker-Specific Issues

### Issue 8.1: Docker Compose Version
**Solution**:
```bash
# Check version
docker compose version

# Should be 2.0+
# Update if needed
```

### Issue 8.2: Volume Permissions
**Solution**:
```bash
# Check volume permissions
docker volume inspect twenty_server-local-data

# If issues, recreate volumes:
docker compose down -v
docker compose up -d
```

### Issue 8.3: Network Issues
**Solution**:
```bash
# Check network
docker network ls | grep twenty

# Recreate network if needed:
docker compose down
docker compose up -d
```

---

## 9. Authentication & Login Issues

### Symptoms
```
Cannot login
Authentication failed
Session expired
```

### Solutions

#### Issue 9.1: APP_SECRET Changed
**Solution**:
1. Ensure `APP_SECRET` is stable:
   ```bash
   # Don't change APP_SECRET after initial setup
   # Changing it invalidates all sessions
   ```

2. If changed, reset:
   ```bash
   # Set APP_SECRET in .env
   # Restart containers
   # Users will need to re-authenticate
   ```

---

## 10. UI/UX Issues (from GitHub Issues)

### Issue 10.1: Activity Rich Text Editor (#15474)
**Symptom**: Problems with rich text editor in Activity section

**Solution**:
- Update to latest version
- Clear browser cache
- Disable browser extensions
- Report issue if persists
- See [Issue #15474](https://github.com/twentyhq/twenty/issues/15474)

### Issue 10.2: Advanced Filter Crashes (#15440)
**Symptom**: Opportunities → Filter → Advanced filter crashes the page

**Solution**:
- Avoid using advanced filters until fix released
- Use simple filters instead
- Monitor [Issue #15440](https://github.com/twentyhq/twenty/issues/15440) for updates

### Issue 10.3: List View Filters Not Working (#15427)
**Symptom**: Filters in List View not returning expected results

**Solution**:
- Verify filter criteria are correct
- Test filters individually
- Check [Issue #15427](https://github.com/twentyhq/twenty/issues/15427) for updates

### Issue 10.4: View Icon Not Updating (#15422)
**Symptom**: Editing view icon doesn't show immediately

**Solution**:
- Refresh page after changes
- Clear browser cache
- Hard refresh: `Ctrl+Shift+R`
- Check [Issue #15422](https://github.com/twentyhq/twenty/issues/15422)

### Issue 10.5: UI Flashing (#15408)
**Symptom**: UI flashes when updating select fields

**Solution**:
- Known issue, monitor for updates
- Check [Issue #15408](https://github.com/twentyhq/twenty/issues/15408)

### Issue 10.6: Kanban Scrolling Issue (#15351)
**Symptom**: Can't scroll when sorting by "Created by" in Kanban view

**Solution**:
- Avoid sorting by "Created by"
- Use other sort options
- Monitor [Issue #15351](https://github.com/twentyhq/twenty/issues/15351)

### Issue 10.7: Date Picker Dropdown (#12963)
**Symptom**: Month/year dropdowns not clickable

**Solution**:
- Manual date entry as workaround
- Check [Issue #12963](https://github.com/twentyhq/twenty/issues/12963)

### Issue 10.8: Drag-and-Drop Dashboard Tabs (#15327)
**Symptom**: Dragging dashboard tabs triggers dropdown instead

**Solution**:
- Use alternative method to rearrange
- Monitor [Issue #15327](https://github.com/twentyhq/twenty/issues/15327)

---

## 11. Login & Authentication Issues

### Issue 11.1: Cannot Login After Fresh Install (#9109)
**Solution**:
1. Check server logs for errors
2. Verify database configuration
3. Ensure environment variables set correctly
4. See [Issue #9109](https://github.com/twentyhq/twenty/issues/9109)

### Issue 10.2: APP_SECRET Changed
**Solution**:
- Don't change `APP_SECRET` after setup
- Changing invalidates all sessions
- Users need to re-authenticate if changed

---

## 12. API & Integration Issues

### Issue 12.1: REST API Filter Issues (#12929)
**Symptom**: REST API filters not working as expected

**Solution**:
- Review API documentation
- Check request formatting
- Monitor [Issue #12929](https://github.com/twentyhq/twenty/issues/12929)

### Issue 12.2: API Playground Access (#10283)
**Symptom**: API Playground not accessible

**Solution**:
- Access via app: Settings → API & Webhooks (under Developers)
- Enable "Advanced mode" if section not visible
- See [Issue #10283](https://github.com/twentyhq/twenty/issues/10283)

---

## 13. Workflow Issues

### Issue 13.1: Email Formatting (#15346)
**Symptom**: Workflow emails don't match configured format

**Solution**:
- Verify email templates
- Check template configuration
- Monitor [Issue #15346](https://github.com/twentyhq/twenty/issues/15346)

### Issue 13.2: Queue Limit (#12908)
**Symptom**: Workflows exceeding queue limit per workspace

**Solution**:
- Adjust workflow settings
- Configure queue limits
- See [Issue #12908](https://github.com/twentyhq/twenty/issues/12908)

---

## 14. Development vs Production Issues

### Issue 14.1: Environment Differences
**Solution**:
- **Development**: `SERVER_URL=http://localhost:8080`
- **Production**: `SERVER_URL=https://your-domain.com`

Always use `https://` in production, `http://` only for localhost development.

---

## 📋 GitHub Issues Reference

### High Priority Issues
- **#15408**: UI flashing when updating select fields (prio: high)
- **#15407**: Performance - Replace aggregate queries by groupBy queries (P1)
- **#15406**: Performance - Reduce db calls for relations (P2)
- **#15405**: Performance improvements

### Open Bugs
- **#15474**: Activity rich text editor issues
- **#15440**: Opportunities advanced filter crashes
- **#15434**: Random "Query read timeout" errors
- **#15427**: List View filters not returning expected results
- **#15422**: View icon edits not showing immediately
- **#15410**: Cannot delete unlinked objects
- **#15408**: UI flashing on select field updates

### Feature Requests
- **#15419**: Make opportunity name optional
- **#15390**: Custom LLM integration

### All Issues: https://github.com/twentyhq/twenty/issues

---

## 📋 Quick Diagnostic Checklist

When troubleshooting, check in this order:

1. [ ] **Ports**: No conflicts? (check with `lsof -i :PORT`)
2. [ ] **Containers**: All running? (`docker compose ps`)
3. [ ] **Environment**: Variables set? (`cat .env`)
4. [ ] **SERVER_URL**: Matches external port? (`grep SERVER_URL .env`)
5. [ ] **Logs**: Any errors? (`docker compose logs`)
6. [ ] **Health**: Backend responding? (`curl http://localhost:8080/healthz`)
7. [ ] **Frontend**: Correct backend URL? (`curl http://localhost:8080 | grep SERVER_BASE_URL`)
8. [ ] Mid **Database**: Connected? (`docker exec twenty-db-1 pg_isready`)
9. [ ] **Redis**: Connected? (`docker exec twenty-redis-1 redis-cli ping`)
10. [ ] **Browser**: Cache cleared? (Hard refresh)

---

## 🔧 Common Fix Commands

### Reset Everything
```bash
cd /home/sk/twenty-installation/twenty/packages/twenty-docker

# Stop everything
docker compose down -v

# Clean up
docker system prune -f

# Restart fresh
docker compose up -d

# Wait for startup
sleep 60

# Verify
docker compose ps
curl http://localhost:8080
```

### Check All Services
```bash
# Containers
docker compose ps

# Logs
docker compose logs --tail=50

# Resources
docker stats

# Network
docker network inspect twenty_default
```

### Update Configuration
```bash
# 1. Edit .env
nano .env  # or your preferred editor

# 2. Restart
docker compose down
docker compose up -d

# 3. Wait
sleep 30

# 4. Verify
docker compose ps
```

---

## 📚 Reference Links

- **GitHub Issues**: https://github.com/twentyhq/twenty/issues
- **Documentation**: https://twenty.com/developers
- **Self-Hosting**: https://twenty.com/developers/section/self-hosting
- **Docker Compose Guide**: See repository README

---

## ✅ Quick Fix Reference

| Issue | Quick Fix | GitHub Issue |
|-------|-----------|--------------|
| CORS Error | Update `SERVER_URL` in `.env` to match external port | - |
| Port Conflict | Change port in `docker-compose.yml` or stop conflicting service | - |
| Database Error | Check `PG_DATABASE_*` variables, restart containers | - |
| Container Won't Start | Check logs: `docker compose logs server` | - |
| Frontend Blank | Verify `SERVER_URL`, clear browser cache, hard refresh | - |
| Connection Timeout | Increase Docker memory, check database health | #15434 |
| Query Timeout | Optimize queries, increase timeout settings | #15406, #15407 |
| Advanced Filter Crash | Avoid advanced filters in Opportunities | #15440 |
| List View Filters | Verify filter criteria, test individually | #15427 |
| UI Flashing | Known issue, monitor for updates | #15408 |
| View Icon Not Updating | Refresh page, clear cache | #15422 |
| Kanban Scrolling | Avoid sorting by "Created by" | #15351 |
| Rich Text Editor | Update browser, clear cache, disable extensions | #15474 |
| Cannot Login | Check logs, verify database, check env vars | #9109 |

---

## 🔗 Additional Resources

- **GitHub Issues**: https://github.com/twentyhq/twenty/issues
- **Documentation**: https://twenty.com/developers
- **Self-Hosting Guide**: https://twenty.com/developers/section/self-hosting
- **Docker Compose Setup**: See repository README
- **Discord Community**: https://discord.gg/twenty

---

**Last Updated**: October 31, 2025  
**Status**: Comprehensive troubleshooting guide with GitHub issue references  
**Based on**: Active issues from https://github.com/twentyhq/twenty/issues


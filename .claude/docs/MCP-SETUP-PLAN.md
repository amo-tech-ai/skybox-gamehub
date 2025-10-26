# MCP Server Setup Plan - Skybox GameHub

**Project Path:** `/home/sk/skybox-gamehub`
**Date:** 2025-10-26
**Purpose:** Configure local project-scoped MCP servers for Claude Code

---

## 🎯 Objective

Set up MCP servers at the **local/project scope** (not global user scope) for this specific project, ensuring:
1. Mermaid server for diagrams
2. Supabase server for database operations
3. Perplexity server for research
4. Desktop Commander for system operations

---

## 📋 Simple Setup Steps

### Step 1: Check Current MCP Configuration
**Estimated Time:** 2 minutes

```bash
# List all currently configured MCP servers
claude mcp list

# Check which scope they're using (local/project/user)
```

**Checklist:**
- [ ] Run `claude mcp list` command
- [ ] Note which servers are already configured
- [ ] Identify their current scope (local/project/user)
- [ ] Document any missing servers

---

### Step 2: Verify Current Working Directory
**Estimated Time:** 1 minute

```bash
# Confirm we're in the correct project directory
pwd
# Should show: /home/sk/skybox-gamehub
```

**Checklist:**
- [ ] Verify current directory is `/home/sk/skybox-gamehub`
- [ ] Check if `.mcp.json` exists in project root
- [ ] Note any existing MCP configuration files

---

### Step 3: Remove Global/User Scoped Servers (If Needed)
**Estimated Time:** 3 minutes

```bash
# Only if servers are configured at wrong scope
# Remove user-scoped versions (if they exist)
claude mcp remove --scope user mermaid
claude mcp remove --scope user supabase
claude mcp remove --scope user perplexity
claude mcp remove --scope user desktop-commander
```

**Checklist:**
- [ ] Identify servers configured at user/global scope
- [ ] Remove them from user scope
- [ ] Confirm removal with `claude mcp list`

---

### Step 4: Add MCP Servers at Local/Project Scope
**Estimated Time:** 5 minutes

#### 4.1: Add Mermaid Server (Diagrams)
```bash
# Add Mermaid server at local scope
claude mcp add --transport stdio mermaid --scope local \
  -- npx -y @modelcontextprotocol/server-mermaid
```

**Checklist:**
- [ ] Run mermaid add command
- [ ] Verify no errors during installation
- [ ] Confirm server appears in `claude mcp list`

---

#### 4.2: Add Supabase Server (Database)
```bash
# Add Supabase server at local scope
# You'll need your Supabase project URL and anon key
claude mcp add --transport stdio supabase --scope local \
  --env SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co \
  --env SUPABASE_ANON_KEY=your-anon-key-here \
  -- npx -y @modelcontextprotocol/server-supabase
```

**Checklist:**
- [ ] Get Supabase URL from `.env.local`
- [ ] Get Supabase anon key from `.env.local`
- [ ] Run supabase add command with correct credentials
- [ ] Verify no errors during installation
- [ ] Confirm server appears in `claude mcp list`

---

#### 4.3: Add Perplexity Server (Research)
```bash
# Add Perplexity server at local scope
# Requires Perplexity API key
claude mcp add --transport stdio perplexity --scope local \
  --env PERPLEXITY_API_KEY=your-api-key-here \
  -- npx -y @modelcontextprotocol/server-perplexity
```

**Checklist:**
- [ ] Obtain Perplexity API key
- [ ] Run perplexity add command
- [ ] Verify no errors during installation
- [ ] Confirm server appears in `claude mcp list`

---

#### 4.4: Add Desktop Commander (System Operations)
```bash
# Add Desktop Commander at local scope
claude mcp add --transport stdio desktop-commander --scope local \
  -- npx -y desktop-commander-mcp
```

**Checklist:**
- [ ] Run desktop-commander add command
- [ ] Verify no errors during installation
- [ ] Confirm server appears in `claude mcp list`

---

### Step 5: Verify Local Project Configuration
**Estimated Time:** 3 minutes

```bash
# Check that .mcp.json was created in project root
ls -la /home/sk/skybox-gamehub/.mcp.json

# View the configuration
cat /home/sk/skybox-gamehub/.mcp.json

# List all MCP servers and confirm they're local/project scoped
claude mcp list
```

**Checklist:**
- [ ] `.mcp.json` file exists in project root
- [ ] File contains all 4 servers
- [ ] All servers show as local/project scope
- [ ] No servers are user/global scoped for this project

---

### Step 6: Test MCP Server Connections
**Estimated Time:** 5 minutes

```bash
# Get detailed info for each server
claude mcp get mermaid
claude mcp get supabase
claude mcp get perplexity
claude mcp get desktop-commander

# Check connection status
# Use /mcp command within Claude Code to see server status
```

**Checklist:**
- [ ] All servers show ✓ Connected status
- [ ] Mermaid server responds
- [ ] Supabase server responds
- [ ] Perplexity server responds
- [ ] Desktop Commander server responds

---

### Step 7: Validate MCP Tools Are Available
**Estimated Time:** 3 minutes

**Within Claude Code, test each server:**

```
# Test Mermaid
> Create a simple flowchart diagram

# Test Supabase
> Query the events table from Supabase

# Test Perplexity
> Search for latest React 18 best practices

# Test Desktop Commander
> List files in current directory
```

**Checklist:**
- [ ] Mermaid creates diagrams successfully
- [ ] Supabase queries database successfully
- [ ] Perplexity searches work
- [ ] Desktop Commander executes commands

---

## 🔍 Verification Checklist

### Configuration Files
- [ ] `.mcp.json` exists at `/home/sk/skybox-gamehub/.mcp.json`
- [ ] No global `~/.claude.json` interfering with local config
- [ ] Environment variables properly set in `.mcp.json`

### Server Status
- [ ] Mermaid: ✓ Connected (local scope)
- [ ] Supabase: ✓ Connected (local scope)
- [ ] Perplexity: ✓ Connected (local scope)
- [ ] Desktop Commander: ✓ Connected (local scope)

### Functionality Tests
- [ ] Can create Mermaid diagrams
- [ ] Can query Supabase database
- [ ] Can search with Perplexity
- [ ] Can run system commands

---

## 📊 Expected Final State

### Active Configuration Path
```
Local Project Config: /home/sk/skybox-gamehub/.mcp.json (ACTIVE)
User Config: ~/.config/claude/config.json (IGNORED for this project)
Global Config: ~/.claude.json (IGNORED for this project)
```

### Connected Servers (All Local Scope)
```
✓ mermaid (local) - Diagram generation
✓ supabase (local) - Database operations
✓ perplexity (local) - AI-powered research
✓ desktop-commander (local) - System commands
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Server Not Connecting
**Symptoms:** Server shows as configured but not connected
**Solution:**
```bash
# Remove and re-add the server
claude mcp remove mermaid
claude mcp add --transport stdio mermaid --scope local \
  -- npx -y @modelcontextprotocol/server-mermaid
```

### Issue 2: Wrong Scope (User Instead of Local)
**Symptoms:** Server appears in user scope instead of local
**Solution:**
```bash
# Remove from user scope
claude mcp remove --scope user servername

# Re-add at local scope
claude mcp add --transport stdio servername --scope local \
  -- npx -y @modelcontextprotocol/server-servername
```

### Issue 3: Environment Variables Not Working
**Symptoms:** Server fails to authenticate or connect
**Solution:**
- Check `.env.local` for correct values
- Ensure `--env` flags are properly formatted
- Use quotes for values with special characters

### Issue 4: .mcp.json Not Created
**Symptoms:** No `.mcp.json` file in project root
**Solution:**
- Verify you're in the correct directory
- Try adding one server with `--scope project` (creates file)
- Manually create `.mcp.json` with template below

---

## 📄 Manual .mcp.json Template

If you need to manually create `.mcp.json`:

```json
{
  "mcpServers": {
    "mermaid": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-mermaid"],
      "env": {}
    },
    "supabase": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_URL": "${SUPABASE_URL}",
        "SUPABASE_ANON_KEY": "${SUPABASE_ANON_KEY}"
      }
    },
    "perplexity": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-perplexity"],
      "env": {
        "PERPLEXITY_API_KEY": "${PERPLEXITY_API_KEY}"
      }
    },
    "desktop-commander": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "desktop-commander-mcp"],
      "env": {}
    }
  }
}
```

**Note:** This uses environment variable expansion (`${VAR}`), so ensure these are set in your shell.

---

## ✅ Final Validation Command

Run this to confirm everything is working:

```bash
# 1. Check config file exists
ls -la /home/sk/skybox-gamehub/.mcp.json

# 2. List all servers with scope
claude mcp list

# 3. Verify each server individually
claude mcp get mermaid
claude mcp get supabase
claude mcp get perplexity
claude mcp get desktop-commander

# 4. Check logs for any errors
tail -n 50 ~/.config/Claude/logs/mcp*.log
```

**Expected Output:**
- All 4 servers listed with (local) scope
- All servers show ✓ Connected
- No errors in logs

---

## 📝 Summary

### What This Plan Does:
1. ✅ Configures MCP servers at **local project scope**
2. ✅ Creates `.mcp.json` in project root
3. ✅ Ensures local config overrides global config
4. ✅ Validates all servers are connected
5. ✅ Provides troubleshooting steps

### Why Local Scope:
- **Isolation:** Project-specific configuration
- **Portability:** Can share `.mcp.json` with team
- **Safety:** No interference with other projects
- **Flexibility:** Different servers per project

### Total Setup Time:
- Estimated: **20-25 minutes**
- Actual time may vary based on network speed

---

**Created:** 2025-10-26
**Project:** Skybox GameHub
**Status:** Ready for Implementation

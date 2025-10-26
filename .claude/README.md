# .claude - Claude Code Configuration

This folder contains Claude Code configuration and custom slash commands for the Skybox GameHub project.

## 📁 Contents

### `settings.json`
Safe command whitelist for Claude Code automation. Specifies which tools and bash commands Claude can run without explicit approval.

**Key permissions:**
- ✅ File operations (Read, Write, Edit, Glob, Grep)
- ✅ Development commands (npm run dev/build/lint)
- ✅ Git read-only (status, log, diff, branch)
- ✅ Database read-only queries
- ⚠️ Git commits require approval
- ⚠️ Database writes require approval

### `commands/` - Custom Slash Commands

Four production-ready slash commands for common workflows:

| Command | Purpose | Time |
|---------|---------|------|
| `/fix-lint-errors` | Auto-fix ESLint errors with approval | 5-15 min |
| `/connect-supabase` | Test database connection and health | 2 min |
| `/test-build` | Build and verify production readiness | 5 min |
| `/init-project` | First-time setup for new developers | 5-10 min |

---

## 🚀 Using Slash Commands

### Quick Reference

```bash
# New developer onboarding
/init-project

# Daily development
/fix-lint-errors        # Clean up code quality
/connect-supabase       # Verify DB connection
/test-build             # Test production build
```

### Command Details

#### `/init-project`
**Use when:** Setting up project for the first time

**What it does:**
1. Checks Node v22 installed
2. Installs npm dependencies
3. Creates `.env.local` from template
4. Tests database connection
5. Runs first build
6. Starts dev server

**Time:** 5-10 minutes (mostly npm install)

**Example output:**
```
✅ Setup Complete!
   - Node v22.20.0 ✓
   - 234 packages installed ✓
   - .env.local configured ✓
   - Database connection verified ✓
   - Dev server running on http://localhost:8081 ✓
```

---

#### `/fix-lint-errors`
**Use when:** ESLint shows errors or warnings

**What it does:**
1. Runs `npm run lint`
2. Lists all errors/warnings
3. Proposes fixes one-by-one
4. Applies fixes with your approval
5. Re-runs lint to verify

**Time:** 5-15 minutes (depends on error count)

**Example output:**
```
🔴 Found 8 issues: 5 errors, 3 warnings

Error #1: Unused variable 'selectedDate'
File: src/pages/Home.tsx:25

Fix this? (yes/no/skip)
```

**Safety:** Always shows diff before applying changes

---

#### `/connect-supabase`
**Use when:** Verifying database is accessible

**What it does:**
1. Checks `.env.local` exists
2. Tests PostgreSQL connection
3. Counts tables and events
4. Verifies Supabase client config
5. Checks RLS policies

**Time:** 2 minutes

**Example output:**
```
🔗 Supabase Connection Health Check
======================================

✅ Environment Variables: Found
✅ Database Connection: Connected
✅ Database Schema: 16 tables
✅ Events Data: 5 published events
✅ Supabase Client: Configured

📊 Overall Status: 🟢 HEALTHY
```

**Use cases:**
- After changing `.env.local`
- When database queries fail
- Before starting frontend integration
- Troubleshooting connection issues

---

#### `/test-build`
**Use when:** Before deployment or PR creation

**What it does:**
1. Cleans previous build
2. Runs `npm run build`
3. Analyzes bundle size
4. Starts preview server
5. Runs smoke tests
6. Reports build health

**Time:** 5 minutes

**Example output:**
```
🏗️  Build Test Report
========================

✅ Production Build: Success (8.23s)
📦 Main JS: 523 kB (gzipped: 168 kB)
📦 Main CSS: 89 kB (gzipped: 16 kB)
✅ Preview Server: Running on http://localhost:4173
✅ Smoke Tests: All passed

📊 Overall Status: 🟢 READY FOR DEPLOYMENT
```

**Use cases:**
- Before creating pull request
- Before deploying to production
- After major refactoring
- When bundle size concerns exist

---

## 🔧 Customizing Commands

### Adding New Commands

Create a new `.md` file in `commands/`:

```bash
touch .claude/commands/my-command.md
```

**Template structure:**
```markdown
# My Command Title

You are a [role] assistant. Your job is to [objective].

## Objective
[What this command accomplishes]

## Step-by-Step Process

### Step 1: [Task Name]
[Instructions for Claude]

### Step 2: [Next Task]
[More instructions]

## Error Scenarios
[How to handle common errors]

## Example Usage
[Show expected flow]
```

### Modifying Settings

Edit `.claude/settings.json` to add/remove allowed commands:

```json
{
  "allowedTools": [
    "Read",
    "Bash(my-new-command:*)"  // Add new permission
  ]
}
```

---

## 📚 Documentation Links

- **Main Guide:** `/CLAUDE.md`
- **Progress Tracker:** `/supabase/frontend/05-PROGRESS_TRACKER.md`
- **Implementation Guide:** `/supabase/frontend/03-implementation-guide.md`

---

## 🎯 Command Development Workflow

Example: New developer joins team

```bash
# 1. Clone repo
git clone [repo-url]
cd skybox-gamehub

# 2. Run init command
/init-project
# ✅ Node checked, dependencies installed, env configured

# 3. Start developing
npm run dev

# 4. Before committing
/fix-lint-errors
# ✅ Code quality verified

# 5. Before pushing
/test-build
# ✅ Build verified, ready to push

# 6. If DB issues
/connect-supabase
# ✅ Connection verified
```

---

## 🔒 Security Notes

1. **Never commit `.env.local`** - Contains sensitive credentials
2. **Review diffs** before accepting changes from `/fix-lint-errors`
3. **Database passwords** are masked in command output
4. **Git commits** always require explicit approval
5. **Settings.json** restricts dangerous operations

---

## 🤝 Contributing Commands

When adding new slash commands:

1. ✅ Include clear step-by-step instructions
2. ✅ Add error handling scenarios
3. ✅ Show expected output examples
4. ✅ Include safety considerations
5. ✅ Add time estimates
6. ✅ Test command thoroughly before committing

---

## 📞 Support

**Questions about commands?**
- Check `/CLAUDE.md` for general guidance
- Read individual command files for details
- See `/supabase/frontend/README.md` for project docs

**Command not working?**
1. Check `.claude/settings.json` has permission
2. Verify command file exists in `commands/`
3. Check command syntax (starts with `/`)
4. See troubleshooting in `/CLAUDE.md` section 10

---

**Last Updated:** 2025-10-25
**Created For:** Skybox GameHub Development Team

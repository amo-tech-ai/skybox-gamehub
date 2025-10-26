# Initialize Project

You are a project setup assistant. Your job is to help new developers get the Skybox GameHub project running on their machine quickly and safely.

## Objective

Complete first-time setup including:
1. System requirements check
2. Dependency installation
3. Environment configuration
4. Database connection verification
5. First dev server run
6. Verify everything works

## Step-by-Step Process

### Step 1: Welcome Message

Greet the developer:

```
👋 Welcome to Skybox GameHub!

This command will help you set up the project for the first time.
We'll check your system, install dependencies, configure environment variables,
and verify everything works.

Estimated time: 5-10 minutes

Ready to start? (yes/no)
```

Wait for confirmation before proceeding.

### Step 2: Check System Requirements

Verify Node.js version:

```bash
node --version
```

**Expected:** v22.x.x (or v22.20.0+)

**If wrong version:**
```
⚠️  Node Version Mismatch
   - Current: v18.x.x
   - Required: v22.x.x

🔧 Install Node v22:
   # Using nvm (recommended)
   nvm install 22
   nvm use 22
   nvm alias default 22

   # Verify
   node --version
```

Check npm version:
```bash
npm --version
```

**Expected:** v10.x.x or higher

### Step 3: Check for Existing Installation

Check if `node_modules` exists:

```bash
ls -la node_modules/ 2>/dev/null
```

**If exists:**
```
⚠️  node_modules already exists.
   This might be from a previous install.

Options:
1. Skip installation (use existing)
2. Reinstall from scratch (rm -rf node_modules && npm install)

Which option? (1/2)
```

### Step 4: Install Dependencies

If node_modules doesn't exist or user chose reinstall:

```bash
npm install
```

**Monitor for:**
- Dependency conflicts
- Peer dependency warnings
- Installation errors

**Show progress:**
```
📦 Installing dependencies...
   - @supabase/supabase-js
   - @tanstack/react-query
   - react, react-dom
   - shadcn/ui components
   - [etc...]

✅ Installed 234 packages in 45.2s
```

### Step 5: Environment Configuration

Check if `.env.local` exists:

```bash
ls -la .env.local 2>/dev/null
```

**If missing:**
```
⚠️  .env.local not found

Creating .env.local from template...
```

Check for `.env.example`:
```bash
cat .env.example
```

**If .env.example exists:**
Copy it to .env.local:
```bash
cp .env.example .env.local
```

**If .env.example doesn't exist:**
Create .env.local with template:
```bash
cat > .env.local << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://dbocegamkdnsorhtdbni.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service Role (Backend Only)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database Connection
SUPABASE_DB_URL="postgresql://postgres:password@db.dbocegamkdnsorhtdbni.supabase.co:5432/postgres"

# Development Settings
VITE_DEBUG=true
NODE_ENV=development
EOF
```

**Then prompt:**
```
📝 .env.local created!

⚠️  Action Required:
   Please add your Supabase credentials to .env.local

   You can find your credentials at:
   https://supabase.com/dashboard/project/dbocegamkdnsorhtdbni/settings/api

   Required variables:
   - VITE_SUPABASE_URL (already set)
   - VITE_SUPABASE_ANON_KEY (needs your key)

   Press Enter when you've updated .env.local...
```

Wait for user confirmation.

### Step 6: Verify Environment Variables

After user confirms, verify .env.local has values:

```bash
cat .env.local | grep -E "VITE_SUPABASE_(URL|ANON_KEY)" | grep -v "your-.*-here"
```

**If still has placeholders:**
```
❌ Environment variables not configured

Please replace "your-anon-key-here" with actual values.
Run this command again when ready: /init-project
```

**If configured:**
```
✅ Environment variables configured
   - VITE_SUPABASE_URL: ✓
   - VITE_SUPABASE_ANON_KEY: ✓
```

### Step 7: Test Database Connection

Run quick connection test:

```bash
PGPASSWORD='Toronto2025#' psql \
  -h aws-1-us-east-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.dbocegamkdnsorhtdbni \
  -c "SELECT COUNT(*) as events FROM events WHERE status = 'published';"
```

**Expected:**
```
 events
--------
      5
(1 row)
```

**If successful:**
```
✅ Database connection successful
   - Found 5 published events in database
   - Connection ready for development
```

**If failed:**
```
⚠️  Database connection failed
   This is okay for now - you can develop with mock data.
   We'll fix the connection later.
```

### Step 8: Run First Build (Test)

Quick build test to verify everything compiles:

```bash
npm run build
```

**If successful:**
```
✅ Build test passed
   - TypeScript compiled successfully
   - Vite build completed
   - Project is ready for development
```

**If failed:**
Stop and show errors:
```
❌ Build test failed

Errors found:
[show errors]

Please fix these errors before continuing.
Need help? Check CLAUDE.md section 10 (Troubleshooting)
```

### Step 9: Start Dev Server

Ask before starting:
```
🚀 Ready to start development server?

This will start Vite on http://localhost:8081
Press Ctrl+C to stop the server when done.

Start server? (yes/no)
```

If yes:
```bash
npm run dev
```

**Show:**
```
🎉 Development server starting...

  VITE v5.4.19  ready in 827 ms

  ➜  Local:   http://localhost:8081/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

✅ Server running!

   Open your browser to: http://localhost:8081

   You should see the Skybox GameHub home page.
   Try navigating to different pages to verify everything works.
```

### Step 10: Final Checklist

Show interactive checklist:

```
✅ Setup Complete! Here's your checklist:

System:
✅ Node v22.x.x installed
✅ npm v10.x.x installed

Dependencies:
✅ 234 packages installed
✅ No critical vulnerabilities

Configuration:
✅ .env.local created
✅ Environment variables configured
✅ Database connection verified

Build:
✅ TypeScript compiles
✅ Production build works

Server:
✅ Dev server running on http://localhost:8081

📚 Next Steps:
   1. Open http://localhost:8081 in your browser
   2. Check browser console for errors (should be none)
   3. Navigate through the app (Home, Events, Reserve, Menu)
   4. Read CLAUDE.md for development guidelines
   5. Check /supabase/frontend/05-PROGRESS_TRACKER.md for current status

🎯 Current Project Status:
   - Infrastructure: 100% ✅
   - Database: 100% ✅
   - Frontend Integration: 0% ❌ (next priority)

   See CLAUDE.md section 8 for detailed status.

Need help? Check CLAUDE.md or run:
   /connect-supabase  - Test database connection
   /fix-lint-errors   - Fix code quality issues
   /test-build        - Test production build

Happy coding! 🎮⚾🏈
```

## Error Scenarios

### Scenario 1: Node Version Too Old
```
❌ Node Version Check Failed
   - Current: v16.x.x
   - Required: v22.x.x

Node v16 is not supported. Please upgrade to Node v22.

🔧 Upgrade Instructions:
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 22
   nvm use 22

   # Verify
   node --version

   Then run /init-project again.
```

### Scenario 2: npm Install Failed
```
❌ Dependency Installation Failed
   Error: ERESOLVE unable to resolve dependency tree

🔧 Troubleshooting:
   1. Clear npm cache: npm cache clean --force
   2. Delete node_modules: rm -rf node_modules
   3. Delete package-lock.json: rm package-lock.json
   4. Retry: npm install

   If still fails, check:
   - Network connection
   - npm registry status
   - Disk space
```

### Scenario 3: Port 8081 Already in Use
```
⚠️  Port 8081 is already in use

🔧 Options:
   1. Stop the process using port 8081
      lsof -i :8081
      kill -9 <PID>

   2. Change port in vite.config.ts
      server: { port: 8082 }

   3. Use a different port for this session
      PORT=8082 npm run dev
```

### Scenario 4: Database Connection Failed
```
⚠️  Database Connection Failed
   This is okay for initial setup.

The app will work with mock data for now.
You can fix the connection later with: /connect-supabase

Continue with setup? (yes/no)
```

## Safety Considerations

1. **Never** expose API keys in terminal output
2. **Always** create .env.local, never commit it
3. **Check** for existing installs before reinstalling
4. **Verify** Node version before installing dependencies
5. **Test** build before starting dev server

## Interactive Prompts

Throughout the process, ask for user confirmation:
- "Ready to start?" (beginning)
- "Install dependencies?" (before npm install)
- "Update environment variables?" (before .env.local)
- "Start dev server?" (before npm run dev)
- "Continue anyway?" (if non-critical errors)

## Example Usage

New developer clones repo and runs: `/init-project`

Expected flow:
1. Welcome message
2. Check Node v22 ✓
3. Install dependencies (2 min)
4. Create .env.local
5. Wait for user to add credentials
6. Test database connection ✓
7. Run build test ✓
8. Start dev server ✓
9. Show final checklist
10. Developer opens browser and sees working app

---

**Goal:** Get a new developer from zero to running app in under 10 minutes with minimal friction.

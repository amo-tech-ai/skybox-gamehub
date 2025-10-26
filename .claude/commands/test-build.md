# Test Build

You are a build testing assistant. Your job is to verify the production build works correctly before deployment.

## Objective

Run a complete build and preview cycle to ensure:
1. TypeScript compiles without errors
2. Production build succeeds
3. Build output is valid
4. Preview server starts correctly
5. Basic smoke tests pass

## Step-by-Step Process

### Step 1: Clean Previous Build

Remove old build artifacts:

```bash
rm -rf dist/
```

Report: "Cleaned previous build artifacts"

### Step 2: Run Production Build

Build the project:

```bash
npm run build
```

**Monitor for:**
- TypeScript compilation errors
- Vite build errors
- Asset optimization warnings
- Bundle size information

**Expected output (example):**
```
vite v5.4.19 building for production...
✓ 234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-B2nZ6Qgl.css   89.23 kB │ gzip: 15.67 kB
dist/assets/index-DxN8mS9h.js   523.45 kB │ gzip: 167.89 kB
✓ built in 8.23s
```

**Report:**
- ✅ Build successful
- Bundle size: XXX kB (gzipped: YYY kB)
- Build time: X.XX seconds

### Step 3: Verify Build Output

Check the `dist/` folder structure:

```bash
tree dist/ -L 2 -I 'node_modules'
```

**Expected structure:**
```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images/fonts...]
├── favicon.ico
└── robots.txt
```

**Verify:**
- `index.html` exists
- Assets folder has JS and CSS bundles
- Static files copied correctly

### Step 4: Analyze Bundle Size

Check bundle composition:

```bash
ls -lh dist/assets/
```

**Report:**
- Main JS bundle size
- Main CSS bundle size
- Image assets
- Font files

**Warn if:**
- JS bundle > 1 MB (consider code splitting)
- CSS bundle > 200 KB (check for unused styles)

### Step 5: Start Preview Server

Start the production preview:

```bash
npm run preview &
```

Wait 3 seconds for server to start.

**Expected output:**
```
➜  Local:   http://localhost:4173/
➜  Network: use --host to expose
```

### Step 6: Smoke Tests

Run basic smoke tests to verify the build:

**Test 1: Index HTML loads**
```bash
curl -I http://localhost:4173/
```
Expected: `HTTP/1.1 200 OK`

**Test 2: Main JS bundle loads**
```bash
curl -I http://localhost:4173/assets/index-*.js
```
Expected: `HTTP/1.1 200 OK`

**Test 3: CSS bundle loads**
```bash
curl -I http://localhost:4173/assets/index-*.css
```
Expected: `HTTP/1.1 200 OK`

### Step 7: Playwright E2E Tests (Optional)

If time permits, run E2E tests against preview:

```bash
npx playwright test --project=chromium
```

**Report test results:**
- Tests passed
- Tests failed (with details)
- Duration

### Step 8: Stop Preview Server

Clean up:

```bash
# Find preview server process
lsof -i :4173 | grep node | awk '{print $2}'

# Kill it
kill $(lsof -i :4173 | grep node | awk '{print $2}')
```

## Build Report

Generate a comprehensive report:

```
🏗️  Build Test Report
========================

✅ Step 1: Clean Build
   - Previous build artifacts removed

✅ Step 2: Production Build
   - Status: Success ✓
   - Build time: 8.23s
   - Warnings: 0
   - Errors: 0

✅ Step 3: Build Output
   - dist/index.html: ✓
   - dist/assets/: ✓
   - Static files: ✓

📦 Step 4: Bundle Analysis
   - Main JS: 523 kB (gzipped: 168 kB) ✓
   - Main CSS: 89 kB (gzipped: 16 kB) ✓
   - Images: 12 files
   - Total size: 2.3 MB

✅ Step 5: Preview Server
   - Started on: http://localhost:4173
   - Status: Running ✓

✅ Step 6: Smoke Tests
   - Index HTML: ✓ 200 OK
   - JS Bundle: ✓ 200 OK
   - CSS Bundle: ✓ 200 OK

✅ Step 7: E2E Tests (Optional)
   - Tests run: 3
   - Tests passed: 3 ✓
   - Tests failed: 0
   - Duration: 12.4s

✅ Step 8: Cleanup
   - Preview server stopped ✓

📊 Overall Status: 🟢 READY FOR DEPLOYMENT

✅ Build is production-ready
✅ No critical errors
✅ All smoke tests passed
✅ Bundle size acceptable

Next Steps:
- Deploy to Vercel/Netlify
- Run final QA tests
- Monitor production logs
```

## Error Scenarios

### Scenario 1: TypeScript Errors

```
❌ Step 2: Production Build
   - Status: Failed ✗
   - Error: TypeScript compilation failed

Errors:
src/pages/Home.tsx:45:10 - error TS2304: Cannot find name 'Event'.
   45     events.map((event: Event) => (
             ^^^^^

🔧 Fix:
   1. Check for missing type imports
   2. Run: npx tsc --noEmit
   3. Fix type errors
   4. Retry build
```

### Scenario 2: Build Failed

```
❌ Step 2: Production Build
   - Status: Failed ✗
   - Error: Vite build failed

Error: Could not resolve '@/components/EventCard'
   at resolveId (...)

🔧 Fix:
   1. Verify file exists at path
   2. Check path alias in vite.config.ts
   3. Check import statement syntax
```

### Scenario 3: Large Bundle Size

```
⚠️  Step 4: Bundle Analysis
   - Main JS: 2.1 MB (gzipped: 650 kB) ⚠️

🔧 Recommendations:
   1. Enable code splitting (React.lazy)
   2. Check for duplicate dependencies
   3. Analyze bundle: npx vite-bundle-visualizer
   4. Consider removing large libraries
```

### Scenario 4: Preview Server Failed

```
❌ Step 5: Preview Server
   - Status: Failed ✗
   - Error: Port 4173 already in use

🔧 Fix:
   1. Find process: lsof -i :4173
   2. Kill process: kill -9 <PID>
   3. Or change port in package.json
   4. Retry preview
```

### Scenario 5: Smoke Tests Failed

```
❌ Step 6: Smoke Tests
   - Index HTML: ✓ 200 OK
   - JS Bundle: ✗ 404 Not Found
   - CSS Bundle: ✓ 200 OK

🔧 Fix:
   1. Check dist/assets/ folder
   2. Verify JS bundle was created
   3. Check index.html for correct paths
   4. Rebuild if needed
```

## Performance Checks

Include performance metrics:

```
📈 Performance Metrics
========================

Bundle Sizes:
- Main JS (gzipped): 168 kB ✓ (target: <200 kB)
- Main CSS (gzipped): 16 kB ✓ (target: <50 kB)
- Total (gzipped): 184 kB ✓ (target: <250 kB)

Build Performance:
- Build time: 8.23s ✓ (target: <30s)
- Modules transformed: 234

Optimizations Applied:
✓ Minification
✓ Tree-shaking
✓ Asset optimization
✓ Code splitting (React.lazy)
✓ CSS purging
```

## Safety Considerations

1. **Clean** old builds before new ones
2. **Stop** preview server after testing (don't leave running)
3. **Check** for sensitive data in build output
4. **Verify** environment variables are build-time only
5. **Test** on multiple browsers if deploying

## Example Usage

User runs: `/test-build`

Expected flow:
1. Clean dist/ folder
2. Run `npm run build`
3. Analyze bundle output
4. Start preview server
5. Run smoke tests
6. Generate report
7. Stop preview server
8. Present findings

---

**Goal:** Ensure production build is error-free and ready for deployment.

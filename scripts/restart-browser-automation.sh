#!/bin/bash

# Restart Browser Automation - Clean Restart Script
# Fixes typing issues by killing stuck processes and restarting cleanly

echo "🔄 Restarting Browser Automation..."

# Step 1: Kill all browser automation processes
echo "1️⃣  Killing stuck browser processes..."
pkill -f "chrome-devtools-mcp" 2>/dev/null
pkill -f "mcp-server-playwright" 2>/dev/null
pkill -f "@playwright/mcp" 2>/dev/null
pkill -f "ms-playwright/mcp-chrome" 2>/dev/null

# Step 2: Kill Chrome instances launched by automation (but not user Chrome)
echo "2️⃣  Cleaning up automation Chrome instances..."
ps aux | grep -E "chrome.*mcp-chrome|chrome.*remote-debugging-port" | grep -v grep | awk '{print $2}' | xargs -r kill -9 2>/dev/null

# Step 3: Wait for processes to fully terminate
echo "3️⃣  Waiting for cleanup..."
sleep 3

# Step 4: Verify cleanup
REMAINING=$(ps aux | grep -E "chrome-devtools-mcp|mcp-server-playwright|@playwright/mcp" | grep -v grep | wc -l)
if [ "$REMAINING" -eq 0 ]; then
    echo "✅ All browser automation processes cleaned up"
else
    echo "⚠️  Some processes still running, force killing..."
    pkill -9 -f "chrome-devtools-mcp" 2>/dev/null
    pkill -9 -f "mcp-server-playwright" 2>/dev/null
    pkill -9 -f "@playwright/mcp" 2>/dev/null
fi

# Step 5: Clear Playwright cache if needed
echo "4️⃣  Clearing Playwright browser cache..."
rm -rf ~/.cache/ms-playwright/mcp-chrome-* 2>/dev/null

echo ""
echo "✅ Browser automation restart complete!"
echo "📝 You can now:"
echo "   - Type normally in Chrome"
echo "   - Restart MCP servers if needed"
echo "   - Use browser automation tools again"


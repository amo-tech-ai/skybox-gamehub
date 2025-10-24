#!/bin/bash

# Direct browser opening for Cursor
echo "🌐 Opening Skybox Gamehub directly in browser..."

# Check if server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
fi

echo "✅ Development server running on http://localhost:8081"

# Try different methods to open browser preview
echo ""
echo "🎯 Try these methods in Cursor:"
echo ""
echo "Method 1 - Command Palette:"
echo "1. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Enter URL: http://localhost:8081"
echo ""
echo "Method 2 - Live Preview:"
echo "1. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Live Preview: Show Preview'"
echo "3. Or type: 'Live Preview: Start Server'"
echo ""
echo "Method 3 - Manual:"
echo "1. Go to View menu → Command Palette"
echo "2. Search for 'browser' or 'preview'"
echo "3. Look for any browser-related commands"
echo ""
echo "Method 4 - Extensions:"
echo "1. Go to Extensions (Ctrl+Shift+X)"
echo "2. Search for 'Simple Browser'"
echo "3. Make sure it's enabled"
echo ""
echo "🌐 Your app URL: http://localhost:8081"
echo "🎨 New orange and green colors are live!"


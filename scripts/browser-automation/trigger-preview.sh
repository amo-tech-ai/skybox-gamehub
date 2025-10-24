#!/bin/bash

# Trigger Live Preview in existing Cursor window
echo "🌐 Triggering Live Preview in existing Cursor window..."

# Check if server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
fi

echo "✅ Development server running on http://localhost:8081"
echo ""
echo "🎯 Now in your existing Cursor window:"
echo "1. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Live Preview: Show Preview'"
echo "3. Press Enter"
echo ""
echo "🎨 Your Skybox Gamehub will open in the browser preview panel!"
echo "🌐 URL: http://localhost:8081"
echo ""
echo "✨ The new orange and green color scheme will be visible!"


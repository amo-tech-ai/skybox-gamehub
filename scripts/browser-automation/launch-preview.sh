#!/bin/bash

# Launch Skybox Gamehub Browser Preview in Cursor
echo "🚀 Launching Skybox Gamehub Browser Preview..."

# Check if server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
fi

echo "✅ Development server running on http://localhost:8081"

# Open Cursor with the project and trigger Live Preview
echo "🌐 Opening Cursor with Live Preview..."

# Method 1: Open Cursor with the project
cursor /home/sk/skybox/skybox-gamehub &

# Wait a moment for Cursor to open
sleep 2

echo ""
echo "🎯 Next Steps:"
echo "1. In Cursor, press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Live Preview: Show Preview'"
echo "3. Or type: 'Live Preview: Start Server'"
echo "4. Your Skybox Gamehub will open in the middle window!"
echo ""
echo "🎨 You'll see the new orange and green color scheme!"
echo "🌐 URL: http://localhost:8081"
echo ""
echo "✨ Browser preview is ready to use!"


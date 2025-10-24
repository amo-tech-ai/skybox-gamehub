#!/bin/bash

# Quick Browser Preview - Opens Simple Browser with correct URL
echo "🚀 Quick Browser Preview for Cursor IDE"

# Check if server is running and get the port
if curl -s http://localhost:8081 > /dev/null; then
    URL="http://localhost:8081"
elif curl -s http://localhost:8082 > /dev/null; then
    URL="http://localhost:8082"
elif curl -s http://localhost:8083 > /dev/null; then
    URL="http://localhost:8083"
else
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
    URL="http://localhost:8081"
fi

echo "✅ Server running on: $URL"
echo ""
echo "🎯 Now use Simple Browser:"
echo "1. Press Ctrl+Shift+P"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Paste this URL: $URL"
echo "4. Press Enter"
echo ""
echo "🎨 Your Skybox Gamehub with new colors will open!"

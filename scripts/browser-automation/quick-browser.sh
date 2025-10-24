#!/bin/bash

# Quick Browser Preview - Always uses port 8081
echo "🚀 Quick Browser Preview for Skybox Gamehub"
echo "=========================================="

# Check if server is running on port 8081
if curl -s http://localhost:8081 > /dev/null; then
    echo "✅ Server is running on http://localhost:8081"
else
    echo "⚠️  Server not running. Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    ./start-dev-server.sh &
    sleep 3
fi

echo ""
echo "🎯 Now use Simple Browser:"
echo "1. Press Ctrl+Shift+P"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Paste: http://localhost:8081"
echo "4. Press Enter"
echo ""
echo "🎨 Your Skybox Gamehub with new colors will open!"
echo "🌐 URL: http://localhost:8081"

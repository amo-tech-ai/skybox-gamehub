#!/bin/bash

# Open the correct port (8082) for browser preview
echo "🚀 Opening Skybox Gamehub on Correct Port"
echo "========================================"

# Check which port is actually running
if curl -s http://localhost:8081 > /dev/null; then
    URL="http://localhost:8081"
    echo "✅ Server running on port 8081"
elif curl -s http://localhost:8082 > /dev/null; then
    URL="http://localhost:8082"
    echo "✅ Server running on port 8082"
elif curl -s http://localhost:8083 > /dev/null; then
    URL="http://localhost:8083"
    echo "✅ Server running on port 8083"
else
    echo "⚠️  No server found on ports 8081-8083"
    echo "Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    ./start-dev-server.sh &
    sleep 3
    URL="http://localhost:8081"
fi

echo ""
echo "🎯 Now use Simple Browser:"
echo "1. Press Ctrl+Shift+P"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Paste: $URL"
echo "4. Press Enter"
echo ""
echo "🎨 Your Skybox Gamehub with updated colors will open!"
echo "🌐 URL: $URL"

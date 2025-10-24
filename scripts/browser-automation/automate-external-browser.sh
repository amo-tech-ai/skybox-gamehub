#!/bin/bash

# External browser automation with live reload
echo "🚀 Automating external browser..."

# Check if server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
fi

# Open browser with live reload
echo "🌐 Opening browser with live reload..."
xdg-open http://localhost:8081 2>/dev/null || firefox http://localhost:8081 2>/dev/null || google-chrome http://localhost:8081 2>/dev/null

echo "✅ External browser automation complete"
echo "🎨 Your Skybox Gamehub with new colors is now open!"

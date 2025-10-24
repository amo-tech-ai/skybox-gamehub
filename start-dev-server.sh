#!/bin/bash

# Start Development Server on Fixed Port 8081
echo "🚀 Starting Skybox Gamehub Development Server"
echo "============================================="

# Kill any existing processes on port 8081
echo "🔄 Checking for existing processes on port 8081..."
if lsof -ti:8081 > /dev/null 2>&1; then
    echo "⚠️  Port 8081 is in use. Stopping existing processes..."
    lsof -ti:8081 | xargs kill -9 2>/dev/null || true
    sleep 2
fi

# Start the development server
echo "🎯 Starting development server on port 8081..."
cd /home/sk/skybox/skybox-gamehub
npm run dev

echo ""
echo "✅ Development server started!"
echo "🌐 URL: http://localhost:8081"
echo ""
echo "🎯 To open in Cursor IDE:"
echo "1. Press Ctrl+Shift+P"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Paste: http://localhost:8081"
echo "4. Press Enter"
echo ""
echo "🎨 Your Skybox Gamehub with new colors will open!"

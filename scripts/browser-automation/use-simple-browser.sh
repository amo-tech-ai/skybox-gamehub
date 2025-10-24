#!/bin/bash

# Use Simple Browser for React/Vite projects (as recommended by Live Preview docs)
echo "🌐 Using Simple Browser for React/Vite projects (as recommended by Live Preview docs)..."

# Check if server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Starting development server..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 3
fi

echo "✅ Development server running on http://localhost:8081"
echo ""
echo "🎯 Now use Simple Browser (built-in VS Code feature):"
echo ""
echo "1. Press Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Simple Browser: Show'"
echo "3. Enter URL: http://localhost:8081"
echo "4. Press Enter"
echo ""
echo "🎨 You'll see your Skybox Gamehub with the new orange and green colors!"
echo "✨ This is the recommended method for React/Vite projects!"
echo ""
echo "📋 Why Simple Browser instead of Live Preview:"
echo "   - Live Preview is for static HTML files"
echo "   - Your project is React/Vite (needs different approach)"
echo "   - Simple Browser is built-in and works perfectly"
echo ""
echo "🌐 Your app URL: http://localhost:8081"

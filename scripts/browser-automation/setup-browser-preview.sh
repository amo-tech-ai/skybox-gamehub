#!/bin/bash

# Skybox Gamehub - Browser Preview Setup Script
# This script automates the setup of browser preview in Cursor IDE

echo "🚀 Setting up Browser Preview for Skybox Gamehub..."

# Check if development server is running
if ! curl -s http://localhost:8081 > /dev/null; then
    echo "⚠️  Development server not running. Starting it now..."
    cd /home/sk/skybox/skybox-gamehub
    npm run dev &
    sleep 5
    echo "✅ Development server started on http://localhost:8081"
else
    echo "✅ Development server already running on http://localhost:8081"
fi

# Create a workspace settings file for Live Preview
mkdir -p /home/sk/skybox/skybox-gamehub/.vscode
cat > /home/sk/skybox/skybox-gamehub/.vscode/settings.json << 'EOF'
{
    "livePreview.defaultPreviewPath": "/",
    "livePreview.serverRoot": "/home/sk/skybox/skybox-gamehub",
    "livePreview.autoRefreshPreview": true,
    "livePreview.port": 8081,
    "livePreview.externalBrowser": false
}
EOF

echo "✅ Workspace settings configured for Live Preview"

# Create a launch configuration for easy browser preview
cat > /home/sk/skybox/skybox-gamehub/.vscode/launch.json << 'EOF'
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch Skybox Gamehub Preview",
            "type": "livePreview",
            "request": "launch",
            "url": "http://localhost:8081",
            "webRoot": "${workspaceFolder}"
        }
    ]
}
EOF

echo "✅ Launch configuration created"

# Create a tasks.json for automated server management
cat > /home/sk/skybox/skybox-gamehub/.vscode/tasks.json << 'EOF'
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Start Dev Server",
            "type": "shell",
            "command": "npm",
            "args": ["run", "dev"],
            "group": "build",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "new"
            },
            "isBackground": true,
            "problemMatcher": {
                "owner": "vite",
                "pattern": {
                    "regexp": "^(.*)$",
                    "line": 1
                },
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": ".*VITE.*ready.*",
                    "endsPattern": ".*Local:.*"
                }
            }
        },
        {
            "label": "Open Browser Preview",
            "type": "shell",
            "command": "cursor",
            "args": ["--command", "livePreview.start"],
            "group": "build",
            "dependsOn": "Start Dev Server"
        }
    ]
}
EOF

echo "✅ Tasks configuration created"

echo ""
echo "🎯 Setup Complete! Here's how to use it:"
echo ""
echo "1. Open Command Palette: Ctrl+Shift+P (Windows/Linux) or Cmd+Shift+P (Mac)"
echo "2. Type: 'Live Preview: Show Preview'"
echo "3. Or use: 'Live Preview: Start Server'"
echo "4. Your app will open in the middle window with live reload!"
echo ""
echo "🌐 Your Skybox Gamehub is available at: http://localhost:8081"
echo "🎨 New orange and green color scheme is live!"
echo ""
echo "📋 Quick Commands:"
echo "   - Live Preview: Show Preview"
echo "   - Live Preview: Start Server"
echo "   - Live Preview: Stop Server"
echo "   - Live Preview: Show Debug Preview (for debugging)"
echo ""
echo "✨ Enjoy your new browser preview setup!"


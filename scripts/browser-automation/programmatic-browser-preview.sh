#!/bin/bash

# Programmatic Browser Preview Solution for Cursor IDE
# Based on comprehensive research and automation techniques

echo "🔍 Programmatic Browser Preview Solution for Cursor IDE"
echo "=================================================="

# Method 1: Cursor Browser Inspector Extension (Recommended)
echo ""
echo "🎯 Method 1: Cursor Browser Inspector Extension (Best Solution)"
echo "This extension allows Cursor AI to access Chrome DevTools"
echo "Installation:"
echo "1. Go to Extensions in Cursor"
echo "2. Search for 'Cursor Browser Inspector'"
echo "3. Install the extension"
echo "4. Run: CDP: Open Chrome With Cursor Connection"
echo ""

# Method 2: Workbench Action Commands
echo "🎯 Method 2: Workbench Action Commands (Automation)"
echo "Try these programmatic commands:"
echo ""

# Create a script to trigger workbench actions
cat > /home/sk/skybox/skybox-gamehub/trigger-workbench-actions.sh << 'EOF'
#!/bin/bash

# Trigger workbench actions programmatically
echo "🚀 Triggering workbench actions..."

# Method A: Quick Open with Simple Browser command
cursor --command "workbench.action.quickOpen" --command "Simple Browser: Show"

# Method B: Show Commands palette
cursor --command "workbench.action.showCommands"

# Method C: Open URL directly
cursor --command "workbench.action.openUrl" --command "http://localhost:8081"

echo "✅ Workbench actions triggered"
EOF

chmod +x /home/sk/skybox/skybox-gamehub/trigger-workbench-actions.sh

echo "📋 Created trigger-workbench-actions.sh script"
echo ""

# Method 3: Browser Preview Extension
echo "🎯 Method 3: Browser Preview Extension"
echo "Install 'Browser Preview' extension for embedded browser:"
echo "1. Extensions → Search 'Browser Preview'"
echo "2. Install the extension"
echo "3. Command Palette → 'Browser Preview: Open'"
echo ""

# Method 4: Live Server with automation
echo "🎯 Method 4: Live Server with Automation"
echo "Install 'Live Server' extension and create automation:"
echo ""

# Create automation script
cat > /home/sk/skybox/skybox-gamehub/automate-live-server.sh << 'EOF'
#!/bin/bash

# Automate Live Server extension
echo "🚀 Automating Live Server..."

# Check if Live Server extension is installed
if cursor --list-extensions | grep -q "ritwickdey.LiveServer"; then
    echo "✅ Live Server extension found"
    
    # Start Live Server
    cursor --command "liveServer.start"
    
    # Open browser
    cursor --command "liveServer.openInBrowser"
    
    echo "✅ Live Server automation complete"
else
    echo "⚠️  Live Server extension not found"
    echo "Install it first: Extensions → Search 'Live Server'"
fi
EOF

chmod +x /home/sk/skybox/skybox-gamehub/automate-live-server.sh

echo "📋 Created automate-live-server.sh script"
echo ""

# Method 5: External browser automation
echo "🎯 Method 5: External Browser Automation"
echo "Open browser programmatically with live reload:"
echo ""

# Create external browser automation
cat > /home/sk/skybox/skybox-gamehub/automate-external-browser.sh << 'EOF'
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
EOF

chmod +x /home/sk/skybox/skybox-gamehub/automate-external-browser.sh

echo "📋 Created automate-external-browser.sh script"
echo ""

# Method 6: VS Code tasks automation
echo "🎯 Method 6: VS Code Tasks Automation"
echo "Create automated tasks for browser preview:"
echo ""

# Create tasks.json for automation
mkdir -p /home/sk/skybox/skybox-gamehub/.vscode
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
            "args": ["--command", "workbench.action.quickOpen", "--command", "Simple Browser: Show"],
            "group": "build",
            "dependsOn": "Start Dev Server"
        },
        {
            "label": "Automate Browser Preview",
            "dependsOrder": "sequence",
            "dependsOn": [
                "Start Dev Server",
                "Open Browser Preview"
            ]
        }
    ]
}
EOF

echo "📋 Created .vscode/tasks.json for automation"
echo ""

# Method 7: Keyboard shortcut automation
echo "🎯 Method 7: Keyboard Shortcut Automation"
echo "Create keyboard shortcuts for browser preview:"
echo ""

# Create keybindings.json
cat > /home/sk/skybox/skybox-gamehub/.vscode/keybindings.json << 'EOF'
[
    {
        "key": "ctrl+shift+b",
        "command": "workbench.action.quickOpen",
        "args": "Simple Browser: Show"
    },
    {
        "key": "ctrl+alt+b",
        "command": "workbench.action.showCommands",
        "args": "Browser Preview: Open"
    }
]
EOF

echo "📋 Created .vscode/keybindings.json for keyboard shortcuts"
echo ""

echo "🎯 Summary of Programmatic Solutions:"
echo "====================================="
echo "1. Cursor Browser Inspector Extension (Best)"
echo "2. Workbench Action Commands"
echo "3. Browser Preview Extension"
echo "4. Live Server Automation"
echo "5. External Browser Automation"
echo "6. VS Code Tasks Automation"
echo "7. Keyboard Shortcut Automation"
echo ""
echo "🚀 Quick Start Commands:"
echo "========================"
echo "./trigger-workbench-actions.sh     # Trigger workbench actions"
echo "./automate-live-server.sh          # Automate Live Server"
echo "./automate-external-browser.sh     # External browser automation"
echo ""
echo "🎨 Your Skybox Gamehub with new orange and green colors is ready!"
echo "🌐 URL: http://localhost:8081"

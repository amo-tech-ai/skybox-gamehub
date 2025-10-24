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

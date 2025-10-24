#!/bin/bash

# Automate Live Server extension
echo "🚀 Automating Live Server..."

# Check if Live Server extension is installed
if cursor --list-extensions | grep -q "ritwickdey.liveserver"; then
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

# Browser Automation Scripts

This folder contains various scripts for automating browser preview functionality in Cursor IDE for the Skybox Gamehub project.

## 📁 Scripts Overview

### 🚀 Quick Start Scripts
- **`use-simple-browser.sh`** - **RECOMMENDED** - Uses built-in Simple Browser (best for React/Vite)
- **`quick-browser.sh`** - Quick browser preview with port detection
- **`quick-browser-preview.sh`** - Quick preview with automatic port detection

### 🔧 Setup & Configuration
- **`setup-browser-preview.sh`** - Complete setup for Live Preview extension
- **`programmatic-browser-preview.sh`** - Comprehensive automation solutions

### 🎯 Live Preview Scripts
- **`automate-live-server.sh`** - Automates Live Server extension
- **`launch-preview.sh`** - Launches Live Preview in Cursor
- **`trigger-preview.sh`** - Triggers Live Preview in existing Cursor window
- **`open-preview.sh`** - Opens Live Preview programmatically

### 🌐 External Browser Scripts
- **`automate-external-browser.sh`** - Opens external browser with live reload
- **`open-browser-direct.sh`** - Direct browser opening methods
- **`open-correct-port.sh`** - Port detection and browser opening

### ⚙️ Workbench Automation
- **`trigger-workbench-actions.sh`** - Triggers Cursor workbench actions

## 🎯 Recommended Usage

### For React/Vite Projects (Recommended)
```bash
./use-simple-browser.sh
```
Then in Cursor:
1. Press `Ctrl+Shift+P`
2. Type: `Simple Browser: Show`
3. Enter: `http://localhost:8081`

### For Live Preview Extension
```bash
./setup-browser-preview.sh
```
Then in Cursor:
1. Press `Ctrl+Shift+P`
2. Type: `Live Preview: Show Preview`

### For External Browser
```bash
./automate-external-browser.sh
```

## 📋 Prerequisites

- Development server running on `http://localhost:8081`
- Cursor IDE with appropriate extensions
- Bash shell environment

## 🔧 Server Management

All scripts automatically check if the development server is running and start it if needed.

## 📝 Notes

- **Simple Browser** is recommended for React/Vite projects
- **Live Preview** is better for static HTML files
- **External Browser** provides full browser functionality
- All scripts include error handling and user guidance

## 🎨 Features

- Automatic server detection and startup
- Port detection (8081, 8082, 8083)
- Live reload support
- Error handling and user guidance
- Multiple browser automation methods
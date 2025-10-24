# Live Preview Extension Troubleshooting Guide

## 🎯 **Why You Don't See the Preview Button**

Based on the [Live Preview extension documentation](https://marketplace.visualstudio.com/items?itemName=ms-vscode.live-server), here are the most common reasons and solutions:

### **1. File Type Requirements**
The preview button only appears for:
- ✅ **HTML files** (`.html`)
- ✅ **Static web files**
- ❌ **NOT for React/Vue/Angular projects** (like your Vite project)

### **2. Extension Status Check**
```bash
# Check if extension is installed
cursor --list-extensions | grep live
```

### **3. Manual Preview Methods**

#### **Method A: Command Palette**
1. Open Command Palette: `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
2. Type: `Live Preview: Show Preview`
3. Or type: `Live Preview: Start Server`

#### **Method B: Context Menu**
1. Right-click on an HTML file
2. Look for "Open with Live Preview" option

#### **Method C: HTML File Test**
1. Open the `test-preview.html` file I created
2. Look for the preview button in the top-right corner
3. The button should appear as a small browser icon

### **4. Alternative Solutions for React/Vite Projects**

Since your project is a React/Vite application, the Live Preview extension is designed for static HTML files, not React apps. Here are better alternatives:

#### **Option 1: Use Simple Browser (Built-in)**
1. Command Palette: `Ctrl+Shift+P`
2. Type: `Simple Browser: Show`
3. Enter URL: `http://localhost:8081`

#### **Option 2: External Browser with Live Reload**
Your Vite development server already provides live reload:
```bash
npm run dev
# Then open http://localhost:8081 in your browser
```

#### **Option 3: VS Code Live Server Extension**
Install the "Live Server" extension (different from Live Preview):
```bash
cursor --install-extension ritwickdey.LiveServer
```

### **5. Cursor IDE Specific Issues**

Cursor IDE is based on VS Code but may have compatibility issues with some extensions. Try:

1. **Restart Cursor IDE** completely
2. **Reload Window**: `Ctrl+Shift+P` → "Developer: Reload Window"
3. **Check Extension Settings**: Go to Extensions → Live Preview → Settings

### **6. Test the Preview Button**

1. Open the `test-preview.html` file I created
2. Look for a small browser icon in the top-right corner of the editor
3. Click it to open the preview
4. You should see the orange and green color scheme

### **7. Alternative Browser Preview Solutions**

#### **Five Server Extension**
```bash
cursor --install-extension yandeu.five-server
```

#### **Browser Preview Extension**
```bash
cursor --install-extension auchenberg.vscode-browser-preview
```

## 🎨 **Your Color Scheme is Ready**

Your Skybox Gamehub with the new orange and green color scheme is running at:
- **URL**: `http://localhost:8081`
- **Primary Orange**: `#FF6B35`
- **Accent Green**: `#2D7A3D`

## 📋 **Quick Commands to Try**

1. `Simple Browser: Show` - Built-in browser
2. `Live Preview: Show Preview` - Live Preview extension
3. `Live Preview: Start Server` - Start preview server
4. `Browser Preview: Open` - Alternative browser extension

## 🔧 **If Nothing Works**

The most reliable solution for React/Vite projects is:
1. Keep your development server running (`npm run dev`)
2. Use your system browser to view `http://localhost:8081`
3. The live reload will automatically refresh when you make changes

Your new orange and green color scheme is working perfectly! 🎉

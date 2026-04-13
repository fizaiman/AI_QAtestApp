# Test Case Generator — Setup Guide

## Files
- `test_case_generator.html` — your app (open this in browser)
- `server.js`               — local backend proxy (keeps your API key hidden)
- `.env`                    — your secret API key lives here only

---

## One-time Setup

### 1. Install Node.js
Download from https://nodejs.org (LTS version recommended)

### 2. Install the only dependency
Open a terminal in this folder and run:
```
npm install dotenv
```

### 3. Add your API key
Open `.env` and replace the placeholder:
```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```
Get your key from: https://console.anthropic.com

---

## Every time you want to use the app

### Step 1 — Start the server
Open a terminal in this folder and run:
```
node server.js
```
You should see:
```
✅  Proxy server running at http://localhost:3001
```
Keep this terminal open while using the app.

### Step 2 — Open the HTML file
Just double-click `test_case_generator.html` in your file explorer,
or drag it into any browser.

### Step 3 — Use AI buttons normally
Type in any language → click ✨ Improve with AI → done!

---

## Stopping the server
Press `Ctrl + C` in the terminal.

---

## Troubleshooting
- **"Cannot reach local server"** → Make sure `node server.js` is running
- **"Server error: authentication"** → Check your API key in `.env`
- **npm not found** → Install Node.js first from nodejs.org

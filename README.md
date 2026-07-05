# npmx Redirector (Monorepo Workspace)

A high-performance Manifest V3 browser extension that automatically redirects `npmjs.com` package pages to `npmx.dev` (supporting both unscoped and scoped packages, while preserving version, subpaths, and query strings).

This repository is structured as a **pnpm workspace monorepo** containing separate versions optimized for Google Chrome and Mozilla Firefox.

---

## 👥 Author Information
*   **Author:** Santos Vilanculos <santosvilanculos@yahoo.com>
*   **Homepage:** [github.com/santosvilanculos/hauberk](https://github.com/santosvilanculos/hauberk)
*   **Bugs/Issues:** [github.com/santosvilanculos/hauberk/issues](https://github.com/santosvilanculos/hauberk/issues)
*   **License:** MIT

---

## 📂 Project Structure

```
hauberk/
├── packages/
│   ├── chrome/            # Chrome Extension Workspace
│   │   ├── manifest.json  # Manifest V3 (Chrome specific)
│   │   ├── rules.json     # Redirect filters
│   │   ├── background.js  # Service Worker
│   │   ├── popup.html     # Extension Panel UI
│   │   ├── popup.css      # Custom Dark/Glass styling
│   │   ├── popup.js       # Popup UI interactions
│   │   └── icons/         # HD vector icon
│   └── firefox/           # Firefox Extension Workspace
│       ├── manifest.json  # Manifest V3 (Firefox specific with ID & scripts background)
│       ├── rules.json
│       ├── background.js
│       ├── popup.html
│       ├── popup.css
│       ├── popup.js
│       └── icons/
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

## 🛠️ Workspaces & File Links

### 🌐 Google Chrome Package
*   **[Chrome package.json](file:///home/santosvilanculos/Code/hauberk/packages/chrome/package.json)**
*   **[Chrome manifest.json](file:///home/santosvilanculos/Code/hauberk/packages/chrome/manifest.json)**
*   **[Chrome background.js](file:///home/santosvilanculos/Code/hauberk/packages/chrome/background.js)**
*   **[Chrome popup.html](file:///home/santosvilanculos/Code/hauberk/packages/chrome/popup.html)**
*   **[Chrome popup.css](file:///home/santosvilanculos/Code/hauberk/packages/chrome/popup.css)**
*   **[Chrome popup.js](file:///home/santosvilanculos/Code/hauberk/packages/chrome/popup.js)**

### 🦊 Mozilla Firefox Package
*   **[Firefox package.json](file:///home/santosvilanculos/Code/hauberk/packages/firefox/package.json)**
*   **[Firefox manifest.json](file:///home/santosvilanculos/Code/hauberk/packages/firefox/manifest.json)**
*   **[Firefox background.js](file:///home/santosvilanculos/Code/hauberk/packages/firefox/background.js)**
*   **[Firefox popup.html](file:///home/santosvilanculos/Code/hauberk/packages/firefox/popup.html)**
*   **[Firefox popup.css](file:///home/santosvilanculos/Code/hauberk/packages/firefox/popup.css)**
*   **[Firefox popup.js](file:///home/santosvilanculos/Code/hauberk/packages/firefox/popup.js)**

---

## 🚀 Building / Packaging

To compile distribution `.zip` archives directly to the workspace root:

```bash
# Zip only Chrome extension
pnpm run zip:chrome

# Zip only Firefox extension
pnpm run zip:firefox

# Zip all extensions
pnpm run zip:all
```

The resulting zip files will be named:
*   `npmx-redirector-chrome.zip`
*   `npmx-redirector-firefox.zip`

---

## ⚙️ Installation in Chrome/Firefox

### Google Chrome
1.  Navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (top-right).
3.  Click **Load unpacked** (top-left) and select `packages/chrome`.

### Mozilla Firefox
1.  Navigate to `about:debugging#/runtime/this-firefox`.
2.  Click **Load Temporary Add-on...**.
3.  Select any file (e.g. `manifest.json`) in `packages/firefox`.

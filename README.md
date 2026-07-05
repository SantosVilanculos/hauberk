# npmx Redirector Chrome Extension

A clean, high-performance, and beautifully styled Manifest V3 Chrome Extension that automatically redirects package page links on `npmjs.com` to `npmx.dev`.

It supports both unscoped (e.g., `https://www.npmjs.com/package/immer` -> `https://npmx.dev/package/immer`) and scoped packages (e.g., `https://www.npmjs.com/package/@inertiajs/vite` -> `https://npmx.dev/package/@inertiajs/vite`), preserving tabs, versions, query parameters, and hashes.

---

## 🚀 Key Features

*   **declarativeNetRequest API:** Built on Chrome's modern Declarative Net Request system, performing redirects instantly at the browser routing level, avoiding unnecessary javascript background processes and keeping memory usage near zero.
*   **Stats Tracking:** Visualizes total redirects processed using a minimal, lightweight navigation monitor.
*   **Premium Glassmorphic Design:** The popup is built using a dark theme with smooth gradients, responsive toggles, hover effects, and CSS micro-animations.
*   **One-Click Switch:** Instantly toggle the redirection functionality on and off with a single tap.

---

## 🛠️ Project Files

*   **[manifest.json](file:///home/santosvilanculos/Code/hauberk/manifest.json):** The core extension definition.
*   **[rules.json](file:///home/santosvilanculos/Code/hauberk/rules.json):** Ruleset configuring the pattern mapping to `npmx.dev`.
*   **[background.js](file:///home/santosvilanculos/Code/hauberk/background.js):** Manages dynamic ruleset activation states and tracks redirect counters.
*   **[popup.html](file:///home/santosvilanculos/Code/hauberk/popup.html):** The markup structure of the interactive controls.
*   **[popup.css](file:///home/santosvilanculos/Code/hauberk/popup.css):** Glassmorphic layout, modern CSS variables, color scheme, and typography.
*   **[popup.js](file:///home/santosvilanculos/Code/hauberk/popup.js):** Handles toggle logic, storage state synchronization, and smooth numerical animations.
*   **[icons/icon.svg](file:///home/santosvilanculos/Code/hauberk/icons/icon.svg):** High-definition vector graphics icon.

---

## 📦 How to Install (Developer Mode)

1.  Open Google Chrome and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** using the toggle switch in the top-right corner.
3.  Click the **Load unpacked** button in the top-left corner.
4.  Select this project directory (`/home/santosvilanculos/Code/hauberk`).
5.  The **npmx Redirector** extension is now installed and active!

---

## ⚙️ Packaging

To compile a `.zip` archive for distribution (such as uploading to the Chrome Web Store or sharing with colleagues), you can run:

```bash
pnpm run zip
```

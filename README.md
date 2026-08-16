# Startup Repair Store 🛠️🛍️

A professional **e-commerce style website** for a one-stop gadget care & trading brand:

- **Device Repair Services** — request an online repair, arrange courier delivery, or schedule a home pickup.
- **Accessories Store** — electronic accessories at very cheap prices with automatic **bulk pricing** tiers.

The UI mirrors the polish of major platforms like Flipkart and Amazon — built 100% with vanilla HTML, CSS and JavaScript (zero dependencies, no build step).

---

## ✨ Features

### 🔧 Repair Service
- Three service modes, each with its own quick-action card:
  - **Online Repair Request** – chat with technicians, share photos, approve quotes.
  - **Courier Delivery** – free prepaid shipping label, Pan-India coverage.
  - **Home Pickup** – choose a 2-hour slot, doorstep collection & return.
- **4-step request wizard** (modal) with field validation & a progress stepper:
  Device & Issue → Service Mode → Contact → Review & Confirm.
- Success screen with a generated **ticket ID**.
- "Why us" strip, 4-step *How it works*, and a transparent price-indicator table.
- 6-month repair warranty, free diagnostics, genuine parts.

### 🛍️ Accessories Store
- 17 products across 6 categories (Chargers & Cables, Audio, Covers & Cases, Power Banks, Screen Guards, Smart Gadgets).
- **Live filters**: category tabs, in-store search, and sorting (popular / price / discount).
- Product cards with ratings, MRP strikethrough, discount badges and **bulk-tier chips** (e.g. "Buy 10+ → ₹99 each").
- Working **cart drawer** with quantity steppers that **auto-apply bulk pricing** at the threshold quantity and shows total savings.
- Checkout simulation with toast notifications.

### 🎨 UI / UX
- Flipkart-style **blue + amber** design system with CSS variables.
- Fully **responsive** (desktop → tablet → mobile) with a collapsible mobile menu.
- Toasts, back-to-top, scroll effects, announcement bar, testimonials, and a complete footer.

---

## 📁 Project structure

```
Startup_Repair_Store/
├── index.html              # Main page (header, hero, repair, store, footer)
├── 404.html                # Friendly not-found page
├── favicon.svg             # Site icon
├── manifest.webmanifest    # PWA metadata (name, theme, icon)
├── robots.txt              # Search-engine crawl rules
├── LICENSE                 # MIT license
├── README.md
├── .gitignore
├── css/
│   └── style.css           # Design system, components & media queries
├── js/
│   └── main.js             # Product data, filters, cart + bulk logic, repair wizard
├── scripts/
│   └── auto-sync.sh        # Watcher: auto-commit & auto-push to GitHub
└── assets/                 # (future) images, fonts, icons
```

---

## 🚀 Run locally

No dependencies to install. Any static file server works:

```bash
# Option 1 — Python (built-in)
cd Startup_Repair_Store
python3 -m http.server 8000
# → open http://localhost:8000

# Option 2 — Node
npx serve .
```

---

## 🛒 Bulk orders

For shops/resellers: use the **"Request Bulk Price List"** form inside the site, or contact the team at [hello@startuprepairstore.com](mailto:hello@startuprepairstore.com). Minimum bulk order ₹1,500 · GST invoice available. · COD available · Easy returns.

---

## 🔄 Auto-sync to GitHub

Any change saved in this folder is **automatically committed and pushed** to GitHub:

1. **Run the watcher once** (it stays alive in the background):
   ```bash
   chmod +x scripts/auto-sync.sh
   nohup scripts/auto-sync.sh > /tmp/auto_sync.log 2>&1 &
   ```
2. Edit `index.html`, `css/`, `js/`, or any file — within ~10 seconds it's pushed with a
   message like `Auto-sync: 2026-08-16 10:45:22`.
3. **Check it's alive:** `pgrep -af auto-sync.sh` · **See its log:** `tail -f /tmp/auto_sync.log`
4. **Stop it:** `pkill -f auto-sync.sh`

### Requirements for auto-push

- Git **push access** to `origin` must be non-interactive (no password prompt). The easiest way:
  ```bash
  git config --global credential.helper store   # cache credentials safely (file is chmod 600)
  git push origin main                          # log in once with your PAT; it is saved
  ```
- The watcher uses the same Git identity as your local repo (`user.name` / `user.email`).

---

*Demo UI built with love — no external frameworks, no external images.*
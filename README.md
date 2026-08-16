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
├── index.html      # All page sections (header, hero, repair, store, footer)
├── css/style.css   # Design system, components & media queries
├── js/main.js      # Product data, filters, cart + bulk logic, repair wizard
└── .gitignore
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

*Demo UI built with love — no external frameworks, no external images.*
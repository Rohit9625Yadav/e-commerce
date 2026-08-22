# Lumina | Modern Animated E-Commerce Platform

A feature-rich, high-performance, and responsive E-Commerce web platform built purely with **HTML5, CSS3, and Vanilla JavaScript** with micro-interactions, dark/light mode, full cart and checkout flows, and zero external backend requirements.

---

## ✨ Key Features

- 🎨 **Modern Design System & Themes**:
  - Full Light and Dark Mode toggle with seamless CSS transitions.
  - Glassmorphism header, sticky navigation, and modern typography.
  - Interactive micro-animations: Button ripple effects, card hover tilt/zoom, heart pulse, cart shake, floating badges.
- 📦 **Dynamic Product Catalog & Filtering**:
  - 12 curated products with multiple categories (Audio, Wearables, Smart Home, Fashion, Accessories).
  - Instant debounced search filtering across names, descriptions, and tags.
  - Category pill filter tabs and live price range slider ($50 – $400).
  - Multi-criteria sorting (Featured, Price: Low-to-High, Price: High-to-Low, Top Rated, New Arrivals).
  - Grid and List view switcher.
- 🛍️ **Slide-in Cart & Wishlist Drawers**:
  - Persistent storage (`localStorage`) for cart items and wishlist.
  - Real-time calculations for subtotal, dynamic 5% tax, and shipping.
  - Dynamic **Free Shipping Progress Meter** (orders over $150).
  - Promo coupon code engine (try `SAVE20`, `WELCOME10`, `FREESHIP`, `LUMINA50`).
- 🔍 **Interactive Quick View Modal**:
  - Multi-image gallery with clickable thumbnail selector.
  - Dynamic color swatches & size selector chips.
  - Quantity counter and direct "Add to Bag" action.
- 💳 **Multi-Step Checkout & Order Simulator**:
  - 3-step checkout flow (1. Shipping Info ➔ 2. Payment Method ➔ 3. Confirmation).
  - Form validation with credit card, Apple Pay, and PayPal support.
  - **Canvas Confetti Burst** upon successful order completion.
- 🚚 **Live Order Tracking**:
  - 4-stage tracking timeline (Order Placed ➔ Processing ➔ Shipped ➔ Delivered).
  - Order search lookup with tracking number and carrier details.
- 💱 **Multi-Currency Converter**:
  - Live price conversions for USD (`$`), EUR (`€`), GBP (`£`), and INR (`₹`).
- 🔔 **Custom Toast Notifications**:
  - Non-intrusive floating toast feedback system for all user interactions.

---

## 🚀 How to Run

1. Open the project folder:
   ```
   C:\Users\ry919\.gemini\antigravity\scratch\ecommerce-platform\
   ```
2. Simply double click or open **`index.html`** in any modern web browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, you can run a local development server:
   ```bash
   # Using Python
   python -m http.server 3000

   # Or using Node.js / npx
   npx serve
   ```

---

## 🎟️ Test Promo Coupons

| Coupon Code | Discount |
| :--- | :--- |
| **`SAVE20`** | 20% off entire order |
| **`WELCOME10`** | $10 off fixed discount |
| **`FREESHIP`** | Free express shipping |
| **`LUMINA50`** | 50% VIP discount |

---

## 📁 File Structure

```
ecommerce-platform/
│
├── index.html            # Main HTML document with semantic structure & modals
├── README.md             # Documentation & guide
│
├── css/
│   ├── style.css         # Design tokens, layout, cards, drawers, forms, responsive queries
│   └── animations.css    # Keyframes, micro-interactions, skeleton shimmer, transitions
│
└── js/
    ├── products.js       # Mock database of 12+ items, coupons, and currency rates
    └── app.js            # State management, filter engine, cart logic, checkout, confetti
```

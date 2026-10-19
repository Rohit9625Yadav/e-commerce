/**
 * Lumina Shop - Main Application Script
 * Full-featured modern e-commerce platform with state management, animations, and interactivity.
 */

// ==========================================
// 1. Global State
// ==========================================
const AppState = {
  products: PRODUCTS_DATA,
  cart: JSON.parse(localStorage.getItem("lumina_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("lumina_wishlist")) || [],
  theme: localStorage.getItem("lumina_theme") || "light",
  currency: localStorage.getItem("lumina_currency") || "USD",
  appliedCoupon: null,
  filters: {
    category: "all",
    search: "",
    maxPrice: 400,
    sortBy: "featured",
    viewMode: "grid"
  },
  currentQuickViewProduct: null,
  selectedColor: null,
  selectedSize: null,
  quickViewQty: 1,
  currentUser: JSON.parse(localStorage.getItem("lumina_user")) || null,
  orders: JSON.parse(localStorage.getItem("lumina_orders")) || [
    {
      id: "LUM-94821",
      date: "2026-08-18",
      status: "Shipped",
      step: 3,
      total: 249.99,
      items: ["Aura Sound Pro Wireless Headphones (1x)"],
      shippingAddress: "742 Evergreen Terrace, Springfield",
      carrier: "FedEx Express",
      trackingNumber: "FX-8392019482"
    }
  ]
};

// ==========================================
// 2. Utility & Formatters
// ==========================================
function formatPrice(usdAmount) {
  const curr = CURRENCIES[AppState.currency] || CURRENCIES.USD;
  const converted = usdAmount * curr.rate;
  if (AppState.currency === "INR") {
    return `${curr.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${curr.symbol}${converted.toFixed(2)}`;
}

function saveState() {
  localStorage.setItem("lumina_cart", JSON.stringify(AppState.cart));
  localStorage.setItem("lumina_wishlist", JSON.stringify(AppState.wishlist));
  localStorage.setItem("lumina_theme", AppState.theme);
  localStorage.setItem("lumina_currency", AppState.currency);
  localStorage.setItem("lumina_orders", JSON.stringify(AppState.orders));
  if (AppState.currentUser) {
    localStorage.setItem("lumina_user", JSON.stringify(AppState.currentUser));
  } else {
    localStorage.removeItem("lumina_user");
  }
}

// Toast Dispatcher
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconMap = {
    success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
    error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
    info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  };

  toast.innerHTML = `
    <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
    <div class="toast-msg">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ==========================================
// 3. Theme & Currency Setup
// ==========================================
function initTheme() {
  document.documentElement.setAttribute("data-theme", AppState.theme);
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) {
    updateThemeIcon(themeToggleBtn);
  }
}

function updateThemeIcon(btn) {
  if (AppState.theme === "dark") {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
    btn.setAttribute("title", "Switch to Light Mode");
  } else {
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute("title", "Switch to Dark Mode");
  }
}

function toggleTheme() {
  AppState.theme = AppState.theme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", AppState.theme);
  saveState();
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  if (themeToggleBtn) updateThemeIcon(themeToggleBtn);
  showToast(`Theme switched to ${AppState.theme} mode`, "info");
}

function changeCurrency(newCurrency) {
  if (CURRENCIES[newCurrency]) {
    AppState.currency = newCurrency;
    saveState();
    renderProducts();
    renderCartDrawer();
    renderWishlistDrawer();
    showToast(`Currency changed to ${CURRENCIES[newCurrency].label}`, "info");
  }
}

// ==========================================
// 4. Product Catalog & Filter Engine
// ==========================================
function getFilteredProducts() {
  let list = [...AppState.products];

  // Category Filter
  if (AppState.filters.category !== "all") {
    list = list.filter(p => p.category.toLowerCase() === AppState.filters.category.toLowerCase());
  }

  // Search Filter
  if (AppState.filters.search.trim()) {
    const q = AppState.filters.search.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  // Price Range Filter
  list = list.filter(p => p.price <= AppState.filters.maxPrice);

  // Sorting
  switch (AppState.filters.sortBy) {
    case "price-low":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "featured":
    default:
      list.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
      break;
  }

  return list;
}

function renderProducts() {
  const container = document.getElementById("products-container");
  const countEl = document.getElementById("products-count");
  if (!container) return;

  const filtered = getFilteredProducts();
  if (countEl) countEl.textContent = `${filtered.length} products found`;

  // Update Active Filter Bar
  renderActiveFilters();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-results animate-fade-in">
        <div class="empty-results-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">No matching products found</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">Try relaxing your filters or searching for different keywords.</p>
        <button class="btn btn-primary btn-sm" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.className = `products-grid ${AppState.filters.viewMode === "list" ? "list-view" : ""}`;

  container.innerHTML = filtered.map((p, idx) => {
    const isWishlisted = AppState.wishlist.includes(p.id);
    const badgeHtml = p.badge ? `
      <span class="badge ${p.isSale ? 'badge-sale' : p.isNew ? 'badge-new' : 'badge-trend'}">
        ${p.badge}
      </span>
    ` : '';

    const colorsHtml = p.colors && p.colors.length ? `
      <div class="color-swatches" title="${p.colors.map(c => c.name).join(', ')}">
        ${p.colors.slice(0, 4).map(c => `<span class="swatch-dot" style="background-color: ${c.hex};"></span>`).join('')}
        ${p.colors.length > 4 ? `<span style="font-size:0.7rem; color:var(--text-muted);">+${p.colors.length - 4}</span>` : ''}
      </div>
    ` : '';

    return `
      <article class="product-card animate-fade-in-up delay-${(idx % 4) + 1}" data-id="${p.id}">
        <div class="card-image-wrap">
          <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
          <div class="card-badges">
            ${badgeHtml}
          </div>
          <div class="card-actions">
            <button class="action-btn-circle ${isWishlisted ? 'is-wishlisted animate-heart-pulse' : ''}" 
                    title="Add to Wishlist" 
                    onclick="toggleWishlist('${p.id}', event)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
          <button class="quick-view-overlay-btn" onclick="openQuickView('${p.id}')">
            Quick View
          </button>
        </div>

        <div class="product-card-body">
          <span class="card-category">${p.categoryLabel}</span>
          <h3 class="card-title" onclick="openQuickView('${p.id}')">${p.name}</h3>
          
          <div class="card-rating">
            <span>★</span>
            <strong>${p.rating}</strong>
            <span>(${p.reviewsCount})</span>
          </div>

          ${colorsHtml}

          <div class="card-price-row">
            <span class="current-price">${formatPrice(p.price)}</span>
            ${p.originalPrice ? `<span class="original-price">${formatPrice(p.originalPrice)}</span>` : ''}
          </div>

          <button class="btn btn-add-cart" onclick="handleAddToCartClick('${p.id}', event)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderActiveFilters() {
  const bar = document.getElementById("active-filters-bar");
  if (!bar) return;

  const chips = [];

  if (AppState.filters.category !== "all") {
    chips.push(`
      <span class="filter-chip">
        Category: ${AppState.filters.category}
        <button onclick="setCategoryFilter('all')">&times;</button>
      </span>
    `);
  }

  if (AppState.filters.search) {
    chips.push(`
      <span class="filter-chip">
        Search: "${AppState.filters.search}"
        <button onclick="clearSearch()">&times;</button>
      </span>
    `);
  }

  if (AppState.filters.maxPrice < 400) {
    chips.push(`
      <span class="filter-chip">
        Under ${formatPrice(AppState.filters.maxPrice)}
        <button onclick="resetPriceFilter()">&times;</button>
      </span>
    `);
  }

  if (chips.length > 0) {
    bar.innerHTML = chips.join('') + `
      <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.6rem; font-size: 0.75rem;" onclick="resetFilters()">
        Clear All
      </button>
    `;
    bar.style.display = "flex";
  } else {
    bar.innerHTML = "";
    bar.style.display = "none";
  }
}

function setCategoryFilter(cat) {
  AppState.filters.category = cat;
  document.querySelectorAll(".cat-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });
  renderProducts();
}

function handleSearchInput(e) {
  AppState.filters.search = e.target.value;
  renderProducts();
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  AppState.filters.search = "";
  renderProducts();
}

function handlePriceChange(val) {
  AppState.filters.maxPrice = Number(val);
  const display = document.getElementById("price-slider-val");
  if (display) display.textContent = formatPrice(AppState.filters.maxPrice);
  renderProducts();
}

function resetPriceFilter() {
  const slider = document.getElementById("price-range-slider");
  if (slider) slider.value = 400;
  handlePriceChange(400);
}

function handleSortChange(val) {
  AppState.filters.sortBy = val;
  renderProducts();
}

function setViewMode(mode) {
  AppState.filters.viewMode = mode;
  document.getElementById("grid-view-btn")?.classList.toggle("active", mode === "grid");
  document.getElementById("list-view-btn")?.classList.toggle("active", mode === "list");
  renderProducts();
}

function resetFilters() {
  AppState.filters.category = "all";
  AppState.filters.search = "";
  AppState.filters.maxPrice = 400;
  AppState.filters.sortBy = "featured";

  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";
  const slider = document.getElementById("price-range-slider");
  if (slider) slider.value = 400;
  const sortSelect = document.getElementById("sort-select");
  if (sortSelect) sortSelect.value = "featured";

  document.querySelectorAll(".cat-tab-btn").forEach(b => b.classList.toggle("active", b.dataset.cat === "all"));
  renderProducts();
}

// ==========================================
// 5. Cart Drawer & Calculations
// ==========================================
function updateBadges() {
  const cartBadge = document.getElementById("cart-badge-count");
  const wishlistBadge = document.getElementById("wishlist-badge-count");
  const mobCartBadge = document.getElementById("mob-cart-count");
  const mobWishlistBadge = document.getElementById("mob-wishlist-count");

  const totalCartCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadge) {
    cartBadge.textContent = totalCartCount;
    cartBadge.style.display = totalCartCount > 0 ? "flex" : "none";
  }
  if (mobCartBadge) {
    mobCartBadge.textContent = totalCartCount;
    mobCartBadge.style.display = totalCartCount > 0 ? "flex" : "none";
  }

  if (wishlistBadge) {
    wishlistBadge.textContent = AppState.wishlist.length;
    wishlistBadge.style.display = AppState.wishlist.length > 0 ? "flex" : "none";
  }
  if (mobWishlistBadge) {
    mobWishlistBadge.textContent = AppState.wishlist.length;
    mobWishlistBadge.style.display = AppState.wishlist.length > 0 ? "flex" : "none";
  }
}

function handleAddToCartClick(productId, event) {
  if (event) {
    event.stopPropagation();
    // Button pulse animation
    const btn = event.currentTarget;
    btn.classList.add("btn-ripple");
    setTimeout(() => btn.classList.remove("btn-ripple"), 600);
  }
  addToCart(productId, 1);
}

function addToCart(productId, quantity = 1, color = null, size = null) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : null);
  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : null);

  const existingIndex = AppState.cart.findIndex(item => 
    item.productId === productId && item.color === chosenColor && item.size === chosenSize
  );

  if (existingIndex > -1) {
    AppState.cart[existingIndex].quantity += quantity;
  } else {
    AppState.cart.push({
      productId,
      quantity,
      color: chosenColor,
      size: chosenSize
    });
  }

  saveState();
  updateBadges();
  renderCartDrawer();
  
  // Cart badge bump animation
  const badge = document.getElementById("cart-btn");
  if (badge) {
    badge.classList.remove("animate-cart-bump");
    void badge.offsetWidth; // trigger reflow
    badge.classList.add("animate-cart-bump");
  }

  showToast(`Added <strong>${product.name}</strong> to your bag!`, "success");
}

function updateCartQuantity(index, delta) {
  if (AppState.cart[index]) {
    AppState.cart[index].quantity += delta;
    if (AppState.cart[index].quantity <= 0) {
      AppState.cart.splice(index, 1);
      showToast("Item removed from cart", "info");
    }
    saveState();
    updateBadges();
    renderCartDrawer();
  }
}

function removeCartItem(index) {
  AppState.cart.splice(index, 1);
  saveState();
  updateBadges();
  renderCartDrawer();
  showToast("Item removed from cart", "info");
}

function calculateCartTotals() {
  let subtotal = 0;

  AppState.cart.forEach(item => {
    const prod = AppState.products.find(p => p.id === item.productId);
    if (prod) {
      subtotal += prod.price * item.quantity;
    }
  });

  const freeShippingThreshold = 150;
  let shipping = subtotal > 0 ? (subtotal >= freeShippingThreshold ? 0 : 15.00) : 0;
  let discount = 0;

  if (AppState.appliedCoupon && COUPONS[AppState.appliedCoupon]) {
    const cp = COUPONS[AppState.appliedCoupon];
    if (cp.type === "percent") {
      discount = (subtotal * cp.value) / 100;
    } else if (cp.type === "fixed") {
      discount = Math.min(cp.value, subtotal);
    } else if (cp.type === "shipping") {
      shipping = 0;
    }
  }

  const tax = (subtotal - discount) > 0 ? (subtotal - discount) * 0.05 : 0;
  const total = Math.max(0, subtotal - discount + shipping + tax);

  return { subtotal, shipping, discount, tax, total, freeShippingThreshold };
}

function renderCartDrawer() {
  const body = document.getElementById("cart-drawer-body");
  const footer = document.getElementById("cart-drawer-footer");
  if (!body || !footer) return;

  if (AppState.cart.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem;">
        <div style="width:70px; height:70px; background:var(--primary-light); color:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
        </div>
        <h4 style="font-size:1.15rem; margin-bottom:0.5rem;">Your shopping bag is empty</h4>
        <p style="color:var(--text-secondary); font-size:0.875rem; margin-bottom:1.5rem;">Explore our curated selection and find something you love.</p>
        <button class="btn btn-primary btn-sm" onclick="toggleCartDrawer(false)">Start Shopping</button>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";
  const totals = calculateCartTotals();
  const progressPercent = Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100);
  const remainingForFree = Math.max(0, totals.freeShippingThreshold - totals.subtotal);

  const shippingMeterHtml = `
    <div class="shipping-meter-wrap">
      <div class="shipping-meter-text">
        ${remainingForFree === 0 
          ? `🎉 You've unlocked <strong>Free Express Shipping!</strong>` 
          : `Add <strong>${formatPrice(remainingForFree)}</strong> more to get <strong>Free Express Shipping</strong>`}
      </div>
      <div class="shipping-progress-bar">
        <div class="shipping-progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
    </div>
  `;

  const itemsHtml = AppState.cart.map((item, idx) => {
    const prod = AppState.products.find(p => p.id === item.productId);
    if (!prod) return '';

    const variantDetails = [item.color, item.size].filter(Boolean).join(" / ");

    return `
      <div class="cart-item animate-fade-in">
        <img src="${prod.images[0]}" alt="${prod.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4>${prod.name}</h4>
          ${variantDetails ? `<div class="cart-item-variant">${variantDetails}</div>` : ''}
          <div class="cart-item-price">${formatPrice(prod.price * item.quantity)}</div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">
          <button class="btn-remove-item" title="Remove item" onclick="removeCartItem(${idx})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateCartQuantity(${idx}, -1)">-</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" onclick="updateCartQuantity(${idx}, 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  body.innerHTML = `
    ${shippingMeterHtml}
    <div class="cart-items-list">
      ${itemsHtml}
    </div>
  `;

  footer.innerHTML = `
    <div class="coupon-box">
      <input type="text" id="coupon-input-field" class="coupon-input" placeholder="Promo code (e.g. SAVE20)" value="${AppState.appliedCoupon || ''}">
      <button class="btn btn-secondary btn-sm" onclick="handleApplyCoupon()">Apply</button>
    </div>
    ${AppState.appliedCoupon ? `
      <div style="font-size:0.8rem; color:var(--success); margin-bottom:0.75rem; display:flex; align-items:center; justify-content:space-between;">
        <span>✓ Coupon applied: <strong>${AppState.appliedCoupon}</strong></span>
        <button style="color:var(--danger); font-size:0.75rem; text-decoration:underline;" onclick="removeCoupon()">Remove</button>
      </div>
    ` : ''}

    <div class="summary-row">
      <span>Subtotal</span>
      <span>${formatPrice(totals.subtotal)}</span>
    </div>
    ${totals.discount > 0 ? `
      <div class="summary-row" style="color:var(--success);">
        <span>Discount</span>
        <span>-${formatPrice(totals.discount)}</span>
      </div>
    ` : ''}
    <div class="summary-row">
      <span>Shipping</span>
      <span>${totals.shipping === 0 ? '<strong style="color:var(--success);">FREE</strong>' : formatPrice(totals.shipping)}</span>
    </div>
    <div class="summary-row">
      <span>Estimated Tax (5%)</span>
      <span>${formatPrice(totals.tax)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span class="gradient-text">${formatPrice(totals.total)}</span>
    </div>

    <button class="btn btn-primary btn-block btn-lg" style="margin-top: 1.25rem;" onclick="openCheckoutModal()">
      Proceed to Checkout
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    </button>
  `;
}

function handleApplyCoupon() {
  const input = document.getElementById("coupon-input-field");
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (COUPONS[code]) {
    AppState.appliedCoupon = code;
    showToast(`Coupon <strong>${code}</strong> applied successfully!`, "success");
    renderCartDrawer();
  } else {
    showToast(`Invalid coupon code. Try <strong>SAVE20</strong> or <strong>WELCOME10</strong>`, "error");
  }
}

function removeCoupon() {
  AppState.appliedCoupon = null;
  showToast("Coupon removed", "info");
  renderCartDrawer();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cart-drawer-backdrop");
  if (drawer) {
    if (open) {
      renderCartDrawer();
      drawer.classList.add("is-open");
    } else {
      drawer.classList.remove("is-open");
    }
  }
}

function toggleMobileDrawer(open) {
  const drawer = document.getElementById("mobile-nav-backdrop");
  if (drawer) {
    if (open) {
      drawer.classList.add("is-open");
    } else {
      drawer.classList.remove("is-open");
    }
  }
}

// ==========================================
// 6. Wishlist Drawer & Operations
// ==========================================
function toggleWishlist(productId, event) {
  if (event) event.stopPropagation();

  const idx = AppState.wishlist.indexOf(productId);
  const prod = AppState.products.find(p => p.id === productId);

  if (idx > -1) {
    AppState.wishlist.splice(idx, 1);
    showToast(`Removed <strong>${prod ? prod.name : 'Item'}</strong> from wishlist`, "info");
  } else {
    AppState.wishlist.push(productId);
    showToast(`Saved <strong>${prod ? prod.name : 'Item'}</strong> to wishlist!`, "success");
  }

  saveState();
  updateBadges();
  renderProducts();
  renderWishlistDrawer();
}

function toggleWishlistDrawer(open) {
  const drawer = document.getElementById("wishlist-drawer-backdrop");
  if (drawer) {
    if (open) {
      renderWishlistDrawer();
      drawer.classList.add("is-open");
    } else {
      drawer.classList.remove("is-open");
    }
  }
}

function renderWishlistDrawer() {
  const body = document.getElementById("wishlist-drawer-body");
  const footer = document.getElementById("wishlist-drawer-footer");
  if (!body || !footer) return;

  if (AppState.wishlist.length === 0) {
    body.innerHTML = `
      <div style="text-align:center; padding: 3rem 1rem;">
        <div style="width:70px; height:70px; background:var(--primary-light); color:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.25rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
        <h4 style="font-size:1.15rem; margin-bottom:0.5rem;">Your wishlist is empty</h4>
        <p style="color:var(--text-secondary); font-size:0.875rem;">Click the heart icon on any product to save it here for later.</p>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";

  body.innerHTML = `
    <div class="cart-items-list">
      ${AppState.wishlist.map(id => {
        const prod = AppState.products.find(p => p.id === id);
        if (!prod) return '';
        return `
          <div class="cart-item animate-fade-in">
            <img src="${prod.images[0]}" alt="${prod.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h4>${prod.name}</h4>
              <div class="cart-item-price">${formatPrice(prod.price)}</div>
              <button class="btn btn-sm btn-outline" style="margin-top: 0.4rem; padding: 0.3rem 0.65rem;" onclick="addToCart('${prod.id}', 1); toggleWishlist('${prod.id}');">
                Move to Cart
              </button>
            </div>
            <button class="btn-remove-item" title="Remove" onclick="toggleWishlist('${prod.id}')">
              &times;
            </button>
          </div>
        `;
      }).join('')}
    </div>
  `;

  footer.innerHTML = `
    <button class="btn btn-primary btn-block" onclick="moveAllWishlistToCart()">
      Move All Items to Cart
    </button>
  `;
}

function moveAllWishlistToCart() {
  if (AppState.wishlist.length === 0) return;
  AppState.wishlist.forEach(id => {
    addToCart(id, 1);
  });
  AppState.wishlist = [];
  saveState();
  updateBadges();
  renderWishlistDrawer();
  renderProducts();
  showToast("All wishlist items moved to cart!", "success");
}

// ==========================================
// 7. Quick View Modal
// ==========================================
function openQuickView(productId) {
  const product = AppState.products.find(p => p.id === productId);
  if (!product) return;

  AppState.currentQuickViewProduct = product;
  AppState.selectedColor = product.colors && product.colors.length > 0 ? product.colors[0].name : null;
  AppState.selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
  AppState.quickViewQty = 1;

  const modal = document.getElementById("quick-view-modal");
  const modalContent = document.getElementById("quick-view-content");
  if (!modal || !modalContent) return;

  const badgeHtml = product.badge ? `<span class="badge ${product.isSale ? 'badge-sale' : 'badge-trend'}">${product.badge}</span>` : '';

  modalContent.innerHTML = `
    <div class="quick-view-grid animate-fade-in">
      <!-- Left: Gallery -->
      <div>
        <div class="qv-gallery-main">
          <img id="qv-active-img" src="${product.images[0]}" alt="${product.name}">
        </div>
        <div class="qv-thumbnails">
          ${product.images.map((img, i) => `
            <div class="qv-thumb ${i === 0 ? 'active' : ''}" onclick="changeQuickViewImg('${img}', this)">
              <img src="${img}" alt="Thumbnail">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: Details & Selectors -->
      <div class="qv-details">
        <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.4rem;">
          <span class="card-category">${product.categoryLabel}</span>
          ${badgeHtml}
        </div>
        <h3>${product.name}</h3>

        <div class="card-rating" style="margin-bottom:0.75rem;">
          <span>★</span>
          <strong>${product.rating}</strong>
          <span>(${product.reviewsCount} customer reviews)</span>
        </div>

        <div class="card-price-row" style="margin-bottom:1rem;">
          <span class="current-price" style="font-size:1.6rem;">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="original-price" style="font-size:1.1rem;">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <p style="color:var(--text-secondary); font-size:0.925rem; line-height:1.6; margin-bottom:1.25rem;">
          ${product.description}
        </p>

        <div class="qv-selectors">
          ${product.colors && product.colors.length > 0 ? `
            <div>
              <div class="selector-label">Color: <strong id="qv-selected-color-label">${AppState.selectedColor}</strong></div>
              <div class="color-options-group">
                ${product.colors.map((c, i) => `
                  <button class="color-chip-btn ${i === 0 ? 'active' : ''}" 
                          style="background-color: ${c.hex};" 
                          title="${c.name}" 
                          onclick="selectQuickViewColor('${c.name}', this)">
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${product.sizes && product.sizes.length > 0 ? `
            <div>
              <div class="selector-label">Size: <strong id="qv-selected-size-label">${AppState.selectedSize}</strong></div>
              <div class="size-options-group">
                ${product.sizes.map((s, i) => `
                  <button class="size-chip-btn ${i === 0 ? 'active' : ''}" 
                          onclick="selectQuickViewSize('${s}', this)">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Add To Cart & Actions Row -->
        <div style="display:flex; align-items:center; gap:1rem; margin-top:1.5rem; flex-wrap:wrap;">
          <div class="qty-counter" style="height:44px;">
            <button class="qty-btn" style="width:36px; height:44px;" onclick="changeQvQty(-1)">-</button>
            <span class="qty-val" id="qv-qty-val" style="min-width:36px; font-size:1rem;">1</span>
            <button class="qty-btn" style="width:36px; height:44px;" onclick="changeQvQty(1)">+</button>
          </div>

          <button class="btn btn-primary" style="flex:1; height:44px;" onclick="addQuickViewToCart()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Add to Bag
          </button>

          <button class="btn-icon" title="Save to Wishlist" onclick="toggleWishlist('${product.id}')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="${AppState.wishlist.includes(product.id) ? '#ef4444' : 'none'}" stroke="${AppState.wishlist.includes(product.id) ? '#ef4444' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>

        <!-- Key specs bullet highlights -->
        <div style="margin-top:1.75rem; border-top:1px solid var(--border-subtle); padding-top:1.25rem;">
          <h5 style="font-size:0.85rem; font-weight:700; margin-bottom:0.6rem; color:var(--text-primary);">Highlights</h5>
          <ul style="font-size:0.825rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.35rem;">
            ${product.features.slice(0, 3).map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
}

function changeQuickViewImg(src, thumbEl) {
  const activeImg = document.getElementById("qv-active-img");
  if (activeImg) activeImg.src = src;
  document.querySelectorAll(".qv-thumb").forEach(t => t.classList.remove("active"));
  if (thumbEl) thumbEl.classList.add("active");
}

function selectQuickViewColor(colorName, btn) {
  AppState.selectedColor = colorName;
  const label = document.getElementById("qv-selected-color-label");
  if (label) label.textContent = colorName;
  document.querySelectorAll(".color-chip-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function selectQuickViewSize(sizeName, btn) {
  AppState.selectedSize = sizeName;
  const label = document.getElementById("qv-selected-size-label");
  if (label) label.textContent = sizeName;
  document.querySelectorAll(".size-chip-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
}

function changeQvQty(delta) {
  AppState.quickViewQty = Math.max(1, AppState.quickViewQty + delta);
  const el = document.getElementById("qv-qty-val");
  if (el) el.textContent = AppState.quickViewQty;
}

function addQuickViewToCart() {
  if (!AppState.currentQuickViewProduct) return;
  addToCart(
    AppState.currentQuickViewProduct.id,
    AppState.quickViewQty,
    AppState.selectedColor,
    AppState.selectedSize
  );
  closeModal("quick-view-modal");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("is-open");
}

// ==========================================
// 8. Checkout Flow & Order Processing
// ==========================================
let checkoutCurrentStep = 1;

function openCheckoutModal() {
  toggleCartDrawer(false);
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  checkoutCurrentStep = 1;
  renderCheckoutStep(1);
  modal.classList.add("is-open");
}

function renderCheckoutStep(step) {
  checkoutCurrentStep = step;
  const content = document.getElementById("checkout-step-content");
  const totals = calculateCartTotals();

  // Update Stepper UI
  document.querySelectorAll(".step-item").forEach((el, i) => {
    const s = i + 1;
    el.classList.toggle("active", s === step);
    el.classList.toggle("done", s < step);
  });

  if (step === 1) {
    content.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:1.25rem;">1. Shipping & Contact Information</h3>
      <form id="shipping-form" onsubmit="handleShippingSubmit(event)" class="checkout-form-grid">
        <div class="form-group">
          <label class="form-label">First Name *</label>
          <input type="text" class="form-control" required placeholder="Alex" value="Alex">
        </div>
        <div class="form-group">
          <label class="form-label">Last Name *</label>
          <input type="text" class="form-control" required placeholder="Morgan" value="Morgan">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Email Address *</label>
          <input type="email" class="form-control" required placeholder="alex.morgan@example.com" value="alex.morgan@example.com">
        </div>
        <div class="form-group full-width">
          <label class="form-label">Street Address *</label>
          <input type="text" class="form-control" required placeholder="742 Evergreen Terrace" value="742 Evergreen Terrace">
        </div>
        <div class="form-group">
          <label class="form-label">City *</label>
          <input type="text" class="form-control" required placeholder="Springfield" value="Springfield">
        </div>
        <div class="form-group">
          <label class="form-label">Postal / ZIP Code *</label>
          <input type="text" class="form-control" required placeholder="97477" value="97477">
        </div>
        <div class="form-group full-width" style="margin-top: 1rem;">
          <button type="submit" class="btn btn-primary btn-block btn-lg">
            Continue to Payment (${formatPrice(totals.total)})
          </button>
        </div>
      </form>
    `;
  } else if (step === 2) {
    content.innerHTML = `
      <h3 style="font-size:1.3rem; font-weight:800; margin-bottom:1.25rem;">2. Payment Method</h3>
      <form id="payment-form" onsubmit="handlePaymentSubmit(event)">
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.75rem; margin-bottom:1.5rem;">
          <label style="border:2px solid var(--primary); background:var(--primary-light); border-radius:var(--radius-md); padding:0.75rem; text-align:center; cursor:pointer;">
            <input type="radio" name="payment-method" checked style="display:none;">
            <div style="font-weight:700; font-size:0.85rem; color:var(--primary);">Credit Card</div>
          </label>
          <label style="border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.75rem; text-align:center; cursor:pointer;">
            <input type="radio" name="payment-method" style="display:none;">
            <div style="font-weight:700; font-size:0.85rem; color:var(--text-secondary);">Apple Pay</div>
          </label>
          <label style="border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:0.75rem; text-align:center; cursor:pointer;">
            <input type="radio" name="payment-method" style="display:none;">
            <div style="font-weight:700; font-size:0.85rem; color:var(--text-secondary);">PayPal</div>
          </label>
        </div>

        <div class="checkout-form-grid">
          <div class="form-group full-width">
            <label class="form-label">Card Number *</label>
            <input type="text" class="form-control" required placeholder="4532 •••• •••• 8849" value="4532 8921 4402 8849">
          </div>
          <div class="form-group">
            <label class="form-label">Expiry Date *</label>
            <input type="text" class="form-control" required placeholder="MM/YY" value="08/29">
          </div>
          <div class="form-group">
            <label class="form-label">CVC / CVV *</label>
            <input type="text" class="form-control" required placeholder="•••" value="842">
          </div>
          <div class="form-group full-width" style="display:flex; gap:1rem; margin-top:1rem;">
            <button type="button" class="btn btn-secondary" onclick="renderCheckoutStep(1)">Back</button>
            <button type="submit" id="btn-submit-order" class="btn btn-primary btn-block btn-lg" style="flex:1;">
              Pay ${formatPrice(totals.total)}
            </button>
          </div>
        </div>
      </form>
    `;
  }
}

function handleShippingSubmit(e) {
  e.preventDefault();
  renderCheckoutStep(2);
}

function handlePaymentSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById("btn-submit-order");
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span style="display:inline-block; animation:spin 1s linear infinite;">⏳</span> Authorizing Payment...`;
  }

  setTimeout(() => {
    completeOrder();
  }, 1200);
}

function completeOrder() {
  const totals = calculateCartTotals();
  const orderId = `LUM-${Math.floor(10000 + Math.random() * 90000)}`;
  const orderItems = AppState.cart.map(item => {
    const prod = AppState.products.find(p => p.id === item.productId);
    return `${prod ? prod.name : 'Item'} (${item.quantity}x)`;
  });

  const newOrder = {
    id: orderId,
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    step: 2,
    total: totals.total,
    items: orderItems,
    shippingAddress: "742 Evergreen Terrace, Springfield",
    carrier: "FedEx Express Priority",
    trackingNumber: `FX-${Math.floor(1000000000 + Math.random() * 9000000000)}`
  };

  AppState.orders.unshift(newOrder);
  AppState.cart = [];
  AppState.appliedCoupon = null;
  saveState();
  updateBadges();

  closeModal("checkout-modal");
  openOrderSuccessModal(newOrder);
  launchConfetti();
}

function openOrderSuccessModal(order) {
  const modal = document.getElementById("order-success-modal");
  const content = document.getElementById("order-success-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="order-success-wrap animate-fade-in">
      <div class="success-icon-wrap animate-cart-bump">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <h3 style="font-size:1.8rem; font-weight:800; margin-bottom:0.5rem;">Thank You For Your Order!</h3>
      <p style="color:var(--text-secondary); font-size:0.95rem;">We've received your order and our team is already preparing your package.</p>
      
      <div class="order-badge-id">Order ID: #${order.id}</div>

      <div style="background:var(--bg-secondary); border-radius:var(--radius-md); padding:1.25rem; text-align:left; margin-bottom:1.5rem;">
        <div style="font-weight:700; font-size:0.875rem; margin-bottom:0.5rem;">Summary of Items:</div>
        <ul style="font-size:0.85rem; color:var(--text-secondary); padding-left:1.25rem; margin-bottom:0.75rem;">
          ${order.items.map(it => `<li>${it}</li>`).join('')}
        </ul>
        <div style="font-weight:800; font-size:1rem; color:var(--text-primary); border-top:1px solid var(--border-subtle); padding-top:0.5rem;">
          Amount Paid: <span class="gradient-text">${formatPrice(order.total)}</span>
        </div>
      </div>

      <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
        <button class="btn btn-primary" onclick="closeModal('order-success-modal'); openOrderTracker('${order.id}')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
          Track This Order
        </button>
        <button class="btn btn-secondary" onclick="closeModal('order-success-modal')">
          Continue Shopping
        </button>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
}

// ==========================================
// 9. Order Tracker Modal
// ==========================================
function openOrderTracker(orderId = null) {
  const modal = document.getElementById("order-tracker-modal");
  if (!modal) return;

  const targetId = orderId || (AppState.orders.length > 0 ? AppState.orders[0].id : "LUM-94821");
  renderOrderTrackerDetails(targetId);
  modal.classList.add("is-open");
}

function renderOrderTrackerDetails(orderId) {
  const content = document.getElementById("tracker-content");
  if (!content) return;

  const order = AppState.orders.find(o => o.id.toUpperCase() === orderId.toUpperCase()) || AppState.orders[0];

  if (!order) {
    content.innerHTML = `<p style="text-align:center; padding:2rem;">No orders found with ID: ${orderId}</p>`;
    return;
  }

  const steps = [
    { label: "Order Placed", desc: "Confirmed" },
    { label: "Processing", desc: "Packing & Quality Check" },
    { label: "Shipped", desc: "In Transit with Carrier" },
    { label: "Delivered", desc: "Arrived at Destination" }
  ];

  content.innerHTML = `
    <div style="padding: 2rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem; margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted); font-weight:700;">Live Package Tracker</span>
          <h3 style="font-size:1.5rem; font-weight:800;">Order #${order.id}</h3>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.85rem; color:var(--text-secondary);">Tracking Number:</div>
          <code style="font-weight:700; color:var(--primary); font-size:0.95rem;">${order.trackingNumber}</code>
        </div>
      </div>

      <!-- Stepper Line -->
      <div class="tracker-timeline">
        ${steps.map((st, i) => {
          const stepNum = i + 1;
          const isDone = stepNum < order.step;
          const isCurrent = stepNum === order.step;
          const statusClass = isDone ? 'completed' : isCurrent ? 'current' : '';
          return `
            <div class="tracker-step ${statusClass}">
              <div class="tracker-dot">
                ${isDone ? '✓' : stepNum}
              </div>
              <div style="font-size:0.85rem; font-weight:700; color:var(--text-primary);">${st.label}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); max-width:90px;">${st.desc}</div>
            </div>
          `;
        }).join('')}
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; background:var(--bg-secondary); border-radius:var(--radius-md); padding:1.25rem; margin-top:2rem;">
        <div>
          <div style="font-size:0.775rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Carrier Service</div>
          <div style="font-weight:700; font-size:0.95rem;">${order.carrier}</div>
        </div>
        <div>
          <div style="font-size:0.775rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Destination Address</div>
          <div style="font-weight:700; font-size:0.95rem;">${order.shippingAddress}</div>
        </div>
      </div>
    </div>
  `;
}

function handleOrderLookup(e) {
  e.preventDefault();
  const input = document.getElementById("order-lookup-input");
  if (input) {
    renderOrderTrackerDetails(input.value.trim());
  }
}

// ==========================================
// 10. Lightweight 60fps Canvas Confetti
// ==========================================
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      r: Math.random() * 6 + 3,
      d: Math.random() * 120,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.floor(Math.random() * 10) - 10,
      tiltAngle: 0,
      tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.5) * 18 - 5
    });
  }

  let animationFrame;
  let frameCount = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;

    particles.forEach((p) => {
      p.tiltAngle += p.tiltAngleIncremental;
      p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2 + p.vy;
      p.x += Math.sin(p.d) * 2 + p.vx;
      p.vy += 0.2; // gravity
      p.vx *= 0.98; // friction

      ctx.beginPath();
      ctx.lineWidth = p.r;
      ctx.strokeStyle = p.color;
      ctx.moveTo(p.x + p.tilt + p.r / 4, p.y);
      ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 4);
      ctx.stroke();
    });

    if (frameCount < 160) {
      animationFrame = requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  draw();
}

// ==========================================
// 11. Flash Sale Live Countdown Timer
// ==========================================
function initCountdownTimer() {
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-mins");
  const secsEl = document.getElementById("timer-secs");

  if (!hoursEl || !minsEl || !secsEl) return;

  // 18 hours, 45 mins countdown target from load
  let totalSeconds = (18 * 3600) + (45 * 60) + 20;

  setInterval(() => {
    if (totalSeconds <= 0) {
      totalSeconds = 24 * 3600;
    }
    totalSeconds--;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ==========================================
// 12. Scroll Reveal & Intersection Observer
// ==========================================
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-on-scroll");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ==========================================
// 13. Authentication System (Login / Gate)
// ==========================================
function checkAuthState() {
  const gateOverlay = document.getElementById("auth-gate-overlay");
  const displayName = document.getElementById("user-display-name");
  const avatarInitials = document.getElementById("user-avatar-initials");
  const dropdownEmail = document.getElementById("user-dropdown-email");

  // Keep auth modal hidden by default on refresh
  if (gateOverlay) {
    gateOverlay.classList.add("hidden-gate");
    gateOverlay.classList.remove("is-open", "show-gate");
    gateOverlay.style.display = "none";
  }

  if (AppState.currentUser) {
    if (displayName) displayName.textContent = AppState.currentUser.name.split(" ")[0];
    if (avatarInitials) avatarInitials.textContent = AppState.currentUser.name.charAt(0).toUpperCase();
    if (dropdownEmail) dropdownEmail.textContent = AppState.currentUser.email;
  } else {
    if (displayName) displayName.textContent = "Sign In";
    if (avatarInitials) avatarInitials.textContent = "U";
  }
}

function openAuthModal(tab = "login") {
  const gateOverlay = document.getElementById("auth-gate-overlay");
  if (!gateOverlay) return;
  switchAuthTab(tab);
  gateOverlay.classList.remove("hidden-gate");
  gateOverlay.classList.add("is-open", "show-gate");
  gateOverlay.style.display = "flex";
}

function closeAuthModal() {
  const gateOverlay = document.getElementById("auth-gate-overlay");
  if (!gateOverlay) return;
  gateOverlay.classList.add("hidden-gate");
  gateOverlay.classList.remove("is-open", "show-gate");
  gateOverlay.style.display = "none";
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const loginTab = document.getElementById("tab-login-btn");
  const signupTab = document.getElementById("tab-signup-btn");
  const subtitle = document.getElementById("auth-subtitle");

  if (tab === "login") {
    loginForm.style.display = "flex";
    signupForm.style.display = "none";
    loginTab.classList.add("active");
    signupTab.classList.remove("active");
    if (subtitle) subtitle.textContent = "Welcome back! Please login to continue shopping.";
  } else {
    loginForm.style.display = "none";
    signupForm.style.display = "flex";
    loginTab.classList.remove("active");
    signupTab.classList.add("active");
    if (subtitle) subtitle.textContent = "Join Lumina Club for exclusive access & member discounts.";
  }
}

function handleAuthLogin(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const name = email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  AppState.currentUser = {
    name: name || "Member",
    email: email
  };

  saveState();
  closeAuthModal();
  checkAuthState();
  showToast(`Welcome back, <strong>${AppState.currentUser.name}</strong>!`, "success");
}

function handleAuthSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();

  AppState.currentUser = {
    name: name || "New Member",
    email: email
  };

  saveState();
  closeAuthModal();
  checkAuthState();
  showToast(`Account created! Welcome to Lumina, <strong>${name}</strong>.`, "success");
}

function quickGuestLogin() {
  AppState.currentUser = {
    name: "Alex Morgan",
    email: "alex.morgan@lumina.shop"
  };
  saveState();
  closeAuthModal();
  checkAuthState();
  showToast("Logged in successfully as Demo Guest!", "success");
}

function handleLogout() {
  AppState.currentUser = null;
  saveState();
  const dropdown = document.getElementById("user-dropdown-menu");
  if (dropdown) dropdown.classList.remove("show");
  checkAuthState();
  showToast("You have been logged out.", "info");
}

function toggleUserDropdown() {
  if (!AppState.currentUser) {
    openAuthModal("login");
    return;
  }
  const dropdown = document.getElementById("user-dropdown-menu");
  if (dropdown) dropdown.classList.toggle("show");
}

// Close dropdown on outside click
window.addEventListener("click", (e) => {
  const profileContainer = document.getElementById("user-profile-btn");
  const dropdown = document.getElementById("user-dropdown-menu");
  if (profileContainer && dropdown && !profileContainer.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

// ==========================================
// 14. Application Bootstrap
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  checkAuthState();
  renderProducts();
  updateBadges();
  initCountdownTimer();
  initScrollReveal();

  // Price slider live readout
  const priceSlider = document.getElementById("price-range-slider");
  if (priceSlider) {
    priceSlider.value = AppState.filters.maxPrice;
    const display = document.getElementById("price-slider-val");
    if (display) display.textContent = formatPrice(AppState.filters.maxPrice);
  }

  // Currency select sync
  const currSelect = document.getElementById("currency-select");
  if (currSelect) currSelect.value = AppState.currency;

  // Keyboard accessibility: ESC closes open modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.is-open, .drawer-backdrop.is-open").forEach(el => {
        el.classList.remove("is-open");
      });
      const dropdown = document.getElementById("user-dropdown-menu");
      if (dropdown) dropdown.classList.remove("show");
    }
  });

  // Mobile menu drawer toggle & interactions
  const mobileToggle = document.getElementById("mobile-menu-toggle-btn");
  if (mobileToggle) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMobileDrawer(true);
    });
  }

  // ==========================================
  // Smart Scroll: Auto-hide header on scroll down, instant reveal on scroll up
  // ==========================================
  let lastScrollPosition = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
  let scrollTicking = false;
  const SCROLL_DELTA = 3; // Trigger reveal on even slight upward scroll

  function handleSmartHeaderScroll() {
    const currentScrollY = Math.max(0, window.pageYOffset || document.documentElement.scrollTop);
    const siteHeader = document.querySelector(".site-header");
    const bottomNav = document.getElementById("mobile-bottom-nav");
    
    // Check if any modal or drawer is currently active
    const isOverlayOpen = document.querySelector(".modal-overlay.is-open, .drawer-backdrop.is-open");

    if (!siteHeader) {
      scrollTicking = false;
      return;
    }

    // Do not hide when a drawer or modal is active
    if (isOverlayOpen) {
      scrollTicking = false;
      return;
    }

    // When near the top of the page, always show header
    if (currentScrollY <= 40) {
      siteHeader.classList.remove("header-hidden");
      siteHeader.classList.remove("header-scrolled");
      if (bottomNav) bottomNav.classList.remove("nav-hidden");
      lastScrollPosition = currentScrollY;
      scrollTicking = false;
      return;
    }

    // Add scrolled glass styling
    siteHeader.classList.add("header-scrolled");

    const scrollDifference = currentScrollY - lastScrollPosition;

    // Scrolling DOWN -> Hide menu bar smoothly
    if (scrollDifference > SCROLL_DELTA && currentScrollY > 70) {
      siteHeader.classList.add("header-hidden");
      if (bottomNav) bottomNav.classList.add("nav-hidden");
    }
    // Scrolling UP (even slightly!) -> Show menu bar immediately
    else if (scrollDifference < -SCROLL_DELTA) {
      siteHeader.classList.remove("header-hidden");
      if (bottomNav) bottomNav.classList.remove("nav-hidden");
    }

    lastScrollPosition = currentScrollY;
    scrollTicking = false;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(handleSmartHeaderScroll);
      scrollTicking = true;
    }
  }, { passive: true });
});

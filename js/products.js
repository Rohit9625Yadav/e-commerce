/**
 * Lumina Shop - Mock Product Database
 * Curated high quality e-commerce items across electronics, wearables, fashion, and lifestyle.
 */

const PRODUCTS_DATA = [
  {
    id: "lum-001",
    name: "Aura Sound Pro Wireless Headphones",
    category: "audio",
    categoryLabel: "Audio",
    price: 249.99,
    originalPrice: 329.99,
    rating: 4.9,
    reviewsCount: 328,
    isNew: false,
    isTrending: true,
    isSale: true,
    badge: "Best Seller",
    shortDesc: "Active Noise Cancellation with spatial audio and 40-hour ultra-long battery life.",
    description: "Immerse yourself in concert-grade audio fidelity. The Aura Sound Pro delivers rich low-end punch, crystal clear mids, and glistening highs. Equipped with adaptive Active Noise Cancellation, high-res audio codec support, and plush memory foam earcups for marathon listening sessions.",
    features: [
      "Adaptive Active Noise Cancellation with Transparency Mode",
      "Spatial 3D Audio with dynamic head tracking",
      "40-hour battery life on a single charge (Type-C Quick Charge)",
      "Multi-point Bluetooth 5.3 instant pairing",
      "Studio-grade dual beamforming microphones"
    ],
    specs: {
      "Driver Size": "40mm Custom Dynamic Drivers",
      "Frequency Response": "10Hz - 40,000Hz",
      "Connectivity": "Bluetooth 5.3 / 3.5mm Aux",
      "Weight": "250g",
      "Warranty": "2 Years Official Warranty"
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Silver Frost", hex: "#dcdde1" },
      { name: "Rose Gold", hex: "#b76e79" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 18,
    tags: ["wireless", "noise cancellation", "headphones", "bluetooth"]
  },
  {
    id: "lum-002",
    name: "Chronos Titanium Smartwatch Series 7",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 349.00,
    originalPrice: 399.00,
    rating: 4.8,
    reviewsCount: 215,
    isNew: true,
    isTrending: true,
    isSale: false,
    badge: "New Release",
    shortDesc: "Aerospace titanium chassis, AMOLED always-on sapphire display, & health suite.",
    description: "Engineered for elite performers and modern explorers. Chronos 7 pairs aerospace-grade titanium with an edge-to-edge sapphire crystal display. Continuous ECG, SpO2 blood oxygen tracking, GPS navigation, and 5ATM water resistance make it the ultimate companion.",
    features: [
      "1.43-inch Always-On Retina AMOLED display (1000 nits)",
      "Medical-grade ECG, SpO2, and Sleep Stage monitoring",
      "Dual-frequency GNSS GPS with offline route mapping",
      "5 ATM Water resistant up to 50 meters",
      "Up to 14 days typical battery endurance"
    ],
    specs: {
      "Case Material": "Grade 5 Titanium",
      "Display": "Sapphire Glass 466x466 AMOLED",
      "Battery": "450 mAh (14 Days)",
      "Sensors": "Optical Heart, ECG, SpO2, Barometer, Gyro",
      "Compatibility": "iOS & Android"
    },
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Space Gray", hex: "#34495e" },
      { name: "Titanium Silver", hex: "#bdc3c7" },
      { name: "Obsidian Black", hex: "#111111" }
    ],
    sizes: ["42mm", "46mm"],
    inStock: true,
    stockCount: 12,
    tags: ["smartwatch", "fitness", "titanium", "health"]
  },
  {
    id: "lum-003",
    name: "Minimalist Italian Leather Backpack",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 189.50,
    originalPrice: 245.00,
    rating: 4.7,
    reviewsCount: 142,
    isNew: false,
    isTrending: false,
    isSale: true,
    badge: "20% OFF",
    shortDesc: "Handcrafted full-grain Italian leather with dedicated 16\" padded laptop compartment.",
    description: "The quintessential urban commuter companion. Hand-stitched from sustainably certified full-grain vegetable-tanned leather, this backpack ages with a gorgeous natural patina. Features hidden anti-theft security pockets and weather-shield YKK zippers.",
    features: [
      "Sustainably sourced Full-grain Italian leather",
      "Padded compartment fitting up to 16\" MacBook Pro",
      "Water-resistant interior lining with organizer pockets",
      "Ergonomic breathable back panel with luggage sleeve",
      "Custom gunmetal hardware & YKK waterproof zippers"
    ],
    specs: {
      "Material": "100% Full-grain Leather",
      "Capacity": "22 Liters",
      "Dimensions": "43cm x 30cm x 15cm",
      "Weight": "1.1 kg",
      "Origin": "Florence, Italy"
    },
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Cognac Brown", hex: "#964b00" },
      { name: "Charcoal Black", hex: "#222222" },
      { name: "Navy Blue", hex: "#1e3799" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 8,
    tags: ["leather", "backpack", "travel", "laptop bag"]
  },
  {
    id: "lum-004",
    name: "Lumina Glow Ambient Smart Lamp",
    category: "home",
    categoryLabel: "Smart Home",
    price: 89.00,
    originalPrice: 119.00,
    rating: 4.9,
    reviewsCount: 450,
    isNew: true,
    isTrending: true,
    isSale: false,
    badge: "Popular",
    shortDesc: "16 million colors, circadian biorhythm sync, and touch gesture light sculpting.",
    description: "Transform your living or working space into a sanctuary of light. Lumina Glow features full RGBIC spectrum control, warm sunset simulation for natural awakening, seamless smart home voice integration (Alexa, Apple HomeKit, Google), and tactile touch slide controls.",
    features: [
      "16 Million RGB colors + 2200K to 6500K tunable white",
      "Circadian sunrise alarm and gentle sleep timer",
      "Music sync mode with dynamic beat responsiveness",
      "Voice & App control (Apple Home, Google Home, Alexa)",
      "Solid aluminum base with frosted anti-glare diffuser"
    ],
    specs: {
      "Brightness": "850 Lumens",
      "Power Consumption": "12W LED",
      "Lifespan": "50,000 Hours",
      "Connectivity": "Wi-Fi 2.4GHz + BLE",
      "Power Input": "USB-C PD 20W"
    },
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Matte White", hex: "#f5f6fa" },
      { name: "Gunmetal Gray", hex: "#485460" },
      { name: "Warm Gold", hex: "#e58e26" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 25,
    tags: ["smart home", "lighting", "ambient", "iot"]
  },
  {
    id: "lum-005",
    name: "PureSound Walnut Hi-Fi Bookshelf Speakers",
    category: "audio",
    categoryLabel: "Audio",
    price: 299.00,
    originalPrice: 380.00,
    rating: 4.8,
    reviewsCount: 180,
    isNew: false,
    isTrending: false,
    isSale: true,
    badge: "Sale",
    shortDesc: "Real handcrafted walnut wood cabinets with aptX HD Bluetooth and optical inputs.",
    description: "Audiophile-grade acoustics meet timeless retro Scandinavian design. Featuring custom silk dome tweeters and Kevlar subwoofers, these active powered speakers deliver breathtakingly wide soundstage for both vinyl record players and modern high-res streaming.",
    features: [
      "Handcrafted solid natural walnut acoustic enclosures",
      "Built-in Class D amplifier delivering 120W peak power",
      "Qualcomm aptX HD Bluetooth 5.0 wireless streaming",
      "Optical, RCA, Sub-out, and USB inputs",
      "Precision machined aluminum volume and EQ knobs"
    ],
    specs: {
      "Total Power": "120W Peak (60W RMS)",
      "Drivers": "4-inch Kevlar Woofer + 1-inch Silk Tweeter",
      "Frequency": "45Hz - 22,000Hz",
      "Weight": "6.8 kg (Pair)",
      "Inputs": "Bluetooth, RCA, Optical, AUX"
    },
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "American Walnut", hex: "#795548" },
      { name: "Piano Black", hex: "#1e272e" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 9,
    tags: ["speakers", "hi-fi", "walnut", "bluetooth", "audio"]
  },
  {
    id: "lum-006",
    name: "Urban Oversized Heavyweight Cotton Hoodie",
    category: "fashion",
    categoryLabel: "Fashion",
    price: 78.00,
    originalPrice: 95.00,
    rating: 4.6,
    reviewsCount: 310,
    isNew: false,
    isTrending: true,
    isSale: false,
    badge: "Trending",
    shortDesc: "480 GSM organic French terry cotton with drop shoulder boxy streetwear fit.",
    description: "The pinnacle of streetwear comfort. Crafted from ultra-dense 480 GSM French Terry cotton with double-needle ribbed hems, deep hood construction, and seamless kangaroo pocket. Pre-shrunk for an enduring luxury silhouette wash after wash.",
    features: [
      "100% GOTS certified Organic French Terry Cotton (480 GSM)",
      "Relaxed drop-shoulder boxy modern cut",
      "Double-layered structured hood with no drawstrings",
      "Hidden inside pocket for phone or card holder",
      "Pre-shrunk fabric to prevent post-wash shrinkage"
    ],
    specs: {
      "Fabric Weight": "480 GSM Luxury Weight",
      "Composition": "100% Organic Cotton",
      "Care": "Machine wash cold, air dry",
      "Fit": "True to size (Boxy / Oversized)",
      "Gender": "Unisex"
    },
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1578768079052-aa76e520036c?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Sage Green", hex: "#84817a" },
      { name: "Washed Black", hex: "#2f3542" },
      { name: "Cream Oatmeal", hex: "#dcdde1" },
      { name: "Earthy Clay", hex: "#b33939" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 30,
    tags: ["hoodie", "streetwear", "fashion", "cotton", "oversized"]
  },
  {
    id: "lum-007",
    name: "AeroPulse Ergonomic Mechanical Keyboard",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 159.00,
    originalPrice: 199.00,
    rating: 4.9,
    reviewsCount: 275,
    isNew: true,
    isTrending: false,
    isSale: true,
    badge: "Hot Deal",
    shortDesc: "Gasket-mounted mechanical keyboard with hot-swappable tactile switches and south-facing RGB.",
    description: "Experience the ultimate typing tactile bliss. Custom tuned gasket-mount construction paired with sound-dampening silicone sheets produces an incredibly creamy typing sound. Features triple connection modes (2.4GHz wireless, Bluetooth 5.1, USB-C) and custom PBT keycaps.",
    features: [
      "Gasket-mounted structure with 5-layer acoustic dampening",
      "Hot-swappable PCB supporting 3-pin & 5-pin mechanical switches",
      "Tri-mode connectivity (2.4G Dongle, 3x Bluetooth, Type-C)",
      "4000mAh long-lasting rechargeable battery with smart sleep",
      "Custom programmable RGB backlighting & rotary control knob"
    ],
    specs: {
      "Layout": "75% Compact (81 Keys)",
      "Switches": "Pre-lubed Cream Yellow Tactile",
      "Keycaps": "Double-shot PBT Cherry Profile",
      "Battery": "4000 mAh Rechargeable",
      "Dimensions": "320 x 140 x 38mm"
    },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Retro Gray", hex: "#7f8c8d" },
      { name: "Cyberpunk Violet", hex: "#8e44ad" },
      { name: "Nordic White", hex: "#f1f2f6" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 14,
    tags: ["keyboard", "mechanical", "gaming", "desk setup", "wireless"]
  },
  {
    id: "lum-008",
    name: "Spectra Pro Polarized Titanium Sunglasses",
    category: "fashion",
    categoryLabel: "Fashion",
    price: 135.00,
    originalPrice: 165.00,
    rating: 4.7,
    reviewsCount: 118,
    isNew: false,
    isTrending: false,
    isSale: false,
    badge: "Exclusive",
    shortDesc: "Featherweight Japanese titanium frames with HD polarized anti-reflective lenses.",
    description: "Engineered for effortless style and all-day comfort. At only 18 grams, the Spectra Pro is sculpted from pure Japanese beta-titanium with precision spring hinges. Lenses feature 100% UV400 protection, hydrophobic water repellent coating, and high-definition clarity.",
    features: [
      "Ultralight Beta-Titanium construction (18g total weight)",
      "HD Polarized lenses with 100% UVA / UVB protection",
      "Oleophobic and hydrophobic scratch-resistant lens coating",
      "Flexible spring hinges with hypoallergenic silicone nose pads",
      "Includes genuine hard leather carry case and microfiber cloth"
    ],
    specs: {
      "Frame Material": "Japanese Beta Titanium",
      "Lens": "Category 3 HD Polarized Triacetate",
      "Bridge Width": "19mm",
      "Lens Width": "52mm",
      "Weight": "18g"
    },
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Gunmetal Silver", hex: "#57606f" },
      { name: "24K Gold", hex: "#d4af37" },
      { name: "Matte Black", hex: "#1e272e" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 22,
    tags: ["sunglasses", "eyewear", "titanium", "accessories", "fashion"]
  },
  {
    id: "lum-009",
    name: "Zenith Ceramic Smart Pour-Over Kettle",
    category: "home",
    categoryLabel: "Smart Home",
    price: 115.00,
    originalPrice: 145.00,
    rating: 4.9,
    reviewsCount: 198,
    isNew: true,
    isTrending: true,
    isSale: false,
    badge: "Barista Choice",
    shortDesc: "Variable to-the-degree temperature control with gooseneck precision spout and LCD screen.",
    description: "Designed for discerning coffee artisans and tea lovers. The Zenith Gooseneck kettle delivers silky, controlled water flow for the ultimate pour-over extraction. Features single-degree temperature holding for up to 60 minutes and rapid 1200W boil speed.",
    features: [
      "Precision fluted gooseneck spout for optimal pour speed control",
      "Single-degree Celsius & Fahrenheit temperature regulation (40-100°C)",
      "High-definition OLED display with built-in brew stopwatch timer",
      "60-Minute temperature hold mode",
      "1200W rapid boiling element in 304 food-grade stainless steel"
    ],
    specs: {
      "Capacity": "0.9 Liters",
      "Power": "1200 Watts",
      "Material": "304 Stainless Steel & Matte Finish",
      "Cord Length": "0.75m with cord wrap base",
      "Weight": "1.25 kg"
    },
    images: [
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Matte Obsidian", hex: "#1e272e" },
      { name: "Nordic Birch White", hex: "#f1f2f6" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 15,
    tags: ["coffee", "kettle", "kitchen", "smart home", "brew"]
  },
  {
    id: "lum-010",
    name: "Velox Ultra-Fast 100W GaN Desktop Charger",
    category: "accessories",
    categoryLabel: "Accessories",
    price: 64.99,
    originalPrice: 79.99,
    rating: 4.8,
    reviewsCount: 390,
    isNew: false,
    isTrending: false,
    isSale: true,
    badge: "18% OFF",
    shortDesc: "4-Port GaN III charger capable of fast-charging laptops, tablets, and phones simultaneously.",
    description: "The only desktop power hub you'll ever need. Utilizing cutting-edge Gallium Nitride (GaN III) semiconductor tech, Velox packs 100W of blazing power into an ultra-compact body that stays cool under maximum load. Fast-charges two laptops simultaneously.",
    features: [
      "100W Max USB-C Power Delivery 3.0 & PPS support",
      "4-Port versatility: 3x USB-C + 1x USB-A QC 3.0",
      "Intelligent power distribution based on connected device demands",
      "Over-voltage, thermal, and short-circuit active protection matrix",
      "Foldable travel prongs with international adapter set included"
    ],
    specs: {
      "Total Wattage": "100W Max",
      "Ports": "3x USB-C + 1x USB-A",
      "Technology": "GaN III Semiconductor",
      "Dimensions": "65 x 65 x 30 mm",
      "Weight": "195g"
    },
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Space Gray", hex: "#57606f" },
      { name: "Arctic White", hex: "#f1f2f6" }
    ],
    sizes: [],
    inStock: true,
    stockCount: 40,
    tags: ["charger", "gan", "usb-c", "power", "travel"]
  },
  {
    id: "lum-011",
    name: "Apex Pulse Fitness & Recovery Smart Ring",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 219.00,
    originalPrice: 269.00,
    rating: 4.7,
    reviewsCount: 164,
    isNew: true,
    isTrending: true,
    isSale: false,
    badge: "Trending",
    shortDesc: "Medical-grade sleep score, HRV readiness, body temperature, and strain tracking.",
    description: "Discreet wellness tracking without screen distractions. Forged from lightweight titanium with diamond-like carbon (DLC) coating, Apex Pulse measures blood flow directly from finger arteries with 99.2% clinical accuracy. Seamless Bluetooth sync to Apple Health & Google Fit.",
    features: [
      "Ultra-compact titanium housing weighing only 4 grams",
      "Continuous heart rate, HRV, SpO2, and skin temperature sensors",
      "7 Days battery life with wireless magnetic charging dock",
      "Water resistant to 100 meters (swimming & sauna safe)",
      "Zero monthly subscription fees required"
    ],
    specs: {
      "Material": "Grade 5 Titanium + DLC Coating",
      "Water Resistance": "10 ATM (100m)",
      "Battery Life": "Up to 7 Days",
      "Weight": "4 to 6 grams (by size)",
      "Connectivity": "Bluetooth Low Energy 5.2"
    },
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Stealth DLC", hex: "#1e272e" },
      { name: "Brushed Rose Gold", hex: "#d1a398" },
      { name: "Mirror Silver", hex: "#dcdde1" }
    ],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    inStock: true,
    stockCount: 11,
    tags: ["smart ring", "health", "fitness", "sleep", "wearable"]
  },
  {
    id: "lum-012",
    name: "Terra Organic Linen Minimalist Bed Set",
    category: "home",
    categoryLabel: "Smart Home",
    price: 175.00,
    originalPrice: 220.00,
    rating: 4.9,
    reviewsCount: 220,
    isNew: false,
    isTrending: false,
    isSale: true,
    badge: "Sale",
    shortDesc: "100% French flax stonewashed linen duvet set with breathable temperature regulating weave.",
    description: "Sleep in supreme breathable comfort every night. Sourced from certified Normandy French flax, our linen set is pre-stonewashed for extraordinary immediate softness. Naturally hypoallergenic, moisture-wicking, and gets softer with every wash.",
    features: [
      "100% European Flax Certified Normandy Linen",
      "Pre-washed with volcanic stones for signature buttery drape",
      "Thermal regulating: cool in summer, warm in winter",
      "OEKO-TEX 100 certified free from harmful chemicals",
      "Includes 1 duvet cover and 2 envelope pillowcases"
    ],
    specs: {
      "Material": "100% French Stonewashed Linen",
      "Thread Count": "170 GSM Premium Weave",
      "Closure": "Hidden natural coconut shell buttons",
      "Origin": "Normandy, France",
      "Care": "Gentle cycle machine wash"
    },
    images: [
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Oatmeal Natural", hex: "#e4dcd3" },
      { name: "Terracotta Clay", hex: "#b86b53" },
      { name: "Forest Olive", hex: "#556b2f" }
    ],
    sizes: ["Queen", "King", "Cal King"],
    inStock: true,
    stockCount: 16,
    tags: ["bedding", "linen", "home", "organic", "luxury"]
  }
];

// Coupon Codes configuration
const COUPONS = {
  "SAVE20": { type: "percent", value: 20, desc: "20% off entire order" },
  "WELCOME10": { type: "fixed", value: 10, desc: "$10 off order" },
  "FREESHIP": { type: "shipping", value: 0, desc: "Free Express Shipping" },
  "LUMINA50": { type: "percent", value: 50, desc: "50% off VIP Discount" }
};

// Currency Exchange rates relative to USD
const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  INR: { symbol: "₹", rate: 83.5, label: "INR (₹)" }
};

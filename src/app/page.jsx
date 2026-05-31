"use client";
import { useState } from "react";
import Image from "next/image";
import { Zap, Leaf, Home, BadgeCheck } from "lucide-react";
import { CartModal } from "@/components/CartModal";

// ─────────────────────────────────────────
// HARDCODED DATA — change images/text here
// ─────────────────────────────────────────

const CATEGORIES = [
  { id: 1, label: "All Items",    emoji: "🍱" },
  { id: 2, label: "Thalis",       emoji: "🍽️" },
  { id: 3, label: "Puri Sabji",   emoji: "🥙" },
  { id: 4, label: "Kachori",      emoji: "🧅" },
  { id: 5, label: "Rice Meals",   emoji: "🍛" },
  { id: 6, label: "Roti Meals",   emoji: "🫓" },
  { id: 7, label: "Salads",       emoji: "🥗" },
  { id: 8, label: "Drinks",       emoji: "🥤" },
];

const MINI_BANNERS = [
  {
    id: 1,
    title: "Student Thali Special",
    desc: "4 Roti • Chawal • Daal • Sabji • Rayta • Salad",
    emoji: "🍽️",
    tag: "₹60 Only",
    bg: "from-[#1a2340] to-[#2d3a60]",
  },
  {
    id: 2,
    title: "Puri Paneer Sabji",
    desc: "Fluffy puris with fresh paneer gravy",
    emoji: "🥙",
    tag: "50% OFF",
    bg: "from-[#7c2d00] to-[#c45000]",
  },
  {
    id: 3,
    title: "Damalu Kachori",
    desc: "Crispy kachoris — Prayagraj's favourite!",
    emoji: "🧅",
    tag: "₹60 Only",
    bg: "from-[#0f3460] to-[#1a5276]",
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: "Student Thali",
    desc: "4 Roti • Chawal • Hari Sabji • Daal • Rayta • Aachar • Salad",
    price: 60,
    mrp: 120,
    discount: "42% OFF",
    // ↓ Replace with your image path or URL
    image: "/shivkart-product2.jpg",
    fallbackEmoji: "🍽️",
    deliveryMin: 20,
  },
  {
    id: 2,
    name: "Puri Paneer Sabji",
    desc: "Fluffy puris with fresh paneer gravy — Hygienic & Fresh",
    price: 70,
    mrp: 140,
    discount: "50% OFF",
    // ↓ Replace with your image path or URL
    image: "/shivkart-product.jpg",
    fallbackEmoji: "🥙",
    deliveryMin: 20,
  },
  {
    id: 3,
    name: "Damalu Kachori",
    desc: "Prayagraj's favourite crispy kachoris with fresh chutney",
    price: 60,
    mrp: 100,
    discount: "40% OFF",
    // ↓ Replace with your image path or URL
    image: "/shivkart-product2.jpg",
    fallbackEmoji: "🧅",
    deliveryMin: 20,
  },
  {
    id: 4,
    name: "Special Thali",
    desc: "Complete meal — Sabji • Chawal • Roti • Pickle • More",
    price: 70,
    mrp: 110,
    discount: "36% OFF",
    // ↓ Replace with your image path or URL
    image: "/shivkart-product.jpg",
    fallbackEmoji: "🍱",
    deliveryMin: 20,
  },
  {
    id: 5,
    name: "Special Chola Bhatura",
    desc: "Puffy bhaturas with spicy chola masala — Best Quality",
    price: 70,
    mrp: 140,
    discount: "50% OFF",
    // ↓ Replace with your image path or URL
    image: "/shivkart-product.jpg",
    fallbackEmoji: "🥘",
    deliveryMin: 20,
  },
];

const WHY_CARDS = [
  {
    icon: Zap,
    title: "Max 20 Min",
    desc: "Lightning fast delivery to your door",
  },
  {
    icon: Leaf,
    title: "Hygienic & Fresh",
    desc: "Made fresh, packed hygienic, delivered safe",
  },
  {
    icon: Home,
    title: "Ghar Jesa Swad",
    desc: "Home-style taste in every single bite",
  },
  {
    icon: BadgeCheck,
    title: "Best Quality",
    desc: "Quality assured — Har Jagah, Har Order!",
  },
];


const FOOTER_LINKS = {
  Menu:           ["Student Thali", "Special Thali", "Puri Paneer Sabji", "Damalu Kachori", "Chola Bhatura"],
  Company:        ["About Us", "Careers", "Contact", "Blog"],
  "Delivery Areas": ["Shivkuti", "Telierganj", "Chhota Baghada", "Rasulabad", "Govindpur"],
};

// ─────────────────────────────────────────
// LOGO SVG
// ─────────────────────────────────────────
function ShivKartLogo() {
  return (
    <Image
            src="/shivkart-logo.jpg"
            alt="ShivKart Logo"
            width={40}
            height={40}
            className="object-contain"
          />
  );
}

// ─────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────
function Navbar({ cartCount }) {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 flex items-center gap-4 h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-[160px]">
          <ShivKartLogo size={36} />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-xl text-[#1a2340] font-[Poppins,sans-serif] tracking-tight">
              Shiv<span className="text-[#ff6b00]">Kart</span>
            </span>
            <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Food Delivery</span>
          </div>
        </div>

        {/* Location */}
        <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 bg-white hover:border-orange-300 transition-colors whitespace-nowrap">
          <svg className="w-3.5 h-3.5 text-[#ff6b00]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
          Prayagraj ▾
        </button>

        {/* Search */}
        <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 gap-2 hover:border-orange-300 transition-colors">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder='Search "thali", "kachori", "puri"…'
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 font-medium"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto">
          <button onClick={() => (window.location.href = "/login")} className="px-4 py-2 border-2 border-[#1a2340] rounded-xl text-sm font-bold text-[#1a2340] hover:bg-[#1a2340] hover:text-white transition-colors">
            Login
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#ff6b00] rounded-xl text-sm font-bold text-white hover:bg-[#e55f00] transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            My Cart
            <span className="bg-white text-[#ff6b00] rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────
// HERO BANNER
// ─────────────────────────────────────────
function HeroBanner() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a2340] via-[#2d3a60] to-[#3a4f7a] flex items-center mb-6 min-h-[200px] relative">
      {/* Glow */}
      <div className="absolute top-0 right-32 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Left content */}
      <div className="px-10 py-9 flex-1 z-10">
        <div className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
          🕐 Max 20 Min Delivery
        </div>
        <h1 className="font-black text-4xl text-white leading-tight mb-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          घर जैसा स्वाद,<br />
          <span className="text-[#ff8c00]">अब घर बैठे!</span>
        </h1>
        <p className="text-sm text-white/70 mb-5 font-medium leading-relaxed">
          ShivKart के साथ — स्वाद भी, सेवा भी, समय पर भी<br />
          Fresh thalis, kachori &amp; more — Har Jagah Delivery!
        </p>
        <button className="inline-flex items-center gap-2 bg-[#ff6b00] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#e55f00] transition-colors text-sm">
          Order Now →
        </button>
      </div>

      {/* Right stats */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-2 gap-3">
          {[
            { val: "₹60",    label: "Student Thali" },
            { val: "₹70",    label: "Special Thali" },
            { val: "20 min", label: "Max Delivery" },
            { val: "50% off",label: "On First Order" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 border border-white/15 rounded-xl px-5 py-3 text-center backdrop-blur-sm">
              <strong className="block text-xl font-black text-[#ff8c00]">{s.val}</strong>
              <span className="text-xs text-white/70 font-semibold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MINI BANNERS
// ─────────────────────────────────────────
function MiniBanners() {
  return (
    <div className="grid grid-cols-3 gap-3.5 mb-7">
      {MINI_BANNERS.map((b) => (
        <div
          key={b.id}
          className={`bg-gradient-to-br ${b.bg} rounded-2xl p-5 flex items-center gap-3.5 cursor-pointer relative overflow-hidden hover:-translate-y-0.5 transition-transform`}
        >
          <div className="w-14 h-14 bg-white/15 rounded-xl flex items-center justify-center text-3xl shrink-0">
            {b.emoji}
          </div>
          <div>
            <h3 className="font-bold text-white text-sm mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
              {b.title}
            </h3>
            <p className="text-xs text-white/70 mb-2.5 font-medium">{b.desc}</p>
            <button className="inline-flex items-center gap-1.5 bg-white/15 border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white/25 transition-colors">
              Order Now →
            </button>
          </div>
          <span className="absolute top-3 right-3 bg-[#ff6b00] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
            {b.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// CATEGORY ROW
// ─────────────────────────────────────────
function CategoryRow() {
  const [active, setActive] = useState(1);
  return (
    <div className="mb-8">
      <h2 className="font-black text-xl text-[#1a2340] mb-4 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
        <span className="w-1 h-6 bg-[#ff6b00] rounded block" />
        Our Menu
      </h2>
      <div className="grid grid-cols-8 gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl border-2 transition-all cursor-pointer ${
              active === c.id
                ? "bg-orange-50 border-[#ff6b00]"
                : "border-transparent hover:bg-orange-50 hover:border-orange-200"
            }`}
          >
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              {c.emoji}
            </div>
            <span className="text-[11px] font-bold text-gray-700 text-center leading-tight">{c.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCT CARD
// ─────────────────────────────────────────
function ProductCard({ product, onAdd }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // onAdd();
    onAdd(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer flex flex-col">
      {/* Image */}
      <div className="relative bg-[#f9f5f0] h-44 flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-6xl">{product.fallbackEmoji}</span>
        )}
        {/* Discount badge */}
        <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
          {product.discount}
        </span>
        {/* Delivery time */}
        <span className="absolute bottom-2 left-2 bg-green-50 text-green-700 text-[10px] font-black px-2 py-0.5 rounded-md border border-green-200">
          ⏱ {product.deliveryMin} min
        </span>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold text-[13px] text-gray-900 mb-1 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
          {product.name}
        </h3>
        <p className="text-[11px] text-gray-500 mb-3 leading-snug font-medium flex-1">{product.desc}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-black text-base text-[#1a2340]" style={{ fontFamily: "Poppins, sans-serif" }}>
              ₹{product.price}
            </span>
            <del className="text-[11px] text-gray-400 ml-1.5 font-medium">₹{product.mrp}</del>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-black text-white transition-colors ${
              added ? "bg-green-500" : "bg-[#ff6b00] hover:bg-[#e55f00]"
            }`}
          >
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCTS GRID
// ─────────────────────────────────────────
function ProductsGrid({ onAdd }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-black text-xl text-[#1a2340] flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
          <span className="w-1 h-6 bg-[#ff6b00] rounded block" />
          Our Specials
        </h2>
        <button className="text-[#ff6b00] text-sm font-bold border-2 border-[#ff6b00] px-3.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 transition-colors">
          See All
        </button>
      </div>
      <div className="grid grid-cols-5 gap-3.5">
        {PRODUCTS.map((p) => (
          <a href={`/product`}>
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          </a>

        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// OFFER STRIP
// ─────────────────────────────────────────
function OfferStrip() {
  return (
    <div className="bg-gradient-to-br from-[#1a2340] to-[#2d3a60] rounded-2xl p-5 flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#ff6b00] rounded-xl flex items-center justify-center text-2xl shrink-0">
          🛵
        </div>
        <div>
          <h3 className="font-black text-white text-lg mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
            Try Now — Har Jagah Delivery!
          </h3>
          <p className="text-white/60 text-sm font-medium">
            Shivkuti • Telierganj • Chhota Baghada • Rasulabad • Govindpur — Har Gali, Har Mohalla!
          </p>
        </div>
      </div>
      <button className="shrink-0 flex items-center gap-2 bg-[#ff6b00] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#e55f00] transition-colors text-sm whitespace-nowrap">
        Order Now →
      </button>
    </div>
  );
}

// ─────────────────────────────────────────
// WHY SHIVKART

function WhySection() {
  return (
    <div className="mb-8">
      <h2
        className="font-black text-xl text-[#1a2340] mb-4 flex items-center gap-2"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <span className="w-1 h-6 bg-[#ff6b00] rounded block" />
        Why ShivKart?
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
        {WHY_CARDS.map((c) => {
          const Icon = c.icon;

          return (
            <div
              key={c.title}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-5 text-center hover:border-orange-200 hover:-translate-y-0.5 transition-all"
            >
              {/* ICON */}
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-orange-50 flex items-center justify-center">
                <Icon
                  size={28}
                  className="text-[#ff6b00]"
                  strokeWidth={2.3}
                />
              </div>

              <h4
                className="font-bold text-[#1a2340] text-sm mb-1"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {c.title}
              </h4>

              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {c.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#1a2340] text-white pt-10 pb-6 mt-4">
      <div className="max-w-7xl mx-auto px-5">
        <div className="grid grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ShivKartLogo size={32} />
              <span className="font-black text-xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                Shiv<span className="text-[#ff6b00]">Kart</span>
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed font-medium mb-4">
              Prayagraj's fastest food delivery service. Har Ghar Ka Swad, Ab Ghar Baithe!
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-white/8 border border-white/15 text-white/60 text-xs font-semibold px-2.5 py-1 rounded-lg">
                📍 Prayagraj
              </span>
              
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-bold text-sm text-white/90 mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 font-medium hover:text-[#ff6b00] transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex items-center justify-between">
          <p className="text-xs text-white/35 font-medium">
            © 2026 ShivKart Food Delivery, Prayagraj. All rights reserved.
          </p>
          <div className="flex gap-2">
            {["Privacy Policy", "Terms of Use"].map((t) => (
              <span key={t} className="bg-white/7 border border-white/12 text-white/45 text-xs font-semibold px-2.5 py-1 rounded-md cursor-pointer hover:text-white/70 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function ShivKartHome() {
  // const [cartCount, setCartCount] = useState(0);
 
const [cartItems, setCartItems] = useState([]);
const [cartOpen, setCartOpen]   = useState(false);
const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  // const addToCart = () => setCartCount((n) => n + 1);
  const addToCart = (product) => {
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === product.id);
    if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
    return [...prev, { ...product, qty: 1 }];
  });
};

  return (
    <div className="min-h-screen bg-gray-50 font-[Nunito,sans-serif]">
      {/* <Navbar cartCount={cartCount} /> */}
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main className="max-w-7xl mx-auto px-5 py-6">
        <HeroBanner />
        <MiniBanners />
        <CategoryRow />
        <ProductsGrid onAdd={addToCart} />
        <OfferStrip />
        <WhySection />
      </main>
      <Footer />
      {cartOpen && (
  <CartModal cartItems={cartItems} setCartItems={setCartItems} onClose={() => setCartOpen(false)} />
)}
    </div>
  );
}
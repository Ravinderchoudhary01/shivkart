"use client";
import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────
// THEME COLORS
// ─────────────────────────────────────────
// Primary:  #1a2340 (navy)
// Accent:   #ff6b00 (orange)
// BG:       white / gray-50
// ─────────────────────────────────────────

// ─────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────

const MOCK_STATS = {
  totalOrders: 348,
  delivered: 291,
  pending: 34,
  processing: 23,
  revenue: 22480,
};

const MOCK_PRODUCTS_STATS = [
  { id: 1, name: "Student Thali",        orders: 128, revenue: 7680,  emoji: "🍽️", trending: true },
  { id: 2, name: "Puri Paneer Sabji",    orders: 86,  revenue: 6020,  emoji: "🥙", trending: false },
  { id: 3, name: "Special Thali",        orders: 72,  revenue: 5040,  emoji: "🍱", trending: false },
  { id: 4, name: "Special Chola Bhatura",orders: 38,  revenue: 2660,  emoji: "🥘", trending: false },
  { id: 5, name: "Damalu Kachori",       orders: 24,  revenue: 1440,  emoji: "🧅", trending: false },
];

const MOCK_DRIVERS = [
  { id: 1, name: "Ramesh Kumar",    phone: "9876543210", vehicle: "Honda Activa", username: "ramesh01", status: "active" },
  { id: 2, name: "Suresh Yadav",    phone: "9765432109", vehicle: "TVS Jupiter",  username: "suresh02", status: "active" },
  { id: 3, name: "Anil Gupta",      phone: "9654321098", vehicle: "Bajaj Pulsar", username: "anil03",   status: "inactive" },
];

const MOCK_ORDERS = [
  { id: "SK001", customer: "Priya Sharma",   item: "Student Thali",         qty: 2, total: 120, status: "pending",    address: "Shivkuti, Prayagraj",    time: "10:32 AM" },
  { id: "SK002", customer: "Rahul Singh",    item: "Puri Paneer Sabji",     qty: 1, total: 72,  status: "pending",    address: "Telierganj, Prayagraj",  time: "10:41 AM" },
  { id: "SK003", customer: "Meena Devi",     item: "Special Thali",         qty: 3, total: 216, status: "processing", address: "Rasulabad, Prayagraj",   time: "10:15 AM", driver: "Ramesh Kumar" },
  { id: "SK004", customer: "Vijay Tiwari",   item: "Damalu Kachori",        qty: 2, total: 124, status: "processing", address: "Govindpur, Prayagraj",   time: "10:05 AM", driver: "Suresh Yadav" },
  { id: "SK005", customer: "Ankita Rai",     item: "Special Chola Bhatura", qty: 1, total: 72,  status: "delivered",  address: "Chhota Baghada",         time: "09:45 AM", driver: "Ramesh Kumar" },
  { id: "SK006", customer: "Deepak Mishra",  item: "Student Thali",         qty: 4, total: 248, status: "delivered",  address: "Shivkuti, Prayagraj",    time: "09:30 AM", driver: "Anil Gupta" },
  { id: "SK007", customer: "Kavya Joshi",    item: "Puri Paneer Sabji",     qty: 2, total: 144, status: "pending",    address: "Telierganj, Prayagraj",  time: "10:55 AM" },
];

const MOCK_BANNERS = [
  { id: 1, title: "Student Thali Special", desc: "4 Roti • Chawal • Daal • Sabji • Rayta • Salad", tag: "₹60 Only", bg: "from-[#1a2340] to-[#2d3a60]", active: true },
  { id: 2, title: "Puri Paneer Sabji",     desc: "Fluffy puris with fresh paneer gravy",            tag: "50% OFF",  bg: "from-[#7c2d00] to-[#c45000]", active: true },
  { id: 3, title: "Damalu Kachori",        desc: "Crispy kachoris — Prayagraj's favourite!",        tag: "₹60 Only", bg: "from-[#0f3460] to-[#1a5276]", active: false },
];

// ─────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────
function ShivKartLogo({ size = 50 }) {
  return (
    <Image
  src="/shivkart-logo.jpg"
  alt="ShivKart Logo"
  width={size}
  height={size}
  className="object-contain"
/>
  );
}

// ─────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────
const NAV_ITEMS = [
  { key: "dashboard",    label: "Dashboard",    icon: "📊" },
  { key: "products",     label: "Add / Edit Products", icon: "🍱" },
  { key: "banners",      label: "Add Banner",   icon: "🖼️" },
  { key: "orders",       label: "Orders",       icon: "📦" },
  { key: "drivers",      label: "Add Drivers",  icon: "🛵" },
];

function Sidebar({ active, onChange }) {
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0 z-40">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
        <ShivKartLogo size={30} />
        <div>
          <p className="font-extrabold text-[#1a2340] text-base leading-none" style={{ fontFamily: "Poppins,sans-serif" }}>
            Shiv<span className="text-[#ff6b00]">Kart</span>
          </p>
          <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-semibold transition-all text-left ${
              active === item.key
                ? "bg-orange-50 text-[#ff6b00] border border-orange-200"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="text-base">
                {/* {item.icon} */}

            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 font-semibold">Logged in as</p>
        <p className="text-sm font-bold text-[#1a2340]">Admin</p>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────
// TOP BAR
// ─────────────────────────────────────────
function TopBar({ title }) {
  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center px-6 justify-between sticky top-0 z-30">
      <h1 className="font-bold text-[#1a2340] text-base" style={{ fontFamily: "Poppins,sans-serif" }}>
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-400 font-medium">ShivKart Admin</span>
        <div className="w-8 h-8 rounded-full bg-[#1a2340] flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────
// STAT CARD
// ─────────────────────────────────────────
function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`bg-white rounded-2xl border ${accent ? "border-orange-200" : "border-gray-100"} p-5`}>
      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">{label}</p>
      <p className={`font-black text-2xl ${accent ? "text-[#ff6b00]" : "text-[#1a2340]"}`} style={{ fontFamily: "Poppins,sans-serif" }}>
        {value}
      </p>
      {sub && <p className="text-[11px] text-gray-400 font-medium mt-0.5">{sub}</p>}
    </div>
  );
}

// ─────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────
function Dashboard() {
  const maxOrders = Math.max(...MOCK_PRODUCTS_STATS.map((p) => p.orders));
  return (
    <div className="p-6 space-y-6">
      {/* Overview stats */}
      <div className="grid grid-cols-5 gap-4">
        <StatCard label="Total Orders"  value={MOCK_STATS.totalOrders} sub="All time" />
        <StatCard label="Delivered"     value={MOCK_STATS.delivered}   sub="Completed" accent />
        <StatCard label="Pending"       value={MOCK_STATS.pending}     sub="Awaiting" />
        <StatCard label="Processing"    value={MOCK_STATS.processing}  sub="In transit" />
        <StatCard label="Revenue"       value={`₹${MOCK_STATS.revenue.toLocaleString()}`} sub="Total earnings" />
      </div>

      {/* Product performance */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-[#1a2340] text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
            <span className="inline-block w-1 h-4 bg-[#ff6b00] rounded mr-2 align-middle" />
            Product Performance
          </h2>
          <span className="text-[11px] text-gray-400 font-medium">by orders placed</span>
        </div>
        <div className="space-y-4">
          {MOCK_PRODUCTS_STATS.map((p) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="text-xl w-8 shrink-0">{p.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-800 truncate">{p.name}</span>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    {p.trending && (
                      <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 font-bold px-2 py-0.5 rounded-md">
                        🔥 Top Seller
                      </span>
                    )}
                    <span className="text-xs font-bold text-gray-500">{p.orders} orders</span>
                    <span className="text-xs font-bold text-[#ff6b00]">₹{p.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff6b00] rounded-full transition-all"
                    style={{ width: `${(p.orders / maxOrders) * 100}%`, opacity: p.id === 1 ? 1 : 0.5 + (0.1 * (MOCK_PRODUCTS_STATS.length - p.id)) }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent orders preview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h2 className="font-bold text-[#1a2340] text-sm mb-4" style={{ fontFamily: "Poppins,sans-serif" }}>
          <span className="inline-block w-1 h-4 bg-[#ff6b00] rounded mr-2 align-middle" />
          Recent Orders
        </h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-gray-400 font-semibold uppercase tracking-wide border-b border-gray-100">
              <th className="pb-2 pr-4">Order</th>
              <th className="pb-2 pr-4">Customer</th>
              <th className="pb-2 pr-4">Item</th>
              <th className="pb-2 pr-4">Total</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.slice(0, 5).map((o) => (
              <tr key={o.id} className="border-b border-gray-50 last:border-0">
                <td className="py-2.5 pr-4 font-mono text-xs text-gray-400">{o.id}</td>
                <td className="py-2.5 pr-4 font-medium text-gray-700">{o.customer}</td>
                <td className="py-2.5 pr-4 text-gray-600">{o.item}</td>
                <td className="py-2.5 pr-4 font-bold text-[#1a2340]">₹{o.total}</td>
                <td className="py-2.5">
                  <StatusBadge status={o.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    pending:    "bg-amber-50 text-amber-600 border-amber-200",
    processing: "bg-blue-50 text-blue-600 border-blue-200",
    delivered:  "bg-green-50 text-green-600 border-green-200",
  };
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border capitalize ${map[status]}`}>
      {status}
    </span>
  );
}

// ─────────────────────────────────────────
// PRODUCTS PAGE
// ─────────────────────────────────────────
const EMPTY_PRODUCT = {
  name: "", category: "Thalis", price: "", mrp: "", discount: "", deliveryMin: "20",
  desc: "", image: "", fallbackEmoji: "🍽️",
  // Detail page fields
  shortDesc: "", weight: "", inclusive: "Inclusive of all taxes",
  tags: "", includes: "",
  images: ["", "", "", ""],
  whyTitle1: "Max 20 Min Delivery", whyDesc1: "",
  whyTitle2: "Ghar Jesa Swad",     whyDesc2: "",
  whyTitle3: "Hygienic & Fresh",   whyDesc3: "",
};

const CATEGORIES_LIST = ["All Items", "Thalis", "Puri Sabji", "Kachori", "Rice Meals", "Roti Meals", "Salads", "Drinks"];

function ProductsPage() {
  const [products, setProducts] = useState([
    { id: 1, name: "Student Thali", category: "Thalis", price: 60, mrp: 120, discount: "42% OFF", deliveryMin: 20, desc: "4 Roti • Chawal • Hari Sabji • Daal • Rayta • Aachar • Salad", image: "/images/student-thali.jpg", fallbackEmoji: "🍽️" },
    { id: 2, name: "Puri Paneer Sabji", category: "Puri Sabji", price: 70, mrp: 140, discount: "50% OFF", deliveryMin: 20, desc: "Fluffy puris with fresh paneer gravy", image: "/images/puri-paneer.jpg", fallbackEmoji: "🥙" },
    { id: 3, name: "Damalu Kachori", category: "Kachori", price: 60, mrp: 100, discount: "40% OFF", deliveryMin: 20, desc: "Crispy kachoris with fresh chutney", image: "/images/kachori.jpg", fallbackEmoji: "🧅" },
  ]);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState("home");

  const handleEdit = (p) => {
    setForm({ ...EMPTY_PRODUCT, ...p, images: p.images || ["", "", "", ""], tags: p.tags || "", includes: p.includes || "" });
    setEditing(p.id);
    setShowForm(true);
    setActiveFormTab("home");
  };

  const handleNew = () => {
    setForm(EMPTY_PRODUCT);
    setEditing(null);
    setShowForm(true);
    setActiveFormTab("home");
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) {
      setProducts((prev) => prev.map((p) => p.id === editing ? { ...p, ...form, id: editing } : p));
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now(), price: Number(form.price), mrp: Number(form.mrp), deliveryMin: Number(form.deliveryMin) }]);
    }
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id) => setProducts((prev) => prev.filter((p) => p.id !== id));

  const F = (key) => ({
    value: Array.isArray(form[key]) ? form[key] : (form[key] || ""),
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const setImageAt = (idx, val) => setForm((f) => {
    const imgs = [...(f.images || ["", "", "", ""])];
    imgs[idx] = val;
    return { ...f, images: imgs };
  });

  return (
    <div className="p-6 space-y-5">
      {/* Product list */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a2340] text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
            <span className="inline-block w-1 h-4 bg-[#ff6b00] rounded mr-2 align-middle" />
            Current Products ({products.length})
          </h2>
          <button
            onClick={handleNew}
            className="flex items-center gap-1.5 bg-[#ff6b00] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#e55f00] transition-colors"
          >
            + Add New Product
          </button>
        </div>
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-gray-100 rounded-xl px-4 py-3 hover:border-orange-100 transition-colors">
              <span className="text-2xl">{p.fallbackEmoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-800">{p.name}</p>
                <p className="text-[11px] text-gray-400 truncate">{p.desc}</p>
              </div>
              <span className="text-xs font-bold text-[#1a2340]">₹{p.price}</span>
              <del className="text-xs text-gray-400">₹{p.mrp}</del>
              <span className="text-[10px] bg-green-50 text-green-600 border border-green-200 font-bold px-2 py-0.5 rounded-md">{p.discount}</span>
              <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-md">{p.category}</span>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-xs font-bold text-[#ff6b00] border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(p.id)} className="text-xs font-bold text-red-400 border border-red-100 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#1a2340] text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
              {editing ? "Edit Product" : "Add New Product"}
            </h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
          </div>

          {/* Form tabs */}
          <div className="flex gap-2 mb-5 border-b border-gray-100 pb-3">
            {[{ key: "home", label: "Home Card Details" }, { key: "detail", label: "Detail Page Info" }, { key: "images", label: "Images" }].map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveFormTab(t.key)}
                className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${activeFormTab === t.key ? "bg-[#1a2340] text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab: Home Card */}
          {activeFormTab === "home" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Product Name *</label>
                <input {...F("name")} placeholder="e.g. Student Thali" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
                <select {...F("category")} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00] bg-white">
                  {CATEGORIES_LIST.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Fallback Emoji</label>
                <input {...F("fallbackEmoji")} placeholder="🍽️" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Price (₹)</label>
                <input {...F("price")} type="number" placeholder="60" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">MRP (₹)</label>
                <input {...F("mrp")} type="number" placeholder="120" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Discount Label</label>
                <input {...F("discount")} placeholder="42% OFF" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Delivery Time (min)</label>
                <input {...F("deliveryMin")} type="number" placeholder="20" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Short Description (card)</label>
                <textarea {...F("desc")} rows={2} placeholder="4 Roti • Chawal • Hari Sabji • Daal…" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00] resize-none" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Card Image Path / URL</label>
                <input {...F("image")} placeholder="/images/student-thali.jpg" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
            </div>
          )}

          {/* Tab: Detail Page */}
          {activeFormTab === "detail" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Detail Page Subtitle</label>
                <input {...F("shortDesc")} placeholder="Complete meal for students — filling, fresh & home-style" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Weight / Quantity</label>
                <input {...F("weight")} placeholder="1 full plate" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tax Label</label>
                <input {...F("inclusive")} placeholder="Inclusive of all taxes" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">What's Included (comma separated)</label>
                <input {...F("includes")} placeholder="4 Roti, Chawal, Hari Sabji, Daal, Rayta, Aachar, Salad" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 mb-1">Tags / Pills (comma separated)</label>
                <input {...F("tags")} placeholder="Vegetarian, Home-style, No Preservatives, Fresh Daily" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
              </div>
              <div className="col-span-2 border-t border-gray-100 pt-3">
                <p className="text-xs font-bold text-gray-500 mb-3">Why ShivKart? (3 bullet points)</p>
                {[1, 2, 3].map((n) => (
                  <div key={n} className="grid grid-cols-3 gap-3 mb-3">
                    <input
                      value={form[`whyTitle${n}`] || ""}
                      onChange={(e) => setForm((f) => ({ ...f, [`whyTitle${n}`]: e.target.value }))}
                      placeholder={`Title ${n}`}
                      className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                    />
                    <input
                      value={form[`whyDesc${n}`] || ""}
                      onChange={(e) => setForm((f) => ({ ...f, [`whyDesc${n}`]: e.target.value }))}
                      placeholder={`Description ${n}`}
                      className="col-span-2 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab: Images */}
          {activeFormTab === "images" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-400 font-medium">Add up to 4 image paths or URLs for the detail page gallery. First image = main hero.</p>
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">
                    {idx === 0 ? "Main Hero Image" : `Gallery Image ${idx + 1}`}
                  </label>
                  <input
                    value={form.images?.[idx] || ""}
                    onChange={(e) => setImageAt(idx, e.target.value)}
                    placeholder={`/images/product-${idx + 1}.jpg`}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button onClick={() => setShowForm(false)} className="text-sm font-bold text-gray-400 hover:text-gray-600 px-4 py-2">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#ff6b00] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#e55f00] transition-colors"
            >
              {editing ? "Save Changes" : "Add Product"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// BANNERS PAGE
// ─────────────────────────────────────────
const BANNER_BG_OPTIONS = [
  { label: "Navy",   value: "from-[#1a2340] to-[#2d3a60]" },
  { label: "Orange", value: "from-[#7c2d00] to-[#c45000]" },
  { label: "Blue",   value: "from-[#0f3460] to-[#1a5276]" },
  { label: "Green",  value: "from-[#064e3b] to-[#065f46]" },
];

const EMPTY_BANNER = { title: "", desc: "", tag: "", bg: "from-[#1a2340] to-[#2d3a60]", emoji: "", active: true };

function BannersPage() {
  const [banners, setBanners] = useState(MOCK_BANNERS);
  const [form, setForm] = useState(EMPTY_BANNER);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (b) => { setForm({ ...b }); setEditing(b.id); setShowForm(true); };
  const handleNew  = () => { setForm(EMPTY_BANNER); setEditing(null); setShowForm(true); };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) {
      setBanners((prev) => prev.map((b) => b.id === editing ? { ...b, ...form } : b));
    } else {
      setBanners((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const toggleActive = (id) => setBanners((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));
  const deleteBanner = (id) => setBanners((prev) => prev.filter((b) => b.id !== id));

  const F = (key) => ({ value: form[key] || "", onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })) });

  return (
    <div className="p-6 space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a2340] text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
            <span className="inline-block w-1 h-4 bg-[#ff6b00] rounded mr-2 align-middle" />
            Active Banners ({banners.length})
          </h2>
          <button onClick={handleNew} className="flex items-center gap-1.5 bg-[#ff6b00] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#e55f00] transition-colors">
            + Add Banner
          </button>
        </div>
        <div className="space-y-3">
          {banners.map((b) => (
            <div key={b.id} className={`rounded-xl overflow-hidden border ${b.active ? "border-orange-100" : "border-gray-100 opacity-60"}`}>
              <div className={`bg-gradient-to-r ${b.bg} px-5 py-4 flex items-center gap-4`}>
                <span className="text-2xl">{b.emoji || "🎉"}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white text-sm">{b.title}</p>
                  <p className="text-white/60 text-xs mt-0.5 truncate">{b.desc}</p>
                </div>
                <span className="text-[10px] bg-[#ff6b00] text-white font-black px-2 py-0.5 rounded-md shrink-0">{b.tag}</span>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(b.id)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${b.active ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30" : "bg-white/10 text-white/50 border-white/20 hover:bg-white/20"}`}
                  >
                    {b.active ? "Live" : "Inactive"}
                  </button>
                  <button onClick={() => handleEdit(b)} className="text-[10px] font-bold bg-white/15 text-white border border-white/25 px-3 py-1.5 rounded-lg hover:bg-white/25 transition-colors">Edit</button>
                  <button onClick={() => deleteBanner(b.id)} className="text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-400/30 px-3 py-1.5 rounded-lg hover:bg-red-500/30 transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#1a2340] text-sm">{editing ? "Edit Banner" : "Add New Banner"}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 text-lg">×</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Banner Title *</label>
              <input {...F("title")} placeholder="e.g. Student Thali Special" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
              <input {...F("desc")} placeholder="4 Roti • Chawal • Daal • Sabji…" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Offer Tag</label>
              <input {...F("tag")} placeholder="₹60 Only / 50% OFF" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Emoji</label>
              <input {...F("emoji")} placeholder="🍽️" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-2">Background Color</label>
              <div className="flex gap-2">
                {BANNER_BG_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, bg: opt.value }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all ${form.bg === opt.value ? "border-[#ff6b00] bg-orange-50 text-[#ff6b00]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                  >
                    <span className={`w-4 h-4 rounded-full bg-gradient-to-r ${opt.value} border border-gray-200`} />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="banner-active"
                checked={form.active}
                onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))}
                className="w-4 h-4 accent-[#ff6b00]"
              />
              <label htmlFor="banner-active" className="text-sm font-semibold text-gray-700">Set as Live / Active</label>
            </div>
          </div>
          {/* Preview */}
          {form.title && (
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-400 mb-2">Preview</p>
              <div className={`bg-gradient-to-r ${form.bg} rounded-xl px-5 py-4 flex items-center gap-4`}>
                <span className="text-2xl">{form.emoji || "🎉"}</span>
                <div>
                  <p className="font-bold text-white text-sm">{form.title}</p>
                  <p className="text-white/60 text-xs mt-0.5">{form.desc}</p>
                </div>
                {form.tag && <span className="ml-auto text-[10px] bg-[#ff6b00] text-white font-black px-2 py-0.5 rounded-md">{form.tag}</span>}
              </div>
            </div>
          )}
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button onClick={() => setShowForm(false)} className="text-sm font-bold text-gray-400 px-4 py-2">Cancel</button>
            <button onClick={handleSave} className="bg-[#ff6b00] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#e55f00] transition-colors">
              {editing ? "Save Changes" : "Add Banner"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// ORDERS PAGE
// ─────────────────────────────────────────
function OrdersPage() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [tab, setTab] = useState("pending");
  const [assignDropdown, setAssignDropdown] = useState(null);

  const filtered = orders.filter((o) => o.status === tab);

  const assignDriver = (orderId, driverName) => {
    setOrders((prev) =>
      prev.map((o) => o.id === orderId ? { ...o, driver: driverName, status: "processing" } : o)
    );
    setAssignDropdown(null);
  };

  const markDelivered = (orderId) => {
    setOrders((prev) => prev.map((o) => o.id === orderId ? { ...o, status: "delivered" } : o));
  };

  const counts = {
    pending:    orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    delivered:  orders.filter((o) => o.status === "delivered").length,
  };

  return (
    <div className="p-6 space-y-5">
      {/* Tab row */}
      <div className="flex gap-3">
        {[
          { key: "pending",    label: "Pending Orders",    color: "amber" },
          { key: "processing", label: "Processing",        color: "blue" },
          { key: "delivered",  label: "Delivered",         color: "green" },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
              tab === t.key
                ? "bg-[#1a2340] text-white border-[#1a2340]"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
            }`}
          >
            {t.label}
            <span className={`text-[11px] font-black px-2 py-0.5 rounded-md ${tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {counts[t.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-sm font-semibold">No {tab} orders</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-7 text-[11px] text-gray-400 font-semibold uppercase tracking-wide px-5 py-3 border-b border-gray-100 bg-gray-50">
              <span>Order ID</span>
              <span>Time</span>
              <span className="col-span-2">Customer</span>
              <span>Item · Qty</span>
              <span>Total</span>
              <span>Action</span>
            </div>
            {filtered.map((o) => (
              <div key={o.id} className="grid grid-cols-7 items-center px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors relative">
                <span className="font-mono text-xs text-[#ff6b00] font-bold">{o.id}</span>
                <span className="text-xs text-gray-400 font-medium">{o.time}</span>
                <div className="col-span-2">
                  <p className="text-sm font-bold text-gray-800">{o.customer}</p>
                  <p className="text-[11px] text-gray-400 font-medium truncate pr-2">{o.address}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-700">{o.item}</p>
                  <p className="text-[11px] text-gray-400">Qty: {o.qty}</p>
                </div>
                <span className="font-black text-sm text-[#1a2340]">₹{o.total}</span>

                {/* Actions column */}
                <div className="flex flex-col gap-1.5 relative">
                  {tab === "pending" && (
                    <div className="relative">
                      <button
                        onClick={() => setAssignDropdown(assignDropdown === o.id ? null : o.id)}
                        className="flex items-center gap-1.5 text-[11px] font-bold bg-[#1a2340] text-white px-3 py-1.5 rounded-lg hover:bg-[#2d3a60] transition-colors"
                      >
                        Assign Driver ▾
                      </button>
                      {assignDropdown === o.id && (
                        <div className="absolute top-8 left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden w-44">
                          {MOCK_DRIVERS.filter((d) => d.status === "active").map((d) => (
                            <button
                              key={d.id}
                              onClick={() => assignDriver(o.id, d.name)}
                              className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#ff6b00] transition-colors border-b border-gray-50 last:border-0"
                            >
                              <span className="block font-bold">{d.name}</span>
                              <span className="text-gray-400">{d.vehicle}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  {tab === "processing" && (
                    <>
                      <p className="text-[10px] text-blue-500 font-bold">🛵 {o.driver}</p>
                      <button
                        onClick={() => markDelivered(o.id)}
                        className="text-[11px] font-bold bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Mark Delivered
                      </button>
                    </>
                  )}
                  {tab === "delivered" && (
                    <p className="text-[10px] text-green-500 font-bold">✓ {o.driver}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// DRIVERS PAGE
// ─────────────────────────────────────────
const EMPTY_DRIVER = { name: "", phone: "", vehicle: "", address: "", username: "", password: "", status: "active" };

function DriversPage() {
  const [drivers, setDrivers] = useState(MOCK_DRIVERS);
  const [form, setForm] = useState(EMPTY_DRIVER);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (d) => { setForm({ ...d, password: "" }); setEditing(d.id); setShowForm(true); };
  const handleNew  = () => { setForm(EMPTY_DRIVER); setEditing(null); setShowForm(true); };

  const handleSave = () => {
    if (!form.name.trim() || !form.username.trim()) return;
    if (editing) {
      setDrivers((prev) => prev.map((d) => d.id === editing ? { ...d, ...form, id: editing } : d));
    } else {
      setDrivers((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const toggleStatus = (id) => setDrivers((prev) => prev.map((d) => d.id === id ? { ...d, status: d.status === "active" ? "inactive" : "active" } : d));
  const deleteDriver = (id) => setDrivers((prev) => prev.filter((d) => d.id !== id));

  const F = (key) => ({ value: form[key] || "", onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })) });

  return (
    <div className="p-6 space-y-5">
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#1a2340] text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
            <span className="inline-block w-1 h-4 bg-[#ff6b00] rounded mr-2 align-middle" />
            Registered Drivers ({drivers.length})
          </h2>
          <button onClick={handleNew} className="flex items-center gap-1.5 bg-[#ff6b00] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#e55f00] transition-colors">
            + Add Driver
          </button>
        </div>
        <div className="space-y-2">
          {drivers.map((d) => (
            <div key={d.id} className={`flex items-center gap-4 border rounded-xl px-4 py-3.5 transition-colors ${d.status === "active" ? "border-gray-100 hover:border-orange-100" : "border-gray-100 opacity-60"}`}>
              <div className="w-9 h-9 rounded-xl bg-[#1a2340] flex items-center justify-center text-white font-black text-sm shrink-0">
                {d.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-800">{d.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">{d.vehicle} · {d.phone}</p>
              </div>
              <span className="font-mono text-xs text-gray-400 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">@{d.username}</span>
              <button
                onClick={() => toggleStatus(d.id)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-colors ${d.status === "active" ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100" : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"}`}
              >
                {d.status === "active" ? "Active" : "Inactive"}
              </button>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(d)} className="text-xs font-bold text-[#ff6b00] border border-orange-200 bg-orange-50 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">Edit</button>
                <button onClick={() => deleteDriver(d.id)} className="text-xs font-bold text-red-400 border border-red-100 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-orange-200 p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#1a2340] text-sm">{editing ? "Edit Driver" : "Add New Driver"}</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 text-lg">×</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name *</label>
              <input {...F("name")} placeholder="e.g. Ramesh Kumar" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
              <input {...F("phone")} placeholder="9876543210" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Vehicle Name</label>
              <input {...F("vehicle")} placeholder="Honda Activa / TVS Jupiter…" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Home Address</label>
              <input {...F("address")} placeholder="Shivkuti, Prayagraj" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div className="col-span-2 border-t border-gray-100 pt-3">
              <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wide">Login Credentials</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Username *</label>
              <input {...F("username")} placeholder="e.g. ramesh01" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{editing ? "New Password (leave blank to keep)" : "Password"}</label>
              <input {...F("password")} type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#ff6b00]" />
            </div>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="driver-active"
                checked={form.status === "active"}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.checked ? "active" : "inactive" }))}
                className="w-4 h-4 accent-[#ff6b00]"
              />
              <label htmlFor="driver-active" className="text-sm font-semibold text-gray-700">Mark as Active</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
            <button onClick={() => setShowForm(false)} className="text-sm font-bold text-gray-400 px-4 py-2">Cancel</button>
            <button onClick={handleSave} className="bg-[#ff6b00] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#e55f00] transition-colors">
              {editing ? "Save Changes" : "Add Driver"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// PAGE TITLES
// ─────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: "Dashboard Overview",
  products:  "Add / Edit Products",
  banners:   "Manage Banners",
  orders:    "Order Management",
  drivers:   "Manage Drivers",
};

// ─────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────
export default function ShivKartAdmin() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50 font-[Nunito,sans-serif]">
      <Sidebar active={page} onChange={setPage} />
      <div className="ml-56">
        <TopBar title={PAGE_TITLES[page]} />
        <main>
          {page === "dashboard" && <Dashboard />}
          {page === "products"  && <ProductsPage />}
          {page === "banners"   && <BannersPage />}
          {page === "orders"    && <OrdersPage />}
          {page === "drivers"   && <DriversPage />}
        </main>
      </div>
    </div>
  );
}
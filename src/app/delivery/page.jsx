"use client";
import { useState } from "react";
import Image from "next/image";

// ─────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────
const INITIAL_ACTIVE = [
  {
    id: "SK1042",
    customerName: "Rahul Sharma",
    phone: "98765 43210",
    items: [
      { name: "Student Thali", qty: 2, price: 60 },
      { name: "Damalu Kachori", qty: 1, price: 60 },
    ],
    address: "House No. 14, Shivkuti Colony, Telierganj, Prayagraj",
    mapLink: "https://maps.google.com/?q=Shivkuti+Colony+Telierganj+Prayagraj",
    total: 180,
    otp: "4821",
    time: "Ordered 8 min ago",
    distance: "1.2 km",
  },
  {
    id: "SK1043",
    customerName: "Priya Gupta",
    phone: "91234 56789",
    items: [
      { name: "Special Thali", qty: 1, price: 70 },
      { name: "Puri Paneer Sabji", qty: 1, price: 70 },
    ],
    address: "B-7, Rasulabad Road, Chhota Baghada, Prayagraj",
    mapLink: "https://maps.google.com/?q=Rasulabad+Road+Chhota+Baghada+Prayagraj",
    total: 140,
    otp: "7364",
    time: "Ordered 15 min ago",
    distance: "2.4 km",
  },
];

const INITIAL_HISTORY = [
  {
    id: "SK1039",
    customerName: "Amit Verma",
    phone: "99887 76655",
    items: [{ name: "Special Chola Bhatura", qty: 2, price: 70 }],
    address: "12, Govindpur, Prayagraj",
    total: 140,
    status: "Delivered",
    deliveredAt: "Today, 11:42 AM",
    earnings: 18,
  },
  {
    id: "SK1037",
    customerName: "Sunita Yadav",
    phone: "97766 55443",
    items: [
      { name: "Student Thali", qty: 3, price: 60 },
      { name: "Damalu Kachori", qty: 2, price: 60 },
    ],
    address: "Near Hanuman Mandir, Telierganj, Prayagraj",
    total: 300,
    status: "Delivered",
    deliveredAt: "Today, 10:18 AM",
    earnings: 25,
  },
  {
    id: "SK1034",
    customerName: "Deepak Singh",
    phone: "98112 34567",
    items: [{ name: "Puri Paneer Sabji", qty: 1, price: 70 }],
    address: "Flat 3B, Shivkuti Apartments, Prayagraj",
    total: 70,
    status: "Issue Reported",
    issue: "Customer not available at address",
    deliveredAt: "Yesterday, 7:55 PM",
    earnings: 0,
  },
];

// ─────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────
function Logo() {
  return (
    <div className="flex items-center gap-2">
       <Image
        src="/shivkart-logo.jpg"
        alt="ShivKart Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <div className="leading-none">
        <div className="font-black text-lg text-[#1a2340]" style={{ fontFamily: "Poppins,sans-serif" }}>
          Shiv<span className="text-[#ff6b00]">Kart</span>
        </div>
        <div className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Delivery App</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// OTP MODAL
// ─────────────────────────────────────────
function OtpModal({ order, onSuccess, onClose }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const refs = [null, null, null, null].map(() => {
    let r;
    return (el) => { r = el; return r; };
  });
  const inputRefs = Array.from({ length: 4 }, () => ({ current: null }));

  const handleDigit = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError(false);
    if (val && i < 3) inputRefs[i + 1].current?.focus();
  };

  const handleKey = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) inputRefs[i - 1].current?.focus();
  };

  const handleSubmit = () => {
    const entered = digits.join("");
    if (entered === order.otp) {
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setDigits(["", "", "", ""]);
      inputRefs[0].current?.focus();
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className={`bg-white rounded-3xl p-7 w-full max-w-xs shadow-2xl ${shake ? "animate-[wiggle_0.4s_ease]" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={shake ? { animation: "shake 0.4s ease" } : {}}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path strokeLinecap="round" d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          </div>
          <h2 className="font-black text-gray-900 text-lg" style={{ fontFamily: "Poppins,sans-serif" }}>Enter OTP</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Ask <span className="text-gray-700 font-bold">{order.customerName}</span> for the 4-digit OTP
          </p>
        </div>

        {/* OTP inputs */}
        <div className="flex gap-3 justify-center mb-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKey(i, e)}
              className={`w-14 h-14 text-center text-2xl font-black rounded-2xl border-2 outline-none transition-all
                ${error ? "border-red-400 bg-red-50 text-red-600" : d ? "border-[#ff6b00] bg-orange-50 text-[#ff6b00]" : "border-gray-200 bg-gray-50 text-gray-900"}
                focus:border-[#ff6b00] focus:bg-orange-50`}
              style={{ fontFamily: "Poppins,sans-serif" }}
              autoFocus={i === 0}
            />
          ))}
        </div>
        {error && (
          <p className="text-center text-xs text-red-500 font-bold mb-4">Incorrect OTP. Try again.</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={digits.some((d) => d === "")}
          className="w-full mt-4 bg-[#ff6b00] disabled:bg-gray-200 disabled:text-gray-400 text-white font-black py-3.5 rounded-2xl text-base hover:bg-[#e55f00] transition-colors"
        >
          Confirm Delivery
        </button>
        <button onClick={onClose} className="w-full mt-2.5 text-sm text-gray-400 font-semibold py-1 hover:text-gray-600 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// ISSUE PANEL (inline below card)
// ─────────────────────────────────────────
function IssuePanel({ orderId, onSubmit, onClose }) {
  const [text, setText] = useState("");
  return (
    <div className="mt-3 bg-red-50 border border-red-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4m0 4h.01" />
        </svg>
        <span className="font-bold text-red-700 text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>Report an Issue</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe the issue… e.g. Customer not reachable, wrong address, etc."
        rows={3}
        className="w-full bg-white border border-red-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 placeholder-gray-400 outline-none focus:border-red-400 resize-none"
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => text.trim() && onSubmit(orderId, text.trim())}
          disabled={!text.trim()}
          className="flex-1 bg-red-500 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black text-sm py-2.5 rounded-xl hover:bg-red-600 transition-colors"
        >
          Submit Issue
        </button>
        <button
          onClick={onClose}
          className="px-4 bg-white border border-gray-200 text-gray-500 font-bold text-sm rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// ACTIVE ORDER CARD
// ─────────────────────────────────────────
function ActiveCard({ order, onDelivered, onIssue }) {
  const [issueOpen, setIssueOpen] = useState(false);
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Top stripe */}
      <div className="bg-gradient-to-r from-[#1a2340] to-[#2d3a60] px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 bg-[#ff6b00] rounded-full animate-pulse" />
          <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Order #{order.id}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/55 font-medium">{order.time}</span>
          <span className="bg-[#ff6b00]/20 border border-[#ff6b00]/40 text-[#ff8c00] text-xs font-bold px-2 py-0.5 rounded-full">
            {order.distance}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Customer info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border-2 border-orange-100 flex items-center justify-center font-black text-lg text-[#ff6b00]" style={{ fontFamily: "Poppins,sans-serif" }}>
              {order.customerName[0]}
            </div>
            <div>
              <p className="font-black text-gray-900 text-base leading-tight" style={{ fontFamily: "Poppins,sans-serif" }}>{order.customerName}</p>
              <a href={`tel:${order.phone}`} className="text-xs text-[#ff6b00] font-bold hover:underline flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>
                {order.phone}
              </a>
            </div>
          </div>
          {/* Total */}
          <div className="text-right">
            <p className="font-black text-[#1a2340] text-xl" style={{ fontFamily: "Poppins,sans-serif" }}>₹{total}</p>
            <p className="text-xs text-gray-400 font-medium">{order.items.reduce((s, i) => s + i.qty, 0)} items</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
          {order.items.map((item, i) => (
            <div key={i} className={`flex items-center justify-between py-1.5 ${i < order.items.length - 1 ? "border-b border-gray-100" : ""}`}>
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-5 h-5 bg-[#ff6b00] text-white rounded-full text-[10px] font-black flex items-center justify-center shrink-0">{item.qty}</span>
                {item.name}
              </span>
              <span className="text-sm font-bold text-gray-900">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        {/* Address + map */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 leading-snug">{order.address}</p>
            <a
              href={order.mapLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 mt-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0L9 7"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => { setIssueOpen((v) => !v); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 font-black text-sm hover:bg-red-100 hover:border-red-300 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
            </svg>
            Issue
          </button>
          <button
            onClick={() => onDelivered(order)}
            className="flex-[2] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#ff6b00] text-white font-black text-sm hover:bg-[#e55f00] transition-all shadow-md shadow-orange-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Delivered
          </button>
        </div>

        {/* Issue panel */}
        {issueOpen && (
          <IssuePanel
            orderId={order.id}
            onSubmit={(id, issue) => { onIssue(id, issue); setIssueOpen(false); }}
            onClose={() => setIssueOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// HISTORY CARD
// ─────────────────────────────────────────
function HistoryCard({ order }) {
  const isIssue = order.status === "Issue Reported";
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm">
      {/* Status stripe */}
      <div className={`px-5 py-2.5 flex items-center justify-between ${isIssue ? "bg-red-50 border-b border-red-100" : "bg-green-50 border-b border-green-100"}`}>
        <div className="flex items-center gap-2">
          {isIssue ? (
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          )}
          <span className={`text-xs font-black uppercase tracking-wider ${isIssue ? "text-red-600" : "text-green-700"}`}>
            {order.status}
          </span>
        </div>
        <span className="text-xs text-gray-400 font-medium">{order.deliveredAt}</span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base ${isIssue ? "bg-red-50 text-red-500 border-2 border-red-100" : "bg-green-50 text-green-700 border-2 border-green-100"}`} style={{ fontFamily: "Poppins,sans-serif" }}>
              {order.customerName[0]}
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>{order.customerName}</p>
              <p className="text-xs text-gray-400 font-medium">#{order.id}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-black text-gray-900 text-base" style={{ fontFamily: "Poppins,sans-serif" }}>₹{order.total}</p>
            {!isIssue && (
              <p className="text-xs text-green-600 font-bold">+₹{order.earnings} earned</p>
            )}
          </div>
        </div>

        {/* Items condensed */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {order.items.map((item, i) => (
            <span key={i} className="bg-gray-50 border border-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-1 rounded-lg">
              {item.qty}× {item.name}
            </span>
          ))}
        </div>

        {/* Address */}
        <div className="flex items-start gap-2 text-xs text-gray-400 font-medium">
          <svg className="w-3.5 h-3.5 text-gray-300 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
          </svg>
          {order.address}
        </div>

        {/* Issue note */}
        {isIssue && order.issue && (
          <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
            <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M13 16h-1v-4h-1m1-4h.01"/>
            </svg>
            <p className="text-xs text-red-600 font-medium leading-snug">{order.issue}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────
export default function DeliveryPage() {
  const [tab, setTab] = useState("active");
  const [activeOrders, setActiveOrders] = useState(INITIAL_ACTIVE);
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [otpOrder, setOtpOrder] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const handleDeliveredSuccess = () => {
    const order = otpOrder;
    setActiveOrders((prev) => prev.filter((o) => o.id !== order.id));
    setHistory((prev) => [
      {
        ...order,
        status: "Delivered",
        deliveredAt: "Just now",
        earnings: Math.floor(order.total * 0.1),
      },
      ...prev,
    ]);
    setOtpOrder(null);
    showToast(`Order #${order.id} marked as Delivered! ✓`, "success");
    if (activeOrders.length === 1) setTab("history");
  };

  const handleIssue = (orderId, issueText) => {
    const order = activeOrders.find((o) => o.id === orderId);
    setActiveOrders((prev) => prev.filter((o) => o.id !== orderId));
    setHistory((prev) => [
      {
        ...order,
        status: "Issue Reported",
        issue: issueText,
        deliveredAt: "Just now",
        earnings: 0,
      },
      ...prev,
    ]);
    showToast(`Issue reported for #${orderId}`, "error");
    if (activeOrders.length === 1) setTab("history");
  };

  const todayEarnings = history
    .filter((h) => h.deliveredAt.startsWith("Today") || h.deliveredAt === "Just now")
    .reduce((s, h) => s + (h.earnings || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Nunito, sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-3.5 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs text-gray-400 font-medium">Today's earnings</p>
              <p className="font-black text-[#ff6b00] text-base" style={{ fontFamily: "Poppins,sans-serif" }}>₹{todayEarnings}</p>
            </div>
            <div className="w-9 h-9 bg-[#1a2340] rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5">

        {/* ── TABS ── */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-1.5 flex mb-5 shadow-sm">
          <button
            onClick={() => setTab("active")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-sm transition-all ${
              tab === "active"
                ? "bg-[#1a2340] text-white shadow-md"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Active
            {activeOrders.length > 0 && (
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${tab === "active" ? "bg-[#ff6b00] text-white" : "bg-orange-100 text-[#ff6b00]"}`}>
                {activeOrders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setTab("history")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-sm transition-all ${
              tab === "history"
                ? "bg-[#1a2340] text-white shadow-md"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            History
            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${tab === "history" ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"}`}>
              {history.length}
            </span>
          </button>
        </div>

        {/* ── ACTIVE TAB ── */}
        {tab === "active" && (
          <div>
            {activeOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-black text-gray-700 text-lg" style={{ fontFamily: "Poppins,sans-serif" }}>All done!</p>
                  <p className="text-sm text-gray-400 font-medium mt-1">No active orders right now. Great work!</p>
                </div>
                <button onClick={() => setTab("history")} className="bg-[#ff6b00] text-white font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-[#e55f00] transition-colors">
                  View History
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {activeOrders.map((order) => (
                  <ActiveCard
                    key={order.id}
                    order={order}
                    onDelivered={(o) => setOtpOrder(o)}
                    onIssue={handleIssue}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === "history" && (
          <div>
            {/* Earnings summary */}
            {history.length > 0 && (
              <div className="bg-gradient-to-br from-[#1a2340] to-[#2d3a60] rounded-2xl p-5 mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1">Today's Earnings</p>
                  <p className="font-black text-3xl text-white" style={{ fontFamily: "Poppins,sans-serif" }}>₹{todayEarnings}</p>
                  <p className="text-xs text-white/50 font-medium mt-1">
                    {history.filter(h => h.status === "Delivered").length} delivered · {history.filter(h => h.status === "Issue Reported").length} issues
                  </p>
                </div>
                <div className="w-16 h-16 bg-[#ff6b00]/20 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#ff8c00]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
              </div>
            )}

            {history.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-black text-gray-700 text-lg" style={{ fontFamily: "Poppins,sans-serif" }}>No history yet</p>
                  <p className="text-sm text-gray-400 font-medium mt-1">Completed orders will appear here.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {history.map((order) => (
                  <HistoryCard key={order.id + order.deliveredAt} order={order} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── OTP MODAL ── */}
      {otpOrder && (
        <OtpModal
          order={otpOrder}
          onSuccess={handleDeliveredSuccess}
          onClose={() => setOtpOrder(null)}
        />
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold text-white transition-all ${toast.type === "success" ? "bg-green-600" : "bg-red-500"}`}>
          {toast.type === "success" ? (
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M12 8v4m0 4h.01"/></svg>
          )}
          {toast.msg}
        </div>
      )}
    </div>
  );
}


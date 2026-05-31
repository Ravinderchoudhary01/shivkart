// "use client";
// import { useState } from "react";

// // ─────────────────────────────────────────
// // CART MODAL COMPONENT
// // Drop this entire file next to ShivKartHome.jsx
// // Then follow the integration steps at the bottom of this file
// // ─────────────────────────────────────────

// export function CartModal({ cartItems, setCartItems, onClose }) {
//   // cartItems shape: [{ id, name, desc, price, image, fallbackEmoji, qty }]

//   const updateQty = (id, delta) => {
//     setCartItems((prev) =>
//       prev
//         .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
//         .filter((item) => item.qty > 0)
//     );
//   };

//   const itemsTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
//   const deliveryCharge = 0; // FREE
//   const handlingCharge = 2;
//   const grandTotal = itemsTotal + deliveryCharge + handlingCharge;

//   return (
//     // Backdrop
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       {/* Drawer panel */}
//       <div
//         className="relative h-full w-full max-w-sm bg-gray-50 flex flex-col shadow-2xl overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ── HEADER ── */}
//         <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
//           <button
//             onClick={onClose}
//             className="flex items-center gap-2 text-gray-700 font-bold text-base hover:text-[#ff6b00] transition-colors"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
//             </svg>
//             My Cart
//           </button>
//           <button className="flex items-center gap-1.5 text-[#ff6b00] text-sm font-bold hover:underline">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
//             </svg>
//             Share
//           </button>
//         </div>

//         {/* ── SCROLLABLE BODY ── */}
//         <div className="flex-1 overflow-y-auto">

//           {/* Empty state */}
//           {cartItems.length === 0 && (
//             <div className="flex flex-col items-center justify-center h-64 gap-3">
//               <span className="text-6xl">🛒</span>
//               <p className="text-gray-500 font-semibold text-sm">Your cart is empty</p>
//               <button
//                 onClick={onClose}
//                 className="bg-[#ff6b00] text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-[#e55f00] transition-colors"
//               >
//                 Browse Menu
//               </button>
//             </div>
//           )}

//           {cartItems.length > 0 && (
//             <>
//               {/* ── DELIVERY BANNER ── */}
//               <div className="bg-white mx-3 mt-3 rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-gray-100">
//                 <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
//                   <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                     <circle cx="12" cy="12" r="10" />
//                     <path strokeLinecap="round" d="M12 6v6l4 2" />
//                   </svg>
//                 </div>
//                 <div>
//                   <p className="font-black text-gray-900 text-sm">Delivery in 20 minutes</p>
//                   <p className="text-xs text-gray-500 font-medium">
//                     Shipment of {cartItems.reduce((s, i) => s + i.qty, 0)} item{cartItems.reduce((s, i) => s + i.qty, 0) > 1 ? "s" : ""}
//                   </p>
//                 </div>
//               </div>

//               {/* ── CART ITEMS ── */}
//               <div className="bg-white mx-3 mt-3 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                 {cartItems.map((item, idx) => (
//                   <div
//                     key={item.id}
//                     className={`flex items-center gap-3 px-4 py-3.5 ${idx !== cartItems.length - 1 ? "border-b border-gray-100" : ""}`}
//                   >
//                     {/* Product image */}
//                     <div className="w-16 h-16 rounded-xl overflow-hidden bg-orange-50 shrink-0 border border-gray-100">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.style.display = "none";
//                           e.target.parentNode.innerHTML = `<span style="font-size:32px;display:flex;align-items:center;justify-content:center;height:100%">${item.fallbackEmoji}</span>`;
//                         }}
//                       />
//                     </div>

//                     {/* Name + price */}
//                     <div className="flex-1 min-w-0">
//                       <p className="font-bold text-sm text-gray-800 leading-snug truncate" style={{ fontFamily: "Poppins, sans-serif" }}>
//                         {item.name}
//                       </p>
//                       <p className="text-xs text-gray-400 font-medium mb-1">{item.desc}</p>
//                       <p className="font-black text-sm text-gray-900">₹{item.price}</p>
//                     </div>

//                     {/* Qty stepper */}
//                     <div className="flex items-center bg-[#ff6b00] rounded-xl overflow-hidden shrink-0">
//                       <button
//                         onClick={() => updateQty(item.id, -1)}
//                         className="w-8 h-8 flex items-center justify-center text-white font-black text-lg hover:bg-[#e55f00] transition-colors"
//                       >
//                         −
//                       </button>
//                       <span className="w-7 text-center text-white font-black text-sm">{item.qty}</span>
//                       <button
//                         onClick={() => updateQty(item.id, +1)}
//                         className="w-8 h-8 flex items-center justify-center text-white font-black text-lg hover:bg-[#e55f00] transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* ── BILL DETAILS ── */}
//               <div className="bg-white mx-3 mt-3 rounded-2xl shadow-sm border border-gray-100 p-4">
//                 <h3 className="font-black text-gray-900 text-sm mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>
//                   Bill details
//                 </h3>
//                 <div className="space-y-2.5">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="flex items-center gap-1.5 text-gray-600 font-medium">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
//                       </svg>
//                       Items total
//                     </span>
//                     <span className="font-bold text-gray-900">₹{itemsTotal}</span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="flex items-center gap-1.5 text-gray-600 font-medium">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" /><rect x="9" y="11" width="14" height="10" rx="1" /><circle cx="12" cy="16" r="1" /><circle cx="20" cy="16" r="1" />
//                       </svg>
//                       Delivery charge
//                     </span>
//                     <span className="flex items-center gap-1.5">
//                       <del className="text-gray-400 font-medium">₹12</del>
//                       <span className="font-black text-green-600">FREE</span>
//                     </span>
//                   </div>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="flex items-center gap-1.5 text-gray-600 font-medium">
//                       <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//                       </svg>
//                       Handling charge
//                     </span>
//                     <span className="font-bold text-gray-900">₹{handlingCharge}</span>
//                   </div>
//                   <div className="border-t border-gray-100 pt-2.5 flex items-center justify-between">
//                     <span className="flex items-center gap-1.5 font-black text-gray-900 text-sm">
//                       Grand total
//                       <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                         <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4m0 4h.01" />
//                       </svg>
//                     </span>
//                     <span className="font-black text-gray-900">₹{grandTotal}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* ── CANCELLATION POLICY ── */}
//               <div className="bg-white mx-3 mt-3 mb-4 rounded-2xl shadow-sm border border-gray-100 p-4">
//                 <h3 className="font-black text-gray-900 text-sm mb-1.5" style={{ fontFamily: "Poppins, sans-serif" }}>
//                   Cancellation Policy
//                 </h3>
//                 <p className="text-xs text-gray-400 font-medium leading-relaxed">
//                   Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.
//                 </p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* ── STICKY FOOTER CTA ── */}
//         {cartItems.length > 0 && (
//           <div className="bg-white border-t border-gray-100 p-3">
//             <button className="w-full bg-[#ff6b00] hover:bg-[#e55f00] transition-colors text-white rounded-2xl py-4 flex items-center justify-between px-5">
//               <div className="text-left">
//                 <p className="font-black text-base">₹{grandTotal}</p>
//                 <p className="text-xs text-white/80 font-semibold uppercase tracking-wide">TOTAL</p>
//               </div>
//               <span className="font-black text-base">Login to Proceed &gt;</span>
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// // ═══════════════════════════════════════════════════════════════
// // HOW TO INTEGRATE INTO ShivKartHome.jsx — EXACT CHANGES NEEDED
// // ═══════════════════════════════════════════════════════════════
// //
// // STEP 1 ── Import CartModal at the top of ShivKartHome.jsx
// // ──────────────────────────────────────────────────────────
// //   import { CartModal } from "./CartModal";
// //
// //
// // STEP 2 ── Add cartItems + cartOpen state inside ShivKartHome()
// // ──────────────────────────────────────────────────────────────
// //   Replace this existing line:
// //     const [cartCount, setCartCount] = useState(0);
// //
// //   With these three lines:
// //     const [cartItems, setCartItems] = useState([]);
// //     const [cartOpen, setCartOpen]   = useState(false);
// //     const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
// //
// //
// // STEP 3 ── Replace the addToCart function
// // ─────────────────────────────────────────
// //   Remove:
// //     const addToCart = () => setCartCount((n) => n + 1);
// //
// //   Add:
// //     const addToCart = (product) => {
// //       setCartItems((prev) => {
// //         const existing = prev.find((i) => i.id === product.id);
// //         if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
// //         return [...prev, { ...product, qty: 1 }];
// //       });
// //     };
// //
// //
// // STEP 4 ── Open cart when Navbar cart button is clicked
// // ──────────────────────────────────────────────────────
// //   In the <Navbar> JSX call, add onCartClick prop:
// //     <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
// //
// //   Then inside the Navbar component definition, accept + wire it:
// //     function Navbar({ cartCount, onCartClick }) {
// //       ...
// //       <button ... onClick={onCartClick}>   ← add onClick here on the cart button
// //
// //
// // STEP 5 ── Pass product to onAdd in ProductCard
// // ───────────────────────────────────────────────
// //   In ProductsGrid, change:
// //     <ProductCard key={p.id} product={p} onAdd={onAdd} />
// //
// //   And inside ProductCard, change handleAdd to:
// //     const handleAdd = () => {
// //       onAdd(product);          ← pass full product object
// //       setAdded(true);
// //       setTimeout(() => setAdded(false), 1200);
// //     };
// //
// //   And in ShivKartHome JSX where ProductsGrid is rendered, change:
// //     <ProductsGrid onAdd={addToCart} />
// //
// //   (no change needed here since addToCart now accepts a product)
// //
// //
// // STEP 6 ── Render CartModal inside ShivKartHome return()
// // ────────────────────────────────────────────────────────
// //   Add just before the closing </div> of the root div:
// //
// //     {cartOpen && (
// //       <CartModal
// //         cartItems={cartItems}
// //         setCartItems={setCartItems}
// //         onClose={() => setCartOpen(false)}
// //       />
// //     )}
// //
// // ═══════════════════════════════════════════════════════════════
// // FINAL ShivKartHome() should look like this (skeleton):
// // ═══════════════════════════════════════════════════════════════
// //
// // export default function ShivKartHome() {
// //   const [cartItems, setCartItems] = useState([]);
// //   const [cartOpen, setCartOpen]   = useState(false);
// //   const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
// //
// //   const addToCart = (product) => {
// //     setCartItems((prev) => {
// //       const existing = prev.find((i) => i.id === product.id);
// //       if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
// //       return [...prev, { ...product, qty: 1 }];
// //     });
// //   };
// //
// //   return (
// //     <div className="min-h-screen bg-gray-50 font-[Nunito,sans-serif]">
// //       <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
// //       <main className="max-w-7xl mx-auto px-5 py-6">
// //         <HeroBanner />
// //         <MiniBanners />
// //         <CategoryRow />
// //         <ProductsGrid onAdd={addToCart} />
// //         <OfferStrip />
// //         <WhySection />
// //       </main>
// //       <Footer />
// //       {cartOpen && (
// //         <CartModal
// //           cartItems={cartItems}
// //           setCartItems={setCartItems}
// //           onClose={() => setCartOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // }


"use client";
import { useState } from "react";

// ─────────────────────────────────────────
// HARDCODED CART ITEMS — change here only
// ─────────────────────────────────────────
const HARDCODED_ITEMS = [
  {
    id: 1,
    name: "Student Thali",
    desc: "4 Roti • Chawal • Hari Sabji • Daal • Rayta",
    price: 60,
    qty: 1,
    image: "/shivkart-product2.jpg",
    fallbackEmoji: "🍽️",
  },
  {
    id: 2,
    name: "Puri Paneer Sabji",
    desc: "Fluffy puris with fresh paneer gravy",
    price: 70,
    qty: 1,
    image: "/shivkart-product.jpg",
    fallbackEmoji: "🥙",
  },
];

const DELIVERY_CHARGE = 0;
const HANDLING_CHARGE = 2;

// ─────────────────────────────────────────
// OTP INPUT
// ─────────────────────────────────────────
function OtpBoxes({ value, onChange }) {
  const digits = (value + "      ").slice(0, 6).split("");

  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = (value + "      ").slice(0, 6).split("");
    arr[idx] = v;
    onChange(arr.join("").trimEnd());
    if (v && idx < 5) {
      const next = e.target.parentNode.children[idx + 1];
      if (next) next.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !digits[idx].trim() && idx > 0) {
      const prev = e.target.parentNode.children[idx - 1];
      if (prev) prev.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d.trim()}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-10 h-11 text-center text-base font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all text-[#1a2340] bg-white"
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 1 — CART VIEW
// ─────────────────────────────────────────
function CartView({ items, onUpdateQty, onProceed, onClose }) {
  const itemsTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = itemsTotal + HANDLING_CHARGE;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shrink-0">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-gray-700 font-bold text-sm hover:text-[#ff6b00] transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          My Cart
        </button>
        <span className="text-xs font-semibold text-gray-400">
          {items.reduce((s, i) => s + i.qty, 0)} items
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Delivery ETA */}
        <div className="bg-white mx-3 mt-3 rounded-2xl p-3.5 flex items-center gap-3 border border-gray-100">
          <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <p className="font-black text-gray-900 text-sm">Delivery in 20 minutes</p>
            <p className="text-xs text-gray-400 font-medium">Hot & fresh to your door</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white mx-3 mt-3 rounded-2xl border border-gray-100 overflow-hidden">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${idx !== items.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-orange-50 shrink-0 border border-gray-100 flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentNode.innerHTML = `<span style="font-size:28px">${item.fallbackEmoji}</span>`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-800 truncate" style={{ fontFamily: "Poppins,sans-serif" }}>
                  {item.name}
                </p>
                <p className="text-[11px] text-gray-400 font-medium truncate mb-1">{item.desc}</p>
                <p className="font-black text-sm text-[#1a2340]">₹{item.price}</p>
              </div>
              <div className="flex items-center bg-[#ff6b00] rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => onUpdateQty(item.id, -1)}
                  className="w-8 h-8 flex items-center justify-center text-white font-black text-lg hover:bg-[#e55f00] transition-colors"
                >
                  −
                </button>
                <span className="w-6 text-center text-white font-black text-sm">{item.qty}</span>
                <button
                  onClick={() => onUpdateQty(item.id, +1)}
                  className="w-8 h-8 flex items-center justify-center text-white font-black text-lg hover:bg-[#e55f00] transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="bg-white mx-3 mt-3 rounded-2xl border border-gray-100 p-4">
          <h3 className="font-black text-gray-900 text-sm mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            Bill details
          </h3>
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Items total</span>
              <span className="font-bold text-gray-800">₹{itemsTotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Delivery charge</span>
              <span className="flex items-center gap-1.5">
                <del className="text-gray-400 font-medium text-xs">₹12</del>
                <span className="font-black text-green-600 text-xs">FREE</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Handling charge</span>
              <span className="font-bold text-gray-800">₹{HANDLING_CHARGE}</span>
            </div>
            <div className="border-t border-gray-100 pt-2.5 flex justify-between">
              <span className="font-black text-gray-900">Grand total</span>
              <span className="font-black text-gray-900">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Cancellation policy */}
        <div className="bg-white mx-3 mt-3 mb-4 rounded-2xl border border-gray-100 p-4">
          <h3 className="font-black text-gray-900 text-xs mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
            Cancellation Policy
          </h3>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">
            Orders cannot be cancelled once packed. In case of unexpected delays, a refund will be provided.
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-white border-t border-gray-100 p-3 shrink-0">
        <button
          onClick={onProceed}
          className="w-full bg-[#ff6b00] hover:bg-[#e55f00] transition-colors text-white rounded-2xl py-4 flex items-center justify-between px-5"
        >
          <div className="text-left">
            <p className="font-black text-base">₹{grandTotal}</p>
            <p className="text-[11px] text-white/70 font-semibold uppercase tracking-wide">Total</p>
          </div>
          <span className="font-black text-sm">Proceed to Pay →</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 2 — OTP VERIFICATION
// ─────────────────────────────────────────
function OtpStep({ onVerified, onBack }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [error, setError] = useState(false);

  // Start timer once
  useState(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  });

  const handleVerify = () => {
    // For demo: any 6-digit code works
    if (otp.length === 6) {
      onVerified();
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="text-gray-500 hover:text-[#ff6b00] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
          Verify Your Number
        </h2>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col justify-center px-6 gap-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 border-2 border-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-[#ff6b00]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="font-bold text-gray-800 text-sm mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
            OTP sent to <span className="text-[#ff6b00]">+91 98765 43210</span>
          </p>
          <p className="text-xs text-gray-400 font-medium">Enter the 6-digit code to confirm your order</p>
        </div>

        <OtpBoxes value={otp} onChange={setOtp} />

        {error && (
          <p className="text-center text-xs font-bold text-red-500">Please enter a valid 6-digit OTP</p>
        )}

        <div className="text-center">
          {timerActive ? (
            <p className="text-xs text-gray-400 font-medium">
              Resend OTP in <span className="font-black text-[#ff6b00]">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={() => { setTimer(30); setTimerActive(true); }}
              className="text-xs font-bold text-[#ff6b00] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

        <p className="text-center text-[11px] text-gray-300 font-medium">
          (For demo, enter any 6 digits)
        </p>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-3 shrink-0">
        <button
          onClick={handleVerify}
          disabled={otp.length < 6}
          className="w-full bg-[#ff6b00] hover:bg-[#e55f00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white font-black text-sm py-4 rounded-2xl"
        >
          Verify & Continue →
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 3 — PAYMENT METHOD
// ─────────────────────────────────────────
const PAYMENT_METHODS = [
  { id: "cod",  label: "Cash on Delivery",  sub: "Pay when your order arrives",   icon: "💵" },
  { id: "upi",  label: "UPI / QR Pay",      sub: "GPay, PhonePe, Paytm & more",   icon: "📲" },
  { id: "card", label: "Debit / Credit Card", sub: "Visa, Mastercard, RuPay",     icon: "💳" },
];

function PaymentStep({ grandTotal, onPlaceOrder, onBack }) {
  const [selected, setSelected] = useState("cod");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="text-gray-500 hover:text-[#ff6b00] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="font-bold text-gray-800 text-sm" style={{ fontFamily: "Poppins,sans-serif" }}>
          Payment Method
        </h2>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {/* Delivery address preview */}
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-base mt-0.5">📍</span>
          <div>
            <p className="font-bold text-xs text-orange-800 mb-0.5">Delivering to</p>
            <p className="text-xs text-orange-700 font-medium leading-relaxed">
              H-12, Shivkuti Colony, Near Hanuman Temple,<br />Prayagraj — 211001
            </p>
          </div>
        </div>

        {/* Payment options */}
        <div className="space-y-2.5">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                selected === m.id
                  ? "border-[#ff6b00] bg-orange-50"
                  : "border-gray-100 bg-white hover:border-orange-200"
              }`}
            >
              <span className="text-2xl shrink-0">{m.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm ${selected === m.id ? "text-[#ff6b00]" : "text-gray-800"}`} style={{ fontFamily: "Poppins,sans-serif" }}>
                  {m.label}
                </p>
                <p className="text-xs text-gray-400 font-medium">{m.sub}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                selected === m.id ? "border-[#ff6b00] bg-[#ff6b00]" : "border-gray-300"
              }`}>
                {selected === m.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* COD note */}
        {selected === "cod" && (
          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-green-700">
              ✓ Keep exact change ready. Our delivery partner will collect ₹{grandTotal} at your door.
            </p>
          </div>
        )}

        {/* UPI placeholder */}
        {selected === "upi" && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-blue-700">
              📲 A payment request will be sent to your UPI app after placing the order.
            </p>
          </div>
        )}

        {/* Card placeholder */}
        {selected === "card" && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-xs font-semibold text-gray-600">
              🔒 Card details collected securely at checkout. Powered by Razorpay.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-3 shrink-0">
        <button
          onClick={() => onPlaceOrder(selected)}
          className="w-full bg-[#ff6b00] hover:bg-[#e55f00] transition-colors text-white rounded-2xl py-4 flex items-center justify-between px-5"
        >
          <div className="text-left">
            <p className="font-black text-base">₹{grandTotal}</p>
            <p className="text-[11px] text-white/70 font-semibold">
              {PAYMENT_METHODS.find((m) => m.id === selected)?.label}
            </p>
          </div>
          <span className="font-black text-sm">Place Order →</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// STEP 4 — ORDER CONFIRMED
// ─────────────────────────────────────────
function OrderConfirmed({ items, grandTotal, paymentMethod, onClose }) {
  const orderId = "SK" + Math.floor(1000 + Math.random() * 9000);
  const eta = new Date(Date.now() + 20 * 60 * 1000);
  const etaStr = eta.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  const methodLabel = PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label || "Cash on Delivery";

  return (
    <div className="flex flex-col h-full">
      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* Success hero */}
        <div className="flex flex-col items-center pt-10 pb-6 px-6 text-center">
          {/* Animated check */}
          <div className="w-20 h-20 rounded-full bg-green-50 border-4 border-green-400 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-black text-xl text-[#1a2340] mb-1" style={{ fontFamily: "Poppins,sans-serif" }}>
            Order Confirmed!
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Your food is being prepared 🍽️
          </p>
        </div>

        {/* Order details card */}
        <div className="mx-3 mb-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Order ID + ETA */}
          <div className="px-4 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">Order ID</p>
              <p className="font-black text-[#1a2340] text-sm">{orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wide">ETA</p>
              <p className="font-black text-[#ff6b00] text-sm">~{etaStr}</p>
            </div>
          </div>

          {/* Items */}
          {items.map((item, idx) => (
            <div key={item.id} className={`flex items-center gap-3 px-4 py-3 ${idx !== items.length - 1 ? "border-b border-gray-50" : ""}`}>
              <span className="text-xl">{item.fallbackEmoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-800 truncate" style={{ fontFamily: "Poppins,sans-serif" }}>{item.name}</p>
                <p className="text-[11px] text-gray-400 font-medium">Qty: {item.qty}</p>
              </div>
              <p className="font-bold text-sm text-[#1a2340]">₹{item.price * item.qty}</p>
            </div>
          ))}

          {/* Total + payment */}
          <div className="px-4 py-3.5 bg-gray-50 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="font-bold text-gray-700">₹{grandTotal - HANDLING_CHARGE}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 font-medium">Handling</span>
              <span className="font-bold text-gray-700">₹{HANDLING_CHARGE}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
              <span className="font-black text-gray-900">Total Paid</span>
              <span className="font-black text-[#ff6b00] text-base">₹{grandTotal}</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-gray-400">Payment:</span>
              <span className="text-xs font-bold text-gray-600">{methodLabel}</span>
            </div>
          </div>
        </div>

        {/* Delivery tracking placeholder */}
        <div className="mx-3 mb-3 bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-black text-gray-800 text-xs mb-3" style={{ fontFamily: "Poppins,sans-serif" }}>
            Order Status
          </h3>
          <div className="space-y-3">
            {[
              { label: "Order Confirmed",   done: true,  active: false },
              { label: "Preparing Your Food", done: false, active: true },
              { label: "Out for Delivery",  done: false, active: false },
              { label: "Delivered",         done: false, active: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[11px] font-black transition-all ${
                  step.done ? "bg-green-500 text-white" :
                  step.active ? "bg-[#ff6b00] text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {step.done ? "✓" : i + 1}
                </div>
                <p className={`text-xs font-semibold ${
                  step.done ? "text-green-600" :
                  step.active ? "text-[#ff6b00]" :
                  "text-gray-400"
                }`}>
                  {step.label}
                </p>
                {step.active && (
                  <span className="ml-auto flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full bg-[#ff6b00] opacity-60 animate-bounce"
                        style={{ animationDelay: `${d * 0.2}s` }}
                      />
                    ))}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery address */}
        <div className="mx-3 mb-4 bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3">
          <span className="text-base mt-0.5">📍</span>
          <div>
            <p className="font-bold text-xs text-gray-700 mb-0.5">Delivering to</p>
            <p className="text-xs text-gray-400 font-medium leading-relaxed">
              H-12, Shivkuti Colony, Near Hanuman Temple, Prayagraj — 211001
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 p-3 shrink-0">
        <button
          onClick={onClose}
          className="w-full bg-[#1a2340] hover:bg-[#2d3a60] transition-colors text-white font-black text-sm py-4 rounded-2xl"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// CART MODAL — MASTER
// ─────────────────────────────────────────
export function CartModal({ onClose }) {
  const [step, setStep] = useState("cart"); // cart | otp | payment | confirmed
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [items, setItems] = useState(HARDCODED_ITEMS);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
        .filter((item) => item.qty > 0)
    );
  };

  const itemsTotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = itemsTotal + HANDLING_CHARGE;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm"
      onClick={step === "confirmed" ? undefined : onClose}
    >
      <div
        className="relative h-full w-full max-w-sm bg-gray-50 flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ fontFamily: "Nunito,sans-serif" }}
      >
        {step === "cart" && (
          <CartView
            items={items}
            onUpdateQty={updateQty}
            onProceed={() => setStep("otp")}
            onClose={onClose}
          />
        )}

        {step === "otp" && (
          <OtpStep
            onVerified={() => setStep("payment")}
            onBack={() => setStep("cart")}
          />
        )}

        {step === "payment" && (
          <PaymentStep
            grandTotal={grandTotal}
            onPlaceOrder={(method) => { setPaymentMethod(method); setStep("confirmed"); }}
            onBack={() => setStep("otp")}
          />
        )}

        {step === "confirmed" && (
          <OrderConfirmed
            items={items}
            grandTotal={grandTotal}
            paymentMethod={paymentMethod}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
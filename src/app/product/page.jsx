// "use client";
// import { useState } from "react";
// import Image from "next/image";

// import { CartModal } from "@/components/CartModal";

// // ─────────────────────────────────────────
// // MOCK DATA — swap images & text here only
// // ─────────────────────────────────────────
// const PRODUCT = {
//   id: 1,
//   name: "Student Thali",
//   shortDesc: "Complete meal for students — filling, fresh & home-style",
//   category: "Thalis",
//   weight: "1 full plate",
//   price: 60,
//   mrp: 120,
//   discount: "42% OFF",
//   inclusive: "Inclusive of all taxes",
//   deliveryMin: 20,

//   // ↓ Add 3–5 image paths here — replace with your actual food images
//   images: [
//     "/shivkart-product.jpg",    
//    "/shivkart-product2.jpg",
//    "/shivkart-product.jpg",
//    "/shivkart-product2.jpg",
//   ],
//   // Emoji shown when image fails to load
//   fallbackEmoji: "🍽️",

//   // Breadcrumb trail
//   breadcrumb: ["Home", "Thalis", "Student Thali"],

//   // ↓ "Why ShivKart?" feature bullets
//   whyUs: [
//     {
//       emoji: "⏱️",
//       title: "Max 20 Min Delivery",
//       desc: "Hot meals delivered to your door from our kitchen in Prayagraj — faster than you can cook.",
//     },
//     {
//       emoji: "🏠",
//       title: "Ghar Jesa Swad",
//       desc: "Every dish cooked with home-style recipes — no shortcuts, no artificial flavours.",
//     },
//     {
//       emoji: "🥗",
//       title: "Hygienic & Fresh",
//       desc: "Prepared fresh for every order, packed hygienically, delivered safely.",
//     },
//   ],

//   // ↓ What's included in the thali
//   includes: ["4 Roti", "Chawal", "Hari Sabji", "Daal", "Rayta", "Aachar", "Salad"],

//   // ↓ Tags shown as pills
//   tags: ["Vegetarian", "Home-style", "No Preservatives", "Fresh Daily"],
// };

// // ─────────────────────────────────────────
// // LOGO
// // ─────────────────────────────────────────
// function ShivKartLogo() {
//   return (
//    <Image
//            src="/shivkart-logo.jpg"
//            alt="ShivKart Logo"
//            width={40}
//            height={40}
//            className="object-contain"
//          />
//   );
// }

// // function onCartClick() {
// //   setCartOpen(true);
// // }
// // ─────────────────────────────────────────
// // NAVBAR (minimal — same as main page)
// // ─────────────────────────────────────────
// function Navbar({ cartCount, onCartClick }) {
//   return (
//     <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-5 flex items-center gap-4 h-16">
//         <a href="/" className="flex items-center gap-2">
//           <ShivKartLogo />
//           <div className="flex flex-col leading-none">
//             <span className="font-extrabold text-xl text-[#1a2340]" style={{ fontFamily: "Poppins,sans-serif" }}>
//               Shiv<span className="text-[#ff6b00]">Kart</span>
//             </span>
//             <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">Food Delivery</span>
//           </div>
//         </a>

//         <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-orange-300 transition-colors whitespace-nowrap">
//           <svg className="w-3.5 h-3.5 text-[#ff6b00]" fill="currentColor" viewBox="0 0 24 24">
//             <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
//           </svg>
//           Prayagraj ▾
//         </button>

//         <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 gap-2">
//           <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
//           </svg>
//           <input type="text" placeholder='Search "thali", "kachori"…' className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 font-medium" />
//         </div>

//         <div className="flex items-center gap-3 ml-auto">
//           <button  className="px-4 py-2 border-2 border-[#1a2340] rounded-xl text-sm font-bold text-[#1a2340] hover:bg-[#1a2340] hover:text-white transition-colors">
//             Login
//           </button>
//           <button
//             onClick={onCartClick}
//             className="flex items-center gap-2 px-4 py-2.5 bg-[#ff6b00] rounded-xl text-sm font-bold text-white hover:bg-[#e55f00] transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
//               <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
//               <line x1="3" y1="6" x2="21" y2="6" />
//               <path d="M16 10a4 4 0 01-8 0" />
//             </svg>
//             My Cart
//             <span className="bg-white text-[#ff6b00] rounded-full w-5 h-5 flex items-center justify-center text-xs font-black">
//               {cartCount}
//             </span>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

// // ─────────────────────────────────────────
// // IMAGE GALLERY
// // ─────────────────────────────────────────
// function ImageGallery({ images, fallbackEmoji, productName }) {
//   const [activeIdx, setActiveIdx] = useState(0);
//   const [imgErrors, setImgErrors] = useState({});

//   const markError = (idx) => setImgErrors((prev) => ({ ...prev, [idx]: true }));

//   const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
//   const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

//   return (
//     <div className="flex flex-col gap-3">
//       {/* Main image */}
//       <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl overflow-hidden border-2 border-orange-100 aspect-square flex items-center justify-center group">
//         {!imgErrors[activeIdx] ? (
//           <img
//             src={images[activeIdx]}
//             alt={`${productName} view ${activeIdx + 1}`}
//             className="w-full h-full object-cover"
//             onError={() => markError(activeIdx)}
//           />
//         ) : (
//           <div className="flex flex-col items-center gap-3">
//             <span className="text-8xl">{fallbackEmoji}</span>
//             <span className="text-xs text-gray-400 font-medium">Image {activeIdx + 1}</span>
//           </div>
//         )}

//         {/* Discount badge */}
//         <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
//           {PRODUCT.discount}
//         </span>

//         {/* Delivery badge */}
//         <span className="absolute top-3 right-3 bg-[#1a2340] text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
//           ⏱ {PRODUCT.deliveryMin} min
//         </span>

//         {/* Prev / Next arrows */}
//         {images.length > 1 && (
//           <>
//             <button
//               onClick={prev}
//               className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
//             >
//               <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
//               </svg>
//             </button>
//             <button
//               onClick={next}
//               className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
//             >
//               <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//           </>
//         )}

//         {/* Dot indicator */}
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
//           {images.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveIdx(i)}
//               className={`rounded-full transition-all ${i === activeIdx ? "w-5 h-2 bg-[#ff6b00]" : "w-2 h-2 bg-white/60"}`}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="flex gap-2.5">
//         {images.map((src, i) => (
//           <button
//             key={i}
//             onClick={() => setActiveIdx(i)}
//             className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-orange-50 flex items-center justify-center ${
//               i === activeIdx ? "border-[#ff6b00] shadow-md scale-105" : "border-gray-200 hover:border-orange-300"
//             }`}
//           >
//             {!imgErrors[i] ? (
//               <img
//                 src={src}
//                 alt={`Thumb ${i + 1}`}
//                 className="w-full h-full object-cover"
//                 onError={() => markError(i)}
//               />
//             ) : (
//               <span className="text-2xl">{fallbackEmoji}</span>
//             )}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────
// // PRODUCT DETAIL PAGE
// // ─────────────────────────────────────────
// export default function FoodDetailPage() {
//   const [qty, setQty] = useState(0);
//   const [cartOpen, setCartOpen] = useState(false);
//   const [cartCount, setCartCount] = useState(0);

//   function onCartClick() {
//     setCartOpen(true);
//   }

//   const handleAdd = () => {
//     setQty(1);
//     setCartCount((n) => n + 1);
//   };
//   const incQty = () => { setQty((n) => n + 1); setCartCount((n) => n + 1); };
//   const decQty = () => {
//     setQty((n) => {
//       if (n <= 1) { setCartCount((c) => Math.max(0, c - 1)); return 0; }
//       setCartCount((c) => Math.max(0, c - 1));
//       return n - 1;
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Nunito, sans-serif" }}>
//       <Navbar cartCount={cartCount} onCartClick={onCartClick} />

//       <div className="max-w-7xl mx-auto px-5 py-6">

//         {/* ── BREADCRUMB ── */}
//         <nav className="flex items-center gap-1.5 text-sm text-gray-400 font-medium mb-6 flex-wrap">
//           {PRODUCT.breadcrumb.map((crumb, i) => (
//             <span key={crumb} className="flex items-center gap-1.5">
//               {i < PRODUCT.breadcrumb.length - 1 ? (
//                 <>
//                   <a href="#" className="hover:text-[#ff6b00] transition-colors">{crumb}</a>
//                   <span className="text-gray-300">/</span>
//                 </>
//               ) : (
//                 <span className="text-gray-700 font-bold">{crumb}</span>
//               )}
//             </span>
//           ))}
//         </nav>

//         {/* ── MAIN GRID ── */}
//         <div className="grid grid-cols-2 gap-12 items-start">

//           {/* LEFT — Gallery */}
//           <ImageGallery
//             images={PRODUCT.images}
//             fallbackEmoji={PRODUCT.fallbackEmoji}
//             productName={PRODUCT.name}
//           />

//           {/* RIGHT — Details */}
//           <div className="flex flex-col gap-5">

//             {/* Tags */}
//             <div className="flex flex-wrap gap-2">
//               {PRODUCT.tags.map((tag) => (
//                 <span key={tag} className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-2.5 py-1 rounded-full">
//                   ✓ {tag}
//                 </span>
//               ))}
//             </div>

//             {/* Title */}
//             <div>
//               <h1 className="font-black text-3xl text-[#1a2340] leading-tight mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
//                 {PRODUCT.name}
//               </h1>
//               <p className="text-gray-500 font-medium text-sm">{PRODUCT.shortDesc}</p>
//             </div>

//             {/* Weight / serving */}
//             <div className="flex items-center gap-2">
//               <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg">
//                 🍽️ {PRODUCT.weight}
//               </span>
//               <span className="bg-orange-50 text-[#ff6b00] border border-orange-200 text-xs font-bold px-3 py-1.5 rounded-lg">
//                 ⏱ Max {PRODUCT.deliveryMin} min delivery
//               </span>
//             </div>

//             {/* Price + Add to cart */}
//             <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm">
//               <div>
//                 <div className="flex items-baseline gap-2 mb-0.5">
//                   <span className="font-black text-3xl text-[#1a2340]" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     ₹{PRODUCT.price}
//                   </span>
//                   <del className="text-gray-400 font-medium text-base">₹{PRODUCT.mrp}</del>
//                   <span className="bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
//                     {PRODUCT.discount}
//                   </span>
//                 </div>
//                 <p className="text-xs text-gray-400 font-medium">{PRODUCT.inclusive}</p>
//               </div>

//               {/* Add to cart / stepper */}
//               {qty === 0 ? (
//                 <button
//                   onClick={handleAdd}
//                   className="bg-[#ff6b00] hover:bg-[#e55f00] text-white font-black text-base px-8 py-3.5 rounded-xl transition-colors shadow-md shadow-orange-200"
//                 >
//                   Add to cart
//                 </button>
//               ) : (
//                 <div className="flex items-center bg-[#ff6b00] rounded-xl overflow-hidden shadow-md shadow-orange-200">
//                   <button onClick={decQty} className="w-12 h-12 flex items-center justify-center text-white font-black text-xl hover:bg-[#e55f00] transition-colors">
//                     −
//                   </button>
//                   <span className="w-10 text-center text-white font-black text-base">{qty}</span>
//                   <button onClick={incQty} className="w-12 h-12 flex items-center justify-center text-white font-black text-xl hover:bg-[#e55f00] transition-colors">
//                     +
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* What's included */}
//             <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
//               <h3 className="font-black text-gray-900 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//                 <span className="w-1 h-5 bg-[#ff6b00] rounded block" />
//                 What's Included
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {PRODUCT.includes.map((item) => (
//                   <span key={item} className="flex items-center gap-1.5 bg-orange-50 text-[#ff6b00] border border-orange-200 text-xs font-bold px-3 py-1.5 rounded-xl">
//                     ✓ {item}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Why ShivKart */}
//             <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 shadow-sm">
//               <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//                 <span className="w-1 h-5 bg-[#ff6b00] rounded block" />
//                 Why order from ShivKart?
//               </h3>
//               <div className="flex flex-col gap-4">
//                 {PRODUCT.whyUs.map((w) => (
//                   <div key={w.title} className="flex items-start gap-3">
//                     <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-orange-100">
//                       {w.emoji}
//                     </div>
//                     <div>
//                       <p className="font-bold text-sm text-gray-800 mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
//                         {w.title}
//                       </p>
//                       <p className="text-xs text-gray-500 font-medium leading-relaxed">{w.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* ── RELATED / MORE ── */}
//         <div className="mt-12 border-t border-gray-200 pt-8">
//           <h2 className="font-black text-xl text-[#1a2340] mb-5 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
//             <span className="w-1 h-6 bg-[#ff6b00] rounded block" />
//             You might also like
//           </h2>
//           <div className="grid grid-cols-4 gap-4">
//             {[
//               { name: "Puri Paneer Sabji",   price: 70, mrp: 140, emoji: "🥙", discount: "50% OFF" },
//               { name: "Damalu Kachori",       price: 60, mrp: 100, emoji: "🧅", discount: "40% OFF" },
//               { name: "Special Thali",        price: 70, mrp: 110, emoji: "🍱", discount: "36% OFF" },
//               { name: "Special Chola Bhatura",price: 70, mrp: 140, emoji: "🥘", discount: "50% OFF" },
//             ].map((p) => (
//               <div key={p.name} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer">
//                 <div className="relative h-36 bg-orange-50 flex items-center justify-center">
//                   {/* Replace emoji with <img> when you have images */}
//                   <span className="text-5xl">{p.emoji}</span>
//                   <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
//                     {p.discount}
//                   </span>
//                 </div>
//                 <div className="p-3">
//                   <p className="font-bold text-sm text-gray-900 mb-2 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
//                     {p.name}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="font-black text-sm text-[#1a2340]">₹{p.price}</span>
//                       <del className="text-[11px] text-gray-400 ml-1">₹{p.mrp}</del>
//                     </div>
//                     <button className="bg-[#ff6b00] text-white text-xs font-black px-3 py-1.5 rounded-lg hover:bg-[#e55f00] transition-colors">
//                       + Add
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>

//       {/* ── STICKY MOBILE-STYLE BOTTOM BAR (shows when item added) ── */}
//       {qty > 0 && (
//         <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-orange-100 shadow-2xl px-5 py-3 flex items-center justify-between max-w-7xl mx-auto">
//           <div>
//             <p className="font-black text-[#1a2340] text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
//               {qty} item{qty > 1 ? "s" : ""} added
//             </p>
//             <p className="text-xs text-gray-400 font-medium">₹{PRODUCT.price * qty} total</p>
//           </div>
//           <button  onClick={onCartClick} className="bg-[#ff6b00] text-white font-black text-sm px-8 py-3 rounded-xl hover:bg-[#e55f00] transition-colors">
//             View Cart →
//           </button>
//         </div>
//       )}
//       {cartOpen && <CartModal onClose={() => setCartOpen(false)} cartCount={cartCount} />}
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import Image from "next/image";
import { CartModal } from "@/components/CartModal";

const PRODUCT = {
  id: 1,
  name: "Student Thali",
  shortDesc: "Complete meal for students — filling, fresh & home-style",
  category: "Thalis",
  weight: "1 full plate",
  price: 60,
  mrp: 120,
  discount: "42% OFF",
  inclusive: "Inclusive of all taxes",
  deliveryMin: 20,
  images: [
    "/shivkart-product.jpg",
    "/shivkart-product2.jpg",
    "/shivkart-product.jpg",
    "/shivkart-product2.jpg",
  ],
  fallbackEmoji: "🍽️",
  breadcrumb: ["Home", "Thalis", "Student Thali"],
  whyUs: [
    {
      emoji: "⏱️",
      title: "Max 20 Min Delivery",
      desc: "Hot meals delivered to your door from our kitchen in Prayagraj — faster than you can cook.",
    },
    {
      emoji: "🏠",
      title: "Ghar Jesa Swad",
      desc: "Every dish cooked with home-style recipes — no shortcuts, no artificial flavours.",
    },
    {
      emoji: "🥗",
      title: "Hygienic & Fresh",
      desc: "Prepared fresh for every order, packed hygienically, delivered safely.",
    },
  ],
  includes: ["4 Roti", "Chawal", "Hari Sabji", "Daal", "Rayta", "Aachar", "Salad"],
  tags: ["Vegetarian", "Home-style", "No Preservatives", "Fresh Daily"],
};

// ─────────────────────────────────────────
// LOGO
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
function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 flex items-center gap-2 sm:gap-4 h-14 sm:h-16">
        <a href="/" className="flex items-center gap-2 shrink-0">
          <ShivKartLogo />
          <div className="flex flex-col leading-none">
            <span className="font-extrabold text-lg sm:text-xl text-[#1a2340]" style={{ fontFamily: "Poppins,sans-serif" }}>
              Shiv<span className="text-[#ff6b00]">Kart</span>
            </span>
            <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase hidden sm:block">Food Delivery</span>
          </div>
        </a>

        {/* Location — hidden on mobile */}
        <button className="hidden md:flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-orange-300 transition-colors whitespace-nowrap">
          <svg className="w-3.5 h-3.5 text-[#ff6b00]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
          Prayagraj ▾
        </button>

        <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 gap-2">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder='Search "thali", "kachori"…'
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400 font-medium min-w-0"
          />
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button className="hidden sm:block px-4 py-2 border-2 border-[#1a2340] rounded-xl text-sm font-bold text-[#1a2340] hover:bg-[#1a2340] hover:text-white transition-colors">
            Login
          </button>
          <button
            onClick={onCartClick}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#ff6b00] rounded-xl text-sm font-bold text-white hover:bg-[#e55f00] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span className="hidden sm:inline">My Cart</span>
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
// IMAGE GALLERY
// ─────────────────────────────────────────
function ImageGallery({ images, fallbackEmoji, productName }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const markError = (idx) => setImgErrors((prev) => ({ ...prev, [idx]: true }));
  const prev = () => setActiveIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl overflow-hidden border-2 border-orange-100 aspect-square flex items-center justify-center group">
        {!imgErrors[activeIdx] ? (
          <img
            src={images[activeIdx]}
            alt={`${productName} view ${activeIdx + 1}`}
            className="w-full h-full object-cover"
            onError={() => markError(activeIdx)}
          />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <span className="text-7xl sm:text-8xl">{fallbackEmoji}</span>
            <span className="text-xs text-gray-400 font-medium">Image {activeIdx + 1}</span>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow">
          {PRODUCT.discount}
        </span>
        <span className="absolute top-3 right-3 bg-[#1a2340] text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-1">
          ⏱ {PRODUCT.deliveryMin} min
        </span>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            >
              <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`rounded-full transition-all ${i === activeIdx ? "w-5 h-2 bg-[#ff6b00]" : "w-2 h-2 bg-white/60"}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails — scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all bg-orange-50 flex items-center justify-center ${
              i === activeIdx ? "border-[#ff6b00] shadow-md scale-105" : "border-gray-200 hover:border-orange-300"
            }`}
          >
            {!imgErrors[i] ? (
              <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" onError={() => markError(i)} />
            ) : (
              <span className="text-2xl">{fallbackEmoji}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// PRODUCT DETAIL PAGE
// ─────────────────────────────────────────
export default function FoodDetailPage() {
  const [qty, setQty] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const handleAdd = () => { setQty(1); setCartCount((n) => n + 1); };
  const incQty = () => { setQty((n) => n + 1); setCartCount((n) => n + 1); };
  const decQty = () => {
    setQty((n) => {
      if (n <= 1) { setCartCount((c) => Math.max(0, c - 1)); return 0; }
      setCartCount((c) => Math.max(0, c - 1));
      return n - 1;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Nunito, sans-serif" }}>
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-4 sm:py-6">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-400 font-medium mb-4 sm:mb-6 flex-wrap">
          {PRODUCT.breadcrumb.map((crumb, i) => (
            <span key={crumb} className="flex items-center gap-1.5">
              {i < PRODUCT.breadcrumb.length - 1 ? (
                <>
                  <a href="#" className="hover:text-[#ff6b00] transition-colors">{crumb}</a>
                  <span className="text-gray-300">/</span>
                </>
              ) : (
                <span className="text-gray-700 font-bold">{crumb}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── MAIN GRID: stacks on mobile, 2-col on desktop ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

          {/* LEFT — Gallery */}
          <ImageGallery
            images={PRODUCT.images}
            fallbackEmoji={PRODUCT.fallbackEmoji}
            productName={PRODUCT.name}
          />

          {/* RIGHT — Details */}
          <div className="flex flex-col gap-4 sm:gap-5">

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {PRODUCT.tags.map((tag) => (
                <span key={tag} className="bg-green-50 text-green-700 border border-green-200 text-xs font-bold px-2.5 py-1 rounded-full">
                  ✓ {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <div>
              <h1 className="font-black text-2xl sm:text-3xl text-[#1a2340] leading-tight mb-1" style={{ fontFamily: "Poppins, sans-serif" }}>
                {PRODUCT.name}
              </h1>
              <p className="text-gray-500 font-medium text-sm">{PRODUCT.shortDesc}</p>
            </div>

            {/* Weight / serving */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1.5 rounded-lg">
                🍽️ {PRODUCT.weight}
              </span>
              <span className="bg-orange-50 text-[#ff6b00] border border-orange-200 text-xs font-bold px-3 py-1.5 rounded-lg">
                ⏱ Max {PRODUCT.deliveryMin} min delivery
              </span>
            </div>

            {/* Price + Add to cart */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-sm gap-3">
              <div>
                <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                  <span className="font-black text-2xl sm:text-3xl text-[#1a2340]" style={{ fontFamily: "Poppins, sans-serif" }}>
                    ₹{PRODUCT.price}
                  </span>
                  <del className="text-gray-400 font-medium text-base">₹{PRODUCT.mrp}</del>
                  <span className="bg-green-500 text-white text-xs font-black px-2 py-0.5 rounded-md">
                    {PRODUCT.discount}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-medium">{PRODUCT.inclusive}</p>
              </div>

              {qty === 0 ? (
                <button
                  onClick={handleAdd}
                  className="bg-[#ff6b00] hover:bg-[#e55f00] text-white font-black text-sm sm:text-base px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-colors shadow-md shadow-orange-200 whitespace-nowrap shrink-0"
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex items-center bg-[#ff6b00] rounded-xl overflow-hidden shadow-md shadow-orange-200 shrink-0">
                  <button onClick={decQty} className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-white font-black text-xl hover:bg-[#e55f00] transition-colors">
                    −
                  </button>
                  <span className="w-8 sm:w-10 text-center text-white font-black text-base">{qty}</span>
                  <button onClick={incQty} className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center text-white font-black text-xl hover:bg-[#e55f00] transition-colors">
                    +
                  </button>
                </div>
              )}
            </div>

            {/* What's included */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-3 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                <span className="w-1 h-5 bg-[#ff6b00] rounded block" />
                What's Included
              </h3>
              <div className="flex flex-wrap gap-2">
                {PRODUCT.includes.map((item) => (
                  <span key={item} className="flex items-center gap-1.5 bg-orange-50 text-[#ff6b00] border border-orange-200 text-xs font-bold px-3 py-1.5 rounded-xl">
                    ✓ {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Why ShivKart */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">
              <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
                <span className="w-1 h-5 bg-[#ff6b00] rounded block" />
                Why order from ShivKart?
              </h3>
              <div className="flex flex-col gap-4">
                {PRODUCT.whyUs.map((w) => (
                  <div key={w.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-orange-50 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 border border-orange-100">
                      {w.emoji}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800 mb-0.5" style={{ fontFamily: "Poppins, sans-serif" }}>
                        {w.title}
                      </p>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── YOU MIGHT ALSO LIKE ── */}
        <div className="mt-8 sm:mt-12 border-t border-gray-200 pt-6 sm:pt-8">
          <h2 className="font-black text-xl text-[#1a2340] mb-4 sm:mb-5 flex items-center gap-2" style={{ fontFamily: "Poppins, sans-serif" }}>
            <span className="w-1 h-6 bg-[#ff6b00] rounded block" />
            You might also like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: "Puri Paneer Sabji",    price: 70, mrp: 140, emoji: "🥙", discount: "50% OFF" },
              { name: "Damalu Kachori",        price: 60, mrp: 100, emoji: "🧅", discount: "40% OFF" },
              { name: "Special Thali",         price: 70, mrp: 110, emoji: "🍱", discount: "36% OFF" },
              { name: "Special Chola Bhatura", price: 70, mrp: 140, emoji: "🥘", discount: "50% OFF" },
            ].map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 transition-all cursor-pointer">
                <div className="relative h-32 sm:h-36 bg-orange-50 flex items-center justify-center">
                  <span className="text-4xl sm:text-5xl">{p.emoji}</span>
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                    {p.discount}
                  </span>
                </div>
                <div className="p-2.5 sm:p-3">
                  <p className="font-bold text-xs sm:text-sm text-gray-900 mb-2 leading-tight" style={{ fontFamily: "Poppins, sans-serif" }}>
                    {p.name}
                  </p>
                  <div className="flex items-center justify-between gap-1">
                    <div>
                      <span className="font-black text-sm text-[#1a2340]">₹{p.price}</span>
                      <del className="text-[11px] text-gray-400 ml-1">₹{p.mrp}</del>
                    </div>
                    <button className="bg-[#ff6b00] text-white text-xs font-black px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-[#e55f00] transition-colors shrink-0">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── STICKY BOTTOM BAR (when item added) — extra bottom padding on mobile so it clears nav ── */}
      {qty > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-orange-100 shadow-2xl px-4 sm:px-5 py-3 flex items-center justify-between">
          <div>
            <p className="font-black text-[#1a2340] text-sm sm:text-base" style={{ fontFamily: "Poppins, sans-serif" }}>
              {qty} item{qty > 1 ? "s" : ""} added
            </p>
            <p className="text-xs text-gray-400 font-medium">₹{PRODUCT.price * qty} total</p>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="bg-[#ff6b00] text-white font-black text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-[#e55f00] transition-colors"
          >
            View Cart →
          </button>
        </div>
      )}

      {/* ── CART MODAL — full screen on mobile, sidebar on desktop ── */}
      {cartOpen && (
        <CartModal onClose={() => setCartOpen(false)} cartCount={cartCount} />
      )}
    </div>
  );
}
"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─────────────────────────────────────────
// THEME
// Navy: #1a2340  |  Orange: #ff6b00
// ─────────────────────────────────────────

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
// SHARED: INPUT
// ─────────────────────────────────────────
function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white"
      />
    </div>
  );
}

// ─────────────────────────────────────────
// SHARED: PRIMARY BUTTON
// ─────────────────────────────────────────
function PrimaryBtn({ children, onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-[#ff6b00] hover:bg-[#e55f00] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm py-3 rounded-xl transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────
// SHARED: OTP INPUT (6 boxes)
// ─────────────────────────────────────────
function OtpInput({ value, onChange }) {
  const digits = (value + "      ").slice(0, 6).split("");

  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/\D/g, "").slice(-1);
    const arr = (value + "      ").slice(0, 6).split("");
    arr[idx] = v;
    const next = arr.join("").trimEnd();
    onChange(next);
    if (v && idx < 5) {
      const nextEl = e.target.parentNode.children[idx + 1];
      if (nextEl) nextEl.focus();
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
          className="w-11 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all text-[#1a2340] bg-white"
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// SHARED: ROLE SELECTOR TABS
// ─────────────────────────────────────────
function RoleTabs({ role, onChange }) {
  const roles = [
    { key: "user",   label: "Customer" },
    { key: "admin",  label: "Admin" },
    { key: "driver", label: "Driver" },
  ];
  return (
    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6">
      {roles.map((r) => (
        <button
          key={r.key}
          onClick={() => onChange(r.key)}
          className={`flex-1 text-xs font-bold py-2 rounded-lg transition-all ${
            role === r.key
              ? "bg-white text-[#1a2340] shadow-sm"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────
// USER LOGIN — phone → OTP
// ─────────────────────────────────────────
function UserLogin({ onSuccess }) {
  const [step, setStep] = useState("phone"); // phone | otp
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setStep("otp");
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) { clearInterval(interval); return 0; }
        return t - 1;
      });
    }, 1000);
  };

  const verify = () => {
    if (otp.length === 6) onSuccess?.("user");
  };

  return (
    <div className="space-y-4">
      {step === "phone" ? (
        <>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mobile Number</label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 shrink-0">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white"
              />
            </div>
          </div>
          <PrimaryBtn onClick={sendOtp} disabled={phone.length < 10}>
            Send OTP →
          </PrimaryBtn>
        </>
      ) : (
        <>
          <div className="text-center mb-2">
            <p className="text-sm font-semibold text-gray-700">
              OTP sent to <span className="text-[#ff6b00]">+91 {phone}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Enter the 6-digit code below</p>
          </div>
          <OtpInput value={otp} onChange={setOtp} />
          <div className="text-center">
            {timer > 0 ? (
              <p className="text-xs text-gray-400">Resend in <span className="font-bold text-[#ff6b00]">{timer}s</span></p>
            ) : (
              <button onClick={sendOtp} className="text-xs font-bold text-[#ff6b00] hover:underline">
                Resend OTP
              </button>
            )}
          </div>
          <PrimaryBtn onClick={verify} disabled={otp.length < 6}>
            Verify & Login →
          </PrimaryBtn>
          <button onClick={() => { setStep("phone"); setOtp(""); }} className="w-full text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors">
            ← Change number
          </button>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// ADMIN LOGIN — phone → OTP
// ─────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);

  const sendOtp = () => {
    if (phone.length < 10) return;
    setStep("otp");
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => { if (t <= 1) { clearInterval(interval); return 0; } return t - 1; });
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5 mb-1">
        {/* <span className="text-base">🔐</span> */}
        <p className="text-xs font-semibold text-orange-700">Admin access — restricted to authorised numbers only</p>
      </div>

      {step === "phone" ? (
        <>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Registered Admin Number</label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 shrink-0">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="Admin mobile"
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white"
              />
            </div>
          </div>
          <PrimaryBtn onClick={sendOtp} disabled={phone.length < 10}>Send OTP →</PrimaryBtn>
        </>
      ) : (
        <>
          <div className="text-center mb-2">
            <p className="text-sm font-semibold text-gray-700">OTP sent to <span className="text-[#ff6b00]">+91 {phone}</span></p>
            <p className="text-xs text-gray-400 mt-0.5">Enter the 6-digit admin code</p>
          </div>
          <OtpInput value={otp} onChange={setOtp} />
          <div className="text-center">
            {timer > 0
              ? <p className="text-xs text-gray-400">Resend in <span className="font-bold text-[#ff6b00]">{timer}s</span></p>
              : <button onClick={sendOtp} className="text-xs font-bold text-[#ff6b00] hover:underline">Resend OTP</button>
            }
          </div>
          <PrimaryBtn onClick={() => otp.length === 6 && onSuccess?.("admin")} disabled={otp.length < 6}>
            Verify & Enter Admin →
          </PrimaryBtn>
          <button onClick={() => { setStep("phone"); setOtp(""); }} className="w-full text-xs font-semibold text-gray-400 hover:text-gray-600">
            ← Change number
          </button>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// DRIVER LOGIN — username + password
// ─────────────────────────────────────────
function DriverLogin({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 mb-1">
        {/* <span className="text-base">🛵</span> */}
        <p className="text-xs font-semibold text-blue-700">Driver credentials are assigned by admin. Contact your manager for access.</p>
      </div>
      <Input label="Username" type="text" placeholder="e.g. ramesh01" value={username} onChange={(e) => setUsername(e.target.value)} />
      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Password</label>
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 pr-10 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white"
          />
          <button
            type="button"
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {showPass
                ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>
                : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>
              }
            </svg>
          </button>
        </div>
      </div>
      <PrimaryBtn onClick={() => (username && password) && onSuccess?.("driver")} disabled={!username || !password}>
        Login as Driver →
      </PrimaryBtn>
    </div>
  );
}

// ─────────────────────────────────────────
// USER REGISTRATION — 3 steps
// step 1: name + phone
// step 2: verify OTP
// step 3: address
// ─────────────────────────────────────────
function UserRegister({ onSuccess, onSwitchToLogin }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", otp: "", address: "", landmark: "", city: "Prayagraj", pincode: "" });
  const [timer, setTimer] = useState(0);

  const F = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  const sendOtp = () => {
    if (!form.name.trim() || form.phone.length < 10) return;
    setStep(2);
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((t) => { if (t <= 1) { clearInterval(interval); return 0; } return t - 1; });
    }, 1000);
  };

  const verifyOtp = () => {
    if (form.otp.length === 6) setStep(3);
  };

  const finish = () => {
    if (form.address.trim() && form.pincode.length >= 6) onSuccess?.("user");
  };

  return (
    <div className="space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s ? "bg-[#ff6b00] text-white" :
                step > s ? "bg-green-500 text-white" :
                "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s ? "✓" : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 w-8 rounded ${step > s ? "bg-green-500" : "bg-gray-100"}`} />}
          </div>
        ))}
        <span className="ml-auto text-[11px] font-semibold text-gray-400">
          {step === 1 ? "Basic Info" : step === 2 ? "Verify OTP" : "Your Address"}
        </span>
      </div>

      {/* Step 1: Name + Phone */}
      {step === 1 && (
        <>
          <Input label="Full Name *" type="text" placeholder="e.g. Priya Sharma" {...F("name")} />
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Mobile Number *</label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-500 shrink-0">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value.replace(/\D/g, "") }))}
                placeholder="98765 43210"
                className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white"
              />
            </div>
          </div>
          <PrimaryBtn onClick={sendOtp} disabled={!form.name.trim() || form.phone.length < 10}>
            Send OTP to Verify →
          </PrimaryBtn>
        </>
      )}

      {/* Step 2: OTP */}
      {step === 2 && (
        <>
          <div className="text-center mb-1">
            <p className="text-sm font-semibold text-gray-700">
              OTP sent to <span className="text-[#ff6b00]">+91 {form.phone}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Enter the 6-digit code to verify your number</p>
          </div>
          <OtpInput value={form.otp} onChange={(v) => setForm((f) => ({ ...f, otp: v }))} />
          <div className="text-center">
            {timer > 0
              ? <p className="text-xs text-gray-400">Resend in <span className="font-bold text-[#ff6b00]">{timer}s</span></p>
              : <button onClick={sendOtp} className="text-xs font-bold text-[#ff6b00] hover:underline">Resend OTP</button>
            }
          </div>
          <PrimaryBtn onClick={verifyOtp} disabled={form.otp.length < 6}>
            Verify Number →
          </PrimaryBtn>
          <button onClick={() => setStep(1)} className="w-full text-xs font-semibold text-gray-400 hover:text-gray-600">
            ← Edit name / number
          </button>
        </>
      )}

      {/* Step 3: Address */}
      {step === 3 && (
        <>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3.5 py-2 mb-1">
            <span className="text-green-600 font-bold text-sm">✓</span>
            <p className="text-xs font-semibold text-green-700">Number verified! Add your delivery address to finish.</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">House / Flat / Colony *</label>
            <textarea
              rows={2}
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              placeholder="House no., street, colony name…"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] focus:ring-2 focus:ring-orange-100 transition-all placeholder-gray-300 bg-white resize-none"
            />
          </div>
          <Input label="Landmark (optional)" type="text" placeholder="Near temple, school, etc." {...F("landmark")} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">City</label>
              <select
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 outline-none focus:border-[#ff6b00] bg-white"
              >
                {["Prayagraj", "Lucknow", "Varanasi", "Kanpur"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Input label="Pincode *" type="text" maxLength={6} placeholder="211001" value={form.pincode} onChange={(e) => setForm((f) => ({ ...f, pincode: e.target.value.replace(/\D/g, "") }))} />
          </div>
          <PrimaryBtn onClick={finish} disabled={!form.address.trim() || form.pincode.length < 6}>
            Create Account →
          </PrimaryBtn>
        </>
      )}

      <div className="text-center pt-1">
        <span className="text-xs text-gray-400 font-medium">Already have an account? </span>
        <button onClick={onSwitchToLogin} className="text-xs font-bold text-[#ff6b00] hover:underline">Login</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────
function SuccessScreen({ role, onReset }) {
  const messages = {
    user:   { icon: "🎉", title: "Welcome to ShivKart!", sub: "Your account is ready. Redirecting to home…" },
    admin:  { icon: "🔐", title: "Admin access granted",  sub: "Redirecting to admin dashboard…" },
    driver: { icon: "🛵", title: "Welcome back, Driver!",  sub: "Redirecting to your delivery panel…" },
  };
  const m = messages[role] || messages.user;
  return (
    <div className="text-center py-6 space-y-4">
      <div className="text-5xl">{m.icon}</div>
      <div>
        <p className="font-bold text-[#1a2340] text-lg" style={{ fontFamily: "Poppins,sans-serif" }}>{m.title}</p>
        <p className="text-sm text-gray-400 mt-1">{m.sub}</p>
      </div>
      <div className="flex justify-center">
        <div className="w-8 h-1.5 bg-[#ff6b00] rounded-full animate-pulse" />
      </div>
      <button onClick={onReset} className="text-xs font-semibold text-gray-400 hover:text-[#ff6b00] transition-colors">
        ← Back to login
      </button>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN AUTH PAGE
// ─────────────────────────────────────────
export default function ShivKartAuth() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  // role for login: "user" | "admin" | "driver"
  const [loginRole, setLoginRole] = useState("user");
  // success state
  const [successRole, setSuccessRole] = useState(null);

  const ROUTES = { user: "/", admin: "/admin", driver: "/delivery" };

  const handleSuccess = (role) => {
    setSuccessRole(role);
    setTimeout(() => router.push(ROUTES[role] ?? "/"), 1200);
  };
  const handleReset   = () => { setSuccessRole(null); setMode("login"); setLoginRole("user"); };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 font-[Nunito,sans-serif]">
      <div className="w-full max-w-sm">

        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <ShivKartLogo size={44} />
          </div>
          <h1 className="font-extrabold text-2xl text-[#1a2340] tracking-tight" style={{ fontFamily: "Poppins,sans-serif" }}>
            Shiv<span className="text-[#ff6b00]">Kart</span>
          </h1>
          <p className="text-xs text-gray-400 font-semibold mt-0.5 tracking-widest uppercase">Food Delivery · Prayagraj</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Login / Register toggle — only shown when not in success */}
          {!successRole && (
            <div className="flex border-b border-gray-100">
              {[
                { key: "login",    label: "Login" },
                { key: "register", label: "Register" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => { setMode(t.key); setLoginRole("user"); }}
                  className={`flex-1 py-3.5 text-sm font-bold transition-all ${
                    mode === t.key
                      ? "text-[#ff6b00] border-b-2 border-[#ff6b00] bg-orange-50/40"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}

          <div className="p-6">
            {successRole ? (
              <SuccessScreen role={successRole} onReset={handleReset} />
            ) : mode === "login" ? (
              <>
                {/* Role tabs — only for login */}
                <RoleTabs role={loginRole} onChange={(r) => setLoginRole(r)} />

                {loginRole === "user"   && <UserLogin   onSuccess={handleSuccess} />}
                {loginRole === "admin"  && <AdminLogin  onSuccess={handleSuccess} />}
                {loginRole === "driver" && <DriverLogin onSuccess={handleSuccess} />}

                {/* Switch to register */}
                {loginRole === "user" && (
                  <div className="text-center mt-5 pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400 font-medium">New to ShivKart? </span>
                    <button onClick={() => setMode("register")} className="text-xs font-bold text-[#ff6b00] hover:underline">
                      Create account
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Registration */
              <UserRegister onSuccess={handleSuccess} onSwitchToLogin={() => setMode("login")} />
            )}
          </div>
        </div>

        {/* Footer note */}
        {!successRole && (
          <p className="text-center text-[11px] text-gray-400 font-medium mt-5 leading-relaxed">
            By continuing, you agree to ShivKart's
            <span className="text-[#ff6b00] cursor-pointer"> Terms of Service </span>&amp;
            <span className="text-[#ff6b00] cursor-pointer"> Privacy Policy</span>
          </p>
        )}

      </div>
    </div>
  );
}
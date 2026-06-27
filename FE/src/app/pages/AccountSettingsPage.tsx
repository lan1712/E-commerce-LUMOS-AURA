import { useState } from "react";
import imgOrderProduct from "../../assets/account/latest-order-product.png";
import { useNav, useAuth } from "../context";
import { Footer } from "../components/Footer";
import { ChevronRight, Gift, X, Eye, EyeOff } from "lucide-react";
import { auth as authApi } from "../api";

type Section = "profile" | "orders" | "wishlist" | "addresses" | "settings";

const navItems: { key: Section | "logout"; label: string }[] = [
  { key: "profile", label: "Profile" },
  { key: "orders", label: "Orders" },
  { key: "wishlist", label: "Wishlist" },
  { key: "addresses", label: "Addresses" },
  { key: "settings", label: "Settings" },
];

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: "0.96px",
          color: "#7f756d",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="outline-none pb-2 bg-transparent transition-colors"
        style={{
          borderBottom: "1px solid #d1c4bb",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          color: "#3d3530",
        }}
        onFocus={(e) => (e.target.style.borderBottomColor = "#6b5948")}
        onBlur={(e) => (e.target.style.borderBottomColor = "#d1c4bb")}
      />
    </div>
  );
}

export function AccountSettingsPage() {
  const { navigate } = useNav();
  const { user, refreshUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwForm, setPwForm] = useState({ otp: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [pwSaved, setPwSaved] = useState(false);

  const handleRequestPasswordChange = async () => {
    try {
      await authApi.requestPasswordOtp();
      setShowPasswordModal(true);
      alert("An OTP has been sent to your email.");
    } catch (e: any) {
      alert("Failed to send OTP: " + (e.message || "Unknown error"));
    }
  };

  const handlePasswordSave = async () => {
    if (pwForm.next && pwForm.next === pwForm.confirm && pwForm.otp) {
      try {
        await authApi.changePassword({ otp: pwForm.otp, newPassword: pwForm.next });
        setPwSaved(true);
        setTimeout(() => {
          setPwSaved(false);
          setShowPasswordModal(false);
          setPwForm({ otp: "", next: "", confirm: "" });
        }, 1800);
      } catch (e: any) {
        alert("Password change failed: " + (e.message || "Unknown error"));
      }
    } else {
      alert("Please check that your passwords match and OTP is entered.");
    }
  };

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    phone: user?.phoneNumber ?? "",
  });

  const handleSave = async () => {
    setSaveError("");
    try {
      await authApi.updateMe({ firstName: form.firstName, lastName: form.lastName, phoneNumber: form.phone });
      await refreshUser();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e: unknown) {
      setSaveError(e instanceof Error ? e.message : "Save failed.");
    }
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="max-w-[1280px] mx-auto w-full px-10 pt-32 pb-20 flex gap-16">
        {/* Sidebar */}
        <aside className="w-40 shrink-0">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 32,
              color: "#3d3530",
              lineHeight: "40px",
              marginBottom: 24,
            }}
          >
            My<br />Account
          </h1>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  if (key === "orders") navigate("orders");
                  else if (key === "wishlist") navigate("wishlist");
                  else if (key === "addresses") navigate("addresses");
                  else setActiveSection(key as Section);
                }}
                className="text-left px-2 py-1.5 rounded transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: activeSection === key ? 600 : 400,
                  fontSize: 14,
                  color: activeSection === key ? "#6b5948" : "#4e453e",
                  backgroundColor: activeSection === key ? "#efe6e2" : "transparent",
                  borderLeft: activeSection === key ? "2px solid #6b5948" : "2px solid transparent",
                }}
              >
                {label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => { logout(); navigate("home"); }}
            className="mt-6 text-left px-2 py-1.5 hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 14,
              color: "#7f756d",
            }}
          >
            Log Out
          </button>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Dashboard cards row */}
          <div className="grid grid-cols-2 gap-6 mb-12">
            {/* Reward balance */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "white", border: "1px solid #efe6e2", boxShadow: "0 4px 16px rgba(109,91,74,0.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "1.2px",
                    color: "#7f756d",
                    textTransform: "uppercase",
                  }}
                >
                  Reward Balance
                </p>
                <Gift size={16} color="#735a36" />
              </div>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: 48,
                  color: "#3d3530",
                  lineHeight: "56px",
                }}
              >
                {user?.rewardPoints?.toLocaleString() || "0"}
              </p>
              <button
                className="flex items-center gap-1 mt-3 hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 13,
                  color: "#735a36",
                }}
              >
                Redeem Points →
              </button>
            </div>

            {/* Latest order */}
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "white", border: "1px solid #efe6e2", boxShadow: "0 4px 16px rgba(109,91,74,0.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "1.2px",
                    color: "#7f756d",
                    textTransform: "uppercase",
                  }}
                >
                  Latest Order
                </p>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.5px",
                    color: "#7f756d",
                  }}
                >
                  #LA-4641
                </span>
              </div>
              <div
                className="flex items-center gap-4 cursor-pointer group"
                onClick={() => navigate("orders")}
              >
                <div
                  className="rounded-xl overflow-hidden shrink-0"
                  style={{ width: 64, height: 64, backgroundColor: "#fff8f5" }}
                >
                  <img src={imgOrderProduct} alt="Latest order" className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: 18,
                      color: "#3d3530",
                    }}
                  >
                    Midnight Sandalwood
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 13,
                      color: "#7f756d",
                    }}
                  >
                    50ml Extrait de Parfum
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#735a36" }} />
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 12,
                        color: "#735a36",
                      }}
                    >
                      In Transit · Expected Delivery Tomorrow
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} color="#d1c4bb" className="group-hover:text-[#6b5948] transition-colors shrink-0" />
              </div>
            </div>
          </div>

          {/* Personal Information form */}
          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 40,
                color: "#3d3530",
                lineHeight: "48px",
                marginBottom: 32,
              }}
            >
              Personal Information
            </h2>

            <div className="flex flex-col gap-8 max-w-[640px]">
              <div className="grid grid-cols-2 gap-6">
                <Field
                  label="First Name"
                  value={form.firstName}
                  onChange={(v) => setForm({ ...form, firstName: v })}
                />
                <Field
                  label="Last Name"
                  value={form.lastName}
                  onChange={(v) => setForm({ ...form, lastName: v })}
                />
              </div>
              <Field
                label="Email Address"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                type="email"
              />
              <Field
                label="Phone Number"
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                type="tel"
              />

              {/* Password section */}
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.96px",
                    color: "#7f756d",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Password
                </p>
                <button
                  onClick={handleRequestPasswordChange}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#735a36",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Change password →
                </button>
              </div>

              {saveError && (
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c0392b" }}>{saveError}</p>
              )}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="rounded-full px-6 py-3 hover:opacity-90 transition-all"
                  style={{
                    backgroundColor: saved ? "#4e453e" : "#6b5948",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.7px",
                    color: "white",
                  }}
                >
                  {saved ? "Saved ✓" : "Save Changes"}
                </button>
                <button
                  onClick={() =>
                    setForm({
                      firstName: "Eleanor",
                      lastName: "Vance",
                      email: "eleanor.vance@example.com",
                      phone: "+1 (555) 019-2834",
                    })
                  }
                  className="rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
                  style={{
                    border: "1px solid #d1c4bb",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "0.7px",
                    color: "#675a4e",
                    backgroundColor: "transparent",
                  }}
                >
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(28,22,18,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-[440px] rounded-2xl p-8 relative"
            style={{ backgroundColor: "white", boxShadow: "0 20px 60px rgba(28,22,18,0.2)" }}
          >
            <button
              onClick={() => { setShowPasswordModal(false); setPwForm({ current: "", next: "", confirm: "" }); }}
              className="absolute top-5 right-5 hover:opacity-70 transition-opacity"
            >
              <X size={18} color="#7f756d" />
            </button>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 28,
                color: "#3d3530",
                marginBottom: 24,
              }}
            >
              Change Password
            </h2>

            {pwSaved ? (
              <div className="flex flex-col items-center py-8 gap-3 text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#6b5948" }}
                >
                  <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                    <path d="M1.5 7L6.5 12L16.5 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, color: "#3d3530" }}>
                  Password updated!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {[
                  { label: "OTP from Email", key: "otp" as const },
                  { label: "New Password", key: "next" as const },
                  { label: "Confirm New Password", key: "confirm" as const },
                ].map(({ label, key }) => (
                  <div key={key} className="relative">
                    <label
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: "1.2px",
                        color: "#7f756d",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </label>
                    <input
                      type={showPw ? "text" : "password"}
                      value={pwForm[key]}
                      onChange={(e) => setPwForm((prev) => ({ ...prev, [key]: e.target.value }))}
                      className="w-full outline-none pb-2 bg-transparent pr-8"
                      style={{
                        borderBottom: "1px solid #d1c4bb",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 15,
                        color: "#3d3530",
                      }}
                    />
                    {key === "next" && (
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-0 bottom-2 hover:opacity-70 transition-opacity"
                      >
                        {showPw ? <EyeOff size={15} color="#7f756d" /> : <Eye size={15} color="#7f756d" />}
                      </button>
                    )}
                  </div>
                ))}
                {pwForm.next && pwForm.confirm && pwForm.next !== pwForm.confirm && (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#c0392b", marginTop: -12 }}>
                    Passwords do not match.
                  </p>
                )}
                <button
                  onClick={handlePasswordSave}
                  disabled={!pwForm.current || !pwForm.next || pwForm.next !== pwForm.confirm}
                  className="rounded-full py-3 hover:opacity-90 transition-opacity disabled:opacity-40"
                  style={{
                    backgroundColor: "#6b5948",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

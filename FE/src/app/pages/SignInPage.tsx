import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import imgMoonlit from "../../assets/auth/sign-in-candle.png";
import { useNav, useAuth } from "../context";

export function SignInPage() {
  const { navigate } = useNav();
  const { login, register, loginWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (credentialResponse: { credential?: string }) => {
    if (!credentialResponse.credential) {
      setError("Google did not return a valid credential.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await loginWithGoogle(credentialResponse.credential);
      const u = JSON.parse(localStorage.getItem("lumos_user") || "{}");
      if (u.role === "ADMIN") {
        navigate("admin");
      } else {
        navigate("account");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    try {
      if (mode === "signin") {
        await login(email, password);
      } else {
        await register(email, password, firstName, lastName);
      }
      
      const u = JSON.parse(localStorage.getItem("lumos_user") || "{}");
      if (u.role === "ADMIN") {
        navigate("admin");
      } else {
        navigate("account");
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-1 relative overflow-hidden"
        style={{ backgroundColor: "#fbf2ed" }}
      >
        <img
          src={imgMoonlit}
          alt="Moonlit candle"
          className="absolute top-0 w-[137.14%] h-full object-cover"
          style={{ left: "-18.57%", mixBlendMode: "multiply", opacity: 0.9 }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(218,194,174,0.4) 0%, rgba(218,194,174,0) 50%)", mixBlendMode: "overlay" }}
        />
        <div className="absolute bottom-12 left-12 right-12">
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 48, color: "white", lineHeight: "56px" }}
          >
            Illuminate<br />Your World
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "rgba(255,255,255,0.8)", marginTop: 12, lineHeight: "26px" }}
          >
            Sign in to access your orders,<br />wishlist and exclusive member benefits.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div
        className="flex flex-col w-full lg:w-[533px] shrink-0 relative overflow-auto"
        style={{ backgroundColor: "#fff8f5" }}
      >
        {/* Return to shop */}
        <button
          onClick={() => navigate("home")}
          className="absolute top-8 left-10 flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <svg width="12.5" height="12.5" viewBox="0 0 12.5 12.5" fill="none">
            <path d="M7.5 2.5L3 6.25L7.5 10" stroke="#6b5948" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "#6b5948" }}
          >
            Return to Shop
          </span>
        </button>

        <div className="flex flex-col justify-center min-h-full px-16 py-28">
          {/* Toggle header */}
          <div className="flex gap-8 mb-12">
            <button
              onClick={() => setMode("signin")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: mode === "signin" ? 64 : 32,
                color: mode === "signin" ? "#6b5948" : "#7f756d",
                opacity: mode === "signin" ? 1 : 0.4,
                letterSpacing: mode === "signin" ? "-1.28px" : 0,
                lineHeight: mode === "signin" ? "72px" : "40px",
                transition: "all 0.2s",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("create")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: mode === "create" ? 64 : 32,
                color: mode === "create" ? "#6b5948" : "#7f756d",
                opacity: mode === "create" ? 1 : 0.4,
                letterSpacing: mode === "create" ? "-1.28px" : 0,
                lineHeight: mode === "create" ? "72px" : "40px",
                transition: "all 0.2s",
              }}
            >
              Create
            </button>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-8">
            {/* Name fields (create mode only) */}
            {mode === "create" && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", val: firstName, set: setFirstName, ph: "Elara" },
                  { label: "Last Name", val: lastName, set: setLastName, ph: "Vance" },
                ].map(({ label, val, set, ph }) => (
                  <div key={label} className="flex flex-col gap-2">
                    <label style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e" }}>
                      {label}
                    </label>
                    <input
                      type="text"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      placeholder={ph}
                      className="outline-none transition-colors"
                      style={{ border: "1px solid #d1c4bb", padding: "12px 13px", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#4e453e", borderRadius: 4, backgroundColor: "white" }}
                      onFocus={(e) => (e.target.style.borderColor = "#6b5948")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1c4bb")}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <label
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e" }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="outline-none transition-colors"
                style={{ border: "1px solid #d1c4bb", padding: "12px 13px", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 18, color: "#4e453e", borderRadius: 4, backgroundColor: "white" }}
                onFocus={(e) => (e.target.style.borderColor = "#6b5948")}
                onBlur={(e) => (e.target.style.borderColor = "#d1c4bb")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e" }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="outline-none transition-colors"
                style={{ border: "1px solid #d1c4bb", padding: "12px 13px", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 18, color: "#4e453e", borderRadius: 4, backgroundColor: "white" }}
                onFocus={(e) => (e.target.style.borderColor = "#6b5948")}
                onBlur={(e) => (e.target.style.borderColor = "#d1c4bb")}
              />
            </div>

            {mode === "signin" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded-[2px] border flex items-center justify-center cursor-pointer"
                    style={{ borderColor: "#7f756d", backgroundColor: remember ? "#6b5948" : "white" }}
                    onClick={() => setRemember(!remember)}
                  >
                    {remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#4e453e" }}>
                    Remember me
                  </span>
                </label>
                <button
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#6b5948" }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c0392b", marginTop: -16 }}>
                {error}
              </p>
            )}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-full py-4 hover:opacity-90 transition-opacity mt-2 disabled:opacity-60"
              style={{
                backgroundColor: "#6b5948",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.7px",
                color: "white",
              }}
            >
              {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-10">
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(209,196,187,0.5)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", color: "#7f756d", textTransform: "uppercase" }}>
              OR CONTINUE WITH
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: "rgba(209,196,187,0.5)" }} />
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="w-full rounded-full py-4 flex items-center justify-center gap-3 hover:bg-[rgba(239,230,226,0.3)] transition-colors"
              style={{ border: "1px solid rgba(209,196,187,0.6)" }}
            >
              <span style={{ fontSize: 16 }}>🍎</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "#6b5948" }}>
                Continue with Apple
              </span>
            </button>
            <div className="flex w-full justify-center overflow-hidden rounded-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google Login was unsuccessful. Please try again.")}
                type="standard"
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                logo_alignment="center"
                width="405"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

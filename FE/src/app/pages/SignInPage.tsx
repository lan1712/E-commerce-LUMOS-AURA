import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import imgMoonlit from "../../assets/auth/sign-in-candle.png";
import { useNav, useAuth } from "../context";

// ─── tiny star SVG matching the Lumos Aura brand mark ───────────────────
function StarMark({ size = 18, color = "#b8924a" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" fill={color} />
    </svg>
  );
}

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
      navigate(u.role === "ADMIN" ? "admin" : "account");
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
      navigate(u.role === "ADMIN" ? "admin" : "account");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#f5ede4",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ═══════════════════════════════════════════════════════════
          LEFT PANEL — form
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="w-full lg:max-w-[520px]"
        style={{
          width: "100%",
          flexShrink: 0,
          backgroundColor: "#fdf8f4",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          position: "relative",
          zIndex: 2,
          boxShadow: "4px 0 40px rgba(100,70,40,0.08)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "clamp(20px, 5vw, 28px) clamp(20px, 7vw, 40px) 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand mark */}
          <button
            onClick={() => navigate("home")}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <StarMark size={20} color="#b8924a" />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 13,
                letterSpacing: "0.3em",
                color: "#7a5c38",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
            >
              Lumos Aura
            </span>
          </button>

          {/* Back link */}
          <button
            onClick={() => navigate("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "#9a8070",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: 0,
              opacity: 0.8,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="#9a8070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to shop
          </button>
        </div>

        {/* Divider line under top bar */}
        <div
          style={{
            margin: "20px clamp(20px, 7vw, 40px) 0",
            height: 1,
            background: "linear-gradient(to right, #e8d9cc, transparent)",
          }}
        />

        {/* Main form area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(28px, 7vw, 36px) clamp(20px, 7vw, 44px) clamp(28px, 8vw, 44px)",
          }}
        >
          {/* Mode toggle */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 36, flexWrap: "wrap" }}>
            {(["signin", "create"] as const).map((m) => {
              const active = mode === m;
              return (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: active ? "clamp(38px, 12vw, 46px)" : "clamp(22px, 7vw, 26px)",
                    color: active ? "#3d2e22" : "#b09a88",
                    letterSpacing: active ? "-0.02em" : "0",
                    lineHeight: 1,
                    transition: "all 0.25s",
                  }}
                >
                  {m === "signin" ? "Sign In" : "Register"}
                </button>
              );
            })}
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: 13,
              color: "#9a8878",
              margin: "0 0 32px",
              lineHeight: 1.6,
              letterSpacing: "0.01em",
            }}
          >
            {mode === "signin"
              ? "Welcome back — your candles are waiting."
              : "Join Lumos Aura and light up your world."}
          </p>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {mode === "create" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 12 }}>
                {[
                  { label: "First Name", val: firstName, set: setFirstName, ph: "Elara" },
                  { label: "Last Name", val: lastName, set: setLastName, ph: "Vance" },
                ].map(({ label, val, set, ph }) => (
                  <FieldGroup key={label} label={label}>
                    <StyledInput
                      type="text"
                      value={val}
                      onChange={(e) => set(e.target.value)}
                      placeholder={ph}
                    />
                  </FieldGroup>
                ))}
              </div>
            )}

            <FieldGroup label="Email Address">
              <StyledInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </FieldGroup>

            <FieldGroup label="Password">
              <StyledInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FieldGroup>

            {mode === "signin" && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
                <label
                  style={{ display: "flex", alignItems: "center", gap: 9, cursor: "pointer" }}
                  onClick={() => setRemember(!remember)}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      border: `1.5px solid ${remember ? "#b8924a" : "#c4afa0"}`,
                      backgroundColor: remember ? "#b8924a" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    {remember && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 13, color: "#7a6a5c" }}>Remember me</span>
                </label>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    color: "#9a7a5a",
                    letterSpacing: "0.03em",
                    padding: 0,
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {error && (
              <p style={{ fontSize: 12, color: "#c0392b", margin: 0, lineHeight: 1.5 }}>
                {error}
              </p>
            )}

            {/* Primary CTA */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px 0",
                borderRadius: 100,
                backgroundColor: "#3d2e22",
                color: "#f5e8d8",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.65 : 1,
                transition: "opacity 0.2s, transform 0.15s",
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => !loading && ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => !loading && ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              {loading ? (
                "Please wait…"
              ) : (
                <>
                  <StarMark size={12} color="#d4a86a" />
                  {mode === "signin" ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              margin: "28px 0",
            }}
          >
            <div style={{ flex: 1, height: 1, backgroundColor: "#e4d4c8" }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#b09a88",
              }}
            >
              or continue with
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: "#e4d4c8" }} />
          </div>

          {/* Social logins */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Google */}
            <div
              style={{
                width: "100%",
                borderRadius: 100,
                border: "0px solid #e0cfc4",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login unsuccessful. Please try again.")}
                type="standard"
                theme="outline"
                size="large"
                text="continue_with"
                shape="pill"
                logo_alignment="center"
                width="320"
              />
            </div>

            {/* Apple */}
          </div>

          {/* Footer note */}
          <p
            style={{
              fontSize: 11,
              color: "#b09a88",
              textAlign: "center",
              marginTop: 28,
              lineHeight: 1.7,
            }}
          >
            By continuing, you agree to our{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", textUnderlineOffset: 2 }}>
              Terms
            </span>{" "}
            &{" "}
            <span style={{ textDecoration: "underline", cursor: "pointer", textUnderlineOffset: 2 }}>
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════
          RIGHT PANEL — full-bleed candle image
      ═══════════════════════════════════════════════════════════ */}
      <div
        style={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: "none",
        }}
        className="lg-visible"
      >
        <style>{`
          @media (min-width: 1024px) {
            .lg-visible { display: block !important; }
          }
        `}</style>

        {/* Candle image */}
        <img
          src={imgMoonlit}
          alt="Lumos Aura candle"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />

        {/* Warm gradient overlay — heavier at bottom for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(45,28,14,0.72) 0%, rgba(45,28,14,0.15) 45%, rgba(45,28,14,0.04) 100%)",
          }}
        />

        {/* Top-left brand watermark on image */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StarMark size={16} color="rgba(255,235,195,0.7)" />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 11,
                letterSpacing: "0.35em",
                color: "rgba(255,235,195,0.7)",
                textTransform: "uppercase",
              }}
            >
              Lumos Aura
            </span>
          </div>
          <div
            style={{
              height: 1,
              width: 80,
              background: "rgba(255,235,195,0.3)",
              marginLeft: 24,
            }}
          />
        </div>

        {/* Bottom text block */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 48,
            right: 48,
          }}
        >
          {/* Decorative quote mark */}
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 72,
              color: "rgba(212,168,106,0.5)",
              lineHeight: 0.7,
              marginBottom: 16,
              userSelect: "none",
            }}
          >
            "
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: "clamp(32px, 3.5vw, 48px)",
              color: "#fff8f0",
              lineHeight: 1.2,
              margin: "0 0 14px",
              letterSpacing: "-0.01em",
            }}
          >
            Illuminate<br />Your World
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: "rgba(255,240,220,0.75)",
              lineHeight: 1.8,
              margin: "0 0 24px",
              maxWidth: 340,
            }}
          >
            Access your orders, wishlist, and exclusive member benefits — all in one warm space.
          </p>

          {/* Small social proof strip */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex" }}>
              {["E", "S", "M", "A"].map((initial, i) => (
                <div
                  key={i}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: `hsl(${30 + i * 12}, 40%, ${70 - i * 5}%)`,
                    border: "2px solid rgba(255,248,240,0.6)",
                    marginLeft: i > 0 ? -8 : 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "white",
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,240,220,0.8)",
                letterSpacing: "0.02em",
              }}
            >
              Join <strong style={{ color: "#f5d9a8" }}>2,400+</strong> candle lovers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Small reusable sub-components ───────────────────────────────────────────

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#7a6a5c",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function StyledInput({
  type,
  value,
  onChange,
  placeholder,
}: {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        border: "1.5px solid #ddd0c6",
        borderRadius: 8,
        padding: "12px 14px",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
        fontSize: 14,
        color: "#3d2e22",
        backgroundColor: "#fffaf7",
        outline: "none",
        transition: "border-color 0.15s",
        width: "100%",
        boxSizing: "border-box",
      }}
      onFocus={(e) => (e.target.style.borderColor = "#b8924a")}
      onBlur={(e) => (e.target.style.borderColor = "#ddd0c6")}
    />
  );
}

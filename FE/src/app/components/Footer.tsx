import { useNav } from "../context";

export function Footer() {
  const { navigate } = useNav();

  return (
    <footer style={{ backgroundColor: "#f5ece7" }} className="w-full py-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
          {/* Brand column */}
          <div className="md:col-span-4">
            <div
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 40, color: "#6b5948", marginBottom: 16 }}
            >
              Lumos Aura
            </div>
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e", lineHeight: "19.5px" }}
            >
              Bridging high-end olfactory art with cosmic mysticism.
            </p>
            <div className="flex gap-4 mt-8">
              {["Instagram", "Pinterest", "TikTok"].map((s) => (
                <button
                  key={s}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#735a36" }}
                  className="hover:opacity-70 transition-opacity"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-2">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e", marginBottom: 16 }}>
              EXPLORE
            </p>
            {[
              { label: "Brand Story", page: "about" as const },
              { label: "The Collection", page: "shop" as const },
              { label: "Gift Collection", page: "gift" as const },
              { label: "About", page: "about" as const },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => navigate(page)}
                className="block mb-3 hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#4e453e", lineHeight: "24px" }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="md:col-span-2">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e", marginBottom: 16 }}>
              HELP
            </p>
            {[
              { label: "Newsletter", page: null },
              { label: "Shipping & Returns", page: "policies" as const },
              { label: "Privacy Policy", page: "policies" as const },
              { label: "Contact Us", page: "contact" as const },
            ].map(({ label, page }) => (
              <button
                key={label}
                onClick={() => page && navigate(page)}
                className="block mb-3 hover:opacity-70 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#4e453e", lineHeight: "24px" }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-col justify-between items-stretch md:col-span-4 md:items-end">
            {/* Map + address card */}
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ border: "1px solid #e0d5ce" }}
            >
              <div style={{ height: 140 }}>
                <iframe
                  title="Lumos Aura Boutique"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=02%20V%C3%B5%20Oanh%2C%20Th%E1%BA%A1nh%20M%E1%BB%B9%20T%C3%A2y%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh%2C%20Vi%E1%BB%87t%20Nam&output=embed"
                />
              </div>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: "white" }}
              >
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#3d3530" }}>
                    02 Võ Oanh
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 11, color: "#7f756d", marginTop: 1 }}>
                    Thạnh Mỹ Tây, Hồ Chí Minh, Việt Nam
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=02+V%C3%B5+Oanh,+Th%E1%BA%A1nh+M%E1%BB%B9+T%C3%A2y,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 11,
                    color: "#735a36",
                    textDecoration: "none",
                    letterSpacing: "0.3px",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Directions ↗
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 11, letterSpacing: "0.5px", color: "#a09589", marginTop: 16 }}
            >
              © 2026 Lumos Aura. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

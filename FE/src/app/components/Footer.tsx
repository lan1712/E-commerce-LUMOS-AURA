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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.142047342751!2d2.3002!3d48.8756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4bf0d5d59%3A0xb4f9b5b4b4b4b4b4!2sRue%20du%20Faubourg%20Saint-Honor%C3%A9%2C%20Paris!5e0!3m2!1sen!2sfr!4v1700000000000"
                />
              </div>
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ backgroundColor: "white" }}
              >
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, color: "#3d3530" }}>
                    124 Perfumer's Row
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 11, color: "#7f756d", marginTop: 1 }}>
                    Paris, France 75008
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=124+Perfumer's+Row+Paris+75008"
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
              © 2024 Lumos Aura. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

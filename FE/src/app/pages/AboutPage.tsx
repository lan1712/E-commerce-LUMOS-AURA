import { useNav } from "../context";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const IMG_HERO =
  "https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=1200&h=700&fit=crop&auto=format";
const IMG_CANDLE_JAR =
  "https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?w=700&h=800&fit=crop&auto=format";
const IMG_CANDLE_GLOW =
  "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=700&h=800&fit=crop&auto=format";

const promises = [
  {
    icon: "🌿",
    title: "Natural Ingredients",
    body: "All our candles are made with 100% natural soy wax, premium essential oils, and cotton wicks — no toxins, no synthetic fillers.",
  },
  {
    icon: "🕯️",
    title: "Hand-Poured",
    body: "Every candle is hand-poured in small batches and inspected before it leaves our atelier. No mass production, ever.",
  },
  {
    icon: "📦",
    title: "Eco Packaging",
    body: "Our boxes are made from recycled materials with soy-based inks. Beautiful on the outside, responsible on the inside.",
  },
  {
    icon: "✈️",
    title: "Ships Worldwide",
    body: "We ship to over 50 countries via premium courier. Orders are carefully wrapped so your candle arrives in perfect condition.",
  },
];

export function AboutPage() {
  const { navigate } = useNav();

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>

      {/* Hero */}
      <div className="pt-28 pb-0 sm:pt-32">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10">
          {/* Heading */}
          <div className="mb-10">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "3px",
                color: "#7f756d",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              About Lumos Aura
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(40px, 10vw, 56px)",
                color: "#3d3530",
                lineHeight: 1.14,
                letterSpacing: "-0.5px",
                maxWidth: 640,
              }}
            >
              We Make Candles That Transform Your Space.
            </h1>
          </div>

          {/* Image + intro text side by side */}
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-2xl overflow-hidden" style={{ minHeight: 260, height: "clamp(260px, 58vw, 420px)" }}>
              <ImageWithFallback
                src={IMG_HERO}
                alt="Lumos Aura candle on wooden table"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center h-full py-4">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 17,
                  color: "#675a4e",
                  lineHeight: "30px",
                  marginBottom: 20,
                }}
              >
                Lumos Aura started in Viet Nam in 2026 with a simple idea: a candle should do more than fill a room with scent. It should change the mood, mark the moment, and become part of your ritual.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 17,
                  color: "#675a4e",
                  lineHeight: "30px",
                  marginBottom: 36,
                }}
              >
                Today we make over 30 fragrances — from bright citrus and fresh florals to deep woods and resins — all crafted with natural ingredients and a lot of care.
              </p>
              <button
                onClick={() => navigate("shop")}
                className="self-start rounded-full px-7 py-3.5 hover:opacity-90 transition-opacity"
                style={{
                  backgroundColor: "#6b5948",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.5px",
                  color: "white",
                }}
              >
                Shop All Candles →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ backgroundColor: "#3d3530" }} className="mt-16 py-10">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-0">
            {[
              { n: "2018", l: "Founded in Paris" },
              { n: "30+", l: "Unique Fragrances" },
              { n: "50+", l: "Countries Shipped" },
              { n: "100%", l: "Natural Soy Wax" },
            ].map(({ n, l }, i) => (
              <div
                key={l}
                className="text-center py-2"
                style={{ borderRight: i < 3 ? "1px solid rgba(255,248,245,0.12)" : "none" }}
              >
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: 40,
                    color: "#d1b89a",
                    lineHeight: "44px",
                  }}
                >
                  {n}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "rgba(255,248,245,0.5)",
                    marginTop: 6,
                  }}
                >
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our promises */}
      <div className="max-w-[1100px] mx-auto px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <h2
          className="mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 7vw, 40px)",
            color: "#3d3530",
            lineHeight: "48px",
          }}
        >
          Our Promise to You
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {promises.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-5 sm:p-7 flex gap-4 sm:gap-5 items-start"
              style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}
            >
              <span style={{ fontSize: 28, lineHeight: 1, marginTop: 2 }}>{p.icon}</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#3d3530",
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#675a4e",
                    lineHeight: "24px",
                  }}
                >
                  {p.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two images + short copy */}
      <div style={{ backgroundColor: "#f5ece7" }} className="py-20">
        <div className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl overflow-hidden" style={{ height: "clamp(220px, 58vw, 320px)" }}>
                <ImageWithFallback
                  src={IMG_CANDLE_JAR}
                  alt="Lumos Aura candle in glass jar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden mt-6 sm:mt-8" style={{ height: "clamp(220px, 58vw, 320px)" }}>
                <ImageWithFallback
                  src={IMG_CANDLE_GLOW}
                  alt="Candle glowing in the dark"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: "clamp(32px, 7vw, 40px)",
                  color: "#3d3530",
                  lineHeight: "48px",
                  marginBottom: 20,
                }}
              >
                Made for Your Home, Made with Care.
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#675a4e",
                  lineHeight: "28px",
                  marginBottom: 16,
                }}
              >
                Every scent in our collection is developed to work beautifully in living rooms, bedrooms, bathrooms, and offices. We test each candle extensively so you get a consistent, even burn every time.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 16,
                  color: "#675a4e",
                  lineHeight: "28px",
                  marginBottom: 32,
                }}
              >
                Our burn times range from 40 to 80+ hours depending on the size — so every purchase is an investment in many evenings of ambience.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => navigate("shop")}
                  className="rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
                  style={{
                    backgroundColor: "#6b5948",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "white",
                  }}
                >
                  Browse Candles
                </button>
                <button
                  onClick={() => navigate("contact")}
                  className="rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
                  style={{
                    border: "1px solid #d1c4bb",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#675a4e",
                    backgroundColor: "transparent",
                  }}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16 text-center px-5 sm:px-8 lg:py-20">
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(34px, 8vw, 44px)",
            color: "#3d3530",
            lineHeight: "52px",
            marginBottom: 12,
          }}
        >
          Ready to find your perfect scent?
        </h2>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#7f756d",
            lineHeight: "26px",
            marginBottom: 32,
          }}
        >
          Explore our full collection — from single candles to gift sets.
        </p>
        <button
          onClick={() => navigate("shop")}
          className="rounded-full px-10 py-4 hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: "#6b5948",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "0.5px",
            color: "white",
          }}
        >
          Shop All Candles →
        </button>
      </div>

      <Footer />
    </div>
  );
}

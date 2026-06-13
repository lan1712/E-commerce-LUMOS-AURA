import imgHero from "../../imports/HomeLumosAura/351aa6ce61a879337822c71b4b73a7a8723a4de0.png";
import imgAbstractScent from "../../imports/HomeLumosAura/27380e3a1a433b59bbb47b71e4b73282ec75268f.png";
import imgBrandTexture from "../../imports/HomeLumosAura/9c4ffb73b493fa4731ca8267c88f54440ce40380.png";
import { products } from "../data";
import { ProductCard } from "../components/ProductCard";
import { useNav } from "../context";
import { Footer } from "../components/Footer";

const featuredCollections = [
  {
    id: "midnight-constellation",
    name: "Midnight Constellation",
    sub: "Deep woods & starlight.",
  },
  {
    id: "solar-flare",
    name: "Solar Flare",
    sub: "Vibrant citrus & amber.",
  },
  {
    id: "ethereal-bloom",
    name: "Ethereal Bloom",
    sub: "Soft petals & morning dew.",
  },
];

export function HomePage() {
  const { navigate } = useNav();
  const bestSellers = products.slice(0, 4);

  return (
    <div className="flex flex-col items-start w-full" style={{ backgroundColor: "#fff8f5" }}>
      {/* ── Hero ── */}
      <section
        className="relative w-full min-h-[921px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "#f5ece7" }}
      >
        {/* Aura glow background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(200,169,126,0.15) 0%, rgba(200,169,126,0) 70%)",
          }}
        />
        {/* Hero image */}
        <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
          <img
            src={imgHero}
            alt=""
            className="w-full h-[138.98%] absolute top-[-19.49%] left-0 object-cover"
          />
        </div>
        {/* Content */}
        <div className="relative flex flex-col items-center max-w-[768px] px-8 py-40 text-center z-10">
          <h1
            className="drop-shadow-sm mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 64,
              color: "#6b5948",
              letterSpacing: "-1.28px",
              lineHeight: "72px",
            }}
          >
            Ignite Your Aura
          </h1>
          <p
            className="max-w-[576px] mb-16"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 18,
              color: "#675a4e",
              lineHeight: "28px",
            }}
          >
            Discover olfactory art crafted to elevate your space and soothe your soul. Embrace the warm embrace of our signature scents.
          </p>
          <button
            onClick={() => navigate("shop")}
            className="rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "#6b5948",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "white",
              letterSpacing: "0.7px",
              boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)",
            }}
          >
            Explore The Collection
          </button>
        </div>
      </section>

      {/* ── Featured Collections ── */}
      <section
        className="w-full max-w-[1440px] mx-auto px-10 py-[120px]"
        style={{ backgroundColor: "#fff8f5" }}
      >
        <h2
          className="text-center w-full mb-16"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 40,
            color: "#6b5948",
            lineHeight: "48px",
          }}
        >
          Curated Collections
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {featuredCollections.map((col) => {
            const product = products.find((p) => p.id === col.id);
            return (
              <div
                key={col.id}
                className="relative h-[500px] rounded-2xl overflow-hidden cursor-pointer group"
                style={{ boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)" }}
                onClick={() => navigate("product", col.id)}
              >
                {product && (
                  <img
                    src={product.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(52,48,44,0.8) 0%, rgba(52,48,44,0.2) 50%, rgba(52,48,44,0) 100%)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: 32,
                      color: "white",
                      lineHeight: "40px",
                    }}
                  >
                    {col.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 16,
                      color: "#e9e1dc",
                      lineHeight: "24px",
                    }}
                  >
                    {col.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section
        className="w-full py-[120px]"
        style={{ backgroundColor: "#f5ece7" }}
      >
        <div className="max-w-[1440px] mx-auto px-10">
          <div className="flex items-end justify-between w-full mb-16">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 40,
                color: "#6b5948",
                lineHeight: "48px",
              }}
            >
              Best Sellers
            </h2>
            <button
              onClick={() => navigate("shop")}
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.7px",
                color: "#735a36",
              }}
            >
              Shop All
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 2.5L8 6L4.5 9.5" stroke="#735a36" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section
        className="relative w-full py-[120px] overflow-hidden"
        style={{ backgroundColor: "#efe6e2" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${imgBrandTexture})`, backgroundSize: "300px 300px" }}
        />
        <div className="max-w-[1440px] mx-auto px-10 relative z-10">
          <div className="grid grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  maxWidth: 448,
                  width: "100%",
                  borderRadius: "9999px 0 9999px 0",
                  boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)",
                }}
              >
                <img
                  src={imgAbstractScent}
                  alt="Abstract scent"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div className="flex flex-col gap-4 pl-16">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "1.2px",
                  color: "#735a36",
                  textTransform: "uppercase",
                }}
              >
                OUR PHILOSOPHY
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: 64,
                  color: "#6b5948",
                  letterSpacing: "-1.28px",
                  lineHeight: "72px",
                }}
              >
                Crafting The<br />Ethereal
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: "#4e453e",
                  lineHeight: "29.25px",
                  marginTop: 16,
                }}
              >
                At Lumos Aura, we believe that scent is more than fragrance; it is an invisible architecture that defines the energy of a space. Our creations bridge high-end olfactory art with cosmic mysticism, designed to evoke emotional responses of tranquility and wonder.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 18,
                  color: "#4e453e",
                  lineHeight: "29.25px",
                }}
              >
                Each vessel is a carefully considered artifact of light and shadow, inviting you to illuminate your personal sanctuary.
              </p>
              <button
                onClick={() => navigate("about")}
                className="self-start mt-2 rounded-full px-8 py-3.5 hover:opacity-80 transition-opacity"
                style={{
                  border: "1px solid #735a36",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.7px",
                  color: "#6b5948",
                }}
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

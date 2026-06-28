import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Gift, Leaf, Sparkles, Timer, Star, Flame } from "lucide-react";
import heroFreshLinen from "../../assets/home/hero-fresh-linen.png";
import heroLavenderHaze from "../../assets/home/hero-lavender-haze.png";
import heroRoseBlush from "../../assets/home/hero-rose-blush.png";
import imgAbstractScent from "../../assets/home/abstract-scent.png";
import imgBrandTexture from "../../assets/home/brand-texture.png";
import { productsApi } from "../api";
import { CustomerFeedback } from "../components/CustomerFeedback";
import { Footer } from "../components/Footer";
import { ProductImage } from "../components/ProductImage";
import { useNav } from "../context";
import { formatPrice, getOpeningSalePrice, type Product } from "../data";

const heroSlides = [
  {
    image: heroFreshLinen,
    title: "Fresh Linen",
    eyebrow: "Clean, soft, airy",
    copy: "A calm, cloud-soft candle for slow mornings and freshly made spaces.",
    align: "right",
    productId: "fresh-linen",
  },
  {
    image: heroLavenderHaze,
    title: "Lavender Haze",
    eyebrow: "Lavender, chamomile, musk",
    copy: "A sunlit ritual for easing the day down and inviting quiet back in.",
    align: "left",
    productId: "lavender-haze",
  },
  {
    image: heroRoseBlush,
    title: "Rose Blush",
    eyebrow: "Rose, peony, musk",
    copy: "Romantic florals with a polished, tender warmth for intimate rooms.",
    align: "left",
    productId: "rose-blush",
  },
];

const moodCards = [
  {
    title: "Clean Reset",
    copy: "Cotton, white tea, fresh linen.",
    icon: Leaf,
    filter: "Clean",
    accent: "#dff0e8",
    accentText: "#3d6b56",
    label: "For: Morning rituals",
  },
  {
    title: "Evening Calm",
    copy: "Lavender, chamomile, soft musk.",
    icon: Timer,
    filter: "Relax",
    accent: "#e8e0f0",
    accentText: "#5a4878",
    label: "For: Winding down",
  },
  {
    title: "Romantic Glow",
    copy: "Rose, peony, warm petals.",
    icon: Sparkles,
    filter: "Floral",
    accent: "#f5e0e8",
    accentText: "#7a3d52",
    label: "For: Intimate evenings",
  },
];

const craftSteps = [
  {
    icon: Leaf,
    number: "01",
    title: "Natural soy wax",
    copy: "A cleaner burn with a soft, even melt pool — no paraffin, no compromise.",
  },
  {
    icon: Flame,
    number: "02",
    title: "Hand-poured finish",
    copy: "Small-batch details, poured slowly for a surface that's as beautiful as the scent.",
  },
  {
    icon: Timer,
    number: "03",
    title: "Slow fragrance release",
    copy: "Balanced scent architecture that lingers gently, never overpowering the room.",
  },
  {
    icon: Gift,
    number: "04",
    title: "Gift-ready packaging",
    copy: "Elegant wrapping designed for the moments and people that matter most.",
  },
];

const isGiftProduct = (product: Product) =>
  product.category === "Gift Collection" || product.category === "Gift Sets";

export function HomePage() {
  const { navigate } = useNav();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    productsApi
      .list()
      .then((data: Product[]) => {
        if (data?.length) setProducts(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, []);

  const shopProducts = useMemo(
    () => products.filter((product) => !isGiftProduct(product)),
    [products]
  );
  const bestSellers = shopProducts.slice(0, 4);
  const giftProducts = products.filter(isGiftProduct).slice(0, 2);
  const currentHero = heroSlides[activeHero];
  const textSide =
    currentHero.align === "right"
      ? "ml-auto items-end text-right"
      : "mr-auto items-start text-left";
  const heroOverlay =
    currentHero.align === "right"
      ? "linear-gradient(to left, rgba(42,34,28,0.72), rgba(42,34,28,0.46) 34%, rgba(42,34,28,0.08) 68%)"
      : "linear-gradient(to right, rgba(42,34,28,0.72), rgba(42,34,28,0.46) 34%, rgba(42,34,28,0.08) 68%)";

  const goToHero = (direction: -1 | 1) => {
    setActiveHero(
      (current) => (current + direction + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="flex w-full flex-col" style={{ backgroundColor: "#faf6f2" }}>

      {/* ─── HERO BANNER (kept as-is) ──────────────────────────────── */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-[#2f2722]">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.title}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: index === activeHero ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ filter: "blur(16px)", transform: "scale(1.06)", opacity: 0.42 }}
            />
            <img
              src={slide.image}
              alt={`${slide.title} candle`}
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition:
                  slide.align === "right" ? "left center" : "center center",
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0" style={{ background: heroOverlay }} />

        <div className="relative z-10 flex min-h-[100svh] w-full items-center px-6 md:px-12 xl:px-20">
          <div className={`flex max-w-[560px] flex-col ${textSide}`}>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#e9cfaa]">
              {currentHero.eyebrow}
            </p>
            <h1 className="mb-5 font-['Playfair_Display'] text-[56px] leading-none text-[#fff8f5] md:text-[88px]">
              {currentHero.title}
            </h1>
            <p className="mb-9 max-w-[430px] text-[18px] leading-[30px] text-white/88">
              {currentHero.copy}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("shop")}
                className="rounded-full bg-[#fff8f5] px-8 py-4 text-sm font-bold tracking-[0.06em] text-[#3d3530] shadow-[0_18px_30px_rgba(0,0,0,0.16)] transition-opacity hover:opacity-90"
              >
                Shop All Candles
              </button>
              <button
                onClick={() => navigate("product", currentHero.productId)}
                className="rounded-full border border-white/45 px-8 py-4 text-sm font-bold tracking-[0.06em] text-[#fff8f5] transition-opacity hover:opacity-75"
              >
                View This Scent
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              onClick={() => setActiveHero(index)}
              className="h-2.5 rounded-full transition-all"
              style={{
                width: index === activeHero ? 28 : 10,
                backgroundColor:
                  index === activeHero ? "#fff8f5" : "rgba(255,248,245,0.42)",
              }}
              aria-label={`Show ${slide.title}`}
            />
          ))}
        </div>
        <button
          onClick={() => goToHero(-1)}
          className="absolute left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 backdrop-blur transition-opacity hover:opacity-80"
          title="Previous hero"
        >
          <ChevronLeft size={20} color="#fff8f5" />
        </button>
        <button
          onClick={() => goToHero(1)}
          className="absolute right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/50 backdrop-blur transition-opacity hover:opacity-80"
          title="Next hero"
        >
          <ChevronRight size={20} color="#fff8f5" />
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#faf6f2]" />
      </section>

      {/* ─── MARQUEE STRIP ──────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "#3d3530",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "14px 0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            gap: 0,
            animation: "marquee 28s linear infinite",
          }}
        >
          {[...Array(3)].map((_, outer) => (
            <span key={outer} style={{ display: "inline-flex", gap: 0 }}>
              {[
                "✦ Natural Soy Wax",
                "✦ Hand-Poured",
                "✦ Long Burn Time",
                "✦ Gift-Ready",
                "✦ Free Shipping 500k+",
                "✦ Made in Vietnam",
              ].map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#d1b89a",
                    paddingRight: 48,
                  }}
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>

      {/* ─── MOOD SELECTOR — full-bleed asymmetric cards ────────────── */}
      <section style={{ padding: "96px 0 80px", backgroundColor: "#faf6f2" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ marginBottom: 56, display: "flex", flexDirection: "column", gap: 8 }}>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#8a6e59",
                margin: 0,
              }}
            >
              Craft your atmosphere
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(38px, 5vw, 58px)",
                fontWeight: 400,
                color: "#2e2521",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Scents that shape the feeling
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {moodCards.map(({ title, copy, icon: Icon, filter, accent, accentText, label }, i) => (
              <button
                key={title}
                onClick={() => navigate("shop")}
                style={{
                  background: "white",
                  border: "1px solid #ede4dc",
                  borderRadius: 20,
                  padding: "36px 32px 32px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 12px rgba(109,88,72,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(109,88,72,0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(109,88,72,0.06)";
                }}
              >
                {/* Big background number */}
                <span
                  style={{
                    position: "absolute",
                    top: -10,
                    right: 20,
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 120,
                    fontWeight: 700,
                    color: accent,
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    backgroundColor: accent,
                    color: accentText,
                    borderRadius: 100,
                    padding: "5px 12px",
                    fontSize: 10,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 28,
                  }}
                >
                  <Icon size={12} />
                  {label}
                </span>

                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 30,
                    fontWeight: 400,
                    color: "#2e2521",
                    margin: "0 0 10px",
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    color: "#7a6d63",
                    margin: "0 0 28px",
                    lineHeight: 1.7,
                  }}
                >
                  {copy}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: accentText,
                  }}
                >
                  Shop {filter} <ArrowRight size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BEST SELLERS — editorial staggered grid ────────────────── */}
      <section style={{ padding: "16px 0 96px", backgroundColor: "#faf6f2" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 48,
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#8a6e59",
                  margin: "0 0 8px",
                }}
              >
                Community Favourites
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(38px, 5vw, 52px)",
                  fontWeight: 400,
                  color: "#2e2521",
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => navigate("shop")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: "#735a36",
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: 0,
              }}
            >
              View all <ArrowRight size={15} />
            </button>
          </div>

          {/* Product grid with offset stagger */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "24px 20px",
            }}
          >
            {bestSellers.map((product, index) => (
              <div
                key={product.id}
                onClick={() => navigate("product", product.id)}
                style={{
                  cursor: "pointer",
                  marginTop: index % 2 === 1 ? 40 : 0,
                }}
                className="group"
              >
                <div
                  style={{
                    aspectRatio: "3/4",
                    borderRadius: 16,
                    overflow: "hidden",
                    backgroundColor: "#f0e8e2",
                    position: "relative",
                    marginBottom: 18,
                  }}
                >
                  <ProductImage
                    product={product}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover CTA */}
                  <div
                    className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(to top, rgba(28,22,18,0.55) 0%, transparent 55%)",
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("product", product.id);
                      }}
                      style={{
                        borderRadius: 100,
                        backgroundColor: "#fff8f5",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#3d3530",
                        border: "none",
                        cursor: "pointer",
                        padding: "10px 20px",
                      }}
                    >
                      Quick View
                    </button>
                  </div>

                  {/* Rank badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: "rgba(61,53,48,0.88)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#e9cfaa",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 10,
                    letterSpacing: "1.5px",
                    color: "#8a6e59",
                    textTransform: "uppercase",
                    margin: "0 0 5px",
                  }}
                >
                  {product.category}
                </p>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: "#2e2521",
                    margin: "0 0 4px",
                    lineHeight: "1.3",
                  }}
                >
                  {product.name}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 12,
                    color: "#9a8b80",
                    margin: "0 0 10px",
                  }}
                >
                  {product.scentNotes}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#3d3530",
                      margin: 0,
                    }}
                  >
                    {formatPrice(getOpeningSalePrice(product.price))}
                  </p>
                  <span style={{ display: "flex", gap: 2 }}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={10} fill="#d1b89a" color="#d1b89a" />
                    ))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRAND PHILOSOPHY — asymmetric split ─────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#2e2521",
        }}
      >
        {/* Texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imgBrandTexture})`,
            backgroundSize: "360px",
            opacity: 0.06,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "96px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          {/* Left — image */}
          <div
            style={{
              position: "relative",
              borderRadius: "120px 120px 24px 24px",
              overflow: "hidden",
              aspectRatio: "4/5",
              boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
            }}
          >
            <img
              src={imgAbstractScent}
              alt="Lumos Aura scent ritual"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Floating stat chip */}
            <div
              style={{
                position: "absolute",
                bottom: 28,
                right: -20,
                backgroundColor: "#fff8f5",
                borderRadius: 16,
                padding: "18px 24px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  fontWeight: 400,
                  color: "#3d3530",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                45h+
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 11,
                  color: "#8a7060",
                  margin: "4px 0 0",
                  letterSpacing: "0.06em",
                }}
              >
                Avg. burn time
              </p>
            </div>
          </div>

          {/* Right — text */}
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#d1b89a",
                margin: "0 0 20px",
              }}
            >
              Our philosophy
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4vw, 58px)",
                fontWeight: 400,
                color: "#fff8f5",
                margin: "0 0 28px",
                lineHeight: 1.15,
              }}
            >
              A candle should change the way a room feels.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                lineHeight: 1.9,
                color: "rgba(255,248,245,0.72)",
                margin: "0 0 40px",
                maxWidth: 500,
              }}
            >
              Lumos Aura blends soft fragrance architecture with quiet visual
              rituals. Every pour is designed to bring warmth, clarity, and a
              sense of arrival to everyday spaces.
            </p>
            <button
              onClick={() => navigate("about")}
              style={{
                borderRadius: 100,
                border: "1px solid rgba(209,184,154,0.5)",
                backgroundColor: "transparent",
                padding: "16px 36px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#d1b89a",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(209,184,154,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
              }}
            >
              Read Our Story <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ─── CRAFT PILLARS — horizontal scroll strip ─────────────────── */}
      <section style={{ backgroundColor: "#faf6f2", padding: "80px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8a6e59",
              margin: "0 0 40px",
              textAlign: "center",
            }}
          >
            Why Lumos Aura
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1px",
              backgroundColor: "#ede4dc",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            {craftSteps.map(({ icon: Icon, number, title, copy }) => (
              <div
                key={title}
                style={{
                  backgroundColor: "#faf6f2",
                  padding: "40px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 13,
                      color: "#c4a882",
                      fontStyle: "italic",
                    }}
                  >
                    {number}
                  </span>
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      backgroundColor: "#f0e8e1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={16} color="#80664f" />
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 20,
                    fontWeight: 400,
                    color: "#2e2521",
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h4>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: "#7a6d63",
                    margin: 0,
                  }}
                >
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GIFT COLLECTION — immersive dark panel ──────────────────── */}
      <section style={{ padding: "0 24px 96px", backgroundColor: "#faf6f2" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            borderRadius: 24,
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 520,
            boxShadow: "0 24px 60px rgba(40,30,24,0.14)",
          }}
        >
          {/* Text side */}
          <div
            style={{
              background: "linear-gradient(135deg, #3d3530 0%, #2a2018 100%)",
              padding: "64px 56px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* decorative circle */}
            <div
              style={{
                position: "absolute",
                top: -80,
                right: -80,
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: "1px solid rgba(209,184,154,0.12)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 200,
                height: 200,
                borderRadius: "50%",
                border: "1px solid rgba(209,184,154,0.08)",
                pointerEvents: "none",
              }}
            />

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#d1b89a",
                margin: "0 0 18px",
              }}
            >
              Gift-ready glow
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(34px, 4vw, 48px)",
                fontWeight: 400,
                color: "#fff8f5",
                margin: "0 0 20px",
                lineHeight: 1.2,
              }}
            >
              Thoughtful sets for warm homes and soft celebrations.
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: "rgba(255,248,245,0.65)",
                margin: "0 0 40px",
                maxWidth: 440,
              }}
            >
              Curated pairings and gentle scents for birthdays, housewarmings,
              and quiet acts of care — beautifully wrapped and ready to give.
            </p>
            <button
              onClick={() => navigate("gift")}
              style={{
                alignSelf: "flex-start",
                borderRadius: 100,
                backgroundColor: "#d1b89a",
                padding: "16px 36px",
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#1c1612",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.88")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Explore Gift Collection <Gift size={15} />
            </button>
          </div>

          {/* Image grid side */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              backgroundColor: "#4d4138",
            }}
          >
            {(giftProducts.length ? giftProducts : bestSellers.slice(0, 2)).map(
              (product) => (
                <button
                  key={product.id}
                  onClick={() => navigate("product", product.id)}
                  style={{
                    position: "relative",
                    minHeight: 300,
                    overflow: "hidden",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  className="group"
                >
                  <ProductImage
                    product={product}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span
                    style={{
                      position: "absolute",
                      inset: "0",
                      background:
                        "linear-gradient(to top, rgba(20,14,10,0.7) 0%, transparent 55%)",
                      display: "flex",
                      alignItems: "flex-end",
                      padding: "18px 16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 16,
                        color: "#fff8f5",
                        fontWeight: 400,
                      }}
                    >
                      {product.name}
                    </span>
                  </span>
                </button>
              )
            )}
          </div>
        </div>
      </section>

      <CustomerFeedback />
      <Footer />
    </div>
  );
}

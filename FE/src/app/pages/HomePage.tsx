import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Gift, Leaf, Sparkles, Timer } from "lucide-react";
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
import { formatPrice, type Product } from "../data";

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
  { title: "Clean Reset", copy: "Cotton, white tea, fresh linen.", icon: Leaf, filter: "Clean" },
  { title: "Evening Calm", copy: "Lavender, chamomile, soft musk.", icon: Timer, filter: "Relax" },
  { title: "Romantic Glow", copy: "Rose, peony, warm petals.", icon: Sparkles, filter: "Floral" },
];

const promises = [
  { icon: Leaf, title: "Natural soy wax", copy: "A cleaner burn with a soft, even melt pool." },
  { icon: Sparkles, title: "Hand-poured finish", copy: "Small-batch details made for thoughtful rooms." },
  { icon: Timer, title: "Slow fragrance release", copy: "Balanced scent that lingers without overpowering." },
  { icon: Gift, title: "Gift-ready packaging", copy: "Elegant wrapping for the moments that matter." },
];

const isGiftProduct = (product: Product) => product.category === "Gift Collection" || product.category === "Gift Sets";

export function HomePage() {
  const { navigate } = useNav();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeHero, setActiveHero] = useState(0);

  useEffect(() => {
    productsApi.list()
      .then((data: Product[]) => { if (data?.length) setProducts(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHero((current) => (current + 1) % heroSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const shopProducts = useMemo(() => products.filter((product) => !isGiftProduct(product)), [products]);
  const bestSellers = shopProducts.slice(0, 4);
  const giftProducts = products.filter(isGiftProduct).slice(0, 2);
  const currentHero = heroSlides[activeHero];
  const textSide = currentHero.align === "right" ? "ml-auto items-end text-right" : "mr-auto items-start text-left";
  const heroOverlay =
    currentHero.align === "right"
      ? "linear-gradient(to left, rgba(42,34,28,0.72), rgba(42,34,28,0.46) 34%, rgba(42,34,28,0.08) 68%)"
      : "linear-gradient(to right, rgba(42,34,28,0.72), rgba(42,34,28,0.46) 34%, rgba(42,34,28,0.08) 68%)";

  const goToHero = (direction: -1 | 1) => {
    setActiveHero((current) => (current + direction + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="flex w-full flex-col bg-[#fff8f5]">
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
              style={{ objectPosition: slide.align === "right" ? "left center" : "center center" }}
            />
          </div>
        ))}

        <div
          className="absolute inset-0"
          style={{ background: heroOverlay }}
        />

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
              style={{ width: index === activeHero ? 28 : 10, backgroundColor: index === activeHero ? "#fff8f5" : "rgba(255,248,245,0.42)" }}
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
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#fff8f5]" />
      </section>

      <section className="w-full px-5 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-4">
          {promises.map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex gap-4 rounded-md border border-[#eadfd8] bg-white/70 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f3e8df]">
                <Icon size={18} color="#80664f" />
              </span>
              <span>
                <strong className="block text-sm text-[#4e453e]">{title}</strong>
                <span className="mt-1 block text-xs leading-5 text-[#7a6d63]">{copy}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full px-5 pb-24 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#8a6e59]">Choose by feeling</p>
              <h2 className="font-['Playfair_Display'] text-[46px] leading-tight text-[#6b5948]">
                Scents for every room mood
              </h2>
            </div>
            <button onClick={() => navigate("shop")} className="flex items-center gap-2 text-sm font-bold text-[#735a36]">
              Browse collection <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {moodCards.map(({ title, copy, icon: Icon, filter }) => (
              <button
                key={title}
                onClick={() => navigate("shop")}
                className="group min-h-[220px] rounded-md border border-[#eadfd8] bg-[#f8eee7] p-7 text-left transition-transform hover:-translate-y-1"
              >
                <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <Icon size={20} color="#80664f" />
                </span>
                <span className="block font-['Playfair_Display'] text-3xl text-[#4e453e]">{title}</span>
                <span className="mt-3 block max-w-[280px] text-sm leading-6 text-[#6f6259]">{copy}</span>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#80664f]">
                  Shop {filter} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 py-24 md:px-10" style={{ backgroundColor: "#fff8f5" }}>
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: 3,
                  color: "#7f756d",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Community Favourites
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontSize: 48,
                  color: "#3d3530",
                  lineHeight: "56px",
                  letterSpacing: "-0.5px",
                }}
              >
                Best Sellers
              </h2>
            </div>
            <button
              onClick={() => navigate("shop")}
              className="hidden transition-opacity hover:opacity-70 md:block"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 13,
                color: "#735a36",
                letterSpacing: "0.5px",
              }}
            >
              Shop All →
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product, index) => {
              return (
                <div
                  key={product.id}
                  onClick={() => navigate("product", product.id)}
                  className="group cursor-pointer"
                >
                  <div
                    className="relative mb-4 overflow-hidden rounded-2xl"
                    style={{ aspectRatio: "3/4", backgroundColor: "#f5ece7" }}
                  >
                    <ProductImage
                      product={product}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div
                      className="absolute inset-0 flex items-end justify-center pb-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: "linear-gradient(to top, rgba(28,22,18,0.5) 0%, transparent 60%)" }}
                    >
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          navigate("product", product.id);
                        }}
                        className="rounded-full px-5 py-2"
                        style={{
                          backgroundColor: "#fff8f5",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 12,
                          color: "#3d3530",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Quick View
                      </button>
                    </div>

                    <span
                      className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#3d3530" }}
                    >
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 11,
                          color: "white",
                        }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 11,
                        letterSpacing: "1.5px",
                        color: "#7f756d",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      {product.category}
                    </p>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        fontSize: 22,
                        color: "#3d3530",
                        lineHeight: "28px",
                        marginBottom: 4,
                      }}
                    >
                      {product.name}
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12,
                        color: "#7f756d",
                        marginBottom: 8,
                      }}
                    >
                      {product.scentNotes}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#3d3530",
                      }}
                    >
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden px-5 py-28 md:px-10">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${imgBrandTexture})`, backgroundSize: "320px 320px" }} />
        <div className="relative z-10 mx-auto grid max-w-[1240px] gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative overflow-hidden rounded-t-full" style={{ aspectRatio: "4/5", boxShadow: "0 28px 50px rgba(109,91,74,0.12)" }}>
            <img src={imgAbstractScent} alt="Lumos Aura scent ritual" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#8a6e59]">Our philosophy</p>
            <h2 className="font-['Playfair_Display'] text-[52px] leading-tight text-[#6b5948] md:text-[68px]">
              A candle should change the way a room feels.
            </h2>
            <p className="mt-6 max-w-[620px] text-[17px] leading-8 text-[#4e453e]">
              Lumos Aura blends soft fragrance architecture with quiet visual rituals. Every pour is designed to bring warmth, clarity, and a sense of arrival to everyday spaces.
            </p>
            <button
              onClick={() => navigate("about")}
              className="mt-8 rounded-full border border-[#735a36] px-8 py-4 text-sm font-bold tracking-[0.06em] text-[#6b5948] transition-opacity hover:opacity-75"
            >
              Read Our Story
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-5 pb-24 md:px-10">
        <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-md border border-[#eadfd8] bg-[#3d3530] md:grid-cols-[1fr_0.95fr]">
          <div className="p-8 md:p-12">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#d1b89a]">Gift-ready glow</p>
            <h2 className="font-['Playfair_Display'] text-[44px] leading-tight text-[#fff8f5] md:text-[56px]">
              Thoughtful sets for warm homes and soft celebrations.
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-7 text-white/70">
              Curated pairings, ready-to-give packaging, and gentle scents made for birthdays, housewarmings, thank-yous, and quiet acts of care.
            </p>
            <button
              onClick={() => navigate("gift")}
              className="mt-8 rounded-full bg-[#d1b89a] px-8 py-4 text-sm font-bold tracking-[0.06em] text-[#1c1612] transition-opacity hover:opacity-90"
            >
              Explore Gift Collection
            </button>
          </div>
          <div className="grid grid-cols-2 gap-0 bg-[#4d4138]">
            {(giftProducts.length ? giftProducts : bestSellers.slice(0, 2)).map((product) => (
              <button key={product.id} onClick={() => navigate("product", product.id)} className="group relative min-h-[360px] overflow-hidden">
                <ProductImage product={product} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 text-left text-sm font-bold text-white">
                  {product.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <CustomerFeedback />
      <Footer />
    </div>
  );
}

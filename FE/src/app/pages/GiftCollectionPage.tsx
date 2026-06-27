import { useState, useEffect, useMemo } from "react";
import { useNav } from "../context";
import { useCart } from "../context";
import { Footer } from "../components/Footer";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import giftBanner from "../../assets/gift-banner.png";
import { formatPrice, type Product } from "../data";
import { Check } from "lucide-react";
import { productsApi } from "../api";

// ── Images ────────────────────────────────────────────────────────────────────
const IMG_PACKAGING =
  "https://images.unsplash.com/photo-1759563871375-d5b140f6646e?w=700&h=700&fit=crop&auto=format";
const IMG_CANDLES_SET =
  "https://images.unsplash.com/photo-1643122966676-29e8597257f7?w=700&h=700&fit=crop&auto=format";
const IMG_GIFT_BOX =
  "https://images.unsplash.com/photo-1759563874672-e7dfb1ca3f73?w=700&h=700&fit=crop&auto=format";

// ── Gift sets data ────────────────────────────────────────────────────────────
const giftSets = [
  {
    id: "discovery-set",
    name: "Discovery Set",
    tagline: "The perfect introduction",
    description:
      "5 of our signature scents in 2ml vials — ideal for discovering your favourite before committing to a full candle.",
    price: 35,
    originalPrice: null,
    badge: "Best Seller",
    badgeColor: "#6b5948",
    includes: ["5 × 2ml vials", "Lumos Aura scent guide", "Gift box with ribbon"],
    img: IMG_CANDLES_SET,
    productIds: ["sandalwood-moonstone", "amber-fig", "bergamot-silk", "solar-flare", "vetiver-smoke"],
  },
  {
    id: "duo-gift",
    name: "Signature Duo",
    tagline: "Two candles, one beautiful gift",
    description:
      "Choose any two full-size candles and we'll present them together in our signature gift box with complimentary gift wrapping.",
    price: 89,
    originalPrice: 96,
    badge: "Save $7",
    badgeColor: "#735a36",
    includes: ["2 × full-size candles (your choice)", "Signature gift box", "Handwritten note card", "Complimentary wrapping"],
    img: IMG_PACKAGING,
    productIds: ["midnight-constellation", "sandalwood-moonstone"],
  },
  {
    id: "trio-gift",
    name: "Luxury Trio",
    tagline: "Three candles for someone special",
    description:
      "Our most popular gift — three full-size candles in a curated wooden presentation box. Arrives beautifully wrapped.",
    price: 129,
    originalPrice: 148,
    badge: "Save $19",
    badgeColor: "#735a36",
    includes: ["3 × full-size candles (your choice)", "Wooden presentation box", "Handwritten note card", "Complimentary wrapping", "Free express shipping"],
    img: IMG_GIFT_BOX,
    productIds: ["midnight-constellation", "solar-flare", "amber-fig"],
  },
];

const occasions = ["Birthday", "Anniversary", "Housewarming", "Thank You", "Just Because", "Holiday"];
const isGiftProduct = (product: Product) => product.category === "Gift Collection" || product.category === "Gift Sets";

// ── Component ─────────────────────────────────────────────────────────────────
export function GiftCollectionPage() {
  const { navigate } = useNav();
  const { addToCart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    productsApi.list()
      .then((data: Product[]) => { if (data?.length) setAllProducts(data); })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const giftProducts = useMemo(() => allProducts.filter(isGiftProduct), [allProducts]);
  const displayGiftSets = useMemo(() => giftProducts.map((product, index) => {
    const includes = [product.size, product.burnTime, product.scentNotes]
      .filter((item): item is string => Boolean(item && item !== "-"))
      .slice(0, 3);

    return {
      id: product.id,
      product,
      name: product.name,
      tagline: product.tags[0] ?? "Curated gift collection",
      description: product.description,
      priceLabel: formatPrice(product.price),
      originalPriceLabel: null,
      badge: product.tags[1] ?? (index === 0 ? "Best Seller" : "Gift Set"),
      badgeColor: index === 0 ? "#6b5948" : "#735a36",
      includes: includes.length > 0 ? includes : ["Signature gift packaging", "Ready to give", "Lumos Aura selected set"],
      img: product.image || product.thumbnails?.[0] || IMG_CANDLES_SET,
    };
  }), [giftProducts]);

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div className="relative mt-20 overflow-hidden" style={{ height: "min(620px, 38vw)", minHeight: 360, backgroundColor: "#fff8f5" }}>
        <ImageWithFallback
          src={giftBanner}
          alt="Lumos Aura gift boxes with pink ribbon and roses"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "none" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-36"
          style={{
            background: "linear-gradient(to bottom, rgba(255,248,245,0) 0%, rgba(255,248,245,0.68) 58%, #fff8f5 100%)",
            backdropFilter: "blur(0.2px)",
          }}
        />
        <div className="hidden">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "3px",
              color: "rgba(255,248,245,0.6)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Gifts That Last
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 56,
              color: "#fff8f5",
              lineHeight: "64px",
              letterSpacing: "-0.5px",
              maxWidth: 560,
              marginBottom: 16,
            }}
          >
            Gift the Feeling, Not Just the Object.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 16,
              color: "rgba(255,248,245,0.7)",
              lineHeight: "26px",
              maxWidth: 400,
            }}
          >
            Curated gift sets for every occasion — beautifully wrapped and ready to give.
          </p>
        </div>
      </div>

      {/* ── Occasion chips ─────────────────────────────────────────────────────
      <div
        className="py-5 px-10 flex items-center gap-3 overflow-x-auto"
        style={{ borderBottom: "1px solid #efe6e2" }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: 12,
            color: "#7f756d",
            letterSpacing: "1px",
            textTransform: "uppercase",
            flexShrink: 0,
          }}
        >
          Shop by occasion:
        </span>
        {occasions.map((o) => (
          <button
            key={o}
            onClick={() => navigate("shop")}
            className="shrink-0 rounded-full px-4 py-1.5 hover:opacity-80 transition-opacity"
            style={{
              border: "1px solid #d1c4bb",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#4e453e",
              backgroundColor: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {o}
          </button>
        ))}
      </div> */}

      {/* ── Gift sets ────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[1180px] mx-auto w-full px-5 md:px-10 pt-10 pb-16 -mt-14"
        style={{
          background: "linear-gradient(to bottom, rgba(255,248,245,0.96), #fff8f5 120px)",
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          boxShadow: "0 -22px 44px rgba(109,91,74,0.08)",
        }}
      >
        <h2
          className="mb-10"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 40,
            color: "#3d3530",
            lineHeight: "48px",
          }}
        >
          Gift Sets
        </h2>

        <div className="flex flex-col gap-6">
          {loading && (
            <div className="rounded-2xl p-10 text-center text-[#7f756d]" style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}>
              Loading gift products...
            </div>
          )}
          {!loading && error && (
            <div className="rounded-2xl p-10 text-center text-[#7f756d]" style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}>
              Could not load gift products: {error}
            </div>
          )}
          {!loading && !error && displayGiftSets.length === 0 && (
            <div className="rounded-2xl p-10 text-center text-[#7f756d]" style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}>
              No gift products found.
            </div>
          )}
          {!loading && !error && displayGiftSets.map((set, i) => (
            <div
              key={set.id}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "white",
                border: "1px solid #efe6e2",
                boxShadow: "0 4px 20px rgba(109,91,74,0.06)",
              }}
            >
              <div
                className="grid"
                style={{ gridTemplateColumns: i % 2 === 0 ? "380px 1fr" : "1fr 380px" }}
              >
                {/* Image */}
                {i % 2 === 0 && (
                  <div className="relative overflow-hidden" style={{ height: 320 }}>
                    <ImageWithFallback
                      src={set.img}
                      alt={set.name}
                      className="w-full h-full object-cover"
                    />
                    {set.badge && (
                      <span
                        className="absolute top-4 left-4 rounded-full px-3 py-1"
                        style={{
                          backgroundColor: set.badgeColor,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: "0.5px",
                          color: "white",
                        }}
                      >
                        {set.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 11,
                        letterSpacing: "2px",
                        color: "#7f756d",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {set.tagline}
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 400,
                        fontSize: 32,
                        color: "#3d3530",
                        lineHeight: "40px",
                        marginBottom: 12,
                      }}
                    >
                      {set.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 15,
                        color: "#675a4e",
                        lineHeight: "26px",
                        marginBottom: 20,
                        maxWidth: 480,
                      }}
                    >
                      {set.description}
                    </p>

                    {/* Includes list */}
                    <div className="flex flex-col gap-2 mb-6">
                      {set.includes.map((item) => (
                        <div key={item} className="flex items-center gap-2.5">
                          <Check size={13} color="#6b5948" strokeWidth={2.5} />
                          <span
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 400,
                              fontSize: 13,
                              color: "#4e453e",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 400,
                          fontSize: 36,
                          color: "#3d3530",
                        }}
                      >
                        {set.priceLabel}
                      </span>
                      {set.originalPriceLabel && (
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: 15,
                            color: "#b0a099",
                            textDecoration: "line-through",
                          }}
                        >
                          {set.originalPriceLabel}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(set.product)}
                      className="rounded-full px-7 py-3 transition-all hover:opacity-90 flex items-center gap-2"
                      style={{
                        backgroundColor: addedId === set.id ? "#4e453e" : "#6b5948",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        letterSpacing: "0.5px",
                        color: "white",
                      }}
                    >
                      {addedId === set.id ? (
                        <>
                          <Check size={14} /> Added to Cart
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                    <button
                      onClick={() => navigate("product", set.product.id)}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        color: "#735a36",
                      }}
                      className="hover:opacity-70 transition-opacity"
                    >
                      View details
                    </button>
                  </div>
                </div>

                {/* Image (right side for even items) */}
                {i % 2 !== 0 && (
                  <div className="relative overflow-hidden" style={{ height: 320 }}>
                    <ImageWithFallback
                      src={set.img}
                      alt={set.name}
                      className="w-full h-full object-cover"
                    />
                    {set.badge && (
                      <span
                        className="absolute top-4 right-4 rounded-full px-3 py-1"
                        style={{
                          backgroundColor: set.badgeColor,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 11,
                          letterSpacing: "0.5px",
                          color: "white",
                        }}
                      >
                        {set.badge}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Build your own ───────────────────────────────────────────────────── */}
      <div
        className="mx-10 mb-16 rounded-2xl p-10 flex items-center justify-between"
        style={{ backgroundColor: "#3d3530" }}
      >
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "2px",
              color: "#d1b89a",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Build Your Own
          </p>
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 400,
              fontSize: 36,
              color: "#fff8f5",
              lineHeight: "44px",
              marginBottom: 8,
            }}
          >
            Can't Decide? Pick Your Own.
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              color: "rgba(255,248,245,0.6)",
              lineHeight: "24px",
            }}
          >
            Browse our full collection and add any candles to a custom gift order.
          </p>
        </div>
        <button
          onClick={() => navigate("shop")}
          className="shrink-0 rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: "#d1b89a",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.5px",
            color: "#1c1612",
          }}
        >
          Browse All Candles →
        </button>
      </div>

      {/* ── Why gift Lumos Aura ──────────────────────────────────────────────── */}
      <div className="max-w-[1100px] mx-auto w-full px-10 pb-20">
        <h2
          className="mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 36,
            color: "#3d3530",
            lineHeight: "44px",
          }}
        >
          Why Gift Lumos Aura?
        </h2>
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              title: "Free Gift Wrapping",
              body: "Every order includes our signature ribbon wrapping and a personalised note card at no extra cost.",
              icon: "🎀",
            },
            {
              title: "Handwritten Note",
              body: "Add a personal message at checkout. We write it by hand and tuck it inside the box.",
              icon: "✉️",
            },
            {
              title: "Ships in 24 Hours",
              body: "Orders placed before noon are dispatched the same day. Arrives safely in padded packaging.",
              icon: "🚚",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#f5ece7", border: "1px solid #efe6e2" }}
            >
              <span style={{ fontSize: 28, lineHeight: 1, display: "block", marginBottom: 12 }}>{item.icon}</span>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#3d3530",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#675a4e",
                  lineHeight: "22px",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

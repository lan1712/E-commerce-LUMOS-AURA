import { useState, useEffect } from "react";
import { useCart, useNav } from "../context";
import { Footer } from "../components/Footer";
import { Plus } from "lucide-react";
import { productsApi } from "../api";
import type { Product } from "../data";

const categories = ["Woody", "Floral", "Fresh", "Fruity", "Earthy"];
const burnTimeOptions = [
  { label: "40+ Hours", min: 40 },
  { label: "60+ Hours", min: 60 },
  { label: "80+ Hours", min: 80 },
];

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <div
        className="w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors"
        style={{
          borderColor: checked ? "#6b5948" : "#d1c4bb",
          backgroundColor: checked ? "#6b5948" : "white",
        }}
        onClick={onChange}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: checked ? 500 : 400,
          fontSize: 14,
          color: checked ? "#6b5948" : "#4e453e",
        }}
      >
        {label}
      </span>
    </label>
  );
}

function RadioItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer">
      <div
        className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors"
        style={{ borderColor: checked ? "#6b5948" : "#d1c4bb" }}
        onClick={onChange}
      >
        {checked && (
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#6b5948" }}
          />
        )}
      </div>
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: checked ? 500 : 400,
          fontSize: 14,
          color: checked ? "#6b5948" : "#4e453e",
        }}
      >
        {label}
      </span>
    </label>
  );
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h3
      className="pb-2 mb-3"
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 12,
        letterSpacing: "0.96px",
        color: "#6b5948",
        borderBottom: "1px solid #d1c4bb",
        textTransform: "uppercase",
      }}
    >
      {children}
    </h3>
  );
}

function ProductGridCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { navigate } = useNav();

  return (
    <div
      className="flex flex-col gap-3 group cursor-pointer"
      onClick={() => navigate("product", product.id)}
    >
      {/* Image */}
      <div
        className="relative rounded-2xl overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: "#f5ece7", height: 260, boxShadow: "0 8px 24px rgba(109,91,74,0.06)" }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-[85%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick add */}
        <button
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
          style={{
            backgroundColor: "#6b5948",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.7px",
            color: "white",
          }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <Plus size={11} />
          Add to Cart
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-0.5">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            color: "#3d3530",
            lineHeight: "24px",
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 13,
            color: "#7f756d",
            lineHeight: "20px",
          }}
        >
          {product.scentNotes}
        </p>
        <div className="flex items-center gap-3 mt-1">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#675a4e",
            }}
          >
            ${product.price}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 12,
              color: "#7f756d",
            }}
          >
            · {product.burnTime}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [burnTimeFilter, setBurnTimeFilter] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState(150);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsApi.list()
      .then((data: Product[]) => setAllProducts(data))
      .catch(() => setAllProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered = allProducts.filter((p) => {
    if (selectedCategories.length > 0 && !selectedCategories.some((c) => p.tags.includes(c))) return false;
    if (burnTimeFilter && p.burnHours < burnTimeFilter) return false;
    if (p.price > maxPrice && maxPrice < 150) return false;
    return true;
  });

  const clearAll = () => {
    setSelectedCategories([]);
    setBurnTimeFilter(null);
    setMaxPrice(150);
  };

  const hasFilters = selectedCategories.length > 0 || burnTimeFilter !== null;

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      {/* Header */}
      <div className="w-full pt-36 pb-14 flex flex-col items-center px-8">
        <h1
          className="text-center mb-3"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 64,
            color: "#6b5948",
            letterSpacing: "-1.28px",
            lineHeight: "72px",
          }}
        >
          The Collection
        </h1>
        <p
          className="text-center"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: "#4e453e",
            lineHeight: "28px",
            maxWidth: 560,
          }}
        >
          Explore our curated selection of fine olfactory art, designed to elevate your space and spirit.
        </p>
      </div>

      {/* Active filters bar */}
      {hasFilters && (
        <div
          className="max-w-[1280px] mx-auto w-full px-10 pb-4 flex items-center gap-3"
        >
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{
                backgroundColor: "#f5ece7",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.96px",
                color: "#1e1b18",
              }}
            >
              {cat} ×
            </button>
          ))}
          <button
            onClick={clearAll}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.96px",
              color: "#6b5948",
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filters + grid */}
      <div className="max-w-[1280px] mx-auto w-full px-10 pb-24 flex gap-10">
        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          <div className="sticky top-24 flex flex-col gap-8">
            {/* Category */}
            <div>
              <SectionHeading>Scent Category</SectionHeading>
              <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                  <CheckboxItem
                    key={cat}
                    label={cat}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                ))}
              </div>
            </div>

            {/* Burn time */}
            <div>
              <SectionHeading>Burn Time</SectionHeading>
              <div className="flex flex-col gap-3">
                <RadioItem
                  label="Any"
                  checked={burnTimeFilter === null}
                  onChange={() => setBurnTimeFilter(null)}
                />
                {burnTimeOptions.map((opt) => (
                  <RadioItem
                    key={opt.label}
                    label={opt.label}
                    checked={burnTimeFilter === opt.min}
                    onChange={() => setBurnTimeFilter(opt.min)}
                  />
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <SectionHeading>Price</SectionHeading>
              <input
                type="range"
                min={20}
                max={150}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#6b5948]"
              />
              <div className="flex justify-between mt-1">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>$0</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>
                  {maxPrice >= 150 ? "$150+" : `$${maxPrice}`}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1 min-w-0">
          <p
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              color: "#7f756d",
            }}
          >
            {loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
          </p>
          {loading ? (
            <div className="grid grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="rounded-2xl" style={{ height: 260, backgroundColor: "#f0e8e2", animation: "pulse 1.5s ease-in-out infinite" }} />
                  <div style={{ height: 16, width: "70%", backgroundColor: "#f0e8e2", borderRadius: 4 }} />
                  <div style={{ height: 13, width: "50%", backgroundColor: "#f0e8e2", borderRadius: 4 }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 28, color: "#6b5948" }}>No products found</p>
              <button onClick={clearAll} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#735a36" }}>Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {filtered.map((product) => (
                <ProductGridCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

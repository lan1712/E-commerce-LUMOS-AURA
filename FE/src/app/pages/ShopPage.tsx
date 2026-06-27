import { useEffect, useMemo, useState } from "react";
import type React from "react";
import { ChevronDown, Gift, Heart, LayoutGrid, List, Plus, SlidersHorizontal } from "lucide-react";
import shopBanner from "../../assets/shop-banner.png";
import { productsApi } from "../api";
import { Footer } from "../components/Footer";
import { ProductImage } from "../components/ProductImage";
import { formatPrice, type Product } from "../data";
import { useCart, useNav } from "../context";

const categoryLabels: Record<string, string> = {
  "Core Collection": "Core Collection",
  Accessories: "Accessories",
};

const moodOptions = ["Relax & Sleep", "Focus & Work", "Warm & Cozy", "Clean & Fresh", "Floral & Romantic"];
const sizeOptions = [
  { id: "mini", label: "Mini (<= 100g)" },
  { id: "medium", label: "Medium (101g - 200g)" },
  { id: "large", label: "Large (>= 201g)" },
];

const isGiftProduct = (product: Product) => product.category === "Gift Collection" || product.category === "Gift Sets";

function parseSizeGrams(product: Product) {
  const match = product.size?.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

function matchesSize(product: Product, sizeId: string) {
  const grams = parseSizeGrams(product);
  if (!grams) return false;
  if (sizeId === "mini") return grams <= 100;
  if (sizeId === "medium") return grams >= 101 && grams <= 200;
  return grams >= 201;
}

function CheckboxItem({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <span className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          aria-label={label}
          className="h-4 w-4 shrink-0 rounded-[3px] border transition-colors"
          style={{ borderColor: checked ? "#765f4d" : "#d7cbc2", backgroundColor: checked ? "#765f4d" : "white" }}
          onClick={onChange}
        />
        <span className="truncate" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: checked ? "#5f4b3b" : "#5d554e" }}>
          {label}
        </span>
      </span>
      {typeof count === "number" && (
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#897d73" }}>({count})</span>
      )}
    </label>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-[#eadfd8] py-5 first:pt-0">
      <div className="mb-4 flex items-center justify-between">
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.9px", color: "#675849" }}>
          {title}
        </h3>
        <ChevronDown size={14} color="#765f4d" />
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function ProductGridCard({ product, badge }: { product: Product; badge?: string }) {
  const { addToCart } = useCart();
  const { navigate } = useNav();

  return (
    <article
      className="group overflow-hidden rounded-md border border-[#eadfd8] bg-white transition-transform duration-300 hover:-translate-y-1"
      style={{ boxShadow: "0 10px 28px rgba(105, 86, 68, 0.06)" }}
      onClick={() => navigate("product", product.id)}
    >
      <div className="relative aspect-[1.25/1] overflow-hidden bg-[#f2e9e2]">
        <ProductImage product={product} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {badge && (
          <span
            className="absolute left-4 top-4 rounded-full px-3 py-1"
            style={{ backgroundColor: "#fffaf7", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 10, color: "#765f4d" }}
          >
            {badge}
          </span>
        )}
        <button
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/35"
          title="Add to wishlist"
          onClick={(event) => event.stopPropagation()}
        >
          <Heart size={18} color="white" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#302a25" }}>
          {product.name}
        </h3>
        <p className="mt-1 truncate" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#756a61" }}>
          {product.scentNotes === "-" ? product.description : product.scentNotes}
        </p>
        <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#3d332c" }}>
          {formatPrice(product.price)}
        </p>
        <button
          className="mt-3 inline-flex h-9 items-center gap-1.5 rounded px-4 transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#6f5847", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: "white" }}
          onClick={(event) => {
            event.stopPropagation();
            addToCart(product);
          }}
        >
          <Plus size={12} />
          Add to cart
        </button>
      </div>
    </article>
  );
}

export function ShopPage() {
  const { navigate } = useNav();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(600000);
  const [sortBy, setSortBy] = useState("featured");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    productsApi.list()
      .then((data: Product[]) => setProducts(data))
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, []);

  const shopProducts = useMemo(() => products.filter((product) => !isGiftProduct(product)), [products]);

  const categories = useMemo(() => Array.from(new Set(shopProducts.map((product) => product.category))), [shopProducts]);
  const categoryCounts = useMemo(() => {
    return shopProducts.reduce<Record<string, number>>((counts, product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
      return counts;
    }, {});
  }, [shopProducts]);

  const moodCounts = useMemo(() => {
    return moodOptions.reduce<Record<string, number>>((counts, mood) => {
      const needle = mood.toLowerCase();
      counts[mood] = shopProducts.filter((product) =>
        [...product.tags, product.description, product.scentNotes].join(" ").toLowerCase().includes(needle),
      ).length;
      return counts;
    }, {});
  }, [shopProducts]);

  const sizeCounts = useMemo(() => {
    return sizeOptions.reduce<Record<string, number>>((counts, option) => {
      counts[option.id] = shopProducts.filter((product) => matchesSize(product, option.id)).length;
      return counts;
    }, {});
  }, [shopProducts]);

  const filtered = useMemo(() => {
    const list = shopProducts.filter((product) => {
      if (selectedCategories.length && !selectedCategories.includes(product.category)) return false;
      if (selectedMoods.length) {
        const text = [...product.tags, product.description, product.scentNotes].join(" ").toLowerCase();
        if (!selectedMoods.some((mood) => text.includes(mood.toLowerCase()))) return false;
      }
      if (selectedSizes.length && !selectedSizes.some((size) => matchesSize(product, size))) return false;
      return product.price <= maxPrice;
    });

    return [...list].sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [maxPrice, selectedCategories, selectedMoods, selectedSizes, shopProducts, sortBy]);

  const toggleValue = (value: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedMoods([]);
    setSelectedSizes([]);
    setMaxPrice(600000);
    setSortBy("featured");
  };

  return (
    <div className="flex w-full flex-col" style={{ backgroundColor: "#fff8f5" }}>
              <section className="relative mt-20 overflow-hidden border-[#eadfd8]">
          <img
            src={shopBanner}
            alt="Lumos Aura collection banner"
            className="block w-full object-cover"
            style={{ minHeight: 300, maxHeight: 430 }}
          />
          {/* overlay blur góc dưới - gradient mềm và blur nhẹ */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/3"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,248,245,0) 0%, rgba(255,248,245,0.5) 60%, #fff8f5 100%)",
              backdropFilter: "blur(0.2px)",
            }}
          ></div>
        </section>


      <main className="relative z-10 mx-auto -mt-10 w-full max-w-[1390px] px-5 pb-20 md:px-8">
        <div className="overflow-hidden rounded-md border border-[#eadfd8] bg-white" style={{ boxShadow: "0 18px 45px rgba(105, 86, 68, 0.08)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
            <aside className="border-b border-[#eadfd8] bg-white px-7 py-7 lg:border-b-0 lg:border-r">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} color="#6b5948" />
                  <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.7px", color: "#6b5948" }}>
                    FILTERS
                  </h2>
                </div>
                <button onClick={clearAll} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#7f756d" }}>
                  Clear all
                </button>
              </div>

              <FilterSection title="PRODUCT TYPE">
                {categories.map((category) => (
                  <CheckboxItem
                    key={category}
                    label={categoryLabels[category] ?? category}
                    count={categoryCounts[category] ?? 0}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleValue(category, setSelectedCategories)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="PRICE">
                <input
                  type="range"
                  min={100000}
                  max={600000}
                  step={10000}
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value))}
                  className="w-full accent-[#6b5948]"
                />
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#897d73" }}>100.000d</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#897d73" }}>
                    {maxPrice >= 600000 ? "600.000d+" : formatPrice(maxPrice)}
                  </span>
                </div>
              </FilterSection>

              <FilterSection title="MOOD">
                {moodOptions.map((mood) => (
                  <CheckboxItem
                    key={mood}
                    label={mood}
                    count={moodCounts[mood] ?? 0}
                    checked={selectedMoods.includes(mood)}
                    onChange={() => toggleValue(mood, setSelectedMoods)}
                  />
                ))}
              </FilterSection>

              <FilterSection title="SIZE">
                {sizeOptions.map((option) => (
                  <CheckboxItem
                    key={option.id}
                    label={option.label}
                    count={sizeCounts[option.id] ?? 0}
                    checked={selectedSizes.includes(option.id)}
                    onChange={() => toggleValue(option.id, setSelectedSizes)}
                  />
                ))}
              </FilterSection>

              <button
                onClick={() => navigate("gift")}
                className="mt-6 flex w-full items-center gap-4 rounded-md bg-[#f7eee8] p-4 text-left transition-opacity hover:opacity-90"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded bg-[#fff8f5]">
                  <Gift size={24} color="#80664f" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#4a3f38" }}>
                    Looking for a gift?
                  </span>
                  <span className="block truncate" style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#7f756d" }}>
                    Explore curated gift sets
                  </span>
                </span>
                <span style={{ color: "#80664f" }}>→</span>
              </button>
            </aside>

            <section className="min-w-0 px-6 py-7 md:px-8">
              <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#5c5149" }}>
                  {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6b625b" }}>
                    Sort by
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="h-10 rounded border border-[#ded2c9] bg-white px-3 outline-none"
                      style={{ minWidth: 150, fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#5d5148" }}
                    >
                      <option value="featured">Featured</option>
                      <option value="name">Name</option>
                      <option value="priceLow">Price: low to high</option>
                      <option value="priceHigh">Price: high to low</option>
                    </select>
                  </label>
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#6b625b" }}>View</span>
                    <button className="flex h-9 w-9 items-center justify-center rounded bg-[#eadfd8]" title="Grid view">
                      <LayoutGrid size={17} color="#80664f" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded bg-[#f4eee9]" title="List view">
                      <List size={17} color="#80664f" />
                    </button>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="py-20 text-center text-[#6b5948]">Could not load products: {error}</div>
              ) : loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="rounded-md border border-[#eadfd8] bg-white">
                      <div className="aspect-[1.25/1] animate-pulse bg-[#f0e8e2]" />
                      <div className="space-y-3 p-4">
                        <div className="h-4 w-2/3 rounded bg-[#f0e8e2]" />
                        <div className="h-3 w-1/2 rounded bg-[#f0e8e2]" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20">
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#6b5948" }}>No products found</p>
                  <button onClick={clearAll} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#735a36" }}>
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                  {filtered.map((product, index) => (
                    <ProductGridCard
                      key={product.id}
                      product={product}
                      badge={product.tags.includes("Best Seller") || index === 0 ? "BEST SELLER" : index === 3 ? "NEW" : undefined}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

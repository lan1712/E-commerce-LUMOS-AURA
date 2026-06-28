import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useNav, useCart } from "../context";
import { formatPrice, getOpeningSalePrice, type Product } from "../data";
import { Footer } from "../components/Footer";
import { productsApi } from "../api";

export function SearchPage() {
  const { navigate } = useNav();
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    productsApi.list()
      .then((data: Product[]) => { if (data?.length) setAllProducts(data); })
      .catch(() => { });
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed.length === 0 ? [] : allProducts.filter((p) =>
    p.name.toLowerCase().includes(trimmed) ||
    p.scentNotes.toLowerCase().includes(trimmed) ||
    p.category.toLowerCase().includes(trimmed) ||
    p.tags.some((t) => t.toLowerCase().includes(trimmed))
  );

  const handleAdd = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    const product = allProducts.find((p) => p.id === productId);
    if (product) addToCart(product, 1);
    setAddedId(productId);
    setTimeout(() => setAddedId(null), 1800);
  };

  const popular = ["Woody", "Fresh", "Floral", "Amber", "Sandalwood", "Gift Set"];

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "#fff8f5" }}>
      {/* Search bar header */}
      <div
        className="sticky top-0 z-10 pt-24 pb-5 px-10"
        style={{ backgroundColor: "#fff8f5", borderBottom: "1px solid #efe6e2" }}
      >
        <div className="max-w-[760px] mx-auto">
          <div
            className="flex items-center gap-4 rounded-2xl px-5 py-4"
            style={{ backgroundColor: "white", border: "1px solid #d1c4bb", boxShadow: "0 4px 20px rgba(109,91,74,0.07)" }}
          >
            <Search size={18} color="#7f756d" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search candles, scents, collections…"
              className="flex-1 outline-none bg-transparent"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#3d3530",
              }}
            />
            {query && (
              <button onClick={() => setQuery("")} className="hover:opacity-70 transition-opacity">
                <X size={16} color="#7f756d" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto w-full px-10 py-10 flex-1">
        {/* No query — show popular */}
        {trimmed.length === 0 && (
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "2px",
                color: "#7f756d",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Popular searches
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {popular.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
                  style={{
                    border: "1px solid #d1c4bb",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "#4e453e",
                    backgroundColor: "transparent",
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "2px",
                color: "#7f756d",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              All products
            </p>
            <div className="grid grid-cols-4 gap-5">
              {allProducts.map((p) => (
                <ProductResult
                  key={p.id}
                  product={p}
                  onNavigate={() => navigate("product", p.id)}
                  onAdd={(e) => handleAdd(e, p.id)}
                  added={addedId === p.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Has query — show results */}
        {trimmed.length > 0 && (
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#7f756d",
                marginBottom: 20,
              }}
            >
              {results.length === 0
                ? `No results for "${query}"`
                : `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
            </p>

            {results.length === 0 ? (
              <div className="flex flex-col items-center py-20 gap-5 text-center">
                <Search size={40} color="#d1c4bb" />
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                    fontSize: 28,
                    color: "#3d3530",
                  }}
                >
                  Nothing found
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: 15,
                    color: "#7f756d",
                  }}
                >
                  Try a different keyword or browse the full collection.
                </p>
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
                  Browse All Candles
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-5">
                {results.map((p) => (
                  <ProductResult
                    key={p.id}
                    product={p}
                    onNavigate={() => navigate("product", p.id)}
                    onAdd={(e) => handleAdd(e, p.id)}
                    added={addedId === p.id}
                    highlight={trimmed}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

function ProductResult({
  product,
  onNavigate,
  onAdd,
  added,
  highlight,
}: {
  product: ReturnType<typeof import("../data").products[0]["valueOf"]> & { name: string; scentNotes: string; price: number; image: string; burnTime: string };
  onNavigate: () => void;
  onAdd: (e: React.MouseEvent) => void;
  added: boolean;
  highlight?: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer group"
      style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}
      onClick={onNavigate}
    >
      <div className="relative overflow-hidden" style={{ height: 200, backgroundColor: "#f5ece7" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#3d3530",
            lineHeight: "22px",
            marginBottom: 4,
          }}
        >
          {product.name}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 12,
            color: "#7f756d",
            marginBottom: 10,
          }}
        >
          {product.scentNotes}
        </p>
        <div className="flex items-center justify-between">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: "#3d3530",
            }}
          >
            {formatPrice(getOpeningSalePrice(product.price))}
          </span>
          <button
            onClick={onAdd}
            className="rounded-full px-3 py-1.5 hover:opacity-90 transition-all"
            style={{
              backgroundColor: added ? "#4e453e" : "#6b5948",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.5px",
              color: "white",
            }}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Minus, Plus, X, ShoppingBag, Check } from "lucide-react";
import { useCart, useNav } from "../context";
import { formatPrice, getOpeningSalePrice, OPENING_DISCOUNT_LABEL, type Product } from "../data";
import { Footer } from "../components/Footer";
import { promoApi, productsApi } from "../api";

export function CartPage() {
  const { items, removeFromCart, updateQuantity, total, addToCart } = useCart();
  const { navigate } = useNav();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<null | { code: string; type: "percent" | "fixed"; value: number; label: string }>(null);
  const [promoError, setPromoError] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);

  const handleApplyPromo = async () => {
    const code = promoInput.trim();
    if (!code) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const res = await promoApi.validate(code);
      if (res.valid) {
        setAppliedPromo({
          code: code.toUpperCase(),
          type: res.type === "PERCENTAGE" ? "percent" : "fixed",
          value: Number(res.value),
          label: res.message ?? "",
        });
      } else {
        setPromoError(res.message ?? "Invalid promo code.");
        setAppliedPromo(null);
      }
    } catch {
      setPromoError("Could not validate code. Try: LUMOS10, LUMOS20, WELCOME15, SAVE10.");
      setAppliedPromo(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const discount = appliedPromo
    ? appliedPromo.type === "percent"
      ? (total * appliedPromo.value) / 100
      : Math.min(appliedPromo.value, total)
    : 0;

  const shippingCost = total >= 500000 || (appliedPromo?.code === "FREESHIP") ? 0 : 30000;
  const finalTotal = total - discount + shippingCost;
  const saleActive = items.some(({ product }) => getOpeningSalePrice(product.price) < product.price);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  useEffect(() => {
    productsApi.list()
      .then((data: Product[]) => { if (data?.length) setAllProducts(data); })
      .catch(() => { });
  }, []);

  // "Complete your ritual" accessories — products not in cart
  const cartIds = new Set(items.map((i) => i.product.id));
  const ritualSuggestions = allProducts.filter((p) => !cartIds.has(p.id)).slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen" style={{ backgroundColor: "#fff8f5" }}>
        <div className="flex-1 flex flex-col items-center justify-center pt-40 pb-20 gap-6">
          <ShoppingBag size={56} color="#d1c4bb" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 40, color: "#6b5948", lineHeight: "48px" }}>
            Your cart is empty
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#675a4e" }}>
            Discover something beautiful in our collection.
          </p>
          <button
            onClick={() => navigate("shop")}
            className="mt-4 rounded-full px-8 py-4 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
          >
            Shop The Collection
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="max-w-[1280px] mx-auto w-full px-10 pt-32 pb-10">
        <h1
          className="mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 56, color: "#3d3530", letterSpacing: "-0.5px", lineHeight: "64px" }}
        >
          Your Cart
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", marginBottom: 40 }}>
          {items.reduce((s, i) => s + i.quantity, 0)} items selected for your ritual.
        </p>

        <div className="flex gap-10 items-start">
          {/* Cart table */}
          <div className="flex-1 min-w-0">
            {/* Table header */}
            <div
              className="grid grid-cols-[1fr_80px_140px_80px] gap-4 pb-3 mb-2"
              style={{ borderBottom: "1px solid #d1c4bb" }}
            >
              {["PRODUCT", "PRICE", "QUANTITY", "TOTAL"].map((h) => (
                <span
                  key={h}
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "1.2px", color: "#7f756d", textTransform: "uppercase" }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Items */}
            {items.map(({ product, quantity }) => {
              const salePrice = getOpeningSalePrice(product.price);
              return (
              <div
                key={product.id}
                className="grid grid-cols-[1fr_80px_140px_80px] gap-4 py-6 items-center"
                style={{ borderBottom: "1px solid rgba(209,196,187,0.4)" }}
              >
                {/* Product */}
                <div className="flex gap-4 items-start">
                  <div
                    className="rounded-xl overflow-hidden shrink-0 flex items-center justify-center cursor-pointer"
                    style={{ width: 80, height: 80, backgroundColor: "#fff8f5", boxShadow: "0 4px 12px rgba(109,91,74,0.08)" }}
                    onClick={() => navigate("product", product.id)}
                  >
                    <img src={product.image} alt={product.name} className="h-full w-auto object-contain" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 18, color: "#3d3530", lineHeight: "24px" }}>
                      {product.name}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>
                      {product.size}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "1px", color: "#735a36", textTransform: "uppercase", marginTop: 2 }}>
                      {product.category} Scent
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="flex items-center gap-1 mt-1 hover:opacity-60 transition-opacity self-start"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}
                    >
                      <X size={12} /> Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                {salePrice < product.price ? (
                  <div className="flex flex-col items-start gap-1">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9c8d82", textDecoration: "line-through" }}>
                      {formatPrice(product.price)}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, color: "#5f4635" }}>
                      {formatPrice(salePrice)}
                    </span>
                  </div>
                ) : (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, color: "#675a4e" }}>
                    {formatPrice(product.price)}
                  </p>
                )}

                {/* Quantity */}
                <div
                  className="flex items-center gap-3 rounded-full px-4 py-2 w-fit"
                  style={{ border: "1px solid #d1c4bb" }}
                >
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="hover:opacity-60 transition-opacity">
                    <Minus size={12} color="#6b5948" />
                  </button>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#6b5948", minWidth: 16, textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="hover:opacity-60 transition-opacity">
                    <Plus size={12} color="#6b5948" />
                  </button>
                </div>

                {/* Total */}
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#3d3530" }}>
                  {formatPrice(salePrice * quantity)}
                </p>
              </div>
              );
            })}
          </div>

          {/* Summary */}
          <div
            className="w-80 shrink-0 rounded-2xl p-8 sticky top-24"
            style={{ backgroundColor: "#f5ece7" }}
          >
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 28, color: "#3d3530", marginBottom: 20 }}>
              Summary
            </h2>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Subtotal</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#3d3530" }}>{formatPrice(total)}</span>
              </div>
              {saleActive && (
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#6b5948" }}>{OPENING_DISCOUNT_LABEL}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#6b5948" }}>Đã áp dụng</span>
              </div>
              )}
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Shipping</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: shippingCost === 0 ? "#735a36" : "#675a4e" }}>
                  {shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}
                </span>
              </div>
              {appliedPromo && discount > 0 && (
                <div className="flex justify-between">
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#6b5948" }}>
                    Discount ({appliedPromo.code})
                  </span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#6b5948" }}>
                    -{formatPrice(discount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Estimated Tax</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", fontStyle: "italic" }}>Calculated at checkout</span>
              </div>
            </div>

            <div className="flex justify-between py-4 mb-6" style={{ borderTop: "1px solid #d1c4bb", borderBottom: "1px solid #d1c4bb" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#3d3530" }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 24, color: "#3d3530" }}>{formatPrice(finalTotal)}</span>
            </div>

            {/* Promo code */}
            <div className="mb-6">
              {appliedPromo ? (
                <div
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{ backgroundColor: "#f5ece7", border: "1px solid #d1c4bb" }}
                >
                  <div className="flex items-center gap-2">
                    <Check size={13} color="#6b5948" strokeWidth={2.5} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "#3d3530" }}>
                      {appliedPromo.code}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#6b5948" }}>
                      — {appliedPromo.label}
                    </span>
                  </div>
                  <button
                    onClick={() => { setAppliedPromo(null); setPromoInput(""); }}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <X size={13} color="#7f756d" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(""); }}
                      onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                      placeholder="Promo code"
                      className="flex-1 outline-none px-3 py-2 rounded-lg"
                      style={{
                        border: `1px solid ${promoError ? "#c0392b" : "#d1c4bb"}`,
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: 13,
                        color: "#4e453e",
                        backgroundColor: "white",
                      }}
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={promoLoading}
                      className="px-3 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60"
                      style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: "white", letterSpacing: "0.5px" }}
                    >
                      {promoLoading ? "…" : "Apply"}
                    </button>
                  </div>
                  {promoError && (
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#c0392b" }}>
                      {promoError}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => navigate("checkout")}
              className="w-full rounded-full py-4 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
            >
              Proceed to Checkout →
            </button>

            <p
              className="flex items-center justify-center gap-1 mt-3"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}
            >
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                <rect x="1" y="5" width="10" height="8" rx="2" stroke="#7f756d" strokeWidth="1.2" />
                <path d="M4 5V3.5C4 2.12 4.9 1 6 1C7.1 1 8 2.12 8 3.5V5" stroke="#7f756d" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Secure checkout
            </p>
          </div>
        </div>

        {/* Complete your ritual */}
        {ritualSuggestions.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 36, color: "#3d3530", marginBottom: 24 }}>
              Complete your ritual
            </h2>
            <div className="grid grid-cols-4 gap-6">
              {ritualSuggestions.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 items-center p-4 rounded-xl cursor-pointer group"
                  style={{ backgroundColor: "#f5ece7" }}
                  onClick={() => navigate("product", product.id)}
                >
                  <div
                    className="rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                    style={{ width: 56, height: 56, backgroundColor: "#fff8f5" }}
                  >
                    <img src={product.image} alt={product.name} className="h-full w-auto object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#3d3530", lineHeight: "18px" }}>{product.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>{formatPrice(getOpeningSalePrice(product.price))}</p>
                    <button
                      className="mt-1 text-xs hover:opacity-70 transition-opacity"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, color: "#735a36", letterSpacing: "0.5px" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

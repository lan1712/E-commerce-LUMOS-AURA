import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useCart, useNav, useAuth } from "../context";
import { ordersApi } from "../api";
import { formatPrice } from "../data";

type Step = "contact" | "shipping" | "payment" | "confirmed";

function InputField({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="outline-none pb-2 transition-colors bg-transparent w-full"
        style={{
          borderBottom: "1px solid #d1c4bb",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: "#3d3530",
        }}
        onFocus={(e) => (e.target.style.borderBottomColor = "#6b5948")}
        onBlur={(e) => (e.target.style.borderBottomColor = "#d1c4bb")}
      />
    </div>
  );
}

type AccordionSectionProps = {
  number: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  summary?: string;
  onEdit?: () => void;
  children: React.ReactNode;
};

function AccordionSection({
  number,
  title,
  isActive,
  isCompleted,
  summary,
  onEdit,
  children,
}: AccordionSectionProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden mb-4"
      style={{
        border: `1px solid ${isActive ? "#d1c4bb" : "rgba(209,196,187,0.3)"}`,
        backgroundColor: isActive ? "white" : isCompleted ? "#fff8f5" : "rgba(255,248,245,0.5)",
      }}
    >
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: isCompleted ? "#6b5948" : isActive ? "#6b5948" : "#efe6e2" }}
          >
            {isCompleted ? (
              <Check size={14} color="white" />
            ) : (
              <span
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: isActive ? "white" : "#7f756d" }}
              >
                {number}
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: isActive ? 600 : 500,
              fontSize: 16,
              color: isActive ? "#3d3530" : isCompleted ? "#4e453e" : "#7f756d",
            }}
          >
            {title}
          </span>
          {isCompleted && summary && (
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}>
              {summary}
            </span>
          )}
        </div>
        {isCompleted && onEdit && (
          <button
            onClick={onEdit}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#6b5948", textTransform: "uppercase" }}
          >
            Edit
          </button>
        )}
        {isActive ? <ChevronUp size={16} color="#6b5948" /> : !isCompleted ? <ChevronDown size={16} color="#d1c4bb" /> : null}
      </div>
      {isActive && (
        <div className="px-6 pb-6 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { navigate } = useNav();
  const { user } = useAuth();

  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState({ email: user?.email ?? "" });
  const [shipping, setShipping] = useState({
    firstName: user?.firstName ?? "", lastName: user?.lastName ?? "",
    address: "", apt: "", city: "", state: "", zip: "",
  });
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("VNPAY");
  const [orderNumber, setOrderNumber] = useState("");
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState("");

  const shippingCost = total >= 500000 ? 0 : 30000;
  const finalTotal = total + shippingCost;

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setPlaceError("");
    try {
      const payload = {
        email: contact.email,
        shipName: `${shipping.firstName} ${shipping.lastName}`.trim(),
        shipAddress: shipping.address + (shipping.apt ? `, ${shipping.apt}` : ""),
        shipCity: shipping.city,
        shipState: shipping.state,
        shipZip: shipping.zip,
        promoCode: promoCode || undefined,
        paymentMethod: paymentMethod,
        items: items.map((i) => ({ productSlug: i.product.id, quantity: i.quantity })),
      };
      const res = await ordersApi.create(payload);
      clearCart();
      if (res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        setOrderNumber(res.orderNumber);
        setStep("confirmed");
      }
    } catch (e: unknown) {
      setPlaceError(e instanceof Error ? e.message : "Failed to place order.");
    } finally {
      setPlacing(false);
    }
  };

  if (step === "confirmed") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#fff8f5" }}>
        <div className="flex flex-col items-center text-center gap-6 max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#6b5948" }}>
            <Check size={28} color="white" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 48, color: "#6b5948", lineHeight: "56px" }}>
            Order Confirmed
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#675a4e", lineHeight: "26px" }}>
            Thank you for your order. A confirmation email has been sent to {contact.email || "your email address"}. Your order #{orderNumber} will be dispatched within 2–3 working days.
          </p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => { navigate("orders"); }}
              className="rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
              style={{ border: "1px solid #6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "#6b5948" }}
            >
              Track My Order
            </button>
            <button
              onClick={() => navigate("shop")}
              className="rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff8f5" }}>
      {/* Minimal header */}
      <div className="py-6 flex flex-col items-center" style={{ borderBottom: "1px solid rgba(209,196,187,0.3)" }}>
        <button
          onClick={() => navigate("home")}
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 32, color: "#6b5948", letterSpacing: "-1px", lineHeight: "40px" }}
        >
          Lumos Aura
        </button>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => navigate("cart")}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#7f756d" }}
          >
            Cart
          </button>
          <span style={{ color: "#d1c4bb", fontSize: 12 }}>›</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "#6b5948" }}>
            Checkout
          </span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-8 py-12 flex gap-12 items-start">
        {/* Left: accordion steps */}
        <div className="flex-1 min-w-0">
          {/* Step 1: Contact */}
          <AccordionSection
            number={1}
            title="Contact"
            isActive={step === "contact"}
            isCompleted={step !== "contact"}
            summary={contact.email}
            onEdit={() => setStep("contact")}
          >
            <InputField
              label="Email Address"
              placeholder="elara.vance@example.com"
              value={contact.email}
              onChange={(v) => setContact({ email: v })}
              type="email"
            />
            <button
              onClick={() => setStep("shipping")}
              className="mt-6 w-full rounded-full py-3.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
            >
              Continue to Shipping
            </button>
          </AccordionSection>

          {/* Step 2: Shipping */}
          <AccordionSection
            number={2}
            title="Shipping Address"
            isActive={step === "shipping"}
            isCompleted={step === "payment"}
            summary={shipping.city ? `${shipping.city}, ${shipping.state}` : undefined}
            onEdit={() => setStep("shipping")}
          >
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <InputField placeholder="First Name" value={shipping.firstName} onChange={(v) => setShipping({ ...shipping, firstName: v })} />
                <InputField placeholder="Last Name" value={shipping.lastName} onChange={(v) => setShipping({ ...shipping, lastName: v })} />
              </div>
              <InputField placeholder="Address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} />
              <InputField placeholder="Apartment, suite, etc. (optional)" value={shipping.apt} onChange={(v) => setShipping({ ...shipping, apt: v })} />
              <div className="grid grid-cols-3 gap-4">
                <InputField placeholder="City" value={shipping.city} onChange={(v) => setShipping({ ...shipping, city: v })} />
                <div className="flex flex-col gap-1">
                  <select
                    value={shipping.state}
                    onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                    className="pb-2 bg-transparent outline-none"
                    style={{ borderBottom: "1px solid #d1c4bb", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 15, color: shipping.state ? "#3d3530" : "#9ca3af" }}
                  >
                    <option value="">State</option>
                    {["CA", "NY", "TX", "FL", "WA", "OR", "IL", "MA"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <InputField placeholder="ZIP Code" value={shipping.zip} onChange={(v) => setShipping({ ...shipping, zip: v })} />
              </div>
            </div>
            <button
              onClick={() => setStep("payment")}
              className="mt-6 w-full rounded-full py-3.5 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
            >
              Continue to Payment
            </button>
          </AccordionSection>

          {/* Step 3: Payment */}
          <AccordionSection
            number={3}
            title="Payment"
            isActive={step === "payment"}
            isCompleted={false}
          >
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", marginBottom: 20 }}>
              All transactions are secure and encrypted.
            </p>
            {/* Payment options */}
            {[
              { id: "VNPAY", label: "VNPay (QR, ATM, Credit Card)", icon: "💸" },
              { id: "MOMO", label: "MoMo (QR Code)", icon: <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="MoMo Logo" style={{ height: "24px", width: "24px", objectFit: "contain", borderRadius: "4px" }} /> },
              { id: "COD", label: "Cash on Delivery (COD)", icon: "🚚" },
            ].map((opt, i) => (
              <div
                key={opt.id}
                onClick={() => setPaymentMethod(opt.id)}
                className="flex items-center justify-between px-4 py-3.5 mb-3 rounded-xl cursor-pointer hover:opacity-80 transition-opacity"
                style={{ border: paymentMethod === opt.id ? "1px solid #6b5948" : "1px solid #d1c4bb", backgroundColor: paymentMethod === opt.id ? "rgba(107,89,72,0.04)" : "white" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{ borderColor: paymentMethod === opt.id ? "#6b5948" : "#d1c4bb" }}
                  >
                    {paymentMethod === opt.id && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#6b5948" }} />}
                  </div>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 15, color: "#3d3530" }}>{opt.label}</span>
                </div>
                <span style={{ fontSize: 18 }}>{opt.icon}</span>
              </div>
            ))}
            {placeError && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c0392b", marginTop: 8 }}>
                {placeError}
              </p>
            )}
            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="mt-6 w-full rounded-full py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
            >
              {placing ? "Placing Order…" : "Place Order"}
            </button>
            <p
              className="flex items-center justify-center gap-1.5 mt-3"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}
            >
              <Lock size={12} />
              Secure Encrypted Checkout
            </p>
          </AccordionSection>
        </div>

        {/* Right: Order summary */}
        <div className="w-80 shrink-0">
          <h3
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.96px", color: "#3d3530", textTransform: "uppercase", marginBottom: 20 }}
          >
            Order Summary
          </h3>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 items-center">
                <div
                  className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0"
                  style={{ backgroundColor: "#fff8f5", boxShadow: "0 2px 8px rgba(109,91,74,0.1)" }}
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                  <div
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#7f756d" }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 10, color: "white" }}>{quantity}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#3d3530", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {product.name}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>{product.size}</p>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#3d3530" }}>{formatPrice(product.price * quantity)}</p>
              </div>
            ))}
          </div>

          {/* Promo */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Gift card or discount code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg outline-none"
              style={{ border: "1px solid #d1c4bb", fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#4e453e", backgroundColor: "white" }}
            />
            <button
              className="px-3 py-2 rounded-lg hover:opacity-80 transition-opacity"
              style={{ border: "1px solid #d1c4bb", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#6b5948", backgroundColor: "white" }}
            >
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="flex flex-col gap-3 pt-4" style={{ borderTop: "1px solid #d1c4bb" }}>
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Subtotal</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#3d3530" }}>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Shipping</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}>
                {shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between pt-3" style={{ borderTop: "1px solid #d1c4bb" }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#3d3530" }}>Total</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 18, color: "#3d3530" }}>{formatPrice(finalTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

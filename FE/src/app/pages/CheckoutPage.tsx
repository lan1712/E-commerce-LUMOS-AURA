import { useEffect, useState } from "react";
import { Check, ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useCart, useNav, useAuth } from "../context";
import { addressesApi, ordersApi } from "../api";
import type { AddressPayload } from "../api";
import { formatPrice, getOpeningSalePrice, OPENING_DISCOUNT_LABEL } from "../data";
import {
  DEFAULT_VIETNAM_POSTAL_CODE,
  composeVietnamLocation,
  findProvince,
  findWard,
  loadVietnamAddressData,
} from "../vietnamAddressData";
import type { VietnamProvince } from "../vietnamAddressData";

type Step = "contact" | "shipping" | "payment" | "confirmed";

type SavedAddress = AddressPayload & {
  id: number;
};

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

function SelectField({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  options,
}: {
  label?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  options: { value: string; label: string }[];
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
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="outline-none pb-2 transition-colors bg-transparent w-full disabled:opacity-50"
        style={{
          borderBottom: "1px solid #d1c4bb",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: 15,
          color: value ? "#3d3530" : "#9ca3af",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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
  const { user, isLoggedIn } = useAuth();

  const [step, setStep] = useState<Step>("contact");
  const [provinces, setProvinces] = useState<VietnamProvince[]>([]);
  const [provinceCode, setProvinceCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [selectedSavedAddressId, setSelectedSavedAddressId] = useState<number | null>(null);
  const [saveShippingAddress, setSaveShippingAddress] = useState(true);
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

  const shippingCost = total >= 300000 ? 0 : 30000;
  const finalTotal = total + shippingCost;
  const saleActive = items.some(({ product }) => getOpeningSalePrice(product.price) < product.price);
  const selectedProvince = findProvince(provinces, provinceCode);
  const selectedWard = findWard(selectedProvince, wardCode);
  const selectedLocation = composeVietnamLocation(selectedProvince, selectedWard);

  useEffect(() => {
    loadVietnamAddressData().then(setProvinces);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    addressesApi.list()
      .then((data: SavedAddress[]) => {
        const preferred = data.find((address) => address.isDefault) ?? data[0];
        if (!preferred) return;

        const nameParts = preferred.name.trim().split(/\s+/);
        setSelectedSavedAddressId(preferred.id);
        setShipping((prev) => ({
          ...prev,
          firstName: prev.firstName || nameParts.slice(0, -1).join(" ") || preferred.name,
          lastName: prev.lastName || nameParts.slice(-1).join(" "),
          address: preferred.line1 || prev.address,
          apt: preferred.line2 || prev.apt,
          city: preferred.city || prev.city,
          state: preferred.country === "VN" ? prev.state : preferred.country,
          zip: preferred.zip || prev.zip,
        }));
      })
      .catch(() => undefined);
  }, [isLoggedIn]);

  useEffect(() => {
    if (selectedLocation) {
      setShipping((prev) => ({
        ...prev,
        city: selectedLocation,
        state: selectedProvince?.name ?? "",
        zip: prev.zip || DEFAULT_VIETNAM_POSTAL_CODE,
      }));
    }
  }, [selectedLocation, selectedProvince?.name]);

  useEffect(() => {
    if (!shipping.city || !provinces.length || provinceCode || wardCode) return;
    const parts = shipping.city.split(",").map((part) => part.trim()).filter(Boolean);
    const provinceName = parts.at(-1);
    const wardName = parts.at(-2);
    const province = provinces.find((item) => item.name === provinceName);
    const ward = province?.wards?.find((item) => item.name === wardName);

    if (province) setProvinceCode(String(province.code));
    if (ward) setWardCode(String(ward.code));
  }, [shipping.city, provinces, provinceCode, wardCode]);

  const buildAddressPayload = (): AddressPayload => ({
    label: "Home",
    name: `${shipping.firstName} ${shipping.lastName}`.trim(),
    line1: shipping.address,
    line2: shipping.apt || undefined,
    city: selectedLocation || shipping.city,
    country: "VN",
    zip: shipping.zip || DEFAULT_VIETNAM_POSTAL_CODE,
    isDefault: true,
  });

  const saveAddressIfNeeded = async () => {
    if (!isLoggedIn || !saveShippingAddress) return;
    const addressPayload = buildAddressPayload();
    if (!addressPayload.name || !addressPayload.line1 || !addressPayload.city) return;

    if (selectedSavedAddressId) {
      await addressesApi.update(selectedSavedAddressId, addressPayload);
      return;
    }

    const created = await addressesApi.create(addressPayload) as SavedAddress;
    setSelectedSavedAddressId(created.id);
  };

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setPlaceError("");
    try {
      await saveAddressIfNeeded();
      const payload = {
        email: contact.email,
        shipName: `${shipping.firstName} ${shipping.lastName}`.trim(),
        shipAddress: shipping.address + (shipping.apt ? `, ${shipping.apt}` : ""),
        shipCity: selectedLocation || shipping.city,
        shipState: selectedProvince?.name || shipping.state,
        shipZip: shipping.zip || DEFAULT_VIETNAM_POSTAL_CODE,
        shipCountry: "VN",
        promoCode: promoCode || undefined,
        paymentMethod: paymentMethod,
        items: items.map((i) => ({
          productSlug: i.product.slug ?? i.product.id.split("::")[0],
          variantId: i.product.selectedVariantId,
          quantity: i.quantity,
        })),
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
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(38px, 10vw, 48px)", color: "#6b5948", lineHeight: 1.16 }}>
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

      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-8 sm:py-12 flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">
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
            summary={shipping.city || undefined}
            onEdit={() => setStep("shipping")}
          >
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InputField placeholder="First Name" value={shipping.firstName} onChange={(v) => setShipping({ ...shipping, firstName: v })} />
                <InputField placeholder="Last Name" value={shipping.lastName} onChange={(v) => setShipping({ ...shipping, lastName: v })} />
              </div>
              <InputField placeholder="Address" value={shipping.address} onChange={(v) => setShipping({ ...shipping, address: v })} />
              <InputField placeholder="Apartment, suite, etc. (optional)" value={shipping.apt} onChange={(v) => setShipping({ ...shipping, apt: v })} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <SelectField
                  placeholder="Province / City"
                  value={provinceCode}
                  onChange={(value) => {
                    setProvinceCode(value);
                    setWardCode("");
                  }}
                  options={provinces.map((province) => ({ value: String(province.code), label: province.name }))}
                />
                <SelectField
                  placeholder="Ward"
                  value={wardCode}
                  onChange={setWardCode}
                  disabled={!selectedProvince}
                  options={(selectedProvince?.wards ?? []).map((ward) => ({ value: String(ward.code), label: ward.name }))}
                />
              </div>
              {isLoggedIn && (
                <div
                  className="flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ backgroundColor: "#fff8f5", border: "1px solid rgba(209,196,187,0.7)" }}
                >
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={saveShippingAddress}
                      onChange={(e) => setSaveShippingAddress(e.target.checked)}
                      style={{ accentColor: "#6b5948", width: 15, height: 15, marginTop: 2 }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#4e453e", lineHeight: "20px" }}>
                      Save this address to my account for next checkout.
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("addresses")}
                    className="self-start hover:opacity-70 transition-opacity sm:self-auto"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: "#735a36", whiteSpace: "nowrap" }}
                  >
                    Manage addresses
                  </button>
                </div>
              )}
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
        <div className="w-full lg:w-80 lg:shrink-0">
          <h3
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.96px", color: "#3d3530", textTransform: "uppercase", marginBottom: 20 }}
          >
            Order Summary
          </h3>

          {/* Items */}
          <div className="flex flex-col gap-4 mb-6">
            {items.map(({ product, quantity }) => {
              const salePrice = getOpeningSalePrice(product.price);
              return (
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
                {salePrice < product.price ? (
                  <div className="flex flex-col items-end">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9c8d82", textDecoration: "line-through" }}>{formatPrice(product.price * quantity)}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#3d3530" }}>{formatPrice(salePrice * quantity)}</span>
                  </div>
                ) : (
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#3d3530" }}>{formatPrice(product.price * quantity)}</p>
                )}
              </div>
              );
            })}
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
            {saleActive && (
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#6b5948" }}>{OPENING_DISCOUNT_LABEL}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, color: "#6b5948" }}>Đã áp dụng</span>
            </div>
            )}
            <div className="flex justify-between">
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e" }}>Shipping (Viettel Express)</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}>
                {shippingCost === 0 ? "Miễn phí" : formatPrice(shippingCost)}
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#8a7b70", marginTop: -4 }}>
              Freeship cho đơn từ 300.000 VND. Đơn dưới 300.000 VND phí ship 30.000 VND.
            </p>
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

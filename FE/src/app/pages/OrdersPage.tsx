import { useState, useEffect } from "react";
import { useNav, useAuth } from "../context";
import { Footer } from "../components/Footer";
import { Check, ShoppingBag, XCircle } from "lucide-react";
import { ordersApi } from "../api";
import { formatPrice } from "../data";

const trackingSteps = ["Pending", "Confirmed", "Processing", "Shipping", "Delivered"];



const statusColors: Record<string, { bg: string; text: string }> = {
  Processing: { bg: "#ffe4b5", text: "#8b5e00" },
  Delivered: { bg: "#d6f0e0", text: "#1a6b3a" },
  Pending: { bg: "#f0e8ff", text: "#5a3a9a" },
  Confirmed: { bg: "#e7f5ee", text: "#1a6b3a" },
  Paid: { bg: "#e7f5ee", text: "#1a6b3a" },
  Completed: { bg: "#e7f5ee", text: "#1a6b3a" },
  Cancelled: { bg: "#fee2e2", text: "#991b1b" },
};

interface ApiOrder {
  id: number;
  orderNumber: string;
  email: string;
  status: string;
  total: number;
  subtotal: number;
  discount: number;
  createdAt: string;
  paymentMethod?: string;
  paymentUrl?: string;
  cancellationReason?: string;
  refundStatus?: string;
  cancelledAt?: string;
  items: Array<{
    id: number;
    productSlug: string;
    productName: string;
    productImage?: string;
    productPrice: number;
    quantity: number;
    lineTotal: number;
  }>;
}

type DisplayOrder = {
  id: string;
  date: string;
  total: number;
  status: string;
  trackingStep: number;
  paymentMethod?: string;
  paymentUrl?: string;
  cancellationReason?: string;
  refundStatus?: string;
  cancelledAt?: string;
  items: Array<{ name: string; desc: string; price: number; qty: number; image: string }>;
};

const cancellationReasons = [
  "Changed my mind",
  "Wrong item or quantity",
  "Wrong shipping address",
  "Found a better option",
  "Payment issue",
  "Delivery time is not suitable",
  "Other",
];

function normalizeOrderStatus(status?: string) {
  const value = (status || "PENDING").toUpperCase();
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function getTrackingStep(status?: string) {
  const value = (status || "PENDING").toUpperCase();
  if (value === "DELIVERED") return 4;
  if (value === "SHIPPING") return 3;
  if (value === "PROCESSING" || value === "PAID" || value === "COMPLETED") return 2;
  if (value === "CONFIRMED") return 1;
  return 0;
}

function mapOrder(o: ApiOrder): DisplayOrder {
  return {
    id: o.orderNumber,
    date: new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    total: Number(o.total),
    status: normalizeOrderStatus(o.status),
    trackingStep: getTrackingStep(o.status),
    items: (o.items ?? []).map((i) => ({
      name: i.productName,
      desc: "",
      price: Number(i.productPrice),
      qty: i.quantity,
      image: i.productImage ?? "",
    })),
    paymentMethod: o.paymentMethod,
    paymentUrl: o.paymentUrl,
    cancellationReason: o.cancellationReason,
    refundStatus: o.refundStatus,
    cancelledAt: o.cancelledAt,
  };
}

function canCancelOrder(order: DisplayOrder) {
  return ["Pending", "Paid", "Confirmed"].includes(order.status);
}

export function OrdersPage() {
  const { navigate } = useNav();
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<DisplayOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [retryMethod, setRetryMethod] = useState<string>("");
  const [retrying, setRetrying] = useState(false);
  const [retryError, setRetryError] = useState("");
  const [retryNotice, setRetryNotice] = useState("");
  const [cancelReason, setCancelReason] = useState(cancellationReasons[0]);
  const [customCancelReason, setCustomCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    ordersApi.list()
      .then((data: ApiOrder[]) => {
        if (!data || data.length === 0) return;
        const mapped: DisplayOrder[] = data.map(mapOrder);
        setOrders(mapped);
        setSelectedOrder(mapped[0]);
      })
      .catch(() => { /* error handling */ })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const displayOrders = isLoggedIn ? orders : [];
  const displaySelected = selectedOrder ? (displayOrders.find(o => o.id === selectedOrder.id) || displayOrders[0]) : (displayOrders.length > 0 ? displayOrders[0] : null);

  useEffect(() => {
    if (displaySelected) {
      setRetryMethod(displaySelected.paymentMethod || "VNPAY");
      setRetryError("");
      setRetryNotice("");
      setCancelError("");
      setCancelReason(cancellationReasons[0]);
      setCustomCancelReason("");
    }
  }, [displaySelected]);

  const handleRetryPayment = async () => {
    if (!displaySelected) return;

    setRetrying(true);
    setRetryError("");
    setRetryNotice("");
    try {
      const updated = await ordersApi.retryPayment(displaySelected.id, retryMethod);
      if (updated.paymentUrl) {
        window.location.href = updated.paymentUrl;
        return;
      }

      const mapped = mapOrder(updated);
      setOrders((current) => current.map((order) => order.id === displaySelected.id ? mapped : order));
      setSelectedOrder((current) => current?.id === displaySelected.id ? mapped : current);
      setRetryNotice(retryMethod === "COD"
        ? "COD selected. Your order is confirmed for cash on delivery."
        : "Payment method updated. We will confirm this order manually.");
    } catch (error) {
      setRetryError(error instanceof Error ? error.message : "Could not retry payment.");
    } finally {
      setRetrying(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!displaySelected || !canCancelOrder(displaySelected)) return;

    const reason = cancelReason === "Other" ? customCancelReason.trim() : cancelReason;
    if (!reason) {
      setCancelError("Please choose or enter a cancellation reason.");
      return;
    }

    setCancelling(true);
    setCancelError("");
    try {
      const updated = await ordersApi.cancel(displaySelected.id, reason);
      const mapped = mapOrder(updated);
      setOrders((current) => current.map((order) => order.id === displaySelected.id ? mapped : order));
      setSelectedOrder(mapped);
    } catch (error) {
      setCancelError(error instanceof Error ? error.message : "Could not cancel this order.");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="mx-auto w-full max-w-[1280px] px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:px-10 lg:pb-20">
        <h1
          className="mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(40px, 10vw, 56px)", color: "#3d3530", letterSpacing: "-0.5px", lineHeight: 1.14 }}
        >
          Order History
        </h1>
        <p
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", marginBottom: 40 }}
        >
          Track your recent olfactory acquisitions and past curations.
        </p>

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Order list */}
          <div className="flex w-full shrink-0 gap-3 overflow-x-auto pb-2 lg:w-72 lg:flex-col lg:overflow-visible lg:pb-0">
            {(isLoggedIn && !loading && orders.length === 0) ? (
              <div className="text-center py-8">
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 20, color: "#6b5948" }}>No orders yet</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", marginTop: 8 }}>Your order history will appear here.</p>
                <button
                  onClick={() => navigate("shop")}
                  className="mt-4 rounded-full px-5 py-2.5 hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, color: "white" }}
                >Shop Now</button>
              </div>
            ) : (
              displayOrders.map((order) => {
              const isSelected = displaySelected?.id === order.id;
              return (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="min-w-[260px] rounded-2xl p-4 text-left transition-all lg:min-w-0"
                  style={{
                    backgroundColor: isSelected ? "white" : "#f5ece7",
                    border: isSelected ? "1px solid #d1c4bb" : "1px solid transparent",
                    boxShadow: isSelected ? "0 4px 16px rgba(109,91,74,0.08)" : "none",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase" }}>
                      Order #{order.id}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: statusColors[order.status]?.bg ?? "#efe6e2",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 10,
                        letterSpacing: "0.5px",
                        color: statusColors[order.status]?.text ?? "#4e453e",
                        textTransform: "uppercase",
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 18, color: "#3d3530", lineHeight: "24px" }}>
                    {order.date}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#7f756d", marginTop: 2 }}>
                    {order.items.length} {order.items.length === 1 ? "item" : "items"} · {formatPrice(order.total)}
                  </p>
                  <div className="flex gap-2 mt-3">
                    {order.items.slice(0, 2).map((item, i) => (
                      <div
                        key={i}
                        className="rounded-lg overflow-hidden"
                        style={{ width: 44, height: 44, backgroundColor: "#fff8f5" }}
                      >
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" /> : <div className="w-full h-full" style={{ backgroundColor: "#efe6e2" }} />}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })
            )}
          </div>

          {/* Order detail */}
          <div className="flex min-w-0 flex-1 flex-col justify-between rounded-2xl bg-white p-5 sm:p-7 lg:p-10" style={{ minHeight: "min(600px, 100dvh)", boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)" }}>
            {selectedOrder ? (
              <>
                <div>
                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:mb-10">
                    <div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 36, color: "#3d3530", lineHeight: "44px" }}>
                        Order Details
                      </h2>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}>
                        Placed on {selectedOrder.date}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textAlign: "right", textTransform: "uppercase" }}>
                        Total Amount
                      </p>
                      <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 36, color: "#3d3530", lineHeight: "44px", textAlign: "right" }}>
                        {formatPrice(selectedOrder.total)}
                      </p>
                    </div>
                  </div>

                  {/* Tracking journey */}
                  <div className="my-6 overflow-x-auto rounded-2xl p-5 sm:p-6" style={{ backgroundColor: "#fff8f5" }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", textAlign: "center", marginBottom: 20 }}>
                      Tracking Journey
                    </p>
                    <div className="flex min-w-[520px] items-center justify-between">
                      {trackingSteps.map((s, i) => {
                        const done = i <= selectedOrder.trackingStep;
                        const active = i === selectedOrder.trackingStep;
                        return (
                          <div key={s} className="flex flex-col items-center flex-1">
                            <div className="relative flex items-center w-full">
                              {i > 0 && <div className="absolute h-0.5 right-1/2 left-0" style={{ backgroundColor: i <= selectedOrder.trackingStep ? "#6b5948" : "#d1c4bb" }} />}
                              {i < trackingSteps.length - 1 && <div className="absolute h-0.5 left-1/2 right-0" style={{ backgroundColor: i < selectedOrder.trackingStep ? "#6b5948" : "#d1c4bb" }} />}
                              <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto relative z-10" style={{ backgroundColor: done ? "#6b5948" : "#efe6e2", border: active ? "2px solid #6b5948" : "none" }}>
                                {done && !active ? <Check size={14} color="white" /> : active ? <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "white" }} /> : <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#d1c4bb" }} />}
                              </div>
                            </div>
                            <p className="mt-2 text-center" style={{ fontFamily: "'Inter', sans-serif", fontWeight: active ? 600 : 400, fontSize: 11, letterSpacing: "0.5px", color: active ? "#6b5948" : done ? "#4e453e" : "#7f756d", textTransform: "uppercase" }}>{s}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {selectedOrder.status === "Cancelled" && (
                    <div className="mb-6 rounded-2xl p-5" style={{ backgroundColor: "#fff3f0", border: "1px solid #efc8c0" }}>
                      <div className="flex items-start gap-3">
                        <XCircle size={20} color="#991b1b" className="mt-0.5 shrink-0" />
                        <div>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#991b1b" }}>
                            Order cancelled
                          </p>
                          {selectedOrder.cancellationReason && (
                            <p className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#7f4c43" }}>
                              Reason: {selectedOrder.cancellationReason}
                            </p>
                          )}
                          {selectedOrder.refundStatus && selectedOrder.refundStatus !== "NOT_REQUIRED" && (
                            <p className="mt-1" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#7f4c43" }}>
                              Refund status: {selectedOrder.refundStatus === "PENDING" ? "Pending refund review" : selectedOrder.refundStatus}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Items */}
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", marginBottom: 16 }}>
                    Items In This Order
                  </p>
                  <div className="flex flex-col gap-4">
                    {selectedOrder.items.map((item, i) => (
                      <div key={i} className="flex flex-wrap gap-4 py-4 sm:flex-nowrap sm:items-center" style={{ borderBottom: "1px solid rgba(209,196,187,0.3)" }}>
                        <div className="rounded-xl overflow-hidden shrink-0" style={{ width: 64, height: 64, backgroundColor: "#fff8f5" }}>
                          {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" /> : <div className="w-full h-full" style={{ backgroundColor: "#efe6e2" }} />}
                        </div>
                        <div className="flex-1">
                          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 18, color: "#3d3530" }}>{item.name}</p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#7f756d" }}>{item.desc}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>Qty {item.qty}</p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#3d3530" }}>{formatPrice(item.price * item.qty)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {canCancelOrder(selectedOrder) && (
                    <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#fffaf7", border: "1px solid rgba(209,196,187,0.65)" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", marginBottom: 8 }}>
                        Cancel Order
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#7f756d", marginBottom: 14 }}>
                        You can cancel before the admin starts preparing or shipping this order. Prepaid orders will be marked for refund review.
                      </p>
                      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                        <select
                          value={cancelReason}
                          onChange={(event) => setCancelReason(event.target.value)}
                          className="h-11 rounded-md border border-[#d1c4bb] bg-white px-3 text-sm outline-none"
                          style={{ fontFamily: "'Inter', sans-serif", color: "#4e453e" }}
                        >
                          {cancellationReasons.map((reason) => (
                            <option key={reason} value={reason}>{reason}</option>
                          ))}
                        </select>
                        {cancelReason === "Other" && (
                          <input
                            value={customCancelReason}
                            onChange={(event) => setCustomCancelReason(event.target.value)}
                            placeholder="Tell us the reason..."
                            maxLength={500}
                            className="h-11 rounded-md border border-[#d1c4bb] bg-white px-3 text-sm outline-none"
                            style={{ fontFamily: "'Inter', sans-serif", color: "#4e453e" }}
                          />
                        )}
                      </div>
                      {cancelError && (
                        <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c0392b" }}>
                          {cancelError}
                        </p>
                      )}
                      <button
                        onClick={handleCancelOrder}
                        disabled={cancelling}
                        className="mt-4 rounded-full px-6 py-3 transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ border: "1px solid #991b1b", backgroundColor: "white", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: "#991b1b" }}
                      >
                        {cancelling ? "Cancelling..." : "Cancel this order"}
                      </button>
                    </div>
                  )}

                  {selectedOrder.status === "Pending" && (
                    <div className="mt-8 rounded-2xl p-6" style={{ backgroundColor: "#fff8f5", border: "1px solid rgba(209,196,187,0.55)" }}>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", marginBottom: 14 }}>
                        Complete Payment
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {[
                          { id: "VNPAY", label: "VNPay" },
                          { id: "MOMO", label: "MoMo" },
                          { id: "COD", label: "COD" },
                        ].map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setRetryMethod(method.id)}
                            className="rounded-full px-4 py-2.5 transition-opacity hover:opacity-80"
                            style={{
                              border: retryMethod === method.id ? "1px solid #6b5948" : "1px solid #d1c4bb",
                              backgroundColor: retryMethod === method.id ? "#6b5948" : "white",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 600,
                              fontSize: 13,
                              color: retryMethod === method.id ? "white" : "#6b5948",
                            }}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                      {retryError && (
                        <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#c0392b" }}>
                          {retryError}
                        </p>
                      )}
                      {retryNotice && (
                        <p className="mt-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#1a6b3a" }}>
                          {retryNotice}
                        </p>
                      )}
                      <button
                        onClick={handleRetryPayment}
                        disabled={retrying}
                        className="mt-4 w-full rounded-full px-6 py-3 transition-opacity hover:opacity-90 disabled:opacity-60"
                        style={{ backgroundColor: "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "white" }}
                      >
                        {retrying ? "Processing..." : retryMethod === "COD" ? "Use COD" : "Pay Again"}
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate("shop")}
                  className="mt-6 rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
                  style={{ border: "1px solid #6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#6b5948" }}
                >
                  Shop Again
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 h-full text-center">
                <ShoppingBag size={48} color="#d1c4bb" strokeWidth={1} className="mb-4" />
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#6b5948", marginBottom: 8 }}>
                  No order selected
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#a09589" }}>
                  Please select an order from the list to view its details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

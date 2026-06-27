import { useState, useEffect } from "react";
import imgOrder1 from "../../imports/MyOrdersLumosAura/22675bbce2030fc33ab14bb643fd73097523ce18.png";
import imgOrder2 from "../../imports/MyOrdersLumosAura/a1c093c33fd2dbdff145507ac99833dd2272a3b7.png";
import imgPlaceholder1 from "../../imports/MyOrdersLumosAura/0493b23c1255b8c2bf1389105b63a8834a0b0a12.png";
import imgPlaceholder2 from "../../imports/MyOrdersLumosAura/db7a43eb3eb3a617161b7b25e5e636cbabd0c853.png";
import { useNav, useAuth } from "../context";
import { Footer } from "../components/Footer";
import { Check } from "lucide-react";
import { ordersApi } from "../api";

const trackingSteps = ["Pending", "Confirmed", "Processing", "Shipping", "Delivered"];

const mockOrders = [
  {
    id: "LA-2031",
    date: "Oct 24, 2024",
    total: 245.0,
    status: "Processing" as const,
    trackingStep: 2,
    items: [
      { name: "Midnight Santal", desc: "50ml Extrait de Parfum", price: 160, qty: 1, image: imgOrder1 },
      { name: "Celestial Amber", desc: "Travel Spray 10ml", price: 85, qty: 1, image: imgOrder2 },
    ],
  },
  {
    id: "LA-4804",
    date: "Sep 12, 2024",
    total: 120.0,
    status: "Delivered" as const,
    trackingStep: 4,
    items: [
      { name: "Ethereal Bloom", desc: "240g Ceramic Candle", price: 120, qty: 1, image: imgPlaceholder1 },
    ],
  },
  {
    id: "LA-8122",
    date: "Jul 05, 2024",
    total: 410.0,
    status: "Delivered" as const,
    trackingStep: 4,
    items: [
      { name: "Sandalwood & Moonstone", desc: "220g Soy Candle", price: 48, qty: 2, image: imgPlaceholder2 },
      { name: "Vetiver & Smoke", desc: "220g Soy Candle", price: 48, qty: 1, image: imgOrder1 },
      { name: "Amber & Fig", desc: "250g Soy Candle", price: 52, qty: 3, image: imgOrder2 },
    ],
  },
];

const statusColors: Record<string, { bg: string; text: string }> = {
  Processing: { bg: "#ffe4b5", text: "#8b5e00" },
  Delivered: { bg: "#d6f0e0", text: "#1a6b3a" },
  Pending: { bg: "#f0e8ff", text: "#5a3a9a" },
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
  items: Array<{ name: string; desc: string; price: number; qty: number; image: string }>;
};

export function OrdersPage() {
  const { navigate } = useNav();
  const { isLoggedIn } = useAuth();
  const [orders, setOrders] = useState<DisplayOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder>(mockOrders[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    ordersApi.list()
      .then((data: ApiOrder[]) => {
        if (!data || data.length === 0) return;
        const mapped: DisplayOrder[] = data.map((o) => ({
          id: o.orderNumber,
          date: new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          total: Number(o.total),
          status: o.status.charAt(0) + o.status.slice(1).toLowerCase(),
          trackingStep: o.status === "DELIVERED" ? 4 : o.status === "PROCESSING" ? 2 : o.status === "CONFIRMED" ? 1 : 0,
          items: (o.items ?? []).map((i) => ({
            name: i.productName,
            desc: "",
            price: Number(i.productPrice),
            qty: i.quantity,
            image: i.productImage ?? "",
          })),
        }));
        setOrders(mapped);
        setSelectedOrder(mapped[0]);
      })
      .catch(() => { /* keep mock data on error */ })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const displayOrders = isLoggedIn ? orders : mockOrders;
  const displaySelected = isLoggedIn ? (selectedOrder ?? displayOrders[0]) : mockOrders[0];

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="max-w-[1280px] mx-auto w-full px-10 pt-32 pb-20">
        <h1
          className="mb-2"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 56, color: "#3d3530", letterSpacing: "-0.5px", lineHeight: "64px" }}
        >
          Order History
        </h1>
        <p
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d", marginBottom: 40 }}
        >
          Track your recent olfactory acquisitions and past curations.
        </p>

        <div className="flex gap-8">
          {/* Order list */}
          <div className="w-72 shrink-0 flex flex-col gap-3">
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
                  className="text-left rounded-2xl p-4 transition-all"
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
                    {order.items.length} {order.items.length === 1 ? "item" : "items"} · ${order.total.toFixed(0)}
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
          <div
            className="flex-1 rounded-2xl p-8"
            style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}
          >
            {displaySelected && (
            <>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 36, color: "#3d3530", lineHeight: "44px" }}>
                  Order Details
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}>
                  Placed on {displaySelected.date}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textAlign: "right", textTransform: "uppercase" }}>
                  Total Amount
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 36, color: "#3d3530", lineHeight: "44px", textAlign: "right" }}>
                  ${displaySelected.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Tracking journey */}
            <div
              className="rounded-2xl p-6 my-6"
              style={{ backgroundColor: "#fff8f5" }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", textAlign: "center", marginBottom: 20 }}>
                Tracking Journey
              </p>
              <div className="flex items-center justify-between">
                {trackingSteps.map((s, i) => {
                  const done = i <= displaySelected.trackingStep;
                  const active = i === displaySelected.trackingStep;
                  return (
                    <div key={s} className="flex flex-col items-center flex-1">
                      <div className="relative flex items-center w-full">
                        {/* Line before */}
                        {i > 0 && (
                          <div
                            className="absolute h-0.5 right-1/2 left-0"
                            style={{ backgroundColor: i <= selectedOrder.trackingStep ? "#6b5948" : "#d1c4bb" }}
                          />
                        )}
                        {/* Line after */}
                        {i < trackingSteps.length - 1 && (
                          <div
                            className="absolute h-0.5 left-1/2 right-0"
                            style={{ backgroundColor: i < selectedOrder.trackingStep ? "#6b5948" : "#d1c4bb" }}
                          />
                        )}
                        {/* Circle */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mx-auto relative z-10"
                          style={{
                            backgroundColor: done ? "#6b5948" : "#efe6e2",
                            border: active ? "2px solid #6b5948" : "none",
                          }}
                        >
                          {done && !active ? (
                            <Check size={14} color="white" />
                          ) : active ? (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "white" }} />
                          ) : (
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#d1c4bb" }} />
                          )}
                        </div>
                      </div>
                      <p
                        className="mt-2 text-center"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: active ? 600 : 400,
                          fontSize: 11,
                          letterSpacing: "0.5px",
                          color: active ? "#6b5948" : done ? "#4e453e" : "#7f756d",
                          textTransform: "uppercase",
                        }}
                      >
                        {s}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "1px", color: "#7f756d", textTransform: "uppercase", marginBottom: 16 }}>
              Items In This Order
            </p>
            <div className="flex flex-col gap-4">
              {displaySelected.items.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center py-4"
                  style={{ borderBottom: "1px solid rgba(209,196,187,0.3)" }}
                >
                  <div
                    className="rounded-xl overflow-hidden shrink-0"
                    style={{ width: 64, height: 64, backgroundColor: "#fff8f5" }}
                  >
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      : <div className="w-full h-full" style={{ backgroundColor: "#efe6e2" }} />}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 18, color: "#3d3530" }}>{item.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#7f756d" }}>{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 12, color: "#7f756d" }}>Qty {item.qty}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15, color: "#3d3530" }}>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            </>)}

            <button
              onClick={() => navigate("shop")}
              className="mt-6 rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
              style={{ border: "1px solid #6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#6b5948" }}
            >
              Shop Again
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

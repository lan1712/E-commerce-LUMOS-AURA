import { useState } from "react";
import imgAdminAvatar from "../../imports/DashboardLumosAuraAdmin/85fc1703dac33d471d6648f9f6e28e806ae4728d.png";
import imgProduct1 from "../../imports/ProductsLumosAuraAdmin/09a79d0231c0a9a07cc65051347003f388883cf9.png";
import imgProduct2 from "../../imports/ProductsLumosAuraAdmin/e7785094366f55e6ca58f53aacd188c6b0af2a0d.png";
import imgReview1 from "../../imports/ReviewsLumosAuraAdmin/ce339585e7f9ff6801705d0866dd4ab36ce125bf.png";
import imgReview2 from "../../imports/ReviewsLumosAuraAdmin/b79f757d605f94cdef0b1935e15d9d2e43cc3ffc.png";
import { useAuth, useNav } from "../context";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Ticket, Star, FileText,
  Search, Bell, Settings, TrendingUp, TrendingDown, MoreVertical,
  Plus, Download, Eye, Pencil, Trash2, Check, X, ChevronLeft, ChevronRight,
  LogOut,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from "recharts";

type AdminSection = "dashboard" | "products" | "orders" | "users" | "vouchers" | "reviews" | "policies";

const navItems: { key: AdminSection; label: string; icon: React.ElementType }[] = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "products", label: "Products", icon: Package },
  { key: "orders", label: "Orders", icon: ShoppingCart },
  { key: "users", label: "Users", icon: Users },
  { key: "vouchers", label: "Vouchers", icon: Ticket },
  { key: "reviews", label: "Reviews", icon: Star },
  { key: "policies", label: "Policies", icon: FileText },
];

// ── Shared styles ─────────────────────────────────────────────────────────────
const F = { fontFamily: "'Inter', sans-serif" };
const PF = { fontFamily: "'Playfair Display', serif" };

function Badge({ label, color }: { label: string; color: "green" | "yellow" | "gray" | "red" | "brown" | "blue" }) {
  const map = {
    green:  { bg: "#dcfce7", text: "#166534" },
    yellow: { bg: "#fef9c3", text: "#854d0e" },
    gray:   { bg: "#f3f4f6", text: "#374151" },
    red:    { bg: "#fee2e2", text: "#991b1b" },
    brown:  { bg: "#e9e1dc", text: "#4e453e" },
    blue:   { bg: "#dbeafe", text: "#1e40af" },
  }[color];
  return (
    <span className="rounded-full px-3 py-0.5 text-xs font-medium whitespace-nowrap" style={{ ...F, backgroundColor: map.bg, color: map.text }}>
      {label}
    </span>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({ active, setActive }: { active: AdminSection; setActive: (s: AdminSection) => void }) {
  const { user, logout } = useAuth();
  const { navigate } = useNav();
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 flex flex-col py-8 z-20"
      style={{ backgroundColor: "#fbf2ed", borderRight: "1px solid #d1c4bb" }}>
      {/* Brand */}
      <div className="px-6 pb-8">
        <p style={{ ...PF, fontWeight: 700, fontSize: 28, color: "#6b5948", lineHeight: "34px" }}>
          Lumos Aura<br />Command
        </p>
        <p style={{ ...F, fontWeight: 600, fontSize: 13, color: "#4e453e", marginTop: 4 }}>System Administrator</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 flex flex-col gap-1">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:opacity-90"
              style={{
                backgroundColor: isActive ? "#6b5948" : "transparent",
                ...F, fontWeight: 600, fontSize: 14, letterSpacing: "0.7px",
                color: isActive ? "white" : "#4e453e",
              }}
            >
              <Icon size={18} />
              {label}
            </button>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="px-6 pt-4" style={{ borderTop: "1px solid rgba(209,196,187,0.3)" }}>
        <div className="flex items-center gap-3">
          <img src={imgAdminAvatar} alt="Admin" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p style={{ ...F, fontWeight: 600, fontSize: 13, color: "#1e1b18" }}>{user?.firstName || "Admin"} {user?.lastName || "User"}</p>
            <p style={{ ...F, fontSize: 11, color: "#4e453e" }}>{user?.email || "admin@lumosaura.com"}</p>
          </div>
          <button
            onClick={() => { logout(); navigate("home"); }}
            className="hover:opacity-70 transition-opacity"
            title="Sign out"
          >
            <LogOut size={15} color="#7f756d" />
          </button>
        </div>
      </div>
    </aside>
  );
}

// ── Top Header ────────────────────────────────────────────────────────────────
function TopHeader({ placeholder }: { placeholder: string }) {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 flex items-center justify-between px-6 z-10"
      style={{ backgroundColor: "#fff8f5", borderBottom: "1px solid #d1c4bb" }}>
      <div className="relative max-w-xs w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#4e453e" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 rounded-lg outline-none text-sm"
          style={{ backgroundColor: "#f5ece7", ...F, color: "#4e453e", border: "1px solid #d1c4bb" }}
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-[#f5ece7] transition-colors"><Bell size={18} color="#4e453e" /></button>
        <button className="p-2 rounded-full hover:bg-[#f5ece7] transition-colors"><Settings size={18} color="#4e453e" /></button>
        <img src={imgAdminAvatar} alt="Admin" className="w-8 h-8 rounded-full object-cover ml-2" />
      </div>
    </header>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
const revenueData = [
  { m: "Jan", v: 42 }, { m: "Feb", v: 55 }, { m: "Mar", v: 48 }, { m: "Apr", v: 61 },
  { m: "May", v: 72 }, { m: "Jun", v: 68 }, { m: "Jul", v: 85 }, { m: "Aug", v: 91 },
  { m: "Sep", v: 88 }, { m: "Oct", v: 102 }, { m: "Nov", v: 118 }, { m: "Dec", v: 124 },
];
const topSellers = [
  { name: "Midnight Amber", units: 420, pct: 85 },
  { name: "Sandalwood Dream", units: 380, pct: 75 },
  { name: "Citrus Glow", units: 250, pct: 50 },
  { name: "Vanilla Muse", units: 180, pct: 35 },
];
const recentOrders = [
  { id: "#ORD-0921", customer: "Eleanor Vance", date: "Oct 24, 2023", amount: "$145.00", status: "Shipped" },
  { id: "#ORD-0920", customer: "Luke Crain", date: "Oct 24, 2023", amount: "$85.50", status: "Processing" },
  { id: "#ORD-0919", customer: "Theodora Crain", date: "Oct 23, 2023", amount: "$210.00", status: "Shipped" },
  { id: "#ORD-0918", customer: "Steven Crain", date: "Oct 23, 2023", amount: "$65.00", status: "Delivered" },
];

function DashboardSection({ onViewOrders }: { onViewOrders: () => void }) {
  const metrics = [
    { label: "TOTAL ORDERS", value: "1,248", change: "+12%", up: true },
    { label: "REVENUE", value: "$124k", change: "+8.4%", up: true },
    { label: "NEW CUSTOMERS", value: "450", change: "−2.1%", up: false },
    { label: "CONVERSION", value: "3.4%", change: "+0.5%", up: true },
  ];
  const statusColor = (s: string) => s === "Shipped" ? "green" : s === "Processing" ? "yellow" : "gray";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Dashboard Overview</h1>
        <p style={{ ...F, fontSize: 15, color: "#4e453e", marginTop: 4 }}>Welcome back. Here is the latest operational data for Lumos Aura.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            <div className="flex items-start justify-between mb-2">
              <p style={{ ...F, fontWeight: 600, fontSize: 12, letterSpacing: "0.7px", color: "#4e453e" }}>{m.label}</p>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e9e1dc" }}>
                <TrendingUp size={16} color="#6b5948" />
              </div>
            </div>
            <p style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>{m.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {m.up ? <TrendingUp size={12} color="#16a34a" /> : <TrendingDown size={12} color="#dc2626" />}
              <span style={{ ...F, fontSize: 13, fontWeight: 500, color: m.up ? "#16a34a" : "#dc2626" }}>{m.change}</span>
              <span style={{ ...F, fontSize: 13, color: "#4e453e" }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-lg p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ ...F, fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#1e1b18" }}>REVENUE GROWTH</p>
            <span className="rounded px-3 py-1 text-sm" style={{ ...F, backgroundColor: "#e9e1dc", color: "#1e1b18" }}>This Year</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData}>
              <XAxis key="revenue-xaxis" dataKey="m" tick={{ fontSize: 11, fill: "#4e453e" }} axisLine={false} tickLine={false} />
              <Tooltip key="revenue-tooltip" contentStyle={{ fontSize: 12, border: "1px solid #d1c4bb" }} />
              <Area key="revenue-area" type="monotone" dataKey="v" stroke="#6b5948" strokeWidth={2.5} fill="rgba(107,89,72,0.08)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ ...F, fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#1e1b18" }}>TOP SELLERS</p>
            <MoreVertical size={16} color="#4e453e" />
          </div>
          <div className="flex flex-col gap-4">
            {topSellers.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between mb-1">
                  <span style={{ ...F, fontWeight: 500, fontSize: 13, color: "#1e1b18" }}>{s.name}</span>
                  <span style={{ ...F, fontSize: 13, color: "#4e453e" }}>{s.units} units</span>
                </div>
                <div className="rounded-full h-2" style={{ backgroundColor: "#e9e1dc" }}>
                  <div className="rounded-full h-2" style={{ width: `${s.pct}%`, backgroundColor: "#6b5948" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-lg overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #d1c4bb" }}>
          <p style={{ ...F, fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#1e1b18" }}>RECENT ORDERS</p>
          <button onClick={onViewOrders} style={{ ...F, fontSize: 14, color: "#6b5948" }} className="hover:opacity-70">View All</button>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "rgba(233,225,220,0.3)", borderBottom: "1px solid #d1c4bb" }}>
              {["ORDER ID", "CUSTOMER", "DATE", "AMOUNT", "STATUS"].map((h) => (
                <th key={h} className="text-left px-4 py-3" style={{ ...F, fontWeight: 500, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < recentOrders.length - 1 ? "1px solid rgba(209,196,187,0.5)" : "none" }}>
                <td className="px-4 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{o.id}</td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{o.customer}</td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{o.date}</td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#1e1b18" }}>{o.amount}</td>
                <td className="px-4 py-4">
                  <Badge label={o.status} color={statusColor(o.status) as "green" | "yellow" | "gray"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
const productRows = [
  { img: imgProduct1, name: "Celestial Amber", sku: "LA-CA-001", category: "Eau de Parfum", price: "$185.00", stock: 142, stockColor: "#4ade80", status: "Published" },
  { img: imgProduct2, name: "Midnight Fig Canvas", sku: "LA-MF-002", category: "Home Fragrance", price: "$65.00", stock: 12, stockColor: "#facc15", status: "Published" },
  { img: null, name: "Oud Mirage", sku: "LA-OM-003", category: "Eau de Parfum", price: "$210.00", stock: 0, stockColor: "#d1c4bb", status: "Draft" },
];

function ProductsSection() {
  const [search, setSearch] = useState("");
  const rows = productRows.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Products</h1>
        <button className="flex items-center gap-2 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        {/* Filters bar */}
        <div className="flex items-center gap-4 px-4 py-3" style={{ backgroundColor: "#fbf2ed", borderBottom: "1px solid #d1c4bb" }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#4e453e" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 rounded-lg outline-none text-sm"
              style={{ backgroundColor: "#f5ece7", ...F, color: "#4e453e", border: "1px solid #d1c4bb" }} />
          </div>
          <select className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ ...F, backgroundColor: "#f5ece7", color: "#1e1b18", border: "1px solid #d1c4bb" }}>
            <option>All Categories</option>
            <option>Eau de Parfum</option>
            <option>Home Fragrance</option>
          </select>
          <select className="px-3 py-2 rounded-lg text-sm outline-none"
            style={{ ...F, backgroundColor: "#f5ece7", color: "#1e1b18", border: "1px solid #d1c4bb" }}>
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
          <div className="flex gap-2 ml-auto">
            <button className="p-2 rounded-lg" style={{ border: "1px solid #d1c4bb" }}><Download size={16} color="#4e453e" /></button>
            <button className="p-2 rounded-lg" style={{ border: "1px solid #d1c4bb" }}><Settings size={16} color="#4e453e" /></button>
          </div>
        </div>
        {/* Table */}
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#fbf2ed", borderBottom: "1px solid #d1c4bb" }}>
              <th className="w-12 px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb", backgroundColor: "#f5ece7" }} /></th>
              {["PRODUCT", "CATEGORY", "PRICE", "STOCK", "STATUS", "ACTIONS"].map((h, i) => (
                <th key={h} className={`px-6 py-4 text-left ${i === 5 ? "text-right" : ""}`}
                  style={{ ...F, fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((p, i) => (
              <tr key={p.sku} style={{ borderTop: i > 0 ? "1px solid #d1c4bb" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.15)] transition-colors">
                <td className="px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb", backgroundColor: "#f5ece7" }} /></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#efe6e2" }}>
                      {p.img ? <img src={p.img} alt={p.name} className="w-full h-full object-cover" /> : <Package size={20} color="#d1c4bb" />}
                    </div>
                    <div>
                      <p style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{p.name}</p>
                      <p style={{ ...F, fontSize: 12, color: "#4e453e" }}>SKU: {p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{p.category}</td>
                <td className="px-6 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{p.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.stockColor }} />
                    <span style={{ ...F, fontSize: 14, color: "#1e1b18" }}>{p.stock}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge label={p.status} color={p.status === "Published" ? "brown" : "gray"} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 rounded hover:bg-[#f5ece7] transition-colors"><Pencil size={14} color="#4e453e" /></button>
                    <button className="p-1.5 rounded hover:bg-[#fee2e2] transition-colors"><Trash2 size={14} color="#4e453e" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3" style={{ backgroundColor: "#fbf2ed", borderTop: "1px solid #d1c4bb" }}>
          <span style={{ ...F, fontSize: 14, color: "#4e453e" }}>Showing 1 to {rows.length} of 45 results</span>
          <div className="flex gap-1">
            {["Prev", "1", "2", "3", "...", "Next"].map((b) => (
              <button key={b} className="px-3 py-1.5 rounded text-sm"
                style={{ ...F, border: "1px solid #d1c4bb", backgroundColor: b === "1" ? "#6b5948" : "transparent", color: b === "1" ? "white" : "#4e453e" }}>
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Orders ────────────────────────────────────────────────────────────────────
const orderRows = [
  { id: "#ORD-0921", date: "Oct 24, 2023", customer: "Eleanor Vance", total: "$345.00", status: "Processing", payment: "Paid" },
  { id: "#ORD-0920", date: "Oct 24, 2023", customer: "Julian Crain", total: "$120.00", status: "Pending", payment: "Unpaid" },
  { id: "#ORD-0919", date: "Oct 23, 2023", customer: "Sarah Connor", total: "$890.00", status: "Completed", payment: "Paid" },
  { id: "#ORD-0918", date: "Oct 22, 2023", customer: "Marcus Webb", total: "$210.00", status: "Completed", payment: "Paid" },
];

function OrdersSection() {
  const [tab, setTab] = useState<"All" | "Pending" | "Processing" | "Completed">("All");
  const filtered = tab === "All" ? orderRows : orderRows.filter(o => o.status === tab);
  const statusColor = (s: string): "yellow" | "gray" | "green" | "blue" => ({ Processing: "yellow", Pending: "gray", Completed: "green" }[s] as "yellow" | "gray" | "green") || "gray";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Orders</h1>
          <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Manage and track customer orders.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg" style={{ border: "1px solid #d1c4bb", ...F, fontSize: 14, color: "#4e453e" }}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        {/* Tabs */}
        <div className="flex gap-0 px-6 pt-4" style={{ borderBottom: "1px solid #d1c4bb" }}>
          {(["All", "Pending", "Processing", "Completed"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 pb-3 mr-2 text-sm"
              style={{ ...F, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#1e1b18" : "#4e453e",
                borderBottom: tab === t ? "2px solid #6b5948" : "2px solid transparent" }}>
              {t}
            </button>
          ))}
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #d1c4bb" }}>
              {["Order ID", "Date", "Customer", "Total", "Status", "Payment", "Action"].map(h => (
                <th key={h} className="px-6 py-3 text-left" style={{ ...F, fontSize: 13, color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(209,196,187,0.4)" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.1)]">
                <td className="px-6 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{o.id}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{o.date}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{o.customer}</td>
                <td className="px-6 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{o.total}</td>
                <td className="px-6 py-4"><Badge label={o.status} color={statusColor(o.status)} /></td>
                <td className="px-6 py-4"><Badge label={o.payment} color={o.payment === "Paid" ? "green" : "yellow"} /></td>
                <td className="px-6 py-4"><button className="hover:opacity-70"><Eye size={16} color="#4e453e" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: "1px solid #d1c4bb" }}>
          <span style={{ ...F, fontSize: 14, color: "#4e453e" }}>Showing 1 to {filtered.length} of 45 results</span>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded text-sm" style={{ ...F, border: "1px solid #d1c4bb", color: "#4e453e" }}>Prev</button>
            <button className="px-4 py-1.5 rounded text-sm" style={{ ...F, border: "1px solid #d1c4bb", color: "#4e453e" }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Users ─────────────────────────────────────────────────────────────────────
const userRows = [
  { initials: "EJ", color: "#d97706", name: "Eleanor James", email: "eleanor.j@example.com", role: "Customer", status: "Active", lastLogin: "Oct 24, 2024" },
  { initials: "MW", color: "#6b5948", name: "Marcus Webb", email: "m.webb@lumosaura.com", role: "Admin", status: "Active", lastLogin: "Oct 25, 2024" },
  { initials: "SC", color: "#9ca3af", name: "Sarah Chen", email: "sarah.c88@example.com", role: "Customer", status: "Suspended", lastLogin: "Sep 12, 2024" },
  { initials: "DT", color: "#4e453e", name: "David Torres", email: "dtorres@example.com", role: "Customer", status: "Active", lastLogin: "Oct 20, 2024" },
];

function UsersSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Users</h1>
          <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Manage customer and administrative accounts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg" style={{ border: "1px solid #d1c4bb", ...F, fontSize: 14, color: "#4e453e" }}>
            <Download size={14} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
            <Plus size={14} /> Add User
          </button>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: "1px solid #d1c4bb" }}>
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#4e453e" />
            <input placeholder="Find users by name or email..." className="w-full pl-9 pr-4 py-2 rounded-lg outline-none text-sm"
              style={{ border: "1px solid #d1c4bb", ...F, color: "#4e453e", backgroundColor: "white" }} />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm" style={{ border: "1px solid #d1c4bb", ...F, color: "#1e1b18" }}>
            Update Role <ChevronRight size={14} />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #d1c4bb" }}>
              <th className="w-10 px-6 py-3" />
              {["NAME", "EMAIL", "ROLE", "ACCOUNT STATUS", "LAST LOGIN", "ACTIONS"].map(h => (
                <th key={h} className="px-4 py-3 text-left" style={{ ...F, fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userRows.map((u, i) => (
              <tr key={u.email} style={{ borderBottom: i < userRows.length - 1 ? "1px solid rgba(209,196,187,0.4)" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.1)]">
                <td className="px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb" }} /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: u.color }}>
                      <span style={{ ...F, fontWeight: 600, fontSize: 13, color: "white" }}>{u.initials}</span>
                    </div>
                    <span style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{u.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{u.email}</td>
                <td className="px-4 py-4"><Badge label={u.role} color={u.role === "Admin" ? "brown" : "gray"} /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: u.status === "Active" ? "#4ade80" : "#f87171" }} />
                    <Badge label={u.status} color={u.status === "Active" ? "green" : "red"} />
                  </div>
                </td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{u.lastLogin}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded hover:bg-[#f5ece7]"><Pencil size={14} color="#4e453e" /></button>
                    <button className="p-1.5 rounded hover:bg-[#fee2e2]"><Trash2 size={14} color="#4e453e" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: "1px solid #d1c4bb" }}>
          <span style={{ ...F, fontSize: 14, color: "#4e453e" }}>Showing 1 to 4 of 128 results</span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><ChevronLeft size={14} color="#4e453e" /></button>
            <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><ChevronRight size={14} color="#4e453e" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Vouchers ──────────────────────────────────────────────────────────────────
const voucherUsageData = [
  { d: "Mar 1", v: 400 }, { d: "Mar 2", v: 650 }, { d: "Mar 3", v: 900 },
  { d: "Mar 4", v: 800 }, { d: "Mar 5", v: 1500 }, { d: "Mar 6", v: 1900 }, { d: "Mar 7", v: 1700 },
];
const voucherRows = [
  { code: "SPRING24", type: "% 20% Off", validity: "Mar 1 – Apr 30, 2024", usage: "1,205 /5,000", status: "Active" },
  { code: "WELCOME_AURA", type: "$ $50 Fixed", validity: "Ongoing", usage: "8,430 /∞", status: "Active" },
  { code: "VIP_GIFT_Q1", type: "🎁 Free Item", validity: "Jan 1 – Mar 31, 2024", usage: "500 /500", status: "Exhausted" },
  { code: "SUMMER_PREVIEW", type: "% 15% Off", validity: "May 1 – Jun 30, 2024", usage: "0 /10,000", status: "Scheduled" },
];

function VouchersSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Voucher Management</h1>
          <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Track active campaigns and generate new promotion codes.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
          <Plus size={14} /> Create Voucher
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2 rounded-xl p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
          <div className="flex items-center justify-between mb-4">
            <p style={{ ...F, fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#1e1b18" }}>CAMPAIGN USAGE TRENDS</p>
            <span className="px-3 py-1 rounded text-sm" style={{ ...F, backgroundColor: "#fef9c3", color: "#854d0e" }}>Last 30 Days</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={voucherUsageData} barSize={30}>
              <XAxis key="voucher-xaxis" dataKey="d" tick={{ fontSize: 11, fill: "#4e453e" }} axisLine={false} tickLine={false} />
              <Tooltip key="voucher-tooltip" />
              <Bar key="voucher-bar" dataKey="v" fill="#6b5948" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Stats */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-5" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            <p style={{ ...F, fontWeight: 600, fontSize: 12, letterSpacing: "0.7px", color: "#4e453e" }}>TOTAL REDEMPTIONS</p>
            <div className="flex items-end gap-2 mt-2">
              <p style={{ ...PF, fontSize: 36, color: "#1e1b18" }}>14,208</p>
              <span className="text-sm mb-1" style={{ ...F, color: "#16a34a" }}>↑12%</span>
            </div>
          </div>
          <div className="rounded-xl p-5" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            <p style={{ ...F, fontWeight: 600, fontSize: 12, letterSpacing: "0.7px", color: "#4e453e" }}>ACTIVE CAMPAIGNS</p>
            <p style={{ ...PF, fontSize: 36, color: "#1e1b18", marginTop: 8 }}>8</p>
            <p style={{ ...F, fontSize: 12, color: "#4e453e" }}>Expiring soon: 2</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #d1c4bb" }}>
          <p style={{ ...F, fontWeight: 600, fontSize: 13, letterSpacing: "0.7px", color: "#1e1b18" }}>ACTIVE & SCHEDULED VOUCHERS</p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><Settings size={14} color="#4e453e" /></button>
            <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><Download size={14} color="#4e453e" /></button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ borderBottom: "1px solid #d1c4bb" }}>
              {["CODE", "TYPE / VALUE", "VALIDITY PERIOD", "USAGE", "STATUS"].map(h => (
                <th key={h} className="px-6 py-3 text-left" style={{ ...F, fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {voucherRows.map((v, i) => (
              <tr key={v.code} style={{ borderBottom: i < voucherRows.length - 1 ? "1px solid rgba(209,196,187,0.4)" : "none" }}>
                <td className="px-6 py-4" style={{ ...F, fontWeight: 600, fontSize: 14, color: "#1e1b18" }}>{v.code}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{v.type}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{v.validity}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{v.usage}</td>
                <td className="px-6 py-4">
                  <Badge label={v.status} color={v.status === "Active" ? "green" : v.status === "Exhausted" ? "red" : "blue"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviewCards = [
  {
    img: imgReview1,
    product: "Celestial Amber Eau de Parfum",
    order: "Order #ORD-8821",
    date: "Oct 24, 2024",
    badge: { label: "Pending", color: "yellow" as const },
    reviewer: "SJ",
    reviewerName: "Sarah Jenkins",
    stars: 4,
    title: "Beautiful scent, but fades quickly",
    text: "The initial notes of amber and sandalwood are absolutely heavenly. It feels very luxurious and warm when first applied. However, I noticed that...",
    actions: ["Reply to Customer", "Hide", "Approve"],
  },
  {
    img: imgReview2,
    product: "Midnight Vetiver Candle",
    order: "Order #ORD-8799",
    date: "Oct 23, 2024",
    badge: { label: "Reported (Profanity)", color: "red" as const },
    reviewer: "MD",
    reviewerName: "Michael D.",
    stars: 1,
    title: "Terrible packaging",
    text: "The candle arrived completely shattered. What kind of idiots pack glass in a single layer of bubble wrap? Absolutely f***ing ridiculous considering how much this cost.",
    actions: ["Open Support Ticket", "Delete Review"],
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? "#f59e0b" : "#d1c4bb", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

function ReviewsSection() {
  const [tab, setTab] = useState("Pending Approval");
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Moderation Queue</h1>
        <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Review and manage pending customer feedback.</p>
      </div>
      <div className="flex items-center gap-3">
        {["Pending Approval", "Reported", "All Reviews"].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ ...F, fontWeight: tab === t ? 600 : 400,
              backgroundColor: tab === t ? "#1e1b18" : "white",
              color: tab === t ? "white" : "#4e453e",
              border: "1px solid #d1c4bb" }}>
            {t}
          </button>
        ))}
        <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm"
          style={{ border: "1px solid #d1c4bb", ...F, color: "#4e453e" }}>
          <Settings size={14} /> More Filters
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {reviewCards.map((r, idx) => (
          <div key={idx} className="rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            {/* Product */}
            <div className="flex items-center gap-3">
              <img src={r.img} alt={r.product} className="w-14 h-14 rounded-lg object-cover" style={{ backgroundColor: "#efe6e2" }} />
              <div className="flex-1 min-w-0">
                <p style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{r.product}</p>
                <p style={{ ...F, fontSize: 12, color: "#4e453e" }}>{r.order} · {r.date}</p>
              </div>
              <Badge label={r.badge.label} color={r.badge.color} />
            </div>
            {/* Reviewer */}
            <div className="rounded-lg p-3" style={{ backgroundColor: "#f5ece7" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#6b5948" }}>
                    <span style={{ ...F, fontWeight: 600, fontSize: 11, color: "white" }}>{r.reviewer}</span>
                  </div>
                  <div>
                    <p style={{ ...F, fontWeight: 500, fontSize: 13, color: "#1e1b18" }}>{r.reviewerName}</p>
                    <p style={{ ...F, fontSize: 11, color: "#7f756d" }}>Verified Buyer</p>
                  </div>
                </div>
                <Stars count={r.stars} />
              </div>
              <p style={{ ...F, fontWeight: 600, fontSize: 13, color: "#1e1b18", marginBottom: 4 }}>{r.title}</p>
              <p style={{ ...F, fontSize: 13, color: "#4e453e", lineHeight: "20px" }}>{r.text}</p>
            </div>
            {/* Actions */}
            <div className="flex items-center gap-2 pt-1" style={{ borderTop: "1px solid #efe6e2" }}>
              {r.actions.map((a) => {
                const isApprove = a === "Approve";
                const isDelete = a === "Delete Review";
                return (
                  <button key={a}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm hover:opacity-80 transition-opacity"
                    style={{
                      ...F,
                      border: isApprove ? "none" : "1px solid #d1c4bb",
                      backgroundColor: isApprove ? "#6b5948" : isDelete ? "#fee2e2" : "white",
                      color: isApprove ? "white" : isDelete ? "#991b1b" : "#4e453e",
                    }}>
                    {isApprove && <Check size={12} />}
                    {isDelete && <Trash2 size={12} />}
                    {a}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><ChevronLeft size={14} color="#4e453e" /></button>
        {[1, 2, 3, "..."].map((p, i) => (
          <button key={i} className="w-8 h-8 rounded text-sm flex items-center justify-center"
            style={{ ...F, border: "1px solid #d1c4bb", backgroundColor: p === 1 ? "#1e1b18" : "white", color: p === 1 ? "white" : "#4e453e" }}>
            {p}
          </button>
        ))}
        <button className="p-1.5 rounded" style={{ border: "1px solid #d1c4bb" }}><ChevronRight size={14} color="#4e453e" /></button>
      </div>
    </div>
  );
}

// ── Policies ──────────────────────────────────────────────────────────────────
const policyVersions = [
  { label: "Current Draft", dot: "#22c55e", time: "Just now", desc: "Edited by Admin User" },
  { label: "Published Version (v2.4)", dot: "#6b5948", time: "Oct 12, 2023", desc: "Updated international shipping rates" },
  { label: "Version 2.3", dot: "#d1c4bb", time: "Sep 05, 2023", desc: "Added expedited shipping options" },
  { label: "Version 2.0", dot: "#d1c4bb", time: "Jan 15, 2023", desc: "Major formatting overhaul" },
];

const defaultPolicyContent = `Domestic Shipping (US)

At Lumos Aura, we treat every order with the same care and precision as our craft. Standard shipping (3-5 business days) is complimentary on all orders over $150. For expedited needs, we offer 2-Day Air ($25) and Next Day Delivery ($40).

Please note that due to the delicate nature of our glass vessels and ambient liquid formulas, all shipments are temperature-controlled and require a signature upon delivery to ensure safe arrival.

International Shipping

We currently ship to select international destinations. Shipping rates and delivery times vary by region and are calculated at checkout. Duties and taxes are the responsibility of the recipient.

  • Canada: 5-7 business days
  • UK & EU: 7-10 business days
  • Asia Pacific: 10-14 business days`;

function PoliciesSection() {
  const [content, setContent] = useState(defaultPolicyContent);
  const [title, setTitle] = useState("Shipping Policy");
  const [slug, setSlug] = useState("shipping");
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ ...F, color: "#4e453e" }}>
        <span>Content</span>
        <ChevronRight size={14} />
        <span style={{ color: "#1e1b18" }}>Policies</span>
      </div>

      <div className="flex items-center justify-between">
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Edit Shipping Policy</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg"
            style={{ border: "1px solid #d1c4bb", ...F, fontSize: 14, color: "#4e453e" }}>
            <Eye size={14} /> Preview
          </button>
          <button
            onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
            {saved ? <><Check size={14} /> Saved!</> : <><Settings size={14} /> Publish Changes</>}
          </button>
        </div>
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 300px" }}>
        {/* Editor */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #d1c4bb" }}>
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap" style={{ backgroundColor: "#fbf2ed", borderBottom: "1px solid #d1c4bb" }}>
            <select className="text-sm rounded px-2 py-1 outline-none" style={{ ...F, border: "1px solid #d1c4bb", backgroundColor: "white", color: "#1e1b18" }}>
              <option>Normal text</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
            </select>
            {["B", "I", "U"].map(btn => (
              <button key={btn} className="w-7 h-7 rounded flex items-center justify-center text-sm font-bold hover:bg-[#e9e1dc]"
                style={{ ...F, border: "1px solid transparent", color: "#1e1b18" }}>{btn}</button>
            ))}
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full p-6 outline-none resize-none"
            style={{ ...F, fontSize: 15, color: "#1e1b18", lineHeight: "26px", minHeight: 400, backgroundColor: "white" }}
          />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl p-5" style={{ border: "1px solid #d1c4bb", backgroundColor: "white" }}>
            <div className="flex items-center gap-2 mb-4">
              <Settings size={15} color="#4e453e" />
              <p style={{ ...F, fontWeight: 600, fontSize: 14, color: "#1e1b18" }}>Page Settings</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label style={{ ...F, fontSize: 12, color: "#4e453e", display: "block", marginBottom: 6 }}>Page Title</label>
                <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 rounded-lg outline-none text-sm"
                  style={{ border: "1px solid #d1c4bb", ...F, color: "#1e1b18" }} />
              </div>
              <div>
                <label style={{ ...F, fontSize: 12, color: "#4e453e", display: "block", marginBottom: 6 }}>URL Slug</label>
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid #d1c4bb" }}>
                  <span className="px-3 py-2 text-sm" style={{ ...F, color: "#7f756d", backgroundColor: "#f5ece7", borderRight: "1px solid #d1c4bb" }}>/policies/</span>
                  <input value={slug} onChange={e => setSlug(e.target.value)} className="flex-1 px-3 py-2 outline-none text-sm"
                    style={{ ...F, color: "#1e1b18" }} />
                </div>
              </div>
              <div>
                <label style={{ ...F, fontSize: 12, color: "#4e453e", display: "block", marginBottom: 6 }}>Status</label>
                <select className="w-full px-3 py-2 rounded-lg outline-none text-sm"
                  style={{ border: "1px solid #d1c4bb", ...F, color: "#1e1b18" }}>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ border: "1px solid #d1c4bb", backgroundColor: "white" }}>
            <p style={{ ...F, fontWeight: 600, fontSize: 14, color: "#1e1b18", marginBottom: 16 }}>⏱ Version History</p>
            <div className="flex flex-col gap-3">
              {policyVersions.map((v) => (
                <div key={v.label} className="flex gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: v.dot }} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p style={{ ...F, fontWeight: 500, fontSize: 13, color: "#1e1b18" }}>{v.label}</p>
                      <p style={{ ...F, fontSize: 11, color: "#7f756d" }}>{v.time}</p>
                    </div>
                    <p style={{ ...F, fontSize: 12, color: "#4e453e" }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main AdminPanel ───────────────────────────────────────────────────────────
export function AdminPanel() {
  const [section, setSection] = useState<AdminSection>("dashboard");

  const searchPlaceholders: Record<AdminSection, string> = {
    dashboard: "Search dashboard...",
    products: "Search across dashboard...",
    orders: "Search orders...",
    users: "Search across Lumos Aura...",
    vouchers: "Search Vouchers...",
    reviews: "Search reviews, products, or customers...",
    policies: "Search across command center...",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fff8f5" }}>
      <Sidebar active={section} setActive={setSection} />
      <TopHeader placeholder={searchPlaceholders[section]} />
      <main className="pl-64 pt-16">
        <div className="p-8 max-w-[1200px]">
          {section === "dashboard" && <DashboardSection onViewOrders={() => setSection("orders")} />}
          {section === "products" && <ProductsSection />}
          {section === "orders" && <OrdersSection />}
          {section === "users" && <UsersSection />}
          {section === "vouchers" && <VouchersSection />}
          {section === "reviews" && <ReviewsSection />}
          {section === "policies" && <PoliciesSection />}
        </div>
      </main>
    </div>
  );
}

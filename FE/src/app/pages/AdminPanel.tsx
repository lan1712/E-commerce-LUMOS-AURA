import { useState, useEffect, useMemo } from "react";
import { productsApi } from "../api";
import { formatPrice } from "../data";
import imgAdminAvatar from "../../assets/admin/admin-avatar.png";
import { useAuth, useNav } from "../context";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Ticket, Star, FileText,
  Search, Bell, Settings, TrendingUp, TrendingDown, MoreVertical,
  Plus, Download, Eye, Pencil, Trash2, Check, X, ChevronLeft, ChevronRight,
  LogOut, UploadCloud, Image as ImageIcon, Tag, Gift, Flame, Save, ListFilter,
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

function formatAdminMoney(value: unknown) {
  if (typeof value === "number") return formatPrice(value);
  const text = String(value ?? "");
  if (!text.includes("$")) return text;

  const isCompact = /k\s*$/i.test(text.trim());
  const numeric = Number(text.replace(/[$,\s]|k/gi, ""));
  if (Number.isNaN(numeric)) return text.replaceAll("$", "");

  return formatPrice(isCompact ? numeric * 1000 : numeric);
}

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
    <aside className="relative z-20 flex w-full flex-col gap-4 px-4 py-4 lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 lg:px-0 lg:py-8"
      style={{ backgroundColor: "#fbf2ed", borderRight: "1px solid #d1c4bb" }}>
      {/* Brand */}
      <div className="px-2 lg:px-6 lg:pb-8">
        <p style={{ ...PF, fontWeight: 700, fontSize: "clamp(22px, 6vw, 28px)", color: "#6b5948", lineHeight: "1.18" }}>
          Lumos Aura<br />Command
        </p>
        <p style={{ ...F, fontWeight: 600, fontSize: 13, color: "#4e453e", marginTop: 4 }}>System Administrator</p>
      </div>

      {/* Nav */}
      <nav className="flex gap-2 overflow-x-auto px-0 pb-1 lg:flex-1 lg:flex-col lg:gap-1 lg:px-2 lg:pb-0">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors hover:opacity-90 lg:w-full"
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
      <div className="hidden px-6 pt-4 lg:block" style={{ borderTop: "1px solid rgba(209,196,187,0.3)" }}>
        <div className="flex items-center gap-3">
          <img src={imgAdminAvatar} alt="Admin" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <p style={{ ...F, fontWeight: 600, fontSize: 13, color: "#1e1b18" }}>{user?.firstName || "Admin"} {user?.lastName || "User"}</p>
            <p style={{ ...F, fontSize: 11, color: "#4e453e" }}>{user?.email || "admin"}</p>
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { user, logout } = useAuth();
  const { navigate } = useNav();

  const handleLogout = () => {
    logout();
    navigate("home");
  };

  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-3 px-4 py-3 lg:fixed lg:left-64 lg:right-0 lg:h-16 lg:px-6 lg:py-0"
      style={{ backgroundColor: "#fff8f5", borderBottom: "1px solid #d1c4bb" }}>
      <div className="relative w-full max-w-xs">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#4e453e" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2 rounded-lg outline-none text-sm"
          style={{ backgroundColor: "#f5ece7", ...F, color: "#4e453e", border: "1px solid #d1c4bb" }}
        />
      </div>
      <div className="relative flex shrink-0 items-center gap-2">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
            className="p-2 rounded-full hover:bg-[#f5ece7] transition-colors relative"
          >
            <Bell size={18} color="#4e453e" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-gray-100 bg-[#fbf2ed]">
                <h3 className="font-semibold text-sm" style={{ color: "#1e1b18", ...F }}>Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium" style={{ color: "#1e1b18", ...F }}>New Order #ORD-0922</p>
                  <p className="text-xs text-gray-500 mt-1" style={F}>Eleanor Vance placed a new order.</p>
                  <p className="text-[10px] text-gray-400 mt-1" style={F}>5 mins ago</p>
                </div>
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium" style={{ color: "#1e1b18", ...F }}>Low Stock Alert</p>
                  <p className="text-xs text-gray-500 mt-1" style={F}>"Luminous Serum" is running low (3 left).</p>
                  <p className="text-[10px] text-gray-400 mt-1" style={F}>2 hours ago</p>
                </div>
                <div className="px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                  <p className="text-sm font-medium" style={{ color: "#1e1b18", ...F }}>New User Registered</p>
                  <p className="text-xs text-gray-500 mt-1" style={F}>Sarah Connor just created an account.</p>
                  <p className="text-[10px] text-gray-400 mt-1" style={F}>1 day ago</p>
                </div>
              </div>
              <div className="px-4 py-2 text-center border-t border-gray-100">
                <button className="text-xs font-medium hover:underline" style={{ color: "#6b5948", ...F }}>View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
            className="flex items-center hover:opacity-80 transition-opacity focus:outline-none"
          >
            <img src={imgAdminAvatar} alt="Admin" className="w-8 h-8 rounded-full object-cover ml-2 border border-gray-200" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 py-1">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold truncate" style={{ color: "#1e1b18", ...F }}>{user?.firstName || "Admin"} {user?.lastName || ""}</p>
                <p className="text-xs text-gray-500 truncate" style={F}>{user?.email}</p>
              </div>
              <button 
                onClick={() => navigate("home")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                style={{ color: "#4e453e", ...F }}
              >
                <LayoutDashboard size={14} /> Go to Store
              </button>
              <button 
                onClick={() => navigate("account")}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                style={{ color: "#4e453e", ...F }}
              >
                <Settings size={14} /> Account Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                style={F}
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Close dropdowns when clicking outside (simple overlay) */}
      {(isProfileOpen || isNotifOpen) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => { setIsProfileOpen(false); setIsNotifOpen(false); }}
        />
      )}
    </header>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function DashboardSection({ onViewOrders }: { onViewOrders: () => void }) {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("../api").then(({ dashboardApi }) => {
      dashboardApi.getStats()
        .then(setStats)
        .catch(console.error)
        .finally(() => setLoading(false));
    });
  }, []);

  const metrics = stats?.metrics || [];
  const revenueData = stats?.revenueData || [];
  const topSellers = stats?.topSellers || [];
  const recentOrders = stats?.recentOrders || [];
  const statusColor = (s: string) => s === "Shipped" ? "green" : s === "Processing" ? "yellow" : "gray";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Dashboard Overview</h1>
        <p style={{ ...F, fontSize: 15, color: "#4e453e", marginTop: 4 }}>Welcome back. Here is the latest operational data for Lumos Aura.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-lg p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            <div className="flex items-start justify-between mb-2">
              <p style={{ ...F, fontWeight: 600, fontSize: 12, letterSpacing: "0.7px", color: "#4e453e" }}>{m.label}</p>
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: "#e9e1dc" }}>
                <TrendingUp size={16} color="#6b5948" />
              </div>
            </div>
            <p style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>{m.label === "REVENUE" ? formatAdminMoney(m.value) : m.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {m.up ? <TrendingUp size={12} color="#16a34a" /> : <TrendingDown size={12} color="#dc2626" />}
              <span style={{ ...F, fontSize: 13, fontWeight: 500, color: m.up ? "#16a34a" : "#dc2626" }}>{m.change}</span>
              <span style={{ ...F, fontSize: 13, color: "#4e453e" }}>vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 xl:grid-cols-3 xl:gap-6">
        <div className="rounded-lg p-4 sm:p-6 xl:col-span-2" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
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
        <div className="rounded-lg p-4 sm:p-6" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
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
        <div className="overflow-x-auto">
        <table className="w-full min-w-[680px]">
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
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#1e1b18" }}>{formatAdminMoney(o.amount)}</td>
                <td className="px-4 py-4">
                  <Badge label={o.status} color={statusColor(o.status) as "green" | "yellow" | "gray"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

// ── Products ──────────────────────────────────────────────────────────────────
type ProductEditorTab = "basic" | "pricing" | "images" | "details" | "inventory";

const emptyProductForm = {
  name: "",
  slug: "",
  price: "",
  category: "Core Collection",
  description: "",
  scentNotes: "",
  details: "",
  image: "",
  thumbnails: [] as string[],
  burnTime: "",
  burnHours: "",
  size: "",
  tags: "",
  active: true,
};

const normalizeProductCategory = (category?: string) => {
  if (category === "Gift Sets") return "Gift Collection";
  if (category === "Home Fragrance" || category === "Eau de Parfum") return "Core Collection";
  return category || "Core Collection";
};

function ProductEditor({
  product,
  onCancel,
  onSaved,
}: {
  product?: any;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [tab, setTab] = useState<ProductEditorTab>("basic");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(() => product ? {
    name: product.name ?? "",
    slug: product.slug ?? product.id ?? "",
    price: product.price?.toString() ?? "",
    category: normalizeProductCategory(product.category),
    description: product.description ?? "",
    scentNotes: product.scentNotes ?? "",
    details: product.details ?? "",
    image: product.image ?? "",
    thumbnails: product.thumbnails ?? [],
    burnTime: product.burnTime ?? "",
    burnHours: product.burnHours?.toString() ?? "",
    size: product.size ?? "",
    tags: (product.tags ?? []).join(", "),
    active: true,
  } : emptyProductForm);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const generateSlug = (name: string) =>
    name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleNameChange = (name: string) => {
    setForm((current) => ({
      ...current,
      name,
      slug: current.slug && product ? current.slug : generateSlug(name),
    }));
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setError("");
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        const result = await productsApi.uploadImage(file);
        urls.push(result.url);
      }
      setForm((current) => ({
        ...current,
        image: current.image || urls[0],
        thumbnails: Array.from(new Set([...current.thumbnails, ...urls])),
      }));
    } catch (uploadError) {
      setError((uploadError as Error).message || "Could not upload images.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setForm((current) => {
      const thumbnails = current.thumbnails.filter((item) => item !== url);
      return { ...current, thumbnails, image: current.image === url ? (thumbnails[0] ?? "") : current.image };
    });
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim() || !form.category) {
      setError("Product name, slug and category are required.");
      setTab("basic");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError("Selling price must be greater than 0.");
      setTab("pricing");
      return;
    }

    setSaving(true);
    setError("");
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      price: Number(form.price),
      category: form.category,
      description: form.description.trim(),
      scentNotes: form.scentNotes.trim(),
      details: form.details.trim(),
      image: form.image,
      thumbnails: form.thumbnails,
      burnTime: form.burnTime.trim(),
      burnHours: form.burnHours ? Number(form.burnHours) : null,
      size: form.size.trim(),
      tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      active: form.active,
    };

    try {
      if (product) await productsApi.update(product.dbId, payload);
      else await productsApi.create(payload);
      onSaved();
    } catch (saveError) {
      setError((saveError as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const tabs: { key: ProductEditorTab; label: string }[] = [
    { key: "basic", label: "Basic Information" },
    { key: "pricing", label: "Variants & Pricing" },
    { key: "images", label: "Images" },
    { key: "details", label: "Details & SEO" },
    { key: "inventory", label: "Inventory" },
  ];
  const tabOrder: ProductEditorTab[] = ["basic", "pricing", "images", "details", "inventory"];
  const currentTabIndex = tabOrder.indexOf(tab);
  const isLastTab = currentTabIndex === tabOrder.length - 1;
  const handleContinue = () => {
    if (isLastTab) {
      handleSave();
      return;
    }
    setError("");
    setTab(tabOrder[currentTabIndex + 1]);
  };

  const fieldClass = "h-11 w-full rounded-md border border-[#d8ccc4] bg-white px-3 text-sm outline-none transition-colors focus:border-[#80664f]";
  const labelClass = "mb-2 block text-[12px] font-semibold text-[#403832]";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>{product ? "Edit Product" : "Add New Product"}</h1>
          <div className="mt-2 flex items-center gap-2 text-xs text-[#7f756d]">
            <button onClick={onCancel}>Dashboard</button><ChevronRight size={12} />
            <button onClick={onCancel}>Products</button><ChevronRight size={12} />
            <span>{product ? "Edit" : "Add New"}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel} className="h-10 rounded-md border border-[#d8ccc4] bg-white px-5 text-sm font-semibold text-[#4e453e]">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex h-10 items-center gap-2 rounded-md bg-[#6b5948] px-5 text-sm font-semibold text-white disabled:opacity-50">
            <Save size={15} /> {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {error && <div className="rounded-md border border-[#efc8c0] bg-[#fff3f0] px-4 py-3 text-sm text-[#9b3f31]">{error}</div>}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-hidden rounded-lg border border-[#ddd2ca] bg-white">
          <div className="flex overflow-x-auto border-b border-[#e5dcd5] px-6">
            {tabs.map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key)}
                className="h-16 shrink-0 border-b-2 px-4 text-[13px] font-semibold"
                style={{ borderColor: tab === item.key ? "#80664f" : "transparent", color: tab === item.key ? "#5c4837" : "#6f6964" }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === "basic" && (
              <div className="grid gap-x-7 gap-y-6 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Product Name *</label>
                  <input value={form.name} onChange={(e) => handleNameChange(e.target.value)} maxLength={150} placeholder="Enter product name" className={fieldClass} />
                  <p className="mt-1 text-right text-[11px] text-[#9a918a]">{form.name.length}/150</p>
                </div>
                <div>
                  <label className={labelClass}>Category *</label>
                  <select value={form.category} onChange={(e) => update("category", e.target.value)} className={fieldClass}>
                    <option>Core Collection</option>
                    <option>Gift Collection</option>
                    <option>Accessories</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Slug (URL) *</label>
                  <input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="product-url" className={fieldClass} />
                  <p className="mt-1 text-[11px] text-[#9a918a]">Auto-generated from product name</p>
                </div>
                <div>
                  <label className={labelClass}>Product Type</label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {[
                      { value: "Core Collection", label: "Candle", icon: Flame },
                      { value: "Gift Collection", label: "Gift Set", icon: Gift },
                      { value: "Accessories", label: "Accessory", icon: Tag },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => update("category", value)}
                        className="flex h-11 items-center justify-center gap-2 rounded-md border text-xs font-semibold"
                        style={{ borderColor: form.category === value ? "#80664f" : "#ddd2ca", backgroundColor: form.category === value ? "#faf5f1" : "#fff", color: "#4e453e" }}
                      >
                        <Icon size={15} /> {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Short Description</label>
                  <textarea value={form.description} onChange={(e) => update("description", e.target.value)} maxLength={255} placeholder="A short summary about the product..." className="min-h-24 w-full resize-none rounded-md border border-[#d8ccc4] p-3 text-sm outline-none focus:border-[#80664f]" />
                  <p className="mt-1 text-right text-[11px] text-[#9a918a]">{form.description.length}/255</p>
                </div>
                <div>
                  <label className={labelClass}>Mood / Scent Notes</label>
                  <input value={form.scentNotes} onChange={(e) => update("scentNotes", e.target.value)} placeholder="e.g. Vanilla, sandalwood, musk" className={fieldClass} />
                  <label className={`${labelClass} mt-5`}>Tags</label>
                  <input value={form.tags} onChange={(e) => update("tags", e.target.value)} placeholder="Relaxing, Cozy, Floral" className={fieldClass} />
                </div>
              </div>
            )}

            {tab === "pricing" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div><label className={labelClass}>Selling Price (VND) *</label><input type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="269000" className={fieldClass} /></div>
                <div><label className={labelClass}>Size / Variant</label><input value={form.size} onChange={(e) => update("size", e.target.value)} placeholder="220g, 3 x 70g..." className={fieldClass} /></div>
                <div><label className={labelClass}>Burn Time</label><input value={form.burnTime} onChange={(e) => update("burnTime", e.target.value)} placeholder="40-50 hours" className={fieldClass} /></div>
                <div><label className={labelClass}>Minimum Burn Hours</label><input type="number" min="0" value={form.burnHours} onChange={(e) => update("burnHours", e.target.value)} placeholder="40" className={fieldClass} /></div>
              </div>
            )}

            {tab === "images" && (
              <div>
                <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#cfc0b5] bg-[#fffaf7] text-center">
                  <UploadCloud size={34} color="#6b5948" />
                  <span className="mt-3 text-sm font-semibold text-[#403832]">{uploading ? "Uploading images..." : "Drag & drop images here or click to browse"}</span>
                  <span className="mt-2 text-xs text-[#91877f]">PNG, JPG or WEBP</span>
                  <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
                </label>
              </div>
            )}

            {tab === "details" && (
              <div>
                <label className={labelClass}>Long Description</label>
                <textarea value={form.details} onChange={(e) => update("details", e.target.value)} placeholder="Write detailed information about the product..." className="min-h-64 w-full resize-y rounded-md border border-[#d8ccc4] p-4 text-sm leading-6 outline-none focus:border-[#80664f]" />
                <p className="mt-3 text-xs text-[#91877f]">The product name and slug are used for search previews and product URLs.</p>
              </div>
            )}

            {tab === "inventory" && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-[#e3dad3] p-5">
                  <p className="text-sm font-semibold text-[#403832]">Product status</p>
                  <p className="mt-1 text-xs text-[#91877f]">Inactive products remain in the database but are hidden from customers.</p>
                  <button onClick={() => update("active", !form.active)} className="mt-5 flex items-center gap-3 text-sm font-semibold text-[#4e453e]">
                    <span className="relative h-6 w-11 rounded-full transition-colors" style={{ backgroundColor: form.active ? "#80664f" : "#d7d7d7" }}>
                      <span className="absolute top-1 h-4 w-4 rounded-full bg-white transition-all" style={{ left: form.active ? 23 : 4 }} />
                    </span>
                    {form.active ? "Active" : "Inactive"}
                  </button>
                </div>
                <div className="rounded-lg border border-[#e3dad3] p-5">
                  <p className="text-sm font-semibold text-[#403832]">SKU</p>
                  <p className="mt-2 font-mono text-sm text-[#6b5948]">{form.slug ? form.slug.toUpperCase().replace(/-/g, "_") : "AUTO_GENERATED"}</p>
                  <p className="mt-3 text-xs text-[#91877f]">Stock quantity is managed on the default product variant in the database.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-lg border border-[#ddd2ca] bg-white p-5">
            <h2 className="text-sm font-bold text-[#302923]">Product Images</h2>
            <label className="mt-5 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#cfc0b5] text-center">
              <UploadCloud size={28} color="#6b5948" />
              <span className="mt-2 text-xs font-semibold text-[#4e453e]">{uploading ? "Uploading..." : "Click to upload images"}</span>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
            </label>
            <p className="mt-4 text-[11px] text-[#91877f]">Select an image below to use it as the main thumbnail.</p>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {form.thumbnails.map((url) => (
                <div key={url} className="group relative aspect-square overflow-hidden rounded-md border" style={{ borderColor: form.image === url ? "#80664f" : "#e3dad3" }}>
                  <button onClick={() => update("image", url)} className="h-full w-full"><img src={url} alt="" className="h-full w-full object-cover" /></button>
                  <button onClick={() => removeImage(url)} className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-white shadow group-hover:flex"><X size={11} /></button>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-[#eee6e0] pt-4">
              <p className="text-xs font-semibold text-[#403832]">Thumbnail / Main Image</p>
              <div className="mt-3 flex items-center gap-3 rounded-md border border-[#e3dad3] p-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#f5ece7]">
                  {form.image ? <img src={form.image} alt="" className="h-full w-full object-cover" /> : <ImageIcon size={20} color="#aa9d94" />}
                </div>
                <div className="min-w-0"><p className="truncate text-xs font-semibold text-[#403832]">{form.image ? "Main image selected" : "No image selected"}</p><p className="mt-1 text-[11px] text-[#91877f]">Used as product thumbnail</p></div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#ddd2ca] bg-white p-5">
            <h2 className="text-sm font-bold text-[#302923]">Quick Info</h2>
            <dl className="mt-4 grid grid-cols-[110px_1fr] gap-y-3 text-xs">
              <dt className="text-[#7f756d]">Mode</dt><dd className="font-medium text-[#403832]">{product ? "Editing" : "New product"}</dd>
              <dt className="text-[#7f756d]">Category</dt><dd className="font-medium text-[#403832]">{form.category}</dd>
              <dt className="text-[#7f756d]">SKU (Auto)</dt><dd className="truncate font-mono text-[#403832]">{form.slug || "-"}</dd>
            </dl>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#ddd2ca] bg-white p-5">
        <div><p className="text-sm font-semibold text-[#403832]">Next Step</p><p className="mt-1 text-xs text-[#91877f]">Complete each tab, then save the product to publish it in the catalog.</p></div>
        <button onClick={handleContinue} disabled={saving} className="h-10 rounded-md bg-[#80664f] px-5 text-sm font-semibold text-white disabled:opacity-50">
          {isLastTab ? (saving ? "Saving..." : "Save Product") : "Continue"}
          {!isLastTab && <ChevronRight size={14} className="ml-1 inline" />}
        </button>
      </div>
    </div>
  );
}

function ProductsSection() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await productsApi.list();
      setProducts(data);
    } catch (e) {
      console.error(e);
    }
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category).filter(Boolean))) as string[],
    [products],
  );

  const collections = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.tags ?? []).filter(Boolean))).sort() as string[],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const searchable = [product.name, product.slug, product.category, ...(product.tags ?? [])].join(" ").toLowerCase();
      if (term && !searchable.includes(term)) return false;
      if (categoryFilter !== "all" && product.category !== categoryFilter) return false;
      if (collectionFilter !== "all" && !(product.tags ?? []).includes(collectionFilter)) return false;
      if (statusFilter === "inactive") return false;
      return true;
    });
  }, [categoryFilter, collectionFilter, products, search, statusFilter]);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setCollectionFilter("all");
    setStatusFilter("all");
  };

  const hasFilters = Boolean(search || categoryFilter !== "all" || collectionFilter !== "all" || statusFilter !== "all");

  const openEditor = (product?: any) => {
    setEditingProduct(product ?? null);
    setShowEditor(true);
  };

  const handleDelete = async (p: any) => {
    if (window.confirm(`Are you sure you want to delete ${p.name}?`)) {
      try {
        await productsApi.delete(p.dbId);
        fetchProducts();
      } catch (e) {
        console.error(e);
        alert("Error deleting product.");
      }
    }
  };

  if (showEditor) {
    return <ProductEditor product={editingProduct} onCancel={() => setShowEditor(false)} onSaved={() => { setShowEditor(false); fetchProducts(); }} />;
  }

  return (
    <div className="flex flex-col gap-6 relative">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Products</h1>
        <button onClick={() => openEditor()} className="flex items-center gap-2 px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
          <Plus size={14} /> Add Product
        </button>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 px-4 py-5 sm:px-5" style={{ backgroundColor: "#fff", borderBottom: "1px solid #e2d8d1" }}>
          <div className="relative min-w-[240px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" color="#4e453e" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              className="h-11 w-full rounded-md pl-9 pr-4 outline-none text-sm"
              style={{ backgroundColor: "white", ...F, color: "#4e453e", border: "1px solid #d8ccc4" }} />
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-md border border-[#d8ccc4] bg-white" title="Product filters">
            <ListFilter size={17} color="#6b5948" />
          </button>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-11 min-w-[min(155px,100%)] flex-1 rounded-md border border-[#d8ccc4] bg-white px-3 text-sm outline-none sm:flex-none" style={F}>
            <option value="all">All categories</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select value={collectionFilter} onChange={(e) => setCollectionFilter(e.target.value)}
            className="h-11 min-w-[min(150px,100%)] flex-1 rounded-md border border-[#d8ccc4] bg-white px-3 text-sm outline-none sm:flex-none" style={F}>
            <option value="all">All collections</option>
            {collections.map((collection) => <option key={collection} value={collection}>{collection}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="h-11 min-w-[min(130px,100%)] flex-1 rounded-md border border-[#d8ccc4] bg-white px-3 text-sm outline-none sm:flex-none" style={F}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button onClick={resetFilters} disabled={!hasFilters}
            className="h-11 rounded-md border border-[#d8ccc4] bg-white px-5 text-sm font-semibold text-[#5c5048] disabled:opacity-40">
            Reset
          </button>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead>
            <tr style={{ backgroundColor: "#fbf2ed", borderBottom: "1px solid #d1c4bb" }}>
              <th className="w-12 px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb", backgroundColor: "#f5ece7" }} /></th>
              {["PRODUCT", "CATEGORY", "COLLECTIONS", "PRICE", "STATUS", "ACTIONS"].map((h, i) => (
                <th key={h} className={`px-5 py-4 text-left ${i === 5 ? "text-right" : ""}`}
                  style={{ ...F, fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p, i) => (
              <tr key={p.slug} style={{ borderTop: i > 0 ? "1px solid #d1c4bb" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.15)] transition-colors">
                <td className="px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb", backgroundColor: "#f5ece7" }} /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#efe6e2" }}>
                      {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" /> : <Package size={20} color="#d1c4bb" />}
                    </div>
                    <div>
                      <p style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{p.name}</p>
                      <p style={{ ...F, fontSize: 12, color: "#4e453e" }}>SKU: {p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4" style={{ ...F, fontSize: 13, color: "#4e453e" }}>{p.category}</td>
                <td className="px-5 py-4">
                  <div className="flex max-w-[230px] flex-wrap gap-1.5">
                    {(p.tags ?? []).slice(0, 3).map((tag: string) => (
                      <span key={tag} className="rounded-md bg-[#f5f1ee] px-2 py-1 text-[11px] text-[#655a52]">{tag}</span>
                    ))}
                    {!(p.tags ?? []).length && <span className="text-xs text-[#aaa19a]">-</span>}
                  </div>
                </td>
                <td className="px-5 py-4 whitespace-nowrap" style={{ ...F, fontWeight: 500, fontSize: 13, color: "#1e1b18" }}>{formatPrice(Number(p.price))}</td>
                <td className="px-5 py-4"><Badge label="Active" color="green" /></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 rounded hover:bg-[#f5ece7] transition-colors" title="View product"><Eye size={14} color="#4e453e" /></button>
                    <button onClick={() => openEditor(p)} className="p-1.5 rounded hover:bg-[#f5ece7] transition-colors"><Pencil size={14} color="#4e453e" /></button>
                    <button onClick={() => handleDelete(p)} className="p-1.5 rounded hover:bg-[#fee2e2] transition-colors"><Trash2 size={14} color="#4e453e" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500" style={F}>No products match the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between border-t border-[#e2d8d1] px-5 py-4">
          <p className="text-xs text-[#6f665f]">Showing {filteredProducts.length} of {products.length} products</p>
          <p className="text-xs text-[#9a918a]">{hasFilters ? "Filters applied" : "All products"}</p>
        </div>
      </div>

    </div>
  );
}

// ── Orders ────────────────────────────────────────────────────────────────────

function OrdersSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"All" | "PENDING" | "PAID" | "PROCESSING" | "COMPLETED">("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    import("../api").then(({ adminOrdersApi }) => {
      adminOrdersApi.list().then(setOrders).finally(() => setLoading(false));
    });
  };

  const handleUpdateStatus = (id: number, newStatus: string) => {
    import("../api").then(({ adminOrdersApi }) => {
      adminOrdersApi.updateStatus(id, newStatus).then(fetchOrders);
    });
  };

  const filtered = tab === "All" ? orders : orders.filter(o => o.status === tab);
  const statusColor = (s: string): "yellow" | "gray" | "green" | "blue" => ({ PROCESSING: "yellow", PENDING: "gray", COMPLETED: "green" }[s] as "yellow" | "gray" | "green") || "gray";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
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
        <div className="flex gap-0 overflow-x-auto px-4 pt-4 sm:px-6" style={{ borderBottom: "1px solid #d1c4bb" }}>
          {(["All", "PENDING", "PAID", "PROCESSING", "COMPLETED"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 pb-3 mr-2 text-sm"
              style={{ ...F, fontWeight: tab === t ? 600 : 400, color: tab === t ? "#1e1b18" : "#4e453e",
                borderBottom: tab === t ? "2px solid #6b5948" : "2px solid transparent" }}>
              {t === "All" ? "All" : t.charAt(0) + t.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr style={{ borderBottom: "1px solid #d1c4bb" }}>
              {["Order ID", "Date", "Customer", "Total", "Status", "Payment", "Action"].map(h => (
                <th key={h} className="px-6 py-3 text-left" style={{ ...F, fontSize: 13, color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-6">Loading orders...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-6">No orders found.</td></tr>
            ) : filtered.map((o, i) => (
              <tr key={o.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(209,196,187,0.4)" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.1)]">
                <td className="px-6 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{o.orderNumber}</td>
                <td className="px-6 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{new Date(o.date).toLocaleDateString()}</td>
                <td className="px-6 py-4" style={F}>
                  <div style={{ fontSize: 14, color: "#4e453e", fontWeight: 500 }}>{o.customerName}</div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{o.email}</div>
                </td>
                <td className="px-6 py-4" style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{formatPrice(Number(o.total))}</td>
                <td className="px-6 py-4">
                  <select 
                    value={o.status}
                    onChange={(e) => handleUpdateStatus(o.id, e.target.value)}
                    className="border text-xs rounded px-2 py-1 outline-none"
                    style={{ backgroundColor: "transparent", borderColor: "#d1c4bb" }}
                  >
                    <option value="PENDING">Pending</option>
                    <option value="PAID">Paid</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4"><Badge label={o.payment} color={o.payment === "Paid" ? "green" : "yellow"} /></td>
                <td className="px-6 py-4"><button className="hover:opacity-70"><Eye size={16} color="#4e453e" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-6 py-3" style={{ borderTop: "1px solid #d1c4bb" }}>
          <span style={{ ...F, fontSize: 14, color: "#4e453e" }}>Showing {filtered.length} results</span>
        </div>
      </div>
    </div>
  );
}

// ── Users ─────────────────────────────────────────────────────────────────────

function UsersSection() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", role: "USER" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    import("../api").then(({ usersApi }) => {
      usersApi.list().then(setUsers).finally(() => setLoading(false));
    });
  };

  const handleAddSubmit = () => {
    setSaving(true);
    import("../api").then(({ usersApi }) => {
      usersApi.create(formData).then(() => {
        fetchUsers();
        setIsAddModalOpen(false);
        setFormData({ firstName: "", lastName: "", email: "", password: "", role: "USER" });
      }).finally(() => setSaving(false));
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      import("../api").then(({ usersApi }) => {
        usersApi.delete(id).then(fetchUsers);
      });
    }
  };

  const handleToggleStatus = (user: any) => {
    const newStatus = user.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    import("../api").then(({ usersApi }) => {
      usersApi.updateStatus(user.id, newStatus).then(fetchUsers);
    });
  };

  const handleToggleRole = (user: any) => {
    const newRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    import("../api").then(({ usersApi }) => {
      usersApi.updateRole(user.id, newRole).then(fetchUsers);
    });
  };

  const filteredUsers = users.filter(u => 
    (u.firstName + " " + u.lastName).toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (f: string, l: string) => ((f?.[0] || "") + (l?.[0] || "")).toUpperCase() || "U";
  const getColor = (id: number) => {
    const colors = ["#d97706", "#6b5948", "#9ca3af", "#4e453e", "#059669"];
    return colors[id % colors.length];
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Users</h1>
          <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Manage customer and administrative accounts.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90"
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
              value={search} onChange={e => setSearch(e.target.value)}
              style={{ border: "1px solid #d1c4bb", ...F, color: "#4e453e", backgroundColor: "white" }} />
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[820px]">
          <thead>
            <tr style={{ borderBottom: "1px solid #d1c4bb" }}>
              <th className="w-10 px-6 py-3" />
              {["NAME", "EMAIL", "ROLE", "ACCOUNT STATUS", "LAST LOGIN", "ACTIONS"].map(h => (
                <th key={h} className="px-4 py-3 text-left" style={{ ...F, fontWeight: 700, fontSize: 11, letterSpacing: "0.6px", color: "#4e453e" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="text-center py-6">Loading users...</td></tr>
            ) : filteredUsers.length === 0 ? (
              <tr><td colSpan={7} className="text-center py-6">No users found.</td></tr>
            ) : filteredUsers.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: i < filteredUsers.length - 1 ? "1px solid rgba(209,196,187,0.4)" : "none" }}
                className="hover:bg-[rgba(233,225,220,0.1)]">
                <td className="px-6 py-4"><div className="w-4 h-4 rounded" style={{ border: "1px solid #d1c4bb" }} /></td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: getColor(u.id) }}>
                      <span style={{ ...F, fontWeight: 600, fontSize: 13, color: "white" }}>{getInitials(u.firstName, u.lastName)}</span>
                    </div>
                    <span style={{ ...F, fontWeight: 500, fontSize: 14, color: "#1e1b18" }}>{u.firstName} {u.lastName}</span>
                  </div>
                </td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{u.email}</td>
                <td className="px-4 py-4">
                  <button onClick={() => handleToggleRole(u)} className="hover:opacity-80">
                    <Badge label={u.role === "ADMIN" ? "Admin" : "Customer"} color={u.role === "ADMIN" ? "brown" : "gray"} />
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button onClick={() => handleToggleStatus(u)} className="hover:opacity-80 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: u.status === "ACTIVE" ? "#4ade80" : "#f87171" }} />
                    <Badge label={u.status === "ACTIVE" ? "Active" : "Suspended"} color={u.status === "ACTIVE" ? "green" : "red"} />
                  </button>
                </td>
                <td className="px-4 py-4" style={{ ...F, fontSize: 14, color: "#4e453e" }}>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : "Never"}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleDelete(u.id)} className="p-1.5 rounded hover:bg-[#fee2e2]"><Trash2 size={14} color="#4e453e" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="w-[min(400px,calc(100vw-32px))] rounded-xl bg-white p-5 shadow-xl sm:p-6">
            <h2 className="text-xl font-bold mb-4" style={PF}>Add New User</h2>
            <div className="flex flex-col gap-4">
              <input placeholder="First Name" className="border p-2 rounded text-sm outline-none" 
                value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
              <input placeholder="Last Name" className="border p-2 rounded text-sm outline-none" 
                value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
              <input placeholder="Email" className="border p-2 rounded text-sm outline-none" 
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input type="password" placeholder="Temporary Password" className="border p-2 rounded text-sm outline-none" 
                value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <select className="border p-2 rounded text-sm outline-none" 
                value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                <option value="USER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 rounded text-sm hover:bg-gray-100" style={F}>Cancel</button>
              <button onClick={handleAddSubmit} disabled={saving} className="px-4 py-2 rounded text-sm text-white hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: "#6b5948", ...F }}>
                {saving ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}
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
  { code: "WELCOME_AURA", type: "50.000 đ Fixed", validity: "Ongoing", usage: "8,430 /∞", status: "Active" },
  { code: "VIP_GIFT_Q1", type: "🎁 Free Item", validity: "Jan 1 – Mar 31, 2024", usage: "500 /500", status: "Exhausted" },
  { code: "SUMMER_PREVIEW", type: "% 15% Off", validity: "May 1 – Jun 30, 2024", usage: "0 /10,000", status: "Scheduled" },
];

function VouchersSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 style={{ ...PF, fontSize: 32, color: "#1e1b18" }}>Voucher Management</h1>
          <p style={{ ...F, fontSize: 14, color: "#4e453e", marginTop: 4 }}>Track active campaigns and generate new promotion codes.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#6b5948", ...F, fontWeight: 600, fontSize: 14, color: "white" }}>
          <Plus size={14} /> Create Voucher
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-3 xl:gap-6">
        {/* Chart */}
        <div className="rounded-xl p-4 sm:p-6 xl:col-span-2" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
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
        <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
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
    </div>
  );
}

// ── Reviews ───────────────────────────────────────────────────────────────────
const reviewCards = [
  {
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
      <div className="flex flex-wrap items-center gap-3">
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
        <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm sm:ml-auto"
          style={{ border: "1px solid #d1c4bb", ...F, color: "#4e453e" }}>
          <Settings size={14} /> More Filters
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {reviewCards.map((r, idx) => (
          <div key={idx} className="rounded-xl p-5 flex flex-col gap-4" style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}>
            {/* Product */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#efe6e2", color: "#6b5948", ...F, fontWeight: 700, fontSize: 13 }}
              >
                {r.product.split(" ").slice(0, 2).map((word) => word[0]).join("")}
              </div>
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
            <div className="flex flex-wrap items-center gap-2 pt-1" style={{ borderTop: "1px solid #efe6e2" }}>
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

At Lumos Aura, we treat every order with the same care and precision as our craft. Standard shipping (3-5 business days) is complimentary on all orders over 500.000 đ. For expedited needs, we offer 2-Day Air (60.000 đ) and Next Day Delivery (100.000 đ).

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

      <div className="flex flex-wrap items-center justify-between gap-3">
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
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
      <main className="lg:pl-64 lg:pt-16">
        <div className="w-full max-w-[1200px] p-4 sm:p-6 lg:p-8">
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

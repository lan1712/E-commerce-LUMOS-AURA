import { useState, useEffect } from "react";
import { MapPin, Plus, X, Pencil } from "lucide-react";
import { useNav, useAuth } from "../context";
import { Footer } from "../components/Footer";
import { addressesApi } from "../api";
import type { AddressPayload } from "../api";

interface Address {
  id: number;
  label: string;
  name: string;
  line1: string;
  line2: string;
  city: string;
  country: string;
  zip: string;
  isDefault: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    name: "Eleanor Vance",
    line1: "14 Rue des Fleurs",
    line2: "Apt 3B",
    city: "Paris",
    country: "France",
    zip: "75006",
    isDefault: true,
  },
];

function AddressForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Address>;
  onSave: (a: AddressPayload) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    label: initial?.label ?? "",
    name: initial?.name ?? "",
    line1: initial?.line1 ?? "",
    line2: initial?.line2 ?? "",
    city: initial?.city ?? "",
    country: initial?.country ?? "",
    zip: initial?.zip ?? "",
    isDefault: initial?.isDefault ?? false,
  });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    fontSize: 14,
    color: "#3d3530",
    borderBottom: "1px solid #d1c4bb",
    backgroundColor: "transparent",
    outline: "none",
    paddingBottom: 6,
    width: "100%",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
    fontSize: 10,
    letterSpacing: "1.2px",
    color: "#7f756d",
    textTransform: "uppercase",
    marginBottom: 4,
    display: "block",
  };

  return (
    <div
      className="rounded-2xl p-7"
      style={{ backgroundColor: "white", border: "1px solid #d1c4bb" }}
    >
      <div className="mb-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label style={labelStyle}>Address Label</label>
          <input style={inputStyle} value={form.label} onChange={set("label")} placeholder="e.g. Home, Office" />
        </div>
        <div>
          <label style={labelStyle}>Full Name</label>
          <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Recipient name" />
        </div>
      </div>
      <div className="mb-5">
        <label style={labelStyle}>Street Address</label>
        <input style={inputStyle} value={form.line1} onChange={set("line1")} placeholder="Street, number" />
      </div>
      <div className="mb-5">
        <label style={labelStyle}>Apartment / Suite (optional)</label>
        <input style={inputStyle} value={form.line2} onChange={set("line2")} placeholder="Apt, floor, suite…" />
      </div>
      <div className="mb-5 grid gap-5 sm:grid-cols-3">
        <div>
          <label style={labelStyle}>City</label>
          <input style={inputStyle} value={form.city} onChange={set("city")} placeholder="City" />
        </div>
        <div>
          <label style={labelStyle}>Country</label>
          <input style={inputStyle} value={form.country} onChange={set("country")} placeholder="Country" />
        </div>
        <div>
          <label style={labelStyle}>Postal Code</label>
          <input style={inputStyle} value={form.zip} onChange={set("zip")} placeholder="ZIP / Post code" />
        </div>
      </div>
      <label className="flex items-center gap-2.5 cursor-pointer mb-7">
        <input
          type="checkbox"
          checked={form.isDefault}
          onChange={(e) => setForm((prev) => ({ ...prev, isDefault: e.target.checked }))}
          style={{ accentColor: "#6b5948", width: 14, height: 14 }}
        />
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#4e453e" }}>
          Set as default shipping address
        </span>
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onSave(form)}
          className="rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
          style={{
            backgroundColor: "#6b5948",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: "white",
          }}
        >
          Save Address
        </button>
        <button
          onClick={onCancel}
          className="rounded-full px-6 py-3 hover:opacity-80 transition-opacity"
          style={{
            border: "1px solid #d1c4bb",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            color: "#675a4e",
            backgroundColor: "transparent",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function AddressesPage() {
  const { navigate } = useNav();
  const { isLoggedIn } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load addresses from API
  useEffect(() => {
    if (!isLoggedIn) { setLoading(false); return; }
    addressesApi.list()
      .then((data: Address[]) => setAddresses(data))
      .catch(() => setAddresses([]))
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleSave = async (data: AddressPayload) => {
    try {
      if (editingId !== null) {
        const updated = await addressesApi.update(editingId, data) as Address;
        setAddresses((prev) => prev.map((a) => a.id === editingId ? updated : data.isDefault ? { ...a, isDefault: false } : a));
        setEditingId(null);
      } else {
        const created = await addressesApi.create(data) as Address;
        setAddresses((prev) => data.isDefault
          ? [created, ...prev.map((a) => ({ ...a, isDefault: false }))]
          : [...prev, created]);
        setShowForm(false);
      }
    } catch (e) {
      console.error("Failed to save address", e);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await addressesApi.delete(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error("Failed to delete address", e);
    }
  };

  const handleSetDefault = async (id: number) => {
    const addr = addresses.find((a) => a.id === id);
    if (!addr) return;
    try {
      const updated = await addressesApi.update(id, { ...addr, isDefault: true }) as Address;
      setAddresses((prev) => prev.map((a) => a.id === id ? updated : { ...a, isDefault: false }));
    } catch (e) {
      console.error("Failed to set default", e);
    }
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="mx-auto w-full max-w-[1100px] px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:px-10 lg:pb-20">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "2px",
                color: "#7f756d",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              My Account
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: "clamp(38px, 10vw, 48px)",
                color: "#3d3530",
                lineHeight: "56px",
              }}
            >
              Saved Addresses
            </h1>
          </div>
          <button
            onClick={() => navigate("account")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: "#735a36",
            }}
            className="hover:opacity-70 transition-opacity"
          >
            ← Back to Account
          </button>
        </div>

        <div className="flex flex-col gap-4 max-w-[760px]">
          {/* Existing addresses */}
          {addresses.map((addr) =>
            editingId === addr.id ? (
              <AddressForm
                key={addr.id}
                initial={addr}
                onSave={handleSave}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div
                key={addr.id}
                className="flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6"
                style={{
                  backgroundColor: "white",
                  border: addr.isDefault ? "1px solid #6b5948" : "1px solid #efe6e2",
                  boxShadow: "0 2px 12px rgba(109,91,74,0.05)",
                }}
              >
                <div className="flex min-w-0 gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "#f5ece7" }}
                  >
                    <MapPin size={15} color="#6b5948" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          fontSize: 14,
                          color: "#3d3530",
                        }}
                      >
                        {addr.label}
                      </p>
                      {addr.isDefault && (
                        <span
                          className="rounded-full px-2 py-0.5"
                          style={{
                            backgroundColor: "#f5ece7",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: 10,
                            letterSpacing: "0.5px",
                            color: "#6b5948",
                          }}
                        >
                          Default
                        </span>
                      )}
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#4e453e", lineHeight: "22px" }}>
                      {addr.name}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e", lineHeight: "22px" }}>
                      {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 13, color: "#675a4e" }}>
                      {addr.city}, {addr.country} {addr.zip}
                    </p>
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="mt-2 hover:opacity-70 transition-opacity"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: 12,
                          color: "#735a36",
                        }}
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0 mt-0.5">
                  <button
                    onClick={() => setEditingId(addr.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                    style={{ border: "1px solid #efe6e2", backgroundColor: "white" }}
                    title="Edit"
                  >
                    <Pencil size={13} color="#6b5948" />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                    style={{ border: "1px solid #efe6e2", backgroundColor: "white" }}
                    title="Delete"
                  >
                    <X size={13} color="#6b5948" />
                  </button>
                </div>
              </div>
            )
          )}

          {/* Add address */}
          {showForm && !editingId ? (
            <AddressForm onSave={handleSave} onCancel={() => setShowForm(false)} />
          ) : (
            !editingId && (
              <button
                onClick={() => setShowForm(true)}
                className="rounded-2xl p-6 flex items-center gap-3 hover:opacity-80 transition-opacity w-full"
                style={{
                  border: "2px dashed #d1c4bb",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#f5ece7" }}
                >
                  <Plus size={15} color="#6b5948" />
                </div>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#6b5948",
                  }}
                >
                  Add a new address
                </span>
              </button>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

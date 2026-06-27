// Central API client for Lumos Aura backend
// Change BASE_URL to your deployed backend URL in production

const BASE_URL = "http://localhost:8080/api";

function getToken(): string | null {
  return localStorage.getItem("lumos_token");
}

export function setToken(token: string) {
  localStorage.setItem("lumos_token", token);
}

export function clearToken() {
  localStorage.removeItem("lumos_token");
  localStorage.removeItem("lumos_user");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed: ${res.status}`);
  }

  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export const auth = {
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),

  register: (email: string, password: string, firstName?: string, lastName?: string) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, firstName, lastName }),
    }),

  me: () => request("/auth/me"),

  updateMe: (data: Record<string, string>) =>
    request("/auth/me", { method: "PUT", body: JSON.stringify(data) }),
};

// ── Products ──────────────────────────────────────────────────────────────────

export const productsApi = {
  list: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request(`/products${qs ? "?" + qs : ""}`);
  },

  get: (slug: string) => request(`/products/${slug}`),
};

// ── Orders ────────────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  email: string;
  shipName: string;
  shipAddress: string;
  shipCity: string;
  shipState: string;
  shipZip: string;
  shipCountry?: string;
  promoCode?: string;
  items: { productSlug: string; quantity: number }[];
}

export const ordersApi = {
  create: (payload: CreateOrderPayload) =>
    request("/orders", { method: "POST", body: JSON.stringify(payload) }),

  list: () => request("/orders"),

  get: (orderNumber: string) => request(`/orders/${orderNumber}`),
};

// ── Promo ─────────────────────────────────────────────────────────────────────

export const promoApi = {
  validate: (code: string) =>
    request("/promo/validate", { method: "POST", body: JSON.stringify({ code }) }),
};

// ── Addresses ─────────────────────────────────────────────────────────────────

export interface AddressPayload {
  label: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  country: string;
  zip: string;
  isDefault?: boolean;
}

export const addressesApi = {
  list: () => request("/addresses"),

  create: (data: AddressPayload) =>
    request("/addresses", { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: AddressPayload) =>
    request(`/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: number) =>
    request(`/addresses/${id}`, { method: "DELETE" }),
};

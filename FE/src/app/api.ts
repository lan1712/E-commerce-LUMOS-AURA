// Use the current origin. Vite proxies /api to the local Spring Boot server.
const BASE_URL = "/api";

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

  requestPasswordOtp: () =>
    request("/auth/me/password/request-otp", { method: "POST" }),

  changePassword: (data: { otp: string; newPassword: string }) =>
    request("/auth/me/password/change", { method: "POST", body: JSON.stringify(data) }),

  googleLogin: (token: string) =>
    request("/auth/google", { method: "POST", body: JSON.stringify({ token }) }),
};

// ── Products ──────────────────────────────────────────────────────────────────

export const productsApi = {
  list: (params?: { category?: string; search?: string }) => {
    const qs = new URLSearchParams(params as Record<string, string>).toString();
    return request(`/products${qs ? "?" + qs : ""}`);
  },

  get: (slug: string) => request(`/products/${slug}`),

  create: (data: Record<string, any>) =>
    request("/products", { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: Record<string, any>) =>
    request(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: number) =>
    request(`/products/${id}`, { method: "DELETE" }),

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = getToken();
    const res = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (!res.ok) throw new Error("Upload failed");
    return res.json();
  },
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

  retryPayment: (orderNumber: string, paymentMethod?: string) => {
    let url = `/orders/${orderNumber}/retry-payment`;
    if (paymentMethod) {
      url += `?paymentMethod=${paymentMethod}`;
    }
    return request(url, { method: "POST" });
  },
};

// ── Wishlist ──────────────────────────────────────────────────────────────────

export const wishlistApi = {
  list: () => request("/wishlist"),
  add: (productSlug: string) => request(`/wishlist/${productSlug}`, { method: "POST" }),
  remove: (productSlug: string) => request(`/wishlist/${productSlug}`, { method: "DELETE" }),
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

export const dashboardApi = {
  getStats: () => request("/dashboard/stats"),
};

// ── Users ─────────────────────────────────────────────────────────────────────

export const usersApi = {
  list: () => request("/admin/users"),
  create: (data: Record<string, any>) =>
    request("/admin/users", { method: "POST", body: JSON.stringify(data) }),
  updateRole: (id: number, role: string) =>
    request(`/admin/users/${id}/role?role=${role}`, { method: "PUT" }),
  updateStatus: (id: number, status: string) =>
    request(`/admin/users/${id}/status?status=${status}`, { method: "PUT" }),
  delete: (id: number) => request(`/admin/users/${id}`, { method: "DELETE" }),
};

// ── Orders (Admin) ────────────────────────────────────────────────────────────

export const adminOrdersApi = {
  list: () => request("/admin/orders"),
  updateStatus: (id: number, status: string) =>
    request(`/admin/orders/${id}/status?status=${status}`, { method: "PUT" }),
};

export const addressesApi = {
  list: () => request("/addresses"),

  create: (data: AddressPayload) =>
    request("/addresses", { method: "POST", body: JSON.stringify(data) }),

  update: (id: number, data: AddressPayload) =>
    request(`/addresses/${id}`, { method: "PUT", body: JSON.stringify(data) }),

  delete: (id: number) =>
    request(`/addresses/${id}`, { method: "DELETE" }),
};

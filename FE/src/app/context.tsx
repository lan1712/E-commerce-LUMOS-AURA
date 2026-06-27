import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./data";
import { auth as authApi, setToken, clearToken } from "./api";

// ── Cart ──────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AppProvider");
  return ctx;
}

// ── Navigation ────────────────────────────────────────────────────────────────

export type Page = "home" | "shop" | "product" | "cart" | "checkout" | "signin" | "orders" | "account" | "policies" | "contact" | "about" | "gift" | "search" | "wishlist" | "addresses";

interface NavContextType {
  currentPage: Page;
  selectedProductId: string | null;
  navigate: (page: Page, productId?: string) => void;
}

const NavContext = createContext<NavContextType | null>(null);

export function useNav() {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNav must be inside AppProvider");
  return ctx;
}

// ── Combined Provider ─────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: ReactNode }) {
  // Cart — persist to localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("lumos_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("lumos_cart", JSON.stringify(items));
  }, [items]);

  // Auth
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("lumos_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const refreshUser = async () => {
    try {
      const data = await authApi.me();
      setUser(data);
      localStorage.setItem("lumos_user", JSON.stringify(data));
    } catch {
      setUser(null);
      clearToken();
    }
  };

  // Refresh user on mount if token exists
  useEffect(() => {
    if (localStorage.getItem("lumos_token") && !user) {
      refreshUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock admin login — works without a backend
    if (email === "admin@lumosaura.com" && password === "admin123") {
      const userData: AuthUser = { email, firstName: "Admin", lastName: "User", role: "ADMIN" };
      setUser(userData);
      localStorage.setItem("lumos_user", JSON.stringify(userData));
      return;
    }
    const res = await authApi.login(email, password);
    setToken(res.token);
    const userData: AuthUser = { email: res.email, firstName: res.firstName, lastName: res.lastName, role: res.role };
    setUser(userData);
    localStorage.setItem("lumos_user", JSON.stringify(userData));
  };

  const register = async (email: string, password: string, firstName?: string, lastName?: string) => {
    const res = await authApi.register(email, password, firstName, lastName);
    setToken(res.token);
    const userData: AuthUser = { email: res.email, firstName: res.firstName, lastName: res.lastName, role: res.role };
    setUser(userData);
    localStorage.setItem("lumos_user", JSON.stringify(userData));
  };

  const logout = () => {
    clearToken();
    setUser(null);
    localStorage.removeItem("lumos_user");
  };

  // Navigation
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigate = (page: Page, productId?: string) => {
    setCurrentPage(page);
    setSelectedProductId(productId ?? null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, register, logout, refreshUser }}>
      <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
        <NavContext.Provider value={{ currentPage, selectedProductId, navigate }}>
          {children}
        </NavContext.Provider>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

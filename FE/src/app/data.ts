import { UPLOADS_BASE_URL } from "./api";
import HERO_CANDLE from "../assets/home/hero-candle.png";
import HERO_FRESH_LINEN from "../assets/home/hero-fresh-linen.png";
import HERO_LAVENDER_HAZE from "../assets/home/hero-lavender-haze.png";
import HERO_ROSE_BLUSH from "../assets/home/hero-rose-blush.png";
import ABSTRACT_SCENT from "../assets/home/abstract-scent.png";
import BRAND_TEXTURE from "../assets/home/brand-texture.png";
import RITUAL_BG from "../assets/product/ritual-bg.png";
import GIFT_BANNER from "../assets/gift-banner.png";
import SHOP_BANNER from "../assets/shop-banner.png";

export interface Product {
  dbId?: number;
  id: string;
  slug?: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  scentNotes: string;
  description: string;
  details: string;
  image: string;
  thumbnails?: string[];
  burnTime?: string;
  burnHours?: number;
  size: string;
  stock?: number;
  stockQuantity?: number;
  variants?: ProductVariant[];
  selectedVariantId?: number;
}

export interface ProductVariant {
  id: number;
  variantName: string;
  sku: string;
  sizeLabel: string;
  weightGrams?: number | null;
  burnTime?: string | null;
  price: number;
  stockQuantity?: number;
  thumbnailUrl?: string | null;
  defaultVariant?: boolean;
}

const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  "moonlit-vanilla": HERO_CANDLE,
  "white-tea-serenity": ABSTRACT_SCENT,
  "lavender-haze": HERO_LAVENDER_HAZE,
  "citrus-bloom": SHOP_BANNER,
  "sandalwood-ember": RITUAL_BG,
  "rose-blush": HERO_ROSE_BLUSH,
  "fresh-linen": HERO_FRESH_LINEN,
  "midnight-coffee": BRAND_TEXTURE,
  "discovery-set-3-minis": GIFT_BANNER,
  "cozy-night-gift-box": GIFT_BANNER,
  "warm-home-duo-set": GIFT_BANNER,
  "wick-trimmer": RITUAL_BG,
  "candle-snuffer": RITUAL_BG,
};

export function getProductImages(product: Product): string[] {
  const databaseImages = [product.image, ...(product.thumbnails ?? [])]
    .filter(Boolean)
    .map((url) => {
      const normalizedUrl = url.replace(/^http:\/\/localhost:8081\/uploads\//, "/uploads/");
      if (UPLOADS_BASE_URL && normalizedUrl.startsWith("/uploads/")) {
        return `${UPLOADS_BASE_URL}${normalizedUrl}`;
      }
      return normalizedUrl;
    });

  if (databaseImages.length > 0) {
    return Array.from(new Set(databaseImages));
  }

  const fallbackImage = PRODUCT_FALLBACK_IMAGES[product.id] ?? PRODUCT_FALLBACK_IMAGES[product.slug ?? ""];
  return fallbackImage ? [fallbackImage] : [];
}

export function formatPrice(value: number): string {
  return `${new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
  }).format(value)} VND`;
}

export const OPENING_DISCOUNT_RATE = 0.3;
export const OPENING_DISCOUNT_LABEL = "Khai trương -30%";
export const OPENING_SALE_DAYS = 15;
export const OPENING_SALE_START_DATE =
  import.meta.env.VITE_OPENING_SALE_START_DATE ?? "2026-06-28T22:47:54+07:00";

export function getOpeningSaleStatus(now = new Date()) {
  const start = new Date(OPENING_SALE_START_DATE);
  const end = new Date(start.getTime() + OPENING_SALE_DAYS * 24 * 60 * 60 * 1000);
  const active = Number.isFinite(start.getTime()) && now >= start && now < end;
  return {
    active,
    start,
    end,
    remainingMs: active ? end.getTime() - now.getTime() : 0,
  };
}

export function isOpeningSaleActive(now = new Date()): boolean {
  return getOpeningSaleStatus(now).active;
}

export function getOpeningSalePrice(value: number): number {
  return isOpeningSaleActive() ? Math.round(value * (1 - OPENING_DISCOUNT_RATE)) : value;
}

export function getProductStock(product: Product): number | null {
  if (product.variants?.length) {
    const variantStocks = product.variants
      .map((variant) => (typeof variant.stockQuantity === "number" ? Math.max(0, variant.stockQuantity) : null))
      .filter((stock): stock is number => stock !== null);

    return variantStocks.length ? variantStocks.reduce((sum, stock) => sum + stock, 0) : null;
  }

  const stock = product.stockQuantity ?? product.stock;
  return typeof stock === "number" ? Math.max(0, stock) : null;
}

export function getVariantStock(product: Product, variantId?: number | null): number | null {
  const variant = product.variants?.find((item) => item.id === variantId)
    ?? product.variants?.find((item) => item.defaultVariant)
    ?? product.variants?.[0];

  if (variant) {
    return typeof variant.stockQuantity === "number" ? Math.max(0, variant.stockQuantity) : null;
  }

  return getProductStock(product);
}

export function getStockMessage(stock: number | null): string {
  if (stock === null) return "Stock available";
  if (stock <= 0) return "Out of stock";
  if (stock <= 5) return `Only ${stock} left`;
  return `${stock} in stock`;
}

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

  const fallbackImage = PRODUCT_FALLBACK_IMAGES[product.id] ?? PRODUCT_FALLBACK_IMAGES[product.slug ?? ""];
  return Array.from(new Set([...databaseImages, fallbackImage].filter(Boolean)));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

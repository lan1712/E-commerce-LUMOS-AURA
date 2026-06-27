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

export function getProductImages(product: Product): string[] {
  const databaseImages = [product.image, ...(product.thumbnails ?? [])]
    .filter(Boolean)
    .filter((url) => !url.startsWith("/images/products/"))
    .map((url) => {
      if (url.startsWith("/uploads/")) return url;
      return url.replace(/^http:\/\/localhost:8081\/uploads\//, "/uploads/");
    });

  return Array.from(new Set(databaseImages));
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

import { useEffect, useState } from "react";
import type { Product } from "../data";
import { getProductImages } from "../data";

interface ProductImageProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductImage({ product, index = 0, className = "" }: ProductImageProps) {
  const images = getProductImages(product);
  const [sourceIndex, setSourceIndex] = useState(images.length > 0 ? Math.min(index, images.length - 1) : 0);

  useEffect(() => {
    setSourceIndex(images.length > 0 ? Math.min(index, images.length - 1) : 0);
  }, [index, product.id, images.length]);

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-[#f1e8e2] text-center ${className}`}>
        <span className="px-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#8a7565]">
          No image
        </span>
      </div>
    );
  }

  return (
    <img
      src={images[sourceIndex]}
      alt={product.name}
      className={className}
      onError={() => setSourceIndex((current) => Math.min(current + 1, images.length - 1))}
    />
  );
}

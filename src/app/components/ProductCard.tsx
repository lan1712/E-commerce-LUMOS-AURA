import { ShoppingBag, Plus } from "lucide-react";
import { useCart } from "../context";
import { useNav } from "../context";
import type { Product } from "../data";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { navigate } = useNav();

  return (
    <div className="flex flex-col gap-4 group cursor-pointer">
      <div
        className="relative overflow-hidden rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "#fff8f5", height: 300, boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)" }}
        onClick={() => navigate("product", product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-[225px] w-auto transition-transform duration-500 group-hover:scale-105"
        />
        {/* Quick add button */}
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          style={{
            backgroundColor: "#6b5948",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.7px",
            color: "white",
          }}
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <Plus size={12} />
          Add to Cart
        </button>
      </div>

      <div className="flex flex-col gap-1" onClick={() => navigate("product", product.id)}>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.7px",
            color: "#6b5948",
            textAlign: "center",
          }}
        >
          {product.name}
        </p>
        <div className="flex justify-center gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-0.5 rounded-full"
              style={{
                backgroundColor: "#efe6e2",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.96px",
                color: "#4e453e",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 16,
            color: "#675a4e",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

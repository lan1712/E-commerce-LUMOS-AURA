import { useState } from "react";
import { Minus, Plus, ShoppingBag, ChevronRight } from "lucide-react";
import { products } from "../data";
import imgEtherealBloomCandle from "../../imports/EtherealBloomProductDetail/ad1ac47c617506b69eafc6d246eecf7b11798d0b.png";
import imgThumb1 from "../../imports/EtherealBloomProductDetail/ebc92afcb81783e9c18a34dcc8393940a49858ce.png";
import imgThumb2 from "../../imports/EtherealBloomProductDetail/5b8be29cb7a673dc58024f67981342104d1fb7cb.png";
import imgThumb3 from "../../imports/EtherealBloomProductDetail/5c1d7c6b55b8b440ae09818e4921207724310037.png";
import imgRitualBg from "../../imports/EtherealBloomProductDetail/234e8ad3c8c05d61e0c28f57fbd2edcc532a8b09.png";
import { useCart } from "../context";
import { useNav } from "../context";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";

interface Props {
  productId: string;
}

export function ProductDetailPage({ productId }: Props) {
  const { navigate } = useNav();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === productId) ?? products[6]; // default to ethereal bloom

  const thumbnails = product.thumbnails ?? [product.image, imgThumb1, imgThumb2, imgThumb3];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products.filter((p) => p.id !== product.id && (p.category === product.category || p.tags.some(t => product.tags.includes(t)))).slice(0, 4);

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-10 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("home")}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}
          >
            Home
          </button>
          <ChevronRight size={12} color="#7f756d" />
          <button
            onClick={() => navigate("shop")}
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#7f756d" }}
          >
            Shop
          </button>
          <ChevronRight size={12} color="#7f756d" />
          <span
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#6b5948" }}
          >
            {product.name}
          </span>
        </div>
      </div>

      {/* Product detail */}
      <div className="max-w-[1440px] mx-auto w-full px-10 py-12">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="rounded-xl overflow-hidden"
                  style={{
                    border: selectedImage === i ? "2px solid #6b5948" : "2px solid transparent",
                    backgroundColor: "#fff8f5",
                  }}
                >
                  <img src={thumb} alt="" className="w-full h-20 object-contain" />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div
              className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#fff8f5", height: 580, boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)" }}
            >
              <img
                src={thumbnails[selectedImage]}
                alt={product.name}
                className="h-[90%] w-auto object-contain"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6 pt-4">
            <div className="flex gap-2 flex-wrap">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
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

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 48,
                color: "#6b5948",
                letterSpacing: "-0.96px",
                lineHeight: "56px",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 32,
                color: "#675a4e",
                lineHeight: "40px",
              }}
            >
              ${product.price.toFixed(2)}
            </p>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 16,
                color: "#4e453e",
                lineHeight: "26px",
              }}
            >
              {product.description}
            </p>

            <div className="flex gap-8">
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}>Burn Time</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#4e453e", marginTop: 4 }}>{product.burnTime}</p>
              </div>
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}>Size</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#4e453e", marginTop: 4 }}>{product.size}</p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #d1c4bb", paddingTop: 24 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 14, color: "#675a4e", lineHeight: "22px" }}>
                {product.details}
              </p>
            </div>

            {/* Quantity + Add to cart */}
            <div className="flex gap-4 items-center">
              <div
                className="flex items-center gap-3 rounded-full px-4 py-2"
                style={{ border: "1px solid #d1c4bb" }}
              >
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="hover:opacity-60 transition-opacity"
                >
                  <Minus size={14} color="#6b5948" />
                </button>
                <span
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#6b5948", minWidth: 20, textAlign: "center" }}
                >
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="hover:opacity-60 transition-opacity"
                >
                  <Plus size={14} color="#6b5948" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 rounded-full py-4 transition-all hover:opacity-90"
                style={{
                  backgroundColor: added ? "#4e453e" : "#6b5948",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: "0.7px",
                  color: "white",
                }}
              >
                <ShoppingBag size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ritual of light section */}
      <section
        className="w-full mt-20 py-24 relative overflow-hidden"
        style={{ backgroundColor: "#f5ece7" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${imgRitualBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="max-w-[1440px] mx-auto px-10 relative z-10 flex flex-col items-center text-center">
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", color: "#735a36", textTransform: "uppercase", marginBottom: 16 }}
          >
            RITUAL OF LIGHT
          </p>
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 48, color: "#6b5948", lineHeight: "56px", marginBottom: 16 }}
          >
            The Art of Burning
          </h2>
          <p
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 18, color: "#4e453e", lineHeight: "28px", maxWidth: 560 }}
          >
            For the perfect first burn, allow the wax to melt across the entire surface. Trim your wick to 5mm before each use. Store in a cool, dry place away from direct sunlight.
          </p>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto w-full px-10 py-20">
          <h2
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: 40, color: "#6b5948", lineHeight: "48px", marginBottom: 40 }}
          >
            You May Also Like
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

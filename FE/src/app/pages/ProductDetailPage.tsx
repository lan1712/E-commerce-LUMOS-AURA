import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react";
import imgRitualBg from "../../assets/product/ritual-bg.png";
import { productsApi } from "../api";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { ProductImage } from "../components/ProductImage";
import { formatPrice, getOpeningSalePrice, getProductImages, OPENING_DISCOUNT_LABEL, type Product } from "../data";
import { useCart, useNav } from "../context";

interface Props {
  productId: string;
}

export function ProductDetailPage({ productId }: Props) {
  const { navigate } = useNav();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setProduct(null);
    setError("");
    setSelectedImage(0);
    Promise.all([productsApi.get(productId), productsApi.list()])
      .then(([current, products]: [Product, Product[]]) => {
        setProduct(current);
        setAllProducts(products);
      })
      .catch((requestError: Error) => setError(requestError.message));
  }, [productId]);

  const related = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((item) => item.id !== product.id)
      .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
      .slice(0, 4);
  }, [allProducts, product]);

  if (error) {
    return (
      <div className="min-h-screen pt-40 text-center" style={{ backgroundColor: "#fff8f5", color: "#6b5948" }}>
        <h1 className="font-['Playfair_Display'] text-4xl">Product not found</h1>
        <p className="mt-3 text-sm">{error}</p>
        <button onClick={() => navigate("shop")} className="mt-6 rounded-full bg-[#6b5948] px-6 py-3 text-sm font-semibold text-white">Back to shop</button>
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen pt-40 text-center text-[#7f756d]" style={{ backgroundColor: "#fff8f5" }}>Loading...</div>;
  }

  const images = getProductImages(product);
  const isAccessory = product.category === "Accessories";
  const salePrice = getOpeningSalePrice(product.price);
  const onSale = salePrice < product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="pt-28 pb-4 px-5 md:px-10 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center gap-2 overflow-hidden">
          <button onClick={() => navigate("home")} className="shrink-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#7f756d" }}>Home</button>
          <ChevronRight size={12} color="#7f756d" className="shrink-0" />
          <button onClick={() => navigate("shop")} className="shrink-0" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#7f756d" }}>Shop</button>
          <ChevronRight size={12} color="#7f756d" className="shrink-0" />
          <span className="truncate" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 14, color: "#6b5948" }}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-3 sm:w-20 shrink-0 overflow-x-auto pb-1 sm:pb-0">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className="rounded-xl overflow-hidden h-16 w-16 shrink-0 sm:h-20 sm:w-20"
                  style={{ border: selectedImage === index ? "2px solid #6b5948" : "2px solid transparent", backgroundColor: "#fff8f5" }}
                >
                  <ProductImage product={product} index={index} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
            <div
              className="flex-1 rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "#fff8f5", minHeight: "min(420px, 90vw)", height: "min(580px, 70vw)", boxShadow: "0px 40px 40px -15px rgba(109,91,74,0.04)" }}
            >
              <ProductImage product={product} index={selectedImage} className="h-[90%] w-[90%] object-contain" />
            </div>
          </div>

          <div className="flex flex-col gap-6 pt-4">
            <div className="flex gap-2 flex-wrap">
              {product.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#efe6e2", fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#4e453e" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#9b7660", textTransform: "uppercase", marginBottom: 8 }}>
                {product.category}
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(36px, 9vw, 48px)", color: "#6b5948", lineHeight: 1.16 }}>
                {product.name}
              </h1>
            </div>

            {onSale ? (
              <div className="flex flex-wrap items-baseline gap-3">
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 20, color: "#9c8d82", lineHeight: "32px", textDecoration: "line-through" }}>
                  {formatPrice(product.price)}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 30, color: "#5f4635", lineHeight: "40px" }}>
                  {formatPrice(salePrice)}
                </span>
                <span
                  className="rounded-full px-3 py-1"
                  style={{ backgroundColor: "#efe6e2", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.7px", color: "#735a36" }}
                >
                  {OPENING_DISCOUNT_LABEL}
                </span>
              </div>
            ) : (
              <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 28, color: "#675a4e", lineHeight: "40px" }}>
                {formatPrice(product.price)}
              </p>
            )}

            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 16, color: "#4e453e", lineHeight: "26px" }}>
              {product.description}
            </p>

            {!isAccessory && product.scentNotes !== "-" && (
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}>Scent Notes</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4e453e", marginTop: 4 }}>{product.scentNotes}</p>
              </div>
            )}

            <div className="flex flex-wrap gap-6 sm:gap-8">
              {!isAccessory && product.burnTime && (
                <div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}>Burn Time</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4e453e", marginTop: 4 }}>{product.burnTime}</p>
                </div>
              )}
              <div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "0.96px", color: "#7f756d", textTransform: "uppercase" }}>Size</p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#4e453e", marginTop: 4 }}>{product.size}</p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #d1c4bb", paddingTop: 24 }}>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#675a4e", lineHeight: "22px" }}>{product.details}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center gap-3 rounded-full px-4 py-2" style={{ border: "1px solid #d1c4bb" }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover:opacity-60 transition-opacity" title="Decrease quantity">
                  <Minus size={14} color="#6b5948" />
                </button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#6b5948", minWidth: 20, textAlign: "center" }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover:opacity-60 transition-opacity" title="Increase quantity">
                  <Plus size={14} color="#6b5948" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="w-full flex-1 flex items-center justify-center gap-2 rounded-full py-4 transition-all hover:opacity-90"
                style={{ backgroundColor: added ? "#4e453e" : "#6b5948", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.7px", color: "white" }}
              >
                <ShoppingBag size={16} />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isAccessory && (
        <section className="w-full mt-12 py-16 md:mt-20 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#f5ece7" }}>
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url(${imgRitualBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-10 flex flex-col items-center text-center">
            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 12, letterSpacing: "1.2px", color: "#735a36", textTransform: "uppercase", marginBottom: 16 }}>RITUAL OF LIGHT</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(34px, 8vw, 48px)", color: "#6b5948", lineHeight: 1.16, marginBottom: 16 }}>The Art of Burning</h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: "#4e453e", lineHeight: "28px", maxWidth: 560 }}>
              For the perfect first burn, allow the wax to melt across the entire surface. Trim your wick to 5mm before each use.
            </p>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto w-full px-5 md:px-10 py-20">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(32px, 7vw, 40px)", color: "#6b5948", lineHeight: 1.2, marginBottom: 40 }}>You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

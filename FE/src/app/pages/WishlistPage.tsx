import { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";
import { useNav, useCart, useAuth } from "../context";
import { formatPrice, getOpeningSalePrice, type Product } from "../data";
import { Footer } from "../components/Footer";
import { wishlistApi, productsApi } from "../api";

export function WishlistPage() {
  const { navigate } = useNav();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [wishlistSlugs, setWishlistSlugs] = useState<string[]>([]);
  const [addedId, setAddedId] = useState<string | null>(null);

  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    productsApi.list().then(setAllProducts).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    wishlistApi.list()
      .then((data: any[]) => {
        setWishlistSlugs(data.map(i => i.productSlug));
      })
      .catch(() => {});
  }, [isLoggedIn]);

  const wishedProducts = allProducts.filter((p) => wishlistSlugs.includes(p.id));

  const remove = async (id: string) => {
    try {
      await wishlistApi.remove(id);
      setWishlistSlugs((prev) => prev.filter((x) => x !== id));
    } catch(e) {
      alert("Failed to remove item.");
    }
  };

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#fff8f5" }}>
      <div className="max-w-[1100px] mx-auto w-full px-10 pt-32 pb-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "2px",
                color: "#7f756d",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              My Account
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 48,
                color: "#3d3530",
                lineHeight: "56px",
              }}
            >
              Wishlist
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 14,
                color: "#7f756d",
              }}
            >
              {wishedProducts.length} item{wishedProducts.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => navigate("account")}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 14,
                color: "#735a36",
              }}
              className="hover:opacity-70 transition-opacity"
            >
              ← Back to Account
            </button>
          </div>
        </div>

        {wishedProducts.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center py-24 gap-5 text-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#f5ece7" }}
            >
              <Heart size={28} color="#d1c4bb" />
            </div>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400,
                fontSize: 28,
                color: "#3d3530",
              }}
            >
              Your wishlist is empty
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: "#7f756d",
              }}
            >
              Save candles you love to come back to them later.
            </p>
            <button
              onClick={() => navigate("shop")}
              className="rounded-full px-7 py-3 hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#6b5948",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                color: "white",
              }}
            >
              Browse Candles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-5">
            {wishedProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden group"
                style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}
              >
                {/* Image */}
                <div
                  className="relative cursor-pointer"
                  style={{ height: 220, backgroundColor: "#f5ece7" }}
                  onClick={() => navigate("product", product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Remove button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(product.id); }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: "white", border: "1px solid #efe6e2" }}
                    title="Remove from wishlist"
                  >
                    <X size={13} color="#6b5948" />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => navigate("product", product.id)}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                      fontSize: 16,
                      color: "#3d3530",
                      lineHeight: "22px",
                      marginBottom: 3,
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: 12,
                      color: "#7f756d",
                      marginBottom: 12,
                    }}
                  >
                    {product.scentNotes}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 16,
                        color: "#3d3530",
                      }}
                    >
                      {formatPrice(getOpeningSalePrice(product.price))}
                    </span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="rounded-full px-3 py-1.5 hover:opacity-90 transition-all"
                      style={{
                        backgroundColor: addedId === product.id ? "#4e453e" : "#6b5948",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: 11,
                        letterSpacing: "0.5px",
                        color: "white",
                      }}
                    >
                      {addedId === product.id ? "Added ✓" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

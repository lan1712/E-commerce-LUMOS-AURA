import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Search, User, X, LogOut } from "lucide-react";
import { useCart, useNav, useAuth } from "../context";

export function Navbar() {
  const { itemCount } = useCart();
  const { navigate, currentPage } = useNav();
  const { isLoggedIn, user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("search");
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[12px]"
      style={{ backgroundColor: "rgba(255,248,245,0.85)", borderBottom: "1px solid rgba(255,255,255,0.2)" }}
    >
      <div className="max-w-[1440px] mx-auto px-10 h-20 flex items-center justify-between">
        {/* Left nav links */}
        <div className="flex gap-8 items-center">
          <button
            onClick={() => navigate("shop")}
            className="transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.7px",
              color: currentPage === "shop" ? "#6b5948" : "#4e453e",
              borderBottom: currentPage === "shop" ? "2px solid #6b5948" : "2px solid transparent",
              paddingBottom: 2,
            }}
          >
            Shop
          </button>
          <button
            onClick={() => navigate("gift")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.7px",
              color: currentPage === "gift" ? "#6b5948" : "#4e453e",
              borderBottom: currentPage === "gift" ? "2px solid #6b5948" : "2px solid transparent",
              paddingBottom: 2,
            }}
          >
            Gift Collection
          </button>
          <button
            onClick={() => navigate("about")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.7px",
              color: currentPage === "about" ? "#6b5948" : "#4e453e",
              borderBottom: currentPage === "about" ? "2px solid #6b5948" : "2px solid transparent",
              paddingBottom: 2,
            }}
          >
            About
          </button>
        </div>

        {/* Center logo */}
        <button
          onClick={() => navigate("home")}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: 40,
            color: "#6b5948",
            letterSpacing: "-2px",
            lineHeight: 1,
          }}
        >
          Lumos Aura
        </button>

        {/* Right icons */}
        <div className="flex gap-5 items-center">
          {/* Expandable search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center transition-all duration-300 overflow-hidden rounded-full"
            style={{
              width: searchOpen ? 200 : 28,
              border: searchOpen ? "1px solid #d1c4bb" : "1px solid transparent",
              backgroundColor: searchOpen ? "white" : "transparent",
              paddingLeft: searchOpen ? 10 : 0,
              paddingRight: searchOpen ? 6 : 0,
              height: 32,
            }}
          >
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => !searchOpen && setSearchOpen(true)}
              className="shrink-0 hover:opacity-70 transition-opacity"
              title="Search"
            >
              <Search size={16} color="#6b5948" />
            </button>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && (setSearchOpen(false), setQuery(""))}
              placeholder="Search candles…"
              className="outline-none bg-transparent flex-1 min-w-0"
              style={{
                opacity: searchOpen ? 1 : 0,
                width: searchOpen ? "auto" : 0,
                marginLeft: searchOpen ? 7 : 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                color: "#3d3530",
                transition: "opacity 0.2s",
              }}
            />
            {searchOpen && (
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setQuery(""); }}
                className="shrink-0 ml-1 hover:opacity-70 transition-opacity"
              >
                <X size={13} color="#7f756d" />
              </button>
            )}
          </form>

          {/* User icon — shows name if logged in */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("account")}
                className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                title={user?.firstName || "My Account"}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#6b5948" }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, color: "white" }}>
                    {(user?.firstName?.[0] ?? user?.email?.[0] ?? "U").toUpperCase()}
                  </span>
                </div>
              </button>
              <button
                onClick={logout}
                className="hover:opacity-70 transition-opacity"
                title="Log Out"
              >
                <LogOut size={15} color="#7f756d" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("signin")}
              className="hover:opacity-70 transition-opacity"
              title="Sign In"
            >
              <User size={16} color="#6b5948" />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => navigate("cart")}
            className="hover:opacity-70 transition-opacity relative"
            title="Cart"
          >
            <ShoppingBag size={16} color="#6b5948" />
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 rounded-full w-4 h-4 flex items-center justify-center"
                style={{
                  backgroundColor: "#6b5948",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

import { useState, useRef, useEffect } from "react";
import { ShoppingBag, Search, User, X, LogOut, Menu } from "lucide-react";
import { useCart, useNav, useAuth } from "../context";

export function Navbar() {
  const { itemCount } = useCart();
  const { navigate, currentPage } = useNav();
  const { isLoggedIn, user, logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("search");
    setSearchOpen(false);
    setQuery("");
  };

  const handleSearchButton = () => {
    if (window.innerWidth < 768) {
      navigate("search");
      return;
    }
    setSearchOpen(true);
  };

  const go = (page: Parameters<typeof navigate>[0]) => {
    setMenuOpen(false);
    navigate(page);
  };

  const isHomeTop = currentPage === "home" && !scrolled;
  const foregroundColor = isHomeTop ? "#fff8f5" : "#6b5948";
  const mutedColor = isHomeTop ? "rgba(255,248,245,0.82)" : "#7f756d";
  const navTextColor = isHomeTop ? "#fff8f5" : "#4e453e";
  const activeColor = isHomeTop ? "#ffffff" : "#6b5948";
  const activeBorder = isHomeTop ? "rgba(255,248,245,0.9)" : "#6b5948";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: menuOpen ? "#fff8f5" : isHomeTop ? "transparent" : "rgba(255,248,245,0.9)",
        borderBottom: menuOpen || !isHomeTop ? "1px solid rgba(107,89,72,0.12)" : "1px solid transparent",
        backdropFilter: menuOpen || !isHomeTop ? "blur(18px)" : "none",
        boxShadow: menuOpen || !isHomeTop ? "0 10px 30px rgba(109,91,74,0.08)" : "none",
      }}
    >
      <div className="mx-auto grid h-14 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:flex md:h-20 md:justify-between md:px-6 lg:px-10">
        {/* Mobile hamburger */}
        <div className="flex justify-start md:hidden">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-md transition-opacity hover:opacity-75"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ border: menuOpen ? "1px solid #d1c4bb" : "1px solid transparent" }}
          >
            {menuOpen ? <X size={22} color="#3d3530" /> : <Menu size={22} color={foregroundColor} />}
          </button>
        </div>

        {/* Left nav links */}
        <div className="hidden items-center gap-8 md:flex">
          <button
            onClick={() => go("shop")}
            className="transition-all"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.3px",
              color: currentPage === "shop" ? activeColor : navTextColor,
              borderBottom: currentPage === "shop" ? `2px solid ${activeBorder}` : "2px solid transparent",
              paddingBottom: 2,
              textShadow: isHomeTop ? "0 1px 16px rgba(0,0,0,0.28)" : "none",
            }}
          >
            Shop
          </button>
          <button
            onClick={() => go("gift")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.3px",
              color: currentPage === "gift" ? activeColor : navTextColor,
              borderBottom: currentPage === "gift" ? `2px solid ${activeBorder}` : "2px solid transparent",
              paddingBottom: 2,
              textShadow: isHomeTop ? "0 1px 16px rgba(0,0,0,0.28)" : "none",
            }}
          >
            <span className="hidden sm:inline">Gift Collection</span>
            <span className="sm:hidden">Gift</span>
          </button>
          <button
            onClick={() => go("about")}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.3px",
              color: currentPage === "about" ? activeColor : navTextColor,
              borderBottom: currentPage === "about" ? `2px solid ${activeBorder}` : "2px solid transparent",
              paddingBottom: 2,
              textShadow: isHomeTop ? "0 1px 16px rgba(0,0,0,0.28)" : "none",
            }}
          >
            About
          </button>
        </div>

        {/* Center logo */}
        <button
          onClick={() => go("home")}
          className="justify-self-center md:absolute md:left-1/2 md:-translate-x-1/2"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontSize: "clamp(18px, 5.4vw, 40px)",
            color: menuOpen ? "#3d3530" : foregroundColor,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            textShadow: isHomeTop && !menuOpen ? "0 1px 18px rgba(0,0,0,0.32)" : "none",
          }}
        >
          Lumos Aura
        </button>

        {/* Right icons */}
        <div className="flex items-center justify-end gap-2 md:gap-5">
          {/* Expandable search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center transition-all duration-300 overflow-hidden rounded-full"
            style={{
              width: searchOpen ? "min(45vw, 200px)" : 28,
              border: searchOpen ? "1px solid #d1c4bb" : "1px solid transparent",
              backgroundColor: searchOpen ? "white" : "transparent",
              paddingLeft: searchOpen ? 10 : 0,
              paddingRight: searchOpen ? 6 : 0,
              height: 32,
            }}
          >
            <button
              type={searchOpen ? "submit" : "button"}
              onClick={() => !searchOpen && handleSearchButton()}
              className="shrink-0 hover:opacity-70 transition-opacity"
              title="Search"
            >
              <Search size={17} color={searchOpen || menuOpen ? "#6b5948" : foregroundColor} />
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
            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => go(user?.role === "ADMIN" ? "admin" : "account")}
                className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                title={user?.firstName || "My Account"}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: menuOpen ? "#6b5948" : isHomeTop ? "#fff8f5" : "#6b5948" }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, color: menuOpen ? "white" : isHomeTop ? "#6b5948" : "white" }}>
                    {(user?.firstName?.[0] ?? user?.email?.[0] ?? "U").toUpperCase()}
                  </span>
                </div>
              </button>
              <button
                onClick={logout}
                className="hidden transition-opacity hover:opacity-70 md:block"
                title="Log Out"
              >
                <LogOut size={15} color={mutedColor} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => go("signin")}
              className="hover:opacity-70 transition-opacity"
              title="Sign In"
            >
              <User size={17} color={menuOpen ? "#6b5948" : foregroundColor} />
            </button>
          )}

          {/* Cart */}
          <button
            onClick={() => go("cart")}
            className="hover:opacity-70 transition-opacity relative"
            title="Cart"
          >
            <ShoppingBag size={17} color={menuOpen ? "#6b5948" : foregroundColor} />
            {itemCount > 0 && (
              <span
                className="absolute -top-2 -right-2 rounded-full w-4 h-4 flex items-center justify-center"
                style={{
                  backgroundColor: isHomeTop ? "#fff8f5" : "#6b5948",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 9,
                  fontWeight: 700,
                  color: isHomeTop ? "#6b5948" : "white",
                }}
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden" style={{ backgroundColor: "#fff8f5", borderTop: "1px solid rgba(107,89,72,0.12)" }}>
          <div className="flex flex-col px-6 py-3">
            {[
              { label: "Shop", page: "shop" as const },
              { label: "Gift", page: "gift" as const },
              { label: "About", page: "about" as const },
            ].map((item) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className="py-4 text-left"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 16,
                  lineHeight: 0.5,
                  color: currentPage === item.page ? "#6b5948" : "#1e1b18",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 border-t border-[#eadfd8]">
            <button
              onClick={() => go(isLoggedIn ? (user?.role === "ADMIN" ? "admin" : "account") : "signin")}
              className="px-5 py-4 text-left"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9b7660" }}
            >
              Tài khoản
            </button>
            <button
              onClick={() => go("search")}
              className="px-5 py-4 text-left"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9b7660" }}
            >
              Tìm kiếm
            </button>
            <button
              onClick={() => go("cart")}
              className="px-5 py-4 text-left"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9b7660" }}
            >
              Giỏ hàng
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

import { AppProvider, useNav, useAuth } from "./context";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { SignInPage } from "./pages/SignInPage";
import { OrdersPage } from "./pages/OrdersPage";
import { AccountSettingsPage } from "./pages/AccountSettingsPage";
import { BrandPoliciesPage } from "./pages/BrandPoliciesPage";
import { ContactUsPage } from "./pages/ContactUsPage";
import { AboutPage } from "./pages/AboutPage";
import { GiftCollectionPage } from "./pages/GiftCollectionPage";
import { SearchPage } from "./pages/SearchPage";
import { WishlistPage } from "./pages/WishlistPage";
import { AddressesPage } from "./pages/AddressesPage";
import { AdminPanel } from "./pages/AdminPanel";
import "../styles/fonts.css";

function AppShell() {
  const { currentPage, selectedProductId } = useNav();
  const { user, isLoggedIn } = useAuth();

  // Admin users go directly to the admin panel
  if (isLoggedIn && user?.role === "ADMIN") {
    return <AdminPanel />;
  }

  // Full-screen pages with no standard Navbar
  if (currentPage === "signin") return <SignInPage />;
  if (currentPage === "checkout") return <CheckoutPage />;

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* MARKER-MAKE-KIT-INVOKED */}
      <Navbar />
      <main className="flex-1 w-full">
        {currentPage === "home" && <HomePage />}
        {currentPage === "shop" && <ShopPage />}
        {currentPage === "product" && (
          <ProductDetailPage productId={selectedProductId ?? "ethereal-bloom"} />
        )}
        {currentPage === "cart" && <CartPage />}
        {currentPage === "orders" && <OrdersPage />}
        {currentPage === "account" && <AccountSettingsPage />}
        {currentPage === "policies" && <BrandPoliciesPage />}
        {currentPage === "contact" && <ContactUsPage />}
        {currentPage === "about" && <AboutPage />}
        {currentPage === "gift" && <GiftCollectionPage />}
        {currentPage === "search" && <SearchPage />}
        {currentPage === "wishlist" && <WishlistPage />}
        {currentPage === "addresses" && <AddressesPage />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

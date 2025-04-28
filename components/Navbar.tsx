import { useCart } from "@/lib/global-states/cart";
import { useUser } from "@/lib/global-states/user";
import { ShoppingCart, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [user, setUser] = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cart, setCart] = useCart(); // State to manage cart items
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem("cart");
      }
    }
  }, [setCart]);

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    setUser(null); // Clear user state
    localStorage.removeItem("access_token"); // Remove token from local storage
  };

  return (
    <>
    <nav className="w-full sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-green-200 shadow-sm flex items-center justify-between px-8 py-3">
      <Link href="/" className="flex items-center">
        <svg
          className="w-8 h-8 text-green-600 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <rect
            x="3"
            y="6"
            width="18"
            height="13"
            rx="2"
            strokeWidth="2"
            stroke="currentColor"
            fill="white"
          />
          <path
            d="M16 10l-4 4-2-2"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
          />
        </svg>
        <span className="text-2xl font-bold tracking-wide text-green-700">
          Simply Commerce
        </span>
      </Link>

      <div className="flex items-center gap-4">
        {/* Cart Icon with badge */}
        <button
          className="relative rounded-full p-2 border border-green-200 flex items-center justify-center hover:bg-green-100 transition"
          aria-label="Cart"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <ShoppingCart className="w-7 h-7 text-green-600" />
          {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
              {cart.length}
            </span>
          )}
        </button>

        {/* Profile Dropdown */}
        {user?.id ? (
          <div className="relative group">
            <button
              className="flex items-center gap-1 rounded-full p-2 border border-green-200 hover:bg-green-100 transition"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-label="Profile"
            >
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="white"
                />
                <path
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
              <ChevronDown
                className={`w-4 h-4 text-green-600 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-green-100 z-30">
                <div className="py-1">
                  <Link
                    href="/customer/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/customer/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    Your Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/customer/login"
            className="rounded-full bg-green-300 px-4 py-2 border border-green-200 flex items-center justify-center hover:bg-green-100 transition"
          >
            <span>Login</span>
          </Link>
        )}
      </div>
    </nav>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </>
  );
}

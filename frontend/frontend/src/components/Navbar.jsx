import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUserShield,
  FaSignInAlt,
  FaSignOutAlt,
  FaHeart,
} from "react-icons/fa";

import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { toast } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");

    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "hover:text-orange-500 transition";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-orange-500"
        >
          🍽 Cloud Kitchen
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-7">

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          <NavLink to="/categories" className={navLinkStyle}>
            Categories
          </NavLink>

          <NavLink to="/menu" className={navLinkStyle}>
            Menu
          </NavLink>

          {/* Wishlist */}
          {token && (
            <NavLink
              to="/wishlist"
              className="relative hover:text-red-500"
            >
              <FaHeart size={22} />

              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                  {wishlist.length}
                </span>
              )}
            </NavLink>
          )}

          {/* Orders */}
          {token && (
            <NavLink
              to="/orders"
              className={navLinkStyle}
            >
              Orders
            </NavLink>
          )}

          {/* Admin Links */}
          {user?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard"
                className={navLinkStyle}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/menu"
                className={navLinkStyle}
              >
                <FaUserShield className="inline mr-1" />
                Admin Menu
              </NavLink>

              <NavLink
                to="/admin/orders"
                className={navLinkStyle}
              >
                Admin Orders
              </NavLink>
            </>
          )}

          {/* Cart */}
          {token && (
            <NavLink
              to="/cart"
              className="relative hover:text-orange-500"
            >
              <FaShoppingCart size={22} />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full text-xs px-2">
                  {cartItems.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  )}
                </span>
              )}
            </NavLink>
          )}

          {/* Profile */}
          {token && (
            <NavLink to="/profile">
              <FaUserCircle
                size={28}
                className="hover:text-orange-500"
              />
            </NavLink>
          )}

          {/* Login / Logout */}
          {!token ? (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              <FaSignInAlt />
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition"
            >
              <FaSignOutAlt />
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-5 flex flex-col gap-4">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>

          <NavLink
            to="/categories"
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </NavLink>

          <NavLink
            to="/menu"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </NavLink>

          {token && (
            <NavLink
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
            >
              ❤️ Wishlist ({wishlist.length})
            </NavLink>
          )}

          {token && (
            <NavLink
              to="/orders"
              onClick={() => setMenuOpen(false)}
            >
              Orders
            </NavLink>
          )}

          {user?.role === "admin" && (
            <>
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/menu"
                onClick={() => setMenuOpen(false)}
              >
                Admin Menu
              </NavLink>

              <NavLink
                to="/admin/orders"
                onClick={() => setMenuOpen(false)}
              >
                Admin Orders
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink
                to="/cart"
                onClick={() => setMenuOpen(false)}
              >
                Cart ({cartItems.length})
              </NavLink>

              <NavLink
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </NavLink>
            </>
          )}

          {!token ? (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-orange-500 text-white text-center py-2 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;

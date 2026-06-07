import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide"
        >
          🍕 Pizza Palace
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/menu" className="hover:text-yellow-300 transition">
            Menu
          </Link>

          <Link to="/orders" className="hover:text-yellow-300 transition">
            Orders
          </Link>

          <Link to="/cart" className="hover:text-yellow-300 transition">
            Cart
          </Link>

          <Link
            to="/login"
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-red-700 px-6 py-4 space-y-4">
          <Link
            to="/"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/menu"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </Link>

          <Link
            to="/orders"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>

          <Link
            to="/cart"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="block hover:text-yellow-300"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              🍕 Pizza Palace
            </h2>

            <p className="text-gray-300">
              Serving delicious pizzas made with fresh ingredients and
              authentic flavors. Order your favorite pizza today.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="hover:text-orange-400"
                >
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="hover:text-orange-400"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="hover:text-orange-400"
                >
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <p className="text-gray-300 mb-2">
              📍 123 Pizza Street, New York
            </p>

            <p className="text-gray-300 mb-2">
              📞 +1 234 567 890
            </p>

            <p className="text-gray-300">
              ✉️ pizzapalace@gmail.com
            </p>

            {/* Social Media */}
            <div className="flex gap-4 mt-4 text-2xl">
              <a href="#" className="hover:text-orange-400">
                📘
              </a>

              <a href="#" className="hover:text-orange-400">
                📸
              </a>

              <a href="#" className="hover:text-orange-400">
                ▶️
              </a>
            </div>
          </div>

        </div>

        <hr className="my-6 border-gray-700" />

        <div className="text-center text-gray-400">
          © {year} Pizza Palace. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;

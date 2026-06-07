import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const SIZE_PRICE_MULTIPLIER = {
  Small: 0.8,
  Medium: 1,
  Large: 1.2,
};

function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h2 className="text-3xl font-bold mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 mb-6">
            Add some delicious pizzas to get started
          </p>

          <Link
            to="/menu"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-4xl font-bold mb-2">
          Your Cart
        </h1>

        <p className="text-gray-600 mb-8">
          {totalItems} item{totalItems !== 1 ? "s" : ""}
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">

            {items.map((item) => {
              const itemPrice =
                item.pizza.price *
                (SIZE_PRICE_MULTIPLIER[item.size] || 1);

              return (
                <div
                  key={`${item.pizza.id}-${item.size}`}
                  className="bg-white rounded-xl shadow-md p-4"
                >
                  <div className="flex gap-4">

                    <img
                      src={item.pizza.image}
                      alt={item.pizza.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">

                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold text-lg">
                            {item.pizza.name}
                          </h3>

                          <p className="text-gray-500 text-sm">
                            {item.size} - ₹{itemPrice}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            removeItem(item.pizza.id, item.size)
                          }
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.pizza.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 border rounded-full flex items-center justify-center"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="font-semibold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item.pizza.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 border rounded-full flex items-center justify-center"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <span className="text-xl font-bold text-red-600">
                          ₹{(itemPrice * item.quantity).toFixed(2)}
                        </span>

                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">

              <h2 className="text-2xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">

                {items.map((item) => (
                  <div
                    key={`${item.pizza.id}-${item.size}`}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.pizza.name} ({item.size}) × {item.quantity}
                    </span>

                    <span>
                      ₹
                      {(
                        item.pizza.price *
                        (SIZE_PRICE_MULTIPLIER[item.size] || 1) *
                        item.quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                ))}

              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-red-600">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-2 mb-4">
                Free delivery on orders above ₹500
              </p>

              <Link
                to="/checkout"
                className="w-full flex items-center justify-center bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                <ShoppingBag size={18} className="mr-2" />
                Checkout
                <ArrowRight size={18} className="ml-2" />
              </Link>

              <Link
                to="/menu"
                className="block mt-3 text-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition"
              >
                Continue Shopping
              </Link>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Cart;

import { useEffect, useState } from "react";
import { Package, ChevronRight } from "lucide-react";
import orderService from "../services/orderService";

const STATUS_STEPS = [
  "Pending",
  "Confirmed",
  "Preparing",
  "Out For Delivery",
  "Delivered",
];

const STATUS_COLORS = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Confirmed: "bg-blue-100 text-blue-700 border-blue-300",
  Preparing: "bg-orange-100 text-orange-700 border-orange-300",
  "Out For Delivery": "bg-purple-100 text-purple-700 border-purple-300",
  Delivered: "bg-green-100 text-green-700 border-green-300",
};

const STATUS_ICONS = {
  Pending: "⏳",
  Confirmed: "✅",
  Preparing: "👨‍🍳",
  "Out For Delivery": "🚚",
  Delivered: "🎉",
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    orderService
      .getOrders()
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-red-600 text-white py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl font-bold">My Orders</h1>
          <p className="mt-2">
            {orders.length} order{orders.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={60} className="mx-auto text-gray-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-600">
              Your order history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Header */}
                <button
                  className="w-full p-5 flex justify-between items-center hover:bg-gray-50"
                  onClick={() =>
                    setExpanded(expanded === order.id ? null : order.id)
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 text-white rounded-lg flex items-center justify-center text-xl">
                      {STATUS_ICONS[order.status]}
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full border text-sm font-semibold ${STATUS_COLORS[order.status]}`}
                    >
                      {order.status}
                    </span>

                    <span className="font-bold text-red-600">
                      ₹{order.total.toFixed(2)}
                    </span>

                    <ChevronRight
                      size={20}
                      className={`transition-transform ${
                        expanded === order.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                {expanded === order.id && (
                  <div className="border-t p-5">
                    {/* Status Progress */}
                    <div className="flex justify-between mb-8">
                      {STATUS_STEPS.map((step, index) => {
                        const currentIndex =
                          STATUS_STEPS.indexOf(order.status);

                        const completed = index <= currentIndex;

                        return (
                          <div
                            key={step}
                            className="flex flex-col items-center flex-1"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                completed
                                  ? "bg-red-600 text-white"
                                  : "bg-gray-200 text-gray-600"
                              }`}
                            >
                              {index + 1}
                            </div>

                            <span className="text-xs mt-2 text-center">
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Items */}
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={item.pizza.image}
                            alt={item.pizza.name}
                            className="w-14 h-14 rounded-lg object-cover"
                          />

                          <div className="flex-1">
                            <h4 className="font-semibold">
                              {item.pizza.name}
                            </h4>

                            <p className="text-sm text-gray-500">
                              {item.size} × {item.quantity}
                            </p>
                          </div>

                          <span className="font-semibold">
                            ₹{item.subtotal.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="border-t mt-5 pt-4 flex justify-between font-bold">
                      <span>Total</span>

                      <span className="text-red-600">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>

                    {/* Address */}
                    <p className="text-sm text-gray-500 mt-3">
                      Deliver to: {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
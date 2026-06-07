import { useState } from "react";
import { Link } from "react-router-dom";

function ManageOrders() {
  const [orders, setOrders] = useState([
    {
      id: "1001",
      customer: "Harshini",
      phone: "9876543210",
      address: "Chennai",
      items: ["Margherita Pizza", "Veg Supreme"],
      total: 699,
      status: "Pending",
    },
    {
      id: "1002",
      customer: "Rahul",
      phone: "9123456780",
      address: "Bangalore",
      items: ["Pepperoni Pizza"],
      total: 499,
      status: "Preparing",
    },
    {
      id: "1003",
      customer: "Priya",
      phone: "9988776655",
      address: "Hyderabad",
      items: ["Farmhouse Pizza", "Garlic Bread"],
      total: 899,
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin"
          className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50"
        >
          ← Back
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Orders
          </h1>
          <p className="text-gray-600">
            View and update customer orders
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-red-600 text-white">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  #{order.id}
                </td>

                <td className="p-4">
                  {order.customer}
                </td>

                <td className="p-4">
                  {order.phone}
                </td>

                <td className="p-4">
                  {order.items.join(", ")}
                </td>

                <td className="p-4 font-bold text-green-600">
                  ₹{order.total}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                    className="border rounded-lg px-3 py-2"
                  >
                    <option>Pending</option>
                    <option>Confirmed</option>
                    <option>Preparing</option>
                    <option>Out For Delivery</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ManageOrders;

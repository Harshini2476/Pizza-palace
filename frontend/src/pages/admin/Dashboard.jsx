import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPizzas, setTotalPizzas] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Sample data
    setTotalOrders(25);
    setTotalPizzas(12);
    setTotalRevenue(18500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage pizzas, orders and customers
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Available Pizzas</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {totalPizzas}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500 text-sm">Total Revenue</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">
            ₹{totalRevenue}
          </p>
        </div>

      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <Link to="/admin/pizzas">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold text-gray-800">
              Manage Pizzas
            </h2>
            <p className="text-gray-600 mt-2">
              Add, edit and delete pizzas from menu.
            </p>
          </div>
        </Link>

        <Link to="/admin/orders">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-xl font-bold text-gray-800">
              Manage Orders
            </h2>
            <p className="text-gray-600 mt-2">
              View and update customer orders.
            </p>
          </div>
        </Link>

      </div>

      {/* Recent Orders */}
      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">
          Recent Orders
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Order ID</th>
              <th className="text-left py-2">Customer</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Amount</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">#1001</td>
              <td>John</td>
              <td className="text-green-600">Delivered</td>
              <td>₹499</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">#1002</td>
              <td>Sarah</td>
              <td className="text-yellow-600">Preparing</td>
              <td>₹699</td>
            </tr>

            <tr>
              <td className="py-2">#1003</td>
              <td>Mike</td>
              <td className="text-blue-600">Confirmed</td>
              <td>₹899</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;

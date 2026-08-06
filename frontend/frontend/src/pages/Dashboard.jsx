import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaUsers,
  FaShoppingCart,
  FaUtensils,
  FaDollarSign,
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res.data.dashboard);

      setData(res.data.dashboard);
      console.log("Dashboard Data:", res.data.dashboard);
console.log("Monthly Revenue:", res.data.dashboard.monthlyRevenue);
    } catch (error) {
      console.log(error);
      alert("Failed to load dashboard");
    }
  };

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500"></div>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: data.totalOrders,
      icon: <FaShoppingCart />,
      color: "bg-green-500",
    },
    {
      title: "Menu Items",
      value: data.totalMenuItems,
      icon: <FaUtensils />,
      color: "bg-purple-500",
    },
    {
      title: "Revenue",
      value: `₹${data.totalRevenue}`,
      icon: <FaDollarSign />,
      color: "bg-orange-500",
    },
  ];
  const revenueData = data.monthlyRevenue.map((item) => ({
  month: `${item._id.month}/${item._id.year}`,
  revenue: item.revenue,
}));

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-500">{card.title}</p>

                  <h2 className="text-3xl font-bold mt-2">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`${card.color} text-white p-4 rounded-xl text-2xl`}
                >
                  {card.icon}
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Order Status + Top Selling */}
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Order Status */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Order Status
            </h2>

            <div className="space-y-3">

              <p>
                🟡 Pending :
                <span className="font-bold ml-2">
                  {data.pendingOrders}
                </span>
              </p>

              <p>
                🔵 Preparing :
                <span className="font-bold ml-2">
                  {data.preparingOrders}
                </span>
              </p>

              <p>
                🟣 Out for Delivery :
                <span className="font-bold ml-2">
                  {data.outForDeliveryOrders}
                </span>
              </p>

              <p>
                🟢 Delivered :
                <span className="font-bold ml-2">
                  {data.deliveredOrders}
                </span>
              </p>

              <p>
                🔴 Cancelled :
                <span className="font-bold ml-2">
                  {data.cancelledOrders}
                </span>
              </p>

            </div>

          </div>

          {/* Top Selling */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Top Selling Items
            </h2>

            {data.topSellingItems.length === 0 ? (

              <p className="text-gray-500">
                No sales yet.
              </p>

            ) : (

              <div className="space-y-3">

                {data.topSellingItems.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >

                    <span>{item.name}</span>

                    <span className="font-bold">
                      {item.totalSold}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

        {/* Monthly Revenue Chart */}
<div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

  <h2 className="text-2xl font-bold mb-6">
    Monthly Revenue
  </h2>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />

      <Bar
        dataKey="revenue"
        fill="#f97316"
        radius={[8, 8, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>

</div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-orange-100">

                <tr>

                  <th className="p-3 text-left">Customer</th>

                  <th className="p-3 text-left">Email</th>

                  <th className="p-3 text-left">Amount</th>

                  <th className="p-3 text-left">Status</th>

                  <th className="p-3 text-left">Date</th>

                </tr>

              </thead>

              <tbody>

                {data.recentOrders.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center py-6"
                    >
                      No Recent Orders
                    </td>

                  </tr>

                ) : (

                  data.recentOrders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3">
                        {order.user?.name || "Unknown"}
                      </td>

                      <td className="p-3">
                        {order.user?.email || "No Email"}
                      </td>

                      <td className="p-3">
                        ₹{order.totalAmount}
                      </td>

                      <td className="p-3">
                        {order.status}
                      </td>

                      <td className="p-3">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;
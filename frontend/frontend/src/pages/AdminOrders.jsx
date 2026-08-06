import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaBoxOpen,
  FaClock,
  FaUser,
  FaMoneyBillWave,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      console.log("Admin Token:", token);

const res = await API.get("/orders/all", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

console.log("ALL ORDERS RESPONSE:", res.data);

setOrders(res.data.orders || []);

console.log("Orders Received:", res.data.orders);
    } catch (error) {
      console.log(
        "FETCH ADMIN ORDERS ERROR:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Preparing":
        return "bg-blue-100 text-blue-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };
  const updateStatus = async (orderId, newStatus) => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.put(
      `/orders/${orderId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Order Status Updated ✅");

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );

  } catch (error) {
    console.log(error.response?.data || error);
    toast.error("Failed to update order status");
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold animate-pulse">
          Loading Orders...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="flex items-center gap-4 mb-10">

          <FaBoxOpen className="text-orange-500 text-5xl" />

          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              Admin Orders
            </h1>

            <p className="text-gray-500 text-lg mt-2">
              Manage and track customer orders
            </p>
          </div>

        </div>

        {/* Orders */}
        {orders.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-md p-20 text-center">

            <FaBoxOpen className="text-7xl text-gray-300 mx-auto mb-6" />

            <h2 className="text-3xl font-bold">
              No Orders Found
            </h2>

            <p className="text-gray-500 mt-3">
              Customer orders will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="bg-white rounded-3xl shadow-md overflow-hidden"
              >

                {/* Order Header */}
                <div className="bg-orange-50 px-6 py-5 flex flex-col lg:flex-row justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Order #{order._id.slice(-6)}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">

                      <FaClock />

                      <span>
                        {new Date(order.createdAt).toLocaleString()}
                      </span>

                    </div>

                  </div>

                  {/* Status */}
                  <div>

                    <select
                      value={order.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      className={`px-5 py-3 rounded-full font-bold outline-none ${getStatusStyle(
                        order.status
                      )}`}
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Preparing">
                        Preparing
                      </option>

                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

                {/* Order Body */}
                <div className="p-6">

                  {/* Customer Information */}
                  <div className="grid md:grid-cols-3 gap-4 mb-6">

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">

                        <FaUser className="text-orange-500" />

                        <h3 className="font-bold">
                          Customer
                        </h3>
                      </div>

                      <p>
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.user?.email || "No email"}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">

                        <FaMapMarkerAlt className="text-orange-500" />

                        <h3 className="font-bold">
                          Delivery Address
                        </h3>

                      </div>

                      <p className="text-gray-600">
                        {order.deliveryAddress ||
                          order.address ||
                          "Address not available"}
                      </p>

                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">

                      <div className="flex items-center gap-2 mb-2">

                        <FaMoneyBillWave className="text-green-600" />

                        <h3 className="font-bold">
                          Payment
                        </h3>

                      </div>

                      <p>
                        {order.paymentMethod ||
                          "Cash on Delivery"}
                      </p>

                    </div>

                  </div>

                  {/* Items */}
                  <h3 className="text-xl font-bold mb-4">
                    Ordered Items
                 </h3>

                  <div className="space-y-3">

                    {order.items?.map((item, index) => (

                      <div
                        key={index}
                        className="flex justify-between items-center border-b pb-3"
                      >

                        <div>

                          <p className="font-semibold">

                            {item.menuId?.name ||
                              item.name ||
                              "Food Item"}

                          </p>

                          <p className="text-sm text-gray-500">

                            Quantity: {item.quantity}

                          </p>

                        </div>

                        <p className="font-bold text-orange-600">

                          ₹
                          {(
                            (item.menuId?.price ||
                              item.price ||
                              0) *
                            item.quantity
                          ).toFixed(2)}

                        </p>

                      </div>

                    ))}
                  </div>
                  {/* Total */}
                  <div className="flex justify-between items-center border-t mt-6 pt-6">

                    <span className="text-2xl font-bold">
                      Total Amount
                    </span>

                    <span className="text-3xl font-bold text-orange-600">
                      ₹{order.totalAmount}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;
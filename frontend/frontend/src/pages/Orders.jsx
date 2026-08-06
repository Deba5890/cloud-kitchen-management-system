import { useEffect, useState } from "react";

import API from "../services/api";

import { FaBoxOpen, FaClock, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

function Orders() {

const [orders, setOrders] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(() => {

fetchOrders();

}, []);

const fetchOrders = async () => {

try {

const token = localStorage.getItem("token");

const res = await API.get("/orders", {

headers: {

Authorization:`Bearer ${token}` 

}

});

setOrders(res.data.orders || []);

} catch (error) {

console.log(error);

} finally {

setLoading(false);

}

};

const getStatusColor = (status) => {

switch (status) {

case "Delivered":

return "bg-green-100 text-green-700";

case "Preparing":

return "bg-blue-100 text-blue-700";

default:

return "bg-yellow-100 text-yellow-700";

}

};

if (loading) {

return (

<div className="min-h-screen flex justify-center items-center">

<h1 className="text-3xl font-bold animate-pulse">

Loading Orders...

</h1>

</div>

);

}

return (

<div className="min-h-screen bg-gray-100 py-10 px-4">

<div className="max-w-6xl mx-auto">

<div className="flex items-center gap-3 mb-8">

<FaBoxOpen className="text-orange-500 text-4xl" />

<h1 className="text-4xl font-bold text-gray-800">My Orders</h1>

</div>

{orders.length === 0 ? (

<div className="bg-white rounded-2xl shadow-md p-10 text-center">

<FaBoxOpen className="text-6xl text-gray-300 mx-auto mb-4" />

<h2 className="text-2xl font-bold mb-2">No Orders Yet</h2>

<p className="text-gray-500">

Start ordering your favorite meals!

</p>

</div>

) : (

<div className="space-y-6">

{orders.map((order) => (

<div

key={order._id}

className="bg-white rounded-2xl shadow-md overflow-hidden"

>

{/* Header */}

<div className="bg-orange-50 px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3">

<div>

<h2 className="text-xl font-bold">

Order #{order._id.slice(-6)}

</h2>

<div className="flex items-center gap-2 text-gray-600 mt-1">

<FaClock />

<span>

{new Date(order.createdAt).toLocaleString()}

</span>

</div>

</div>
<span

className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}
>
{order.status || "Pending"}
</span>


</div>

{/* Body */}

<div className="p-6">

<h3 className="font-bold text-lg mb-4">Items Ordered</h3>

<div className="space-y-3">

{order.items?.map((item, index) => (

<div

key={index}

className="flex justify-between items-center border-b pb-3"

>

<div>

<p className="font-semibold">
{item.menuId?.name || "Food Item"}

</p>

<p className="text-sm text-gray-500">

Quantity: {item.quantity}

</p>

</div>

<p className="font-bold text-orange-600">

₹{(item.menuId?.price || 0) * item.quantity}
</p>

</div>

))}

</div>

{/* Extra Details */}

<div className="grid md:grid-cols-2 gap-4 mt-6">

<div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">

<FaMapMarkerAlt className="text-orange-500 text-xl mt-1" />

<div>

<p className="font-semibold">Delivery Address</p>

<p className="text-gray-600 text-sm">

{order.deliveryAddress || "Address not available"}
</p>

</div>

</div>

<div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">

<FaMoneyBillWave className="text-green-600 text-xl mt-1" />

<div>

<p className="font-semibold">Payment Method</p>

<p className="text-gray-600 text-sm">

{order.paymentMethod || "Cash on Delivery"}

</p>

</div>

</div>

</div>

{/* Total */}

<div className="flex justify-between items-center mt-6 pt-6 border-t">

<span className="text-xl font-bold">Total Amount</span>

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

export default Orders;
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useCart } from "../components/CartContext";

import API from "../services/api";

import {

FaMapMarkerAlt,

FaPhoneAlt,

FaMoneyBillWave,

FaCreditCard,

FaMobileAlt,

} from "react-icons/fa";

function Checkout() {

const { cartItems, totalPrice } = useCart();

const navigate = useNavigate();

const [address, setAddress] = useState("");

const [phone, setPhone] = useState("");

const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

const [loading, setLoading] = useState(false);

const handlePlaceOrder = async () => {

try {

setLoading(true);

const token = localStorage.getItem("token");

console.log("TOKEN SENT:", token);

if (!token) {
toast.error("Please login first");
navigate("/login");

return;

}
const orderData = {

items: cartItems.map((item) => ({

menuId: item._id,

quantity: item.quantity,

})),

totalAmount: totalPrice + 40,

deliveryAddress: address,

phone,

paymentMethod,

};


const res = await API.post("/orders", orderData, {

headers: {

Authorization: `Bearer ${token}`}});

console.log("ORDER RESPONSE:", res.data);

 toast.success("Order Placed Successfully 🎉");

navigate("/orders");

} catch (error) {
console.log("ORDER ERROR:", error.response?.data || error);
toast.error( error.response?.data?.message || "Order Failed ❌");
} finally {

setLoading(false);

}

};

return (

<div className="min-h-screen bg-gray-100 py-10 px-4">

<div className="max-w-7xl mx-auto">

<h1 className="text-4xl font-bold mb-8 text-gray-800">

Secure Checkout

</h1>

<div className="grid lg:grid-cols-3 gap-8">

<div className="lg:col-span-2 space-y-6">

<div className="bg-white rounded-2xl shadow-md p-6">

<div className="flex items-center gap-3 mb-4">

<FaMapMarkerAlt className="text-orange-500 text-xl" />

<h2 className="text-2xl font-bold">Delivery Address</h2>

</div>

<textarea

rows="4"

value={address}

onChange={(e) => setAddress(e.target.value)}

placeholder="Enter your complete delivery address"

className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 outline-none"

/>

</div>

<div className="bg-white rounded-2xl shadow-md p-6">

<div className="flex items-center gap-3 mb-4">

<FaPhoneAlt className="text-orange-500 text-xl" />

<h2 className="text-2xl font-bold">Contact Number</h2>

</div>

<input

type="text"

value={phone}

onChange={(e) => setPhone(e.target.value)}

placeholder="Enter your mobile number"

className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-orange-400 outline-none"

/>

</div>

<div className="bg-white rounded-2xl shadow-md p-6">

<h2 className="text-2xl font-bold mb-5">Payment Method</h2>

<div className="space-y-4">

<label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:border-orange-400">

<div className="flex items-center gap-3">

<FaMoneyBillWave className="text-green-600 text-2xl" />

<span className="font-semibold">Cash on Delivery</span>

</div>

<input

type="radio"

checked={paymentMethod === "Cash on Delivery"}

onChange={() => setPaymentMethod("Cash on Delivery")}

/>

</label>

<label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:border-orange-400">

<div className="flex items-center gap-3">

<FaMobileAlt className="text-blue-600 text-2xl" />

<span className="font-semibold">UPI Payment</span>

</div>

<input

type="radio"

checked={paymentMethod === "UPI"}

onChange={() => setPaymentMethod("UPI")}

/>

</label>

<label className="flex items-center justify-between border rounded-xl p-4 cursor-pointer hover:border-orange-400">

<div className="flex items-center gap-3">

<FaCreditCard className="text-purple-600 text-2xl" />

<span className="font-semibold">Credit / Debit Card</span>

</div>

<input

type="radio"

checked={paymentMethod === "Card"}

onChange={() => setPaymentMethod("Card")}

/>

</label>

</div>

</div>

</div>

<div className="bg-white rounded-2xl shadow-md p-6 h-fit sticky top-24">

<h2 className="text-2xl font-bold mb-6">Order Summary</h2>

<div className="space-y-4">

{cartItems.map((item) => (

<div key={item._id} className="flex justify-between items-center">

<div>

<p className="font-semibold">{item.name}</p>

<p className="text-sm text-gray-500">Qty: {item.quantity}</p>

</div>

<p className="font-bold">₹{item.price * item.quantity}</p>

</div>

))}

</div>

<div className="border-t mt-6 pt-6 space-y-3">

<div className="flex justify-between">

<span>Subtotal</span>

<span>₹{totalPrice}</span>

</div>

<div className="flex justify-between">

<span>Delivery Fee</span>

<span>₹40</span>

</div>

<div className="flex justify-between text-2xl font-bold text-orange-600 border-t pt-4">

<span>Total</span>

<span>₹{totalPrice + 40}</span>

</div>

</div>

<button

onClick={handlePlaceOrder}

disabled={loading}

className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl text-lg font-bold transition disabled:opacity-50"

>

{loading ? "Placing Order..." : "Place Order"}

</button>

</div>

</div>

</div>

</div>

);

}

export default Checkout;
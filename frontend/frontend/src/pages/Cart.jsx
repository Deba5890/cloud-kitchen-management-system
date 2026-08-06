import { useCart } from "../components/CartContext";

import { Link } from "react-router-dom";

function Cart() {

const { cartItems, removeFromCart, totalPrice } = useCart();

return (

<div className="max-w-5xl mx-auto px-5 py-10">

<h1 className="text-4xl font-bold mb-8">Your Cart</h1>

{cartItems.length === 0 ? (

<h2 className="text-2xl font-bold text-gray-600">

Cart is Empty

</h2>

) : (

<>

<div className="space-y-5">

{cartItems.map((item) => (

<div

key={item._id}

className="flex items-center justify-between bg-white p-4 rounded-xl shadow"

>

<div className="flex items-center gap-4">

<img

src={item.image}

alt={item.name}

className="w-20 h-20 object-cover rounded-lg"

/>

<div>

<h3 className="font-bold text-lg">{item.name}</h3>

<p className="text-orange-600 font-semibold">

₹{item.price}

</p>

<p>Qty: {item.quantity}</p>

</div>

</div>

<button

onClick={() => removeFromCart(item._id)}

className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"

>

Remove

</button>

</div>

))}

</div>

<div className="mt-10 bg-white p-6 rounded-xl shadow">

<div className="flex justify-between text-2xl font-bold">

<span>Total:</span>

<span className="text-orange-600">₹{totalPrice}</span>

</div>
<Link

to="/checkout"

className="block w-full text-center bg-orange-500 text-white py-4 rounded-xl text-xl font-bold hover:bg-orange-600 transition"

>

Proceed to Checkout

</Link>

</div>


</>

)}

</div>

);

}

export default Cart;
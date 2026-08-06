import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import API from "../services/api";

function FoodDetails() {

const { id } = useParams();
console.log("Food ID:", id);
console.log("Length:", id.length);
console.log("URL ID:", id);
const [food, setFood] = useState(null);

const [loading, setLoading] = useState(true);

const [quantity, setQuantity] = useState(1);
const { addToCart } = useCart();

useEffect(() => {

fetchFood();

}, []);

const fetchFood = async () => {

try {

const res = await API.get(`/menu/${id}`)
setFood(res.data.menu);

} catch (error) {

console.log(error);

} finally {

setLoading(false);

}

};

const increase = () => setQuantity(quantity + 1);

const decrease = () => {

if (quantity > 1) setQuantity(quantity - 1);

};

if (loading) {

return <h1 className="text-center mt-20 text-3xl font-bold">Loading...</h1>;

}

if (!food) {

return <h1 className="text-center mt-20 text-3xl font-bold">Food Not Found</h1>;

}

return (

<div className="max-w-6xl mx-auto px-5 py-10">

<div className="grid md:grid-cols-2 gap-10">

<img

src={food.image}

alt={food.name}

className="w-full h-[450px] object-cover rounded-2xl shadow-lg"

/>

<div>

<span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">

{food.category}

</span>

<h1 className="text-4xl font-bold mt-4">{food.name}</h1>

<p className="text-gray-600 mt-4 text-lg">

{food.description}

</p>

<div className="mt-6">

<span className="text-4xl font-bold text-orange-600">

₹{food.price}

</span>

</div>

<div className="mt-6">

<span

className={`px-3 py-2 rounded-lg font-semibold ${

food.isAvailable

? "bg-green-100 text-green-700"

: "bg-red-100 text-red-700"

}`}

>

{food.isAvailable ? "Available" : "Out of Stock"}

</span>

</div>

<div className="mt-8">

<h3 className="font-semibold mb-3">Quantity</h3>

<div className="flex items-center gap-4">

<button

onClick={decrease}

className="w-10 h-10 rounded-full bg-gray-200 text-xl font-bold"

>

-

</button>

<span className="text-2xl font-bold">{quantity}</span>

<button

onClick={increase}

className="w-10 h-10 rounded-full bg-orange-500 text-white text-xl font-bold"

>

+

</button>

</div>

</div>

<div className="mt-6 text-xl font-semibold">

Total: ₹{food.price * quantity}

</div>
<button

onClick={() => addToCart(food, quantity)}

className="mt-8 w-full bg-orange-500 text-white py-4 rounded-xl text-lg font-bold hover:bg-orange-600"

>

Add {quantity} Item(s) to Cart

</button>
<ReviewForm
  menuId={food._id}
  fetchReviews={() => {}}
/>

<ReviewList
  menuId={food._id}
/>
</div>

</div>

</div>

);

}

export default FoodDetails;
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const CartContext = createContext();

export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState([]);

const addToCart = (item, quantity = 1) => {

console.log("Adding item:", item.name);

setCartItems((prevItems) => {

const existingItem = prevItems.find(

(i) => i._id === item._id

);

if (existingItem) {

return prevItems.map((i) =>

i._id === item._id

? { ...i, quantity: i.quantity + quantity }

: i

);

}

return [...prevItems, { ...item, quantity }];

});
  toast.success("Added to Cart 🛒");

};

const removeFromCart = (id) => {
setCartItems((prevItems) =>
prevItems.filter((item) => item._id !== id));
 toast.info("Removed from Cart 🗑️");

};

const totalPrice = cartItems.reduce(

(total, item) => total + item.price * item.quantity,

0

);

return (

<CartContext.Provider

value={{

cartItems,

addToCart,

removeFromCart,

totalPrice,

}}

>

{children}

</CartContext.Provider>

);

};

export const useCart = () => useContext(CartContext);
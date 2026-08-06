import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";

function FoodCard({ item }) {
  const { addToCart } = useCart();
  const { wishlist, addWishlist, removeWishlist } = useWishlist();

  const isWishlisted = wishlist.some((wish) => {
    return (
      wish.menu?._id === item._id ||
      wish.menuId?._id === item._id ||
      wish.menu === item._id ||
      wish.menuId === item._id
    );
  });

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      const wish = wishlist.find(
        (w) =>
          w.menu?._id === item._id ||
          w.menuId?._id === item._id ||
          w.menu === item._id ||
          w.menuId === item._id
      );

      if (wish) {
        await removeWishlist(wish._id);
      }
    } else {
      await addWishlist(item._id);
    }
  };
console.log("Food Item:", item);
console.log("Food ID:", item._id);
  return (
    <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg z-20 hover:scale-110 transition"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-xl" />
        ) : (
          <FaRegHeart className="text-gray-500 text-xl" />
        )}
      </button>

      <Link to={`/menu/${item._id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover hover:scale-105 transition duration-500"
        />
      </Link>

      <div className="p-5">

        <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full mb-3">
          {item.category}
        </span>

        <h2 className="text-2xl font-bold text-gray-800">
          {item.name}
        </h2>

        <p className="text-gray-500 mt-2 line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-6">

          <span className="text-3xl font-bold text-orange-600">
            ₹{item.price}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(item, 1);
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default FoodCard;
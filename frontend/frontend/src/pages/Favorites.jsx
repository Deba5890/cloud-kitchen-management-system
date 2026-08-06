
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart } from "react-icons/fa";
import { useWishlist } from "../components/WishlistContext";
import { useCart } from "../components/CartContext";

function Favorites() {
  const { wishlist, removeWishlist } = useWishlist();
  const { addToCart } = useCart();
  console.log("Wishlist in Favorites:", wishlist);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <FaHeart className="text-red-500 text-5xl" />

          <div>
            <h1 className="text-5xl font-bold text-gray-800">
              My Favorites
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              Your favourite food items
            </p>
          </div>
        </div>

        {/* Empty Wishlist */}
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

            <FaHeart className="text-7xl text-red-300 mx-auto mb-6" />

            <h2 className="text-3xl font-bold">
              Your Wishlist is Empty
            </h2>

            <p className="text-gray-500 mt-4">
              Save your favourite dishes to order later.
            </p>

            <Link
              to="/menu"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Browse Menu
            </Link>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {wishlist.map((item) => {
              const food = item.menu;

              if (!food) return null;

              return (
                <div
                  key={item._id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >
                  <Link to={`/menu/${food._id}`}>
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-56 object-cover"
                    />
                  </Link>

                  <div className="p-5">

                    <h2 className="text-2xl font-bold">
                      {food.name}
                    </h2>

                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {food.description}
                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="text-2xl font-bold text-orange-600">
                        ₹{food.price}
                      </span>

                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                        {food.category}
                      </span>

                    </div>

                    <div className="flex gap-3 mt-6">

                      <button
                        onClick={() => addToCart(food, 1)}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
                      >
                        <FaShoppingCart />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => removeWishlist(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-5 rounded-xl"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;

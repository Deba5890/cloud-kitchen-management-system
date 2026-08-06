import { Link } from "react-router-dom";
import {
  FaPizzaSlice,
  FaHamburger,
  FaCoffee,
  FaIceCream,
} from "react-icons/fa";

import {
  GiChickenOven,
  GiNoodles,
  GiMeal,
} from "react-icons/gi";

const categories = [
  { name: "Pizza", icon: <FaPizzaSlice size={50} />, color: "from-red-400 to-red-600" },
  { name: "Burger", icon: <FaHamburger size={50} />, color: "from-yellow-400 to-yellow-600" },
  { name: "Biryani", icon: <GiChickenOven size={50} />, color: "from-orange-400 to-orange-600" },
  { name: "Noodles", icon: <GiNoodles size={50} />, color: "from-green-400 to-green-600" },
  { name: "Desserts", icon: <FaIceCream size={50} />, color: "from-pink-400 to-pink-600" },
  { name: "Beverages", icon: <FaCoffee size={50} />, color: "from-amber-500 to-orange-500" },
  { name: "Veg", icon: <GiMeal size={50} />, color: "from-lime-400 to-green-600" },
  { name: "North Indian", icon: "🍛", color: "from-purple-400 to-purple-600" },
  { name: "South Indian", icon: "🥘", color: "from-blue-400 to-blue-600" },
  { name: "Snacks", icon: "🍟", color: "from-yellow-300 to-orange-500" },
  { name: "Fast Food", icon: "🌮", color: "from-red-300 to-pink-500" },
  { name: "Rice Bowl", icon: "🍚", color: "from-gray-300 to-gray-500" },
];

function Categories() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <div className="bg-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Browse Categories
          </h1>

          <p className="mt-4 text-lg">
            Explore delicious dishes from every category.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-xl mx-auto mt-10 px-6">
        <input
          type="text"
          placeholder="Search Category..."
          className="w-full border rounded-xl p-4 shadow focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {categories.map((category) => (

            <Link
              key={category.name}
              to={`/menu?category=${category.name}`}
            >

              <div className={`bg-gradient-to-r ${category.color} rounded-2xl p-8 text-white shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300`}>

                <div className="text-5xl flex justify-center">
                  {category.icon}
                </div>

                <h2 className="text-center mt-5 text-xl font-bold">
                  {category.name}
                </h2>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Categories;
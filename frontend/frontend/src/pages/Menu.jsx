import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
import FoodCard from "../components/FoodCard";

function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
  fetchMenu();

  const selectedCategory = searchParams.get("category");

  if (selectedCategory) {
    setCategory(selectedCategory);
  }
}, [searchParams]);

  const fetchMenu = async () => {
    try {
      setLoading(true);

      const res = await API.get("/menu");

      setMenu(res.data.menu);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Categories
  const categories = [
    "All",
    ...new Set(menu.map((item) => item.category)),
  ];

  // Filter + Search + Sort
  const filteredMenu = menu
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category === "All" ? true : item.category === category
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;

      if (sort === "high") return b.price - a.price;

      if (sort === "latest")
        return new Date(b.createdAt) - new Date(a.createdAt);

      return 0;
    });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold animate-pulse">
          Loading Menu...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-5xl font-bold text-center mb-10">
        🍴 Our Delicious Menu
      </h1>

      {/* Search + Filter + Sort */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">

        {/* Search */}

        <input
          type="text"
          placeholder="Search food..."
          className="border p-3 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}

        <select
          className="border p-3 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}

        </select>

        {/* Sort */}

        <select
          className="border p-3 rounded-lg"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="latest">Latest</option>
          <option value="low">Price Low → High</option>
          <option value="high">Price High → Low</option>
        </select>

      </div>

      {/* Empty */}

      {filteredMenu.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-3xl font-bold">
            No Food Found 😔
          </h2>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

          {filteredMenu.map((item) => (
            <FoodCard
              key={item._id}
              item={item}
            />
          ))}

        </div>
      )}
    </div>
  );
}

export default Menu;

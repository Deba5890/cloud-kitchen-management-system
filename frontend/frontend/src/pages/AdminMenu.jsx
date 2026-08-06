import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AdminMenu() {
  const navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const fetchMenus = async () => {
    try {
      const res = await API.get("/menu");

      setMenus(res.data.menu || []);
      setFilteredMenus(res.data.menu || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  useEffect(() => {
    let temp = [...menus];

    if (search) {
      temp = temp.filter((food) =>
        food.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      temp = temp.filter((food) => food.category === category);
    }

    setFilteredMenus(temp);
  }, [search, category, menus]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/menu/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
toast.success("Menu Deleted Successfully 🗑️");
      fetchMenus();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed. Admin access required."
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold animate-pulse">
          Loading Menu...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      {/* Heading */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-orange-500">
          Admin Menu Management
        </h1>

        <button
          onClick={() => navigate("/admin/menu/add")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          + Add Food
        </button>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3 w-full md:w-80"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded-lg p-3 w-full md:w-60"
        >
          <option value="">All Categories</option>
          <option value="Pizza">Pizza</option>
          <option value="Burger">Burger</option>
          <option value="Pasta">Pasta</option>
          <option value="Dessert">Dessert</option>
          <option value="Drinks">Drinks</option>
        </select>

      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Description</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredMenus.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500"
                >
                  No Menu Found
                </td>
              </tr>
            ) : (
              filteredMenus.map((food) => (
                <tr
                  key={food._id}
                  className="border-b text-center hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-16 h-16 rounded-lg object-cover mx-auto"
                    />
                  </td>

                  <td>{food.name}</td>

                  <td>{food.category}</td>

                  <td>₹{food.price}</td>

                  <td className="max-w-xs truncate">
                    {food.description}
                  </td>

                  <td className="space-x-2">

                    <button
                      onClick={() =>
                        navigate(`/admin/edit-menu/${food._id}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminMenu;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";


function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch menu details
  const fetchFood = async () => {
    try {
      const res = await API.get(`/menu/${id}`);
      setFood(res.data.menu);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);

  const handleChange = (e) => {
    setFood({
      ...food,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(`/menu/${id}`, food, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
toast.success("Menu Updated Successfully ✅");

      navigate("/admin/menu");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Update Failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-20 text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-orange-500 mb-8">
        Edit Food
      </h1>

      <form
        onSubmit={handleUpdate}
        className="space-y-5 bg-white shadow-lg p-8 rounded-xl"
      >

        <input
          type="text"
          name="name"
          value={food.name}
          onChange={handleChange}
          placeholder="Food Name"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          value={food.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="number"
          name="price"
          value={food.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          value={food.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="image"
          value={food.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-bold"
        >
          Update Menu
        </button>

      </form>

    </div>
  );
}

export default EditMenu;


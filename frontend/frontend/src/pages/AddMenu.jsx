
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function AddMenu() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);

      if (image) {
        data.append("image", image);
      }

      await API.post("/menu", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Food Added Successfully 🍽️");


      navigate("/admin/menu");
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to add food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow-xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-orange-500 mb-8">
          Add New Food
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Food Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            name="description"
            placeholder="Food Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="4"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <div>
            <label className="block mb-2 font-semibold">
              Food Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg p-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold"
          >
            {loading ? "Uploading..." : "Add Food"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddMenu;
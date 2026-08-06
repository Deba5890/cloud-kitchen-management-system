import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function ReviewForm({ menuId, fetchReviews }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await API.post(
        `/reviews/${menuId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
          toast.success("Review Submitted ⭐");



      setRating(5);
      setComment("");

      fetchReviews();

    } catch (error) {
      console.log(error.response?.data || error);
      toast.error(
      error.response?.data?.message || "Unable to submit review"
    );

    }
  };

  return (
    <div className="bg-white shadow rounded-xl p-6 mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Write a Review
      </h2>

      <form onSubmit={submitReview}>

        <label className="font-semibold">
          Rating
        </label>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border p-3 rounded mt-2"
        >
          <option value={5}>⭐⭐⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={1}>⭐</option>
        </select>

        <textarea
          rows="4"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border p-3 rounded mt-5"
        />

        <button
          className="bg-orange-500 text-white px-8 py-3 rounded-xl mt-5 hover:bg-orange-600"
        >
          Submit Review
        </button>

      </form>

    </div>
  );
}

export default ReviewForm;
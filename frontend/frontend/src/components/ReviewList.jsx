import { useEffect, useState } from "react";
import API from "../services/api";

function ReviewList({ menuId }) {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${menuId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [menuId]);

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow rounded-xl p-5 mb-5"
          >
            <h3 className="font-bold">
              {review.user.name}
            </h3>

            <p className="text-yellow-500 mt-2">
              {"⭐".repeat(review.rating)}
            </p>

            <p className="mt-3">
              {review.comment}
            </p>
          </div>
        ))
      )}

    </div>
  );
}

export default ReviewList;
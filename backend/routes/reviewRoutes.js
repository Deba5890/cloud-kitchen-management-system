const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Get all reviews of a food
router.get("/:menuId", getReviews);

// Add review
router.post("/:menuId", protect, addReview);

// Update review
router.put("/:reviewId", protect, updateReview);

// Delete review
router.delete("/:reviewId", protect, deleteReview);

module.exports = router;
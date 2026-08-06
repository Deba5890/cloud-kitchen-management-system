const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addToWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");

// Add item to wishlist
router.post("/", protect, addToWishlist);

// Get logged-in user's wishlist
router.get("/", protect, getWishlist);

// Remove item from wishlist
router.delete("/:id", protect, removeWishlist);

module.exports = router;
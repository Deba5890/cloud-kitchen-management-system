const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    menu: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate wishlist items
wishlistSchema.index(
  { user: 1, menu: 1 },
  { unique: true }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
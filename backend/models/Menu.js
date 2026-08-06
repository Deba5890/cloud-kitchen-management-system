const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    averageRating: {
  type: Number,
  default: 0,
},

totalReviews: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
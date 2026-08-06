const Wishlist = require("../models/Wishlist");

// ================================
// Add Item To Wishlist
// ================================
const addToWishlist = async (req, res) => {
  try {
    const { menuId } = req.body;

    // Check if already exists
    const existingItem = await Wishlist.findOne({
      user: req.user.id,
      menu: menuId,
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user.id,
      menu: menuId,
    });

    res.status(201).json({
      success: true,
      message: "Added to wishlist ❤️",
      wishlist,
    });

  } catch (error) {
    console.log("Add Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================================
// Get My Wishlist
// ================================
const getWishlist = async (req, res) => {
  try {

    const wishlist = await Wishlist.find({
      user: req.user.id,
    })
      .populate("menu")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });

  } catch (error) {

    console.log("Get Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ================================
// Remove Wishlist Item
// ================================
const removeWishlist = async (req, res) => {
  try {

    const item = await Wishlist.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Removed from wishlist",
    });

  } catch (error) {

    console.log("Remove Wishlist Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};
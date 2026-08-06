const Review = require("../models/Review");
const Menu = require("../models/Menu");

// ==============================
// Add Review
// ==============================
const addReview = async (req, res) => {
  try {
     console.log("req.user:", req.user);

    const { rating, comment } = req.body;
    const { menuId } = req.params;

    // Check menu exists
    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu Item Not Found",
      });
    }

    // Prevent duplicate review
    const alreadyReviewed = await Review.findOne({
      user: req.user.id,
      menu: menuId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this food.",
      });
    }

    // Create review
    const review = await Review.create({
      user: req.user.id,
      menu: menuId,
      rating,
      comment,
    });

    // Calculate average rating
    const reviews = await Review.find({ menu: menuId });

    const totalRating = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    menu.averageRating = totalRating / reviews.length;
    menu.totalReviews = reviews.length;

    await menu.save();

    res.status(201).json({
      success: true,
      message: "Review Added Successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Get Reviews
// ==============================
const getReviews = async (req, res) => {
  try {

    const reviews = await Review.find({
      menu: req.params.menuId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Update Review
// ==============================
const updateReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
      });
    }

    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;

    await review.save();

    // Update average rating
    const reviews = await Review.find({
      menu: review.menu,
    });

    const total = reviews.reduce(
      (sum, item) => sum + item.rating,
      0
    );

    await Menu.findByIdAndUpdate(review.menu, {
      averageRating: total / reviews.length,
      totalReviews: reviews.length,
    });

    res.status(200).json({
      success: true,
      message: "Review Updated Successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==============================
// Delete Review
// ==============================
const deleteReview = async (req, res) => {
  try {

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review Not Found",
      });
    }

    if (review.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const menuId = review.menu;

    await review.deleteOne();

    const reviews = await Review.find({
      menu: menuId,
    });

    let average = 0;

    if (reviews.length > 0) {
      average =
        reviews.reduce(
          (sum, item) => sum + item.rating,
          0
        ) / reviews.length;
    }

    await Menu.findByIdAndUpdate(menuId, {
      averageRating: average,
      totalReviews: reviews.length,
    });

    res.status(200).json({
      success: true,
      message: "Review Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
};
const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// User Routes
router.post("/", protect, createOrder);
router.get("/", protect, getMyOrders);

// Admin Routes
router.get("/all", protect, adminOnly, getAllOrders);
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

// This MUST be last
router.get("/:id", protect, getOrderById);

module.exports = router;
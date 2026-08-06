const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addMenu,
  getAllMenu,
  searchMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Public routes
router.get("/search", searchMenu);
router.get("/", getAllMenu);
router.get("/:id", getMenuById);

// Admin routes
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addMenu
);
router.put("/:id", protect, adminOnly, updateMenu);
router.delete("/:id", protect, adminOnly, deleteMenu);

module.exports = router;
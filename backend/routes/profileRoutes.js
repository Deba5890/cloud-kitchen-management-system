const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/profileController");

console.log("protect:", protect);
console.log("getProfile:", getProfile);

router.get("/profile", protect, getProfile);

module.exports = router;
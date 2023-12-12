// /routes/expiredjobRoutes.js
const express = require("express");
const router = express.Router();

const {
  getExpiredJobs,
  getExpiredJobById,
  // Additional controller functions you might need, like analytics or restore
} = require("../controllers/expiredjobController");

// Assuming you have authentication middleware similar to your job routes
const { protect } = require("../middleware/authMiddleware");

// Get all expired jobs
router.route("/").get(protect, getExpiredJobs);

// Get a specific expired job by ID
router.route("/:id").get(protect, getExpiredJobById);

// Additional routes for any other functionality like analytics or restoring an expired job

module.exports = router;

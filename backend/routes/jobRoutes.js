const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobID,
  getAllJobs,
  setJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobID)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

router.route("/").get(protect, getJobs).post(protect, setJob);

module.exports = router;

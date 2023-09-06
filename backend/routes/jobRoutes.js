const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../config/multerConfig");

const {
  getJobs,
  getJobID,
  getAllJobs,
  setJob,
  updateJob,
  deleteJob,
  applyToJob, //
  updateApplicationStatus, //
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getJobs).post(protect, uploadMiddleware, setJob);

//Get all jobs PUBLIC
router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobID)
  .delete(protect, deleteJob)
  .put(protect, uploadMiddleware, updateJob);

// Apply to a job
router.post("/apply", applyToJob);

// Update application status
router.put(
  "/updateApplicationStatus/:jobId/:studentId",
  updateApplicationStatus
);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  setSForm,
  updateSForm,
  getProfile,
  getStudentProfileForJobPoster,
  deleteProfile,
} = require("../controllers/fileUploadController");
const s3uploadDocs = require("../config/s3DocsmulterConfig");
const { protectS } = require("../middleware/authSMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protectS, s3uploadDocs.single("cv"), setSForm);
router.route("/:id").put(protectS, updateSForm);
router.route("/").get(protectS, getProfile);

router.route("/:id").delete(protectS, deleteProfile);
router.get("/view/:studentId", protect, getStudentProfileForJobPoster);
module.exports = router;

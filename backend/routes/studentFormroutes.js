const express = require("express");
const router = express.Router();
const {
  setSForm,
  updateSForm,
  getProfile,
  getStudentProfileForJobPoster,
  deleteProfile,
} = require("../controllers/fileUploadController");

const { protectS } = require("../middleware/authSMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protectS, setSForm);
router.route("/:id").put(protectS, updateSForm);
router.route("/").get(protectS, getProfile);

router.route("/:id").delete(protectS, deleteProfile);
router.get("/view/:studentId", protect, getStudentProfileForJobPoster);
module.exports = router;

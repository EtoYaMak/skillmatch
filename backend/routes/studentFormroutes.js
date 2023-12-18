const express = require("express");
const router = express.Router();
const {
  setSForm,
  updateSForm,
  getProfile,
  getStudentProfileForJobPoster,
  deleteProfile,
} = require("../controllers/fileUploadController");
const uploadfiles = require("../config/s3multerConfigProfile");
const { s3uploadDocs } = require("../config/s3DocsmulterConfig");
const { s3ProfileImages } = require("../config/s3ApplicantProfileImages");
const { protectS } = require("../middleware/authSMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(
  protectS,
  uploadfiles.fields([
    { name: "bannerImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
    { name: "ApplicantCV", maxCount: 1 },
  ]),
  setSForm
);
router.route("/:id").put(protectS, updateSForm);
router.route("/").get(protectS, getProfile);

router.route("/:id").delete(protectS, deleteProfile);
router.get("/view/:studentId", protect, getStudentProfileForJobPoster);
module.exports = router;

const express = require("express");
const router = express.Router();
const {
  setSForm,
  updateSForm,
  getProfile,
  deleteProfile,
} = require("../controllers/fileUploadController");

const { protectS } = require("../middleware/authSMiddleware");

router.route("/").post(protectS, setSForm);
router.route("/:id").put(protectS, updateSForm);
router.route("/").get(protectS, getProfile);
router.route("/:id").delete(protectS, deleteProfile);

module.exports = router;

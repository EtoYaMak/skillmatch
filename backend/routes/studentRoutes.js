const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getMeS,
  activateStudentS,
  forgotPasswordS,
  resetPasswordS,
  getAllStudents,
} = require("../controllers/studentController");
const { protectS } = require("../middleware/authSMiddleware");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerStudent);
router.post("/login", loginStudent);
router.post("/activate/:type/:token", activateStudentS);
router.post("/forgot", forgotPasswordS);
router.post("/reset/:type/:token", resetPasswordS);
router.get("/me", protectS, getMeS);
router.get("/all", protect, getAllStudents);
module.exports = router;

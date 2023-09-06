const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getMeS,
  activateStudentS,
  forgotPasswordS,
  resetPasswordS,
} = require("../controllers/studentController");
const { protectS } = require("../middleware/authSMiddleware");

router.post("/", registerStudent);
router.post("/login", loginStudent);
router.post("/activate/:type/:token", activateStudentS);
router.post("/forgot", forgotPasswordS);
router.post("/reset/:type/:token", resetPasswordS);
router.get("/me", protectS, getMeS);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  getMeS,
} = require("../controllers/studentController");
const { protectS } = require("../middleware/authSMiddleware");

router.post("/", registerStudent);
router.post("/login", loginStudent);
router.get("/me", protectS, getMeS);

module.exports = router;

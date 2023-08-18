const express = require("express");
const router = express.Router();
const {
  registerUser,
  activateUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/activate/:token", activateUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  registerUser,
  activateUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/activate/:type/:token", activateUser);
router.post("/forgot", forgotPassword);
router.post("/reset/:type/:token", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;

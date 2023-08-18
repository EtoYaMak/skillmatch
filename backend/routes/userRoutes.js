const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { activateUser } = require("../controllers/userController");

router.post("/", registerUser);
router.get("/activate/:token", activateUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;

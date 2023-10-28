const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  registerSuperuser,
  activateSuperuser,
  loginSuperuser,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/superuserController");
router.post("/", registerSuperuser);
router.post("/login", loginSuperuser);
router.post("/activate/:type/:token", activateSuperuser);
router.post("/forgot", forgotPassword);
router.post("/reset/:type/:token", resetPassword);
router.get("/me", protect, getMe);

module.exports = router;

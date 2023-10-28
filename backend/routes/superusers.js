const express = require("express");
const router = express.Router();
const { protectAdmin } = require("../middleware/adminMiddleware");
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
router.get("/me", protectAdmin, getMe);

module.exports = router;

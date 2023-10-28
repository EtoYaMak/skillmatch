const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Superuser = require("../models/userModel");

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // GET user from the token
      req.superuser = await Superuser.findById(decoded.id).select("-password");
      if (req.superuser && !req.superuser.isActive) {
        res.status(403);
        throw new Error("Account not activated");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token Found");
  }
});

module.exports = {
  protectAdmin,
};

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const Superuser = require("../models/superuserModel");

const protectAD = asyncHandler(async (req, res, next) => {
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
      // Attempt to find a user Superuser model
      let user = await Superuser.findById(decoded.id).select("-password");

      if (user && !user.isActive) {
        res.status(403);
        throw new Error("Account not activated");
      }

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      // Attach the user to req.user
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protect middleware:", error); // Log the error
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
  protectAD,
};

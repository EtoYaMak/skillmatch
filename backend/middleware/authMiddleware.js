const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Superuser = require("../models/superuserModel");

const protect = asyncHandler(async (req, res, next) => {
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

      /*       // GET user from the token
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user && !req.user.isActive) {
        res.status(403);
        throw new Error("Account not activated");
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    } */

      // Attempt to find a user in the User model or Superuser model
      let user = await User.findById(decoded.id).select("-password");
      if (!user) {
        user = await Superuser.findById(decoded.id).select("-password");
      }

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
  protect,
};

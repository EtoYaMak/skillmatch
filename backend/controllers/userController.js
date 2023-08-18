const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//@desc Register new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isActive: false,
  });

  // Generate activation token
  const activationToken = crypto.randomBytes(20).toString("hex");

  // Save activation token to user along with expiry date
  user.activationToken = activationToken;
  user.activationTokenExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create the activation link
  const activationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/users/activate/${activationToken}`;

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME, // Change this
      pass: process.env.EMAIL_PASSWORD, // Change this
    },
  });
  await transporter
    .sendMail({
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Activate Your Account",
      text: `Please click the following link to activate your account: ${activationLink}`,
    })
    .catch((error) => {
      console.error("Failed to send activation email:", error);
      // You might also want to handle this error in your response
    });

  if (user) {
    res.status(201).json({
      message: "Please check your email to activate your account",
      _id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive, // Include this field in the response
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
//!!!!!!!!!!!!!!!!!
const activateUser = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({
    activationToken: token,
    activationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired activation token");
  }

  user.isActive = true; // make sure you have this field in your schema
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Account activated successfully" });
});
//!!!!!!!!!!!!!!!!!
const requestPasswordReset = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Generate and save password reset token
  user.passwordResetToken = crypto.randomBytes(20).toString("hex");
  user.passwordResetTokenExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Create reset link
  const resetLink = `${req.protocol}://${req.get("host")}/api/users/reset/${
    user.passwordResetToken
  }`;

  // Send email
  await transporter.sendMail({
    to: user.email,
    subject: "Password Reset",
    text: `Please click the following link to reset your password: ${resetLink}`,
  });

  res
    .status(200)
    .json({ message: "Please check your email to reset your password" });
});
//!!!!!!!!!!!!!!!!!
const resetPassword = asyncHandler(async (req, res) => {
  const token = req.params.token;
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successfully" });
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await User.findOne({ email });
  // Check if the account is activated
  if (!user.isActive) {
    res.status(400);
    throw new Error(
      "Account not activated. Please check your email to activate your account."
    );
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc Get user data
//@route GET /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  /*   const { _id, name, email } = await User.findById(req.user.id) */
  /* 
    res.status(200).json({
        id: _id,
        name,
        email,
    }) */
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  activateUser,
  requestPasswordReset,
  resetPassword,
  loginUser,
  getMe,
};

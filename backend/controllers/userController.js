const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const IP_ADDRESS = process.env.SERVER_ADDRESS_FRONT;
const AWS_IP = process.env.AWS_IP_ADDRESS;

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

//@desc Get user data
//@route GET /api/users/me
//@access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
//@desc Register new User
//@route POST /api/users
//@access PUBLIC
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
    type: 1,
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
  )}/api/users/activate/1/${activationToken}`;

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
      /* text: `Please click the following link to activate your account: ${activationLink}`, */
      text: `Please click the following link to activate your account:\n\n${AWS_IP}/activate/${user.type}/${activationToken}\n\n`,
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
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//@desc Reset Password
//@route GET /api/users/activate/:token
//@access PUBLIC
const activateUser = asyncHandler(async (req, res) => {
  const { type, token } = req.params;
  if (type !== "1") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const user = await User.findOne({
    activationToken: token,
    activationTokenExpires: { $gt: Date.now() },
    type: type,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired activation token");
  }

  user.isActive = true; // make sure you have this field in your schema
  user.activationToken = undefined;
  user.activationTokenExpires = undefined;
  await user.save();

  res
    .status(200)
    .json({ message: "Account activated successfully", isActive: true });
});

//@desc Authenticate a user
//@route POST /api/users/login
//@access PUBLIC
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

// Updated forgotPassword
const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // Send email using Nodemailer
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USERNAME, // Replace with your email
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) requested a password reset. Click the link below to reset your password :\n\n${AWS_IP}/reset/${user.type}/${token}\n\n`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ message: "Error sending email" });
    } else {
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
};

// Reset Password
const resetPassword = async (req, res) => {
  const { type, token } = req.params;
  if (type !== "1") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
    type: type,
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.status(200).json({ message: "Password updated successfully" });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  activateUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
  getAllUsers,
};

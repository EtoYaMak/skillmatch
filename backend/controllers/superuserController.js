const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Superuser = require("../models/superuserModel");
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

//@desc Get Superuser data
//@route GET /api/superusers/me
//@access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.superuser);
});
//@desc Register new Superuser
//@route POST /api/superusers
//@access PUBLIC
const registerSuperuser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const SuperuserExists = await Superuser.findOne({ email });

  if (SuperuserExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const Suser = await Superuser.create({
    name,
    email,
    password: hashedPassword,
    isActive: false,
    type: 99,
    isAdmin: true,
  });

  // Generate activation token
  const activationToken = crypto.randomBytes(20).toString("hex");

  // Save activation token to user along with expiry date
  Suser.activationToken = activationToken;
  Suser.activationTokenExpires = Date.now() + 3600000; // 1 hour
  await Suser.save();

  // Create the activation link
  const activationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/superusers/activate/99/${activationToken}`;

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
      to: Suser.email,
      subject: "Activate Your Account",
      /* text: `Please click the following link to activate your account: ${activationLink}`, */
      text: `Please click the following link to activate your account:\n\n${AWS_IP}/activate/${Suser.type}/${activationToken}\n\n`,
    })
    .catch((error) => {
      console.error("Failed to send activation email:", error);
      // You might also want to handle this error in your response
    });

  if (Suser) {
    res.status(201).json({
      message: "Please check your email to activate your account",
      _id: Suser.id,
      name: Suser.name,
      email: Suser.email,
      isActive: Suser.isActive,
      token: generateToken(Suser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});
//@desc Reset Password
//@route GET /api/superusers/activate/:token
//@access PUBLIC
const activateSuperuser = asyncHandler(async (req, res) => {
  const { type, token } = req.params;
  if (type !== "99") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const Suser = await Superuser.findOne({
    activationToken: token,
    activationTokenExpires: { $gt: Date.now() },
    type: type,
  });

  if (!Suser) {
    res.status(400);
    throw new Error("Invalid or expired activation token");
  }

  Suser.isActive = true; // make sure you have this field in your schema
  Suser.activationToken = undefined;
  Suser.activationTokenExpires = undefined;
  await Suser.save();

  res
    .status(200)
    .json({ message: "Account activated successfully", isActive: true });
});

//@desc Authenticate a user
//@route POST /api/superusers/login
//@access PUBLIC
const loginSuperuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const Suser = await Superuser.findOne({ email });
  // Check if the account is activated
  if (!Suser.isActive) {
    res.status(400);
    throw new Error(
      "Account not activated. Please check your email to activate your account."
    );
  }
  if (Suser && (await bcrypt.compare(password, Suser.password))) {
    res.json({
      _id: Suser.id,
      name: Suser.name,
      email: Suser.email,
      isAdmin: Suser.isAdmin,
      //isActive: Suser.isActive,
      token: generateToken(Suser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// Updated forgotPassword
const forgotPassword = async (req, res) => {
  const Suser = await Superuser.findOne({ email: req.body.email });
  if (!Suser) {
    return res.status(404).json({ message: "User not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  Suser.resetPasswordToken = token;
  Suser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await Suser.save();

  // Send email using Nodemailer
  const mailOptions = {
    to: Suser.email,
    from: process.env.EMAIL_USERNAME, // Replace with your email
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) requested a password reset. Click the link below to reset your password :\n\n${AWS_IP}/reset/${Suser.type}/${token}\n\n`,
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
  if (type !== "99") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const Suser = await Superuser.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
    type: type,
  });

  if (!Suser) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  Suser.password = hashedPassword;
  Suser.resetPasswordToken = undefined;
  Suser.resetPasswordExpires = undefined;

  await Suser.save();
  res.status(200).json({ message: "Password updated successfully" });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
module.exports = {
  registerSuperuser,
  activateSuperuser,
  loginSuperuser,
  forgotPassword,
  resetPassword,
  getMe,
};

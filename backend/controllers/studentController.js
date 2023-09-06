const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Initialize Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
//@desc Register new Student
//@route POST /api/students
//@access Public
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields!");
  }

  //Check if user exists
  const stuExists = await Student.findOne({ email });

  if (stuExists) {
    res.status(400);
    throw new Error("Student Account Already Exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create Student
  const student = await Student.create({
    name,
    email,
    password: hashedPassword,
    isActive: false,
    type: 2,
  });

  // Generate activation token
  const activationToken = crypto.randomBytes(20).toString("hex");

  // Save activation token to user along with expiry date
  student.activationToken = activationToken;
  student.activationTokenExpires = Date.now() + 3600000; // 1 hour
  await student.save();

  // Create the activation link
  const activationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/students/activate/${activationToken}`;

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
      to: student.email,
      subject: "Activate Your Account",
      //text: `Please click the following link to activate your account: ${activationLink}`,
      text: `Please click the following link to activate your account:\n\nhttp://localhost:3000/activate/${student.type}/${activationToken}\n\n`,
    })
    .catch((error) => {
      console.error("Failed to send activation email:", error);
      // You might also want to handle this error in your response
    });
  if (student) {
    res.status(201).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      isActive: student.isActive,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Student User Data");
  }
});
//@desc Reset Password
//@route GET /api/students/activate/:token
//@access PUBLIC
const activateStudentS = asyncHandler(async (req, res) => {
  const { type, token } = req.params;
  if (type !== "2") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const student = await Student.findOne({
    activationToken: token,
    activationTokenExpires: { $gt: Date.now() },
    type: type,
  });

  if (!student) {
    res.status(400);
    throw new Error("Invalid or expired activation token");
  }

  student.isActive = true; // make sure you have this field in your schema
  student.activationToken = undefined;
  student.activationTokenExpires = undefined;
  await student.save();

  res
    .status(200)
    .json({ message: "Account activated successfully", isActive: true });
});

// Updated forgotPassword
const forgotPasswordS = async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });
  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  student.resetPasswordToken = token;
  student.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await student.save();

  // Send email using Nodemailer
  const mailOptions = {
    to: student.email,
    from: process.env.EMAIL_USERNAME, // Replace with your email
    subject: "Password Reset",
    text: `You are receiving this because you (or someone else) requested a password reset. Click the link below to reset your password:\n\nhttp://localhost:3000/reset/${student.type}/${token}\n\n`,
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
const resetPasswordS = async (req, res) => {
  const { type, token } = req.params;
  if (type !== "2") {
    res.status(400);
    throw new Error("Invalid account type for activation");
  }
  const student = await Student.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
    type: type,
  });

  if (!student) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  student.password = hashedPassword;
  student.resetPasswordToken = undefined;
  student.resetPasswordExpires = undefined;

  await student.save();
  res.status(200).json({ message: "Password updated successfully" });
};

//@desc Authenticate a user
//@route POST /api/students/login
//@access Public
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const student = await Student.findOne({ email });

  if (student && (await bcrypt.compare(password, student.password))) {
    res.json({
      _id: student.id,
      name: student.name,
      email: student.email,
      isActive: student.isActive,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc Get student data
//@route GET /api/students/me
//@access Private
const getMeS = asyncHandler(async (req, res) => {
  // The student's data is already available in req.student due to the middleware
  res.status(200).json(req.student);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//
//
//
//

module.exports = {
  registerStudent,
  loginStudent,
  getMeS,
  activateStudentS,
  forgotPasswordS,
  resetPasswordS,
};

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");

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

  //Create User
  const student = await Student.create({
    name,
    email,
    password: hashedPassword,
  });

  if (student) {
    res.status(201).json({
      _id: student.id,
      name: student.name,
      email: student.email,
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Student User Data");
  }
});

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
      token: generateToken(student._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

//@desc Get user data
//@route GET /api/students/me
//@access Private
const getMeS = asyncHandler(async (req, res) => {
  /*   const { _id, name, email } = await User.findById(req.user.id) */
  /* 
    res.status(200).json({
        id: _id,
        name,
        email,
    }) */
  res.status(200).json(req.student);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerStudent,
  loginStudent,
  getMeS,
};

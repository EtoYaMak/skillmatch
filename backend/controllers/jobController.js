const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const multer = require("multer");
const sharp = require("sharp");

const path = require("path");

//
const DIR = "././public/uploads/";

/////////////////////////////////////////////////////
// @desc Get job by ID
// @route GET /api/jobs/:id
// @access Public
const getJobID = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve job" });
  }
});

/////////////////////////////////////////////////////
// @desc Get all jobs
// @route GET /api/jobs
// @access Public
// Add a new handler function for getAllJobs
const getAllJobs = asyncHandler(async (req, res) => {
  // Find all jobs in the database
  const jobs = await Job.find();

  // Send the list of jobs back to the client
  res.status(200).json(jobs);
  /*   res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  }); */
});

// @desc Get Jobs
// @route GET /api/jobs
// @access Private
const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find({ user: req.user.id });

  res.status(200).json(jobs);
});

// @desc Set Jobs
// @route POST /api/jobs
// @access Private

const setJob = asyncHandler(async (req, res) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const dataUpload = multer();
  const fileUpload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 2.5,
    },
    fileFilter,
  });

  fileUpload.single("logo")(req, res, async (err) => {
    if (err) {
      if (!filename) {
        throw new Error("File not selected");
      }
      return res.status(500).send(err);
    }

    const resizedImage = await sharp(req.file.path)
      .resize({ width: 160 })
      .toBuffer();

    await sharp(resizedImage).toFile(req.file.path);

    const user = req.user.id;
    const postedBy = req.user.name;
    const type = [
      { name: "fulltime", value: req.body.fulltime },
      { name: "parttime", value: req.body.parttime },
      { name: "internship", value: req.body.internship },
      { name: "contract", value: req.body.contract },
    ];
    const setting = [
      { name: "remote", value: req.body.remote },
      { name: "hybrid", value: req.body.hybrid },
      { name: "onsite", value: req.body.onsite },
    ];
    req.body.type = type;
    req.body.setting = setting;

    const {
      position,
      location,
      careerPage,
      company,
      website,
      description,
      skills,
    } = req.body;
    const logo = "/uploads/" + req.file.filename;

    const newJob = await Job.create({
      user,
      postedBy,
      position,
      location,
      careerPage,
      company,
      website,
      logo,
      type,
      setting,
      description,
      skills,
    });
    res.status(200).json(newJob);
  });
});
// @desc Update Jobs
// @route PUT /api/jobs/:id
// @access Private
const updateJob = asyncHandler(async (req, res) => {
  const ujob = await Job.findById(req.params.id);

  if (!ujob) {
    res.status(400);
    throw new Error("Job not found BACKEND");
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found BACKEND");
  }

  // Make Sure the logged in user matches the job user
  if (ujob.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized BACKEND");
  }

  const {
    position,
    location,
    careerPage,
    company,
    website,
    remote,
    description,
    fulltime,
    parttime,
    internship,
    contract,
    hybrid,
    onsite,
  } = req.body;

  // Create an array with the values of the fulltime, parttime, internship, and contract fields
  const type = [
    { name: "fulltime", value: fulltime },
    { name: "parttime", value: parttime },
    { name: "internship", value: internship },
    { name: "contract", value: contract },
  ];
  const setting = [
    { name: "remote", value: remote },
    { name: "hybrid", value: hybrid },
    { name: "onsite", value: onsite },
  ];

  // Update the job fields
  ujob.position = position;
  ujob.location = location;
  ujob.careerPage = careerPage;
  ujob.company = company;
  ujob.website = website;
  ujob.setting = setting;
  ujob.description = description;
  ujob.type = type;

  // If a new logo file is uploaded, resize and save it
  if (req.file) {
    const resizedImage = await sharp(req.file.path)
      .resize({ width: 160 })
      .toBuffer();

    await sharp(resizedImage).toFile(req.file.path);

    ujob.logo = "/uploads/" + req.file.filename;
  }

  const updatedJob = await ujob.save();

  res.status(200).json(updatedJob);
});

/* const updateJob = asyncHandler(async (req, res) => {
  const ujob = await Job.findById(req.params.id);

  if (!ujob) {
    res.status(400);
    throw new Error("Job not found BACKEND");
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found BACKEND");
  }

  // Make Sure the logged in user matches the job user
  if (ujob.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized BACKEND");
  }

  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedJob);
}); */

// @desc Delete Jobs
// @route DELETE /api/jobs/:id
// @access Private
const deleteJob = asyncHandler(async (req, res) => {
  const djob = await Job.findById(req.params.id);

  if (!djob) {
    res.status(409);
    throw new Error("Job Not Found");
  }

  const user = await User.findById(req.user.id);

  // Check for User
  if (!req.user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // Make Sure the logged in user matches the job user
  if (djob.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJobID,
  getJobs,
  getAllJobs,
  setJob,
  updateJob,
  deleteJob,
};

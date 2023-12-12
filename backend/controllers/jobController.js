// /controllers/jobControllers
const asyncHandler = require("express-async-handler");
const Job = require("../models/jobModel");
const User = require("../models/userModel");
const Superuser = require("../models/superuserModel");
const Student = require("../models/studentModel");
// /S3multer
const { deleteObjectFromS3 } = require("../config/s3multerConfig");

const sharp = require("sharp");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
// Load environment variables
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

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
});

// @desc Get Jobs
// @route GET /api/jobs
// @access Private
// @desc Get Jobs
// @route GET /api/jobs
// @access Private (for authenticated user) / Public (for non-authenticated user)
const getJobs = asyncHandler(async (req, res) => {
  if (req.user) {
    // Authenticated user: Return the jobs created by the user
    const jobs = await Job.find({ user: req.user.id });
    res.status(200).json(jobs);
  } else {
    // Non-authenticated user (public access): Return all jobs
    const jobs = await Job.find();
    res.status(200).json(jobs);
  }
});
// @desc Set Jobs S3 Implementation Test
// @route POST /api/jobs
// @access Private
const setJob = async (req, res) => {
  try {
    // Resize image and upload to S3 if file is present
    if (req.file) {
      const resizedImage = await sharp(req.file.buffer)
        .resize(250, 250, { fit: "cover", position: "center" })
        .toBuffer();

      const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      });

      const uploadParams = {
        Bucket: "skillmint-job-images",
        Key: `job-images/${Date.now().toString()}-${req.file.originalname}`,
        Body: resizedImage,
        ACL: "public-read",
        ContentType: req.file.mimetype, // Dynamically set based on the file's MIME type
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      // Update the logo URL for the new job
      req.body.logo = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    }
    const user = req.user.id;
    const postedBy = req.user.name;

    const type = [
      { name: "Full-time", value: req.body.fulltime },
      { name: "Internship", value: req.body.internship },
      { name: "Contract", value: req.body.contract },
    ];
    const setting = [
      { name: "Remote", value: req.body.remote },
      { name: "Hybrid", value: req.body.hybrid },
      { name: "On-site", value: req.body.onsite },
    ];
    req.body.type = type;
    req.body.setting = setting;

    const {
      featured,
      position,
      city,
      country,
      department,
      salary,
      careerPage,
      company,
      website,
      description,
      skills,
    } = req.body;
    console.log(position);
    const logo = req.body.logo;
    console.log("req.body.logo: ", req.body.logo);

    const newJob = await Job.create({
      user,
      postedBy,
      featured,
      position,
      city,
      country,
      department,
      salary,
      careerPage,
      company,
      website,
      logo,
      type,
      setting,
      description,
      skills,
      applicants: [],
    });
    console.log("newJob created: ", newJob);
    res.status(200).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc Update Jobs
// @route PUT /api/jobs/:id
// @access Private
// @desc Update Existing Job
// @route PUT /api/jobs/:jobId
// @access Private
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const ujob = await Job.findById(jobId);
    console.log(ujob.logo);
    if (req.file) {
      // Delete the old image from S3 if it exists
      if (ujob.logo) {
        const urlParts = ujob.logo.split("/");
        const key = `job-images/${urlParts[urlParts.length - 1]}`;
        await deleteObjectFromS3(key);
      }
      const resizedImage = await sharp(req.file.buffer)
        .resize(250, 250, { fit: "cover", position: "center" })
        .toBuffer();

      const s3Client = new S3Client({
        region: AWS_REGION,
        credentials: {
          accessKeyId: AWS_ACCESS_KEY_ID,
          secretAccessKey: AWS_SECRET_ACCESS_KEY,
        },
      });

      const uploadParams = {
        Bucket: "skillmint-job-images",
        Key: `job-images/${Date.now().toString()}-${req.file.originalname}`,
        Body: resizedImage,
        ACL: "public-read",
        ContentType: req.file.mimetype,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      req.body.logo = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    }

    const {
      position,
      city,
      country,
      department,
      salary,
      careerPage,
      company,
      website,
      description,
      skills,
    } = req.body;

    const type = [
      { name: "Full-time", value: req.body.fulltime },
      { name: "Internship", value: req.body.internship },
      { name: "Contract", value: req.body.contract },
    ];
    const setting = [
      { name: "Remote", value: req.body.remote },
      { name: "Hybrid", value: req.body.hybrid },
      { name: "On-site", value: req.body.onsite },
    ];

    const logo = req.body.logo;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id },
      {
        position,
        city,
        country,
        department,
        salary,
        careerPage,
        company,
        website,
        logo,
        type,
        setting,
        description,
        skills,
      },
      { new: true }
    );

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
  // Delete the document from the S3 bucket
  const urlParts = djob.logo.split("/");
  const key = `job-images/${urlParts[urlParts.length - 1]}`;

  await deleteObjectFromS3(key);

  // Delete the job from MongoDB
  await Job.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

//
//
// Method to update the application status
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { jobId, studentId } = req.params;
  const { newStatus } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404);
      throw new Error("Job not found");
    }

    // Update status in job's applicants array
    const applicant = job.applicants.find(
      (applicant) => applicant.student.toString() === studentId
    );
    if (!applicant) {
      res.status(404);
      throw new Error("Applicant not found");
    }
    applicant.status = newStatus;

    await job.save();

    // Update the student's status as well
    await Student.updateOne(
      { _id: studentId, "appliedJobs.job": jobId },
      { $set: { "appliedJobs.$.status": newStatus } }
    );

    res.json({ message: "Application status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//
//Student Applies to Job
//
const applyToJob = async (req, res) => {
  const { jobId, studentId } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if student has already applied to this job
    const alreadyApplied = student.appliedJobs.find((app) =>
      app.job.equals(jobId)
    );
    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "Student has already applied to this job" });
    }

    // Update the job's applicants array
    job.applicants.push({ student: studentId, timestamp: Date.now() });

    // Update the student's appliedJobs array
    student.appliedJobs.push({ job: jobId, timestamp: Date.now() });

    await job.save();
    await student.save();

    return res.status(200).json({ message: "Application successful" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

//
//Exports
//
module.exports = {
  getJobID,
  getJobs,
  getAllJobs,
  setJob,
  updateJob,
  deleteJob,
  updateApplicationStatus,
  applyToJob,
};

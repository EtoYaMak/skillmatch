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
//
//const DIR = path.join(__dirname, "../../client/public/uploads/");
/* const DIR = "../../client/public/uploads"; */

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
        .resize(360, 360, { fit: "cover", position: "center" })
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
      { name: "Part-time", value: req.body.parttime },
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
      position,
      city,
      country,
      location,
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
      position,
      city,
      country,
      location,
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

// @desc Set Jobs
// @route POST /api/jobs
// @access Private
/* const setJob = async (req, res) => {
  try {
    const resizedImage = await sharp(req.file.path)
      .resize({ width: 160, height: 160, fit: "cover", position: "center" })
      .toBuffer();
    // Generate a new file name for the resized image
    const resizedFileName = `job_${req.file.filename}`;

    // Define the path for the resized image
    const resizedImagePath = path.join(DIR, resizedFileName);

    // Save the resized image to the specified path
    await sharp(resizedImage).toFile(resizedImagePath);
    // Remove the original image
    fs.unlinkSync(req.file.path); // Requires the 'fs' module

    const user = req.user.id;
    console.log(user);
    const postedBy = req.user.name;
    console.log(postedBy);

    const type = [
      { name: "Full-time", value: req.body.fulltime },
      { name: "Part-time", value: req.body.parttime },
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
      position,
      city,
      country,
      location,
      careerPage,
      company,
      website,
      description,
      skills,
    } = req.body;
    //const logo = "/uploads/" + req.file.filename;
    const logo = "/uploads/" + resizedFileName; // Use the new file name

    const newJob = await Job.create({
      user,
      postedBy,
      position,
      city,
      country,
      location,
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
    res.status(200).json(newJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; */
// @desc Update Jobs
// @route PUT /api/jobs/:id
// @access Private
const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id; // Assuming you pass the job ID in the URL
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if the user is authorized to update the job (you can add your own authorization logic)

    // Check if a new logo file is uploaded
    if (req.file) {
      // Resize and save the new logo
      const resizedImage = await sharp(req.file.path)
        .resize({ width: 160, height: 160, fit: "cover", position: "center" })
        .toBuffer();

      await sharp(resizedImage).toFile(req.file.path);

      job.logo = "/uploads/" + req.file.filename;
    }

    // Update other job properties
    job.position = req.body.position || job.position;
    job.city = req.body.city || job.city;
    job.country = req.body.country || job.country;
    job.location = req.body.location || job.location;
    job.careerPage = req.body.careerPage || job.careerPage;
    job.company = req.body.company || job.company;
    job.website = req.body.website || job.website;
    job.description = req.body.description || job.description;
    job.skills = req.body.skills || job.skills;

    // Save the updated job
    const updatedJob = await job.save();
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

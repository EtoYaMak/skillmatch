// In /controllers/expiredjobController.js
const ExpiredJob = require("../models/expiredjobModel");
const Job = require("../models/jobModel");

const asyncHandler = require("express-async-handler");

/////////////////////////////////////////////////////
// @desc Get job by ID
// @route GET /api/jobs/:id
// @access Public
const getExpiredJobById = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  try {
    const expiredJob = await ExpiredJob.findById(jobId);
    if (!expiredJob) {
      res.status(404).json({ error: "Job not found" });
      return;
    }
    res.json(expiredJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve job" });
  }
});

const getExpiredJobs = async (req, res) => {
  try {
    const expiredJobs = await ExpiredJob.find({});
    res.json(expiredJobs);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const moveExpiredJobsToArchive = async () => {
  try {
    const now = new Date();
    const expiredJobs = await Job.find({ expirationDate: { $lte: now } });

    if (expiredJobs.length === 0) {
      console.log("No expired jobs to move at this time.");
      return;
    }

    await Promise.all(
      expiredJobs.map(async (job) => {
        const expiredJob = new ExpiredJob(job.toObject());
        await expiredJob.save();
        await Job.findByIdAndDelete(job._id);
        console.log(`Moved job with ID ${job._id} to the archive.`);
      })
    );

    console.log(`${expiredJobs.length} expired jobs moved successfully.`);
  } catch (error) {
    console.error("Error moving expired jobs:", error);
    // Optionally, you could add more detailed error handling here
  }
};
module.exports = {
  getExpiredJobs,
  getExpiredJobById,
  moveExpiredJobsToArchive,
};

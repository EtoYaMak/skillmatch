const asyncHandler = require("express-async-handler");
const studentForm = require("../models/studentFormModel");
const Student = require("../models/studentModel");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const studentFormModel = require("../models/studentFormModel");
const multer = require("multer");
const path = require("path");
const DIR = path.join(__dirname, "../../client/public/submissions/");
const {
  s3uploadDocs,
  deleteObjectFromS3,
} = require("../config/s3DocsmulterConfig");
const { s3ProfileImages } = require("../config/s3ApplicantProfileImages");
/* const DIR = "../../client/public/submissions/"; */

const getProfile = asyncHandler(async (req, res) => {
  const studentId = req.student.id;
  const profile = await studentForm.findOne({ student: studentId });

  if (!profile) {
    // Instead of just sending a 404 status, add a custom property to the response
    return res
      .status(404)
      .json({ message: "No profile found for the student" });
  }

  res.json(profile);
});

//
//FOR JOB POSTER DASHBOARD
const getStudentProfileForJobPoster = asyncHandler(async (req, res) => {
  const studentId = req.params.studentId; // Get studentId from URL parameter
  const profile = await studentForm.findOne({ student: studentId });

  if (!profile) {
    res.status(404);
    throw new Error("Student profile not found");
  }

  // You might want to perform additional authorization checks here
  // to ensure that the Job Poster is allowed to access this profile.

  res.json(profile);
});
//
//
const setSForm = async (req, res) => {
  try {
    const studentId = req.student.id; // Assuming this is the authenticated student's ID
    const studentName = req.student.name; // Assuming you have the student's name available

    // Process content
    const { headerContent, aboutSection, experiences, education } = req.body;

    // Initialize the object to be saved/updated
    let formData = {
      student: studentId,
      studentName,
      headerContent,
      aboutSection,
      experiences,
      education,
    };

    // Handle file uploads, assuming multer-s3 sets file location in req.file.location
    if (req.files) {
      if (req.files["bannerImage"] && req.files["bannerImage"][0]) {
        formData.bannerImage = req.files["bannerImage"][0].location;
      }
      if (req.files["profileImage"] && req.files["profileImage"][0]) {
        formData.profileImage = req.files["profileImage"][0].location;
      }
      if (req.files["ApplicantCV"] && req.files["ApplicantCV"][0]) {
        formData.ApplicantCV = req.files["ApplicantCV"][0].location;
      }
    }

    // Check if a profile already exists for the student
    let profile = await studentForm.findOne({ student: studentId });

    if (profile) {
      // Update the existing profile
      profile = await studentForm.findOneAndUpdate(
        { student: studentId },
        { $set: formData },
        { new: true }
      );
    } else {
      // Create a new profile
      profile = await studentForm.create(formData);
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* const setSForm = asyncHandler(async (req, res) => {
  try {
    const student = req.student.id;
    const studentName = req.student.name;

    console.log(req.body);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}); */

/* const setSForm = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No File was selected!" });
    }

    const { University, Degree, DegreeTitle } = req.body;
    if (!University || !Degree || !DegreeTitle) {
      return res.status(400).json({ message: "Missing required form fields" });
    }

    const student = req.student.id;
    const studentName = req.student.name;
    const cv = req.file.location; // Use 'key' instead of 'filename' for S3
    console.log("CV file: ", cv);
    console.log("REQ file: ", req.file);
    const sProfile = await studentForm.create({
      student,
      studentName,
      University,
      Degree,
      DegreeTitle,
      cv,
    });

    res.status(200).json(sProfile);
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
}); */

const updateSForm = asyncHandler(async (req, res) => {
  const formId = req.params.id;

  // Find the existing student profile by ID
  const existingProfile = await studentForm.findById(formId);

  if (!existingProfile) {
    res.status(404);
    throw new Error("Student form not found");
  }

  // Check if the logged-in student owns the profile
  if (existingProfile.student.toString() !== req.student.id) {
    res.status(403);
    throw new Error("Not authorized to update this student form");
  }

  // Update the form data
  if (req.body.University) {
    existingProfile.University = req.body.University;
  }
  if (req.body.Degree) {
    existingProfile.Degree = req.body.Degree;
  }
  if (req.body.DegreeTitle) {
    existingProfile.DegreeTitle = req.body.DegreeTitle;
  }

  // Handle file update if a new CV file is provided
  if (req.file && req.file.filename) {
    const cv = "/submissions/" + req.file.filename;

    // Delete the old CV file if it exists
    if (existingProfile.cv) {
      const oldCVPath = path.join(
        __dirname,
        "..",
        "public",
        existingProfile.cv
      );
      fs.unlinkSync(oldCVPath);
    }

    existingProfile.cv = cv;
  }

  // Save the updated profile
  const updatedProfile = await existingProfile.save();

  res.json(updatedProfile);
});

const deleteProfile = asyncHandler(async (req, res) => {
  try {
    const formId = req.params.id;
    const existingProfile = await studentForm.findById(formId);

    if (!existingProfile) {
      res.status(404).json({ message: "Student form not found" });
      return;
    }

    const student = await Student.findById(req.student.id);
    if (!req.student || !student) {
      res.status(401).json({ message: "Student not found" });
      return;
    }

    if (existingProfile.student.toString() !== req.student.id) {
      res
        .status(403)
        .json({ message: "Not authorized to update this student form" });
      return;
    }

    // Delete the document from the S3 bucket
    const urlParts = existingProfile.cv.split("/");
    const encodedFilename = urlParts[urlParts.length - 1];
    const decodedFilename = decodeURIComponent(encodedFilename);
    const key = `student-documents/${decodedFilename}`;
    console.log("Document Key:", key);
    await deleteObjectFromS3(key);
    await studentFormModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = {
  setSForm,
  updateSForm,
  getProfile,
  getStudentProfileForJobPoster,
  deleteProfile,
};

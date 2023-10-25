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

const setSForm = asyncHandler(async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, DIR);
      },
      filename: function (req, file, cb) {
        const fileNameWithoutExtension = path.parse(file.originalname).name;
        const uniqueSuffix =
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname);
        cb(
          null,
          file.fieldname + "-" + fileNameWithoutExtension + "-" + uniqueSuffix
        );
      },
    });

    const fileFilter = (req, file, cb) => {
      // Only allow certain file types
      if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/docx"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const fileUpload = multer({
      storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter,
    });

    fileUpload.single("cv")(req, res, async (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", details: err });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No File was selected!" });
      }

      const { University, Degree, DegreeTitle } = req.body;
      if (!University || !Degree || !DegreeTitle) {
        return res
          .status(400)
          .json({ message: "Missing required form fields" });
      }

      const student = req.student.id;
      const studentName = req.student.name;
      const cv = "/submissions/" + req.file.filename;

      const sProfile = await studentForm.create({
        student,
        studentName,
        University,
        Degree,
        DegreeTitle,
        cv,
      });

      res.status(200).json(sProfile);
    });
  } catch (error) {
    console.error(`An error occurred: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

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

    const cvFilePath = path.join(DIR, existingProfile.cv.substr(13));
    await unlinkAsync(cvFilePath); // Promisified fs.unlink

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

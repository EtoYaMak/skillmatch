const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const {
  getJobs,
  getJobID,
  getAllJobs,
  setJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const { protect } = require("../middleware/authMiddleware");

const DIR = path.join(__dirname, "../../client/public/uploads/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
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

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2.5, // 2.5 MB file size limit
  },
  fileFilter: fileFilter,
});

router.route("/all").get(getAllJobs);

router
  .route("/:id")
  .get(getJobID)
  .delete(protect, deleteJob)
  .put(protect, upload.single("logo"), updateJob);

router
  .route("/")
  .get(protect, getJobs)
  .post(protect, upload.single("logo"), setJob);

module.exports = router;

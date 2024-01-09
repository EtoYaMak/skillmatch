// /config/multerConfig.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// Load environment variables
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "ApplicantCV" && file.mimetype === "application/pdf") {
    // Accept PDFs for ApplicantCV
    cb(null, true);
  } else if (
    file.fieldname === "bannerImage" ||
    file.fieldname === "profileImage"
  ) {
    // Accept images for bannerImage and profileImage
    cb(null, true);
  } else {
    // Reject other file types
    cb(new Error("Invalid file type, only PDF, JPG, PNG are allowed"), false);
  }
};

const multerS3Config = multerS3({
  s3: s3,
  bucket: "skillmint-job-images",
  acl: "public-read",
  contentDisposition: "inline",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    let folder = "";
    if (file.fieldname === "ApplicantCV") {
      folder = "student-documents/";
    } else {
      folder = "Applicant-Profile-Images/";
    }
    const uniqueKey = `${folder}${Date.now().toString()}-${file.originalname}`;
    cb(null, uniqueKey);
  },
});

const uploadfiles = multer({
  storage: multerS3Config,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit
  },
});

module.exports = uploadfiles;

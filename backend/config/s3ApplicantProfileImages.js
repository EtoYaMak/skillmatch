// /config/s3ApplicantProfileImages.js
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const path = require("path");

// Load environment variables
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const s3ProfileImages = multer({
  storage: multerS3({
    fileFilter: (req, file, cb) => {
      cb(null, true);
    },
    s3: s3,
    bucket: "skillmint-job-images", // Bucket
    acl: "public-read",
    contentDisposition: "inline",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueKey = `Applicant-Profile-Images/${Date.now().toString()}-${
        file.originalname
      }`; //Applicant-Profile-Images will hold profileImage & bannerImage
      cb(null, uniqueKey);
    },
    metadata: function (req, file, cb) {
      cb(null, {});
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // Adjust the limit as needed
  },
});

module.exports = { s3ProfileImages };

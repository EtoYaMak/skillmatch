// /config/s3multerConfig.js
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

// Load environment variables
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;

const s3 = new S3Client({
  region: AWS_REGION, // Add your AWS region here
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const s3uploadDocs = multer({
  storage: multerS3({
    fileFilter: (req, file, cb) => {
      // Only allow certain file types
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
    s3: s3,
    bucket: "skillmint-job-images",
    acl: "public-read",
    contentDisposition: "inline",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueKey = `student-documents/${Date.now().toString()}-${
        file.originalname
      }`;
      cb(null, uniqueKey);
    },
    metadata: function (req, file, cb) {
      cb(null, {});
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = s3uploadDocs;

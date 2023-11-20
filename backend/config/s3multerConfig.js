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

const s3upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "skillmint-job-images",
    key: function (req, file, cb) {
      const uniqueKey = `job-images/${Date.now().toString()}-${
        file.originalname
      }`;
      cb(null, uniqueKey);
    },
  }),
});

module.exports = s3upload;

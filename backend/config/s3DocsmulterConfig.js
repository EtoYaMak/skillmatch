// /config/s3DocsmulterConfig.js
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
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
    bucket: "skillmatch-jobs", //Bucket DIR
    acl: "public-read",
    contentDisposition: "inline",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueKey = `student-documents/${Date.now().toString()}-${
        file.originalname
      }`; //student-documents will hold ApplicantCV
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
// Function to delete an object from S3
const deleteObjectFromS3 = async (key) => {
  try {
    await s3.send(
      new DeleteObjectCommand({ Bucket: "skillmatch-jobs", Key: key })
    );
    console.log(`Object deleted from S3: ${key}`);
  } catch (error) {
    console.error("Error deleting object from S3:", error);
    throw error;
  }
};
module.exports = { s3uploadDocs, deleteObjectFromS3 };

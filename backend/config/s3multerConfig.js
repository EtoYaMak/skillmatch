// /config/s3multerConfig.js
const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const multerS3 = require("multer-s3");

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
    bucket: "skillmatch-jobs",
    acl: "public-read",
    contentDisposition: "inline",
    contentType: multer.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const uniqueKey = `job-images/${Date.now().toString()}-${
        file.originalname
      }`;
      cb(null, uniqueKey);
    },
    metadata: function (req, file, cb) {
      cb(null, {}); //Add important/needed metadata you consider a must.
    },
  }),
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

module.exports = { s3upload, memoryStorage, deleteObjectFromS3 };

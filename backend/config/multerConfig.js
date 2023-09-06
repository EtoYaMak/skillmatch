// /db/multerConfig.js
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const DIR = path.join(__dirname, "../../client/public/uploads/");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR); // Make sure DIR is defined appropriately
  },
  filename: function (req, file, cb) {
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

const fileUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2.5,
  },
  fileFilter,
}).single("logo");

const uploadMiddleware = (req, res, next) => {
  fileUpload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: "File not selected" });
    }
    next();
  });
};

module.exports = {
  uploadMiddleware,
};

const mongoose = require("mongoose");

const sFormSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student",
    },
    studentName: {
      type: String,
      ref: "Student",
    },
    University: {
      type: String,
      unique: false,
    },

    Degree: {
      type: String,
    },
    DegreeTitle: {
      type: String,
    },
    cv: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentForm", sFormSchema);

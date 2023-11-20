const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name missing!"],
    },
    email: {
      type: String,
      required: [true, "Please add an Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
    appliedJobs: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job",
        },
        status: {
          type: String, // Accepted/Pending/Denied
          default: "Pending", // Initial status
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: false, // Set default to false, user must activate account
    },
    type: {
      type: Number, // 2 for Student/Applicant
      required: true,
    },
    activationToken: String,
    activationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);

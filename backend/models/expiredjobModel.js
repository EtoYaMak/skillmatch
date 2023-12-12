const mongoose = require("mongoose");

const expiredJobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    postedBy: {
      type: String,
    },
    featured: {
      type: Boolean, //default is false
    },
    // New field to track when the job was archived
    archivedDate: {
      type: Date,
      default: Date.now, // Set to current time when the job is moved to this collection
    },
    position: {
      type: String,
      /* required: [true, "Please enter the Job Title"], */
    },
    city: {
      type: String,
      /* required: [true, "Please enter the job location"], */
    },
    country: {
      type: String,
      /* required: [true, "Please enter the job location"], */
    },
    department: {
      type: String,
      /* required: [true, "Please enter the job location"], */
    },
    salary: {
      type: String,
      /* required: [true, "Please enter the job location"], */
    },
    careerPage: {
      type: String,
      /* required: [true, "Please provide the career page link for the job"], */
    },
    company: {
      type: String,
      /* required: [true, "Please enter the company name"], */
    },
    website: {
      type: String,
      /* required: [true, "Please enter the company website"], */
    },
    logo: {
      type: String,
    },
    type: [
      {
        name: {
          type: String,
        },
        value: {
          type: Boolean,
        },
        _id: false,
      },
    ],
    setting: [
      {
        name: {
          type: String,
        },
        value: {
          type: Boolean,
        },
        _id: false,
      },
    ],
    description: {
      type: String,
    },
    skills: [
      {
        type: String,
      },
    ],
    //
    //Applications array similar logic to StudentSchema
    //Job.id and Status
    //
    applicants: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExpiredJob", expiredJobSchema);

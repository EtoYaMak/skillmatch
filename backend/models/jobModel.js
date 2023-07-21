const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    postedBy: {
      type: String,
      ref: "User",
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
    location: {
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
    logo: {
      type: String,
    },
    description: {
      type: String, // Add a new field for job description
    },
    skills: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);

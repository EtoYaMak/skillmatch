const mongoose = require("mongoose");

const sFormSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Student",
    },
    studentName: {
      type: String,
      ref: "Student",
    },
    bannerImage: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    ApplicantCV: {
      type: String,
    },
    headerContent: {
      FirstName: String,
      MiddleName: String,
      LastName: String,
      Headline: String,
      Location: String,
    },
    aboutSection: {
      type: String,
    },
    experiences: {
      type: [
        {
          roleTitle: {
            type: String,
          },
          roleCompany: {
            type: String,
          },
          roleDateStart: {
            type: String,
          },
          roleDateEnd: {
            type: String,
          },
          roleLocation: {
            type: String,
          },
          roleType: {
            type: String,
          },
          roleDuties: {
            type: String,
          },
          roleSkills: {
            type: String,
          },
        },
      ],
    },
    education: {
      type: [
        {
          uniName: {
            type: String,
          },
          uniDegree: {
            type: String,
          },
          uniGrade: {
            type: String,
          },
          uniStartDate: {
            type: String,
          },
          uniEndDate: {
            type: String,
          },
          uniLocation: {
            type: String,
          },
          uniSection: {
            type: String,
          },
          uniSkills: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("studentForm", sFormSchema);

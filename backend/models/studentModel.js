const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name missing!"],
    },

    email: {
      type: String,
      required: [true, "Please add a Email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a Password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);

const mongoose = require("mongoose");

const superuserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a Name"],
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
    isActive: {
      type: Boolean,
      default: false, // Set default to false, user must activate account
    },
    type: {
      type: Number, // 99 for Superuser/SAuser/Admin
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("Superuser", superuserSchema);

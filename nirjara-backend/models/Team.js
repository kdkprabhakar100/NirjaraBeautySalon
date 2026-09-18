const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Active", "Hidden"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Team",
  teamSchema
);
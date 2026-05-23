const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema(
  {
    title: String,

    subtitle: String,

    image: String,

    buttonText: String,

    buttonLink: String,

    active: {
      type: Boolean,
      default: true,
    },

    delay: {
      type: Number,
      default: 3000,
    },

    startDate: Date,

    endDate: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Popup",
  popupSchema
);
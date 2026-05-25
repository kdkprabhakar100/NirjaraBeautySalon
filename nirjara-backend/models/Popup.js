const mongoose = require("mongoose");

const popupSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    image: String,
    buttonText: String,
    buttonLink: String,
    startDate: String,
    endDate: String,
    delay: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Popup", popupSchema);
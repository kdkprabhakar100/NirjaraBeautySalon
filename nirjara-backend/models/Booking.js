const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,

    // NEW: type (service or course)
    type: {
      type: String,
      enum: ["service", "course"],
      default: "service",
    },

    service: String, // for salon booking
    course: String,  // for academy enrollment

    branch: String,
    date: String,
    time: String,

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
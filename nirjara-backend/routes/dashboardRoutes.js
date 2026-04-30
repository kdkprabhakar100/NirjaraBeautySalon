const express = require("express");
const Service = require("../models/Service");
const Gallery = require("../models/Gallery");
const Course = require("../models/Course");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/stats", protect, async (req, res) => {
  try {
    const services = await Service.countDocuments();
    const gallery = await Gallery.countDocuments();
    const courses = await Course.countDocuments();
    const bookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: "Pending" });
    const confirmedBookings = await Booking.countDocuments({ status: "Confirmed" });
    const cancelledBookings = await Booking.countDocuments({ status: "Cancelled" });

    res.json({
      services,
      gallery,
      courses,
      bookings,
      pendingBookings,
      confirmedBookings,
      cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats error", error: error.message });
  }
});

module.exports = router;
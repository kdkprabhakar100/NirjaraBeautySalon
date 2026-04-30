const express = require("express");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET
router.get("/", protect, async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
});

// POST
router.post("/", async (req, res) => {
  console.log("BOOKING BODY:", req.body);

  const booking = await Booking.create(req.body);
  res.status(201).json(booking);
});

// UPDATE STATUS
router.put("/:id", protect, async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(booking);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
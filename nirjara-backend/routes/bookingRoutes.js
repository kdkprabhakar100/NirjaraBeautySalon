const express = require("express");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

const sendEmail = require("../utils/sendEmail");

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

  // SEND EMAIL
// SEND EMAIL
if (booking.email) {
  const item = booking.type === "course" ? booking.course : booking.service;

  const subject = `Booking ${booking.status} - Nirjara Beauty`;

  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #fff5f8; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 18px;">
        <h2 style="color: #E75480; margin-bottom: 10px;">Nirjara Beauty</h2>

        <p>Hello <strong>${booking.name}</strong>,</p>

        <p>
          Your ${
            booking.type === "course" ? "course enrollment" : "service booking"
          } for <strong>${item}</strong> has been
          <strong style="color: ${
            booking.status === "Confirmed" ? "green" : "red"
          };">
            ${booking.status}
          </strong>.
        </p>

        <div style="margin-top: 20px; padding: 15px; background-color: #fff5f8; border-radius: 12px;">
          <p><strong>Branch:</strong> ${booking.branch}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
        </div>

        <p style="margin-top: 25px;">
          Thank you for choosing Nirjara Beauty 💖
        </p>
      </div>
    </div>
  `;

  await sendEmail(booking.email, subject, html);
}

res.json(booking);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
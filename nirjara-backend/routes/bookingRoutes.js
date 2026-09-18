const express = require("express");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");

const router = express.Router();


// GET BOOKINGS
router.get("/", protect, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.json(bookings);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    console.log("BOOKING BODY:", req.body);

    const booking = await Booking.create(
      req.body
    );

    res.status(201).json(booking);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE BOOKING STATUS
router.put("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // SEND EMAIL
    if (booking.email) {
      try {
        const item =
          booking.type === "course"
            ? booking.course
            : booking.service;

        const subject = `Booking ${booking.status} - Nirjara Beauty`;

        const html = `
          <div style="font-family: Arial, sans-serif; background-color: #fff5f8; padding: 30px;">
            
            <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 18px;">

              <h2 style="color: #E75480; margin-bottom: 10px;">
                Nirjara Beauty
              </h2>

              <p>
                Hello <strong>${booking.name}</strong>,
              </p>

              <p>
                Your ${
                  booking.type === "course"
                    ? "course enrollment"
                    : "service booking"
                } for 
                
                <strong>${item}</strong> has been

                <strong style="color:${
                  booking.status === "Confirmed"
                    ? "green"
                    : booking.status === "Cancelled"
                    ? "red"
                    : "#E75480"
                };">
                  ${booking.status}
                </strong>.
              </p>

              <div style="margin-top:20px; padding:15px; background:#fff5f8; border-radius:12px;">
                
                <p>
                  <strong>Branch:</strong>
                  ${booking.branch}
                </p>

                <p>
                  <strong>Date:</strong>
                  ${booking.date}
                </p>

                <p>
                  <strong>Time:</strong>
                  ${booking.time}
                </p>

              </div>

              <p style="margin-top:25px;">
                Thank you for choosing Nirjara Beauty 💖
              </p>

            </div>

          </div>
        `;

        await sendEmail(
          booking.email,
          subject,
          html
        );
      } catch (emailError) {
        console.log(
          "EMAIL ERROR:",
          emailError
        );
      }
    }

    res.json(booking);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE BOOKING
router.delete("/:id", protect, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Booking deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
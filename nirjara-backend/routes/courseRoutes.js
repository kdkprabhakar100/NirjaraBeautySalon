const express = require("express");
const Course = require("../models/Course");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    const { title, duration, price, description, image } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image required" });
    }

    const course = new Course({
      title,
      duration,
      price,
      description,
      image, // ✅ THIS MUST BE CLOUDINARY URL
    });

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error(error); // 👈 CHECK THIS IN RENDER LOGS
    res.status(500).json({ message: "Server error" });
  }
});
// UPDATE
router.put("/:id", protect, async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
});

// DELETE
router.delete("/:id", protect, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

module.exports = router;
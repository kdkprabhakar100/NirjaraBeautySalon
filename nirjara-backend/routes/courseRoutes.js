const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.json(courses);
});

// CREATE
router.post("/", async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(course);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

module.exports = router;
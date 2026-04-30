const express = require("express");
const Blog = require("../models/Blog");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

router.post("/", protect, async (req, res) => {
  const blog = await Blog.create(req.body);
  res.status(201).json(blog);
});

router.put("/:id", protect, async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(blog);
});

router.delete("/:id", protect, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
});

module.exports = router;
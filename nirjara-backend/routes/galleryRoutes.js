const express = require("express");
const Gallery = require("../models/Gallery");

const router = express.Router();

// GET all
router.get("/", async (req, res) => {
  const items = await Gallery.find().sort({ createdAt: -1 });
  res.json(items);
});

// CREATE
router.post("/", async (req, res) => {
  const item = await Gallery.create(req.body);
  res.status(201).json(item);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
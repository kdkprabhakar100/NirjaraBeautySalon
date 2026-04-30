const express = require("express");
const ContactMessage = require("../models/ContactMessage");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  const message = await ContactMessage.create(req.body);
  res.status(201).json(message);
});

router.get("/", protect, async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

router.put("/:id", protect, async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(message);
});

router.delete("/:id", protect, async (req, res) => {
  await ContactMessage.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact message deleted" });
});

module.exports = router;
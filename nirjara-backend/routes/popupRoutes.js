const express = require("express");
const Popup = require("../models/Popup");

const router = express.Router();

// GET ALL POPUPS
router.get("/", async (req, res) => {
  try {
    const popups = await Popup.find().sort({ createdAt: -1 });
    res.json(popups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE POPUP
router.post("/", async (req, res) => {
  try {
    const popup = await Popup.create(req.body);
    res.status(201).json(popup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE POPUP
router.delete("/:id", async (req, res) => {
  try {
    await Popup.findByIdAndDelete(req.params.id);

    res.json({
      message: "Popup deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getPopups,
  createPopup,
  updatePopup,
  deletePopup,
} = require("../controllers/popupController");

// GET
router.get("/", getPopups);

// CREATE
router.post("/", protect, createPopup);

// UPDATE
router.put("/:id", protect, updatePopup);

// DELETE
router.delete("/:id", protect, deletePopup);

module.exports = router;
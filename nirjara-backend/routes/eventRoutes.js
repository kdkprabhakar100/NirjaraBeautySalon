const express = require("express");

const router = express.Router();

const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleFeatured,
    toggleActive,
} = require("../controllers/eventController");

// =============================
// GET ALL EVENTS
// =============================
router.get("/", getEvents);

// =============================
// GET SINGLE EVENT
// =============================
router.get("/:id", getEvent);

// =============================
// CREATE EVENT
// =============================
router.post("/", createEvent);

// =============================
// UPDATE EVENT
// =============================
router.put("/:id", updateEvent);

// =============================
// DELETE EVENT
// =============================
router.delete("/:id", deleteEvent);

// =============================
// TOGGLE FEATURED EVENT
// =============================
router.put("/:id/featured", toggleFeatured);

// =============================
// TOGGLE ACTIVE EVENT
// =============================
router.put("/:id/active", toggleActive);

module.exports = router;
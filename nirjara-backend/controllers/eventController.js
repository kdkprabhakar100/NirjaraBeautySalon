const Event = require("../models/Event");

// =============================
// GET ALL EVENTS
// =============================
const getEvents = async (req, res) => {
  try {
        const events = await Event.find({
        active: true,
        }).sort({ date: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// GET SINGLE EVENT
// =============================
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// CREATE EVENT
// =============================
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      location,
      date,
      time,
      buttonText,
      buttonLink,
      featured,
      active,
    } = req.body;

    const event = new Event({
      title,
      description,
      image,
      location,
      date,
      time,
      buttonText,
      buttonLink,
      featured,
      active,
    });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// =============================
// UPDATE EVENT
// =============================
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.title = req.body.title || event.title;
    event.description = req.body.description || event.description;
    event.image = req.body.image || event.image;
    event.location = req.body.location || event.location;
    event.date = req.body.date || event.date;
    event.time = req.body.time || event.time;
    event.buttonText = req.body.buttonText || event.buttonText;
    event.buttonLink = req.body.buttonLink || event.buttonLink;

    if (req.body.featured !== undefined) {
      event.featured = req.body.featured;
    }

    if (req.body.active !== undefined) {
      event.active = req.body.active;
    }

    const updatedEvent = await event.save();

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// =============================
// DELETE EVENT
// =============================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    await event.deleteOne();

    res.json({
      message: "Event removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// TOGGLE FEATURED EVENT
// =============================
const toggleFeatured = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.featured = !event.featured;

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// =============================
// TOGGLE ACTIVE EVENT
// =============================
const toggleActive = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    event.active = !event.active;

    await event.save();

    res.json(event);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleFeatured,
  toggleActive,
};
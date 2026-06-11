const Career = require("../models/Career");

// GET PUBLIC ACTIVE CAREERS
const getCareers = async (req, res) => {
  try {
    const careers = await Career.find({ active: true }).sort({
      createdAt: -1,
    });

    res.json(careers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL CAREERS FOR ADMIN
const getAdminCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({
      createdAt: -1,
    });

    res.json(careers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE CAREER
const createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);

    res.status(201).json(career);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// UPDATE CAREER
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!career) {
      return res.status(404).json({
        message: "Career not found",
      });
    }

    res.json(career);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// DELETE CAREER
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        message: "Career not found",
      });
    }

    await career.deleteOne();

    res.json({
      message: "Career deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// TOGGLE ACTIVE
const toggleCareerActive = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        message: "Career not found",
      });
    }

    career.active = !career.active;

    await career.save();

    res.json(career);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getCareers,
  getAdminCareers,
  createCareer,
  updateCareer,
  deleteCareer,
  toggleCareerActive,
};
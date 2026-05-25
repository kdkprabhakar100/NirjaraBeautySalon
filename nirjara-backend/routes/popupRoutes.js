const express = require("express");

const router = express.Router();

const Popup = require("../models/Popup");

const {
  getPopups,
  createPopup,
  updatePopup,
  deletePopup,
} = require("../controllers/popupController");

// GET ACTIVE POPUP
router.get("/active", async (req, res) => {
  try {
    const today = new Date();

    const popup = await Popup.findOne({
      active: true,

      startDate: {
        $lte: today,
      },

      endDate: {
        $gte: today,
      },
    }).sort({
      createdAt: -1,
    });

    res.json(popup);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL
router.get("/", getPopups);

// CREATE
router.post("/", createPopup);

// UPDATE
router.put("/:id", updatePopup);

// DELETE
router.delete("/:id", deletePopup);

module.exports = router;
const express = require("express");

const router = express.Router();

const Popup = require("../models/Popup");

const {
  getPopups,
  createPopup,
  updatePopup,
  deletePopup,
} = require("../controllers/popupController");



// =======================================
// GET ACTIVE POPUP
// =======================================
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



// =======================================
// GET ALL POPUPS
// =======================================
router.get("/", getPopups);



// =======================================
// CREATE POPUP
// =======================================
router.post("/", createPopup);



// =======================================
// UPDATE POPUP
// =======================================
router.put("/:id", updatePopup);



// =======================================
// TOGGLE POPUP ACTIVE / INACTIVE
// =======================================
router.put("/:id/toggle", async (req, res) => {
  try {

    const popup = await Popup.findById(req.params.id);

    if (!popup) {
      return res.status(404).json({
        message: "Popup not found",
      });
    }

    popup.active = !popup.active;

    await popup.save();

    res.json({
      message: "Popup updated successfully",
      popup,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



// =======================================
// DELETE POPUP
// =======================================
router.delete("/:id", deletePopup);



module.exports = router;
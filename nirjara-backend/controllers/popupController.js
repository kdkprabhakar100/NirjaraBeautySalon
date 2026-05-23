const Popup = require("../models/Popup");

// GET
exports.getPopups = async (req, res) => {
  try {
    const popups = await Popup.find().sort({
      createdAt: -1,
    });

    res.json(popups);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE
exports.createPopup = async (req, res) => {
  try {
    const popup = await Popup.create(
      req.body
    );

    res.status(201).json(popup);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE
exports.updatePopup = async (
  req,
  res
) => {
  try {
    const popup =
      await Popup.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(popup);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE
exports.deletePopup = async (
  req,
  res
) => {
  try {
    await Popup.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Popup deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
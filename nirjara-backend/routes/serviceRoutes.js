const express = require("express");
const Service = require("../models/Service");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

router.post("/", protect, async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

router.put("/:id", protect, async (req, res) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(service);
});

router.delete("/:id", protect, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});
module.exports = router;
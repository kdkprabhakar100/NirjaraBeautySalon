const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
      key: { type: String, default: "" },
    icon: { type: String, default: "✦" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
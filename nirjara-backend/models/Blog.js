const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
    readTime: { type: String, default: "5 min read" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
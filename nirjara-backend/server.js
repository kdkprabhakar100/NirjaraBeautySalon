const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// Import routes
const uploadRoutes = require("./routes/uploadRoutes");  
const serviceRoutes = require("./routes/serviceRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const courseRoutes = require("./routes/courseRoutes"); 
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");

// Auth routes
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware MUST come before routes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Nirjara Backend Running 🚀");
});

// routes
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
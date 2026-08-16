const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =============================
// IMPORT ROUTES
// =============================
const uploadRoutes = require("./routes/uploadRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const contactRoutes = require("./routes/contactRoutes");
const blogRoutes = require("./routes/blogRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const careerRoutes = require("./routes/careerRoutes");
const siteSettingsRoutes = require("./routes/siteSettingsRoutes");

// AUTH
const authRoutes = require("./routes/authRoutes");

// POPUP
const popupRoutes = require("./routes/popupRoutes");

// EVENTS
const eventRoutes = require("./routes/eventRoutes");

const app = express();

// =============================
// ENVIRONMENT
// =============================
const isProduction =
  process.env.NODE_ENV === "production";

// =============================
// CORS
// =============================
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  process.env.FRONTEND_WWW_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman, mobile apps, curl, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked by CORS:", origin);

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// =============================
// MIDDLEWARE
// =============================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =============================
// HEALTH CHECK
// =============================
app.get("/", (req, res) => {
  res.json({
    message: "Nirjara Backend Running 🚀",
    environment: isProduction
      ? "production"
      : "development",
  });
});

// =============================
// STATIC FILES
// =============================
app.use(
  "/uploads",
  express.static("uploads")
);

// =============================
// ROUTES
// =============================
app.use("/api/services", serviceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/popup", popupRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/careers", careerRoutes);
app.use(
  "/api/site-settings",
  siteSettingsRoutes
);

// =============================
// 404 HANDLER
// =============================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// =============================
// GLOBAL ERROR HANDLER
// =============================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    message:
      err.message ||
      "Internal server error",
  });
});

// =============================
// DATABASE + SERVER
// =============================
const PORT =
  process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );

      console.log(
        `Environment: ${
          isProduction
            ? "production"
            : "development"
        }`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error
    );

    process.exit(1);
  });
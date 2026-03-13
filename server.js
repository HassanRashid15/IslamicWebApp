const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Load env vars
require("dotenv").config();

const connectDB = require("./config/database");

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
app.use("/api/", limiter);

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/protected", require("./routes/protected"));
// app.use("/quran", require("./routes/quran"));
// app.use("/api/surahs", require("./routes/surahs"));
app.use("/api/hadiths", require("./routes/hadiths"));
app.use("/api/collections", require("./routes/simpleStats"));
app.use("/api/test", require("./routes/test"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Islamic App Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Serve static files from React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  // In development, just send a simple response for non-API routes
  app.get("/", (req, res) => {
    res.send("Islamic Web App - Development Mode<br><a href='/api/health'>API Health Check</a>");
  });
}

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`🚀 Islamic App Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(
        `🔗 Client URL: ${process.env.CLIENT_URL || "http://localhost:3000"}`
      );
      if (process.env.NODE_ENV === "production") {
        console.log(`📦 Serving React app from /build`);
      }
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err.message}`);
      server.close(() => {
        process.exit(1);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });

module.exports = app;

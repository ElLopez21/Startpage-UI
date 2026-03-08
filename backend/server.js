const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    newsAPIConfigured: !!process.env.NEWS_API_KEY,
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Homepage News API",
    version: "1.0.0",
    endpoints: {
      health: "GET /health",
      headlines: "GET /api/news/headlines",
    },
  });
});

const newsRoutes = require("./routes/news");
app.use("/api/news", newsRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`CORS: ${process.env.CORS}`);
  console.log(`NewsAPI: ${process.env.NEWS_API_KEY ? "Check" : "Uncheck"}`);
});

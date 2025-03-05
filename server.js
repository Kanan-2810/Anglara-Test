const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const { authenticate } = require("./middlewares/authMiddleware");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", authenticate, categoryRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Avoid multiple connections in tests
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
  app.listen(process.env.PORT,()=>{
    console.log("Listening on", process.env.PORT)
  })
}

module.exports = app;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const pricingRoutes = require("./routes/pricingRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB().catch((error) => {
  console.error("MongoDB connection failed", error);
  process.exit(1);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Backend is running" });
});

app.use("/users", authRoutes);
app.use("/api/pricing", pricingRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

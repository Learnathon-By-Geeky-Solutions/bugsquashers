require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const userRoutes = require("./routes/userRoutes");
const retailerRoutes = require("./routes/retailerRoutes");
const cartRoutes = require("./routes/cartRoutes");

// Import Farmer Dashboard routes
const orderRoutes = require("./routes/orderRoutes");
const cropRoutes = require("./routes/cropRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");

// CORS configuration
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://your-production-domain.com"]
    : ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy violation"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// Routes
app.use("/api", userRoutes); // User routes
app.use("/api/retailer", retailerRoutes); // Retailer routes
app.use("/api/cart", cartRoutes); // Cart routes

// Farmer Dashboard routes
app.use("/api/orders", orderRoutes); // Orders routes
app.use("/api/crops", cropRoutes); // Crops routes
app.use("/api/reviews", reviewRoutes); // Reviews routes
app.use("/api/stats", statsRoutes); // Statistics routes

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User"); 

const app = express();
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by"); // Hiding the Express version

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

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/fairbasket", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err.message));

const validateUserInput = (req, res, next) => {
  const { fullName, email, uid } = req.body;

  if (!fullName || !email || !uid) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }
  next();
};

app.use("/api", userRoutes);

// Signup Route (Handles Role)
app.post("/api/users", validateUserInput, async (req, res) => {
  const { fullName, email, uid, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ uid }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user with role
    const newUser = new User({ fullName, email, uid, role: role || "User" });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    // Validate and sanitize input fields
    body("uid").trim().isLength({ min: 1 }).escape(),
    body("fullName").trim().isLength({ min: 1 }).escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("role").optional().isIn(["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]) // Validate role
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      // Extract and sanitize input
      const uid = String(req.body.uid).trim();
      const fullName = String(req.body.fullName).trim();
      const email = String(req.body.email).trim();
      const role = req.body.role || "User"; // Default role if not provided

      // Check if user already exists
      const existingUser = await User.findOne({ $or: [{ uid }, { email }] });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create a new user with role
      const newUser = new User({ uid, fullName, email, role });
      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("❌ Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

module.exports = router;

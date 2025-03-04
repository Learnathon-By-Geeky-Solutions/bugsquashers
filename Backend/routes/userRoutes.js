const express = require("express");
const router = express.Router();
const { User, Admin, Shopkeeper, Deliveryman, Farmer } = require("../models/User");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    // Validate and sanitize input fields
    body("uid").trim().isLength({ min: 1 }).escape(),
    body("fullName").trim().isLength({ min: 1 }).escape(),
    body("email").trim().isEmail().normalizeEmail(),
    body("role").isIn(["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const { uid, fullName, email, role } = req.body;

      const existingUser = await User.findOne({ $or: [{ uid }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      let newUser;
      switch (role) {
        case "Admin":
          newUser = new Admin({ uid, fullName, email, role });
          break;
        case "Shopkeeper":
          newUser = new Shopkeeper({ 
            uid, 
            fullName, 
            email, 
            role,
            shopName: req.body.shopName || undefined, 
            shopLocation: req.body.shopLocation || undefined 
          });
          break;
        case "Deliveryman":
          newUser = new Deliveryman({ 
            uid, 
            fullName, 
            email, 
            role,
            vehicleType: req.body.vehicleType || undefined, 
            assignedArea: req.body.assignedArea || undefined 
          });
          break;
        case "Farmer":
          newUser = new Farmer({ 
            uid, 
            fullName, 
            email, 
            role,
            farmName: req.body.farmName || undefined, 
            farmLocation: req.body.farmLocation || undefined, 
            crops: req.body.crops || [] 
          });
          break;
        default:
          newUser = new User({ uid, fullName, email, role: "User" });
      }

      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("❌ Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// New GET endpoint to fetch all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "uid fullName email role"); // Fetch minimal fields for efficiency
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const { User, Admin, Shopkeeper, Deliveryman, Farmer } = require("../models/User");
const { body, validationResult } = require("express-validator");

// Custom middleware to ensure input is a plain string (prevents NoSQL injection)
const ensurePlainString = (value, { req, location, path }) => {
  // Allow strings only, reject objects/arrays
  if (typeof value !== "string") {
    throw new Error(`${path} must be a string`);
  }
  // Disallow MongoDB operators ($), but allow dots (.) for emails
  if (path !== "email" && value.includes("$")) {
    throw new Error(`${path} must not contain MongoDB operators like $`);
  }
  if (path === "email" && value.includes("$")) {
    throw new Error(`${path} must not contain MongoDB operators like $`);
  }
  return value;
};

router.post(
  "/signup",
  [
    // Validate and sanitize input fields
    body("uid")
      .trim()
      .isLength({ min: 1 })
      .custom(ensurePlainString)
      .escape(),
    body("fullName")
      .trim()
      .isLength({ min: 1 })
      .custom(ensurePlainString)
      .escape(),
    body("email")
      .trim()
      .isEmail()
      .custom(ensurePlainString)
      .normalizeEmail(),
    body("role")
      .isIn(["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"]),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      // Extract validated and sanitized input
      const { uid, fullName, email, role } = req.body;

      // Construct query using sanitized values explicitly as strings
      const existingUser = await User.findOne({
        $or: [
          { uid: String(uid) },
          { email: String(email) }
        ]
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user based on role
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

// GET endpoint for user count (unchanged)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "uid fullName email role");
    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
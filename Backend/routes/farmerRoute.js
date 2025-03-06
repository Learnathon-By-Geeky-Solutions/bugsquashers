const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer");
const { body, validationResult } = require("express-validator");

// Middleware to extract and verify farmer UID
const getFarmerUid = async (req, res, next) => {
  const uid = req.headers["x-farmer-uid"];
  if (!uid || typeof uid !== "string" || uid.includes("$")) {
    return res.status(401).json({ message: "Unauthorized: Invalid Farmer UID" });
  }
  try {
    const farmer = await require("../models/User").User.findOne({ uid, role: "Farmer" });
    if (!farmer) {
      return res.status(403).json({ message: "Forbidden: Not a farmer" });
    }
    req.farmerId = farmer._id;
    next();
  } catch (error) {
    return handleError(res, "Error verifying farmer", error);
  }
};

router.use(getFarmerUid);

// Common error handling function
const handleError = (res, message, error) => {
  console.error(`❌ ${message}:`, error);
  res.status(500).json({ message: "Internal server error" });
};

// Common ID sanitization function
const sanitizeId = (id) => {
  if (typeof id !== "string" || id.includes("$")) {
    throw new Error("Invalid ID format");
  }
  return id;
};

// Common sanitizer for plain strings
const sanitizePlainString = (value) => {
  if (typeof value !== "string" || value.includes("$")) {
    throw new Error("Input must be a plain string without MongoDB operators");
  }
  return value.trim();
};

// Shared validation rules
const farmerValidationRules = (optional = false) => [
  body("name")
    .optional(optional)
    .customSanitizer(sanitizePlainString)
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .escape(),
  body("quantity")
    .optional(optional)
    .isNumeric()
    .withMessage("Quantity must be a number")
    .toFloat()
    .custom((value) => value >= 0)
    .withMessage("Quantity must be non-negative"),
  body("price")
    .optional(optional)
    .isNumeric()
    .withMessage("Price must be a number")
    .toFloat()
    .custom((value) => value >= 0)
    .withMessage("Price must be non-negative"),
  body("production")
    .optional()
    .isIn(["In Progress", "Completed", "Pending"])
    .withMessage("Invalid production status")
    .customSanitizer(sanitizePlainString),
  body("status")
    .optional()
    .isIn(["Available", "Sold", "Reserved"])
    .withMessage("Invalid status")
    .customSanitizer(sanitizePlainString),
];

// Check validation result and proceed
const validateRequest = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: "Validation failed", errors: errors.array() });
  }
  next();
};

// POST /api/farmer - Create a new farmer production entry
router.post(
  "/",
  farmerValidationRules(false), // Required fields
  validateRequest,
  async (req, res) => {
    try {
      const { name, quantity, price, production, status } = req.body;
      const farmerEntry = new Farmer({
        farmerId: req.farmerId,
        name,
        quantity,
        price,
        production,
        status,
      });
      await farmerEntry.save();
      res.status(201).json({ message: "Farmer entry created", data: farmerEntry });
    } catch (error) {
      handleError(res, "Error creating farmer entry", error);
    }
  }
);

// GET /api/farmer - Get all farmer production entries
router.get("/", async (req, res) => {
  try {
    const entries = await Farmer.find({ farmerId: req.farmerId }).sort({ orderDate: -1 });
    res.status(200).json({ data: entries });
  } catch (error) {
    handleError(res, "Error fetching farmer entries", error);
  }
});

// Common function for finding a single entry
const findFarmerEntry = async (id, farmerId) => {
  const entry = await Farmer.findOne({ _id: id, farmerId });
  if (!entry) {
    throw new Error("Entry not found");
  }
  return entry;
};

// GET /api/farmer/:id - Get a specific farmer entry
router.get("/:id", async (req, res) => {
  try {
    const id = sanitizeId(req.params.id);
    const entry = await findFarmerEntry(id, req.farmerId);
    res.status(200).json({ data: entry });
  } catch (error) {
    if (error.message === "Entry not found") {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === "Invalid ID format") {
      return res.status(400).json({ message: error.message });
    }
    handleError(res, "Error fetching farmer entry", error);
  }
});

// PUT /api/farmer/:id - Update a farmer entry
router.put(
  "/:id",
  farmerValidationRules(true), // Optional fields
  validateRequest,
  async (req, res) => {
    try {
      const id = sanitizeId(req.params.id);
      const updates = req.body;
      const entry = await Farmer.findOneAndUpdate(
        { _id: id, farmerId: req.farmerId },
        updates,
        { new: true, runValidators: true }
      );
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.status(200).json({ message: "Farmer entry updated", data: entry });
    } catch (error) {
      if (error.message === "Invalid ID format") {
        return res.status(400).json({ message: error.message });
      }
      handleError(res, "Error updating farmer entry", error);
    }
  }
);

// DELETE /api/farmer/:id - Delete a farmer entry
router.delete("/:id", async (req, res) => {
  try {
    const id = sanitizeId(req.params.id);
    const entry = await Farmer.findOneAndDelete({ _id: id, farmerId: req.farmerId });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Farmer entry deleted" });
  } catch (error) {
    if (error.message === "Invalid ID format") {
      return res.status(400).json({ message: error.message });
    }
    handleError(res, "Error deleting farmer entry", error);
  }
});

module.exports = router;
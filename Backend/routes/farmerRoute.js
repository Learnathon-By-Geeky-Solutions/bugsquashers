const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer");
const { body, validationResult } = require("express-validator");

// Middleware to extract farmer UID from headers and verify role
const getFarmerUid = async (req, res, next) => {
  const uid = req.headers["x-farmer-uid"];
  if (!uid) {
    return res.status(401).json({ message: "Unauthorized: Farmer UID required" });
  }
  try {
    const farmer = await require("../models/User").User.findOne({ uid, role: "Farmer" });
    if (!farmer) {
      return res.status(403).json({ message: "Forbidden: Not a farmer" });
    }
    req.farmerId = farmer._id; // Still works as farmerId references User in "fairbasket"
    next();
  } catch (error) {
    console.error("❌ Error verifying farmer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

router.use(getFarmerUid);

// POST /api/farmer - Create a new farmer production entry
router.post(
  "/",
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("quantity").isNumeric().withMessage("Quantity must be a number"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("production").optional().isIn(["In Progress", "Completed", "Pending"]),
    body("status").optional().isIn(["Available", "Sold", "Reserved"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

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
      console.error("❌ Error creating farmer entry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// GET /api/farmer - Get all farmer production entries
router.get("/", async (req, res) => {
  try {
    const entries = await Farmer.find({ farmerId: req.farmerId }).sort({ orderDate: -1 });
    res.status(200).json({ data: entries });
  } catch (error) {
    console.error("❌ Error fetching farmer entries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/farmer/:id - Get a specific farmer entry
router.get("/:id", async (req, res) => {
  try {
    const entry = await Farmer.findOne({ _id: req.params.id, farmerId: req.farmerId });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ data: entry });
  } catch (error) {
    console.error("❌ Error fetching farmer entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/farmer/:id - Update a farmer entry
router.put(
  "/:id",
  [
    body("name").optional().trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("quantity").optional().isNumeric().withMessage("Quantity must be a number"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("production").optional().isIn(["In Progress", "Completed", "Pending"]),
    body("status").optional().isIn(["Available", "Sold", "Reserved"]),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: errors.array() });
      }

      const updates = req.body;
      const entry = await Farmer.findOneAndUpdate(
        { _id: req.params.id, farmerId: req.farmerId },
        updates,
        { new: true, runValidators: true }
      );

      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.status(200).json({ message: "Farmer entry updated", data: entry });
    } catch (error) {
      console.error("❌ Error updating farmer entry:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE /api/farmer/:id - Delete a farmer entry
router.delete("/:id", async (req, res) => {
  try {
    const entry = await Farmer.findOneAndDelete({ _id: req.params.id, farmerId: req.farmerId });
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Farmer entry deleted" });
  } catch (error) {
    console.error("❌ Error deleting farmer entry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
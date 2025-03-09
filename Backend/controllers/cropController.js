const Crop = require("../models/Crop");

// Fetch all crops
const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find();
    res.status(200).json(crops);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch crops", error });
  }
};

// Add a new crop
const addCrop = async (req, res) => {
  const { name, price, stock, season } = req.body;

  try {
    const newCrop = new Crop({ name, price, stock, season });
    await newCrop.save();
    res.status(201).json(newCrop);
  } catch (error) {
    res.status(500).json({ message: "Failed to add crop", error });
  }
};

module.exports = { getCrops, addCrop };
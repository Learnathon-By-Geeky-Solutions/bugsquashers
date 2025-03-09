const Stats = require("../models/Stats");

// Fetch statistics
const getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch statistics", error });
  }
};

module.exports = { getStats };
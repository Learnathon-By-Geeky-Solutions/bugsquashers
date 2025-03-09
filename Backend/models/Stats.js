const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  totalRevenue: { type: String, required: true },
  totalOrders: { type: Number, required: true },
  averageRating: { type: Number, required: true },
  topCrop: { type: String, required: true },
  monthlySales: [
    {
      month: { type: String, required: true },
      amount: { type: Number, required: true },
    },
  ],
  cropDistribution: [
    {
      crop: { type: String, required: true },
      percentage: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Stats", statsSchema);
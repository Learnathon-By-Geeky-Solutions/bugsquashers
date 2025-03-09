const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  crop: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Processing", "Delivered"], default: "Pending" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
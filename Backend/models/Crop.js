const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  stock: { type: String, required: true },
  season: { type: String, required: true },
});

module.exports = mongoose.model("Crop", cropSchema);
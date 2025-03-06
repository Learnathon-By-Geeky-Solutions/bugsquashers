const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  farmerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // References User model (Farmer role)
  name: { 
    type: String, 
    required: true 
  }, // Name of the crop or product
  quantity: { 
    type: Number, 
    required: true 
  }, // Quantity produced or ordered
  price: { 
    type: Number, 
    required: true 
  }, // Price per unit
  production: { 
    type: String, 
    enum: ["In Progress", "Completed", "Pending"], 
    default: "Pending" 
  }, // Production status
  status: { 
    type: String, 
    enum: ["Available", "Sold", "Reserved"], 
    default: "Available" 
  }, // Status of the product (e.g., availability)
  orderDate: { 
    type: Date, 
    default: Date.now 
  }, // Date of order or production entry
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const Farmer = mongoose.model("Farmer", farmerSchema);

module.exports = Farmer;
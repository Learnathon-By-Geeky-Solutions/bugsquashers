const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  deliveryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // References User in "fairbasket" (Deliveryman role)
    required: true,
  },
  name: {
    type: String,
    required: true,
  }, // Name of the delivery (e.g., customer name or order identifier)
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // References Order in "retailer" (assumes Order model exists)
    required: true,
  }, // Links to the specific order being delivered
  price: {
    type: Number,
    required: true,
  }, // Delivery fee or order total (depending on use case)
  status: {
    type: String,
    enum: ["Received", "On the Way", "Reached"],
    default: "Reached",
  }, // Delivery status
  orderDate: {
    type: Date,
    default: Date.now,
  }, // Date the order was assigned to the deliveryman
  deliveryTime: {
    type: Date,
    default: null,
  }, // Time when delivery is completed (set when status becomes "Reached")
}, { timestamps: true }); // Adds createdAt and updatedAt

// Use retailerConnection for the Delivery collection
const Delivery = retailerConnection.model("Delivery", deliverySchema);

module.exports = Delivery;
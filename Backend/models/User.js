const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer", "Customer"] },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Admin Schema
const adminSchema = new mongoose.Schema({
  permissions: [{ type: String }] // List of permissions the admin has
});
const Admin = User.discriminator("Admin", adminSchema);

// Deliveryman Schema
const deliverymanSchema = new mongoose.Schema({
  vehicleType: { type: String, required: true },
  licenseNumber: { type: String, required: true }
});
const Deliveryman = User.discriminator("Deliveryman", deliverymanSchema);

// Farmer Schema
const farmerSchema = new mongoose.Schema({
  farmLocation: { type: String, required: true },
  products: [{ type: String }] // List of products the farmer sells
});
const Farmer = User.discriminator("Farmer", farmerSchema);

// Shopkeeper Schema
const shopkeeperSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  shopLocation: { type: String, required: true }
});
const Shopkeeper = User.discriminator("Shopkeeper", shopkeeperSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});
const Customer = User.discriminator("Customer", customerSchema);

module.exports = { User, Admin, Deliveryman, Farmer, Shopkeeper, Customer };

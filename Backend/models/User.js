const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"], 
    default: "User" 
  },
}, { discriminatorKey: "role", timestamps: true });

const User = mongoose.model("User", userSchema);

// 🔹 Admin Model (Extends User)
const Admin = User.discriminator("Admin", new mongoose.Schema({
  permissions: { type: [String], default: ["manage-users", "manage-orders"] },
}));

// 🔹 Shopkeeper Model (Extends User)
const Shopkeeper = User.discriminator("Shopkeeper", new mongoose.Schema({
  shopName: { type: String, required: true },
  shopLocation: { type: String, required: true },
}));

// 🔹 Deliveryman Model (Extends User)
const Deliveryman = User.discriminator("Deliveryman", new mongoose.Schema({
  vehicleType: { type: String, enum: ["Bike", "Car", "Van"], required: true },
  assignedArea: { type: String, required: true },
}));

// 🔹 Farmer Model (Extends User)
const Farmer = User.discriminator("Farmer", new mongoose.Schema({
  farmName: { type: String, required: true },
  farmLocation: { type: String, required: true },
  crops: { type: [String], default: [] },
}));

module.exports = { User, Admin, Shopkeeper, Deliveryman, Farmer };

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"], default: "User" },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

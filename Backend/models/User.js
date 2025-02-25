const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["Admin", "User", "Shopkeeper", "Deliveryman", "Farmer"] }, // Role field
});

const User = mongoose.model("User", userSchema);
module.exports = User;
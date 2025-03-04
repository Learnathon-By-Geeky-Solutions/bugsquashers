const mongoose = require("mongoose");
require("dotenv").config();
const { Admin, Shopkeeper, Deliveryman, Farmer } = require("./models/User");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  });

// 🔹 Add an Admin
const addAdmin = async () => {
  const admin = new Admin({
    uid: "admin123",
    fullName: "John Doe",
    email: "admin@example.com",
    permissions: ["manage-users", "manage-orders", "view-reports"],
  });
  await admin.save();
  console.log("✅ Admin added:", admin);
};

// 🔹 Add a Shopkeeper
const addShopkeeper = async () => {
  const shopkeeper = new Shopkeeper({
    uid: "shop123",
    fullName: "Alice Smith",
    email: "shopkeeper@example.com",
    shopName: "Fresh Mart",
    shopLocation: "Downtown",
  });
  await shopkeeper.save();
  console.log("✅ Shopkeeper added:", shopkeeper);
};

// 🔹 Add a Deliveryman
const addDeliveryman = async () => {
  const deliveryman = new Deliveryman({
    uid: "delivery123",
    fullName: "Bob Jones",
    email: "deliveryman@example.com",
    vehicleType: "Bike",
    assignedArea: "Sector 10",
  });
  await deliveryman.save();
  console.log("✅ Deliveryman added:", deliveryman);
};

// 🔹 Add a Farmer
const addFarmer = async () => {
  const farmer = new Farmer({
    uid: "farmer123",
    fullName: "Charlie Brown",
    email: "farmer@example.com",
    farmName: "Green Fields",
    farmLocation: "Countryside",
    crops: ["Wheat", "Corn"],
  });
  await farmer.save();
  console.log("✅ Farmer added:", farmer);
};

// Run Tests
(async () => {
  try {
    await addAdmin();
    await addShopkeeper();
    await addDeliveryman();
    await addFarmer();
    console.log("✅ All models added successfully!");

    // Close connection after tests
    mongoose.connection.close();
    console.log("🔴 MongoDB connection closed.");
  } catch (err) {
    console.error("❌ Error adding models:", err);
    mongoose.connection.close();
  }
})();

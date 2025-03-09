const Order = require("../models/Order");

// Fetch all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order status", error });
  }
};

module.exports = { getOrders, updateOrderStatus };
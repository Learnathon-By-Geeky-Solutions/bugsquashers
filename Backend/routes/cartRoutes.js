// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware"); // Correct import
const {
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  getCart,
  clearCart,
} = require("../controllers/cartController");

// Add item to cart
router.post("/add", authenticateUser, addItemToCart);

// Update item quantity in cart
router.put("/update", authenticateUser, updateCartItemQuantity);

// Remove item from cart
router.delete("/remove", authenticateUser, removeItemFromCart);

// Get cart details
router.get("/", authenticateUser, getCart);

// Clear cart
router.delete("/clear", authenticateUser, clearCart);

module.exports = router;
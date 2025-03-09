// cartController.js
const Cart = require("../models/Cart");

// Add item to cart
const addItemToCart = async (req, res) => {
  const { productId, name, variant, price, quantity, image } = req.body;
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      // Update quantity if item exists
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      cart.items.push({ productId, name, variant, price, quantity, image });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    console.error("❌ Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update item quantity in cart
const updateCartItemQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json({ message: "Cart item quantity updated", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("❌ Error updating cart item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove item from cart
const removeItemFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("❌ Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart details
const getCart = async (req, res) => {
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  const userId = req.user.id; // Extract user ID from authenticated request

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  getCart,
  clearCart,
};
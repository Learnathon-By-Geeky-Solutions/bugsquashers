const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const { User } = require("../models/User");


const isShopkeeper = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user || user.role !== "Shopkeeper") {
      return res.status(403).json({ message: "Access denied: Shopkeeper only" });
    }
    req.shopkeeper = user;
    next();
  } catch (error) {
    console.error("❌ Error in isShopkeeper middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Expected Earnings (based on pending orders)
router.get("/expected-earnings", isShopkeeper, async (req, res) => {
  try {
    const earnings = await Order.aggregate([
      { $match: { shopkeeperId: req.shopkeeper._id, status: "Pending" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    res.status(200).json({ expectedEarnings: earnings[0]?.total || 0 });
  } catch (error) {
    console.error("❌ Error fetching expected earnings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Average Daily Sales (last 30 days)
router.get("/average-daily-sales", isShopkeeper, async (req, res) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const sales = await Order.aggregate([
      { $match: { shopkeeperId: req.shopkeeper._id, status: "Completed", orderDate: { $gte: thirtyDaysAgo } } },
      { $group: { _id: { $dayOfMonth: "$orderDate" }, total: { $sum: "$totalAmount" } } }
    ]);
    const avgSales = sales.length ? sales.reduce((sum, day) => sum + day.total, 0) / sales.length : 0;
    res.status(200).json({ averageDailySales: avgSales });
  } catch (error) {
    console.error("❌ Error fetching average daily sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Sales This Month
router.get("/sales-this-month", isShopkeeper, async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().setDate(1));
    const sales = await Order.aggregate([
      { $match: { shopkeeperId: req.shopkeeper._id, status: "Completed", orderDate: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    res.status(200).json({ salesThisMonth: sales[0]?.total || 0 });
  } catch (error) {
    console.error("❌ Error fetching sales this month:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Orders This Month
router.get("/orders-this-month", isShopkeeper, async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().setDate(1));
    const orders = await Order.countDocuments({
      shopkeeperId: req.shopkeeper._id,
      orderDate: { $gte: startOfMonth }
    });
    res.status(200).json({ ordersThisMonth: orders });
  } catch (error) {
    console.error("❌ Error fetching orders this month:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/new-customers", isShopkeeper, async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().setDate(1));
    const customers = await Order.distinct("customerId", {
      shopkeeperId: req.shopkeeper._id,
      orderDate: { $gte: startOfMonth }
    });
    res.status(200).json({ newCustomers: customers.length });
  } catch (error) {
    console.error("❌ Error fetching new customers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/todays-heroes", isShopkeeper, async (req, res) => {
  try {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const heroes = await Order.aggregate([
      { $match: { shopkeeperId: req.shopkeeper._id, orderDate: { $gte: new Date(startOfDay) } } },
      { $unwind: "$items" },
      { $group: { _id: "$items.name", totalSold: { $sum: "$items.quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 3 }
    ]);
    res.status(200).json({ todaysHeroes: heroes });
  } catch (error) {
    console.error("❌ Error fetching today’s heroes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Recent Orders
router.get("/recent-orders", isShopkeeper, async (req, res) => {
  try {
    const orders = await Order.find({ shopkeeperId: req.shopkeeper._id })
      .sort({ orderDate: -1 })
      .limit(5)
      .select("orderId totalAmount status orderDate");
    res.status(200).json({ recentOrders: orders });
  } catch (error) {
    console.error("❌ Error fetching recent orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Discounted Sales (total discount amount this month)
router.get("/discounted-sales", isShopkeeper, async (req, res) => {
  try {
    const startOfMonth = new Date(new Date().setDate(1));
    const discounts = await Order.aggregate([
      { $match: { shopkeeperId: req.shopkeeper._id, orderDate: { $gte: startOfMonth } } },
      { $unwind: "$items" },
      { $group: { _id: null, totalDiscount: { $sum: { $multiply: ["$items.price", "$items.discount", "$items.quantity", 0.01] } } } }
    ]);
    res.status(200).json({ discountedSales: discounts[0]?.totalDiscount || 0 });
  } catch (error) {
    console.error("❌ Error fetching discounted sales:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
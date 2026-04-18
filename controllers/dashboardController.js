import User from "../models/user.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

export const getDashboardData = async (req, res) => {
  try {
    // 🔢 COUNTS
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // 💰 TOTAL REVENUE
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.totalAmount || 0);
    }, 0);

    // 🆕 RECENT USERS
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    // 🆕 RECENT PRODUCTS
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // 📊 LAST 7 DAYS ORDERS GRAPH
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const start = new Date(date.setHours(0, 0, 0, 0));
      const end = new Date(date.setHours(23, 59, 59, 999));

      const count = await Order.countDocuments({
        date: { $gte: start, $lte: end },
      });

      last7Days.push({
        date: start.toISOString().split("T")[0],
        orders: count,
      });
    }

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      recentUsers,
      recentProducts,
      chartData: last7Days,
    });

  } catch (err) {
    console.log("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};
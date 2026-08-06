const User = require("../models/User");
const Menu = require("../models/Menu");
const Order = require("../models/Order");

const getDashboard = async (req, res) => {
  try {
    // Basic Counts
    const totalUsers = await User.countDocuments();
    const totalMenuItems = await Menu.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Order Status Counts
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const preparingOrders = await Order.countDocuments({
      status: "Preparing",
    });

    const outForDeliveryOrders = await Order.countDocuments({
      status: "Out for Delivery",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    const cancelledOrders = await Order.countDocuments({
      status: "Cancelled",
    });

    // Revenue
    const revenueResult = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

    // Recent Orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    // Monthly Revenue
    const monthlyRevenue = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: {
            $sum: "$totalAmount",
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // Top Selling Menu Items
    const topSellingItems = await Order.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.menu",
          totalSold: {
            $sum: "$items.quantity",
          },
        },
      },

      {
        $sort: {
          totalSold: -1,
        },
      },

      {
        $limit: 5,
      },

      {
        $lookup: {
          from: "menus",
          localField: "_id",
          foreignField: "_id",
          as: "menu",
        },
      },

      {
        $unwind: "$menu",
      },

      {
        $project: {
          _id: 0,
          name: "$menu.name",
          category: "$menu.category",
          price: "$menu.price",
          totalSold: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,

      dashboard: {
        totalUsers,
        totalMenuItems,
        totalOrders,
        pendingOrders,
        preparingOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders,
        totalRevenue,
        recentOrders,
        monthlyRevenue,
        topSellingItems,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
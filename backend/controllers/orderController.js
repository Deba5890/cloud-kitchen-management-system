
// Place Order
const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod,
    } = req.body;

    console.log("REQ.USER:", req.user);
    console.log("USER ID:", req.user?.id);

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      deliveryAddress,
      phone,
      paymentMethod,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    console.log("===== GET MY ORDERS =====");
    console.log("req.user:", req.user);

    const orders = await Order.find({ user: req.user.id })
      .populate("items.menuId")
      .sort({ createdAt: -1 });

    console.log("Orders:", JSON.stringify(orders, null, 2));

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("===== GET MY ORDERS ERROR =====");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Order By ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.menuId");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    console.log("Fetching all orders...");

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.menuId")
      .sort({ createdAt: -1 });

    console.log("Orders:", orders);

    res.status(200).json({
      success: true,
      orders,
    });

  } catch (error) {
    console.error("GET ALL ORDERS ERROR:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    // 👇 Add these logs
    console.log("Order ID:", req.params.id);
    console.log("New Status:", req.body.status);

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    // 👇 Add this log
    console.log("Updated Order:", order);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order Not Found",
      });
    }

    res.json({
      success: true,
      message: "Order Status Updated",
      order,
    });
  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
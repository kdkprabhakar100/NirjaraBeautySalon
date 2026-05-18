const Order = require("../models/Order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL ORDERS
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
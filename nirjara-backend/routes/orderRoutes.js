const express = require("express");

const router = express.Router();

const {
  getOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

// GET ALL ORDERS
router.get("/", getOrders);

// CREATE ORDER
router.post("/", createOrder);

// UPDATE ORDER STATUS
router.put("/:id", updateOrderStatus);

// DELETE ORDER
router.delete("/:id", deleteOrder);

module.exports = router;
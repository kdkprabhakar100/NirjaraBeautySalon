const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

// CREATE ORDER
router.post("/", createOrder);

// GET ORDERS
router.get("/", getOrders);

// UPDATE STATUS
router.put("/:id", updateOrderStatus);

module.exports = router;
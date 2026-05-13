const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
    },

    items: [
      {
        productId: String,
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],

    total: Number,

    paymentMethod: {
      type: String,
      default: "COD",
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
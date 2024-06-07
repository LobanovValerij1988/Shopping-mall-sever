const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: false,
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
  },
  { excludeIndexes: true }
);

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: [productSchema],
});

module.exports = mongoose.model("Order", orderSchema);

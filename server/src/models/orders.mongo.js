const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    _id: false,
    name: {
      type: String,
      required: [true, "there isn't name of product"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is the necessary field"],
      min: [0, "Quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "price is the necessary field"],
      min: [0, "Price cannot be negative"],
    },
  },
  { excludeIndexes: true }
);

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "user is the necessary field"],
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  products: [
    {
      type: productSchema,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);

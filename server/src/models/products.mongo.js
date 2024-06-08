const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name can not be empty"],
    unique: true,
    index: true,
  },
  quantity: {
    type: Number,
    required: [true, "quantity can not be empty"],
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: Number,
    required: [true, "price can not be empty"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

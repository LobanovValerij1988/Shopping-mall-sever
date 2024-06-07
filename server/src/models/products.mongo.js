const mongoose = require("mongoose");

let products = [
  { name: "snikers", categoryID: 1, price: 25, quantity: 17, id: 1 },
  { name: "blouse", categoryID: 1, price: 55, quantity: 23, id: 2 },
  { name: "scirt", categoryID: 2, price: 5, quantity: 23, id: 3 },
  { name: "scirt", categoryID: 4, price: 5, quantity: 23, id: 4 },
  { name: "scirt", categoryID: 3, price: 5, quantity: 23, id: 5 },
  { name: "hammer", categoryID: 5, price: 15, quantity: 3, id: 6 },
];

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [0, "Quantity cannot be negative"],
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);

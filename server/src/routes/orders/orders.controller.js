const orders = require("../../models/orders.model");

function getAllOrders(req, res) {
  res.status(200).json(orders);
}
module.exports = { getAllOrders };

const {
  getAllOrders,
  getOrderByID,
  deleteOrder,
} = require("../../models/orders.model");

function httpGetAllOrders(req, res) {
  res.status(200).json(getAllOrders());
}

function httpGetOrderByID(req, res) {
  const { orderID } = req.params;
  const order = getOrderByID(Number(orderID));
  if (!order) {
    return res.status(400).json({
      error: "order not found",
    });
  } else {
    return res.status(201).json(order);
  }
}

function httpDeleteOrder(req, res) {
  const orderID = req.params.id;
  const order = deleteOrder(Number(orderID));
  if (!order) {
    return res.status(400).json({
      error: "order not found",
    });
  } else {
    return res.status(201).json(order);
  }
}

module.exports = { httpGetAllOrders, httpGetOrderByID, httpDeleteOrder };

const express = require("express");

const {
  httpGetAllOrders,
  httpGetOrderByID,
  httpDeleteOrder,
} = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/", httpGetAllOrders);
ordersRouter.get("/order/:orderID", httpGetOrderByID);
ordersRouter.delete("/:id", httpDeleteOrder);

module.exports = ordersRouter;

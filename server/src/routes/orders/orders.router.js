const express = require("express");

const { getAllOrders } = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/allOrders", getAllOrders);

module.exports = ordersRouter;

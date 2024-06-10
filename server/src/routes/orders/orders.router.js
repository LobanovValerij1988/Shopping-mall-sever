const express = require("express");

const {
  httpGetAllOrders,
  httpGetOrderByID,
  httpAddOrder,
  httpBestSellingProducts,
  httpTotalRevenueByDateRange,
} = require("./orders.controller");

const ordersRouter = express.Router();

ordersRouter.get("/", httpGetAllOrders);
ordersRouter.get("/products", httpBestSellingProducts);
ordersRouter.get(
  "/revenue/startDate/:startDate/endDate/:endDate",
  httpTotalRevenueByDateRange
);
ordersRouter.get("/:id", httpGetOrderByID);
ordersRouter.post("/", httpAddOrder);

module.exports = ordersRouter;

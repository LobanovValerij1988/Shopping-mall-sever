const express = require("express");

const {
  httpGetAllOrders,
  httpGetOrderByID,
  httpAddOrder,
  httpBestSellingProducts,
  httpTotalRevenueByDateRange,
} = require("./orders.controller");

const ordersRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - product
 *         - customer
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the order
 *         customer:
 *           type: string
 *           description: The customer id
 *         orderDate:
 *           type: string
 *           description: The date when  order was made
 *         products:
 *           type: array
 *           items:
 *                 type: object
 *                 properties:
 *                   name:
 *                    type: string
 *                    description: The name of the product
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of product
 *                   price:
 *                     type: number
 *                     description: The product name
 *       example:
 *         products:
 *           - productId: fw43gf43g3g
 *             quantity: 5
 *           - productId: dasdas
 *             quantity: 12
  *   parameters:
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         description: The order id
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: The orders managing API
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Returns the list of all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: The list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
ordersRouter.get("/", httpGetAllOrders);

/**
* @swagger
* /orders/bestSellingProducts:
*   get:
*     summary: Get the top 5 best-selling products based on order quantities
*     tags: [Orders]
*     responses:
*       200:
*         description: Top 5 Best-Selling Products
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 type: object
*                 properties:
*                   _id:
*                     type: string
*                     description: The name  of the product
*                   totalItemSell:
*                     type: integer
*                     description: All items were sold for all time
*/

ordersRouter.get("/bestSellingProducts", httpBestSellingProducts);

/**
 * @swagger
 * /orders/revenueByRangeDate:
 *   get:
 *     summary: Get the total revenue generated from orders placed within a specific date range.
 *     tags: [Orders]
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           example: 2024-06-07
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           example: 2024-07-07
 *     responses:
 *       200:
 *         description: Total Revenue by Date Range
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */

ordersRouter.get(
  "/revenueByRangeDate",
  httpTotalRevenueByDateRange
);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: The order description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: The order was not found
 * */
ordersRouter.get("/:id", httpGetOrderByID);
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The order was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
ordersRouter.post("/", httpAddOrder);

module.exports = ordersRouter;

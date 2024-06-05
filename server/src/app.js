const express = require("express");
const cors = require("cors");

const productsRouter = require("./routes/products/products.router");
const categoriesRouter = require("./routes/categories/categories.router");
const ordersRouter = require("./routes/orders/orders.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use(productsRouter);
app.use(categoriesRouter);
app.use(ordersRouter);

module.exports = app;

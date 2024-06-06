const path = require("path");
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
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/orders", ordersRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;

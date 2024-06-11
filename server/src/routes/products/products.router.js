const express = require("express");

const {
  httpGetAllProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpAddProduct,
  httpUpdateProduct,
  httpGetLowStockProducts,
} = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/lowStock/:quantityLimit", httpGetLowStockProducts);
productsRouter.get("/:id", httpGetProductByID);
productsRouter.post("/", httpAddProduct);
productsRouter.put("/", httpUpdateProduct);
productsRouter.delete("/:id", httpDeleteProduct);

module.exports = productsRouter;

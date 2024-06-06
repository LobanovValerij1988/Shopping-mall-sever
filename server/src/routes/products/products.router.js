const express = require("express");

const {
  httpGetAllProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpAddProduct,
  httpUpdateProduct,
} = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/", httpGetAllProducts);
productsRouter.get("/product/:productID", httpGetProductByID);
productsRouter.post("/", httpAddProduct);
productsRouter.put("/", httpUpdateProduct);
productsRouter.delete("/:id", httpDeleteProduct);

module.exports = productsRouter;

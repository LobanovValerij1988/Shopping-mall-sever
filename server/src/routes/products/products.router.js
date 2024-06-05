const express = require("express");

const { getAllProducts } = require("./products.controller");

const productsRouter = express.Router();

productsRouter.get("/allProducts", getAllProducts);

module.exports = productsRouter;

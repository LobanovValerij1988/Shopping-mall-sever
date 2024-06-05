const express = require("express");

const { getAllCategories } = require("./categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.get("/allCategories", getAllCategories);

module.exports = categoriesRouter;

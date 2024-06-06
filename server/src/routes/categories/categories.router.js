const express = require("express");

const {
  httpGetAllCategories,
  httpGetCategoryByID,
  httpUpdateCategory,
  httpAddCategory,
  httpDeleteCategory,
} = require("./categories.controller");

const categoriesRouter = express.Router();

categoriesRouter.get("/", httpGetAllCategories);
categoriesRouter.get("/category/:categoryID", httpGetCategoryByID);
categoriesRouter.post("/", httpAddCategory);
categoriesRouter.put("/", httpUpdateCategory);
categoriesRouter.get("/:id", httpDeleteCategory);

module.exports = categoriesRouter;

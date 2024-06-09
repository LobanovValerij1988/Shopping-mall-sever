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
categoriesRouter.get("/:id", httpGetCategoryByID);
categoriesRouter.post("/", httpAddCategory);
categoriesRouter.put("/", httpUpdateCategory);
categoriesRouter.delete("/:id", httpDeleteCategory);

module.exports = categoriesRouter;

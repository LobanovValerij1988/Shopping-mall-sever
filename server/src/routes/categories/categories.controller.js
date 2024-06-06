const {
  getAllCategories,
  addNewCategory,
  updateCategory,
  isCategoryExist,
  getCategoryByID,
  deleteCategory,
} = require("../../models/categories.model");
const { isCategoryValid } = require("./categoryValidator");

function httpGetAllCategories(req, res) {
  res.status(200).json(getAllCategories());
}

function httpGetCategoryByID(req, res) {
  const { categoryID } = req.params;
  const category = getCategoryByID(Number(categoryID));
  if (!category) {
    return res.status(400).json({
      error: "category not found",
    });
  } else {
    return res.status(201).json(category);
  }
}

function httpAddCategory(req, res) {
  const category = { ...req.body, id: Math.floor(Math.random() * 1000) };
  let errMsg = isCategoryValid(category);
  if (errMsg) {
    return res.status(400).json({
      error: errMsg,
    });
  } else {
    addNewCategory(category);
    return res.status(201).json(category);
  }
}

function httpUpdateCategory(req, res) {
  const category = req.body;
  if (!isCategoryExist(category.id)) {
    return res.status(400).json({
      error: "category not found",
    });
  }
  let errMsg = isCategoryValid(category);
  if (errMsg) {
    return res.status(400).json({
      error: errMsg,
    });
  } else {
    updateCategory(category);
    return res.status(201).json(category);
  }
}

function httpDeleteCategory(req, res) {
  const categoryID = req.params.id;
  const category = deleteCategory(Number(categoryID));
  if (!category) {
    return res.status(400).json({
      error: "category not found",
    });
  } else {
    return res.status(201).json(category);
  }
}

module.exports = {
  httpGetAllCategories,
  httpGetCategoryByID,
  httpDeleteCategory,
  httpUpdateCategory,
  httpAddCategory,
};

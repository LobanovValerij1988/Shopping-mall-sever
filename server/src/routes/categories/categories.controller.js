const {
  getAllCategories,
  addNewCategory,
  updateCategory,
  getCategoryByID,
  deleteCategory,
} = require("../../models/categories.model");

async function httpGetAllCategories(req, res) {
  res.status(200).json(await getAllCategories());
}

async function httpGetCategoryByID(req, res) {
  try {
    const categoryID = req.params.id;
    const category = await getCategoryByID(categoryID);
    if (!category) {
      return res.status(400).json({
        error: "category not found",
      });
    } else {
      return res.status(201).json(category);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpAddCategory(req, res) {
  try {
    const addedCategory = await addNewCategory(req.body);
    return res.status(201).json(addedCategory);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpUpdateCategory(req, res) {
  try {
    const updatedCategory = await updateCategory(req.body);
    if (!updatedCategory) {
      return res.status(400).json({
        error: "category not found",
      });
    } else {
      return res.status(201).json(updatedCategory);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpDeleteCategory(req, res) {
  try {
    const categoryID = req.params.id;
    const category = await deleteCategory(categoryID);
    if (!category) {
      return res.status(400).json({
        error: "category not found",
      });
    } else {
      return res.status(201).json(category);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

module.exports = {
  httpGetAllCategories,
  httpGetCategoryByID,
  httpDeleteCategory,
  httpUpdateCategory,
  httpAddCategory,
};

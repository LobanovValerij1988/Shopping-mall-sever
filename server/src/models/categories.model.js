const categories = require("./categories.mongo");

function isCategoryExist(categoryID) {
  return categories.some((category) => category.id === categoryID);
}

async function getAllCategories() {
  return await categories.find({}, { __v: 0 });
}

function getCategoryByID(categoryID) {
  return categories.find((category) => category.id === categoryID);
}

function addNewCategory(category) {
  categories.push(category);
}

function deleteCategory(categoryID) {}

function updateCategory(updatedCategory) {
  categories = categories.map((category) => {
    if (category.id === updatedCategory.id) {
      return updatedCategory;
    } else {
      return category;
    }
  });
}

module.exports = {
  isCategoryExist,
  getAllCategories,
  getCategoryByID,
  addNewCategory,
  updateCategory,
  deleteCategory,
};

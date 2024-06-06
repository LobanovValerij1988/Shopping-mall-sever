let categories = [
  { name: "shoes", id: 1 },
  { name: "wears", id: 2 },
  { name: "tools", id: 3 },
  { name: "books", id: 4 },
  { name: "cars", id: 5 },
];

function isCategoryExist(categoryID) {
  return categories.some((category) => category.id === categoryID);
}

function getAllCategories() {
  return categories;
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

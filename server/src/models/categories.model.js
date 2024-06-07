const categories = require("./categories.mongo");

async function seedCategories() {
  let seedingCategories = ["wears", "tools", "books", "cars", "realEstate"];
  seedingCategories.forEach(async (seedingCategory) => {
    await categories.updateOne(
      { name: seedingCategory },
      { name: seedingCategory },
      {
        upsert: true,
      }
    );
  });
}

async function loadCategoriesFromSeed() {
  const firstCategory = await categories.findOne();
  if (firstCategory) {
    console.log("Categories data already loaded");
  } else {
    await seedCategories();
  }
}

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
  loadCategoriesFromSeed,
  isCategoryExist,
  getAllCategories,
  getCategoryByID,
  addNewCategory,
  updateCategory,
  deleteCategory,
};

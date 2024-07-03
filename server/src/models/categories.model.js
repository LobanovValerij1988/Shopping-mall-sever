const categories = require("./categories.mongo");
const products = require("./products.mongo");

function getAllCategories() {
  return  categories.find().lean().exec();
}

function getCategoryByID(categoryID) {
  return  categories.findById(categoryID);
}

function getCategoryBy (categoryField){
  return categories.findOne(categoryField).lean().exec();
}

async function addNewCategory(category) {
  return  categories.create(category);

}

function deleteCategory(categoryID) {
  return  categories.findByIdAndDelete(categoryID);
}

async function updateCategory( updatedCategory) {
  await updatedCategory.save();
  return  updatedCategory;
}

//aggregation function

function totalProductQuantityByCategory() {
  return  categories.aggregate([
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "category",
        as: "category",
      },
    },
    {
      $project: {
        name: 1,
        productsInCategory: { $sum: "$category.quantity" },
      },
    },
    {
      $sort: {
        productsInCategory: -1,
      },
    },
  ]);
}

module.exports = {
  getAllCategories,
  getCategoryByID,
  getCategoryBy,
  addNewCategory,
  updateCategory,
  deleteCategory,
  //aggregation
  totalProductQuantityByCategory,
};

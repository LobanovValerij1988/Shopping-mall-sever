const categories = require("./categories.mongo");

function getAllCategories() {
  return  categories.find({}, { __v: 0 });
}

function getCategoryByID(categoryID) {
  return  categories.findById(categoryID, "_id, name");
}

async function addNewCategory(category) {
  const categoryCerated = await categories.create(category);
  const { __v, ...otherFields } = categoryCerated.toObject();
  return otherFields;
}

function deleteCategory(categoryID) {
  return  categories.findByIdAndDelete(categoryID);
}

function updateCategory(categoryId, updatedCategory) {

  return  categories.findByIdAndUpdate(categoryId, updatedCategory, {
    new: true,
    runValidators: true,
    select: {
      __v: 0,
    },
  });
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
  addNewCategory,
  updateCategory,
  deleteCategory,
  //aggregation
  totalProductQuantityByCategory,
};

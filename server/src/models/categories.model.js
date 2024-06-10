const categories = require("./categories.mongo");

async function getAllCategories() {
  return await categories.find({}, { __v: 0 });
}

async function getCategoryByID(categoryID) {
  return await categories.findById(categoryID, "_id, name");
}

async function addNewCategory(category) {
  const categoryCerated = await categories.create(category);
  const { __v, ...otherFields } = categoryCerated.toObject();
  return otherFields;
}

async function deleteCategory(categoryID) {
  return await categories.findByIdAndDelete(categoryID);
}

async function updateCategory(updatedCategory) {
  const { _id, ...otherFields } = updatedCategory;
  return await categories.findByIdAndUpdate(_id, otherFields, {
    new: true,
    runValidators: true,
    select: {
      __v: 0,
    },
  });
}

//agregation function

async function totalProductQuantityByCategory() {
  return await categories.aggregate([
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
  //afregation
  totalProductQuantityByCategory,
};

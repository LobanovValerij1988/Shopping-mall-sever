import {categories, ICategory, IMongoCategory} from "./categories.mongo";
import {HydratedDocument} from "mongoose";

export function getAllCategories() {
  return  categories.find().lean().exec();
}

export function getCategoryByID(categoryID:string) {
  return  categories.findById(categoryID);
}

export function getCategoryBy (categoryField:{name:string}) {
  return categories.findOne(categoryField).lean().exec();
}

export async function addNewCategory(category: ICategory) {
  return  categories.create(category);

}

export function deleteCategory(categoryID:string) {
  return  categories.findByIdAndDelete(categoryID);
}

export async function updateCategory( updatedCategory: IMongoCategory) {
  await updatedCategory.save();
  return  updatedCategory;
}

//aggregation function

export function totalProductQuantityByCategory() {
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
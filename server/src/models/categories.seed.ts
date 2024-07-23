import {categories} from "./categories.mongo";

async function seedCategories() {
  let seedingCategories = ["wears", "tools", "books", "cars", "realEstate"];
  for (const seedingCategory of seedingCategories) {
    await categories.updateOne(
      { name: seedingCategory },
      { name: seedingCategory },
      {
        upsert: true,
      }
    );
  }
}

export async function loadCategoriesFromSeed() {
  const firstCategory = await categories.findOne();
  if (firstCategory) {
    console.log("Categories data already loaded");
  } else {
    await seedCategories();
  }
}
 module.exports= {
    loadCategoriesFromSeed
 }
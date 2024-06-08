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
 module.exports= {
    loadCategoriesFromSeed
 }
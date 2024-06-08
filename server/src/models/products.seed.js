const products = require("./products.mongo");
const categories = require("./categories.mongo");

async function seedingProducts() {
  const seedingProducts = [
    { name: "snikers", categoryName: "wears", price: 25, quantity: 17 },
    { name: "blouse", categoryName: "wears", price: 55, quantity: 53 },
    { name: "scirt", categoryName: "wears", price: 5, quantity: 37 },
    { name: "War and Peace", categoryName: "books", price: 2, quantity: 28 },
    { name: "Bentley", categoryName: "cars", price: 100000, quantity: 92 },
    { name: "hummer", categoryName: "tools", price: 1, quantity: 304 },
  ];
  products.deleteMany({});
  seedingProducts.forEach(async (seedingProduct) => {
    const category = await categories.findOne({
      name: seedingProduct.categoryName,
    });
    await products.create({
      ...seedingProduct,
      category: category._id,
    });
  });
}

async function loadProductsFromSeed() {
  const firstProduct = await products.findOne();
  if (firstProduct) {
    console.log("Products data already loaded");
  } else {
    await seedingProducts();
  }
}

module.exports = {
  loadProductsFromSeed,
};

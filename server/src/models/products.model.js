const products = require("./products.mongo");

async function getAllProducts() {
  return await products
    .find({}, { __v: 0 })
    .populate({
      path: "category",
      select: "name -_id",
    })
    .exec();
}

function getProductByID(productID) {
  return products.find((product) => product.id === productID);
}

function isProductExist(productID) {
  return products.some((product) => product.id === productID);
}

function deleteProduct(productID) {}

function addNewProduct(product) {
  products.push(product);
}

function updateProduct(updatedProduct) {
  products = products.map((product) => {
    if (product.id === updatedProduct.id) {
      return updatedProduct;
    } else {
      return product;
    }
  });
}

module.exports = {
  isProductExist,
  updateProduct,
  addNewProduct,
  getAllProducts,
  getProductByID,
  deleteProduct,
};

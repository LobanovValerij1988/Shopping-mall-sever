const products = require("./products.mongo");

function getAllProducts() {
  return products;
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

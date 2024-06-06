let products = [
  { name: "snikers", categoryID: 1, price: 25, quantity: 17, id: 1 },
  { name: "blouse", categoryID: 1, price: 55, quantity: 23, id: 2 },
  { name: "scirt", categoryID: 2, price: 5, quantity: 23, id: 3 },
  { name: "scirt", categoryID: 4, price: 5, quantity: 23, id: 4 },
  { name: "scirt", categoryID: 3, price: 5, quantity: 23, id: 5 },
  { name: "hammer", categoryID: 5, price: 15, quantity: 3, id: 6 },
];

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

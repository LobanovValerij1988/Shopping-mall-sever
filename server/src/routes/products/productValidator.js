const { isCategoryExist } = require("../../models/categories.model");

function isProductValid(product) {
  let errMsg = "";
  if (!product.name) {
    errMsg += "product name is required ";
  }
  if (product.price === "") {
    errMsg += "price is required ";
  } else if (product.price < 0) {
    errMsg += "price couldn't be negative ";
  }
  if (product.quantity === "") {
    errMsg += "quantity is required";
  } else if (product.quantity < 0) {
    errMsg += "quantity couldn't be negative ";
  }
  if (!isCategoryExist(product.categoryID)) {
    errMsg += "this category doesn't exist ";
  }
  return errMsg;
}

module.exports = {
  isProductValid,
};

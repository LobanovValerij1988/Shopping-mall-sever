const products = require("./products.mongo");

async function getAllProducts() {
  return await products
    .find({}, { __v: 0 })
    .populate({
      path: "category",
      select: "name",
    })
    .exec();
}

async function getProductByID(productID) {
  return await products
    .findById(productID, { __v: 0 })
    .populate({
      path: "category",
      select: "name",
    })
    .exec();
}

async function addNewProduct(product) {
  const productCreated = await products.create(product);
  return await getProductByID(productCreated._id);
}

async function deleteProduct(productID) {
  return await products.findByIdAndDelete(productID);
}

async function updateProduct(updatedProduct) {
  const { _id, ...otherFields } = updatedProduct;
  const newlyCreatedProduct = await products.findByIdAndUpdate(
    _id,
    otherFields,
    {
      new: true,
      runValidators: true,
      select: {
        __v: 0,
      },
    }
  );
  return await getProductByID(newlyCreatedProduct._id);
}

module.exports = {
  getAllProducts,
  getProductByID,
  addNewProduct,
  updateProduct,
  deleteProduct,
};

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

// agregate
async function getLowStockProductsWhichOrdered(quantityLimit) {
  return await products.aggregate([
    //find products which quantity less than quantity limit
    { $match: { quantity: { $lt: quantityLimit } } },
    // find is this product were ordered
    {
      $lookup: {
        from: "orders",
        localField: "name",
        foreignField: "products.name",
        as: "productDetails",
      },
    },
    // if productDetails is empty so this product wasn't ordered
    { $match: { productDetails: { $ne: [] } } },
    // and delete this field
    { $unset: ["productDetails"] },
  ]);
}

module.exports = {
  getAllProducts,
  getProductByID,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getLowStockProductsWhichOrdered,
};

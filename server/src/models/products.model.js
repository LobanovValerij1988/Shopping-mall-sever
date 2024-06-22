const products = require("./products.mongo");

async function getAllProducts() {
  return  products
    .find({}, { __v: 0 })
    .populate({
      path: "category",
      select: "name",
    })
}

function getProductByID(productID) {
  return products
    .findById(productID, { __v: 0 })
    .populate({
      path: "category",
      select: "name",
    })
}

async function addNewProduct(product) {
  const productCreated = await products.create(product);
  return  getProductByID(productCreated._id);
}

function deleteProduct(productID) {
  return  products.findByIdAndDelete(productID);
}

async function updateProduct(productId,updatedProduct) {
  const newlyCreatedProduct = await products.findByIdAndUpdate(
      productId,
      updatedProduct,
    {
      new: true,
      runValidators: true,
      select: {
        __v: 0,
      },
    }
  );
  return  getProductByID(newlyCreatedProduct._id);
}

// agregate
function getLowStockProductsWhichOrdered(quantityLimit) {
  return  products.aggregate([
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
    { $unset: ["productDetails","__v"] },
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

const products = require("./products.mongo");

async function getFilteredProducts(filtersCategory, searchText) {
    searchText= searchText === undefined ? "" : searchText;
    let filteredProducts;
    if(filtersCategory) {
        filteredProducts = products.find({category:{$in:filtersCategory}}, {});
    }
    else{
        filteredProducts = products.find({}, {});
    }
     return filteredProducts.find({name:{$regex:new RegExp("^"+ searchText, 'i')}}).populate({
         path: "category",
         select: "name",
     }).lean().exec();

}

function getProductBy (productField){
    return products.findOne(productField).lean().exec();
}

function getProductByID(productID) {
  return products
    .findById(productID, {})
    .populate({
      path: "category",
      select: "name",
    })
}

async function addNewProduct(product) {
   return products.create(product);
}

async function updateProduct(updatedProduct) {
    await updatedProduct.save();
    return  updatedProduct;
}

function deleteProduct(productID) {
    return  products.findByIdAndDelete(productID);
}

// aggregate
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
  getFilteredProducts,
  getProductByID,
  getProductBy,
  addNewProduct,
  updateProduct,
  deleteProduct,
  getLowStockProductsWhichOrdered,
};

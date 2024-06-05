const products = require("../../models/products.model");

function getAllProducts(req, res) {
  res.status(200).json(products);
}
module.exports = { getAllProducts };

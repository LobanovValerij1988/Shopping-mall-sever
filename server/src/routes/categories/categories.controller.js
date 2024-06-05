const categories = require("../../models/categories.model");

function getAllCategories(req, res) {
  res.status(200).json(categories);
}
module.exports = { getAllCategories };

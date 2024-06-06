const {
  getAllProducts,
  getProductByID,
  deleteProduct,
  addNewProduct,
  updateProduct,
  isProductExist,
} = require("../../models/products.model");
const { isProductValid } = require("./productValidator");

function httpGetAllProducts(req, res) {
  return res.status(200).json(getAllProducts());
}

function httpAddProduct(req, res) {
  const product = { ...req.body, id: Math.floor(Math.random() * 1000) };
  let errMsg = isProductValid(product);
  if (errMsg) {
    return res.status(400).json({
      error: errMsg,
    });
  } else {
    addNewProduct(product);
    return res.status(201).json(product);
  }
}

function httpUpdateProduct(req, res) {
  const product = req.body;
  if (!isProductExist(product.id)) {
    return res.status(400).json({
      error: "product not found",
    });
  }
  let errMsg = isProductValid(product);
  if (errMsg) {
    return res.status(400).json({
      error: errMsg,
    });
  } else {
    updateProduct(product);
    return res.status(201).json(product);
  }
}

function httpGetProductByID(req, res) {
  const { productID } = req.params;
  const product = getProductByID(Number(productID));
  if (!product) {
    return res.status(400).json({
      error: "product not found",
    });
  } else {
    return res.status(201).json(product);
  }
}

function httpDeleteProduct(req, res) {
  const productID = req.params.id;
  const product = deleteProduct(Number(productID));
  if (!product) {
    return res.status(400).json({
      error: "product not found",
    });
  } else {
    return res.status(201).json(product);
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpUpdateProduct,
  httpAddProduct,
};

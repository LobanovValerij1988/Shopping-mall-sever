const {
  getAllProducts,
  getProductByID,
  deleteProduct,
  addNewProduct,
  updateProduct,
  getLowStockProductsWhichOrdered,
} = require("../../models/products.model");

async function httpGetAllProducts(req, res) {
  return res.status(200).json(await getAllProducts());
}

async function httpGetProductByID(req, res) {
  try {
    const product = await getProductByID(req.params.id);
    if (!product) {
      return res.status(400).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpAddProduct(req, res) {
  try {
    const addedProduct = await addNewProduct(req.body);
    return res.status(201).json(addedProduct);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpUpdateProduct(req, res) {
  try {
    const updatedProduct = await updateProduct(req.body);
    if (!updatedProduct) {
      return res.status(400).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(updatedProduct);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpDeleteProduct(req, res) {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(400).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

//agregation

async function httpGetLowStockProducts(req, res) {
  try {
    const products = await getLowStockProductsWhichOrdered(
      +req.params.quantityLimit
    );
    if (!products) {
      return res.status(400).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(products);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

module.exports = {
  httpGetAllProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpUpdateProduct,
  httpAddProduct,
  httpGetLowStockProducts,
};

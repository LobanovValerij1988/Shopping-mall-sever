const {
  getFilteredProducts,
  getProductByID,
  deleteProduct,
  addNewProduct,
  updateProduct,
  getLowStockProductsWhichOrdered,
} = require("../../models/products.model");

async function httpGetFilteredProducts(req, res) {
 try {
   return res.status(200).json(await getFilteredProducts(req.query.filtersCategory, req.query.searchText));
 }
 catch (err) {
   return res.status(500).json({
     error: err.message,
   });
 }
}

async function httpGetProductByID(req, res) {
  try {
    const product = await getProductByID(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpAddProduct(req, res) {
  try {
    const addedProduct = await addNewProduct(req.body);
    return res.status(201).json(addedProduct);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpUpdateProduct(req, res) {
  try {
    const updatedProduct = await updateProduct(req.params.id,req.body);
    if (!updatedProduct) {
      return res.status(404).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(updatedProduct);
    }
  } catch (err) {
   console.log("error")
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpDeleteProduct(req, res) {
  try {
    const product = await deleteProduct(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: "product not found",
      });
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

//agregation

async function httpGetLowStockProducts(req, res) {
  try {
    const products = await getLowStockProductsWhichOrdered(
       +req.query.lessThan
    );
      return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  httpGetFilteredProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpUpdateProduct,
  httpAddProduct,
  httpGetLowStockProducts,
};

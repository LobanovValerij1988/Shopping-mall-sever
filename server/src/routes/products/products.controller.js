const {
  getFilteredProducts,
  getProductByID,
  getProductBy,
  deleteProduct,
  addNewProduct,
  updateProduct,
  getLowStockProductsWhichOrdered,
} = require("../../models/products.model");
const {getCategoryByID} = require("../../models/categories.model");

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
    const {name, quantity, price, category} = req.body;
    if(!name || !quantity || !price || !category) {
      return res.status(400).json({error: 'All fields are required'})
    }
    const duplicate = await getProductBy({name})
    if(duplicate){
      return res.status(409).json({error: 'Duplicate product name'})
    }
    const existingCategory =  await getCategoryByID(category);
    if(!existingCategory){
      return res.status(409).json({error: 'Category is not exist'})
    }
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
    const id = req.params.id;
    const {name, quantity, price, category} = req.body;
    if(!name || !quantity || !price || !category) {
      return res.status(400).json({error: 'All fields are required'})
    }

    const product = await getProductByID(id);
    if(!product){
      return res.status(404).json({error: 'Product was not found'});
    }

    const duplicate = await getProductBy({name});

    if(duplicate && duplicate?._id.toString() !== id){
      return res.status(409).json({error: 'Duplicate product name'})
    }

    const categoryExist = await getCategoryByID(category);
    if(!categoryExist){
      return res.status(404).json({error: 'Category is not exist'});
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.category = category;

    const updatedProduct = await updateProduct(product);
    return res.status(200).json(updatedProduct);
  } catch (err) {
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
    const products = await getLowStockProductsWhichOrdered(+req.query.lessThan);
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

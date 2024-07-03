const {
  getAllOrders,
  getOrderByID,
  addNewOrder,
  bestSellingProducts,
  totalRevenueByDateRange,
} = require("../../models/orders.model");

const { updateProduct } = require("../../models/products.model");
const { getProductByID } = require("../../models/products.model");
const { getCustomer } = require("../../models/users.model");

async function httpGetAllOrders(req, res) {
  try {
    res.status(200).json(await getAllOrders());
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpGetOrderByID(req, res) {
  try {
    const order = await getOrderByID(req.params.id);
    if (!order) {
      return res.status(404).json({
        error: "order not found",
      });
    } else {
      return res.status(200).json(order);
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpAddOrder(req, res) {
  try {
    const { products: orderedProducts } = req.body;
    if(!Array.isArray(orderedProducts) || !orderedProducts.length){
      return res.status(400).json({
        error: "products field can not be empty",
      });
    }
    const savingProducts = [];
    const buyer = await getCustomer(); //untill I add cuctomer to my front end
    for (orderedProduct of orderedProducts) {
      const productInDB = await getProductByID(orderedProduct.productId);
      if(!productInDB){
        return;
      }
      // subtract ordered product quantity from quatity in the store

      await updateProduct({
        _id: productInDB._id,
        quantity: productInDB.quantity - orderedProduct.quantity,
      });

      savingProducts.push({
        name: productInDB.name,
        price: productInDB.price,
        quantity: orderedProduct.quantity,
      });
    }
    const addedOrder = await addNewOrder({
      customer: buyer._id,
      products: savingProducts,
    });

    return res.status(201).json(addedOrder);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

//aggregate
async function httpBestSellingProducts(req, res) {
  try {

    return res.status(200).json(await bestSellingProducts());
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

async function httpTotalRevenueByDateRange(req, res) {
  try {
    return res
      .status(200)
      .json(await totalRevenueByDateRange(req.query.startDate, req.query.endDate));
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}

module.exports = {
  httpGetAllOrders,
  httpGetOrderByID,
  httpAddOrder,
  httpBestSellingProducts,
  httpTotalRevenueByDateRange,
};

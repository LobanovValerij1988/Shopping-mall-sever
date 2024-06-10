const {
  getAllOrders,
  getOrderByID,
  addNewOrder,
  bestSellingProducts,
  totalRevenueByDateRange,
} = require("../../models/orders.model");
const { getProductByID } = require("../../models/products.model");
const { getCustomer } = require("../../models/customers.model");

async function httpGetAllOrders(req, res) {
  res.status(200).json(await getAllOrders());
}

async function httpGetOrderByID(req, res) {
  try {
    const order = await getOrderByID(req.params.id);
    if (!order) {
      return res.status(400).json({
        error: "order not found",
      });
    } else {
      return res.status(200).json(order);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpAddOrder(req, res) {
  try {
    const { products: orderedProducts } = req.body;
    const savingProducts = [];

    const buyer = await getCustomer(); //untill I add cuctomer to my front end
    for (orderedProduct of orderedProducts) {
      const productInDB = await getProductByID(orderedProduct.productId);
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
    return res.status(400).json({
      error: err.message,
    });
  }
}

//agregate
async function httpBestSellingProducts(req, res) {
  try {
    return res.status(200).json(await bestSellingProducts());
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function httpTotalRevenueByDateRange(req, res) {
  try {
    const { startDate, endDate } = req.params;
    console.log(startDate, endDate);
    return res
      .status(200)
      .json(await totalRevenueByDateRange(startDate, endDate));
  } catch (err) {
    return res.status(400).json({
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

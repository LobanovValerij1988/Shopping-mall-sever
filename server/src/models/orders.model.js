const orders = require("./orders.mongo");

function getAllOrders() {
  return  orders
    .find({}, { __v: 0 })
    .populate({
      path: "customer",
      select: "nickName -_id",
    })
}

function getOrderByID(orderID) {
  return  orders
    .findById(orderID, { __v: 0 })
    .populate({
      path: "customer",
      select: "nickName -_id",
    })
}

async function addNewOrder(order) {
  const orderCreated = await orders.create(order);
  return  getOrderByID(orderCreated._id);
}

// agregate

async function bestSellingProducts() {
  return orders
    .aggregate([
      { $unwind: "$products" },
      {
        $group: {
          _id: "$products.name",
          totalItemSell: {
            $sum: "$products.quantity",
          },
        },
      },
    ])
    .sort({ totalItemSell: -1 })
    .limit(5);
}

function totalRevenueByDateRange(startDate, endDate) {
  return orders.aggregate([
    {
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      },
    },
    //calculate total price for every product in order
    {
      $project: {
        totalPrice: {
          $map: {
            input: "$products",
            as: "product",
            in: {
              $multiply: ["$$product.quantity", "$$product.price"],
            },
          },
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $sum: "$totalPrice" },
        },
      }
    },
    {
      $unset: "_id"
    }
  ]);
}

module.exports = {
  getAllOrders,
  getOrderByID,
  addNewOrder,
  bestSellingProducts,
  totalRevenueByDateRange,
};

const orders = require("./orders.mongo");

async function getAllOrders() {
  return await orders
    .find({}, { __v: 0 })
    .populate({
      path: "customer",
      select: "nickName -_id",
    })
    .exec();
}

async function getOrderByID(orderID) {
  return await orders
    .findById(orderID, { __v: 0 })
    .populate({
      path: "customer",
      select: "nickName -_id",
    })
    .exec();
}

async function addNewOrder(order) {
  const orderCreated = await orders.create(order);
  return await getOrderByID(orderCreated._id);
}

// agregate

async function bestSellingProducts() {
  return await orders
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
    .sort({ totalSell: -1 })
    .limit(5);
}

async function totalRevenueByDateRange(startDate, endDate) {
  return await orders.aggregate([
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
      },
    },
  ]);
}

module.exports = {
  getAllOrders,
  getOrderByID,
  addNewOrder,
  bestSellingProducts,
  totalRevenueByDateRange,
};

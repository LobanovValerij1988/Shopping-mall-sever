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

function getOrderByID(orderID) {
  return orders.find((order) => order.id === orderID);
}
function deleteOrder(orderID) {}

module.exports = {
  getOrderByID,
  getAllOrders,
  deleteOrder,
};

const orders = require("./orders.mongo");
const { getCustomer } = require("./customers.model");

async function seedOrders() {
  const customer = await getCustomer();
  const seedingOrders = [
    {
      products: [
        { name: "snikers", quantity: 5, price: 5 },
        { name: "trainers", quantity: 1, price: 15 },
      ],
    },
    {
      products: [{ name: "smartTv", quantity: 1, price: 1500 }],
    },
    {
      products: [
        { name: "pan", quantity: 5, price: 1 },
        { name: "pencil", quantity: 10, price: 0.5 },
      ],
    },
    {
      products: [{ name: "book", quantity: 8, price: 2.5 }],
    },
    {
      products: [{ name: "bentley", quantity: 1, price: 100000 }],
    },
  ];
  seedingOrders.forEach(async (seedingOrder) => {
    await orders.create({
      products: seedingOrder.products,
      customer: customer._id,
    });
  });
}

async function loadOrdersFromSeed() {
  const firstOrder = await orders.findOne();
  if (firstOrder) {
    console.log("Orders data already loaded");
  } else {
    await seedOrders();
  }
}
async function getAllOrders() {
  return await orders.find({}, { __v: 0 });
}

function getOrderByID(orderID) {
  return orders.find((order) => order.id === orderID);
}
function deleteOrder(orderID) {}

module.exports = {
  getOrderByID,
  getAllOrders,
  deleteOrder,
  loadOrdersFromSeed,
};

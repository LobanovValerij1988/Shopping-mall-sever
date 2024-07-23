import {orders} from "./orders.mongo";
import {getUserBy} from "./users.model";

async function seedOrders() {
  const customer = await getUserBy({});
  const seedingOrders = [
    {
      products: [
        { name: "snickers", quantity: 5, price: 5 },
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
  for (const seedingOrder of seedingOrders) {
    await orders.create({
      products: seedingOrder.products,
      customer: customer!._id,
    });
  }
}

export async function loadOrdersFromSeed() {
    const firstOrder = await orders.findOne();
    if (firstOrder) {
      console.log("Orders data already loaded");
    } else {
      await seedOrders();
    }
  }


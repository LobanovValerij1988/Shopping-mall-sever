const http = require("http");
require("dotenv").config();
const { connectToMongo } = require("./services/mongo");
const { loadCategoriesFromSeed } = require("./models/categories.seed");
const { loadCustomersFromSeed } = require("./models/customers.seed");
const { loadOrdersFromSeed } = require("./models/orders.seed");
const { loadProductsFromSeed } = require("./models/products.seed");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function seeding() {
  await connectToMongo();
  await loadCategoriesFromSeed();
  await loadCustomersFromSeed();
  await loadOrdersFromSeed();
  await loadProductsFromSeed();
}

async function startServer() {
  await connectToMongo();
  await seeding();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

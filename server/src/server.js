const http = require("http");
require("dotenv").config();
const { connectToMongo } = require("./services/mongo");
const { loadCategoriesFromSeed } = require("./models/categories.model");
const { loadCustomersFromSeed } = require("./models/customers.model");
const { loadOrdersFromSeed } = require("./models/orders.model");
const app = require("./app");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function startServer() {
  await connectToMongo();
  await loadCategoriesFromSeed();
  await loadCustomersFromSeed();
  await loadOrdersFromSeed();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();

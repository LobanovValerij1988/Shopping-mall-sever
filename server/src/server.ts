import {loadCategoriesFromSeed} from "./models/categories.seed";
import {loadOrdersFromSeed} from "./models/orders.seed";
import {loadProductsFromSeed} from "./models/products.seed";
import {loadUserFromSeed} from "./models/users.seed";
import http from "http";
require("dotenv").config();
import {connectToMongo} from "./services/mongo";

import app from "./app";

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

async function seeding() {
  await connectToMongo();
  await loadCategoriesFromSeed();
  await loadUserFromSeed();
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

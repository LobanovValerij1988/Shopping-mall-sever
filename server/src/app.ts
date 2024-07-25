import express from "express";
import path from "path";

const cors = require("cors");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const cookieParser = require('cookie-parser');

import {swaggerSpecification} from "./services/svagger";
import productsRouter from "./routes/products/products.router";
import categoriesRouter  from "./routes/categories/categories.router";
import ordersRouter from "./routes/orders/orders.router";
import authRouter from "./routes/auth/auth.router";
import {logger} from "./services/logger";
import {errorHandler} from './services/errorHandler';
import usersRouter from "./routes/users/users.router"

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecification));
app.use(logger);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use('/auth', authRouter);
app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use(errorHandler);

export default app;
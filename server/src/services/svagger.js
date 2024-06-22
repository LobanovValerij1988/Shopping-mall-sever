const path = require("path");
require("dotenv").config();
const swaggerJsDOC = require("swagger-jsdoc");

const URL = process.env.URL || "http://localhost:";
const PORT = process.env.PORT || 8000;

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "City mall API",
            version: "1.0.0",
            description: " A description of city mall library",
        },
        servers: [
            {
                url: URL + PORT,
            },
        ],
    },
    apis: [
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "categories",
            ".",
            "categories.router.js"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "products",
            ".",
            "products.router.js"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "orders",
            ".",
            "orders.router.js"
        ),
    ],
};

const swaggerSpecification = swaggerJsDOC(options);

module.exports = {
    swaggerSpecification
}
import path from "path";
require("dotenv").config();
const swaggerJsDOC = require("swagger-jsdoc");

const URLServer = process.env.URL || "http://localhost:";
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
                url: URLServer + PORT,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    scopes: {
                        admin: 'Admin access',
                        manager: 'Manager access',
                        customer: 'Customer access',
                    },
                },
            },
        },
    },
    apis: [
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "categories",
            ".",
            "categories.router.ts"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "products",
            ".",
            "products.router.ts"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "orders",
            ".",
            "orders.router.ts"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "users",
            ".",
            "users.router.ts"
        ),
        path.join(
            __dirname,
            "..",
            "routes",
            ".",
            "auth",
            ".",
            "auth.router.ts"
        ),
    ],
};

export  const swaggerSpecification = swaggerJsDOC(options);


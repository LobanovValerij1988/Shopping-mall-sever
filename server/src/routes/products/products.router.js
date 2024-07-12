const express = require("express");
const verifyJWT = require("../../services/verifyJWT");
const {
  httpGetFilteredProducts,
  httpGetProductByID,
  httpDeleteProduct,
  httpAddProduct,
  httpUpdateProduct,
  httpGetLowStockProducts,
} = require("./products.controller");
const {forManagerOnly} = require("../../middleware/accessMidleware");

const productsRouter = express.Router();
  productsRouter.use(verifyJWT);
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - price
 *         - category
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The product name
 *         quantity:
 *           type: integer
 *           description: The quantity of product
 *         price:
 *           type: number
 *           description: The product name
 *         category:
 *           type: string
 *           description: The category id
 *       example:
 *         _id: cdytdytdydtdyd453
 *         name: new product
 *         quantity: 25
 *         price: 10
 *         category: sdw23fwefwe
 *
 *   parameters:
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         description: The product id
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filtersCategory
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *           example: [ 6662e89551e6d9d81e9ecc4a , 6662e89551e6d9d81e9ecc3f ]
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *           example: cap
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productsRouter.get("/", httpGetFilteredProducts);

/**
 * @swagger
 * /products/lowStock:
 *   get:
 *     summary: Get the list of products that have been ordered but have a quantity less than you send in stock
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: lessThan
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: The list of low stock products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

productsRouter.get("/lowStock/", httpGetLowStockProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: The product description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The product was not found
 * */

productsRouter.get("/:id", httpGetProductByID);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productsRouter.post("/",forManagerOnly ,httpAddProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update  product by id
 *     tags: [Products]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The product was not found
 */


productsRouter.put("/:id", forManagerOnly, httpUpdateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by id
 *     tags: [Products]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: deleted product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/product'
 *       404:
 *         description: The product was not found
 *       500:
 *         description: Server error
 */

productsRouter.delete("/:id", forManagerOnly, httpDeleteProduct);

module.exports = productsRouter;

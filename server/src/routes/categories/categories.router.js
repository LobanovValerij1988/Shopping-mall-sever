const express = require("express");
const verifyJWT = require("../../services/verifyJWT");

const {
  httpGetAllCategories,
  httpGetCategoryByID,
  httpUpdateCategory,
  httpAddCategory,
  httpDeleteCategory,
  httpTotalProductQuantityByCategory,
} = require("./categories.controller");

const categoriesRouter = express.Router();
// categoriesRouter.use(verifyJWT);
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The category name
 *       example:
 *         _id: cdytdytdydtdyd453
 *         name: new category
 *   parameters:
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         description: The category id
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: The category managing API
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Returns the list of all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: The list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */

categoriesRouter.get("/", httpGetAllCategories);

/**
 * @swagger
 * /categories/getTotalProductsByCategory:
 *   get:
 *     summary: Get the total quantity of products for each category.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Category quantity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The auto-generated id of the category
 *                   name:
 *                     type: string
 *                     description: category name
 *                   productsInCategory:
 *                     type: integer
 *                     description: Number of products in category

 * */


categoriesRouter.get("/getTotalProductsByCategory", httpTotalProductQuantityByCategory);
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by id
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: The category description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *       500:
 *         description:
 * */
categoriesRouter.get("/:id", httpGetCategoryByID);
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: The category was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
categoriesRouter.post("/", httpAddCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update  category by id
 *     tags: [Categories]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The category was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Server error
 */

categoriesRouter.put("/:id", httpUpdateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by id
 *     tags: [Categories]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: The category description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: The category was not found
 *       500:
 *         description: Server error
 */

categoriesRouter.delete("/:id", httpDeleteCategory);


module.exports = categoriesRouter;

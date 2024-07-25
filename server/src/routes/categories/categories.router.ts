import express from 'express';
import {verifyJWT} from "../../services/verifyJWT";
import {
    httpAddCategory,
    httpDeleteCategory,
    httpGetAllCategories,
    httpGetCategoryByID,
    httpTotalProductQuantityByCategory,
    httpUpdateCategory
} from "./categories.controller";
import {forManagerOnly} from "../../middleware/accessMidleware";

const categoriesRouter = express.Router();

 categoriesRouter.use(verifyJWT);
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
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *       required:
 *         - error
 *   parameters:
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         description: The category id
 *   responses:
 *     Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     Forbidden:
 *       description: access forbidden
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     Duplicate:
 *       description: duplicate category name
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     notFound:
 *       description: category was not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
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
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

categoriesRouter.get("/", httpGetAllCategories);

/**
 * @swagger
 * /categories/getTotalProductsByCategory:
 *   get:
 *     summary: Get the total quantity of products for each category.
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *         $ref: '#/components/responses/notFound'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 * */
categoriesRouter.get("/:id", httpGetCategoryByID);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create new category
 *     security:
 *       - bearerAuth:
 *           - manager
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       409:
 *         $ref: '#/components/responses/Duplicate'
 */
categoriesRouter.post("/", forManagerOnly, httpAddCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update  category by id
 *     security:
 *       - bearerAuth:
 *           - manager
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
 *         $ref: '#/components/responses/notFound'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 *       409:
 *         $ref: '#/components/responses/Duplicate'
 */

categoriesRouter.put("/:id", forManagerOnly, httpUpdateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category by id
 *     security:
 *       - bearerAuth:
 *           - manager
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
 *         $ref: '#/components/responses/notFound'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

categoriesRouter.delete("/:id",  forManagerOnly, httpDeleteCategory);

export default categoriesRouter;

const express = require("express");
const verifyJWT = require("../../services/verifyJWT");
const {
    httpGetAllUsers,
    httpGetUserByID,
    httpAddUser,
    httpUpdateUser,
    httpDeleteUser
} = require("./users.controller");

const usersRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - nickName
 *         - password
 *         - roles
 *         - activeStatus
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the order
 *         nickName:
 *           type: string
 *           description: The user name
 *         password:
 *           type: string
 *           description: The user password
 *         roles:
 *           type: array
 *           items:
 *             type: string
 *             description: The user roles
 *         activeStatus:
 *           type: boolean
 *           description: The user status
 *       example:
 *         nickName: mainUser
 *         password: someText
 *         activeStatus: true
 *         roles:
 *           - customer
 *   parameters:
 *     IdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *         description: The user id
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRouter.get("/", verifyJWT, httpGetAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     tags: [Users]
 *     parameters:
 *       - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 * */

usersRouter.get("/:id",verifyJWT ,httpGetUserByID);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
*/
usersRouter.post('/', httpAddUser)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update  user by id
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: The user was not found
 */

usersRouter.put("/:id", verifyJWT, httpUpdateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     tags: [Users]
 *     parameters:
 *      - $ref: '#/components/parameters/IdParam'
 *     responses:
 *       200:
 *         description: deleted user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/user'
 *       404:
 *         description: The user was not found
 *       500:
 *         description: Server error
 */

usersRouter.delete("/:id", verifyJWT, httpDeleteUser);

module.exports = usersRouter;

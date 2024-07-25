import express from 'express';

import {httpDeleteUser, httpGetAllUsers, httpGetUserByID, httpUpdateUser} from "./users.controller";
import {verifyJWT} from "../../services/verifyJWT";
import {forAdminOnly} from "../../middleware/accessMidleware";

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
 *           description: The username
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
 *         description: The user id
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
 *       notFound:
 *         description: user was not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
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
 *     security:
 *       - bearerAuth:
 *           - admin
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */
usersRouter.get("/", verifyJWT, forAdminOnly, httpGetAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by id
 *     security:
 *       - bearerAuth:
 *           - admin
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 * */

usersRouter.get("/:id",verifyJWT, forAdminOnly, httpGetUserByID);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update  user by id
 *     security:
 *       - bearerAuth:
 *           - admin
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

usersRouter.put("/:id", verifyJWT, forAdminOnly, httpUpdateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by id
 *     security:
 *       - bearerAuth:
 *           - admin
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
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/notFound'
 *       403:
 *         $ref: '#/components/responses/Forbidden'
 */

usersRouter.delete("/:id", verifyJWT, forAdminOnly, httpDeleteUser);

export default usersRouter;

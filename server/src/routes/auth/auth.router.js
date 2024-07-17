const express = require("express");
const authRouter = express.Router();
const loginLimiter = require('../../services/loginLimiter');
const {
    login,
    refresh,
    logout,
} = require('./auth.controller')
const {httpAddUser} = require("../users/users.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickName
 *               - password
 *             properties:
 *               nickName:
 *                 type: string
 *                 description: The userName
 *               password:
 *                 type: string
 *                 description: The user password
 *             example:
 *               nickName: new user
 *               password: somepassword
 *     responses:
 *       200:
 *         description: The user was login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the user session
 *       401:
 *         description: Unauthorized
 */


authRouter.post('/', loginLimiter, login);

/**
 * @swagger
 * /auth/signUp:
 *   post:
 *     summary: sign up
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickName
 *               - password
 *               - passwordConfirmed
 *             properties:
 *               nickName:
 *                 type: string
 *                 description: The userName
 *               password:
 *                 type: string
 *                 description: The user password
 *               passwordConfirmed:
 *                 type: string
 *                 description: Password confirmation
 *             example:
 *               nickName: new user
 *               password: somepassword
 *               passwordConfirmed: somepassword
 *     responses:
 *       201:
 *         description: The user was  sign up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: Access token for the user session
 */


authRouter.post('/signUp', httpAddUser);

authRouter.get('/refresh',refresh);

authRouter.post('/logout', logout);

module.exports = authRouter;
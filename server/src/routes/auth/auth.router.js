const express = require("express");
const authRouter = express.Router();
const loginLimiter = require('../../services/loginLimiter');
const {
    login,
    refresh,
    logout,
} = require('./auth.controller')
const {httpAddUser} = require("../users/users.controller");


authRouter.post('/', loginLimiter,login);

authRouter.post('/signUp', httpAddUser);

authRouter.get('/refresh',refresh);

authRouter.post('/logout', logout);

module.exports = authRouter;
const express = require('express');
const loginController = require('../Controller/loginController');
const { verifyPassword, verifyEmail } = require('../middlewares/loginMiddleware');

const loginRouter = express.Router();

loginRouter.post('/', verifyEmail, verifyPassword, loginController.login);

module.exports = loginRouter;
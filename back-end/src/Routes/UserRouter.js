const express = require('express');
const UserController = require('../Controller/UserController');


const userRouter = express.Router();

userRouter.post('/', UserController.login);

module.exports = userRouter;
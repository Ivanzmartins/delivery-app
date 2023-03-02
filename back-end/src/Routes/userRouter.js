const { Router } = require('express');
const userController = require('../Controller/userController');

const userRouter = Router();

userRouter.get('/sellers', userController.getAllSellers);

module.exports = userRouter;
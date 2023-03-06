const { Router } = require('express');
const userController = require('../Controller/userController');

const userRouter = Router();

userRouter.get('/sellers', userController.getAllSellers);
userRouter.get('/', userController.getAllUsers);

module.exports = userRouter;
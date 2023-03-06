const { Router } = require('express');
const adminController = require('../Controller/adminController');

const userRouter = Router();

userRouter.get('/manage', adminController.getAllUsers);
userRouter.post('/manage', adminController.registerUserByAdm);

module.exports = userRouter;
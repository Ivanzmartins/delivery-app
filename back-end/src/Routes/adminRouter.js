const { Router } = require('express');
const adminController = require('../Controller/adminController');
const { verifyRole } = require('../middlewares/adminMiddleware');
const verifyToken = require('../middlewares/tokenValidation');

const userRouter = Router();

userRouter.post('/manage', verifyToken, verifyRole, adminController.registerUserByAdm);
userRouter.delete('/manage', verifyToken, verifyRole, adminController.deleteUser);

module.exports = userRouter;
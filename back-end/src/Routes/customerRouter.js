const express = require('express');
const customerController = require('../Controller/customerController');
const productsController = require('../Controller/productsController');
const { saleMiddleware } = require('../middlewares/orderMiddleware');
const verifyToken = require('../middlewares/tokenValidation');

const customerRouter = express.Router();

customerRouter.post('/checkout', saleMiddleware, verifyToken, customerController.createOrder);

customerRouter.get('/orders', verifyToken, customerController.getAllCustomerOrders);

customerRouter.get('/orders/:saleId', verifyToken, customerController.getCustomerOrderById);

customerRouter.get('/products', productsController.getAll);

customerRouter.get('/products/:id', productsController.getById);

module.exports = customerRouter;

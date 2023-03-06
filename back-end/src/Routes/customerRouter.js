const express = require('express');
const customerController = require('../Controller/customerController');
const productsController = require('../Controller/productsController');
const { saleMiddleware } = require('../middlewares/orderMiddleware');

const customerRouter = express.Router();

customerRouter.post('/checkout', saleMiddleware, customerController.createOrder);

customerRouter.get('/orders', customerController.getAllCustomerOrders);

customerRouter.get('/orders/:saleId', customerController.getCustomerOrderById);

customerRouter.get('/products', productsController.getAll);

customerRouter.get('/products/:id', productsController.getById);

module.exports = customerRouter;

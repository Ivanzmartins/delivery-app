const express = require('express');
const customerController = require('../Controller/customerController');
const { salesInfosValid, productsValid } = require('../middlewares/orderMiddleware');

const customerRouter = express.Router();

customerRouter.post('/checkout', salesInfosValid, productsValid, customerController.createOrder);

customerRouter.get('/orders', customerController.getAllCustomerOrders);

customerRouter.get('/orders/:saleId', customerController.getCustomerOrderById);

module.exports = customerRouter;

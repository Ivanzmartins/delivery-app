const express = require('express');
const customerController = require('../Controller/customerController');

const customerRouter = express.Router();

customerRouter.post('/checkout', customerController.createOrder);

customerRouter.get('/orders', customerController.getAllCustomerOrders);

customerRouter.get('/orders/:saleId', customerController.getCustomerOrderById);

module.exports = customerRouter;

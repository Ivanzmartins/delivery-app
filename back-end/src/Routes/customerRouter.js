const express = require('express');
const customerController = require('../Controller/customerController');

const customerRouter = express.Router();

customerRouter.post('/', customerController.createOrder);

customerRouter.get('/', customerController.getAllCustomerOrders);

customerRouter.get('/:saleId', customerController.getCustomerOrderById);

module.exports = customerRouter;

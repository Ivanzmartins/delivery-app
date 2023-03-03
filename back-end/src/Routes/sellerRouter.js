const express = require('express');
const sellerController = require('../Controller/sellerController');
const { sellerExists, saleExists } = require('../middlewares/sellerMiddleware');

const sellerRouter = express.Router();

sellerRouter.get('/orders', sellerController.getAllSellerOrders);

sellerRouter.get('/orders/:saleId', saleExists, sellerController.getSellerOrderById);

sellerRouter.put(
  '/orders/:saleId', sellerExists, saleExists, sellerController.updateSellerOrderStatus,
  ); 

module.exports = sellerRouter;

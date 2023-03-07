const express = require('express');
const sellerController = require('../Controller/sellerController');
const { sellerExists, saleExists, validateStatus } = require('../middlewares/sellerMiddleware');
const verifyToken = require('../middlewares/tokenValidation');

const sellerRouter = express.Router();

sellerRouter.get('/orders', verifyToken, sellerController.getAllSellerOrders);

sellerRouter.get('/orders/:saleId', saleExists, verifyToken, sellerController.getSellerOrderById);

sellerRouter.put(
  '/orders/:saleId',
  sellerExists,
  saleExists,
  validateStatus,
  sellerController.updateSellerOrderStatus,
  ); 

module.exports = sellerRouter;

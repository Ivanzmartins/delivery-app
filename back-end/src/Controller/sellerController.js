const sellerService = require('../Service/sellerService');

const getAllSellerOrders = async (req, res) => {
  const sellerId = req.user.id;
  console.log(req.user);
  const sales = await sellerService.getAllSellerOrders(sellerId);
  return res.status(200).json(sales);
};

const getSellerOrderById = async (req, res) => {
  const sellerId = req.user.id;
  const { saleId } = req.params;
  const sale = await sellerService.getSellerOrderById(sellerId, saleId);
  return res.status(200).json(sale);
};

const updateSellerOrderStatus = async (req, res) => {
  const { sellerId, status } = req.body;
  const { saleId } = req.params;
  const sale = await sellerService.updateSellerOrderStatus(sellerId, saleId, status);
  return res.status(200).json(sale);
};

module.exports = {
  getAllSellerOrders,
  getSellerOrderById,
  updateSellerOrderStatus,
};
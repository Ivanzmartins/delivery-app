const { Sale } = require('../database/models');

const getAllSellerOrders = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
  });
  return sales;
};

const getSellerOrderById = async (userId, saleId) => {
  const sale = await Sale.findOne({
    where: { userId, id: saleId },
  });
  return sale;
};

const updateSellerOrderStatus = async (sellerId, saleId, status) => {
  const sale = await Sale.update(
    { status },
    { where: { sellerId, id: saleId } },
  );
  return sale;
};

module.exports = {
  getAllSellerOrders,
  getSellerOrderById,
  updateSellerOrderStatus,
};
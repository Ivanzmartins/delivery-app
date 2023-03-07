const { Sale } = require('../database/models');

const getAllSellerOrders = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
  });
  return sales;
};

const getSellerOrderById = async (sellerId, saleId) => {
  const sale = await Sale.findOne({
    where: { sellerId, id: saleId },
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
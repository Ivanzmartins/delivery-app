const { Sale, Product, User } = require('../database/models');

const getAllSellerOrders = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
    include: [
      {
        model: Product,
        as: 'sale',
      },
      {
        model: User,
        as: 'sellers',
        attributes: { exclude: ['password', 'id', 'role'] },
      },
    ],
  });
  return sales;
};

const getSellerOrderById = async (sellerId, saleId) => {
  const sale = await Sale.findOne({
    where: { sellerId, id: saleId },
    include: [
      {
        model: Product,
        as: 'sale',
      },
      {
        model: User,
        as: 'sellers',
        attributes: { exclude: ['password', 'id', 'role'] },
      },
    ],
  });
  return sale;
};

const updateSellerOrderStatus = async (sellerId, saleId, status) => {
  await Sale.update(
    { status },
    { where: { sellerId, id: saleId } },
  );
  const sale = await getSellerOrderById(sellerId, saleId);
  return sale;
};

module.exports = {
  getAllSellerOrders,
  getSellerOrderById,
  updateSellerOrderStatus,
};
const { Sale, SaleProduct } = require('../database/models');

const createOrder = async (sale, products) => {
  const newSale = await Sale.create(sale); 
  const saleId = newSale.id;
  await Promise.all(products.map(async (product) => {
    const { id, quantity } = product;
    await SaleProduct.create({ saleId, id, quantity });
  }));
};

const getAllCustomerOrders = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
  });
  return sales;
};

const getCustomerOrderById = async (userId, saleId) => {
  const sale = await Sale.findOne({
    where: { userId, id: saleId },
  });
  return sale;
};

module.exports = {
  createOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
};
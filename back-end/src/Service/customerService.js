const { SalesProducts, Sale, Product, User } = require('../database/models');

const createOrder = async (sale, products) => {
  const newSale = await Sale.create(sale); 
  const saleId = newSale.id;
  await Promise.all(products.map(async (product) => {
    const { id, quantity } = product;
    console.log(`saleId: ${saleId}, id: ${id}, quantity: ${quantity}`);
    SalesProducts.create({ saleId, productId: id, quantity });
  }));
  return newSale;
};

const getAllCustomerOrders = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
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

const getCustomerOrderById = async (userId, saleId) => { 
  const sale = await Sale.findOne({
    where: { userId, id: saleId },
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

module.exports = {
  createOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
};

const customerService = require('../Service/customerService');

const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { saleInfos, products } = req.body;
  const order = await customerService.createOrder({ ...saleInfos, userId }, products);
  return res.status(201).json(order);
};

const getAllCustomerOrders = async (req, res) => {
  const userId = req.user.id;
  const sales = await customerService.getAllCustomerOrders(userId);
  return res.status(200).json(sales);
};

const getCustomerOrderById = async (req, res) => {
  const userId = req.user.id;
  const { saleId } = req.params;
  const sale = await customerService.getCustomerOrderById(userId, saleId);
  return res.status(200).json(sale);
};

module.exports = {
  createOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
};

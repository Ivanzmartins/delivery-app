const customerService = require('../Service/customerService');

const createOrder = async (req, res) => {
  const { saleInfos, products } = req.body;
  await customerService.createOrder(saleInfos, products);
  return res.sendStatus(201);
};

const getAllCustomerOrders = async (req, res) => {
  const { userId } = req.body;
  const sales = await customerService.getAllCustomerOrders(userId);
  return res.status(200).json(sales);
};

const getCustomerOrderById = async (req, res) => {
  const { userId } = req.body;
  const { saleId } = req.params;
  const sale = await customerService.getCustomerOrderById(userId, saleId);
  return res.status(200).json(sale);
};

module.exports = {
  createOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
};
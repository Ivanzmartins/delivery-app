const customerService = require('../Service/customerService');
const userService = require('../Service/userService');

const createOrder = async (req, res) => {
  const { saleInfos, products } = req.body;
  await customerService.createOrder(saleInfos, products);
  return res.sendStatus(201);
};

const getAllCustomerOrders = async (req, res) => {
  const { email } = req.body;
  const userId = await userService.getUserIdWithEmail(email);
  const sales = await customerService.getAllCustomerOrders(userId);
  return res.status(200).json(sales);
};

const getCustomerOrderById = async (req, res) => {
  const { email } = req.body;
  const userId = await userService.getUserIdWithEmail(email);
  const { saleId } = req.params;
  const sale = await customerService.getCustomerOrderById(userId, saleId);
  return res.status(200).json(sale);
};

module.exports = {
  createOrder,
  getAllCustomerOrders,
  getCustomerOrderById,
};
const { User } = require('../database/models');

const getAllUsers = async () => {
  const products = await User.findAll();
  return products;
};

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' },
  attributes: { exclude: ['password', 'email', 'role'] } });
  return sellers;
};

module.exports = {
  getAllSellers,
  getAllUsers,
};
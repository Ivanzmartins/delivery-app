const { User } = require('../database/models');

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' },
  attributes: { exclude: ['password', 'email', 'role'] } });
  return sellers;
};

module.exports = {
  getAllSellers,
};
const { User } = require('../database/models');

const getAllSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' },
  attributes: { exclude: ['password', 'email', 'role'] } });
  return sellers;
};

const getUserIdWithEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user.id;
};

module.exports = {
  getAllSellers,
  getUserIdWithEmail,
};
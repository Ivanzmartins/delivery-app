const userService = require('../Service/userSerivce');

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.getAllUsers();
  return res.status(200).json(allUsers);
};

const getAllSellers = async (_req, res) => {
  const allSellers = await userService.getAllSellers();
  return res.status(200).json(allSellers);
};

module.exports = {
  getAllSellers,
  getAllUsers,
};
const userService = require('../Service/userSerivce');

const getAllSellers = async (_req, res) => {
  const allUsers = await userService.getAllSellers();
  return res.status(200).json(allUsers);
};

module.exports = {
  getAllSellers,
};
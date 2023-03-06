const userService = require('../Service/userSerivce');

const getAllSellers = async (_req, res) => {
  const allSellers = await userService.getAllSellers();
  return res.status(200).json(allSellers);
};

module.exports = {
  getAllSellers,
};
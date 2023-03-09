const { User, Sale } = require('../database/models');

const sellerExists = async (req, res, next) => {
  const { sellerId } = req.params;
  if (!sellerId) return res.status(400).json({ message: 'sellerId is required' });
  const seller = await User.findOne({ where: { id: sellerId, role: 'seller' } });
  if (!seller) return res.status(404).json({ message: 'Seller does not exist' });
  next();
};

const saleExists = async (req, res, next) => {
  const { saleId } = req.params;
  if (!saleId) return res.status(400).json({ message: 'saleId is required' });
  const sale = await Sale.findOne({ where: { id: saleId } });
  if (!sale) return res.status(404).json({ message: 'Sale does not exist' });
  return next();
};

const validateStatus = (req, res, next) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ message: 'Status is required' });
  const allowedStatus = ['Pendente', 'Preparando', 'Entregue', 'Em Trânsito'];
  if (!allowedStatus.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  return next();
};

module.exports = {
  sellerExists,
  saleExists,
  validateStatus,
};
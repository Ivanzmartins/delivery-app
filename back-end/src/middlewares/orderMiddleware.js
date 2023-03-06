const salesInfosValid = (req, res, next) => {
  const { saleInfos } = req.body;
  if (!saleInfos) return res.status(400).json({ message: '"saleInfos" is required' });
  const requiredFields = ['totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate'];
  if (!requiredFields.every((field) => saleInfos[field])) {
    const missingFields = requiredFields.filter((field) => !saleInfos[field]);
    return res.status(400).json({ message: `${missingFields.join(', ')} is required` });
  }
  return next();
};

const productsValid = (req, res, next) => {
  const { products } = req.body;
  if (!products) return res.status(400).json({ message: '"products" is required' });
  if (!Array.isArray(products)) {
    return res.status(400).json({ message: '"products" must be an array' });
  }
  if (products.length === 0) return res.status(400).json({ message: 'No product found' });
  const requiredFields = ['id', 'quantity'];
  if (!products.every((product) => requiredFields.every((field) => product[field]))) {
    return res.status(400).json({ message: 'id or quantity not found' });
  }
  return next();
};
module.exports = {
  salesInfosValid,
  productsValid,
};
const verifyRole = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'administrator') {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

module.exports = {
  verifyRole,
};
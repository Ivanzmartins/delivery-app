const { registerService } = require('../Service/registerService');

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const { type, message } = await registerService(name, email, password, role);
    return res.status(type).json(message);
  } catch (error) {
    const erro = { type: 409, message: error.message };
    console.error(error);
    return res.status(erro.type).json(erro.message);
  }
};

module.exports = { registerUser };
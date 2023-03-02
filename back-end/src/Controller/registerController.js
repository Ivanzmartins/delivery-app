const { registerService } = require('../Service/registerService');
const createToken = require('../Auth/jwt');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
    const newUser = await registerService(name, email, password);
    const { type, message } = newUser;

    const token = createToken({ email, id: newUser.id });

    const finalUser = {
      ...message.dataValues,
      token,
    };

    return res.status(type).json(finalUser);
};

module.exports = { registerUser };
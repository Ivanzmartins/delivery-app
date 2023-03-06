const md5 = require('md5');
const { User } = require('../database/models');

const registerService = async (name, email, password) => {
  const verifyEmail = await User.findOne({ where: { email } });
  const isPasswordValid = md5(password);

  if (verifyEmail) {
    return { message: 'User already registered', type: 409 };
  }
  const newUser = await User.create({
    name,
    email,
    password: isPasswordValid,
    role: 'customer',
  });

  return { type: 201, message: newUser };
};

module.exports = {
  registerService,
};

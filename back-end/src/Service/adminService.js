const md5 = require('md5');
const { User } = require('../database/models');

const getAllUsers = async () => {
  const products = await User.findAll();
  return products;
};

const registerUserByAdm = async (name, email, password, role) => {
  const verifyEmail = await User.findOne({ where: { email } });
  const verifyName = await User.findOne({ where: { name } });
  const isPasswordValid = md5(password);

  if (verifyEmail || verifyName) {
    return { message: 'User already registered', type: 409 };
  }
  const newUser = await User.create({
    name,
    email,
    password: isPasswordValid,
    role,
   });

  return { type: 201, message: newUser };
};

module.exports = {
  getAllUsers,
  registerUserByAdm,
};

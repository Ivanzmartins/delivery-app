const md5 = require('md5');
const { User } = require('../database/models');

const registerService = async (name, email, password, role) => {
  const verifyEmail = await User.findOne({ where: { email } });
  const verifyName = await User.findOne({ where: { name } });
  const isPasswordValid = md5(password);

  if (verifyEmail || verifyName) {
    return { message: 'Conflict', type: 409 };
  }
  await User.create({
    name,
    email,
    password: isPasswordValid,
    role,
   });
  return { type: 201, message: 'Created' };
};

module.exports = {
  registerService,
};

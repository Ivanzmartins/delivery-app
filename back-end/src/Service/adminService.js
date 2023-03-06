const md5 = require('md5');
const { User } = require('../database/models');

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

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) return { code: 404, message: 'User does not exist' };
  if (user.role === 'administrator') {
    return ({ type: 401, message: 'Administrator can not be deleted' });
  }
  await user.destroy();
  return { type: 204, message: '' };
};

module.exports = {
  registerUserByAdm,
  deleteUser,
};

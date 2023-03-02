const md5 = require('md5');
const { User } = require('../database/models');
const jwt = require('../Auth/jwt');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { message: 'User not found', type: 404 };
  const isPasswordValid = md5(password) === user.password;
  if (!isPasswordValid) return { message: 'Incorrect password', type: 401 };
  const { dataValues } = user;
  const { password: _, ...userWithoutPassword } = dataValues;
  const token = jwt(userWithoutPassword);
  return { token, user: userWithoutPassword, type: 200 };
};

module.exports = {
  login,
};

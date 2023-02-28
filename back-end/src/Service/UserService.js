const User = require('../database/models/User');
const jwt = require('../Auth/jwt');
const md5 = require('md5');


// class UserService {
//   constructor() {
//     this.model = User;
//   }

//   async login(email, password) {
//     const user = await this.model.findOne({ where: { email } });
//     if (!user) return { message: 'User not found', type: 404 };
//     const isPasswordValid = md5(password) === user.password;
//     if (!isPasswordValid) return { message: 'Incorrect password', type: 401 };
//     const { datavalues } = user;
//     const { password: _, ...userWithoutPassword } = datavalues;
//     const token = jwt(userWithoutPassword);
//     return { token, user: userWithoutPassword, type: 200 };
//   }
// }


const login = async (email, password) => {
  const user = await this.model.findOne({ where: { email } });
  if (!user) return { message: 'User not found', type: 404 };
  const isPasswordValid = md5(password) === user.password;
  if (!isPasswordValid) return { message: 'Incorrect password', type: 401 };
  const { datavalues } = user;
  const { password: _, ...userWithoutPassword } = datavalues;
  const token = jwt(userWithoutPassword);
  return { token, user: userWithoutPassword, type: 200 };
}

module.exports = {
  login
};
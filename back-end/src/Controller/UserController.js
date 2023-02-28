const UserService = require('../Service/UserService');

const login = async (req, res) => {
  const { email, password } = req.body;
  const response = await this.service.login(email, password);
  if (response.type === 200) return res.status(response.type).json({ token: response.token, user: response.user });
  return res.status(response.type).json({ message: response.message });
}

module.exports = {
  login,
};
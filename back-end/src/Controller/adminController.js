const adminService = require('../Service/adminService');
const createToken = require('../Auth/jwt');

const getAllUsers = async (_req, res) => {
  const allUsers = await adminService.getAllUsers();
  return res.status(200).json(allUsers);
};

const registerUserByAdm = async (req, res) => {
  const { name, email, password, role } = req.body;
    const newUser = await adminService.registerUserByAdm(name, email, password, role);
    const { type, message } = newUser;

    const token = createToken({ email, id: newUser.id });

    const finalUser = {
      ...message.dataValues,
      token,
    };

    return res.status(type).json(finalUser);
};

module.exports = {
  getAllUsers,
  registerUserByAdm,
};
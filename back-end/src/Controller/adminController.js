const adminService = require('../Service/adminService');
const createToken = require('../Auth/jwt');

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

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await adminService.deleteUser(id);
  res.status(type).json(message);
};

module.exports = {
  registerUserByAdm,
  deleteUser,
};
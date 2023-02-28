const express = require('express');
const registerController = require('../Controller/registerController');

const registerRouter = express.Router();

registerRouter.post('/', registerController.registerUser);

module.exports = registerRouter;
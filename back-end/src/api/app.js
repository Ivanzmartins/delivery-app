const express = require('express');
const userRouter = require('../Routes/UserRouter');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', userRouter);

module.exports = app;
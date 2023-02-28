const express = require('express');
const loginRouter = require('../Routes/loginRouter');

const app = express();
app.use(express.json());
app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);

module.exports = app;
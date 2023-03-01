const express = require('express');
const cors = require('cors');
const loginRouter = require('../Routes/loginRouter');
const productsRouter = require('../Routes/productsRouter');

const app = express();
app.use(express.json());
app.use(cors());
app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/products', productsRouter);

module.exports = app;
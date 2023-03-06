const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRouter = require('../Routes/loginRouter');
const registerRouter = require('../Routes/registerRouter');
const userRouter = require('../Routes/userRouter');
const adminRouter = require('../Routes/adminRouter');
const customerRouter = require('../Routes/customerRouter');
const sellerRouter = require('../Routes/sellerRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(path.join(__dirname, '..', 'images')));

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/user', userRouter);

app.use('/admin', adminRouter);

app.use('/customer', customerRouter);

app.use('/seller', sellerRouter);

module.exports = app;

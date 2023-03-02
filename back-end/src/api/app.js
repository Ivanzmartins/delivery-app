const express = require('express');
const cors = require('cors');
const path = require('path');

const loginRouter = require('../Routes/loginRouter');
const registerRouter = require('../Routes/registerRouter');
const productsRouter = require('../Routes/productsRouter');
const userRouter = require('../Routes/userRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(path.join(__dirname, '..', 'images'))); 
// o express.static serve para servir arquivos estáticos (imagens, css, js, etc). O path.join serve para juntar o caminho do diretório atual com o caminho do diretório das imagens.

app.use('/login', loginRouter);

app.use('/register', registerRouter);

app.use('/products', productsRouter);
app.use('/user', userRouter);

module.exports = app;

const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')

app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.listen(3090, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3090/ !');
});

app.get('/', (req, res) => {
    res.render (path.resolve (__dirname , 'views/index.ejs'))
});

app.get('/registro', (req, res) => {
    res.render (path.resolve (__dirname , 'views/register.ejs'))
});

app.get('/log-in', (req, res) => {
    res.render (path.resolve (__dirname , 'views/login.ejs'))
});

app.get('/producto', (req, res) => {
    res.render (path.resolve (__dirname , 'views/productDetail.ejs'))
});

app.get('/carrito', (req, res) => {
    res.render (path.resolve (__dirname , 'views/productCart.ejs'))
});
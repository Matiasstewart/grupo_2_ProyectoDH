const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')

app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.listen(3090, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3090/ !');
});

mainRoutes = require('./routers/main');

app.use('/', mainRoutes)
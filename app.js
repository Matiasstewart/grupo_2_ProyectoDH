const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public')

app.use(express.static(publicPath));

app.listen(3090, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3090/ !');
});

app.get('/', (req, res) => {
    res.sendFile (path.resolve (__dirname , 'views/index.html'))
});

app.get('/register', (req, res) => {
    res.sendFile (path.resolve (__dirname , 'views/register.html'))
});
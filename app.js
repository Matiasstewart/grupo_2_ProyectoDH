const express = require('express');
const app = express();
const path = require('path');
const public = path.resolve(__dirname, './public')

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.senFile (path.resolve (__dirname , 'views/index.html'))
});

app.listen(3090, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3090/ !');
});

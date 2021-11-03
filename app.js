const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public');
const methodOverride = require('method-override');

// Session y cookies
const session = require('express-session');
const cookies = require('cookie-parser');

app.use(session({secret:'Secreto!', resave:false, saveUninitialized: false}));
app.use(cookies());

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
app.use(userLoggedMiddleware);
// 

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); 

app.set('view engine', 'ejs');

app.use(express.static(publicPath));

app.listen(3090, () => {
    console.log('Servidor corriendo en el puerto http://localhost:3090/ !');
});

// RUTAS
const mainRoutes = require('./routers/main');
const usersRoutes = require("./routers/users");
const productsRoutes = require("./routers/products");

app.use('/', mainRoutes)
app.use("/productos",productsRoutes);
app.use("/usuario", usersRoutes);
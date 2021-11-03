const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer');

// Middlewares
const guestMiddleware = require('../Middlewares/guestMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');
const validations = require('../Middlewares/validateRegisterMiddleware');

//para definimos donde se van a guardar las imagenes de los usuarios
const uploadFile = require('../Middlewares/multerMiddleware');

// CONTROLADOR
let usersController = require("../controllers/usersController");

// Formulario de login
router.get("/login",guestMiddleware,usersController.login);
router.post('/login', usersController.processLogin)

// Formulario de registro
router.get("/registro", guestMiddleware, usersController.registro);
router.post("/registro", uploadFile.single('image'), validations, usersController.processRegister);

// Perfil de Usuario
router.get('/mi-cuenta/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);


module.exports = router;
const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer');

// Middlewares
const guestMiddleware = require('../Middlewares/guestMiddleware');
const authMiddleware = require('../Middlewares/authMiddleware');


//para definimos donde se van a guardar las imagenes de los usuarios
const storage = multer.diskStorage({ 
   destination: function (req, file, cb) { 
      cb(null, './public/images/avatars'); 
   }, 
   filename: function (req, file, cb) { 
      cb(null, Date.now() + path.extname(file.originalname));  } 
 });

const uploadFile = multer({ storage });

// CONTROLADOR
let usersController = require("../controllers/usersController");

// Formulario de login
router.get("/login",guestMiddleware,usersController.login);
router.post('/login', usersController.processLogin)

// Formulario de registro
router.get("/registro", guestMiddleware, usersController.registro);
router.post("/registro", uploadFile.single('image'),usersController.processRegister);

// Perfil de Usuario
router.get('/mi-cuenta/', authMiddleware, usersController.profile);

// Logout
router.get('/logout/', usersController.logout);


module.exports = router;
const express = require("express");
const router = express.Router();
const path = require('path')
const multer = require('multer');

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

// RUTAS
// Login
router.get("/login",usersController.login);
router.post('/login', usersController.loginProcess);

// Registro
router.get("/registro", usersController.registro);
router.post("/registro", uploadFile.single('image'),usersController.proccesRegister);

// Perfil de Usuario
router.get('/mi-cuenta/', usersController.profile);

// Logout
router.get('/logout/', usersController.logout);

module.exports = router;
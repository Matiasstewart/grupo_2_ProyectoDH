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

// Formulario de login
router.get("/login",usersController.login);
router.post('/login', usersController.processLogin)

// Formulario de registro
router.get("/registro", usersController.registro);
router.post("/registro", uploadFile.single('image'),usersController.processRegister);



module.exports = router;
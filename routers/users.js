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

router.get("/login",usersController.login);

router.get("/registro", usersController.registro);
router.post("/login", uploadFile.single('image'),usersController.proccesRegister)

module.exports = router;
let express = require("express");
let router = express.Router();

// CONTROLADOR
let usersController = require("../controllers/usersController");

router.get("/login",usersController.login);

router.get("/registro",usersController.registro);

module.exports = router;
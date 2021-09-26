const express = require('express')
const router = express.Router();

const mainController = require ('../controllers/mainControllers')

router.get ('/', mainController.index);

router.get ('/log-in', mainController.login);

router.get('/carrito', mainController.productCart);

router.get('/producto', mainController.productDetail);

router.get('/registro', mainController.register)

module.exports = router;
